"use client"

import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/types"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { useComparison } from "@/contexts/comparison-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart, Eye, GitCompare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ProductCardProps {
  product: Product
  viewMode?: "grid" | "list"
}

export function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { addToComparison, isInComparison } = useComparison()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addToCart(product.id, 1, product.price, product.options ? product.options[0].values[0] : undefined) // Default to first option if available
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleToggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      })
    } else {
      addToWishlist(product.id)
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      })
    }
  }

  const handleAddToCompare = () => {
    if (!isInComparison(product.id)) {
      addToComparison(product)
      toast({
        title: "Added to comparison",
        description: `${product.name} has been added to the comparison list.`,
      })
    }
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  if (viewMode === "list") {
    return (
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative w-full sm:w-32 h-48 sm:h-32 flex-shrink-0">
              <Image
                src={product.images[0] || "/placeholder.svg?height=200&width=200&query=product image"}
                alt={product.name}
                fill
                className="object-contain rounded-lg"
              />
              {discount > 0 && <Badge className="absolute top-2 right-2 bg-red-600">-{discount}%</Badge>}
            </div>

            <div className="flex-1 space-y-2">
              <Link href={`/product/${product.id}`}>
                <h3 className="font-semibold text-lg hover:text-blue-600 transition-colors line-clamp-2">
                  {product.name}
                </h3>
              </Link>

              <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>

              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.reviews})</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-green-600">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <Button onClick={handleAddToCart} size="sm">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleToggleWishlist}
                  className={isInWishlist(product.id) ? "bg-red-50 text-red-600 border-red-200" : ""}
                >
                  <Heart className="h-4 w-4" />
                  <span className="sr-only">Toggle Wishlist</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddToCompare}
                  disabled={isInComparison(product.id)}
                  className={isInComparison(product.id) ? "bg-gray-100 text-gray-700 border-gray-200" : ""}
                >
                  <GitCompare className="h-4 w-4" />
                  <span className="sr-only">Add to Compare</span>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/product/${product.id}`}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-4">
        <div className="relative mb-4">
          <Image
            src={product.images[0] || "/placeholder.svg?height=250&width=250&query=product image"}
            alt={product.name}
            width={250}
            height={250}
            className="w-full h-48 object-contain rounded-lg"
          />

          {product.featured && <Badge className="absolute top-2 left-2 bg-green-600">Featured</Badge>}

          {discount > 0 && <Badge className="absolute top-2 right-2 bg-red-600">-{discount}%</Badge>}

          {/* Quick Actions */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
            <Button
              size="sm"
              variant="secondary"
              className={`h-8 w-8 p-0 rounded-full ${isInWishlist(product.id) ? "bg-red-50 text-red-600" : ""}`}
              onClick={handleToggleWishlist}
              aria-label="Add to wishlist"
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={handleAddToCart} className="h-8 w-8 p-0 rounded-full" aria-label="Add to cart">
              <ShoppingCart className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className={`h-8 w-8 p-0 rounded-full ${isInComparison(product.id) ? "bg-gray-100 text-gray-700" : ""}`}
              onClick={handleAddToCompare}
              disabled={isInComparison(product.id)}
              aria-label="Add to comparison"
            >
              <GitCompare className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 rounded-full"
              asChild
              aria-label="View details"
            >
              <Link href={`/product/${product.id}`}>
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-green-600">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-xs text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
              )}
            </div>
          </div>

          <Button size="sm" className="w-full text-xs" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
