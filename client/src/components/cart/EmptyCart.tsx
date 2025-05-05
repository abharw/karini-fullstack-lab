import { ShoppingCart } from "lucide-react"

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
      <ShoppingCart className="h-12 w-12 mb-4 opacity-20" />
      <p>Your cart is empty</p>
      <p className="text-sm mt-1">Add some products to your cart</p>
    </div>
  )
}
