import { CartSheet } from "@/components/cart/CartSheet"
import { ChatSheet } from "@/components/chat/ChatSheet"

export function Header() {
  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Product Catalog</h1>
      <div className="flex items-center gap-4">
        <CartSheet />
        <ChatSheet />
      </div>
    </header>
  )
}