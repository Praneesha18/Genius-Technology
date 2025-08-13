"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { WishlistItem } from "@/types"
import { useToast } from "@/hooks/use-toast"

interface WishlistContextType {
  items: WishlistItem[]
  addItem: (item: Omit<WishlistItem, "addedAt">) => void
  removeItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])
  const { toast } = useToast()

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("genius-wishlist")
    if (savedWishlist) {
      setItems(JSON.parse(savedWishlist))
    }
  }, [])

  // Save wishlist to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("genius-wishlist", JSON.stringify(items))
  }, [items])

  const addItem = (newItem: Omit<WishlistItem, "addedAt">) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.productId === newItem.productId)

      if (existingItem) {
        toast({
          title: "Already in wishlist",
          description: `${newItem.name} is already in your wishlist`,
          variant: "destructive",
        })
        return currentItems
      }

      toast({
        title: "Added to wishlist",
        description: `${newItem.name} has been added to your wishlist`,
      })

      return [...currentItems, { ...newItem, addedAt: new Date() }]
    })
  }

  const removeItem = (productId: string) => {
    setItems((currentItems) => {
      const item = currentItems.find((item) => item.productId === productId)
      if (item) {
        toast({
          title: "Removed from wishlist",
          description: `${item.name} has been removed from your wishlist`,
        })
      }
      return currentItems.filter((item) => item.productId !== productId)
    })
  }

  const isInWishlist = (productId: string) => {
    return items.some((item) => item.productId === productId)
  }

  const clearWishlist = () => {
    setItems([])
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist",
    })
  }

  const value = {
    items,
    addItem,
    removeItem,
    isInWishlist,
    clearWishlist,
  }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
