import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RotateCcw, Clock, CheckCircle, XCircle, Package, CreditCard } from "lucide-react"

export default function ReturnsPage() {
  const returnReasons = [
    "Product damaged during shipping",
    "Wrong product received",
    "Product not as described",
    "Defective or faulty product",
    "Changed mind (within return window)",
    "Size/compatibility issues",
  ]

  const nonReturnableItems = [
    "Earphones and headphones (hygiene reasons)",
    "Opened software or digital products",
    "Customized or personalized items",
    "Items damaged by misuse",
    "Products without original packaging",
  ]

  const returnProcess = [
    {
      step: "1",
      title: "Initiate Return",
      description: "Login to your account and select the item to return",
      icon: RotateCcw,
    },
    {
      step: "2",
      title: "Package Item",
      description: "Pack the item in original packaging with all accessories",
      icon: Package,
    },
    {
      step: "3",
      title: "Schedule Pickup",
      description: "Our delivery partner will collect the item from your address",
      icon: Clock,
    },
    {
      step: "4",
      title: "Quality Check",
      description: "We inspect the returned item for eligibility",
      icon: CheckCircle,
    },
    {
      step: "5",
      title: "Refund Processed",
      description: "Refund initiated to your original payment method",
      icon: CreditCard,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Returns & Refunds</h1>
          <p className="text-xl mb-8">Easy returns within 7 days. Your satisfaction is our priority.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="bg-white/20 text-white px-4 py-2">
              <RotateCcw className="h-4 w-4 mr-2" />
              7-Day Return Policy
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white px-4 py-2">
              <Clock className="h-4 w-4 mr-2" />
              Quick Refunds
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white px-4 py-2">
              <Package className="h-4 w-4 mr-2" />
              Free Return Pickup
            </Badge>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Return Policy Overview */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Our Return Policy</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <RotateCcw className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">7-Day Return Window</h3>
                    <p className="text-gray-600 text-sm">
                      You have 7 calendar days from the date of delivery to initiate a return.
                    </p>
                  </div>
                  <div>
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Eligible Items</h3>
                    <p className="text-gray-600 text-sm">
                      Products must be unused, in original packaging, with all tags and accessories.
                    </p>
                  </div>
                  <div>
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CreditCard className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Refund Method</h3>
                    <p className="text-gray-600 text-sm">
                      Refunds are processed to the original payment method within 7-10 business days.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How to Initiate a Return */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Initiate a Return</h2>
            <p className="text-lg text-gray-600">Follow these simple steps to return your product</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {returnProcess.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">{item.step}</span>
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button size="lg" asChild>
                <a href="/account/orders">Initiate a Return Now</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Return Reasons */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <RotateCcw className="h-6 w-6 text-blue-600" />
                  <span>Common Return Reasons</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {returnReasons.map((reason, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {reason}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Please select the most appropriate reason when initiating your return.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Non-Returnable Items */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <XCircle className="h-6 w-6 text-red-600" />
                  <span>Non-Returnable Items</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  {nonReturnableItems.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  This list is not exhaustive. Please check product descriptions for specific return eligibility.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Important Notes */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Important Notes on Returns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Refund Processing Time</h4>
                    <p className="text-gray-700 text-sm">
                      Once your return is approved and the item is received, refunds are typically processed within 7-10
                      business days to your original payment method.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Damaged or Defective Products</h4>
                    <p className="text-gray-700 text-sm">
                      If you receive a damaged or defective product, please contact our customer support immediately
                      with photos/videos of the issue. We will arrange a replacement or full refund.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Return Shipping Costs</h4>
                    <p className="text-gray-700 text-sm">
                      Return shipping is free for damaged, defective, or incorrect items. For other reasons (e.g.,
                      change of mind), return shipping costs may be deducted from your refund.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Packaging Requirements</h4>
                    <p className="text-gray-700 text-sm">
                      Ensure the product is packed securely in its original packaging to prevent damage during transit.
                      Missing accessories or packaging may affect your refund.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <Card className="bg-blue-50">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Need Assistance with Your Return?</h3>
              <p className="text-gray-700 mb-6">
                Our customer support team is ready to assist you with any return-related queries.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Customer Support</h4>
                  <p className="text-gray-600">+91 98765 43210</p>
                  <p className="text-gray-600">support@geniustech.com</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">WhatsApp Support</h4>
                  <p className="text-gray-600">+91 98765 43210</p>
                  <p className="text-gray-600">Quick responses</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Visit Our FAQ</h4>
                  <p className="text-gray-600">Find answers to common questions</p>
                  <Button variant="link" className="p-0 h-auto text-blue-600" asChild>
                    <a href="/faq">Go to FAQ</a>
                  </Button>
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
