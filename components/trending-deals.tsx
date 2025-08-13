"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Heart, ShoppingCart, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"

interface Deal {
  id: string
  name: string
  brand: string
  image: string
  originalPrice: number
  salePrice: number
  discount: number
  rating: number
  reviewCount: number
  timeLeft: number // in seconds
  stock: number
}

export function TrendingDeals() {
  const { addItem } = useCart()
  const { addItem: addToWishlist, isInWishlist } = useWishlist()

  const [deals] = useState<Deal[]>([
    {
      id: "1",
      name: "Wireless Bluetooth Headphones",
      brand: "SoundMax",
      image: "/placeholder.svg?height=200&width=200&text=Headphones",
      originalPrice: 2999,
      salePrice: 1499,
      discount: 50,
      rating: 4.5,
      reviewCount: 234,
      timeLeft: 86400, // 24 hours
      stock: 15,
    },
    {
      id: "2",
      name: "Fast Charging Power Bank 20000mAh",
      brand: "PowerPro",
      image: "/placeholder.svg?height=200&width=200&text=Power+Bank",
      originalPrice: 3499,
      salePrice: 1999,
      discount: 43,
      rating: 4.3,
      reviewCount: 189,
      timeLeft: 43200, // 12 hours
      stock: 8,
    },
    {
      id: "3",
      name: "Wireless Car Charger Mount",
      brand: "AutoTech",
      image: "/placeholder.svg?height=200&width=200&text=Car+Charger",
      originalPrice: 1999,
      salePrice: 999,
      discount: 50,
      rating: 4.2,
      reviewCount: 156,
      timeLeft: 21600, // 6 hours
      stock: 23,
    },
    {
      id: "4",
      name: "Premium Phone Case with Stand",
      brand: "CaseMaster",
      image: "/placeholder.svg?height=200&width=200&text=Phone+Case",
      originalPrice: 1299,
      salePrice: 699,
      discount: 46,
      rating: 4.4,
      reviewCount: 298,
      timeLeft: 64800, // 18 hours
      stock: 31,
    },
    {
      id: "5",
      name: "Bluetooth Wireless Speaker",
      brand: "AudioMax",
      image: "/placeholder.svg?height=200&width=200&text=Speaker",
      originalPrice: 4999,
      salePrice: 2499,
      discount: 50,
      rating: 4.6,
      reviewCount: 412,
      timeLeft: 32400, // 9 hours
      stock: 12,
    },
  ])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleAddToCart = (deal: Deal) => {
    addItem({
      id: deal.id,
      productId: deal.id,
      name: deal.name,
      price: deal.salePrice,
      image: deal.image,
      maxQuantity: deal.stock,
    })
  }

  const handleAddToWishlist = (deal: Deal) => {
    addToWishlist({
      id: deal.id,
      productId: deal.id,
      name: deal.name,
      price: deal.salePrice,
      image: deal.image,
    })
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">TRENDING DEALS - LIMITED TIME OFFERS</h2>
          <p className="text-lg text-gray-600 mb-6">Grab these deals before they're gone!</p>
          <div className="flex justify-center">
            <Badge variant="destructive" className="text-sm px-4 py-2">
              <Clock size={16} className="mr-2" />
              Limited Time Only
            </Badge>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          {deals.map((deal) => (
            <DealCard
              key={deal.id}
              deal={deal}
              onAddToCart={() => handleAddToCart(deal)}
              onAddToWishlist={() => handleAddToWishlist(deal)}
              isInWishlist={isInWishlist(deal.id)}
              formatTime={formatTime}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/deals">
            <Button size="lg" variant="outline" className="px-8 py-3 bg-transparent">
              View All Deals →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

function DealCard({
  deal,
  onAddToCart,
  onAddToWishlist,
  isInWishlist,
  formatTime,
}: {
  deal: Deal
  onAddToCart: () => void
  onAddToWishlist: () => void
  isInWishlist: boolean
  formatTime: (seconds: number) => string
}) {
  const [timeLeft, setTimeLeft] = useState(deal.timeLeft)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={deal.image || "/placeholder.svg"}
          alt={deal.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Discount Badge */}
        <Badge className="absolute top-3 right-3 bg-red-500 text-white">{deal.discount}% OFF</Badge>

        {/* Timer Badge */}
        <div className="absolute bottom-3 left-3 bg-black/80 text-white px-2 py-1 rounded-lg text-xs font-mono">
          {formatTime(timeLeft)}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={onAddToWishlist}
          className="absolute top-3 left-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-200"
        >
          <Heart size={16} className={isInWishlist ? "text-red-500 fill-current" : "text-gray-600"} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Brand */}
        <p className="text-sm text-gray-500 mb-1">{deal.brand}</p>

        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-12">{deal.name}</h3>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(deal.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">({deal.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-orange-500">₹{deal.salePrice.toLocaleString()}</span>
            <span className="text-sm text-gray-500 line-through">₹{deal.originalPrice.toLocaleString()}</span>
          </div>
          <p className="text-sm text-green-600 font-medium">
            Save ₹{(deal.originalPrice - deal.salePrice).toLocaleString()}
          </p>
        </div>

        {/* Stock Info */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Stock:</span>
            <span className={`font-medium ${deal.stock < 10 ? "text-red-500" : "text-green-600"}`}>
              {deal.stock < 10 ? `Only ${deal.stock} left!` : "In Stock"}
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={onAddToCart}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition-colors duration-200"
          disabled={deal.stock === 0}
        >
          <ShoppingCart size={16} className="mr-2" />
          {deal.stock === 0 ? "Out of Stock" : "Quick Buy"}
        </Button>
      </div>
    </div>
  )
}
