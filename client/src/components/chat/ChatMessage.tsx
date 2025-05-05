import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChatMessage as ChatMessageType } from "@/hooks/useChat"
import { ChatSearchResults } from "./ChatSearchResults"

interface ChatMessageProps {
  message: ChatMessageType
}

export function ChatMessage({ message }: ChatMessageProps) {
  const { sender, content, time } = message
  const isUser = sender === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`flex gap-2 max-w-[90%] ${isUser ? "flex-row-reverse" : ""}`}>
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarFallback>{isUser ? "U" : "S"}</AvatarFallback>
          {!isUser && <AvatarImage src="/placeholder.svg?height=32&width=32" />}
        </Avatar>
        
        <div className="flex flex-col">

          {content.type === 'text' && (
            <div
              className={`rounded-lg px-3 py-2 text-sm ${
                isUser ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              {content.text}
            </div>
          )}
          
          {content.type === 'searchResults' && (
            <div className="bg-muted rounded-lg p-3 w-full">
              <ChatSearchResults results={content.results} />
            </div>
          )}
          
          <p className="text-xs text-muted-foreground mt-1">{time}</p>
        </div>
      </div>
    </div>
  )
}