"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { Search, Mail, Phone, MessageCircle } from "lucide-react"

const faqData = [
  {
    category: "General",
    questions: [
      {
        q: "What is Genius Technology?",
        a: "Genius Technology is a leading e-commerce platform specializing in high-quality tech accessories, gadgets, and smart devices. We aim to provide innovative products and an exceptional shopping experience.",
      },
      {
        q: "How can I contact customer support?",
        a: "You can reach our customer support team via email at support@geniustech.com, by phone at +91 98765 43210, or through our live chat on the website during business hours.",
      },
      {
        q: "Do you have a physical store?",
        a: "Currently, Genius Technology operates exclusively online to offer you the best prices and widest selection. We do not have physical retail stores.",
      },
      {
        q: "How do I stay updated on new products and offers?",
        a: "You can subscribe to our newsletter by entering your email at the bottom of our homepage. Follow us on social media for the latest updates and promotions.",
      },
    ],
  },
  {
    category: "Orders & Payments",
    questions: [
      {
        q: "How do I place an order?",
        a: "Browse our products, add desired items to your cart, proceed to checkout, fill in your shipping details, choose a payment method, and confirm your order.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept major credit/debit cards (Visa, Mastercard, Amex), UPI, Net Banking, popular digital wallets (Paytm, Google Pay), and Cash on Delivery (COD) for eligible orders.",
      },
      {
        q: "Is Cash on Delivery (COD) available?",
        a: "Yes, COD is available for most products and locations. A small COD fee may apply. Please check eligibility during checkout.",
      },
      {
        q: "How can I track my order?",
        a: "Once your order is shipped, you will receive a tracking number via email and SMS. You can track your order directly from your account dashboard or using the link provided in the shipping confirmation.",
      },
      {
        q: "Can I modify or cancel my order after placing it?",
        a: "Order modifications or cancellations are possible only if the order has not yet been shipped. Please contact customer support immediately for assistance.",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    questions: [
      {
        q: "What are your shipping charges?",
        a: "Shipping charges vary based on order value and delivery speed. Standard delivery is free for orders above ₹499. Please refer to our Shipping Policy page for detailed information.",
      },
      {
        q: "How long does delivery take?",
        a: "Standard delivery typically takes 3-5 business days. Express delivery is 1-2 business days, and Same Day Delivery is available in select metro cities. Times may vary based on location.",
      },
      {
        q: "Do you deliver to my location?",
        a: "We deliver to over 500+ cities across India. You can check if your pincode is serviceable during checkout or refer to our Shipping Policy for a list of major serviceable locations.",
      },
      {
        q: "What if I receive a damaged product?",
        a: "If you receive a damaged product, please contact our customer support within 24 hours of delivery with photos of the damage. We will arrange for a replacement or refund.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    questions: [
      {
        q: "What is your return policy?",
        a: "We offer a 7-day return policy for most products. Items must be unused, in original packaging, and with all accessories. Please refer to our Returns & Refunds Policy for full details.",
      },
      {
        q: "How do I return an item?",
        a: "You can initiate a return from your account dashboard under 'My Orders'. Select the item, choose a reason, and schedule a pickup. Our team will guide you through the process.",
      },
      {
        q: "How long does it take to get a refund?",
        a: "Once your returned item is received and inspected, refunds are typically processed within 7-10 business days to your original payment method.",
      },
      {
        q: "Are there any non-returnable items?",
        a: "Yes, certain items like earphones (due to hygiene), opened software, or customized products may not be eligible for return. Please check the product description for specifics.",
      },
    ],
  },
  {
    category: "Account & Security",
    questions: [
      {
        q: "How do I create an account?",
        a: "Click on the 'Register' link in the top right corner of the website and follow the prompts to create your account using your email address.",
      },
      {
        q: "Is my personal information secure?",
        a: "Yes, we use industry-standard encryption and security measures to protect your personal and payment information. Please refer to our Privacy Policy for more details.",
      },
      {
        q: "I forgot my password. How do I reset it?",
        a: "On the login page, click 'Forgot Password?' and enter your registered email address. We will send you a link to reset your password.",
      },
    ],
  },
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredFaqs = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchTerm.toLowerCase()) || q.a.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl mb-8">Find answers to common questions about orders, shipping, returns, and more.</p>
          <div className="max-w-md mx-auto relative">
            <Input
              type="text"
              placeholder="Search for answers..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((category, catIndex) => (
            <section key={catIndex} className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">{category.category}</h2>
              <div className="max-w-4xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, qIndex) => (
                    <Card key={qIndex} className="mb-4">
                      <AccordionItem value={`item-${catIndex}-${qIndex}`}>
                        <AccordionTrigger className="text-lg font-semibold text-left px-6 py-4 hover:bg-gray-50">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 py-4 text-gray-700">{faq.a}</AccordionContent>
                      </AccordionItem>
                    </Card>
                  ))}
                </Accordion>
              </div>
            </section>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No results found for "{searchTerm}".</p>
            <p className="text-gray-500 text-md mt-2">Please try a different search term or browse categories.</p>
            <Button variant="outline" className="mt-6 bg-transparent" onClick={() => setSearchTerm("")}>
              Clear Search
            </Button>
          </div>
        )}

        {/* Still Need Help Section */}
        <section className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
            <p className="text-lg text-gray-600">Our support team is here for you.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-gray-700 mb-4">Send us an email anytime, and we'll get back to you within 24 hours.</p>
              <Button variant="outline" asChild>
                <a href="mailto:support@geniustech.com">support@geniustech.com</a>
              </Button>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-gray-700 mb-4">Speak directly with our support team during business hours.</p>
              <Button variant="outline" asChild>
                <a href="tel:+919876543210">+91 98765 43210</a>
              </Button>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
              <p className="text-gray-700 mb-4">Get instant support through our live chat feature on the website.</p>
              <Button variant="outline">Start Chat</Button> {/* Placeholder for actual chat integration */}
            </Card>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
