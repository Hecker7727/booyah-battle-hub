
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
    // Check if the user is logged in
    const checkLoginStatus = () => {
      const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
    };

    checkLoginStatus();
    
    // Add this event listener to update login status if it changes
    window.addEventListener('storage', checkLoginStatus);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleForumAccess = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "You need to log in to access the forums.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    // If logged in, you can access the forums
    navigate("/forums");
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

  // Actual forum content for logged-in users
  return (
    <section className="py-16 min-h-screen">
      <div className="container">
        <h1 className="text-3xl font-bold mb-6">BooyahZone Community Forums</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="neon-card p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Latest Discussions</h2>
              
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="p-4 border border-border rounded-md bg-card/60 hover:bg-card/80 transition-colors">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">Community Tournament Suggestions</h3>
                      <span className="text-sm text-muted-foreground">2 hours ago</span>
                    </div>
                    <p className="line-clamp-2 text-sm text-muted-foreground mb-2">
                      Let's discuss ideas for the upcoming community tournament. What maps should we play? What format would work best?
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                        <span className="text-xs">BooyahMaster</span>
                      </div>
                      <div className="text-xs text-muted-foreground">23 replies</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-4">View All Threads</Button>
            </div>
          </div>
          
          <div>
            <div className="neon-card p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Forum Categories</h2>
              <ul className="space-y-2">
                <li><Button variant="link" className="p-0 h-auto text-booyah-neon-blue">General Discussion</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-booyah-neon-blue">Tournaments & Events</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-booyah-neon-blue">Gameplay & Strategy</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-booyah-neon-blue">Squad Recruitment</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-booyah-neon-blue">Bug Reports</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-booyah-neon-blue">Suggestions & Feedback</Button></li>
              </ul>
            </div>
            
            <div className="neon-card p-6">
              <h2 className="text-xl font-bold mb-4">Community Rules</h2>
              <ul className="space-y-2 text-sm">
                <li>1. Be respectful to all members</li>
                <li>2. No spamming or self-promotion</li>
                <li>3. Keep discussions related to Free Fire</li>
                <li>4. No sharing of account details</li>
                <li>5. Report bugs in the appropriate section</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
