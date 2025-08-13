"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Play, Heart, MessageCircle, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Testimonial {
  id: string
  type: "text" | "video" | "instagram"
  customerName: string
  customerPhoto: string
  rating: number
  content: string
  productPurchased: string
  date: string
  isVerified: boolean
  videoThumbnail?: string
  videoDuration?: string
  instagramHandle?: string
  instagramLikes?: number
  instagramComments?: number
}

export function CustomerTestimonials() {
  const [testimonials] = useState<Testimonial[]>([
    {
      id: "1",
      type: "text",
      customerName: "Rajesh Kumar",
      customerPhoto: "/placeholder.svg?height=60&width=60&text=RK",
      rating: 5,
      content:
        "Amazing quality headphones! The sound is crystal clear and the battery life is incredible. I use them daily for work calls and music. Highly recommend Genius Technology for their excellent products and fast delivery.",
      productPurchased: "Wireless Bluetooth Headphones Pro",
      date: "2024-01-15",
      isVerified: true,
    },
    {
      id: "2",
      type: "video",
      customerName: "Priya Sharma",
      customerPhoto: "/placeholder.svg?height=60&width=60&text=PS",
      rating: 5,
      content:
        "Watch my detailed review of this amazing power bank! It charges my phone 4 times and the fast charging is incredible.",
      productPurchased: "Fast Charging Power Bank 20000mAh",
      date: "2024-01-12",
      isVerified: true,
      videoThumbnail: "/placeholder.svg?height=300&width=400&text=Video+Review",
      videoDuration: "2:34",
    },
    {
      id: "3",
      type: "instagram",
      customerName: "techreview_india",
      customerPhoto: "/placeholder.svg?height=60&width=60&text=TR",
      rating: 5,
      content:
        "Just got this wireless charger from @geniustechnology and it's a game changer! Fast charging and sleek design. Perfect for my desk setup. #TechReview #WirelessCharging #GeniusTech",
      productPurchased: "Wireless Charging Pad 15W",
      date: "2024-01-10",
      isVerified: true,
      instagramHandle: "@techreview_india",
      instagramLikes: 234,
      instagramComments: 18,
    },
  ])

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">WHAT OUR CUSTOMERS SAY</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of satisfied customers who trust Genius Technology
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="secondary" className="bg-green-100 text-green-800 px-4 py-2">
              ⭐ 4.8/5 Average Rating
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-4 py-2">
              📦 50,000+ Happy Customers
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800 px-4 py-2">
              ✅ 98% Satisfaction Rate
            </Badge>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Customer Stats */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-500 mb-2">50K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-500 mb-2">4.8★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-500 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-500 mb-2">24/7</div>
              <div className="text-gray-600">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} size={16} className={i < rating ? "text-yellow-400 fill-current" : "text-gray-300"} />
    ))
  }

  if (testimonial.type === "text") {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
        {/* Customer Info */}
        <div className="flex items-center mb-4">
          <Image
            src={testimonial.customerPhoto || "/placeholder.svg"}
            alt={testimonial.customerName}
            width={60}
            height={60}
            className="rounded-full border-3 border-orange-500"
          />
          <div className="ml-4">
            <h4 className="font-semibold text-gray-900">{testimonial.customerName}</h4>
            {testimonial.isVerified && (
              <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                ✓ Verified Purchase
              </Badge>
            )}
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-4">{renderStars(testimonial.rating)}</div>

        {/* Review Content */}
        <p className="text-gray-700 italic mb-4 leading-relaxed">"{testimonial.content}"</p>

        {/* Product Info */}
        <div className="text-sm text-gray-500 border-t pt-4">
          <p>
            <strong>Purchased:</strong> {testimonial.productPurchased}
          </p>
          <p>
            <strong>Date:</strong> {new Date(testimonial.date).toLocaleDateString()}
          </p>
        </div>
      </div>
    )
  }

  if (testimonial.type === "video") {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
        {/* Video Thumbnail */}
        <div className="relative h-48 bg-gray-900">
          <Image
            src={testimonial.videoThumbnail! || "/placeholder.svg"}
            alt="Video review thumbnail"
            fill
            className="object-cover"
          />

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200">
              <Play size={24} className="text-gray-900 ml-1" />
            </button>
          </div>

          {/* Duration Badge */}
          <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-sm">
            {testimonial.videoDuration}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Customer Info */}
          <div className="flex items-center mb-4">
            <Image
              src={testimonial.customerPhoto || "/placeholder.svg"}
              alt={testimonial.customerName}
              width={50}
              height={50}
              className="rounded-full border-2 border-orange-500"
            />
            <div className="ml-3">
              <h4 className="font-semibold text-gray-900">{testimonial.customerName}</h4>
              {testimonial.isVerified && (
                <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                  ✓ Verified Purchase
                </Badge>
              )}
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center mb-3">{renderStars(testimonial.rating)}</div>

          {/* Review Content */}
          <p className="text-gray-700 text-sm mb-3">{testimonial.content}</p>

          {/* Product Info */}
          <div className="text-xs text-gray-500 border-t pt-3">
            <p>
              <strong>Product:</strong> {testimonial.productPurchased}
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (testimonial.type === "instagram") {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
        {/* Instagram Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <Image
              src={testimonial.customerPhoto || "/placeholder.svg"}
              alt={testimonial.customerName}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="ml-3">
              <h4 className="font-semibold text-gray-900 text-sm">{testimonial.customerName}</h4>
              <p className="text-xs text-gray-500">{testimonial.instagramHandle}</p>
            </div>
          </div>
          <a
            href={`https://instagram.com/${testimonial.customerName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600"
          >
            <ExternalLink size={16} />
          </a>
        </div>

        {/* Post Image */}
        <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
          <Image
            src="/placeholder.svg?height=200&width=300&text=Instagram+Post"
            alt="Instagram post"
            width={300}
            height={200}
            className="object-cover"
          />
        </div>

        {/* Post Content */}
        <div className="p-4">
          {/* Rating */}
          <div className="flex items-center mb-3">{renderStars(testimonial.rating)}</div>

          {/* Caption */}
          <p className="text-gray-700 text-sm mb-4 leading-relaxed">{testimonial.content}</p>

          {/* Engagement */}
          <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-3">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Heart size={14} className="mr-1" />
                {testimonial.instagramLikes}
              </span>
              <span className="flex items-center">
                <MessageCircle size={14} className="mr-1" />
                {testimonial.instagramComments}
              </span>
            </div>
            <span>{new Date(testimonial.date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    )
  }

  return null
}
