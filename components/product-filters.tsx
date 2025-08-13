"use client"
import type { Category } from "@/types"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Star, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface ProductFiltersProps {
  filters: {
    category: string
    brand: string
    priceRange: number[]
    rating: number
    inStock: boolean
    specifications: Record<string, string[]> // New: for dynamic specifications
  }
  onFiltersChange: (filters: any) => void
  categories: Category[]
  availableSpecifications: Record<string, string[]> // New: dynamically extracted specs
  searchQuery: string
  onSearchQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const brands = [
  "Apple",
  "Samsung",
  "OnePlus",
  "Xiaomi",
  "Realme",
  "Oppo",
  "Vivo",
  "Nothing",
  "Google",
  "Sony",
  "JBL",
  "Boat",
]

export function ProductFilters({
  filters,
  onFiltersChange,
  categories,
  availableSpecifications,
  searchQuery,
  onSearchQueryChange,
}: ProductFiltersProps) {
  const handleFilterChange = (key: string, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  const handleSpecificationChange = (specKey: string, specValue: string, checked: boolean) => {
    const currentSelected = filters.specifications[specKey] || []
    let newSelected: string[]

    if (checked) {
      newSelected = [...currentSelected, specValue]
    } else {
      newSelected = currentSelected.filter((val) => val !== specValue)
    }

    onFiltersChange({
      ...filters,
      specifications: {
        ...filters.specifications,
        [specKey]: newSelected,
      },
    })
  }

  const clearAllFilters = () => {
    onFiltersChange({
      category: "",
      brand: "",
      priceRange: [0, 10000],
      rating: 0,
      inStock: false,
      specifications: {},
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearAllFilters}>
          Clear All
        </Button>
      </div>

      {/* Search Input */}
      <div>
        <h4 className="font-medium mb-3">Search</h4>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={onSearchQueryChange}
            className="pl-9 pr-3 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 w-full"
          />
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h4 className="font-medium mb-3">Price Range</h4>
        <div className="px-2">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => handleFilterChange("priceRange", value)}
            max={10000}
            min={0}
            step={100}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>₹{filters.priceRange[0]}</span>
            <span>₹{filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Categories */}
      <div>
        <h4 className="font-medium mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={filters.category === category.id}
                onCheckedChange={(checked) => handleFilterChange("category", checked ? category.id : "")}
              />
              <Label htmlFor={category.id} className="text-sm">
                {category.name} ({category.productCount})
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Brands */}
      <div>
        <h4 className="font-medium mb-3">Brands</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={brand}
                checked={filters.brand === brand}
                onCheckedChange={(checked) => handleFilterChange("brand", checked ? brand : "")}
              />
              <Label htmlFor={brand} className="text-sm">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Rating */}
      <div>
        <h4 className="font-medium mb-3">Customer Rating</h4>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={filters.rating === rating}
                onCheckedChange={(checked) => handleFilterChange("rating", checked ? rating : 0)}
              />
              <Label htmlFor={`rating-${rating}`} className="flex items-center space-x-1 text-sm">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span>& above</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Availability */}
      <div>
        <h4 className="font-medium mb-3">Availability</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={filters.inStock}
              onCheckedChange={(checked) => handleFilterChange("inStock", checked)}
            />
            <Label htmlFor="in-stock" className="text-sm">
              In Stock Only
            </Label>
          </div>
        </div>
      </div>

      {/* Dynamic Specifications */}
      {Object.keys(availableSpecifications).map((specKey) => (
        <div key={specKey}>
          <Separator />
          <h4 className="font-medium mb-3 capitalize">{specKey}</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {availableSpecifications[specKey].map((specValue) => (
              <div key={specValue} className="flex items-center space-x-2">
                <Checkbox
                  id={`${specKey}-${specValue}`}
                  checked={(filters.specifications[specKey] || []).includes(specValue)}
                  onCheckedChange={(checked) => handleSpecificationChange(specKey, specValue, checked)}
                />
                <Label htmlFor={`${specKey}-${specValue}`} className="text-sm">
                  {specValue}
                </Label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
