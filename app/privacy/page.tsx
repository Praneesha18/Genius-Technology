import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Eye, UserCheck, Database, Globe } from "lucide-react"

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        "Personal information (name, email, phone number, address)",
        "Payment information (processed securely through our payment partners)",
        "Device and usage information (IP address, browser type, pages visited)",
        "Location data (for delivery purposes)",
        "Communication preferences and history",
      ],
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        "Process and fulfill your orders",
        "Provide customer support and respond to inquiries",
        "Send order updates and delivery notifications",
        "Improve our products and services",
        "Personalize your shopping experience",
        "Comply with legal obligations",
      ],
    },
    {
      icon: Shield,
      title: "Information Sharing",
      content: [
        "We do not sell your personal information to third parties",
        "We share data with trusted service providers (payment processors, delivery partners)",
        "We may share information when required by law",
        "Anonymous, aggregated data may be used for analytics",
        "Business transfers (mergers, acquisitions) may involve data transfer",
      ],
    },
    {
      icon: Lock,
      title: "Data Security",
      content: [
        "Industry-standard encryption for data transmission",
        "Secure servers with regular security updates",
        "Limited access to personal information on need-to-know basis",
        "Regular security audits and monitoring",
        "Secure payment processing through certified partners",
      ],
    },
    {
      icon: UserCheck,
      title: "Your Rights",
      content: [
        "Access your personal information",
        "Correct inaccurate information",
        "Delete your account and associated data",
        "Opt-out of marketing communications",
        "Data portability (receive your data in a structured format)",
        "Lodge complaints with data protection authorities",
      ],
    },
    {
      icon: Globe,
      title: "Cookies and Tracking",
      content: [
        "Essential cookies for website functionality",
        "Analytics cookies to understand user behavior",
        "Marketing cookies for personalized advertising",
        "You can control cookie preferences in your browser",
        "Third-party cookies from integrated services (Google Analytics, payment processors)",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl mb-4">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
          <p className="text-sm opacity-90">Last updated: January 15, 2024</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Introduction */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Your Privacy</h2>
              <p className="text-gray-700 mb-4">
                At Genius Technology, we are committed to protecting your privacy and ensuring the security of your
                personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your
                information when you visit our website or make a purchase from us.
              </p>
              <p className="text-gray-700">
                By using our services, you agree to the collection and use of information in accordance with this
                policy. We will not use or share your information with anyone except as described in this Privacy
                Policy.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Privacy Sections */}
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

        {/* Additional Information */}
        <div className="max-w-4xl mx-auto mt-12 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Data Retention</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in
                this Privacy Policy, unless a longer retention period is required or permitted by law.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Account information: Until account deletion or 3 years of inactivity</li>
                <li>• Order history: 7 years for tax and legal compliance</li>
                <li>• Marketing preferences: Until you unsubscribe</li>
                <li>• Support communications: 2 years after resolution</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                We use trusted third-party services to provide our services. These partners have their own privacy
                policies:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Payment Processing:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Razorpay</li>
                    <li>• PayU</li>
                    <li>• Stripe</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Delivery Partners:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Shiprocket</li>
                    <li>• Blue Dart</li>
                    <li>• DTDC</li>
                    <li>• FedEx</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Communication:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Twilio (SMS)</li>
                    <li>• SendGrid (Email)</li>
                    <li>• WhatsApp Business</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Analytics:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Google Analytics</li>
                    <li>• Firebase Analytics</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal
                information from children under 13. If you are a parent or guardian and believe your child has provided
                us with personal information, please contact us immediately.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to This Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last updated" date.
              </p>
              <p className="text-gray-700">
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy
                Policy are effective when they are posted on this page.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-blue-50">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Questions About This Policy?</h3>
              <p className="text-gray-700 mb-6">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Email:</strong> privacy@geniustech.com
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
