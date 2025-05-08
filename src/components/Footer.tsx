
import { MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <MessageCircle className="h-5 w-5 text-app-purple" />
            <span className="font-bold text-lg text-gray-800">DateChat</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-12 space-y-4 md:space-y-0 text-center md:text-left">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Company</h3>
              <ul className="space-y-1 text-gray-500">
                <li>About</li>
                <li>Privacy</li>
                <li>Terms</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Resources</h3>
              <ul className="space-y-1 text-gray-500">
                <li>Dating Tips</li>
                <li>Conversation Starters</li>
                <li>Dating Etiquette</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} DateChat. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <span className="text-gray-500 text-sm">Terms</span>
            <span className="text-gray-500 text-sm">Privacy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
