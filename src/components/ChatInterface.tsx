
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, User, RefreshCw, MessageCircleHeart } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import TopicSelector from "./TopicSelector";
import MediaTransfer from "./MediaTransfer";

interface Message {
  id: string;
  content: string;
  sender: "user" | "partner";
  timestamp: Date;
  type?: "text" | "image" | "camera" | "contact";
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

interface ChatInterfaceProps {
  selectedTopic?: string | null;
  onSelectTopic?: (topic: string) => void;
  onChangeTopicRequest?: () => void;
  isConnectedExternal?: boolean;
  onConnectionChange?: (connected: boolean) => void;
}

const ChatInterface = ({
  selectedTopic: externalSelectedTopic,
  onSelectTopic: externalSelectTopic,
  onChangeTopicRequest,
  isConnectedExternal,
  onConnectionChange
}: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(isConnectedExternal || false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(externalSelectedTopic || null);
  const [currentPartner, setCurrentPartner] = useState<string | null>(null);
  const [isChangingTopic, setIsChangingTopic] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    if (isConnectedExternal !== undefined) {
      setIsConnected(isConnectedExternal);
    }
  }, [isConnectedExternal]);
  
  useEffect(() => {
    if (externalSelectedTopic !== undefined) {
      setSelectedTopic(externalSelectedTopic);
    }
  }, [externalSelectedTopic]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSelectTopic = (topic: string) => {
    setSelectedTopic(topic);
    if (externalSelectTopic) {
      externalSelectTopic(topic);
    }
  };
  
  const handleChangeTopic = () => {
    if (onChangeTopicRequest) {
      onChangeTopicRequest();
    } else {
      setIsChangingTopic(true);
      setIsConnected(false);
      setMessages([]);
      setCurrentPartner(null);
      setSelectedTopic(null);
    }
    
    if (onConnectionChange) {
      onConnectionChange(false);
    }
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
    setIsChangingTopic(false);
    
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
          type: "text"
        },
      ]);
      
      if (onConnectionChange) {
        onConnectionChange(true);
      }
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
      type: "text"
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
        type: "text"
      };
      
      setMessages(prev => [...prev, partnerMessage]);
    }, 1500);
  };
  
  const handleSendMedia = (type: string, content: string) => {
    if (!isConnected) return;
    
    // Add user media message
    const userMessage = {
      id: Date.now().toString(),
      content: content,
      sender: "user" as const,
      timestamp: new Date(),
      type: type as "image" | "camera" | "contact"
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate partner typing and response
    setTimeout(() => {
      let response = "";
      
      switch(type) {
        case "image":
          response = "Thanks for sharing that image! It really helps me understand what you're talking about.";
          break;
        case "camera":
          response = "Great photo! That gives me a much better idea of what you mean.";
          break;
        case "contact":
          response = "I've received the contact info. I'll make a note of it.";
          break;
        default:
          response = "Thanks for sharing that!";
      }
      
      const partnerMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "partner" as const,
        timestamp: new Date(),
        type: "text"
      };
      
      setMessages(prev => [...prev, partnerMessage]);
    }, 1500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  
  // Render the message content based on its type
  const renderMessageContent = (message: Message) => {
    switch(message.type) {
      case "image":
      case "camera":
        return <img src={message.content} alt="Shared media" className="rounded-md max-w-full max-h-60 my-2" />;
      case "contact":
        try {
          const contact = JSON.parse(message.content);
          return (
            <div className="bg-white/50 rounded-md p-3 my-2 border border-gray-100">
              <h4 className="font-medium">{contact.name}</h4>
              <p className="text-sm text-gray-600">{contact.phone}</p>
              <p className="text-sm text-gray-600">{contact.email}</p>
            </div>
          );
        } catch (e) {
          return <p>{message.content}</p>;
        }
      default:
        return <p>{message.content}</p>;
    }
  };
  
  if (isChangingTopic || !isConnected) {
    return (
      <div className="flex flex-col items-center justify-center p-8 glass-card rounded-3xl h-full animate-fade-in">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center bg-gradient-candy bg-clip-text text-transparent flex items-center justify-center gap-2">
            <MessageCircleHeart className="h-7 w-7 text-app-purple" />
            Find Your Dating Advisor
          </h2>
          <p className="text-gray-500 text-center mb-8">
            Choose a dating topic you'd like to discuss and we'll connect you with someone who can help.
          </p>
          
          <TopicSelector onSelectTopic={handleSelectTopic} selectedTopic={selectedTopic} />
          
          <div className="mt-8">
            <Button 
              className="w-full bg-gradient-candy hover:opacity-90 rounded-xl shadow-md h-12 text-base transition-all" 
              onClick={handleStartChat}
              disabled={isConnecting}
            >
              {isConnecting ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Finding an advisor...
                </div>
              ) : "Start Chatting"}
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full glass-card rounded-3xl shadow-card animate-fade-in">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white/80 rounded-t-3xl">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 ring-2 ring-white shadow-sm">
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
        <Button
          variant="outline" 
          size="sm"
          className="rounded-lg text-gray-500 hover:text-app-purple flex items-center gap-1"
          onClick={handleChangeTopic}
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Change Topic
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gradient-to-b from-white to-slate-50/50">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`chat-bubble ${message.sender === "user" ? "chat-bubble-user" : "chat-bubble-partner"}`}
          >
            {renderMessageContent(message)}
            <div className="text-xs mt-1 opacity-70 text-right">
              {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-slate-100 bg-white/80 rounded-b-3xl">
        <div className="flex items-center space-x-2">
          <MediaTransfer onSendMedia={handleSendMedia} isConnected={isConnected} />
          
          <Input
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 input-focus-ring rounded-xl shadow-sm border-slate-200"
          />
          <Button 
            onClick={handleSendMessage} 
            className="bg-gradient-candy hover:opacity-90 rounded-xl shadow-sm"
            disabled={!inputValue.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
