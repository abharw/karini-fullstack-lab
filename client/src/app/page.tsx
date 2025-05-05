"use client"

import { PageLayout } from "@/components/layout/PageLayout"
import { ProductGrid } from "@/components/product/ProductGrid"
import { useProducts } from "@/hooks/useProducts"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function Home() {
  const { items, loading, error } = useProducts()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner message="Loading items..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Alert variant="destructive" className="max-w-md mx-auto">
          <AlertDescription>Error: {error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <PageLayout>
      <ProductGrid items={items} />
    </PageLayout>
  )
}