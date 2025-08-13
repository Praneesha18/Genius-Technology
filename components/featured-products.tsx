"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Heart, ShoppingCart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"

interface Product {
  id: string
  name: string
  brand: string
  image: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  category: string
  isNew: boolean
  isBestseller: boolean
  stock: number
}

export function FeaturedProducts() {
  const [activeFilter, setActiveFilter] = useState("all")
  const { addItem } = useCart()
  const { addItem: addToWishlist, isInWishlist } = useWishlist()

  const [products] = useState<Product[]>([
    {
      id: "1",
      name: "Premium Wireless Earbuds Pro",
      brand: "AudioMax",
      image: "/placeholder.svg?height=180&width=220&text=Earbuds",
      price: 2499,
      originalPrice: 3999,
      rating: 4.8,
      reviewCount: 156,
      category: "audio",
      isNew: true,
      isBestseller: true,
      stock: 25,
    },
    {
      id: "2",
      name: "Fast Charging Power Bank 30000mAh",
      brand: "PowerPro",
      image: "/placeholder.svg?height=180&width=220&text=Power+Bank",
      price: 3299,
      originalPrice: 4999,
      rating: 4.6,
      reviewCount: 203,
      category: "charging",
      isNew: false,
      isBestseller: true,
      stock: 18,
    },
    {
      id: "3",
      name: "Magnetic Wireless Car Charger",
      brand: "AutoTech",
      image: "/placeholder.svg?height=180&width=220&text=Car+Charger",
      price: 1899,
      originalPrice: 2999,
      rating: 4.4,
      reviewCount: 89,
      category: "accessories",
      isNew: true,
      isBestseller: false,
      stock: 32,
    },
    {
      id: "4",
      name: "Smart Fitness Watch Series 5",
      brand: "WearTech",
      image: "/placeholder.svg?height=180&width=220&text=Smart+Watch",
      price: 8999,
      originalPrice: 12999,
      rating: 4.7,
      reviewCount: 267,
      category: "smart-devices",
      isNew: false,
      isBestseller: true,
      stock: 12,
    },
    {
      id: "5",
      name: "Bluetooth Gaming Headset",
      brand: "GameMax",
      image: "/placeholder.svg?height=180&width=220&text=Gaming+Headset",
      price: 3499,
      originalPrice: 4999,
      rating: 4.5,
      reviewCount: 134,
      category: "audio",
      isNew: true,
      isBestseller: false,
      stock: 28,
    },
    {
      id: "6",
      name: "Wireless Charging Pad 15W",
      brand: "ChargeTech",
      image: "/placeholder.svg?height=180&width=220&text=Wireless+Charger",
      price: 1299,
      originalPrice: 1999,
      rating: 4.3,
      reviewCount: 98,
      category: "charging",
      isNew: false,
      isBestseller: false,
      stock: 45,
    },
    {
      id: "7",
      name: "Premium Phone Case with MagSafe",
      brand: "CaseMaster",
      image: "/placeholder.svg?height=180&width=220&text=Phone+Case",
      price: 999,
      originalPrice: 1499,
      rating: 4.2,
      reviewCount: 176,
      category: "accessories",
      isNew: false,
      isBestseller: true,
      stock: 67,
    },
    {
      id: "8",
      name: "Portable Bluetooth Speaker 360°",
      brand: "SoundMax",
      image: "/placeholder.svg?height=180&width=220&text=Speaker",
      price: 4999,
      originalPrice: 7999,
      rating: 4.9,
      reviewCount: 312,
      category: "audio",
      isNew: true,
      isBestseller: true,
      stock: 15,
    },
    {
      id: "9",
      name: "Multi-Port USB-C Hub",
      brand: "ConnectPro",
      image: "/placeholder.svg?height=180&width=220&text=USB+Hub",
      price: 2299,
      originalPrice: 3499,
      rating: 4.4,
      reviewCount: 87,
      category: "accessories",
      isNew: false,
      isBestseller: false,
      stock: 38,
    },
    {
      id: "10",
      name: "Wireless Charging Stand",
      brand: "StandTech",
      image: "/placeholder.svg?height=180&width=220&text=Charging+Stand",
      price: 1799,
      originalPrice: 2499,
      rating: 4.1,
      reviewCount: 65,
      category: "charging",
      isNew: true,
      isBestseller: false,
      stock: 29,
    },
    {
      id: "11",
      name: "Smart Home Security Camera",
      brand: "SecureTech",
      image: "/placeholder.svg?height=180&width=220&text=Security+Camera",
      price: 5999,
      originalPrice: 8999,
      rating: 4.6,
      reviewCount: 143,
      category: "smart-devices",
      isNew: true,
      isBestseller: false,
      stock: 21,
    },
    {
      id: "12",
      name: "Ergonomic Phone Stand",
      brand: "ErgoTech",
      image: "/placeholder.svg?height=180&width=220&text=Phone+Stand",
      price: 699,
      originalPrice: 999,
      rating: 4.0,
      reviewCount: 54,
      category: "accessories",
      isNew: false,
      isBestseller: false,
      stock: 52,
    },
  ])

  const filters = [
    { id: "all", label: "All Products" },
    { id: "audio", label: "Audio" },
    { id: "charging", label: "Charging" },
    { id: "accessories", label: "Accessories" },
    { id: "smart-devices", label: "Smart Devices" },
  ]

  const filteredProducts =
    activeFilter === "all" ? products : products.filter((product) => product.category === activeFilter)

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      maxQuantity: product.stock,
    })
  }

  const handleAddToWishlist = (product: Product) => {
    addToWishlist({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">TOP SELLING PRODUCTS</h2>
          <p className="text-lg text-gray-600 mb-8">Most loved by our customers</p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? "bg-orange-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredProducts.slice(0, 12).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => handleAddToCart(product)}
              onAddToWishlist={() => handleAddToWishlist(product)}
              isInWishlist={isInWishlist(product.id)}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/products">
            <Button size="lg" variant="outline" className="px-8 py-3 bg-transparent">
              View All Products →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

function ProductCard({
  product,
  onAddToCart,
  onAddToWishlist,
  isInWishlist,
}: {
  product: Product
  onAddToCart: () => void
  onAddToWishlist: () => void
  isInWishlist: boolean
}) {
  return (
    <div className="product-card bg-white rounded-xl shadow-md overflow-hidden group">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-gray-50">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="product-image object-cover transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && <Badge className="bg-green-500 text-white">New</Badge>}
          {product.isBestseller && <Badge className="bg-orange-500 text-white">Bestseller</Badge>}
          {product.originalPrice && (
            <Badge variant="destructive">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={onAddToWishlist}
            className="p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-colors duration-200"
          >
            <Heart size={16} className={isInWishlist ? "text-red-500 fill-current" : "text-gray-600"} />
          </button>
          <Link href={`/product/${product.id}`}>
            <button className="p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-colors duration-200">
              <Eye size={16} className="text-gray-600" />
            </button>
          </Link>
        </div>

        {/* Stock Status */}
        {product.stock < 10 && (
          <div className="absolute bottom-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Only {product.stock} left!
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Brand */}
        <p className="text-sm text-gray-500 mb-1">{product.brand}</p>

        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-12">{product.name}</h3>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-orange-500">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          {product.originalPrice && (
            <p className="text-sm text-green-600 font-medium">
              Save ₹{(product.originalPrice - product.price).toLocaleString()}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={onAddToCart}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
            disabled={product.stock === 0}
          >
            <ShoppingCart size={16} className="mr-2" />
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  )
}
