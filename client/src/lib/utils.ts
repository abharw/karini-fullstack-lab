import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number | string | undefined): string {
  if (price === undefined) return "0.00"
  
  const numericPrice = typeof price === "number" 
    ? price 
    : Number.parseFloat(String(price || "0"))
    
  return numericPrice.toFixed(2)
}

export function formatTime(): string {
  return new Date().toLocaleTimeString([], { 
    hour: "2-digit", 
    minute: "2-digit" 
  })
}