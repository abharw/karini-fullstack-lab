import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import { useChat } from "@/hooks/useChat"

export function ChatInput() {
  const { newMessage, setNewMessage, sendMessage } = useChat()

  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => {
        e.preventDefault()
        sendMessage()
      }}
    >
      <Input
        placeholder="Type your message..."
        value={newMessage}
        onChange={(e) => {setNewMessage(e.target.value)
          console.log(e.target.value);
        }}
      />
      <Button type="submit" size="icon">
        <Send className="h-4 w-4" />
      </Button>
    </form>
  )
}