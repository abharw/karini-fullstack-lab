import { Item } from "@/types/Item";
import { ProductCard } from "./ProductCard";
import { baseUrl } from "../../../config";
interface ProductGridProps {
  items: Item[];
}

export function ProductGrid({ items }: ProductGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center p-12 border rounded-lg">
        <p className="text-muted-foreground">No items found.</p>
        <p className="text-sm mt-2">Attempted to fetch from: {baseUrl}/items</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <ProductCard
          key={typeof item._id === "string" ? item._id : item._id.toString()}
          item={item}
        />
      ))}
    </div>
  );
}
