
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export function CommunitySection() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if the user is logged in (would be replaced with actual auth logic)
    const checkLoginStatus = () => {
      // This is just a mock implementation
      const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
    };

    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  if (!isLoggedIn) {
    return (
      <section className="py-20 relative">
        <div className="absolute inset-0 z-0" style={{
          backgroundImage: `
            radial-gradient(circle at 30% 50%, rgba(155, 135, 245, 0.15) 0%, rgba(0, 0, 0, 0) 50%),
            radial-gradient(circle at 70% 50%, rgba(234, 56, 76, 0.1) 0%, rgba(0, 0, 0, 0) 50%)
          `
        }}></div>
        
        <div className="container relative z-10 flex flex-col items-center justify-center min-h-[50vh]">
          <Badge variant="fire" className="mb-4">Authentication Required</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Login to Access the <span className="text-booyah-fire">Community</span>
          </h2>
          <p className="text-muted-foreground max-w-[600px] text-center mb-8">
            You need to be logged in to access the forums and interact with the BooyahZone community.
          </p>
          
          <Button variant="fire" size="lg" onClick={handleLogin}>
            Login / Create Account
          </Button>
        </div>
      </section>
    );
  }

  // Actual forum content would be here - this is just a placeholder
  return (
    <div>Forums content for logged-in users</div>
  );
}
