import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Item } from "@/types/Item"
import { useCart } from "@/hooks/useCart"
import { ProductImage } from "./ProductImage"
import { formatPrice } from "@/lib/utils"

interface ProductCardProps {
  item: Item
}

export function ProductCard({ item }: ProductCardProps) {
  const { addToCart } = useCart()


  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="aspect-square relative bg-muted">
        <ProductImage 
          src={item.image_src} 
          alt={item.title} 
        />
        {item.tags && (
          <div className="absolute top-2 left-2">
            <Badge variant="secondary">{item.tags}</Badge>
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{item.title}</CardTitle>
        <div className="flex justify-between items-center mt-1">
          <span className="text-sm text-muted-foreground">{item.vendor || "Unknown"}</span>
          <span className="text-sm text-muted-foreground">{item.type || ""}</span>
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        {item.body && <p className="text-sm line-clamp-2">{item.body}</p>}
      </CardContent>
      <CardFooter className="pt-2 flex justify-between items-center">
        <span className="font-semibold">
          ${formatPrice(item.variant_price)}
        </span>
        <Button onClick={() => addToCart(item)} size="sm">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}