"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, DollarSign, Package, Truck } from "lucide-react"
import Link from "next/link"
import { submitCorporateInquiry } from "@/actions/corporate-orders" // Import the server action
import { useToast } from "@/hooks/use-toast"

export default function CorporatePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(event.currentTarget)

    const result = await submitCorporateInquiry(formData)

    if (result.success) {
      toast({
        title: "Success",
        description: result.message,
      })
      event.currentTarget.reset() // Clear the form
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      })
    }
    setIsSubmitting(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Corporate & B2B Solutions</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Genius Technology offers tailored solutions for businesses, educational institutions, and government
            agencies. Get special pricing, bulk discounts, and dedicated support for your large-scale technology needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Benefits Section */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Us for B2B?</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <DollarSign className="h-8 w-8 text-blue-600 shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold">Competitive Bulk Pricing</h3>
                  <p className="text-gray-600">
                    Unlock significant savings with special discounts on large volume orders.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Package className="h-8 w-8 text-blue-600 shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold">Customized Product Bundles</h3>
                  <p className="text-gray-600">
                    Tailor product packages to meet your specific operational requirements.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="h-8 w-8 text-blue-600 shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold">Dedicated Account Manager</h3>
                  <p className="text-gray-600">
                    Receive personalized support from a dedicated expert for all your needs.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Truck className="h-8 w-8 text-blue-600 shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold">Efficient Logistics & Delivery</h3>
                  <p className="text-gray-600">Streamlined order processing and reliable delivery to your doorstep.</p>
                </div>
              </div>
            </div>
            <Button asChild size="lg">
              <Link href="/corporate/dashboard">Access Corporate Dashboard</Link>
            </Button>
          </div>

          {/* Corporate Inquiry Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Corporate Inquiry Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" name="companyName" placeholder="Your Company Name" required />
                </div>
                <div>
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input id="contactPerson" name="contactPerson" placeholder="Full Name" required />
                </div>
                <div>
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input id="contactEmail" name="contactEmail" type="email" placeholder="email@example.com" required />
                </div>
                <div>
                  <Label htmlFor="contactPhone">Contact Phone (Optional)</Label>
                  <Input id="contactPhone" name="contactPhone" type="tel" placeholder="+91-9876543210" />
                </div>
                <div>
                  <Label htmlFor="estimatedBudget">Estimated Budget (Optional)</Label>
                  <Input id="estimatedBudget" name="estimatedBudget" placeholder="e.g., ₹50,000 - ₹1,00,000" />
                </div>
                <div>
                  <Label htmlFor="requiredProducts">Required Products/Categories (Optional)</Label>
                  <Textarea
                    id="requiredProducts"
                    name="requiredProducts"
                    placeholder="e.g., 50 Laptops, 100 Headphones, IT Infrastructure"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="inquiryDetails">Inquiry Details</Label>
                  <Textarea
                    id="inquiryDetails"
                    name="inquiryDetails"
                    placeholder="Describe your requirements in detail..."
                    rows={5}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Our Corporate Sales Team</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <div className="flex items-center space-x-3">
              <Mail className="h-6 w-6 text-blue-600" />
              <span className="text-lg text-gray-700">corporate@geniustechnology.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-6 w-6 text-blue-600" />
              <span className="text-lg text-gray-700">+91-1234567890</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
