"use client"
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore"
import { useState, useEffect } from "react"

import { db } from "@/lib/firebase"
import type { Product } from "@/types"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductImageGallery } from "@/components/product-image-gallery"
import { ProductInfo } from "@/components/product-info"
import { ProductTabs } from "@/components/product-tabs"
import { RecentlyViewedProducts } from "@/components/recently-viewed-products"
import { RecommendedProducts } from "@/components/recommended-products" // Import RecommendedProducts
import { RelatedProducts } from "@/components/related-products" // Import RelatedProducts
import { useRecentlyViewed } from "@/hooks/use-recently-viewed"
import { useComparison } from "@/contexts/comparison-context" // Import useComparison
import { ProductComparisonTable } from "@/components/product-comparison-table" // Import ProductComparisonTable
import Link from "next/link"
import Breadcrumb from "@/components/breadcrumb" // Import Breadcrumb
import Button from "@/components/button" // Import Button
import { useToast } from "@/hooks/use-toast"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductClientPage({ params }: ProductPageProps) {
  const productId = params.id
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { comparisonProductIds, setComparisonProducts, clearComparison } = useComparison()
  const [comparisonProductsData, setComparisonProductsData] = useState<Product[]>([])
  const { recentlyViewed, addRecentlyViewed } = useRecentlyViewed() // Use the new hook
  const { toast } = useToast()

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true)
        const productRef = doc(db, "products", productId)
        const productSnap = await getDoc(productRef)

        if (!productSnap.exists()) {
          toast({
            title: "Product Not Found",
            description: "The product you are looking for does not exist.",
            variant: "destructive",
          })
          setError("Product not found")
          return
        }

        const fetchedProduct = {
          id: productSnap.id,
          ...productSnap.data(),
          createdAt: productSnap.data().createdAt?.toDate(),
          updatedAt: productSnap.data().updatedAt?.toDate(),
        } as Product
        setProduct(fetchedProduct)
        addRecentlyViewed(fetchedProduct) // Add current product to recently viewed

        // Fetch related products (e.g., same category or brand)
        const relatedProductsQuery = query(
          collection(db, "products"),
          where("category", "==", fetchedProduct.category),
          where("id", "!=", fetchedProduct.id), // Exclude current product
        )
        const relatedProductsSnap = await getDocs(relatedProductsQuery)
        const fetchedRelatedProducts = relatedProductsSnap.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate(),
            updatedAt: doc.data().updatedAt?.toDate(),
          }))
          .filter((p) => p.id !== fetchedProduct.id) as Product[]
        setRelatedProducts(fetchedRelatedProducts)
      } catch (err) {
        console.error("Error fetching product data:", err)
        setError("Failed to load product data.")
      } finally {
        setLoading(false)
      }
    }

    fetchProductData()
  }, [productId, addRecentlyViewed, toast]) // Add addRecentlyViewed to dependencies

  useEffect(() => {
    const fetchComparisonProducts = async () => {
      if (comparisonProductIds.length === 0) {
        setComparisonProductsData([])
        setComparisonProducts([])
        return
      }

      const productsToFetch = comparisonProductIds.filter((id) => !comparisonProductsData.some((p) => p.id === id))
      if (productsToFetch.length === 0 && comparisonProductIds.length === comparisonProductsData.length) {
        return // All products already fetched
      }

      const fetchedProducts: Product[] = []
      for (const id of comparisonProductIds) {
        const productRef = doc(db, "products", id)
        const productSnap = await getDoc(productRef)
        if (productSnap.exists()) {
          fetchedProducts.push({
            id: productSnap.id,
            ...productSnap.data(),
            createdAt: productSnap.data().createdAt?.toDate(),
            updatedAt: productSnap.data().updatedAt?.toDate(),
          } as Product)
        }
      }
      setComparisonProductsData(fetchedProducts)
      setComparisonProducts(fetchedProducts) // Update context with full product data
    }

    fetchComparisonProducts()
  }, [comparisonProductIds, setComparisonProducts, comparisonProductsData])

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-pulse">
            <div className="h-96 bg-gray-200 rounded-lg"></div>
            <div className="space-y-6">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="mt-12 h-64 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="mt-12 h-64 bg-gray-200 rounded-lg animate-pulse"></div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 text-center text-red-600">
          <p>{error}</p>
        </main>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-lg text-gray-600 mb-8">
            The product you are looking for does not exist or has been removed.
          </p>
          <a href="/products">
            <Button size="lg">Continue Shopping</Button>
          </a>
        </div>
        <Footer />
      </div>
    )
  }

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: product.category, href: `/category/${product.category.toLowerCase().replace(/\s+/g, "-")}` },
    { name: product.name, href: `/product/${product.id}` },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbs} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProductImageGallery images={product.images} videoUrl={product.videoUrl} />
          <ProductInfo product={product} />
        </div>
        <div className="mt-12">
          <ProductTabs product={product} />
        </div>
        {comparisonProductIds.length > 0 && (
          <div className="mt-12 border-t pt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Product Comparison ({comparisonProductIds.length} selected)
              </h2>
              <div className="space-x-2">
                <Button variant="outline" onClick={clearComparison}>
                  Clear All
                </Button>
                <Button asChild>
                  <Link href="/compare">View Full Comparison</Link>
                </Button>
              </div>
            </div>
            <ProductComparisonTable products={comparisonProductsData} />
          </div>
        )}
        <div className="mt-12">
          <RelatedProducts products={relatedProducts} />
        </div>
        <div className="mt-12">
          <RecommendedProducts currentProductId={product.id} category={product.category} />
        </div>
        <div className="mt-12">
          <RecentlyViewedProducts currentProductId={product.id} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
