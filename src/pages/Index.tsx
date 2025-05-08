
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, Heart, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProfileCard from "@/components/ProfileCard";

const Index = () => {
  const featuredAdvisors = [
    {
      name: "Alex Johnson",
      status: "Dating Coach",
      topics: ["Dating Apps", "First Dates", "Online Dating"],
      isActive: true
    },
    {
      name: "Jamie Smith",
      status: "Relationship Expert",
      topics: ["Relationships", "Communication", "Dating Anxiety"],
      isActive: true
    },
    {
      name: "Taylor Wilson",
      status: "Dating Consultant",
      topics: ["Dating Profile", "Conversation Starters", "Red Flags"],
      isActive: false
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-12 pb-20 md:pt-20 md:pb-28">
          <div className="container">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                  Dating advice from real people, anytime
                </h1>
                <p className="text-xl text-gray-500 mb-8 max-w-lg">
                  Connect with people who can answer your dating questions, share experiences, and offer advice on love and relationships.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/chat">
                    <Button className="bg-app-purple hover:bg-app-purple/90 px-8 py-6 text-lg">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Start Chatting
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="lg:w-1/2 flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute -left-4 -top-4 w-full h-full rounded-xl bg-app-pink"></div>
                  <div className="absolute -right-4 -bottom-4 w-full h-full rounded-xl bg-app-purple/20"></div>
                  <div className="relative z-10 bg-white p-6 rounded-xl shadow-sm border animate-pulse-slow">
                    <div className="flex items-center mb-4">
                      <div className="h-10 w-10 rounded-full bg-app-purple/30 flex items-center justify-center">
                        <Heart className="h-5 w-5 text-app-purple" />
                      </div>
                      <div className="ml-3">
                        <h3 className="font-semibold">DateChat Advisor</h3>
                        <p className="text-sm text-gray-500">Online now</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">
                      "Hi there! Dating can be confusing sometimes. What specifically would you like advice about today?"
                    </p>
                    <div className="h-10 bg-gray-100 rounded-lg px-4 flex items-center text-gray-400 text-sm">
                      Type your question...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              How DateChat Works
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-app-purple/10 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="h-8 w-8 text-app-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Choose a Topic</h3>
                <p className="text-gray-500">
                  Select what dating topic you'd like to discuss, from first dates to relationship advice.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-app-pink rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-app-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Connect With Someone</h3>
                <p className="text-gray-500">
                  We'll match you with someone who can help answer your dating questions.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-app-purple/10 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-app-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Get Advice</h3>
                <p className="text-gray-500">
                  Chat anonymously and get personalized advice for your dating situation.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Advisors */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
              Featured Dating Advisors
            </h2>
            <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
              Our community of experienced advisors ready to chat about your dating questions.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredAdvisors.map((advisor, idx) => (
                <ProfileCard
                  key={idx}
                  name={advisor.name}
                  status={advisor.status}
                  topics={advisor.topics}
                  isActive={advisor.isActive}
                  onStartChat={() => window.location.href = "/chat"}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-app-purple/5 py-20 border-t border-b">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Ready to get dating advice?
              </h2>
              <p className="text-xl text-gray-500 mb-8">
                Start chatting with real people who understand the ups and downs of modern dating.
              </p>
              <Link to="/chat">
                <Button className="bg-app-purple hover:bg-app-purple/90 px-8 py-6 text-lg">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Connect with an Advisor
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
