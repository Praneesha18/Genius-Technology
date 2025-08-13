import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, Clock, MapPin, Package, CreditCard, Shield } from "lucide-react"

export default function ShippingPolicyPage() {
  const deliveryOptions = [
    {
      name: "Standard Delivery",
      time: "3-5 Business Days",
      cost: "₹49 (Free above ₹499)",
      description: "Regular delivery for most locations across India",
      icon: Truck,
    },
    {
      name: "Express Delivery",
      time: "1-2 Business Days",
      cost: "₹99 (Free above ₹999)",
      description: "Faster delivery for major cities",
      icon: Clock,
    },
    {
      name: "Same Day Delivery",
      time: "Within 24 Hours",
      cost: "₹149",
      description: "Available in select metro cities",
      icon: Package,
    },
    {
      name: "Cash on Delivery",
      time: "3-7 Business Days",
      cost: "₹49 + COD charges",
      description: "Pay when you receive your order",
      icon: CreditCard,
    },
  ]

  const deliveryPartners = [
    {
      name: "Shiprocket",
      description: "Primary logistics partner for nationwide delivery",
      coverage: "Pan-India",
      speciality: "E-commerce focused",
    },
    {
      name: "Blue Dart",
      description: "Premium express delivery services",
      coverage: "Major cities",
      speciality: "Express delivery",
    },
    {
      name: "DTDC",
      description: "Reliable delivery to remote locations",
      coverage: "Pan-India including remote areas",
      speciality: "Wide coverage",
    },
    {
      name: "FedEx",
      description: "International and premium domestic delivery",
      coverage: "International + Major Indian cities",
      speciality: "International shipping",
    },
  ]

  const servicableLocations = [
    "Delhi NCR",
    "Mumbai",
    "Bangalore",
    "Chennai",
    "Hyderabad",
    "Pune",
    "Kolkata",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Thane",
    "Bhopal",
    "Visakhapatnam",
    "Pimpri-Chinchwad",
    "Patna",
    "Vadodara",
    "Ghaziabad",
    "Ludhiana",
    "Agra",
    "Nashik",
    "Faridabad",
    "Meerut",
    "Rajkot",
    "Kalyan-Dombivli",
    "Vasai-Virar",
    "Varanasi",
    "Srinagar",
    "Aurangabad",
    "Dhanbad",
    "Amritsar",
    "Navi Mumbai",
    "Allahabad",
    "Ranchi",
    "Howrah",
    "Coimbatore",
    "Jabalpur",
    "Gwalior",
    "Vijayawada",
    "Jodhpur",
    "Madurai",
    "Raipur",
    "Kota",
    "Guwahati",
    "Chandigarh",
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Shipping Policy</h1>
          <p className="text-xl mb-8">
            Fast, reliable delivery across India with multiple shipping options to suit your needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="bg-white/20 text-white px-4 py-2">
              <Truck className="h-4 w-4 mr-2" />
              Free Delivery Above ₹499
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white px-4 py-2">
              <Clock className="h-4 w-4 mr-2" />
              Same Day Delivery Available
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white px-4 py-2">
              <Shield className="h-4 w-4 mr-2" />
              Secure Packaging
            </Badge>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Delivery Options */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Delivery Options</h2>
            <p className="text-lg text-gray-600">Choose the delivery option that works best for you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliveryOptions.map((option, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <option.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{option.name}</h3>
                  <Badge variant="outline" className="mb-3">
                    {option.time}
                  </Badge>
                  <p className="text-green-600 font-medium mb-2">{option.cost}</p>
                  <p className="text-gray-600 text-sm">{option.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Shipping Charges */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Shipping Charges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Order Value</th>
                        <th className="text-left py-3 px-4">Standard Delivery</th>
                        <th className="text-left py-3 px-4">Express Delivery</th>
                        <th className="text-left py-3 px-4">Same Day</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4">Below ₹499</td>
                        <td className="py-3 px-4">₹49</td>
                        <td className="py-3 px-4">₹99</td>
                        <td className="py-3 px-4">₹149</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">₹499 - ₹999</td>
                        <td className="py-3 px-4 text-green-600 font-medium">FREE</td>
                        <td className="py-3 px-4">₹99</td>
                        <td className="py-3 px-4">₹149</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Above ₹999</td>
                        <td className="py-3 px-4 text-green-600 font-medium">FREE</td>
                        <td className="py-3 px-4 text-green-600 font-medium">FREE</td>
                        <td className="py-3 px-4">₹149</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Cash on Delivery</td>
                        <td className="py-3 px-4">₹49 + ₹25 COD</td>
                        <td className="py-3 px-4">₹99 + ₹25 COD</td>
                        <td className="py-3 px-4">₹149 + ₹25 COD</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Delivery Partners */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Delivery Partners</h2>
            <p className="text-lg text-gray-600">Trusted logistics partners ensuring safe delivery</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliveryPartners.map((partner, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{partner.name}</CardTitle>
                  <Badge variant="outline">{partner.speciality}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-2">{partner.description}</p>
                  <p className="text-blue-600 font-medium text-sm">Coverage: {partner.coverage}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Serviceable Locations */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-6 w-6 text-blue-600" />
                  <span>Serviceable Locations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  We deliver to 500+ cities across India. Here are some of our major serviceable locations:
                </p>
                <div className="flex flex-wrap gap-2">
                  {servicableLocations.map((location, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {location}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Don't see your city? Contact us to check if we deliver to your location.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Shipping Process */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Shipping Works</h2>
            <p className="text-lg text-gray-600">Simple 5-step process from order to delivery</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {[
                { step: "1", title: "Order Placed", desc: "You place an order on our website" },
                { step: "2", title: "Processing", desc: "We prepare your order for shipment" },
                { step: "3", title: "Shipped", desc: "Your order is picked up by our delivery partner" },
                { step: "4", title: "In Transit", desc: "Track your order as it moves to your location" },
                { step: "5", title: "Delivered", desc: "Your order arrives at your doorstep" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">{item.step}</span>
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Important Information */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Important Shipping Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Order Processing Time</h4>
                    <p className="text-gray-700 text-sm">
                      Orders are processed within 1-2 business days. Orders placed after 2 PM or on weekends will be
                      processed the next business day.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Delivery Attempts</h4>
                    <p className="text-gray-700 text-sm">
                      Our delivery partners will make up to 3 delivery attempts. If unsuccessful, the package will be
                      returned to our warehouse.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Address Accuracy</h4>
                    <p className="text-gray-700 text-sm">
                      Please ensure your delivery address is complete and accurate. We are not responsible for delays
                      due to incorrect addresses.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Packaging</h4>
                    <p className="text-gray-700 text-sm">
                      All products are securely packaged to prevent damage during transit. Fragile items receive extra
                      protective packaging.
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
              <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help with Shipping?</h3>
              <p className="text-gray-700 mb-6">
                Have questions about shipping or need to track your order? We're here to help!
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
                  <h4 className="font-semibold mb-2">Track Your Order</h4>
                  <p className="text-gray-600">Login to your account</p>
                  <p className="text-gray-600">Real-time tracking</p>
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
