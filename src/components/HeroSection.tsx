
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Trophy, Flame, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ClipUploadForm } from "@/components/ClipUploadForm";

export function HeroSection() {
  const navigate = useNavigate();
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  const handleFindSquad = () => {
    navigate("/squad-finder");
  };

  const handleJoinCommunity = () => {
    navigate("/login");
  };

  const handleUploadClip = () => {
    setShowUploadDialog(true);
  };

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Background effects */}
      <div className="absolute inset-0 z-0 bg-black opacity-50"></div>
      <div 
        className="absolute inset-0 z-0 bg-gradient-to-b from-booyah-purple-dark/40 to-transparent"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(155, 135, 245, 0.15) 0%, rgba(0, 0, 0, 0) 50%),
            radial-gradient(circle at 80% 70%, rgba(234, 56, 76, 0.15) 0%, rgba(0, 0, 0, 0) 50%)
          `
        }}
      ></div>
      
      <div className="container relative z-10">
        <div className="grid gap-12 md:grid-cols-2 md:gap-8 items-center">
          <div className="flex flex-col gap-6">
            <div className="space-y-2">
              <Badge variant="neon" className="mb-4">The Ultimate Free Fire Hub</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                Squad Up. <span className="text-booyah-neon-blue animate-pulse-neon">Battle</span> Hard.{" "}
                <span className="text-booyah-fire animate-flicker">Booyah</span> Always.
              </h1>
              <p className="text-xl text-muted-foreground max-w-[600px]">
                Join the ultimate Free Fire community to squad up, dominate tournaments, and show off your top gameplay moments.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="fire" size="lg" className="group" onClick={handleFindSquad}>
                Find Your Squad
                <ArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="neon" size="lg" onClick={handleJoinCommunity}>
                Join Community
              </Button>
            </div>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2"
                onClick={handleUploadClip}
              >
                <Video className="h-4 w-4" />
                Upload Clip
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="glass-effect flex flex-col items-center p-3">
                <div className="flex items-center gap-2 text-booyah-neon-blue font-semibold">
                  <Users className="h-4 w-4" />
                  <span>10K+</span>
                </div>
                <p className="text-xs text-muted-foreground">Active Players</p>
              </div>
              <div className="glass-effect flex flex-col items-center p-3">
                <div className="flex items-center gap-2 text-booyah-neon-pink font-semibold">
                  <Trophy className="h-4 w-4" />
                  <span>250+</span>
                </div>
                <p className="text-xs text-muted-foreground">Tournaments</p>
              </div>
              <div className="glass-effect flex flex-col items-center p-3">
                <div className="flex items-center gap-2 text-booyah-fire font-semibold">
                  <Flame className="h-4 w-4" />
                  <span>1.5M+</span>
                </div>
                <p className="text-xs text-muted-foreground">Booyahs</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden border border-booyah-purple/30 shadow-xl shadow-booyah-purple/10">
              <img 
                src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5" 
                alt="Free Fire Gameplay" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <Badge variant="fire" className="mb-2">FEATURED</Badge>
                <h3 className="text-lg font-bold">Regional Championship Finals</h3>
                <p className="text-sm text-muted-foreground">Watch the top squads battle for supremacy</p>
              </div>
            </div>
            
            {/* Floating badges */}
            <Badge 
              variant="neon" 
              className="absolute -top-2 -right-2 floating shadow-lg"
            >
              LIVE NOW
            </Badge>
          </div>
        </div>
      </div>

      {/* Clip Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upload Your Gameplay Clip</DialogTitle>
            <DialogDescription>
              Share your best Free Fire moments with the community.
            </DialogDescription>
          </DialogHeader>
          
          <ClipUploadForm onSuccess={() => setShowUploadDialog(false)} />
        </DialogContent>
      </Dialog>
    </section>
  );
}
