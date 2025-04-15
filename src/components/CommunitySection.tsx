
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Users, Image, UserPlus, Heart } from "lucide-react";

export function CommunitySection() {
  const communityPosts = [
    {
      id: 1,
      author: "DragonSlayer",
      authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
      content: "Just reached Heroic for the first time! Any tips for pushing to Grandmaster?",
      likes: 45,
      comments: 23,
      time: "2 hours ago"
    },
    {
      id: 2,
      author: "NightStalker",
      authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
      content: "Looking for 2 more players for our squad. We need a rusher and a sniper. Asia server, play daily 8-11 PM.",
      likes: 19,
      comments: 32,
      time: "5 hours ago"
    },
    {
      id: 3,
      author: "PhantomGamer",
      authorImage: "https://randomuser.me/api/portraits/men/67.jpg",
      content: "Check out this custom Gloo Wall skin concept I made! What do you think?",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
      likes: 86,
      comments: 41,
      time: "1 day ago"
    }
  ];

  return (
    <section className="py-16 relative">
      {/* Background effects */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(234, 56, 76, 0.15) 0%, rgba(0, 0, 0, 0) 60%)
          `
        }}
      ></div>
      
      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <Badge variant="booyah" className="mb-4">Community</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join The <span className="text-booyah-neon-pink">Conversation</span>
          </h2>
          <p className="text-muted-foreground max-w-[600px]">
            Connect with other players, share your experiences, find teammates, and be part of our growing community.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="glass-effect rounded-lg p-6 text-center">
            <div className="h-16 w-16 rounded-full bg-booyah-purple/20 flex items-center justify-center mb-4 mx-auto">
              <MessageSquare className="h-8 w-8 text-booyah-neon-blue" />
            </div>
            <h3 className="text-xl font-bold mb-2">Active Discussions</h3>
            <p className="text-muted-foreground mb-4">
              Engage in conversations about strategies, updates, and game mechanics.
            </p>
            <div className="text-2xl font-bold text-booyah-neon-blue mb-2">
              5,240+
            </div>
            <p className="text-sm text-muted-foreground">
              Active forum threads
            </p>
          </div>

          <div className="glass-effect rounded-lg p-6 text-center">
            <div className="h-16 w-16 rounded-full bg-booyah-purple/20 flex items-center justify-center mb-4 mx-auto">
              <Users className="h-8 w-8 text-booyah-neon-blue" />
            </div>
            <h3 className="text-xl font-bold mb-2">Find Teammates</h3>
            <p className="text-muted-foreground mb-4">
              Connect with players who match your playstyle and schedule.
            </p>
            <div className="text-2xl font-bold text-booyah-neon-blue mb-2">
              950+
            </div>
            <p className="text-sm text-muted-foreground">
              Players looking for squads
            </p>
          </div>

          <div className="glass-effect rounded-lg p-6 text-center">
            <div className="h-16 w-16 rounded-full bg-booyah-purple/20 flex items-center justify-center mb-4 mx-auto">
              <Image className="h-8 w-8 text-booyah-neon-blue" />
            </div>
            <h3 className="text-xl font-bold mb-2">Fan Art & Memes</h3>
            <p className="text-muted-foreground mb-4">
              Share and discover creative content from the community.
            </p>
            <div className="text-2xl font-bold text-booyah-neon-blue mb-2">
              2,100+
            </div>
            <p className="text-sm text-muted-foreground">
              Creative submissions
            </p>
          </div>
        </div>

        {/* Community feed */}
        <h3 className="text-2xl font-bold mb-6">Community Feed</h3>
        
        <div className="space-y-6 mb-12">
          {communityPosts.map((post) => (
            <div key={post.id} className="neon-card p-5">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={post.authorImage} 
                    alt={post.author} 
                    className="h-full w-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-semibold">{post.author}</div>
                      <div className="text-xs text-muted-foreground">{post.time}</div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-booyah-neon-blue">
                      <UserPlus className="h-4 w-4" />
                      <span className="sr-only">Follow</span>
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <p>{post.content}</p>
                    {post.image && (
                      <div className="rounded-lg overflow-hidden mt-3">
                        <img 
                          src={post.image} 
                          alt="Post attachment" 
                          className="w-full h-auto"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 mt-4">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center glass-effect p-6 rounded-lg">
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold mb-2">Join Our Community</h3>
            <p className="text-muted-foreground">
              Connect with thousands of Free Fire players, join discussions, and find your next squad
            </p>
          </div>
          <Button variant="booyah" className="whitespace-nowrap">
            Create Account
          </Button>
        </div>
      </div>
    </section>
  );
}
