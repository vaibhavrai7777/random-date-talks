
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatInterface from "@/components/ChatInterface";

const Chat = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container my-8">
        <div className="max-w-4xl mx-auto h-[600px]">
          <ChatInterface />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chat;
