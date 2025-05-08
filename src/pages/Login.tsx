
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate login delay
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Successfully logged in!");
      navigate("/chat");
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container my-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Card className="border-app-purple/20 shadow-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-app-purple/5 to-app-pink/10 z-0"></div>
            
            <CardHeader className="relative z-10 space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-center">Welcome to DateChat</CardTitle>
              <CardDescription className="text-center">
                Log in to start getting dating advice
              </CardDescription>
            </CardHeader>
            
            <CardContent className="relative z-10 pb-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-app-purple/20 focus-visible:ring-app-purple transition-all"
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-app-purple/20 pr-10 focus-visible:ring-app-purple transition-all"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-app-purple hover:bg-app-purple/90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader className="h-4 w-4 animate-spin" />
                      <span>Logging in...</span>
                    </span>
                  ) : (
                    "Log in"
                  )}
                </Button>
              </form>
            </CardContent>
            
            <CardFooter className="flex flex-col gap-4 pt-0 pb-6 relative z-10">
              <div className="text-sm text-center">
                <span className="text-muted-foreground">Don't have an account? </span>
                <Link to="/login" className="text-app-purple hover:underline font-medium">
                  Sign up
                </Link>
              </div>
              
              <div className="text-xs text-center text-muted-foreground">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </div>
            </CardFooter>
          </Card>
          
          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-app-purple hover:underline">
              Back to home
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
