"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { useAuth } from "@/contexts/auth-context" // Corrected import
import { useToast } from "@/hooks/use-toast" // Corrected import
import { doc, updateDoc, collection, query, getDocs, addDoc, deleteDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import type { Address, PaymentMethod } from "@/types"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AccountSidebar } from "@/components/account/account-sidebar"
import { AccountDashboard } from "@/components/account/account-dashboard"
import { User, MapPin, Heart, Plus, Edit, Trash, CheckCircle, CreditCard, Bell, Shield, Gift } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AddressForm } from "@/components/account/address-form"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { PaymentMethodForm } from "@/components/account/payment-method-form"
import Image from "next/image"
import Link from "next/link"
import { sendAccountUpdateNotification } from "@/actions/notifications"

export default function AccountPage() {
  const { user, loading, refreshUser } = useAuth()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [profileFormData, setProfileFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    dateOfBirth: user?.dateOfBirth || "",
    gender: user?.gender || "",
  })
  const [isProfileSaving, setIsProfileSaving] = useState(false)

  // Address Management States
  const [addresses, setAddresses] = useState<Address[]>([])
  const [isAddressesLoading, setIsAddressesLoading] = useState(true)
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [isAddressSaving, setIsAddressSaving] = useState(false)

  // Payment Method Management States
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [isPaymentMethodsLoading, setIsPaymentMethodsLoading] = useState(true)
  const [showPaymentMethodForm, setShowPaymentMethodForm] = useState(false)
  const [editingPaymentMethod, setEditingPaymentMethod] = useState<PaymentMethod | null>(null)
  const [isPaymentMethodSaving, setIsPaymentMethodSaving] = useState(false)

  const { toast } = useToast()

  useEffect(() => {
    if (user) {
      setProfileFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        dateOfBirth: user.dateOfBirth || "",
        gender: user.gender || "",
      })
      fetchAddresses()
      fetchPaymentMethods() // Fetch payment methods on user load
    }
  }, [user])

  // --- Profile Management Functions ---
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setProfileFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsProfileSaving(true)
    try {
      const userRef = doc(db, "users", user.id)
      await updateDoc(userRef, {
        firstName: profileFormData.firstName,
        lastName: profileFormData.lastName,
        phone: profileFormData.phone,
        dateOfBirth: profileFormData.dateOfBirth,
        gender: profileFormData.gender,
        updatedAt: new Date(),
      })
      await refreshUser() // Refresh user context to get updated data
      toast({
        title: "Profile Updated",
        description: "Your profile information has been successfully updated.",
      })
      await sendAccountUpdateNotification(user.id, "Profile Information Updated") // Send notification
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProfileSaving(false)
    }
  }

  // --- Address Management Functions ---
  const fetchAddresses = useCallback(async () => {
    if (!user) return
    setIsAddressesLoading(true)
    try {
      const q = query(collection(db, `users/${user.id}/addresses`))
      const querySnapshot = await getDocs(q)
      const fetchedAddresses: Address[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Address[]
      setAddresses(fetchedAddresses)
    } catch (error) {
      console.error("Error fetching addresses:", error)
      toast({
        title: "Error",
        description: "Failed to load addresses.",
        variant: "destructive",
      })
    } finally {
      setIsAddressesLoading(false)
    }
  }, [user, toast])

  const handleSaveAddress = async (addressData: Address) => {
    if (!user) return

    setIsAddressSaving(true)
    try {
      // If setting as default, unset previous default
      if (addressData.isDefault) {
        const currentDefault = addresses.find((addr) => addr.isDefault && addr.id !== addressData.id)
        if (currentDefault && currentDefault.id) {
          await updateDoc(doc(db, `users/${user.id}/addresses`, currentDefault.id), { isDefault: false })
        }
      }

      if (editingAddress && editingAddress.id) {
        // Update existing address
        const addressRef = doc(db, `users/${user.id}/addresses`, editingAddress.id)
        await updateDoc(addressRef, addressData)
        toast({ title: "Address Updated", description: "Address has been updated successfully." })
        await sendAccountUpdateNotification(user.id, "Address Updated") // Send notification
      } else {
        // Add new address
        await addDoc(collection(db, `users/${user.id}/addresses`), addressData)
        toast({ title: "Address Added", description: "New address has been added successfully." })
        await sendAccountUpdateNotification(user.id, "New Address Added") // Send notification
      }
      setShowAddressForm(false)
      setEditingAddress(null)
      await fetchAddresses() // Re-fetch addresses to update UI
    } catch (error) {
      console.error("Error saving address:", error)
      toast({
        title: "Error",
        description: "Failed to save address. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAddressSaving(false)
    }
  }

  const handleDeleteAddress = async (addressId: string) => {
    if (!user || !confirm("Are you sure you want to delete this address?")) return

    try {
      await deleteDoc(doc(db, `users/${user.id}/addresses`, addressId))
      toast({ title: "Address Deleted", description: "Address has been deleted successfully." })
      await fetchAddresses()
      await sendAccountUpdateNotification(user.id, "Address Deleted") // Send notification
    } catch (error) {
      console.error("Error deleting address:", error)
      toast({
        title: "Error",
        description: "Failed to delete address. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSetDefaultAddress = async (addressId: string) => {
    if (!user) return

    setIsAddressSaving(true) // Use this to disable buttons during default update
    try {
      // Unset current default
      const currentDefault = addresses.find((addr) => addr.isDefault)
      if (currentDefault && currentDefault.id) {
        await updateDoc(doc(db, `users/${user.id}/addresses`, currentDefault.id), { isDefault: false })
      }

      // Set new default
      await updateDoc(doc(db, `users/${user.id}/addresses`, addressId), { isDefault: true })
      toast({ title: "Default Address Set", description: "Your default address has been updated." })
      await fetchAddresses()
      await sendAccountUpdateNotification(user.id, "Default Address Changed") // Send notification
    } catch (error) {
      console.error("Error setting default address:", error)
      toast({
        title: "Error",
        description: "Failed to set default address. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAddressSaving(false)
    }
  }

  // --- Payment Method Management Functions ---
  const fetchPaymentMethods = useCallback(async () => {
    if (!user) return
    setIsPaymentMethodsLoading(true)
    try {
      const q = query(collection(db, `users/${user.id}/paymentMethods`))
      const querySnapshot = await getDocs(q)
      const fetchedPaymentMethods: PaymentMethod[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(), // Convert Firestore Timestamp to Date
      })) as PaymentMethod[]
      setPaymentMethods(fetchedPaymentMethods)
    } catch (error) {
      console.error("Error fetching payment methods:", error)
      toast({
        title: "Error",
        description: "Failed to load payment methods.",
        variant: "destructive",
      })
    } finally {
      setIsPaymentMethodsLoading(false)
    }
  }, [user, toast])

  const handleSavePaymentMethod = async (paymentMethodData: PaymentMethod) => {
    if (!user) return

    setIsPaymentMethodSaving(true)
    try {
      // If setting as default, unset previous default
      if (paymentMethodData.isDefault) {
        const currentDefault = paymentMethods.find((pm) => pm.isDefault && pm.id !== paymentMethodData.id)
        if (currentDefault && currentDefault.id) {
          await updateDoc(doc(db, `users/${user.id}/paymentMethods`, currentDefault.id), { isDefault: false })
        }
      }

      if (editingPaymentMethod && editingPaymentMethod.id) {
        // Update existing payment method
        const pmRef = doc(db, `users/${user.id}/paymentMethods`, editingPaymentMethod.id)
        await updateDoc(pmRef, paymentMethodData)
        toast({ title: "Payment Method Updated", description: "Payment method has been updated successfully." })
        await sendAccountUpdateNotification(user.id, "Payment Method Updated") // Send notification
      } else {
        // Add new payment method
        await addDoc(collection(db, `users/${user.id}/paymentMethods`), {
          ...paymentMethodData,
          createdAt: new Date(),
        })
        toast({ title: "Payment Method Added", description: "New payment method has been added successfully." })
        await sendAccountUpdateNotification(user.id, "New Payment Method Added") // Send notification
      }
      setShowPaymentMethodForm(false)
      setEditingPaymentMethod(null)
      await fetchPaymentMethods() // Re-fetch payment methods to update UI
    } catch (error) {
      console.error("Error saving payment method:", error)
      toast({
        title: "Error",
        description: "Failed to save payment method. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsPaymentMethodSaving(false)
    }
  }

  const handleDeletePaymentMethod = async (paymentMethodId: string) => {
    if (!user || !confirm("Are you sure you want to delete this payment method?")) return

    try {
      await deleteDoc(doc(db, `users/${user.id}/paymentMethods`, paymentMethodId))
      toast({ title: "Payment Method Deleted", description: "Payment method has been deleted successfully." })
      await fetchPaymentMethods()
      await sendAccountUpdateNotification(user.id, "Payment Method Deleted") // Send notification
    } catch (error) {
      console.error("Error deleting payment method:", error)
      toast({
        title: "Error",
        description: "Failed to delete payment method. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSetDefaultPaymentMethod = async (paymentMethodId: string) => {
    if (!user) return

    setIsPaymentMethodSaving(true) // Use this to disable buttons during default update
    try {
      // Unset current default
      const currentDefault = paymentMethods.find((pm) => pm.isDefault)
      if (currentDefault && currentDefault.id) {
        await updateDoc(doc(db, `users/${user.id}/paymentMethods`, currentDefault.id), { isDefault: false })
      }

      // Set new default
      await updateDoc(doc(db, `users/${user.id}/paymentMethods`, paymentMethodId), { isDefault: true })
      toast({ title: "Default Payment Method Set", description: "Your default payment method has been updated." })
      await fetchPaymentMethods()
      await sendAccountUpdateNotification(user.id, "Default Payment Method Changed") // Send notification
    } catch (error) {
      console.error("Error setting default payment method:", error)
      toast({
        title: "Error",
        description: "Failed to set default payment method. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsPaymentMethodSaving(false)
    }
  }

  const getCardIcon = (cardType: string) => {
    switch (cardType) {
      case "Visa":
        return "/visa.svg"
      case "Mastercard":
        return "/mastercard.svg"
      case "Amex":
        return "/amex.svg"
      case "Discover":
        return "/discover.svg"
      default:
        return "/generic-card.svg" // A generic card icon
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="grid lg:grid-cols-4 gap-8">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="lg:col-span-3 h-96 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Please Login</h1>
          <p className="text-gray-600 mb-8">You need to be logged in to access your account.</p>
          <Button asChild>
            <Link href="/login">Login Now</Link>
          </Button>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
          <p className="text-gray-600">Welcome back, {user.firstName}!</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <AccountSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          <div className="lg:col-span-3">
            {activeTab === "dashboard" && <AccountDashboard />}

            {activeTab === "profile" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={profileFormData.firstName}
                          onChange={handleProfileChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" value={profileFormData.lastName} onChange={handleProfileChange} required />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" value={profileFormData.email} disabled />{" "}
                      {/* Email usually not editable */}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" value={profileFormData.phone} onChange={handleProfileChange} />
                      </div>
                      <div>
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={profileFormData.dateOfBirth}
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <select
                        id="gender"
                        value={profileFormData.gender}
                        onChange={handleProfileChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <Button type="submit" disabled={isProfileSaving}>
                      {isProfileSaving ? "Saving..." : "Update Profile"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {activeTab === "addresses" && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Saved Addresses
                  </CardTitle>
                  <Dialog open={showAddressForm} onOpenChange={setShowAddressForm}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingAddress(null)
                          setShowAddressForm(true)
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add New
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>{editingAddress ? "Edit Address" : "Add New Address"}</DialogTitle>
                      </DialogHeader>
                      <AddressForm
                        address={editingAddress}
                        onSave={handleSaveAddress}
                        onCancel={() => setShowAddressForm(false)}
                        isSaving={isAddressSaving}
                      />
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  {isAddressesLoading ? (
                    <div className="space-y-4 animate-pulse">
                      <div className="h-24 bg-gray-100 rounded-lg"></div>
                      <div className="h-24 bg-gray-100 rounded-lg"></div>
                    </div>
                  ) : addresses.length === 0 ? (
                    <div className="text-center py-8">
                      <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No addresses found</h3>
                      <p className="text-gray-600 mb-4">Add your first address to get started.</p>
                      <Dialog open={showAddressForm} onOpenChange={setShowAddressForm}>
                        <DialogTrigger asChild>
                          <Button
                            onClick={() => {
                              setEditingAddress(null)
                              setShowAddressForm(true)
                            }}
                          >
                            Add New Address
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Add New Address</DialogTitle>
                          </DialogHeader>
                          <AddressForm
                            address={null}
                            onSave={handleSaveAddress}
                            onCancel={() => setShowAddressForm(false)}
                            isSaving={isAddressSaving}
                          />
                        </DialogContent>
                      </Dialog>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {addresses.map((addr) => (
                        <Card key={addr.id} className={addr.isDefault ? "border-blue-500 border-2" : ""}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold capitalize">
                                {addr.type} Address
                                {addr.isDefault && (
                                  <Badge variant="secondary" className="ml-2">
                                    Default
                                  </Badge>
                                )}
                              </h3>
                              <div className="flex gap-2">
                                {!addr.isDefault && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleSetDefaultAddress(addr.id!)}
                                    disabled={isAddressSaving}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" /> Set Default
                                  </Button>
                                )}
                                <Dialog
                                  open={showAddressForm && editingAddress?.id === addr.id}
                                  onOpenChange={(open) => {
                                    setShowAddressForm(open)
                                    if (!open) setEditingAddress(null)
                                  }}
                                >
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        setEditingAddress(addr)
                                        setShowAddressForm(true)
                                      }}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[600px]">
                                    <DialogHeader>
                                      <DialogTitle>Edit Address</DialogTitle>
                                    </DialogHeader>
                                    <AddressForm
                                      address={editingAddress}
                                      onSave={handleSaveAddress}
                                      onCancel={() => setShowAddressForm(false)}
                                      isSaving={isAddressSaving}
                                    />
                                  </DialogContent>
                                </Dialog>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteAddress(addr.id!)}
                                  disabled={isAddressSaving}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-gray-600 text-sm">
                              {addr.fullName} <br />
                              {addr.addressLine1}
                              {addr.addressLine2 && (
                                <>
                                  <br />
                                  {addr.addressLine2}
                                </>
                              )}
                              <br />
                              {addr.city}, {addr.state} {addr.pincode}
                              <br />
                              Phone: {addr.phone}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {activeTab === "wishlist" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    My Wishlist
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-600 mb-4">Save items you love for later</p>
                    <Button asChild>
                      <Link href="/products">Start Shopping</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            {activeTab === "payment" && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Methods
                  </CardTitle>
                  <Dialog open={showPaymentMethodForm} onOpenChange={setShowPaymentMethodForm}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingPaymentMethod(null)
                          setShowPaymentMethodForm(true)
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add New
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>
                          {editingPaymentMethod ? "Edit Payment Method" : "Add New Payment Method"}
                        </DialogTitle>
                      </DialogHeader>
                      <PaymentMethodForm
                        paymentMethod={editingPaymentMethod}
                        onSave={handleSavePaymentMethod}
                        onCancel={() => setShowPaymentMethodForm(false)}
                        isSaving={isPaymentMethodSaving}
                      />
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  {isPaymentMethodsLoading ? (
                    <div className="space-y-4 animate-pulse">
                      <div className="h-24 bg-gray-100 rounded-lg"></div>
                      <div className="h-24 bg-gray-100 rounded-lg"></div>
                    </div>
                  ) : paymentMethods.length === 0 ? (
                    <div className="text-center py-8">
                      <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No payment methods saved</h3>
                      <p className="text-gray-600 mb-4">Add your credit/debit cards for faster checkout.</p>
                      <Dialog open={showPaymentMethodForm} onOpenChange={setShowPaymentMethodForm}>
                        <DialogTrigger asChild>
                          <Button
                            onClick={() => {
                              setEditingPaymentMethod(null)
                              setShowPaymentMethodForm(true)
                            }}
                          >
                            Add New Payment Method
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Add New Payment Method</DialogTitle>
                          </DialogHeader>
                          <PaymentMethodForm
                            paymentMethod={null}
                            onSave={handleSavePaymentMethod}
                            onCancel={() => setShowPaymentMethodForm(false)}
                            isSaving={isPaymentMethodSaving}
                          />
                        </DialogContent>
                      </Dialog>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {paymentMethods.map((pm) => (
                        <Card key={pm.id} className={pm.isDefault ? "border-blue-500 border-2" : ""}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-2">
                                <Image
                                  src={getCardIcon(pm.cardType) || "/placeholder.svg"}
                                  alt={pm.cardType}
                                  width={40}
                                  height={24}
                                  className="object-contain"
                                />
                                <h3 className="font-semibold">
                                  {pm.cardType} ending in {pm.last4}
                                  {pm.isDefault && (
                                    <Badge variant="secondary" className="ml-2">
                                      Default
                                    </Badge>
                                  )}
                                </h3>
                              </div>
                              <div className="flex gap-2">
                                {!pm.isDefault && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleSetDefaultPaymentMethod(pm.id!)}
                                    disabled={isPaymentMethodSaving}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" /> Set Default
                                  </Button>
                                )}
                                <Dialog
                                  open={showPaymentMethodForm && editingPaymentMethod?.id === pm.id}
                                  onOpenChange={(open) => {
                                    setShowPaymentMethodForm(open)
                                    if (!open) setEditingPaymentMethod(null)
                                  }}
                                >
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        setEditingPaymentMethod(pm)
                                        setShowPaymentMethodForm(true)
                                      }}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[600px]">
                                    <DialogHeader>
                                      <DialogTitle>Edit Payment Method</DialogTitle>
                                    </DialogHeader>
                                    <PaymentMethodForm
                                      paymentMethod={editingPaymentMethod}
                                      onSave={handleSavePaymentMethod}
                                      onCancel={() => setShowPaymentMethodForm(false)}
                                      isSaving={isPaymentMethodSaving}
                                    />
                                  </DialogContent>
                                </Dialog>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeletePaymentMethod(pm.id!)}
                                  disabled={isPaymentMethodSaving}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-gray-600 text-sm">
                              Cardholder: {pm.cardHolderName} <br />
                              Expires: {pm.expiryMonth}/{pm.expiryYear}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
            {activeTab === "notifications" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No new notifications</h3>
                    <p className="text-gray-600 mb-4">You're all caught up!</p>
                  </div>
                </CardContent>
              </Card>
            )}
            {activeTab === "security" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Change Password</h3>
                      <form className="space-y-3">
                        <div>
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input id="currentPassword" type="password" />
                        </div>
                        <div>
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input id="newPassword" type="password" />
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input id="confirmPassword" type="password" />
                        </div>
                        <Button type="submit">Update Password</Button>
                      </form>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-semibold mb-2">Two-Factor Authentication</h3>
                      <p className="text-gray-600 text-sm mb-4">Add an extra layer of security to your account.</p>
                      <Button variant="outline">Enable 2FA</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            {activeTab === "rewards" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5" />
                    My Rewards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Gift className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">You have 1,250 Reward Points!</h3>
                    <p className="text-gray-600 mb-4">Redeem them for discounts on your next purchase.</p>
                    <Button>Redeem Rewards</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
