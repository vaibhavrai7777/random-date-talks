
import { MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-50/80 backdrop-blur-sm border-t border-slate-100">
      <div className="container py-10 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-6 md:mb-0">
            <div className="bg-gradient-candy p-2 rounded-xl shadow-sm">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-800">DateChat</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-16 space-y-6 md:space-y-0 text-center md:text-left">
            <div>
              <h3 className="font-bold text-gray-800 mb-3">Company</h3>
              <ul className="space-y-2 text-gray-500">
                <li className="hover:text-app-purple cursor-pointer transition-colors">About</li>
                <li className="hover:text-app-purple cursor-pointer transition-colors">Privacy</li>
                <li className="hover:text-app-purple cursor-pointer transition-colors">Terms</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-800 mb-3">Resources</h3>
              <ul className="space-y-2 text-gray-500">
                <li className="hover:text-app-purple cursor-pointer transition-colors">Dating Tips</li>
                <li className="hover:text-app-purple cursor-pointer transition-colors">Conversation Starters</li>
                <li className="hover:text-app-purple cursor-pointer transition-colors">Dating Etiquette</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} DateChat. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <span className="text-gray-500 text-sm hover:text-app-purple cursor-pointer transition-colors">Terms</span>
            <span className="text-gray-500 text-sm hover:text-app-purple cursor-pointer transition-colors">Privacy</span>
            <span className="text-gray-500 text-sm hover:text-app-purple cursor-pointer transition-colors">Contact</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
