"use client"

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentQuery = searchParams.get('search')
  
  const [searchQuery, setSearchQuery] = useState(currentQuery || '')
  
  // Change query 
  useEffect(() => {
    setSearchQuery(currentQuery || '')
  }, [currentQuery])
  

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (searchQuery.trim()) {
      // Update URL with search parameter
      router.push(`?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }
  
  // Clear search
  const clearSearch = () => {
    setSearchQuery('')
    router.push('/')
  
  }
  
  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2 mb-6">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-10"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <Button type="submit">
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </form>
  )
}