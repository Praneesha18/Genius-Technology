"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Headphones, Zap, Smartphone, Watch, Car, Battery, Cable, Speaker, Shield, Gamepad2, Plus } from "lucide-react"

interface Category {
  id: string
  name: string
  slug: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  productCount: number
  startingPrice: number
  gradient: string
  description: string
}

export function ShopByCategory() {
  const [categories] = useState<Category[]>([
    {
      id: "1",
      name: "Neckbands",
      slug: "neckbands",
      icon: Headphones,
      productCount: 24,
      startingPrice: 299,
      gradient: "from-orange-500 to-orange-600",
      description: "Wireless neckband headphones",
    },
    {
      id: "2",
      name: "Wireless Speakers",
      slug: "wireless-speakers",
      icon: Speaker,
      productCount: 18,
      startingPrice: 599,
      gradient: "from-purple-500 to-purple-600",
      description: "Portable bluetooth speakers",
    },
    {
      id: "3",
      name: "Cables",
      slug: "cables",
      icon: Cable,
      productCount: 67,
      startingPrice: 99,
      gradient: "from-green-500 to-green-600",
      description: "USB, Lightning & Type-C cables",
    },
    {
      id: "4",
      name: "Fast Chargers",
      slug: "fast-chargers",
      icon: Zap,
      productCount: 45,
      startingPrice: 399,
      gradient: "from-yellow-500 to-orange-500",
      description: "Quick charging adapters",
    },
    {
      id: "5",
      name: "Car Chargers",
      slug: "car-chargers",
      icon: Car,
      productCount: 23,
      startingPrice: 249,
      gradient: "from-pink-500 to-pink-600",
      description: "In-car charging solutions",
    },
    {
      id: "6",
      name: "Headphones",
      slug: "headphones",
      icon: Headphones,
      productCount: 32,
      startingPrice: 799,
      gradient: "from-blue-500 to-blue-600",
      description: "Over-ear & on-ear headphones",
    },
    {
      id: "7",
      name: "Power Banks",
      slug: "power-banks",
      icon: Battery,
      productCount: 34,
      startingPrice: 699,
      gradient: "from-indigo-500 to-indigo-600",
      description: "Portable power solutions",
    },
    {
      id: "8",
      name: "Smart Watches",
      slug: "smart-watches",
      icon: Watch,
      productCount: 29,
      startingPrice: 1999,
      gradient: "from-gray-700 to-gray-800",
      description: "Fitness & smart wearables",
    },
    {
      id: "9",
      name: "Wireless TWS",
      slug: "wireless-tws",
      icon: Headphones,
      productCount: 28,
      startingPrice: 899,
      gradient: "from-teal-500 to-teal-600",
      description: "True wireless earbuds",
    },
    {
      id: "10",
      name: "Mobile Holders",
      slug: "mobile-holders",
      icon: Smartphone,
      productCount: 19,
      startingPrice: 199,
      gradient: "from-amber-500 to-orange-500",
      description: "Phone stands & mounts",
    },
    {
      id: "11",
      name: "Screen Protectors",
      slug: "screen-protectors",
      icon: Shield,
      productCount: 43,
      startingPrice: 149,
      gradient: "from-emerald-500 to-emerald-600",
      description: "Tempered glass & films",
    },
    {
      id: "12",
      name: "Gaming Accessories",
      slug: "gaming-accessories",
      icon: Gamepad2,
      productCount: 21,
      startingPrice: 499,
      gradient: "from-red-500 to-red-600",
      description: "Gaming controllers & gear",
    },
  ])

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">SHOP BY CATEGORY</h2>
          <p className="text-lg text-gray-600 mb-8">Find exactly what you're looking for</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Icon Area */}
              <div
                className={`h-32 bg-gradient-to-br ${category.gradient} flex items-center justify-center relative overflow-hidden`}
              >
                <category.icon
                  size={64}
                  className="text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                />

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/20 rounded-full"></div>
                <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-white/10 rounded-full"></div>
              </div>

              {/* Content Area */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors duration-300">
                  {category.name}
                </h3>

                <p className="text-sm text-gray-600 mb-3">{category.description}</p>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-orange-500">
                      Starting at ₹{category.startingPrice.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">{category.productCount} products</p>
                  </div>

                  <div className="w-8 h-8 bg-gray-100 group-hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors duration-300">
                    <span className="text-gray-600 group-hover:text-white text-lg">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* View All Categories Card */}
          <Link
            href="/categories"
            className="group bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-dashed border-gray-300 rounded-2xl p-8 hover:from-orange-50 hover:to-orange-100 hover:border-orange-300 transition-all duration-300 hover:-translate-y-2 flex flex-col items-center justify-center text-center"
          >
            <div className="w-16 h-16 bg-gray-400 group-hover:bg-orange-500 rounded-full flex items-center justify-center mb-4 transition-colors duration-300">
              <Plus size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 group-hover:text-orange-600 transition-colors duration-300 mb-2">
              View All Categories
            </h3>
            <p className="text-sm text-gray-500 group-hover:text-orange-500 transition-colors duration-300">
              Explore our complete range
            </p>
          </Link>
        </div>

        {/* Category Stats */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-500 mb-2">12+</div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-500 mb-2">500+</div>
              <div className="text-gray-600">Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-500 mb-2">50+</div>
              <div className="text-gray-600">Brands</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-500 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
