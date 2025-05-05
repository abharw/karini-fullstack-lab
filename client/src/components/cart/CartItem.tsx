import { Button } from "@/components/ui/button"
import { Plus, Minus, X } from "lucide-react"
import { CartItem as CartItemType } from "@/hooks/useCart"
import { useCart } from "@/hooks/useCart"
import { formatPrice } from "@/lib/utils"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart()
  const itemId = item._id

  return (
    <div className="flex gap-4 py-3">
      <div className="h-20 w-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
        {item.image_src ? (
          <img
            src={item.image_src}
            alt={item.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-muted">
            <span className="text-xs text-muted-foreground">No image</span>
          </div>
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{item.title}</h3>
        <p className="text-sm text-muted-foreground">
          ${formatPrice(item.variant_price)}
        </p>
        <div className="flex items-center mt-2">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => updateQuantity(itemId, item.quantity - 1)}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="mx-2 min-w-8 text-center">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => updateQuantity(itemId, item.quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 ml-auto"
            onClick={() => removeFromCart(itemId)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}