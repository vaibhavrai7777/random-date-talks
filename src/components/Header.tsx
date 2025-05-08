
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-10 shadow-sm">
      <div className="container flex justify-between items-center py-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-gradient-candy p-2 rounded-xl shadow-glow">
            <MessageCircle className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl text-gray-800">DateChat</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-600 hover:text-app-purple transition-colors font-medium">
            Home
          </Link>
          <Link to="/chat" className="text-gray-600 hover:text-app-purple transition-colors font-medium">
            Chat Now
          </Link>
          <Link to="/chat" className="text-gray-600 hover:text-app-purple transition-colors font-medium">
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
