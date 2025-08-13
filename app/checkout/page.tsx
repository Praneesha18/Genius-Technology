"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import type { Product, Address } from "@/types"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, Truck, MapPin, Shield, CheckCircle, Clock, Phone, Tag } from "lucide-react"
import Image from "next/image"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { sendOrderConfirmationNotification } from "@/actions/notifications"
import { applyCoupon as applyCouponAction, incrementCouponUsage } from "@/actions/coupons"

// Declare global types for payment SDKs if they are loaded dynamically
declare global {
  interface Window {
    Razorpay: any
    Stripe: any
  }
}

export default function CheckoutPage() {
  const { user } = useAuth()
  const { items, getTotalPrice, clearCart } = useCart()
  const router = useRouter()
  const { toast } = useToast()

  const [products, setProducts] = useState<{ [key: string]: Product }>({})
  const [loading, setLoading] = useState(true)
  const [placing, setPlacing] = useState(false)
  const [step, setStep] = useState(1) // 1: Shipping, 2: Payment, 3: Review
  const [formData, setFormData] = useState({
    // Shipping Address
    fullName: "",
    phone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    addressType: "home",

    // Payment
    paymentMethod: "razorpay", // Default to Razorpay

    // Additional
    specialInstructions: "",
    saveAddress: true,
    agreeTerms: false,
  })

  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<{
    id: string
    code: string
    discountAmount: number
  } | null>(null)
  const [couponLoading, setCouponLoading] = useState(false)

  const subtotal = items.reduce((sum, item) => {
    const product = products[item.productId]
    return sum + (product?.price || 0) * item.quantity
  }, 0)
  const deliveryFee = subtotal > 499 ? 0 : 49
  const couponDiscount = appliedCoupon?.discountAmount || 0
  const total = subtotal - couponDiscount + deliveryFee

  useEffect(() => {
    if (!user) {
      router.push("/login?redirect=/checkout")
      return
    }

    if (items.length === 0) {
      router.push("/cart")
      return
    }

    fetchProductDetails()
  }, [user, items, router])

  useEffect(() => {
    // Dynamically load Razorpay and Stripe scripts
    if (step === 2) {
      if (formData.paymentMethod === "razorpay" && !window.Razorpay) {
        const script = document.createElement("script")
        script.src = "https://checkout.razorpay.com/v1/checkout.js"
        script.async = true
        document.body.appendChild(script)
      }
      if (formData.paymentMethod === "stripe" && !window.Stripe) {
        const script = document.createElement("script")
        script.src = "https://js.stripe.com/v3/"
        script.async = true
        document.body.appendChild(script)
      }
    }
  }, [step, formData.paymentMethod])

  const fetchProductDetails = async () => {
    try {
      const productPromises = items.map(async (item) => {
        const productDoc = await getDoc(doc(db, "products", item.productId))
        if (productDoc.exists()) {
          return { id: productDoc.id, ...productDoc.data() } as Product
        }
        return null
      })

      const productResults = await Promise.all(productPromises)
      const productMap: { [key: string]: Product } = {}

      productResults.forEach((product) => {
        if (product) {
          productMap[product.id] = product
        }
      })

      setProducts(productMap)
    } catch (error) {
      console.error("Error fetching product details:", error)
      toast({
        title: "Error",
        description: "Failed to load product details.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type, checked } = e.target as HTMLInputElement
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }))
  }

  const handleRadioChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateShippingAddress = () => {
    const requiredFields = ["fullName", "phone", "email", "addressLine1", "city", "state", "pincode"]
    return requiredFields.every((field) => formData[field as keyof typeof formData])
  }

  const handleNextStep = () => {
    if (step === 1) {
      if (!validateShippingAddress()) {
        toast({
          title: "Incomplete Address",
          description: "Please fill in all required shipping address fields.",
          variant: "destructive",
        })
        return
      }
    } else if (step === 3) {
      if (!formData.agreeTerms) {
        toast({
          title: "Terms & Conditions",
          description: "Please agree to the Terms & Conditions and Privacy Policy.",
          variant: "destructive",
        })
        return
      }
    }
    setStep((prev) => prev + 1)
  }

  const handlePrevStep = () => {
    setStep((prev) => prev - 1)
  }

  const handleApplyCoupon = async () => {
    if (!couponCode) {
      toast({
        title: "No Coupon",
        description: "Please enter a coupon code.",
        variant: "default",
      })
      return
    }
    setCouponLoading(true)
    try {
      const result = await applyCouponAction(couponCode, subtotal)
      if (result.success) {
        setAppliedCoupon({ id: result.couponId!, code: couponCode, discountAmount: result.discountAmount! })
        toast({
          title: "Coupon Applied",
          description: result.message,
          variant: "default",
        })
      } else {
        setAppliedCoupon(null)
        toast({
          title: "Coupon Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error applying coupon:", error)
      toast({
        title: "Error",
        description: "Failed to apply coupon. Please try again.",
        variant: "destructive",
      })
    } finally {
      setCouponLoading(false)
      setCouponCode("")
    }
  }

  const handleRazorpayPayment = async () => {
    setPlacing(true) // Set placing to true when payment initiation starts
    let orderDocRef: any = null // To store the Firestore order reference

    try {
      // 1. Create the order in Firestore with 'pending' payment status
      //    and store the Razorpay Order ID (which we'll get from backend)
      //    as paymentTransactionId for later lookup by webhook.
      const orderItems = items.map((item) => {
        const product = products[item.productId]
        return {
          productId: item.productId,
          productName: product?.name || "Unknown Product",
          price: product?.price || 0,
          quantity: item.quantity,
          image: product?.images[0] || "/placeholder.svg",
          selectedOptions: item.selectedOptions,
        }
      })

      const initialOrderData = {
        userId: user!.id,
        items: orderItems,
        total: total,
        status: "pending", // Initial status
        shippingAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          type: formData.addressType,
          isDefault: formData.saveAddress,
        } as Address,
        paymentMethod: formData.paymentMethod,
        paymentStatus: "pending", // Payment status is pending until webhook confirms
        paymentTransactionId: null, // Will be updated with Razorpay Order ID
        specialInstructions: formData.specialInstructions,
        appliedCouponId: appliedCoupon?.id || null, // Store applied coupon ID
        couponDiscount: appliedCoupon?.discountAmount || 0, // Store coupon discount amount
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      orderDocRef = await addDoc(collection(db, "orders"), initialOrderData)
      const internalOrderId = orderDocRef.id

      // 2. Call your backend API to create a Razorpay order
      const response = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total,
          currency: "INR",
          receipt: internalOrderId, // Use your internal order ID as receipt for linking
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create Razorpay order on backend")
      }

      const { id: razorpayOrderId, amount: razorpayAmount, currency: razorpayCurrency } = await response.json()

      // Update the Firestore order with the Razorpay Order ID
      await updateDoc(orderDocRef, {
        paymentTransactionId: razorpayOrderId,
        updatedAt: new Date(),
      })

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: razorpayAmount,
        currency: razorpayCurrency,
        name: "Genius Technology",
        description: `Order #${internalOrderId.slice(-8)}`,
        order_id: razorpayOrderId, // Use the order ID from your backend
        handler: async (response: any) => {
          // This handler is for client-side feedback.
          // The actual order status update will happen via webhook.
          toast({
            title: "Payment Initiated",
            description: "Your payment is being processed. We will confirm shortly.",
          })
          // Increment coupon usage if applied
          if (appliedCoupon?.id) {
            await incrementCouponUsage(appliedCoupon.id)
          }
          // Redirect to order details page immediately, webhook will update status
          clearCart()
          router.push(`/account/orders/${internalOrderId}`)
          await sendOrderConfirmationNotification(internalOrderId)
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          address: formData.addressLine1,
          internalOrderId: internalOrderId, // Pass internal order ID to Razorpay notes
        },
        theme: {
          color: "#3B82F6", // Tailwind blue-500
        },
      }

      if (window.Razorpay) {
        const rzp1 = new window.Razorpay(options)
        rzp1.on("payment.failed", async (response: any) => {
          toast({
            title: "Payment Failed",
            description: `Error: ${response.error.description}`,
            variant: "destructive",
          })
          // Update order status to failed immediately on client for quick feedback
          if (orderDocRef) {
            await updateDoc(orderDocRef, {
              paymentStatus: "failed",
              status: "cancelled", // Or a specific 'payment_failed' status
              updatedAt: new Date(),
            })
          }
          // No redirect here, user might want to retry
        })
        rzp1.open()
      } else {
        toast({
          title: "Payment Gateway Error",
          description: "Razorpay script not loaded. Please try again.",
          variant: "destructive",
        })
        if (orderDocRef) {
          await updateDoc(orderDocRef, {
            paymentStatus: "failed",
            status: "cancelled",
            updatedAt: new Date(),
          })
        }
      }
    } catch (error: any) {
      console.error("Error during Razorpay payment initiation:", error)
      toast({
        title: "Payment Initiation Failed",
        description: error.message || "Could not initiate Razorpay payment. Please try again.",
        variant: "destructive",
      })
      // If order creation failed before Razorpay, clean up or mark as failed
      if (orderDocRef) {
        await updateDoc(orderDocRef, {
          paymentStatus: "failed",
          status: "cancelled",
          updatedAt: new Date(),
        })
      }
    } finally {
      setPlacing(false) // Reset placing state
    }
  }

  const handleStripePayment = async () => {
    setPlacing(true)
    let orderDocRef: any = null

    try {
      // 1. Create the order in Firestore with 'pending' payment status
      const orderItems = items.map((item) => {
        const product = products[item.productId]
        return {
          productId: item.productId,
          productName: product?.name || "Unknown Product",
          price: product?.price || 0,
          quantity: item.quantity,
          image: product?.images[0] || "/placeholder.svg",
          selectedOptions: item.selectedOptions,
        }
      })

      const initialOrderData = {
        userId: user!.id,
        items: orderItems,
        total: total,
        status: "pending",
        shippingAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          type: formData.addressType,
          isDefault: formData.saveAddress,
        } as Address,
        paymentMethod: formData.paymentMethod,
        paymentStatus: "pending", // Payment status is pending until webhook confirms
        paymentTransactionId: null, // Will be updated with Stripe Payment Intent ID
        specialInstructions: formData.specialInstructions,
        appliedCouponId: appliedCoupon?.id || null, // Store applied coupon ID
        couponDiscount: appliedCoupon?.discountAmount || 0, // Store coupon discount amount
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      orderDocRef = await addDoc(collection(db, "orders"), initialOrderData)
      const internalOrderId = orderDocRef.id

      // 2. Call your backend API to create a Stripe Payment Intent
      const response = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total,
          currency: "INR", // Assuming INR for Stripe
          receipt_email: formData.email,
          metadata: {
            internalOrderId: internalOrderId, // Link internal order ID to Stripe Payment Intent
          },
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create Stripe Payment Intent on backend")
      }

      const { clientSecret } = await response.json()

      // Update the Firestore order with the Stripe Payment Intent ID (from clientSecret)
      // Note: clientSecret contains the Payment Intent ID, e.g., 'pi_XYZ_secret_ABC'
      const paymentIntentId = clientSecret.split("_secret_")[0]
      await updateDoc(orderDocRef, {
        paymentTransactionId: paymentIntentId,
        updatedAt: new Date(),
      })

      if (window.Stripe) {
        const stripe = window.Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: null, // You would typically use an Element here, but for simplicity, we're simulating
          },
          confirmParams: {
            return_url: `${window.location.origin}/account/orders/${internalOrderId}`, // Redirect after payment
          },
        })

        if (error) {
          toast({
            title: "Payment Failed",
            description: error.message || "Stripe payment failed.",
            variant: "destructive",
          })
          if (orderDocRef) {
            await updateDoc(orderDocRef, {
              paymentStatus: "failed",
              status: "cancelled",
              updatedAt: new Date(),
            })
          }
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
          toast({
            title: "Payment Successful!",
            description: `Payment ID: ${paymentIntent.id}`,
          })
          // Increment coupon usage if applied
          if (appliedCoupon?.id) {
            await incrementCouponUsage(appliedCoupon.id)
          }
          // Webhook will handle final status update, but client can show success
          clearCart()
          router.push(`/account/orders/${internalOrderId}`)
          await sendOrderConfirmationNotification(internalOrderId)
        } else {
          // Handle other statuses like 'processing', 'requires_action'
          toast({
            title: "Payment Status",
            description: `Payment is ${paymentIntent?.status}. Please check your order history.`,
          })
          clearCart()
          router.push(`/account/orders/${internalOrderId}`)
        }
      } else {
        toast({
          title: "Payment Gateway Error",
          description: "Stripe script not loaded. Please try again.",
          variant: "destructive",
        })
        if (orderDocRef) {
          await updateDoc(orderDocRef, {
            paymentStatus: "failed",
            status: "cancelled",
            updatedAt: new Date(),
          })
        }
      }
    } catch (error: any) {
      console.error("Error during Stripe payment initiation:", error)
      toast({
        title: "Payment Initiation Failed",
        description: error.message || "Could not initiate Stripe payment. Please try again.",
        variant: "destructive",
      })
      if (orderDocRef) {
        await updateDoc(orderDocRef, {
          paymentStatus: "failed",
          status: "cancelled",
          updatedAt: new Date(),
        })
      }
    } finally {
      setPlacing(false)
    }
  }

  const handlePayUPayment = async () => {
    setPlacing(true)
    let orderDocRef: any = null

    try {
      // 1. Create the order in Firestore with 'pending' payment status
      const orderItems = items.map((item) => {
        const product = products[item.productId]
        return {
          productId: item.productId,
          productName: product?.name || "Unknown Product",
          price: product?.price || 0,
          quantity: item.quantity,
          image: product?.images[0] || "/placeholder.svg",
          selectedOptions: item.selectedOptions,
        }
      })

      const initialOrderData = {
        userId: user!.id,
        items: orderItems,
        total: total,
        status: "pending",
        shippingAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          type: formData.addressType,
          isDefault: formData.saveAddress,
        } as Address,
        paymentMethod: formData.paymentMethod,
        paymentStatus: "pending", // Payment status is pending until PayU redirects back
        paymentTransactionId: null, // Will be updated with PayU transaction ID
        specialInstructions: formData.specialInstructions,
        appliedCouponId: appliedCoupon?.id || null, // Store applied coupon ID
        couponDiscount: appliedCoupon?.discountAmount || 0, // Store coupon discount amount
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      orderDocRef = await addDoc(collection(db, "orders"), initialOrderData)
      const internalOrderId = orderDocRef.id

      // 2. Call your backend API to initiate PayU payment
      const response = await fetch("/api/payu/initiate-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total,
          email: formData.email,
          phone: formData.phone,
          productInfo: `Order #${internalOrderId.slice(-8)}`,
          firstName: formData.fullName.split(" ")[0] || "Customer",
          userRef: internalOrderId, // Pass internal order ID as a custom field
          sUrl: `${window.location.origin}/account/orders/${internalOrderId}?payment_status=success`, // Success redirect URL
          fUrl: `${window.location.origin}/account/orders/${internalOrderId}?payment_status=failed`, // Failure redirect URL
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to initiate PayU payment on backend")
      }

      const { payuUrl, paymentData } = await response.json()

      // Update the Firestore order with the PayU Transaction ID
      await updateDoc(orderDocRef, {
        paymentTransactionId: paymentData.txnid,
        updatedAt: new Date(),
      })

      // Create a form and submit to PayU gateway
      const form = document.createElement("form")
      form.method = "POST"
      form.action = payuUrl
      form.target = "_self" // Open in the same window

      for (const key in paymentData) {
        if (paymentData.hasOwnProperty(key)) {
          const hiddenField = document.createElement("input")
          hiddenField.type = "hidden"
          hiddenField.name = key
          hiddenField.value = paymentData[key]
          form.appendChild(hiddenField)
        }
      }

      document.body.appendChild(form)
      form.submit()

      // After redirection, the client-side code here will stop executing.
      // The order status will be updated by the redirect URLs (sUrl/fUrl)
      // or a dedicated PayU webhook if implemented.
      toast({
        title: "Redirecting to PayU",
        description: "Please complete your payment on the PayU gateway.",
      })
      // Increment coupon usage if applied
      if (appliedCoupon?.id) {
        await incrementCouponUsage(appliedCoupon.id)
      }
      clearCart() // Clear cart as user is leaving for payment
      // No router.push here, as the form submission handles navigation
      await sendOrderConfirmationNotification(internalOrderId)
    } catch (error: any) {
      console.error("Error during PayU payment initiation:", error)
      toast({
        title: "Payment Initiation Failed",
        description: error.message || "Could not initiate PayU payment. Please try again.",
        variant: "destructive",
      })
      if (orderDocRef) {
        await updateDoc(orderDocRef, {
          paymentStatus: "failed",
          status: "cancelled",
          updatedAt: new Date(),
        })
      }
    } finally {
      setPlacing(false)
    }
  }

  // This function is now primarily for COD or for initial order creation
  // before a payment gateway takes over. For Razorpay, the webhook will finalize.
  const finalizeOrder = async (paymentId: string | null, paymentStatus: "pending" | "paid" | "failed") => {
    setPlacing(true)
    try {
      const orderItems = items.map((item) => {
        const product = products[item.productId]
        return {
          productId: item.productId,
          productName: product?.name || "Unknown Product",
          price: product?.price || 0,
          quantity: item.quantity,
          image: product?.images[0] || "/placeholder.svg",
          selectedOptions: item.selectedOptions,
        }
      })

      const orderData = {
        userId: user!.id,
        items: orderItems,
        total: total,
        status: "pending", // Initial status
        shippingAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          type: formData.addressType,
          isDefault: formData.saveAddress,
        } as Address,
        paymentMethod: formData.paymentMethod,
        paymentStatus: paymentStatus, // For COD, this will be 'pending'
        paymentTransactionId: paymentId, // Store payment ID (e.g., simulated for Stripe/PayU)
        specialInstructions: formData.specialInstructions,
        appliedCouponId: appliedCoupon?.id || null, // Store applied coupon ID
        couponDiscount: appliedCoupon?.discountAmount || 0, // Store coupon discount amount
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const orderRef = await addDoc(collection(db, "orders"), orderData)

      // Increment coupon usage if applied
      if (appliedCoupon?.id) {
        await incrementCouponUsage(appliedCoupon.id)
      }

      clearCart()

      toast({
        title: "Order Placed Successfully!",
        description: `Your order #${orderRef.id.slice(-8)} has been placed.`,
      })

      router.push(`/account/orders/${orderRef.id}`)
      await sendOrderConfirmationNotification(orderRef.id)
    } catch (error) {
      console.error("Error placing order:", error)
      toast({
        title: "Order Failed",
        description: "There was an error placing your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setPlacing(false)
    }
  }

  const handlePlaceOrder = async () => {
    if (!formData.agreeTerms) {
      toast({
        title: "Terms & Conditions",
        description: "Please agree to the Terms & Conditions and Privacy Policy.",
        variant: "destructive",
      })
      return
    }

    try {
      if (formData.paymentMethod === "razorpay") {
        await handleRazorpayPayment()
      } else if (formData.paymentMethod === "stripe") {
        await handleStripePayment()
      } else if (formData.paymentMethod === "payu") {
        await handlePayUPayment()
      } else if (formData.paymentMethod === "cod") {
        setPlacing(true)
        await finalizeOrder(null, "pending") // COD is pending until delivered
      }
    } catch (error) {
      console.error("Error during payment initiation:", error)
      toast({
        title: "Payment Initiation Failed",
        description: "Could not initiate payment. Please try again.",
        variant: "destructive",
      })
      setPlacing(false)
    }
  }

  const paymentMethods = [
    {
      id: "razorpay",
      name: "Razorpay",
      description: "Credit/Debit Cards, UPI, Net Banking, Wallets",
      icon: "💳",
      popular: true,
    },
    {
      id: "payu",
      name: "PayU",
      description: "All major payment options",
      icon: "💰",
      popular: false,
    },
    {
      id: "stripe",
      name: "Stripe",
      description: "International cards accepted",
      icon: "🌐",
      popular: false,
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      description: "Pay when you receive",
      icon: "💵",
      popular: false,
    },
  ]

  const deliveryOptions = [
    {
      id: "standard",
      name: "Standard Delivery",
      time: "3-5 business days",
      price: deliveryFee,
      description: "Via Blue Dart, DTDC",
    },
    {
      id: "express",
      name: "Express Delivery",
      time: "1-2 business days",
      price: 99,
      description: "Via FedEx Express",
    },
    {
      id: "same-day",
      name: "Same Day Delivery",
      time: "Within 6 hours",
      price: 199,
      description: "Available in select cities",
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-64 bg-gray-200 rounded"></div>
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[
              { step: 1, title: "Shipping", icon: MapPin },
              { step: 2, title: "Payment", icon: CreditCard },
              { step: 3, title: "Review", icon: CheckCircle },
            ].map((item) => (
              <div key={item.step} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    step >= item.step ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300 text-gray-400"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                </div>
                <span className={`ml-2 font-medium ${step >= item.step ? "text-blue-600" : "text-gray-400"}`}>
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <form onSubmit={(e) => e.preventDefault()}>
              {/* Step 1: Shipping Address */}
              {step === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Shipping Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Enter full name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter phone number"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter email address"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="addressLine1">Address Line 1 *</Label>
                      <Input
                        id="addressLine1"
                        value={formData.addressLine1}
                        onChange={handleInputChange}
                        placeholder="House/Flat No., Building Name, Street"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="addressLine2">Address Line 2</Label>
                      <Input
                        id="addressLine2"
                        value={formData.addressLine2}
                        onChange={handleInputChange}
                        placeholder="Landmark, Area (Optional)"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="City"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="State"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="pincode">Pincode *</Label>
                        <Input
                          id="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          placeholder="Pincode"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Address Type</Label>
                      <RadioGroup
                        value={formData.addressType}
                        onValueChange={(value) => handleRadioChange("addressType", value)}
                        className="flex gap-6 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="home" id="home" />
                          <Label htmlFor="home">Home</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="office" id="office" />
                          <Label htmlFor="office">Office</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other">Other</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="saveAddress"
                        checked={formData.saveAddress}
                        onCheckedChange={(checked) => setFormData({ ...formData, saveAddress: checked as boolean })}
                      />
                      <Label htmlFor="saveAddress">Save this address for future orders</Label>
                    </div>

                    <Button type="button" onClick={handleNextStep} className="w-full">
                      Continue to Payment
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Payment Method */}
              {step === 2 && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Truck className="h-5 w-5" />
                        Delivery Options
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup defaultValue="standard" className="space-y-4">
                        {deliveryOptions.map((option) => (
                          <div key={option.id} className="flex items-center space-x-3 p-4 border rounded-lg">
                            <RadioGroupItem value={option.id} id={option.id} />
                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <Label htmlFor={option.id} className="font-medium">
                                  {option.name}
                                </Label>
                                <span className="font-bold">{option.price === 0 ? "FREE" : `₹${option.price}`}</span>
                              </div>
                              <p className="text-sm text-gray-600 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {option.time} • {option.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Payment Method
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup
                        value={formData.paymentMethod}
                        onValueChange={(value) => handleRadioChange("paymentMethod", value)}
                        className="space-y-4"
                      >
                        {paymentMethods.map((method) => (
                          <div key={method.id} className="flex items-center space-x-3 p-4 border rounded-lg">
                            <RadioGroupItem value={method.id} id={method.id} />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-2xl">{method.icon}</span>
                                <Label htmlFor={method.id} className="font-medium">
                                  {method.name}
                                </Label>
                                {method.popular && (
                                  <Badge variant="secondary" className="text-xs">
                                    Popular
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{method.description}</p>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </CardContent>
                  </Card>

                  {/* Coupon Code Section (moved to step 2 for visibility) */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Tag className="h-5 w-5" />
                        Apply Coupon
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          disabled={couponLoading}
                        />
                        <Button onClick={handleApplyCoupon} variant="outline" disabled={couponLoading}>
                          {couponLoading ? "Applying..." : "Apply"}
                        </Button>
                      </div>
                      {appliedCoupon && (
                        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-green-800 text-sm font-medium">
                            {appliedCoupon.code} applied! You saved ₹{appliedCoupon.discountAmount.toLocaleString()}
                          </p>
                        </div>
                      )}
                      <div className="mt-3 text-xs text-gray-600">
                        <p>Available coupons: SAVE10, FIRST20 (for testing)</p>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={handlePrevStep} className="flex-1 bg-transparent">
                      Back to Shipping
                    </Button>
                    <Button type="button" onClick={handleNextStep} className="flex-1">
                      Review Order
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Review Order */}
              {step === 3 && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Review Your Order</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Shipping Address Review */}
                      <div>
                        <h3 className="font-semibold mb-2">Shipping Address</h3>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="font-medium">{formData.fullName}</p>
                          <p>{formData.addressLine1}</p>
                          {formData.addressLine2 && <p>{formData.addressLine2}</p>}
                          <p>
                            {formData.city}, {formData.state} {formData.pincode}
                          </p>
                          <p className="flex items-center gap-1 mt-1">
                            <Phone className="h-3 w-3" />
                            {formData.phone}
                          </p>
                        </div>
                      </div>

                      {/* Payment Method Review */}
                      <div>
                        <h3 className="font-semibold mb-2">Payment Method</h3>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p>{paymentMethods.find((m) => m.id === formData.paymentMethod)?.name}</p>
                        </div>
                      </div>

                      {/* Special Instructions */}
                      <div>
                        <Label htmlFor="specialInstructions">Special Instructions (Optional)</Label>
                        <Textarea
                          id="specialInstructions"
                          value={formData.specialInstructions}
                          onChange={handleInputChange}
                          placeholder="Any special delivery instructions..."
                          rows={3}
                        />
                      </div>

                      {/* Terms Agreement */}
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="agreeTerms"
                          checked={formData.agreeTerms}
                          onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
                        />
                        <Label htmlFor="agreeTerms" className="text-sm">
                          I agree to the{" "}
                          <a href="/terms" className="text-blue-600 hover:underline">
                            Terms & Conditions
                          </a>{" "}
                          and{" "}
                          <a href="/privacy" className="text-blue-600 hover:underline">
                            Privacy Policy
                          </a>
                        </Label>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={handlePrevStep} className="flex-1 bg-transparent">
                      Back to Payment
                    </Button>
                    <Button type="button" onClick={handlePlaceOrder} className="flex-1" disabled={placing}>
                      {placing ? "Placing Order..." : "Place Order"}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3">
                  {items.map((item) => {
                    const product = products[item.productId]
                    if (!product) return null
                    return (
                      <div key={`${item.productId}-${JSON.stringify(item.selectedOptions)}`} className="flex gap-3">
                        <div className="relative w-12 h-12 flex-shrink-0">
                          <Image
                            src={product.images[0] || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{product.name}</h4>
                          {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                            <p className="text-gray-500 text-xs">
                              {Object.entries(item.selectedOptions)
                                .map(([key, value]) => `${key}: ${value}`)
                                .join(", ")}
                            </p>
                          )}
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-sm">Qty: {item.quantity}</span>
                            <span className="font-medium">₹{(product.price * item.quantity).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span>Coupon discount ({appliedCoupon.code})</span>
                      <span>-₹{couponDiscount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Security Features */}
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>SSL Secured Checkout</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span>7-day Return Policy</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Truck className="h-4 w-4 text-purple-600" />
                    <span>Free Delivery Above ₹499</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
