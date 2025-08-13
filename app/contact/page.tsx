"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Clock, MessageCircle, Headphones, Globe } from "lucide-react"
import { toast } from "sonner"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    type: "general",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast.success("Message sent successfully! We'll get back to you within 24 hours.")
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        type: "general",
      })
    } catch (error) {
      toast.error("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Support",
      details: ["+91 98765 43210", "+91 87654 32109"],
      description: "Mon-Sat: 9:00 AM - 8:00 PM",
      color: "text-green-600",
    },
    {
      icon: Mail,
      title: "Email Support",
      details: ["support@geniustech.com", "sales@geniustech.com"],
      description: "We respond within 2-4 hours",
      color: "text-blue-600",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Business",
      details: ["+91 98765 43210"],
      description: "Quick support via WhatsApp",
      color: "text-green-500",
    },
    {
      icon: MapPin,
      title: "Head Office",
      details: ["123 Tech Park, Sector 18", "Gurgaon, Haryana 122015"],
      description: "Visit us for bulk orders",
      color: "text-red-600",
    },
  ]

  const offices = [
    {
      city: "Mumbai",
      address: "456 Business Hub, Andheri East, Mumbai 400069",
      phone: "+91 98765 43211",
      email: "mumbai@geniustech.com",
    },
    {
      city: "Bangalore",
      address: "789 IT Corridor, Whitefield, Bangalore 560066",
      phone: "+91 98765 43212",
      email: "bangalore@geniustech.com",
    },
    {
      city: "Delhi",
      address: "321 Connaught Place, New Delhi 110001",
      phone: "+91 98765 43213",
      email: "delhi@geniustech.com",
    },
    {
      city: "Chennai",
      address: "654 OMR Road, Thoraipakkam, Chennai 600097",
      phone: "+91 98765 43214",
      email: "chennai@geniustech.com",
    },
  ]

  const faqs = [
    {
      question: "What are your delivery charges?",
      answer: "Free delivery on orders above ₹499. Below that, ₹49 delivery charges apply.",
    },
    {
      question: "Do you provide warranty on products?",
      answer: "Yes, all products come with manufacturer warranty. Extended warranty options available.",
    },
    {
      question: "Can I return/exchange products?",
      answer: "7-day return policy for unopened items. 3-day exchange for defective products.",
    },
    {
      question: "Do you offer bulk discounts?",
      answer: "Yes, special pricing available for bulk orders above 50 units. Contact our sales team.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Have questions? Need support? We're here to help! Reach out to us through any of the channels below.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="bg-white/20 text-white px-4 py-2">
              <Clock className="h-4 w-4 mr-2" />
              24/7 Online Support
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white px-4 py-2">
              <Headphones className="h-4 w-4 mr-2" />
              Expert Assistance
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white px-4 py-2">
              <Globe className="h-4 w-4 mr-2" />
              Pan-India Support
            </Badge>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Contact Information */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-lg text-gray-600">Multiple ways to reach us for your convenience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <info.icon className={`h-12 w-12 ${info.color} mx-auto mb-4`} />
                  <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-900 font-medium">
                      {detail}
                    </p>
                  ))}
                  <p className="text-gray-600 text-sm mt-2">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">Inquiry Type</Label>
                      <select
                        id="type"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="sales">Sales & Pricing</option>
                        <option value="partnership">Partnership</option>
                        <option value="complaint">Complaint</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      placeholder="Brief subject of your message"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      placeholder="Please describe your inquiry in detail..."
                      rows={5}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Map & Office Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Our Locations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {offices.map((office, index) => (
                      <div key={index} className="border-l-4 border-blue-600 pl-4">
                        <h4 className="font-semibold text-lg">{office.city}</h4>
                        <p className="text-gray-600 text-sm">{office.address}</p>
                        <p className="text-gray-900 font-medium">{office.phone}</p>
                        <p className="text-blue-600">{office.email}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Business Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="font-medium">9:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-medium">10:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-medium">Closed</span>
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Online Support:</strong> Available 24/7 through email and WhatsApp
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Quick answers to common questions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Emergency Contact */}
        <section>
          <Card className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Need Urgent Help?</h2>
              <p className="text-lg mb-6">
                For urgent technical issues or order problems, contact our emergency support line
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  <span className="text-xl font-semibold">+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>WhatsApp Available 24/7</span>
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
