"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag, Truck, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { useCart } from "@/contexts/cart-context"
import { applyCoupon as applyCouponAction } from "@/actions/coupons"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import type { Product } from "@/types"

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getTotalItems, getTotalPrice } = useCart()
  const [products, setProducts] = useState<{ [key: string]: Product }>({})
  const [loadingProducts, setLoadingProducts] = useState(true)

  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountAmount: number } | null>(null)
  const [couponLoading, setCouponLoading] = useState(false)

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoadingProducts(true)
      const productMap: { [key: string]: Product } = {}
      const productIds = Array.from(new Set(items.map((item) => item.productId))) // Get unique product IDs

      if (productIds.length === 0) {
        setLoadingProducts(false)
        return
      }

      try {
        const productPromises = productIds.map(async (id) => {
          const productDoc = await getDoc(doc(db, "products", id))
          if (productDoc.exists()) {
            productMap[id] = { id: productDoc.id, ...productDoc.data() } as Product
          }
        })
        await Promise.all(productPromises)
        setProducts(productMap)
      } catch (error) {
        console.error("Error fetching product details for cart:", error)
        toast.error("Failed to load some product details.")
      } finally {
        setLoadingProducts(false)
      }
    }

    fetchProductDetails()
  }, [items])

  const handleUpdateQuantity = (productId: string, newQuantity: number, selectedOptions?: Record<string, string>) => {
    updateQuantity(productId, newQuantity, selectedOptions)
    toast.success("Quantity updated")
  }

  const handleRemoveItem = (productId: string, selectedOptions?: Record<string, string>) => {
    removeFromCart(productId, selectedOptions)
    toast.success("Item removed from cart")
  }

  const handleApplyCoupon = async () => {
    if (!couponCode) {
      toast.info("Please enter a coupon code.")
      return
    }
    setCouponLoading(true)
    try {
      const result = await applyCouponAction(couponCode, subtotal)
      if (result.success) {
        setAppliedCoupon({ code: couponCode, discountAmount: result.discountAmount! })
        toast.success(result.message)
      } else {
        setAppliedCoupon(null)
        toast.error(result.message)
      }
    } catch (error) {
      console.error("Error applying coupon:", error)
      toast.error("Failed to apply coupon. Please try again.")
    } finally {
      setCouponLoading(false)
      setCouponCode("")
    }
  }

  const subtotal = items.reduce((sum, item) => {
    const product = products[item.productId]
    return sum + (product?.price || 0) * item.quantity
  }, 0)

  const savings = items.reduce((sum, item) => {
    const product = products[item.productId]
    return sum + ((product?.originalPrice || product?.price || 0) - (product?.price || 0)) * item.quantity
  }, 0)

  const couponDiscount = appliedCoupon?.discountAmount || 0
  const deliveryFee = subtotal > 499 ? 0 : 49
  const total = subtotal - couponDiscount + deliveryFee

  const suggestedProducts = [
    {
      id: "s1",
      name: "Wireless Earbuds Pro",
      price: 4999,
      originalPrice: 6999,
      image: "/placeholder.svg?height=80&width=80",
      rating: 4.5,
    },
    {
      id: "s2",
      name: "Power Bank 20000mAh",
      price: 2499,
      originalPrice: 3499,
      image: "/placeholder.svg?height=80&width=80",
      rating: 4.3,
    },
    {
      id: "s3",
      name: "Car Phone Mount",
      price: 799,
      originalPrice: 1299,
      image: "/placeholder.svg?height=80&width=80",
      rating: 4.7,
    },
  ]

  if (loadingProducts) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Loading Cart...</h1>
            <p className="text-lg text-gray-600 mb-8">Please wait while we fetch your cart items.</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-lg text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link href="/products">
              <Button size="lg" className="px-8">
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">{getTotalItems()} items in your cart</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const product = products[item.productId]
              if (!product) return null // Product details not loaded yet or product doesn't exist
              return (
                <Card key={`${item.productId}-${JSON.stringify(item.selectedOptions)}`}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <Image
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{product.name}</h3>
                            <p className="text-gray-600 text-sm">
                              {product.brand}
                              {item.selectedOptions &&
                                Object.entries(item.selectedOptions).map(([key, value]) => (
                                  <span key={key}> • {value}</span>
                                ))}
                            </p>
                            {product.stock === 0 && (
                              <Badge variant="destructive" className="mt-1">
                                Out of Stock
                              </Badge>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.productId, item.selectedOptions)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold">₹{product.price.toLocaleString()}</span>
                            {product.originalPrice && product.originalPrice > product.price && (
                              <span className="text-gray-500 line-through text-sm">
                                ₹{product.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleUpdateQuantity(item.productId, item.quantity - 1, item.selectedOptions)
                              }
                              disabled={product.stock === 0}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-12 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleUpdateQuantity(item.productId, item.quantity + 1, item.selectedOptions)
                              }
                              disabled={item.quantity >= product.stock}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            {/* Suggested Products */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  You might also like
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {suggestedProducts.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="relative w-full h-20 mb-3">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <h4 className="font-medium text-sm mb-2">{product.name}</h4>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold">₹{product.price.toLocaleString()}</span>
                        <span className="text-gray-500 line-through text-xs">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      </div>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        Add to Cart
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Coupon Code */}
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

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>

                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>You saved</span>
                    <span>-₹{savings.toLocaleString()}</span>
                  </div>
                )}

                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon discount</span>
                    <span>-₹{couponDiscount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="flex items-center gap-1">
                    <Truck className="h-4 w-4" />
                    Delivery Fee
                  </span>
                  <span>{deliveryFee === 0 ? <span className="text-green-600">FREE</span> : `₹${deliveryFee}`}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>

                <div className="space-y-3">
                  <Link href="/checkout">
                    <Button className="w-full" size="lg">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>

                  <Link href="/products">
                    <Button variant="outline" className="w-full bg-transparent">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                {/* Benefits */}
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>Secure checkout with SSL encryption</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Truck className="h-4 w-4 text-blue-600" />
                    <span>Free delivery on orders above ₹499</span>
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
