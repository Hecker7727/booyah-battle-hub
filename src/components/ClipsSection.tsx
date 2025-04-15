
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Heart, MessageSquare, Share2, ThumbsUp, ChevronRight } from "lucide-react";

export function ClipsSection() {
  const featuredClips = [
    {
      id: 1,
      title: "Insane Squad Wipe with Sniper",
      author: "HeadshotKing",
      views: "25.4K",
      likes: 1240,
      comments: 85,
      thumbnail: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb"
    },
    {
      id: 2,
      title: "Clutch 1v4 in Final Zone",
      author: "ProGamer99",
      views: "18.7K",
      likes: 945,
      comments: 67,
      thumbnail: "https://plus.unsplash.com/premium_photo-1695589066344-323e0c542995"
    },
    {
      id: 3,
      title: "World Record 32 Kills Solo Match",
      author: "NinjaWarrior",
      views: "56.2K",
      likes: 3250,
      comments: 219,
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5"
    },
    {
      id: 4,
      title: "Perfect Grenade Trick for Factory",
      author: "TacticalMaster",
      views: "12.3K",
      likes: 782,
      comments: 46,
      thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00"
    }
  ];

  return (
    <section className="py-16 relative">
      {/* Background effects */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 50%, rgba(155, 135, 245, 0.15) 0%, rgba(0, 0, 0, 0) 60%)
          `
        }}
      ></div>
      
      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <Badge variant="booyah" className="mb-4">Clips & Highlights</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Epic <span className="text-booyah-neon-pink">Gameplay</span> Moments
          </h2>
          <p className="text-muted-foreground max-w-[600px]">
            Watch and share incredible plays, clutch moments, and skill showcases from the community.
          </p>
        </div>

        {/* Top highlighted clip */}
        <div className="relative overflow-hidden rounded-lg border border-booyah-purple/30 shadow-xl shadow-booyah-purple/10 mb-12">
          <div className="aspect-video relative group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb" 
              alt="Top Booyah Moment" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
            
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-black/50 border border-white/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Play className="h-8 w-8 text-white" fill="white" />
              </div>
            </div>
            
            {/* Badge */}
            <div className="absolute top-4 left-4">
              <Badge variant="fire" className="animate-fire">TOP BOOYAH MOMENT</Badge>
            </div>
            
            {/* Content */}
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Incredible Last Second Triple Kill for the Win</h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                <span className="font-semibold">By FireLegend</span>
                <span className="text-muted-foreground">85.6K views</span>
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4 text-booyah-fire" fill="#ea384c" />
                  <span>4.5K</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>312</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clips grid */}
        <h3 className="text-2xl font-bold mb-6">Featured Highlights</h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredClips.map((clip) => (
            <div key={clip.id} className="neon-card overflow-hidden group cursor-pointer">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={clip.thumbnail} 
                  alt={clip.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                  <div className="h-12 w-12 rounded-full bg-black/50 border border-white/20 flex items-center justify-center">
                    <Play className="h-5 w-5 text-white" fill="white" />
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <h4 className="font-semibold mb-2 line-clamp-1">{clip.title}</h4>
                <div className="flex flex-wrap items-center text-xs text-muted-foreground gap-x-3 gap-y-1 mb-3">
                  <span>{clip.author}</span>
                  <span>{clip.views} views</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-1 text-sm">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{clip.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-sm">
                      <MessageSquare className="h-4 w-4" />
                      <span>{clip.comments}</span>
                    </button>
                  </div>
                  <button className="text-booyah-neon-blue">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center bg-black/30 p-6 rounded-lg border border-booyah-purple/20">
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold mb-2">Got an Epic Booyah Moment?</h3>
            <p className="text-muted-foreground">
              Share your best gameplay clips with the community
            </p>
          </div>
          <Button variant="fire" className="whitespace-nowrap">
            Upload Your Clip
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
