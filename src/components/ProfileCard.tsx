
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
    <div className={`bg-white rounded-xl shadow-sm border p-6 transition-all ${isActive ? "border-app-purple/50 ring-1 ring-app-purple/20" : ""}`}>
      <div className="flex items-start gap-4">
        <Avatar className="h-14 w-14 border-2 border-app-pink/50">
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
              <h3 className="font-semibold text-gray-800">{name}</h3>
              <p className="text-sm text-gray-500">{status}</p>
            </div>
            
            {!isUser && onStartChat && (
              <Button 
                size="sm" 
                variant="outline" 
                className="text-app-purple border-app-purple/30 hover:bg-app-purple/10" 
                onClick={onStartChat}
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                Chat
              </Button>
            )}
          </div>
          
          {topics.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1">
              {topics.map((topic, idx) => (
                <Badge key={idx} variant="secondary" className="bg-app-purple/10 text-app-purple-dark hover:bg-app-purple/20">
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
