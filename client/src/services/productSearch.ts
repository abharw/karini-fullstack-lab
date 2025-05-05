import { Item } from "@/types/Item";
import { baseUrl } from "../../config";


export type SearchParams = {
  sku?: string;
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
};

export async function searchProducts(searchParams: SearchParams): Promise<Item[]> {

  try {
    // Convert search params to URL query parameters
    const queryParams = new URLSearchParams();
    
    if (searchParams.sku) {
      queryParams.append('sku', searchParams.sku);
    }
    
    if (searchParams.query) {
      queryParams.append('query', searchParams.query);
    }
    
    if (searchParams.category) {
      queryParams.append('category', searchParams.category);
    }
    
    if (searchParams.minPrice !== undefined) {
      queryParams.append('minPrice', searchParams.minPrice.toString());
    }
    
    if (searchParams.maxPrice !== undefined) {
      queryParams.append('maxPrice', searchParams.maxPrice.toString());
    }
    
    // Make API request to search endpoint
    const response = await fetch(`${baseUrl}/search?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Search API error: ${response.status}`);
    }

    const results = await response.json();
    return results;
  } catch (error) {
    console.error('Product search failed:', error);
    throw error;
  }
}

// Function to parse natural language queries into search parameters
export function parseSearchQuery(message: string): SearchParams {
  const searchParams: SearchParams = {};
  
  // Look for SKU patterns (typically alphanumeric)
  const skuMatch = message.match(/(?:sku|product id|item number|#)\s*[:]?\s*([a-zA-Z0-9-]+)/i);
  if (skuMatch) {
    searchParams.sku = skuMatch[1];
    return searchParams; 
  }
  
  // Price ranges
  const priceRangeMatch = message.match(/under\s+\$(\d+)/i);
  if (priceRangeMatch) {
    searchParams.maxPrice = parseInt(priceRangeMatch[1], 10);
  }
  
  const minPriceMatch = message.match(/over\s+\$(\d+)/i);
  if (minPriceMatch) {
    searchParams.minPrice = parseInt(minPriceMatch[1], 10);
  }
  
  // Price ranges with between/and
  const priceBetweenMatch = message.match(/between\s+\$(\d+)\s+and\s+\$(\d+)/i);
  if (priceBetweenMatch) {
    searchParams.minPrice = parseInt(priceBetweenMatch[1], 10);
    searchParams.maxPrice = parseInt(priceBetweenMatch[2], 10);
  }
  
  // Category mentions
  const categories = ['electronics', 'clothing', 'shoes', 'accessories', 'home', 'kitchen'];
  for (const category of categories) {
    if (message.toLowerCase().includes(category)) {
      searchParams.category = category;
      break;
    }
  }
  
  // Else, use the whole message as a general query
  if (Object.keys(searchParams).length === 0) {
    searchParams.query = message;
  }
  
  return searchParams;
}