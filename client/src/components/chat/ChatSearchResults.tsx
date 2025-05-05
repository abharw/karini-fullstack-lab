import { isValidItem, Item } from "@/types/Item"
import { useCart } from "@/hooks/useCart"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface ChatSearchResultsProps {
  results: Item[]
}

export function ChatSearchResults({ results }: ChatSearchResultsProps) {
  const { addToCart } = useCart()
  
  if (results.length === 0) {
    return <p className="text-sm text-muted-foreground">No matching products found.</p>
  }
  
  return (
    <div className="space-y-3 max-w-full">
      <div className="grid grid-cols-1 gap-3">
        {results.map((item) => (
          <Card key={typeof item._id === 'string' ? item._id : item._id.toString()} 
                className="overflow-hidden flex flex-row border rounded-md">
            <div className="w-16 h-16 flex-shrink-0 bg-muted">
              {isValidItem(item) && (
                <img 
                  src={item.image_src} 
                  alt={item.title || 'Product'} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/coming-soon.png";
                  }}
                />
              )}
            </div>
            
            <CardContent className="flex-1 p-3 overflow-hidden">
              <div className="flex flex-col">
                <h4 className="font-medium text-sm truncate">{item.title}</h4>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm text-muted-foreground truncate">{item.vendor || "Unknown"}</span>
                  <span className="font-medium">${formatPrice(item.variant_price)}</span>
                </div>
                {item.variant_sku && (
                  <p className="text-xs text-muted-foreground mt-1">SKU: {item.variant_sku}</p>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="p-2 flex-shrink-0">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => addToCart(item)}
                className="h-8 text-xs px-2"
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Found {results.length} product{results.length !== 1 ? 's' : ''}
      </p>
    </div>
  )
}