import { ObjectId } from "mongodb";

export interface Item {
  // Required fields for display
  _id: string | ObjectId;
  title: string;
  variant_price: number | string;
  image_src: string;

  // Rest are optional fields
  handle?: string;
  body?: string;
  vendor?: string;
  type?: string;
  tags?: string;

  // Product options
  option1_name?: string;
  option1_value?: string;
  option2_name?: string;
  option2_value?: string;
  option3_name?: string;
  option3_value?: string;

  // Variant details
  variant_sku?: string;
  variant_grams?: number | string;
  variant_inventory_tracker?: string;
  variant_inventory_qty?: number | string;
  variant_inventory_policy?: string;
  variant_fulfillment_service?: string;
  variant_compare_at_price?: string | number;

  // Image validation status
  imageValid?: boolean;
}

// Helper function to check if an image URL is accessible
export async function validateImageUrl(src: string): Promise<boolean> {
  try {
    const response = await fetch(src, { method: "HEAD" });
    return response.ok; // Returns true for status 200-299
  } catch (error) {
    console.error("Error checking image URL:", error);
    return false;
  }
}

// Basic validation for required fields
export function hasRequiredFields(item: Partial<Item>): item is Item {
  return !!(item && item.title && item.variant_price && item.image_src);
}

// Helper function to validate an item (synchronous check for required fields)
export function isValidItem(item: Partial<Item>): item is Item {
  return hasRequiredFields(item);
}
