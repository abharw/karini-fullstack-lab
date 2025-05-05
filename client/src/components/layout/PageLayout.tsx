import { ReactNode } from "react"
import { Header } from "./Header"
import { CartProvider } from "@/hooks/useCart"
import { ChatProvider } from "@/hooks/useChat"

interface PageLayoutProps {
  children: ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <CartProvider>
      <ChatProvider>
        <div className="container mx-auto px-4 py-8">
          <Header />
          <main className="mt-8">{children}</main>
        </div>
      </ChatProvider>
    </CartProvider>
  )
}