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
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Users, Briefcase, Lightbulb, Mail, MapPin, Handshake } from "lucide-react"

export default function JoinPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
    agreeToTerms: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type, checked } = e.target as HTMLInputElement
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.agreeToTerms) {
      toast({
        title: "Error",
        description: "Please agree to the terms and conditions.",
        variant: "destructive",
      })
      return
    }

    // Simulate API call for joining inquiry
    console.log("Join Inquiry Request:", formData)
    toast({
      title: "Inquiry Submitted!",
      description: "Your inquiry has been received. We will contact you shortly.",
    })
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      interest: "",
      message: "",
      agreeToTerms: false,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team & Partner With Us</h1>
          <p className="text-xl mb-8">Explore career opportunities or collaborate with Genius Technology.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
              <Briefcase className="h-4 w-4 mr-2" />
              Career Opportunities
            </Button>
            <Button variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
              <Handshake className="h-4 w-4 mr-2" />
              Partnerships
            </Button>
            <Button variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
              <Lightbulb className="h-4 w-4 mr-2" />
              Innovate With Us
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Why Join/Partner Us */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Genius Technology?</h2>
            <p className="text-lg text-gray-600">
              We are a fast-growing tech company committed to innovation and excellence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <Lightbulb className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Innovation Hub</h3>
              <p className="text-gray-700">
                Be part of a team that pushes boundaries and creates cutting-edge solutions.
              </p>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Collaborative Culture</h3>
              <p className="text-gray-700">Work in an environment that fosters growth, learning, and teamwork.</p>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <Briefcase className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Impactful Work</h3>
              <p className="text-gray-700">Contribute to projects that make a real difference in the tech world.</p>
            </Card>
          </div>
        </section>

        {/* Join/Partner Inquiry Form */}
        <section className="mb-16">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-2xl">Submit Your Inquiry</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" value={formData.fullName} onChange={handleChange} required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" value={formData.phone} onChange={handleChange} />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="interest">Area of Interest</Label>
                    <Select value={formData.interest} onValueChange={(value) => handleSelectChange("interest", value)}>
                      <SelectTrigger id="interest">
                        <SelectValue placeholder="Select your area of interest" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="career">Career Opportunities</SelectItem>
                        <SelectItem value="partnership">Partnership Inquiry</SelectItem>
                        <SelectItem value="supplier">Supplier/Vendor Inquiry</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us more about your interest or what you're looking for."
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, agreeToTerms: !!checked }))}
                    />
                    <Label
                      htmlFor="agreeToTerms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <a href="/terms" className="text-blue-600 hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="/privacy" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </a>
                      .
                    </Label>
                  </div>

                  <Button type="submit" className="w-full">
                    Submit Inquiry
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Information */}
        <section>
          <Card className="bg-green-50">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Direct Contact</h3>
              <p className="text-gray-700 mb-6">Reach out to us directly for specific inquiries.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Careers Email</h4>
                  <p className="text-gray-600 flex items-center justify-center gap-2">
                    <Mail className="h-4 w-4" /> careers@geniustech.com
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Partnerships Email</h4>
                  <p className="text-gray-600 flex items-center justify-center gap-2">
                    <Mail className="h-4 w-4" /> partnerships@geniustech.com
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Office Address</h4>
                  <p className="text-gray-600 flex items-center justify-center gap-2">
                    <MapPin className="h-4 w-4" /> 123 Tech Lane, Innovation City, 560001
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      <Footer />
    </div>
  )
}
