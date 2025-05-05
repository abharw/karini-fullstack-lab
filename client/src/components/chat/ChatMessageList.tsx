import { ScrollArea } from "@/components/ui/scroll-area"
import { useChat } from "@/hooks/useChat"
import { ChatMessage } from "./ChatMessage";

export function ChatMessageList() {
  const { chatMessages } = useChat()

  return (
    <ScrollArea className="flex-1 pr-4">
      <div className="space-y-4 overflow-y-auto">
        {chatMessages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
      </div>
    </ScrollArea>
  )
}