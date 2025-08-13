"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingCart, Heart, User, Menu, X, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)

  const { user, logout } = useAuth()
  const { getTotalItems } = useCart()
  const { items: wishlistItems } = useWishlist()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const productCategories = [
    {
      title: "AUDIO ACCESSORIES",
      items: [
        { name: "Neckbands", count: 24, href: "/category/neckbands" },
        { name: "Wireless Speakers", count: 18, href: "/category/wireless-speakers" },
        { name: "Headphones", count: 32, href: "/category/headphones" },
        { name: "Wireless TWS", count: 28, href: "/category/wireless-tws" },
      ],
    },
    {
      title: "CHARGING SOLUTIONS",
      items: [
        { name: "Fast Chargers", count: 45, href: "/category/fast-chargers" },
        { name: "Car Chargers", count: 23, href: "/category/car-chargers" },
        { name: "Power Banks", count: 34, href: "/category/power-banks" },
        { name: "Cables", count: 67, href: "/category/cables" },
      ],
    },
    {
      title: "MOBILE ACCESSORIES",
      items: [
        { name: "Mobile Holders", count: 19, href: "/category/mobile-holders" },
        { name: "Mobile Batteries", count: 15, href: "/category/mobile-batteries" },
        { name: "Screen Protectors", count: 43, href: "/category/screen-protectors" },
        { name: "Mobile Cases", count: 78, href: "/category/mobile-cases" },
      ],
    },
    {
      title: "SMART DEVICES",
      items: [
        { name: "Smart Watches", count: 29, href: "/category/smart-watches" },
        { name: "Fitness Trackers", count: 12, href: "/category/fitness-trackers" },
        { name: "Smart Home", count: 8, href: "/category/smart-home" },
        { name: "Gaming Accessories", count: 21, href: "/category/gaming-accessories" },
      ],
    },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        isScrolled ? "shadow-lg" : "shadow-sm"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
            <Image
              src="/placeholder.svg?height=50&width=180&text=GENIUS+TECHNOLOGY"
              alt="Genius Technology"
              width={180}
              height={50}
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="nav-link">
              HOME
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={() => setIsProductsOpen(false)}
            >
              <button className="nav-link flex items-center">
                OUR PRODUCTS
                <ChevronDown size={16} className="ml-1" />
              </button>

              {/* Mega Menu */}
              {isProductsOpen && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-screen max-w-4xl bg-white shadow-2xl rounded-lg mt-2 p-8 animate-fade-in">
                  <div className="grid grid-cols-4 gap-8">
                    {productCategories.map((category, index) => (
                      <div key={index}>
                        <h3 className="font-bold text-gray-900 mb-4">{category.title}</h3>
                        <ul className="space-y-2">
                          {category.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <Link
                                href={item.href}
                                className="flex items-center justify-between text-gray-600 hover:text-orange-500 transition-colors duration-200"
                              >
                                <span>{item.name}</span>
                                <span className="text-xs text-gray-400">({item.count})</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/corporate" className="nav-link">
              CORPORATE ORDERS
            </Link>
            <Link href="/join" className="nav-link">
              JOIN WITH US
            </Link>
            <Link href="/about" className="nav-link">
              ABOUT US
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-2 border-2 border-gray-200 rounded-full focus:border-orange-500 focus:ring-0"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors duration-200">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Header Icons */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <Heart size={24} className="text-gray-600 hover:text-red-500" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <ShoppingCart size={24} className="text-gray-600 hover:text-orange-500" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* User Account */}
            <div className="relative group">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                <User size={24} className="text-gray-600" />
              </button>

              {/* User Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {user ? (
                  <>
                    <div className="px-4 py-2 border-b">
                      <p className="font-semibold text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <Link href="/account" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      My Account
                    </Link>
                    <Link href="/account/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      My Orders
                    </Link>
                    <Link href="/wishlist" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Wishlist
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Sign In
                    </Link>
                    <Link href="/register" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t animate-fade-in">
            <div className="py-4 space-y-4">
              {/* Mobile Search */}
              <div className="px-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-4 pr-12 py-2 border-2 border-gray-200 rounded-full"
                  />
                  <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Mobile Navigation */}
              <nav className="px-4 space-y-2">
                <Link href="/" className="block py-2 text-gray-700 hover:text-orange-500">
                  HOME
                </Link>
                <Link href="/products" className="block py-2 text-gray-700 hover:text-orange-500">
                  OUR PRODUCTS
                </Link>
                <Link href="/corporate" className="block py-2 text-gray-700 hover:text-orange-500">
                  CORPORATE ORDERS
                </Link>
                <Link href="/join" className="block py-2 text-gray-700 hover:text-orange-500">
                  JOIN WITH US
                </Link>
                <Link href="/about" className="block py-2 text-gray-700 hover:text-orange-500">
                  ABOUT US
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .nav-link {
          @apply text-gray-700 font-semibold hover:text-orange-500 transition-colors duration-200 relative;
        }
        .nav-link:hover::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(to right, #ff6b35, #f7931e);
          border-radius: 2px;
        }
      `}</style>
    </header>
  )
}
