
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, User, Search, Bell, BookOpen, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is admin
    const adminStatus = sessionStorage.getItem("isAdmin") === "true";
    setIsAdmin(adminStatus);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("isAdmin");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex gap-6 items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-booyah-neon-blue animate-pulse-neon">
              Booyah<span className="text-booyah-fire">Zone</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex gap-6">
            <Link to="/squad-finder" className="text-sm font-medium hover:text-booyah-neon-blue transition-colors">
              Squad Finder
            </Link>
            <Link to="/clips" className="text-sm font-medium hover:text-booyah-neon-blue transition-colors">
              Clips & Highlights
            </Link>
            <Link to="/tournaments" className="text-sm font-medium hover:text-booyah-neon-blue transition-colors">
              Tournaments
            </Link>
            <Link to="/guides" className="text-sm font-medium hover:text-booyah-neon-blue transition-colors">
              Guides
            </Link>
            <Link to="/news" className="text-sm font-medium hover:text-booyah-neon-blue transition-colors">
              News & Tips
            </Link>
            <Link to="/forums" className="text-sm font-medium hover:text-booyah-neon-blue transition-colors">
              Forums
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-4 w-4" />
            <Badge variant="fire" className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center p-0">3</Badge>
          </Button>
          
          {isAdmin && (
            <Link to="/admin">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-booyah-fire" />
                Admin
              </Button>
            </Link>
          )}
          
          {isLoggedIn ? (
            <div className="hidden md:flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative" aria-label="User Profile">
                <User className="h-4 w-4" />
                <Badge variant="neon" className="absolute -top-1 -right-1 w-2 h-2 p-0"></Badge>
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button variant="neon" size="sm" className="hidden md:flex" onClick={handleLogin}>
              Join Community
            </Button>
          )}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu} aria-label="Toggle Menu">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="container md:hidden">
          <nav className="flex flex-col space-y-4 pb-6">
            <Link to="/squad-finder" className="text-sm font-medium hover:text-booyah-neon-blue transition-colors p-2">
              Squad Finder
            </Link>
            <Link to="/clips" className="text-sm font-medium hover:text-booyah-neon-blue transition-colors p-2">
              Clips & Highlights
            </Link>
            <Link to="/tournaments" className="text-sm font-medium hover:text-booyah-neon-blue transition-colors p-2">
              Tournaments
            </Link>
            <Link to="/guides" className="text-sm font-medium hover:text-booyah-neon-blue transition-colors p-2">
              Guides
            </Link>
            <Link to="/news" className="text-sm font-medium hover:text-booyah-neon-blue transition-colors p-2">
              News & Tips
            </Link>
            <Link to="/forums" className="text-sm font-medium hover:text-booyah-neon-blue transition-colors p-2">
              Forums
            </Link>
            
            {isAdmin && (
              <Link to="/admin" className="text-sm font-medium hover:text-booyah-neon-blue transition-colors p-2 flex items-center gap-2">
                <Shield className="h-4 w-4 text-booyah-fire" />
                Admin Panel
              </Link>
            )}
            
            {isLoggedIn ? (
              <div className="flex gap-4">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </Button>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button variant="neon" size="sm" className="w-full" onClick={handleLogin}>
                Join Community
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
