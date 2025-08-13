"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

interface Brand {
  id: string
  name: string
  slug: string
  logo: string
  productCount: number
  isPopular: boolean
}

export function ShopByBrand() {
  const [brands] = useState<Brand[]>([
    {
      id: "1",
      name: "Apple",
      slug: "apple",
      logo: "/placeholder.svg?height=60&width=120&text=Apple",
      productCount: 45,
      isPopular: true,
    },
    {
      id: "2",
      name: "Samsung",
      slug: "samsung",
      logo: "/placeholder.svg?height=60&width=120&text=Samsung",
      productCount: 38,
      isPopular: true,
    },
    {
      id: "3",
      name: "OnePlus",
      slug: "oneplus",
      logo: "/placeholder.svg?height=60&width=120&text=OnePlus",
      productCount: 29,
      isPopular: true,
    },
    {
      id: "4",
      name: "Xiaomi",
      slug: "xiaomi",
      logo: "/placeholder.svg?height=60&width=120&text=Xiaomi",
      productCount: 34,
      isPopular: true,
    },
    {
      id: "5",
      name: "Realme",
      slug: "realme",
      logo: "/placeholder.svg?height=60&width=120&text=Realme",
      productCount: 27,
      isPopular: false,
    },
    {
      id: "6",
      name: "Oppo",
      slug: "oppo",
      logo: "/placeholder.svg?height=60&width=120&text=Oppo",
      productCount: 23,
      isPopular: false,
    },
    {
      id: "7",
      name: "Vivo",
      slug: "vivo",
      logo: "/placeholder.svg?height=60&width=120&text=Vivo",
      productCount: 21,
      isPopular: false,
    },
    {
      id: "8",
      name: "Nothing",
      slug: "nothing",
      logo: "/placeholder.svg?height=60&width=120&text=Nothing",
      productCount: 15,
      isPopular: false,
    },
    {
      id: "9",
      name: "Sony",
      slug: "sony",
      logo: "/placeholder.svg?height=60&width=120&text=Sony",
      productCount: 19,
      isPopular: false,
    },
    {
      id: "10",
      name: "JBL",
      slug: "jbl",
      logo: "/placeholder.svg?height=60&width=120&text=JBL",
      productCount: 16,
      isPopular: false,
    },
    {
      id: "11",
      name: "Boat",
      slug: "boat",
      logo: "/placeholder.svg?height=60&width=120&text=Boat",
      productCount: 31,
      isPopular: true,
    },
    {
      id: "12",
      name: "Noise",
      slug: "noise",
      logo: "/placeholder.svg?height=60&width=120&text=Noise",
      productCount: 24,
      isPopular: false,
    },
    {
      id: "13",
      name: "Anker",
      slug: "anker",
      logo: "/placeholder.svg?height=60&width=120&text=Anker",
      productCount: 18,
      isPopular: false,
    },
    {
      id: "14",
      name: "Belkin",
      slug: "belkin",
      logo: "/placeholder.svg?height=60&width=120&text=Belkin",
      productCount: 12,
      isPopular: false,
    },
    {
      id: "15",
      name: "Portronics",
      slug: "portronics",
      logo: "/placeholder.svg?height=60&width=120&text=Portronics",
      productCount: 26,
      isPopular: false,
    },
  ])

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">SHOP BY BRAND</h2>
          <p className="text-lg text-gray-600 mb-8">Choose from your favorite brands</p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {brands.slice(0, 15).map((brand) => (
            <Link
              key={brand.id}
              href={`/brand/${brand.slug}`}
              className="group relative bg-white border border-gray-200 rounded-xl p-6 hover:border-orange-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Popular Badge */}
              {brand.isPopular && (
                <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                  Popular
                </div>
              )}

              {/* Logo Container */}
              <div className="h-16 flex items-center justify-center mb-4 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors duration-300">
                <Image
                  src={brand.logo || "/placeholder.svg"}
                  alt={brand.name}
                  width={120}
                  height={60}
                  className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>

              {/* Brand Info */}
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-orange-500 transition-colors duration-300">
                  {brand.name}
                </h3>
                <p className="text-sm text-gray-600">{brand.productCount} Products</p>
              </div>
            </Link>
          ))}

          {/* View All Brands Card */}
          <Link
            href="/brands"
            className="group bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-dashed border-gray-300 rounded-xl p-6 hover:from-orange-50 hover:to-orange-100 hover:border-orange-300 transition-all duration-300 hover:-translate-y-1 flex flex-col items-center justify-center"
          >
            <div className="w-12 h-12 bg-gray-400 group-hover:bg-orange-500 rounded-full flex items-center justify-center mb-4 transition-colors duration-300">
              <span className="text-white text-2xl font-bold">+</span>
            </div>
            <h3 className="font-semibold text-gray-700 group-hover:text-orange-600 transition-colors duration-300">
              View All Brands
            </h3>
            <p className="text-sm text-gray-500 group-hover:text-orange-500 transition-colors duration-300">
              Explore More
            </p>
          </Link>
        </div>

        {/* Featured Brands Showcase */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Featured Brand Partners</h3>
            <p className="text-gray-600">Trusted by millions of customers worldwide</p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
            {brands
              .filter((brand) => brand.isPopular)
              .map((brand) => (
                <div key={brand.id} className="text-center">
                  <Image
                    src={brand.logo || "/placeholder.svg"}
                    alt={brand.name}
                    width={100}
                    height={50}
                    className="mx-auto filter grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
