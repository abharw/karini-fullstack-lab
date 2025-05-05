import { CartSheet } from "@/components/cart/CartSheet"
import { ChatSheet } from "@/components/chat/ChatSheet"
import { ThemeModeToggle } from "../ui/theme-toggle"

export function Header() {
  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Product Catalog</h1>
      <div className="flex items-center gap-4">
        <ThemeModeToggle/>
        <CartSheet />
        <ChatSheet />
      </div>
    </header>
  )
}