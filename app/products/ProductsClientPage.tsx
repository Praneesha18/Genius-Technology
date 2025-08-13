"use client"

import { useState, useEffect, useMemo } from "react"
import { collection, getDocs, query, orderBy } from "firebase/firestore" // Import 'where'
import { db } from "@/lib/firebase"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import type { Product, Category } from "@/types" // Import Category
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/breadcrumb"
import { Button } from "@/components/ui/button"
import { ListFilter, Grid3X3, List } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react" // Import X for mobile filter panel

export default function ProductsClientPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([]) // State for categories
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    priceRange: [0, 10000], // Default max price, adjust as needed
    rating: 0,
    inStock: false,
    specifications: {} as Record<string, string[]>, // For dynamic specifications
  })
  const [sortBy, setSortBy] = useState("relevance") // relevance, price-asc, price-desc, newest, rating
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false)
  const [viewMode, setViewMode] = useState("grid") // 'grid' or 'list'

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch Products
        const productsCollection = collection(db, "products")
        const productsSnapshot = await getDocs(query(productsCollection, orderBy("name")))
        const productsData = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(), // Convert Firebase Timestamp to Date
          updatedAt: doc.data().updatedAt?.toDate(),
        })) as Product[]
        setAllProducts(productsData)

        // Fetch Categories
        const categoriesCollection = collection(db, "categories")
        const categoriesSnapshot = await getDocs(query(categoriesCollection, orderBy("name")))
        const categoriesData = categoriesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Category[]
        setCategories(categoriesData)

        // Determine max price for slider
        const maxPrice = productsData.reduce((max, p) => Math.max(max, p.price), 0)
        setFilters((prev) => ({ ...prev, priceRange: [0, maxPrice > 0 ? maxPrice : 10000] }))
      } catch (error) {
        console.error("Error fetching initial data:", error)
      }
    }
    fetchInitialData()
  }, [])

  const availableSpecifications = useMemo(() => {
    const specs: Record<string, Set<string>> = {}
    allProducts.forEach((product) => {
      if (product.specifications) {
        for (const key in product.specifications) {
          if (product.specifications.hasOwnProperty(key)) {
            if (!specs[key]) {
              specs[key] = new Set()
            }
            specs[key].add(product.specifications[key])
          }
        }
      }
    })
    const result: Record<string, string[]> = {}
    for (const key in specs) {
      result[key] = Array.from(specs[key]).sort()
    }
    return result
  }, [allProducts])

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = allProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = filters.category ? product.category === filters.category : true
      const matchesBrand = filters.brand ? product.brand === filters.brand : true
      const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
      const matchesRating = product.rating >= filters.rating
      const matchesStock = filters.inStock ? product.stock > 0 : true

      const matchesSpecs = Object.keys(filters.specifications).every((specKey) => {
        const selectedValues = filters.specifications[specKey]
        if (selectedValues.length === 0) return true // No filter applied for this spec
        return selectedValues.includes(product.specifications?.[specKey])
      })

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesPrice &&
        matchesRating &&
        matchesStock &&
        matchesSpecs
      )
    })

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "newest":
          return (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
        case "rating":
          return b.rating - a.rating
        case "relevance":
        default:
          return 0 // No specific sorting for relevance, maintain original order or default
      }
    })

    return filtered
  }, [allProducts, filters, sortBy, searchQuery])

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbs} />
        <h1 className="text-3xl font-bold mb-6">All Products</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Panel for larger screens */}
          <div className="hidden lg:block lg:w-1/4">
            <ProductFilters
              filters={filters}
              onFiltersChange={setFilters}
              categories={categories} // Pass categories
              availableSpecifications={availableSpecifications}
              searchQuery={searchQuery}
              onSearchQueryChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
              <div className="relative w-full sm:w-auto flex-grow">
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-full"
                />
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                      Sort By:{" "}
                      {sortBy === "relevance"
                        ? "Relevance"
                        : sortBy === "price-asc"
                          ? "Price: Low to High"
                          : sortBy === "price-desc"
                            ? "Price: High to Low"
                            : sortBy === "newest"
                              ? "Newest"
                              : "Rating"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSortBy("relevance")}>Relevance</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("price-asc")}>Price: Low to High</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("price-desc")}>Price: High to Low</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("newest")}>Newest</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("rating")}>Rating</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                >
                  {viewMode === "grid" ? <List /> : <Grid3X3 />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="lg:hidden bg-transparent"
                  onClick={() => setIsFilterPanelOpen(true)}
                >
                  <ListFilter />
                </Button>
              </div>
            </div>

            {filteredAndSortedProducts.length === 0 ? (
              <Card className="p-6 text-center text-gray-500">
                No products found matching your criteria. Try adjusting your filters or search query.
              </Card>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    : "grid grid-cols-1 gap-6"
                }
              >
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filter Panel */}
        {isFilterPanelOpen && (
          <div className="fixed inset-0 z-50 bg-white lg:hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold">Filters</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsFilterPanelOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <ProductFilters
                filters={filters}
                onFiltersChange={setFilters}
                categories={categories} // Pass categories
                availableSpecifications={availableSpecifications}
                searchQuery={searchQuery}
                onSearchQueryChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="p-4 border-t">
              <Button className="w-full" onClick={() => setIsFilterPanelOpen(false)}>
                Apply Filters
              </Button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
