import { ScrollArea } from "@/components/ui/scroll-area"
import { CartItem as CartItemType } from "@/hooks/useCart"
import { CartItem } from "./CartItem"

interface CartListProps {
  cart: CartItemType[]
}

export function CartList({ cart }: CartListProps) {
  return (
    <ScrollArea className="flex-1">
      <div className="space-y-4 pr-4">
        {cart.map((item) => (
          <CartItem key={item._id?.toString()} item={item} />
        ))}
      </div>
    </ScrollArea>
  )
}