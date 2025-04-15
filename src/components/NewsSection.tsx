
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Calendar, Clock, BookOpen } from "lucide-react";

export function NewsSection() {
  const newsArticles = [
    {
      id: 1,
      title: "New Character 'Blaze' Coming Next Month",
      excerpt: "The new character brings unique fire abilities and passive buffs to your squad.",
      date: "April 10, 2025",
      readTime: "3 min",
      category: "Updates",
      imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00"
    },
    {
      id: 2,
      title: "Top 5 Weapons After Recent Balance Update",
      excerpt: "The meta has shifted after the latest patch. Here are the weapons you should be using.",
      date: "April 8, 2025",
      readTime: "5 min",
      category: "Guides",
      imageUrl: "https://plus.unsplash.com/premium_photo-1691959683693-90d7afecc0cd"
    },
    {
      id: 3,
      title: "Advanced Movement Techniques Every Player Should Know",
      excerpt: "Master these movement tricks to outplay your opponents and survive longer in matches.",
      date: "April 5, 2025",
      readTime: "7 min",
      category: "Tips & Tricks",
      imageUrl: "https://images.unsplash.com/photo-1535979863199-3c77338429a0"
    }
  ];

  return (
    <section className="py-16 relative">
      {/* Background effects */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 80% 70%, rgba(155, 135, 245, 0.15) 0%, rgba(0, 0, 0, 0) 60%)
          `
        }}
      ></div>
      
      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <Badge variant="neon" className="mb-4">News & Tips</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay <span className="text-booyah-neon-blue">Informed</span> & Improve
          </h2>
          <p className="text-muted-foreground max-w-[600px]">
            Latest updates, game tips, character guides, and strategies to boost your gameplay.
          </p>
        </div>

        {/* News grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {newsArticles.map((article) => (
            <div key={article.id} className="neon-card overflow-hidden group cursor-pointer">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Badge */}
                <div className="absolute bottom-4 left-4">
                  <Badge variant={article.category === "Updates" ? "fire" : (article.category === "Guides" ? "neon" : "booyah")}>
                    {article.category}
                  </Badge>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-xs text-muted-foreground gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{article.readTime} read</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold mb-2 group-hover:text-booyah-neon-blue transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {article.excerpt}
                </p>
                <Button variant="ghost" className="px-0 text-booyah-neon-blue group-hover:text-booyah-neon-pink transition-colors">
                  Read Article
                  <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Guides section */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="glass-effect p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="fire">Popular Guides</Badge>
            </div>
            <h3 className="text-xl font-bold mb-4">Essential Guides for Every Player</h3>
            
            <div className="space-y-4">
              {[
                "Beginner's Guide to Free Fire: Basic Controls & Settings",
                "Character Combinations for Different Playstyles",
                "Mastering Gloo Wall Placement for Defense & Attack",
                "Rank Pushing Strategy: Diamond to Heroic",
                "Best Drop Locations for High-Tier Loot"
              ].map((guide, index) => (
                <div 
                  key={index}
                  className="flex items-center p-3 bg-black/20 rounded-lg border border-booyah-purple/20 hover:border-booyah-purple/50 transition-colors cursor-pointer"
                >
                  <div className="h-8 w-8 rounded-full bg-booyah-purple/30 flex items-center justify-center mr-3">
                    <BookOpen className="h-4 w-4 text-booyah-neon-blue" />
                  </div>
                  <span className="font-medium">{guide}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative rounded-lg overflow-hidden border border-booyah-fire/30">
            <img 
              src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5" 
              alt="Weekly Tips" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>
            
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <Badge variant="fire" className="mb-4 self-start">Weekly Tips</Badge>
              <h3 className="text-xl font-bold mb-2">Pro Tips: Winning Close-Range Fights</h3>
              <p className="text-muted-foreground mb-4 max-w-md">
                Learn the advanced techniques pro players use to dominate in close-quarter combat situations.
              </p>
              <div className="flex items-center text-xs text-muted-foreground gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>April 12, 2025</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>8 min read</span>
                </div>
              </div>
              <Button variant="fire">
                Read Weekly Tips
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button variant="neon">
            Browse All Articles
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
