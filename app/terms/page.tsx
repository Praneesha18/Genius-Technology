import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale, ShoppingCart, CreditCard, Truck, RotateCcw } from "lucide-react"

export default function TermsOfServicePage() {
  const sections = [
    {
      icon: Scale,
      title: "Acceptance of Terms",
      content: [
        "By accessing and using our website, you accept and agree to be bound by these Terms of Service",
        "If you do not agree to these terms, please do not use our services",
        "We reserve the right to modify these terms at any time",
        "Continued use of our services constitutes acceptance of modified terms",
      ],
    },
    {
      icon: ShoppingCart,
      title: "Product Information & Ordering",
      content: [
        "We strive to provide accurate product descriptions and pricing",
        "Colors and specifications may vary slightly from images shown",
        "We reserve the right to limit quantities and refuse orders",
        "All orders are subject to acceptance and availability",
        "Prices are subject to change without notice",
      ],
    },
    {
      icon: CreditCard,
      title: "Payment Terms",
      content: [
        "Payment is required at the time of order placement",
        "We accept major credit cards, debit cards, UPI, and digital wallets",
        "All payments are processed securely through certified payment gateways",
        "Cash on Delivery available for eligible orders",
        "Failed payments may result in order cancellation",
      ],
    },
    {
      icon: Truck,
      title: "Shipping & Delivery",
      content: [
        "Delivery times are estimates and not guaranteed",
        "Shipping charges apply as per our shipping policy",
        "Risk of loss passes to you upon delivery",
        "You must inspect items upon delivery and report damages immediately",
        "Delivery attempts are limited; unclaimed packages may be returned",
      ],
    },
    {
      icon: RotateCcw,
      title: "Returns & Refunds",
      content: [
        "Returns accepted within 7 days of delivery for unopened items",
        "Items must be in original condition with all packaging",
        "Refunds processed within 7-10 business days after return approval",
        "Return shipping costs may apply unless item is defective",
        "Some items may not be eligible for return due to hygiene reasons",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl mb-4">Please read these terms carefully before using our services.</p>
          <p className="text-sm opacity-90">Last updated: January 15, 2024</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Introduction */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Genius Technology</h2>
              <p className="text-gray-700 mb-4">
                These Terms of Service ("Terms") govern your use of our website and services provided by Genius
                Technology. By accessing or using our services, you agree to be bound by these Terms.
              </p>
              <p className="text-gray-700">
                Please read these Terms carefully. If you do not agree with any part of these terms, then you may not
                access the service.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Terms Sections */}
        <div className="max-w-4xl mx-auto space-y-8">
          {sections.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <section.icon className="h-6 w-6 text-blue-600" />
                  <span>{section.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Terms */}
        <div className="max-w-4xl mx-auto mt-12 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>User Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-700">
                <p>When you create an account with us, you must provide accurate and complete information.</p>
                <ul className="space-y-2 ml-4">
                  <li>• You are responsible for safeguarding your account password</li>
                  <li>• You must notify us immediately of any unauthorized use</li>
                  <li>• We reserve the right to terminate accounts that violate our terms</li>
                  <li>• One account per person; multiple accounts may be suspended</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prohibited Uses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">You may not use our service:</p>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li>• For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>• To violate any international, federal, provincial, or state regulations or laws</li>
                <li>• To transmit or procure the sending of any advertising or promotional material</li>
                <li>• To impersonate or attempt to impersonate the company or other users</li>
                <li>• To engage in any other conduct that restricts or inhibits anyone's use of the website</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-700">
                <p>
                  The service and its original content, features, and functionality are and will remain the exclusive
                  property of Genius Technology and its licensors.
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• All trademarks, logos, and brand names are our property</li>
                  <li>• You may not reproduce, distribute, or create derivative works</li>
                  <li>• Product images and descriptions are protected by copyright</li>
                  <li>• Unauthorized use may result in legal action</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-700">
                <p>
                  In no event shall Genius Technology, nor its directors, employees, partners, agents, suppliers, or
                  affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages.
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• Our liability is limited to the amount you paid for the product</li>
                  <li>• We are not responsible for third-party services or products</li>
                  <li>• Force majeure events are beyond our control</li>
                  <li>• Some jurisdictions do not allow limitation of liability</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Governing Law</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                These Terms shall be interpreted and governed by the laws of India. Any disputes arising from these
                terms shall be subject to the exclusive jurisdiction of the courts in Gurgaon, Haryana.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-700">
                <p>
                  We reserve the right to modify or replace these Terms at any time. If a revision is material, we will
                  try to provide at least 30 days notice prior to any new terms taking effect.
                </p>
                <p>
                  Your continued use of the service after we post any modifications to the Terms on this page will
                  constitute your acknowledgment of the modifications and your consent to abide by the modified Terms.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-blue-50">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Questions About These Terms?</h3>
              <p className="text-gray-700 mb-6">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Email:</strong> legal@geniustech.com
                </p>
                <p>
                  <strong>Phone:</strong> +91 98765 43210
                </p>
                <p>
                  <strong>Address:</strong> 123 Tech Park, Sector 18, Gurgaon, Haryana 122015
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
