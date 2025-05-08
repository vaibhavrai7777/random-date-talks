
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProfileCardProps {
  name: string;
  status: string;
  topics: string[];
  avatar?: string;
  isActive?: boolean;
  isUser?: boolean;
  onStartChat?: () => void;
}

const ProfileCard = ({ 
  name, 
  status, 
  topics = [], 
  avatar, 
  isActive = false,
  isUser = false,
  onStartChat 
}: ProfileCardProps) => {
  return (
    <div className={`glass-card rounded-2xl p-6 transition-all animate-fade-in ${isActive ? "ring-2 ring-app-purple/30" : ""}`}>
      <div className="flex items-start gap-4">
        <Avatar className="h-16 w-16 border-2 border-app-pink/50 ring-2 ring-white shadow-md">
          {avatar ? (
            <img src={avatar} alt={name} />
          ) : (
            <User className="h-8 w-8 text-gray-400" />
          )}
          {isActive && (
            <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-green-500 ring-2 ring-white" />
          )}
        </Avatar>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-gray-800">{name}</h3>
              <p className="text-sm text-gray-500">{status}</p>
            </div>
            
            {!isUser && onStartChat && (
              <Button 
                size="sm" 
                className="bg-gradient-candy hover:opacity-90 rounded-xl shadow-sm" 
                onClick={onStartChat}
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                Chat
              </Button>
            )}
          </div>
          
          {topics.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {topics.map((topic, idx) => (
                <Badge key={idx} variant="secondary" className="bg-app-purple/10 text-app-purple hover:bg-app-purple/20 rounded-lg px-3 py-1">
                  {topic}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
