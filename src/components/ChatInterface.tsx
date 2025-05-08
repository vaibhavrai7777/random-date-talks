
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, User } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import TopicSelector from "./TopicSelector";

interface Message {
  id: string;
  content: string;
  sender: "user" | "partner";
  timestamp: Date;
}

const partnersData = [
  { name: "Alex", topics: ["Dating Apps", "First Dates"] },
  { name: "Jordan", topics: ["Relationships", "Breakups"] },
  { name: "Taylor", topics: ["Online Dating", "Dating Profile"] },
  { name: "Casey", topics: ["Conversation Starters", "Red Flags"] },
  { name: "Morgan", topics: ["Long Distance", "Relationships"] },
];

const INITIAL_MESSAGES: Record<string, string> = {
  "Dating Apps": "Hi there! I see you want to talk about dating apps. Which ones have you tried?",
  "First Dates": "First dates can be nerve-wracking! What's your biggest concern?",
  "Relationships": "Relationships take work! What aspect are you curious about?",
  "Breakups": "I'm sorry to hear you're going through a breakup. How are you holding up?",
  "Online Dating": "Online dating has its challenges. What's been your experience so far?",
  "Dating Profile": "Dating profiles are so important. Would you like tips on improving yours?",
  "Conversation Starters": "Good conversation starters can make all the difference! What's your go-to opener?",
  "Red Flags": "It's wise to watch for red flags. Any particular ones you're concerned about?",
  "Long Distance": "Long distance relationships are challenging but can work! Are you in one now?",
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [currentPartner, setCurrentPartner] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSelectTopic = (topic: string) => {
    setSelectedTopic(topic);
  };
  
  const handleStartChat = () => {
    if (!selectedTopic) {
      toast({
        title: "Please select a topic",
        description: "Choose a conversation topic to get started",
        variant: "destructive",
      });
      return;
    }
    
    setIsConnecting(true);
    
    // Simulate connecting to a partner
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      
      // Find a partner who specializes in this topic
      const availablePartners = partnersData.filter(p => 
        p.topics.includes(selectedTopic)
      );
      
      const partner = availablePartners[Math.floor(Math.random() * availablePartners.length)] || partnersData[0];
      setCurrentPartner(partner.name);
      
      // Add initial message from partner
      const initialMessage = INITIAL_MESSAGES[selectedTopic] || "Hi there! How can I help with your dating questions?";
      
      setMessages([
        {
          id: Date.now().toString(),
          content: initialMessage,
          sender: "partner",
          timestamp: new Date(),
        },
      ]);
    }, 2000);
  };
  
  const handleSendMessage = () => {
    if (!inputValue.trim() || !isConnected) return;
    
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user" as const,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    
    // Simulate partner typing and response
    setTimeout(() => {
      const responses = [
        "That's an interesting perspective! Have you considered trying a different approach?",
        "I've been there before. It can be challenging but gets better with time.",
        "Great question! In my experience, communication is always key.",
        "Many people feel the same way. What works for me is being authentic.",
        "That's totally normal to feel that way. Dating can be complicated!",
      ];
      
      const partnerMessage = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: "partner" as const,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, partnerMessage]);
    }, 1500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  
  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl border h-full">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Find Your Dating Advisor</h2>
          <p className="text-gray-500 text-center mb-8">
            Choose a dating topic you'd like to discuss and we'll connect you with someone who can help.
          </p>
          
          <TopicSelector onSelectTopic={handleSelectTopic} />
          
          <div className="mt-8">
            <Button 
              className="w-full bg-app-purple hover:bg-app-purple-dark" 
              onClick={handleStartChat}
              disabled={isConnecting}
            >
              {isConnecting ? "Finding an advisor..." : "Start Chatting"}
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full bg-white rounded-xl border">
      <div className="p-4 border-b flex items-center space-x-3">
        <Avatar>
          <User className="h-5 w-5" />
        </Avatar>
        <div>
          <p className="font-medium text-gray-800">
            {currentPartner || "Dating Advisor"}
          </p>
          <p className="text-xs text-gray-500">
            {selectedTopic ? `Topic: ${selectedTopic}` : "Ready to help"}
          </p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`chat-bubble ${message.sender === "user" ? "chat-bubble-user" : "chat-bubble-partner"}`}
          >
            {message.content}
            <div className="text-xs mt-1 opacity-70 text-right">
              {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 input-focus-ring"
          />
          <Button 
            onClick={handleSendMessage} 
            className="bg-app-purple hover:bg-app-purple/90"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
