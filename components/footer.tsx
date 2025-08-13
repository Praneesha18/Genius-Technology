import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, Linkedin, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-800 text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: About Genius Technology */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-6">ABOUT GENIUS TECHNOLOGY</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-brand-primary transition-colors duration-300">
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/about#mission"
                  className="text-gray-300 hover:text-brand-primary transition-colors duration-300"
                >
                  Mission & Vision
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-brand-primary transition-colors duration-300">
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/investors"
                  className="text-gray-300 hover:text-brand-primary transition-colors duration-300"
                >
                  Investors
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-gray-300 hover:text-brand-primary transition-colors duration-300">
                  Press & Media
                </Link>
              </li>
              <li>
                <Link href="/awards" className="text-gray-300 hover:text-brand-primary transition-colors duration-300">
                  Awards & Recognition
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Customer Service */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-6">CUSTOMER SERVICE</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-brand-primary transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-brand-primary transition-colors duration-300">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-300 hover:text-brand-primary transition-colors duration-300"
                >
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-300 hover:text-brand-primary transition-colors duration-300">
                  Return & Exchange
                </Link>
              </li>
              <li>
                <Link
                  href="/warranty"
                  className="text-gray-300 hover:text-brand-primary transition-colors duration-300"
                >
                  Warranty Claims
                </Link>
              </li>
              <li>
                <Link
                  href="/track-order"
                  className="text-gray-300 hover:text-brand-primary transition-colors duration-300"
                >
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-6">QUICK LINKS</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-brand-primary transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-brand-primary transition-colors duration-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/return-policy"
                  className="text-gray-300 hover:text-brand-primary transition-colors duration-300"
                >
                  Return Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/warranty-info"
                  className="text-gray-300 hover:text-brand-primary transition-colors duration-300"
                >
                  Warranty Information
                </Link>
              </li>
              <li>
                <Link
                  href="/corporate"
                  className="text-gray-300 hover:text-brand-primary transition-colors duration-300"
                >
                  Bulk Orders
                </Link>
              </li>
              <li>
                <Link href="/join" className="text-gray-300 hover:text-brand-primary transition-colors duration-300">
                  Become a Seller
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Product Categories */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-6">CATEGORIES</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/category/audio-accessories"
                  className="text-gray-300 hover:text-brand-primary transition-colors duration-300"
                >
                  Audio Accessories
                </Link>
              </li>
              <li>
                <Link
                  href="/category/charging-solutions"
                  className="text-gray-300 hover:text-brand-primary transition-colors duration-300"
                >
                  Charging Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/category/mobile-accessories"
                  className="text-gray-300 hover:text-brand-primary transition-colors duration-300"
                >
                  Mobile Accessories
                </Link>
              </li>
              <li>
                <Link
                  href="/category/smart-devices"
                  className="text-gray-300 hover:text-brand-primary transition-colors duration-300"
                >
                  Smart Devices
                </Link>
              </li>
              <li>
                <Link
                  href="/category/gaming-accessories"
                  className="text-gray-300 hover:text-brand-primary transition-colors duration-300"
                >
                  Gaming Accessories
                </Link>
              </li>
              <li>
                <Link
                  href="/category/computer-accessories"
                  className="text-gray-300 hover:text-brand-primary transition-colors duration-300"
                >
                  Computer Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Connect With Us */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-6">CONNECT WITH US</h3>

            {/* Social Icons */}
            <div className="flex space-x-4 mb-6">
              <a
                href="https://facebook.com/geniustechnology"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-300"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com/geniustechnology"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com/geniustechnology"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors duration-300"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://youtube.com/geniustechnology"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors duration-300"
              >
                <Youtube size={20} />
              </a>
              <a
                href="https://linkedin.com/company/geniustechnology"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors duration-300"
              >
                <Linkedin size={20} />
              </a>
            </div>

            {/* Newsletter Signup */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Get latest offers and updates</h4>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-brand-primary"
                />
                <Button className="bg-brand-primary hover:bg-orange-600 px-4">Subscribe</Button>
              </div>
            </div>

            {/* App Download */}
            <div>
              <h4 className="font-semibold mb-3">Download Our App</h4>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block w-full bg-black rounded-lg p-2 hover:bg-gray-800 transition-colors duration-300"
                >
                  <Image
                    src="/placeholder.svg?height=40&width=135&text=Google+Play"
                    alt="Get it on Google Play"
                    width={135}
                    height={40}
                    className="w-full h-auto"
                  />
                </a>
                <a
                  href="#"
                  className="block w-full bg-black rounded-lg p-2 hover:bg-gray-800 transition-colors duration-300"
                >
                  <Image
                    src="/placeholder.svg?height=40&width=135&text=App+Store"
                    alt="Download on the App Store"
                    width={135}
                    height={40}
                    className="w-full h-auto"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-slate-900 border-t border-slate-700">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">© {currentYear} Genius Technology | All Rights Reserved</div>

            {/* Contact Info */}
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-gray-400 text-sm">
              <div className="flex items-center">
                <Mail size={16} className="mr-2" />
                the.genius.technology.india@gmail.com
              </div>
              <div className="flex items-center">
                <Phone size={16} className="mr-2" />
                1800-123-4567
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm mr-2">We Accept:</span>
              <div className="flex space-x-2">
                {["Visa", "Mastercard", "PayPal", "UPI", "Razorpay"].map((method) => (
                  <div
                    key={method}
                    className="w-10 h-6 bg-gray-600 rounded flex items-center justify-center text-xs text-white hover:bg-gray-500 transition-colors duration-300"
                  >
                    {method.slice(0, 4)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
