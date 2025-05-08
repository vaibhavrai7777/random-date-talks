
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircleHeart } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-10 shadow-sm">
      <div className="container flex justify-between items-center py-3">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-gradient-candy p-2 rounded-xl shadow-glow">
            <MessageCircleHeart className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl text-gray-800">DateChat</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-app-purple transition-colors font-medium flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-app-purple/5">
            Home
          </Link>
          <Link to="/chat" className="text-gray-600 hover:text-app-purple transition-colors font-medium flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-app-purple/5">
            Chat Now
          </Link>
          <Link to="/chat" className="text-gray-600 hover:text-app-purple transition-colors font-medium flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-app-purple/5">
            Topics
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link to="/login" className="text-gray-600 hover:text-app-purple transition-colors hidden sm:inline-block font-medium">
            Login
          </Link>
          <Link to="/chat">
            <Button className="bg-gradient-candy hover:opacity-90 shadow-md rounded-xl">
              Start Chatting
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
