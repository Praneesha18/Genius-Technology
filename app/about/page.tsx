import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Users, Globe, Target, Heart, Zap, CheckCircle, TrendingUp, Shield, Truck } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  const stats = [
    { label: "Happy Customers", value: "50,000+", icon: Users },
    { label: "Products Sold", value: "2,00,000+", icon: Award },
    { label: "Cities Served", value: "100+", icon: Globe },
    { label: "Years of Excellence", value: "5+", icon: TrendingUp },
  ]

  const values = [
    {
      icon: Target,
      title: "Innovation",
      description: "We constantly innovate to bring you the latest and most advanced technology accessories.",
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Our customers are at the heart of everything we do. Your satisfaction is our priority.",
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "We ensure every product meets our high standards of quality and reliability.",
    },
    {
      icon: Zap,
      title: "Fast Service",
      description: "Quick delivery, responsive support, and efficient service across all touchpoints.",
    },
  ]

  const milestones = [
    {
      year: "2019",
      title: "Company Founded",
      description: "Started with a vision to make premium technology accessible to everyone.",
    },
    {
      year: "2020",
      title: "First 1000 Customers",
      description: "Reached our first milestone of serving 1000 happy customers.",
    },
    {
      year: "2021",
      title: "Product Expansion",
      description: "Expanded our product line to include smart devices and audio accessories.",
    },
    {
      year: "2022",
      title: "Pan-India Presence",
      description: "Extended our reach to serve customers across 50+ cities in India.",
    },
    {
      year: "2023",
      title: "Corporate Partnerships",
      description: "Launched B2B services and partnered with major corporations.",
    },
    {
      year: "2024",
      title: "50,000+ Customers",
      description: "Celebrated serving over 50,000 satisfied customers nationwide.",
    },
  ]

  const team = [
    {
      name: "Rajesh Kumar",
      position: "Founder & CEO",
      image: "/placeholder.svg?height=300&width=300",
      description: "Visionary leader with 10+ years in technology retail",
    },
    {
      name: "Priya Sharma",
      position: "Head of Operations",
      image: "/placeholder.svg?height=300&width=300",
      description: "Operations expert ensuring smooth customer experience",
    },
    {
      name: "Amit Singh",
      position: "Head of Technology",
      image: "/placeholder.svg?height=300&width=300",
      description: "Tech enthusiast driving innovation and product development",
    },
    {
      name: "Sneha Patel",
      position: "Head of Customer Success",
      image: "/placeholder.svg?height=300&width=300",
      description: "Customer advocate ensuring exceptional service delivery",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Genius Technology</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            We're passionate about bringing you the latest in mobile technology and accessories. Since 2019, we've been
            your trusted partner in staying connected and powered up.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="bg-white/20 text-white px-4 py-2">
              <CheckCircle className="h-4 w-4 mr-2" />
              Trusted by 50,000+ Customers
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white px-4 py-2">
              <CheckCircle className="h-4 w-4 mr-2" />
              Premium Quality Products
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white px-4 py-2">
              <CheckCircle className="h-4 w-4 mr-2" />
              Pan-India Delivery
            </Badge>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Stats Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <stat.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Our Story */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Genius Technology was born from a simple observation: people needed reliable, high-quality mobile
                  accessories that wouldn't break the bank. In 2019, our founder Rajesh Kumar started this journey with
                  a small team and a big vision.
                </p>
                <p>
                  What began as a small online store has grown into one of India's most trusted destinations for mobile
                  accessories. We've served over 50,000 customers across 100+ cities, always maintaining our commitment
                  to quality and customer satisfaction.
                </p>
                <p>
                  Today, we're not just a retailer – we're your technology partner, helping you stay connected,
                  productive, and entertained with the latest innovations in mobile technology.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Our Story"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <value.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600">Key milestones in our growth story</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8"}`}>
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                        <h3 className="text-lg font-semibold mb-2">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">The passionate people behind Genius Technology</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{member.position}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Genius Technology?</h2>
            <p className="text-lg text-gray-600">What makes us different from the rest</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <Award className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Premium Quality</h3>
                <p className="text-gray-600">
                  Every product is carefully selected and tested to ensure it meets our high standards.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Truck className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
                <p className="text-gray-600">
                  Quick and reliable delivery across India with same-day delivery in select cities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Expert Support</h3>
                <p className="text-gray-600">
                  Our knowledgeable team is always ready to help you find the perfect product.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Shield className="h-12 w-12 text-red-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Warranty Protection</h3>
                <p className="text-gray-600">Comprehensive warranty coverage and hassle-free replacement policy.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <TrendingUp className="h-12 w-12 text-orange-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Best Prices</h3>
                <p className="text-gray-600">Competitive pricing with regular deals and discounts for maximum value.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Heart className="h-12 w-12 text-pink-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Customer Love</h3>
                <p className="text-gray-600">Thousands of happy customers who trust us for their technology needs.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact CTA */}
        <section>
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Experience the Difference?</h2>
              <p className="text-xl mb-8">
                Join thousands of satisfied customers who trust Genius Technology for their mobile accessory needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/products"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Shop Now
                </a>
                <a
                  href="/contact"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      <Footer />
    </div>
  )
}
