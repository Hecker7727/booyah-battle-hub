
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h1 className="text-6xl font-bold text-booyah-neon-blue animate-pulse-neon mb-6">404</h1>
          <div className="glass-effect p-8 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">Oops! Page Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The page you're looking for doesn't exist or has been moved.
              Let's get you back to the battleground!
            </p>
            <Button variant="fire" className="w-full" asChild>
              <a href="/">
                <Home className="mr-2 h-4 w-4" />
                Return to Home
              </a>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            If you think this is an error, please contact our support team.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
