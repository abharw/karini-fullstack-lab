import { useEffect, useState } from "react"
import type { Item } from "@/types/Item"
import { hasRequiredFields, validateImageUrl } from "@/types/Item"
import { baseUrl } from "../../config";

export const useProducts = () => {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const loadItems = async () => {
      try {
        setLoading(true)
        console.log("Fetching from:", `${baseUrl}/items`)

        const response = await fetch(`${baseUrl}/items`, {
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const results = await response.json()
        console.log("Fetched results:", results)
        
        // Filter items with required fields
        const itemsWithRequiredFields = results.filter(hasRequiredFields)
        
        // Validate images and filter items with valid images
        const validatedPromises = await Promise.all(
          itemsWithRequiredFields.map(async (item: Item) => {
            const isImageValid = await validateImageUrl(item.image_src)
            return isImageValid ? item : null
          })
        )
        
        // Filter out null items (those with invalid images)
        const validItems = validatedPromises.filter(item => item !== null) as Item[]
        
        console.log(`Showing ${validItems.length} of ${itemsWithRequiredFields.length} items with valid images`)
        setItems(validItems)
        setError(null)
      } catch (err) {
        console.error("Failed to fetch items:", err)
        setError(`Failed to load items: ${err instanceof Error ? err.message : String(err)}`)
      } finally {
        setLoading(false)
      }
    }

    loadItems()
  }, [])

  return { 
    items, 
    loading, 
    error 
  }
}