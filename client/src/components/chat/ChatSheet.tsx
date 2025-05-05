import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { MessageCircle } from "lucide-react"
import { useChat } from "@/hooks/useChat"
import { ChatMessageList } from "./ChatMessageList"
import { ChatInput } from "./ChatInput"

export function ChatSheet() {
  const { chatOpen, setChatOpen } = useChat()

  return (
    <Sheet open={chatOpen} onOpenChange={setChatOpen}>
      <Button variant="outline" onClick={() => setChatOpen(true)}>
        <MessageCircle className="h-5 w-5 mr-2" />
        Chat
      </Button>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Customer Support</SheetTitle>
        </SheetHeader>
        <div className="mt-6 flex flex-col h-[calc(100vh-10rem)]">
          <div className="flex-1 overflow-y-auto">
            <ChatMessageList />
          </div>
          <div className="pt-4 border-t mt-auto">
            <ChatInput />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}