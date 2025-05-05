import { createContext, useContext, ReactNode, useState } from "react"
import { formatTime } from "@/lib/utils"
import { searchProducts, parseSearchQuery } from "@/services/productSearch"
import { Item } from "@/types/Item"

// Define types for different message content
export type MessageContent = 
  | { type: 'text'; text: string }
  | { type: 'searchResults'; results: Item[] };

export interface ChatMessage {
  sender: 'user' | 'system'
  content: MessageContent
  time: string
}

interface ChatContextType {
  chatMessages: ChatMessage[]
  chatOpen: boolean
  newMessage: string
  setChatOpen: (open: boolean) => void
  setNewMessage: (message: string) => void
  sendMessage: () => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chatOpen, setChatOpen] = useState<boolean>(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      sender: "system",
      content: { type: 'text', text: "How can I help you today? You can ask about products or search our database with queries like 'Find SKU ABC123' or 'Show electronics under $50'." },
      time: formatTime(),
    },
  ])
  const [newMessage, setNewMessage] = useState<string>("")
  // Helper function to check if a message appears to be a database query
  const isDatabaseQuery = (message: string): boolean => {
    const queryPatterns = [
      /find/i, 
      /search/i, 
      /show/i, 
      /look for/i,
      /get/i,
      /sku/i,
      /under \$/i,
      /over \$/i,
      /between \$/i
    ];
    
    return queryPatterns.some(pattern => pattern.test(message));
  }

  // Process database query and return results
  const processQuery = async (query: string) => {

    try {

      setChatMessages(prev => [...prev, {
        sender: "system",
        content: { type: 'text', text: "Searching our product database..." },
        time: formatTime()
      }]);
      
      // Parse the natural language query into search parameters
      const searchParams = parseSearchQuery(query);
      
      // Execute the search
      const results = await searchProducts(searchParams);
      
      // Update the chat with results
      setChatMessages(prev => {
        // Create a new array without the last "thinking" message
        const updatedMessages = prev.slice(0, -1);
        
        // Build response message based on results
        if (results.length === 0) {
          return [...updatedMessages, {
            sender: "system",
            content: { type: 'text', text: "I couldn't find any products matching your query. Could you try a different search?" },
            time: formatTime()
          }];
        } else {
          // Format the search parameters for a response message
          let responsePrefix = "Here's what I found";
          if (searchParams.sku) {
            responsePrefix += ` for SKU ${searchParams.sku}`;
          } else if (searchParams.category && searchParams.maxPrice) {
            responsePrefix += ` in ${searchParams.category} under $${searchParams.maxPrice}`;
          } else if (searchParams.category) {
            responsePrefix += ` in ${searchParams.category}`;
          } else if (searchParams.minPrice && searchParams.maxPrice) {
            responsePrefix += ` between $${searchParams.minPrice} and $${searchParams.maxPrice}`;
          } else if (searchParams.maxPrice) {
            responsePrefix += ` under $${searchParams.maxPrice}`;
          }
          responsePrefix += ":";
          
          return [...updatedMessages, 
            {
              sender: "system",
              content: { type: 'text', text: responsePrefix },
              time: formatTime()
            },
            {
              sender: "system",
              content: { type: 'searchResults', results },
              time: formatTime()
            }
          ];
        }
      });
      
    } catch (error) {
      // Handle errors
      setChatMessages(prev => {
        // Create a new array without the last "thinking" message
        const updatedMessages = prev.slice(0, -1);
        
        return [...updatedMessages, {
          sender: "system",
          content: { 
            type: 'text', 
            text: `Sorry, I encountered an error while searching: ${error instanceof Error ? error.message : String(error)}` 
          },
          time: formatTime()
        }];
      });
    }
  }

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const time = formatTime();
    const userMessage = {
      sender: "user" as const,
      content: { type: 'text', text: newMessage } as MessageContent,
      time
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage("");

    // Check if this appears to be a database query
    if (isDatabaseQuery(newMessage)) {
      // Process the query
      processQuery(newMessage);
    } else {
      // Regular chat response
      setTimeout(() => {
        setChatMessages(prev => [...prev, {
          sender: "system",
          content: { 
            type: 'text', 
            text: "I can help you find products in our database. Try asking something like 'Find SKU ABC123' or 'Show electronics under $50'." 
          },
          time: formatTime(),
        }]);
      }, 500);
    }
  }

  return (
    <ChatContext.Provider
      value={{
        chatMessages,
        chatOpen,
        newMessage,
        setChatOpen,
        setNewMessage,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}