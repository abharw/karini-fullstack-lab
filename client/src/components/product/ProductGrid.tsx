"use client"

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { baseUrl } from "../../../config";
import { Item, hasRequiredFields } from "../../types/Item";
import { ProductCard } from "./ProductCard";
import { SearchBar } from '../search/SearchBar';

interface ProductGridProps {
  items: Item[];
}

export function ProductGrid({ items }: ProductGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search');
  
  const [searchResults, setSearchResults] = useState<Item[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    
    fetchSearchResults(searchQuery);
  }, [searchQuery]);
  
  // Search 
  const fetchSearchResults = async (query: string) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    setSearchError(null);
    
    try {
      const response = await fetch(`${baseUrl}/search?query=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error(`Search failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      console.error('Search error:', err);
      setSearchError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsSearching(false);
    }
  };
  
  // Clear search
  const clearSearch = () => {
    router.push('/'); 
  };
  
  // Determine items to display, and only valid items
  const displayItems = searchQuery ? searchResults : items;
  const validItems = displayItems.filter(item => hasRequiredFields(item));
  
  return (
    <div className="space-y-6">

      <SearchBar />
    
      {searchQuery && !isSearching && !searchError && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">
            Results for: <span className="italic">{searchQuery}</span>
          </h2>
          <p className="text-sm text-muted-foreground">
            Found {validItems.length} items
          </p>
        </div>
      )}
      
      {/* Loading state */}
      {isSearching && (
        <div className="flex justify-center py-12">
          <LoadingSpinner message="Searching..." />
        </div>
      )}
      
      {/* Search error */}
      {searchError && (
        <div className="text-center p-8 border rounded-lg">
          <p className="text-destructive">Search error: {searchError}</p>
          <Button variant="outline" onClick={clearSearch} className="mt-4">
            Clear Search
          </Button>
        </div>
      )}
      
      {/* Empty search results */}
      {searchQuery && !isSearching && validItems.length === 0 && !searchError && (
        <div className="text-center p-12 border rounded-lg">
          <p className="text-muted-foreground mb-4">{`No results found for "${searchQuery}"`}</p>
          <Button variant="outline" onClick={clearSearch}>
            Back to All Products
          </Button>
        </div>
      )}
      
      {/* Product grid */}
      {!isSearching && !searchError && validItems.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {validItems.map((item) => (
            <ProductCard key={item._id.toString()} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}