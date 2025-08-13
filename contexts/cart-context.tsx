"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { CartItem } from "@/types"
import { useToast } from "@/hooks/use-toast"

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const { toast } = useToast()

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("genius-cart")
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("genius-cart", JSON.stringify(items))
  }, [items])

  const addItem = (newItem: Omit<CartItem, "quantity">) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.productId === newItem.productId)

      if (existingItem) {
        if (existingItem.quantity >= existingItem.maxQuantity) {
          toast({
            title: "Cannot add more",
            description: `Maximum ${existingItem.maxQuantity} items allowed`,
            variant: "destructive",
          })
          return currentItems
        }

        toast({
          title: "Item updated",
          description: `${newItem.name} quantity increased`,
        })

        return currentItems.map((item) =>
          item.productId === newItem.productId ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }

      toast({
        title: "Added to cart",
        description: `${newItem.name} has been added to your cart`,
      })

      return [...currentItems, { ...newItem, quantity: 1 }]
    })
  }

  const removeItem = (productId: string) => {
    setItems((currentItems) => {
      const item = currentItems.find((item) => item.productId === productId)
      if (item) {
        toast({
          title: "Item removed",
          description: `${item.name} has been removed from your cart`,
        })
      }
      return currentItems.filter((item) => item.productId !== productId)
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }

    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.productId === productId) {
          const newQuantity = Math.min(quantity, item.maxQuantity)
          if (newQuantity !== quantity) {
            toast({
              title: "Quantity adjusted",
              description: `Maximum ${item.maxQuantity} items allowed`,
              variant: "destructive",
            })
          }
          return { ...item, quantity: newQuantity }
        }
        return item
      }),
    )
  }

  const clearCart = () => {
    setItems([])
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    })
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
