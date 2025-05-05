import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/hooks/useCart"
import { CartList } from "./CartList"
import { EmptyCart } from "./EmptyCart"

export function CartSheet() {
  const { cart, cartItemCount, cartTotal } = useCart()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingCart className="h-5 w-5 mr-2" />
          Cart
          {cartItemCount > 0 && (
            <Badge variant="destructive" className="absolute -top-2 -right-2">
              {cartItemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-6 flex flex-col h-[calc(100vh-10rem)]">
          {cart.length === 0 ? (
            <EmptyCart />
          ) : (
            <>
              <CartList cart={cart} />
              <div className="pt-4 border-t mt-auto">
                <div className="flex justify-between py-2">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <Button className="w-full mt-4">Checkout</Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}