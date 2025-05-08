
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="container flex justify-between items-center py-4">
        <Link to="/" className="flex items-center space-x-2">
          <MessageCircle className="h-6 w-6 text-app-purple" />
          <span className="font-bold text-xl text-gray-800">DateChat</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-app-purple transition-colors">
            Home
          </Link>
          <Link to="/chat" className="text-gray-600 hover:text-app-purple transition-colors">
            Chat Now
          </Link>
          <Link to="/chat" className="text-gray-600 hover:text-app-purple transition-colors">
            Topics
          </Link>
        </nav>
        
        <div className="flex items-center space-x-3">
          <Link to="/login" className="text-gray-600 hover:text-app-purple transition-colors hidden sm:inline-block">
            Login
          </Link>
          <Link to="/chat">
            <Button className="bg-app-purple hover:bg-app-purple/90">
              Start Chatting
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
