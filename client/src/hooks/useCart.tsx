import { createContext, useContext, ReactNode, useState } from "react"
import type { Item } from "@/types/Item"
import { isValidItem } from "@/types/Item"
import { ObjectId } from "mongodb"

export type CartItem = Item & { quantity: number }

interface CartContextType {
  cart: CartItem[]
  cartItemCount: number
  cartTotal: number
  addToCart: (item: Item) => void
  removeFromCart: (itemId: string | ObjectId) => void
  updateQuantity: (itemId: string | ObjectId, newQuantity: number) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  
  const addToCart = (item: Item) => {
    // Only add valid items to cart
    if (!isValidItem(item)) {
      console.warn('Attempted to add invalid item to cart:', item)
      return
    }
    
    setCart((prevCart) => {
      const itemId = typeof item._id === 'string' ? item._id : item._id.toString()
      const existingItem = prevCart.find((cartItem) => {
        const cartItemId = typeof cartItem._id === 'string' 
          ? cartItem._id 
          : cartItem._id.toString()
        return cartItemId === itemId
      })
      
      // If exists, find the item and increase quantity
      if (existingItem) {
        return prevCart.map((cartItem) => {
          const cartItemId = typeof cartItem._id === 'string' 
            ? cartItem._id 
            : cartItem._id.toString()
          
          return cartItemId === itemId 
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        })
      } else {
        return [...prevCart, { ...item, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (itemId: string | ObjectId) => {
    const id = typeof itemId === 'string' ? itemId : itemId.toString()
    
    setCart((prevCart) => prevCart.filter((item) => {
      const cartItemId = typeof item._id === 'string' 
        ? item._id 
        : item._id.toString()
      return cartItemId !== id
    }))
  }

  const updateQuantity = (itemId: string | ObjectId, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId)
      return
    }

    const id = typeof itemId === 'string' ? itemId : itemId.toString()
    
    setCart((prevCart) => 
      prevCart.map((item) => {
        const cartItemId = typeof item._id === 'string' 
          ? item._id 
          : item._id.toString()
        
        return cartItemId === id 
          ? { ...item, quantity: newQuantity } 
          : item
      })
    )
  }

  const cartTotal = cart.reduce((total, item) => {
    const price =
      typeof item.variant_price === "number" 
        ? item.variant_price 
        : Number.parseFloat(String(item.variant_price || "0"))
    return total + price * item.quantity
  }, 0)

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItemCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}