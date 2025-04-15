
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Youtube, Twitch } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pt-12 pb-6">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Link to="/" className="flex items-center gap-2">
                <span className="text-xl font-bold text-booyah-neon-blue animate-pulse-neon">
                  Booyah<span className="text-booyah-fire">Zone</span>
                </span>
              </Link>
            </div>
            <p className="text-muted-foreground mb-6">
              The ultimate Free Fire community hub for players to connect, compete, and improve together.
            </p>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Youtube className="h-4 w-4" />
                <span className="sr-only">YouTube</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Twitch className="h-4 w-4" />
                <span className="sr-only">Discord</span>
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/squad-finder" className="text-muted-foreground hover:text-booyah-neon-blue transition-colors">
                  Squad Finder
                </Link>
              </li>
              <li>
                <Link to="/clips" className="text-muted-foreground hover:text-booyah-neon-blue transition-colors">
                  Clips & Highlights
                </Link>
              </li>
              <li>
                <Link to="/tournaments" className="text-muted-foreground hover:text-booyah-neon-blue transition-colors">
                  Tournaments & Events
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-muted-foreground hover:text-booyah-neon-blue transition-colors">
                  News & Tips
                </Link>
              </li>
              <li>
                <Link to="/forums" className="text-muted-foreground hover:text-booyah-neon-blue transition-colors">
                  Forums
                </Link>
              </li>
              <li>
                <Link to="/store" className="text-muted-foreground hover:text-booyah-neon-blue transition-colors">
                  Store & Giveaways
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/guides/beginners" className="text-muted-foreground hover:text-booyah-neon-blue transition-colors">
                  Beginner's Guide
                </Link>
              </li>
              <li>
                <Link to="/guides/characters" className="text-muted-foreground hover:text-booyah-neon-blue transition-colors">
                  Character Guides
                </Link>
              </li>
              <li>
                <Link to="/guides/weapons" className="text-muted-foreground hover:text-booyah-neon-blue transition-colors">
                  Weapon Tier List
                </Link>
              </li>
              <li>
                <Link to="/guides/maps" className="text-muted-foreground hover:text-booyah-neon-blue transition-colors">
                  Map Strategies
                </Link>
              </li>
              <li>
                <Link to="/guides/rank" className="text-muted-foreground hover:text-booyah-neon-blue transition-colors">
                  Rank Pushing Tips
                </Link>
              </li>
              <li>
                <Link to="/updates" className="text-muted-foreground hover:text-booyah-neon-blue transition-colors">
                  Patch Notes
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to get updates on tournaments, events, and exclusive content.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-background/50 border-booyah-purple/30 focus-visible:border-booyah-neon-blue"
              />
              <Button variant="neon">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              By subscribing, you agree to our Privacy Policy and Terms of Service.
            </p>
          </div>
        </div>
        
        <div className="border-t border-border/40 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} BooyahZone. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
