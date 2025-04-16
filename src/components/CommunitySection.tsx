import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Users, 
  Image as ImageIcon, 
  UserPlus, 
  Heart, 
  MessageCircle, 
  TrendingUp,
  Clock,
  Filter,
  Plus,
  ChevronDown,
  Send,
  Eye,
  PenSquare
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

type ForumPost = {
  id: string;
  author: string;
  authorImage: string;
  authorRank?: string;
  title?: string;
  content: string;
  image?: string;
  category?: string;
  likes: number;
  comments: number;
  views?: number;
  time: string;
  pinned?: boolean;
  liked?: boolean;
};

type ForumCategory = {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  threads: number;
  posts: number;
  lastPost?: string;
};

const FORUM_POSTS: ForumPost[] = [
  {
    id: "1",
    author: "DragonSlayer",
    authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
    authorRank: "Moderator",
    title: "Tips for reaching Heroic rank",
    content: "Just reached Heroic for the first time! Here are some tips that helped me climb from Diamond:\n\n1. Focus on positioning over kills\n2. Use utility (gloo walls, grenades) strategically\n3. Communicate with your team\n4. Learn when to engage and when to retreat\n\nAny other tips for pushing to Grandmaster?",
    category: "Tips & Strategies",
    likes: 45,
    comments: 23,
    views: 128,
    time: "2 hours ago",
    pinned: true
  },
  {
    id: "2",
    author: "NightStalker",
    authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
    title: "Looking for squad members",
    content: "Looking for 2 more players for our squad. We need a rusher and a sniper. Asia server, play daily 8-11 PM.",
    category: "Squad Recruitment",
    likes: 19,
    comments: 32,
    views: 97,
    time: "5 hours ago"
  },
  {
    id: "3",
    author: "PhantomGamer",
    authorImage: "https://randomuser.me/api/portraits/men/67.jpg",
    title: "Custom Gloo Wall skin concept",
    content: "Check out this custom Gloo Wall skin concept I made! What do you think?",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
    category: "Fan Art",
    likes: 86,
    comments: 41,
    views: 215,
    time: "1 day ago"
  },
  {
    id: "4",
    author: "TacticalQueen",
    authorImage: "https://randomuser.me/api/portraits/women/28.jpg",
    title: "New weapon balance changes discussion",
    content: "Let's discuss the new weapon balance changes in the latest patch. I think the SMG buffs make them too strong in close range. What are your thoughts?",
    category: "Game Discussion",
    likes: 52,
    comments: 67,
    views: 183,
    time: "2 days ago"
  }
];

const FORUM_CATEGORIES: ForumCategory[] = [
  {
    id: "1",
    name: "Game Discussion",
    icon: <MessageCircle className="h-5 w-5 text-booyah-neon-blue" />,
    description: "General discussions about the game, updates, and features",
    threads: 324,
    posts: 1832,
    lastPost: "3 minutes ago"
  },
  {
    id: "2",
    name: "Tips & Strategies",
    icon: <TrendingUp className="h-5 w-5 text-booyah-neon-blue" />,
    description: "Share and learn tips, tricks, and strategies to improve your gameplay",
    threads: 215,
    posts: 1431,
    lastPost: "12 minutes ago"
  },
  {
    id: "3",
    name: "Squad Recruitment",
    icon: <Users className="h-5 w-5 text-booyah-neon-blue" />,
    description: "Find teammates and build your squad",
    threads: 186,
    posts: 975,
    lastPost: "35 minutes ago"
  },
  {
    id: "4",
    name: "Fan Art",
    icon: <ImageIcon className="h-5 w-5 text-booyah-neon-blue" />,
    description: "Share your artwork, concepts, and creative content",
    threads: 98,
    posts: 437,
    lastPost: "2 hours ago"
  }
];

export function CommunitySection() {
  const [posts, setPosts] = useState<ForumPost[]>(FORUM_POSTS);
  const [categories] = useState<ForumCategory[]>(FORUM_CATEGORIES);
  const [activeTab, setActiveTab] = useState<"latest" | "categories">("latest");
  const [newPostContent, setNewPostContent] = useState("");
  const navigate = useNavigate();
  
  const { toast } = useToast();

  const handleLike = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              likes: post.liked ? post.likes - 1 : post.likes + 1,
              liked: !post.liked 
            } 
          : post
      )
    );
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim()) {
      toast({
        title: "Error",
        description: "Post content cannot be empty",
        variant: "destructive"
      });
      return;
    }
    
    const newPost: ForumPost = {
      id: `temp-${Date.now()}`,
      author: "CurrentUser",
      authorImage: "https://randomuser.me/api/portraits/men/85.jpg",
      content: newPostContent,
      likes: 0,
      comments: 0,
      views: 0,
      time: "Just now",
      liked: false
    };
    
    setPosts(prev => [newPost, ...prev]);
    setNewPostContent("");
    
    toast({
      title: "Success!",
      description: "Your post has been published",
    });
  };

  const handleJoinCommunity = () => {
    navigate("/login");
  };

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
              <ImageIcon className="h-8 w-8 text-booyah-neon-blue" />
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

        <div className="neon-card p-6 mb-8">
          <h3 className="text-lg font-bold mb-4">Create a Post</h3>
          <div className="flex gap-4 mb-4">
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <img 
                src="https://randomuser.me/api/portraits/men/85.jpg"
                alt="Your avatar"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <Input
                placeholder="What's on your mind?"
                className="mb-4"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              />
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <ImageIcon className="h-4 w-4" />
                    <span className="hidden sm:inline">Image</span>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">Category</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </div>
                <Button variant="fire" onClick={handleCreatePost} className="gap-1">
                  <Send className="h-4 w-4" />
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <div className="flex border-b border-border mb-6">
            <Button 
              variant="ghost" 
              className={`pb-2 rounded-none border-b-2 ${activeTab === "latest" ? "border-booyah-neon-blue" : "border-transparent"}`}
              onClick={() => setActiveTab("latest")}
            >
              Latest Posts
            </Button>
            <Button 
              variant="ghost" 
              className={`pb-2 rounded-none border-b-2 ${activeTab === "categories" ? "border-booyah-neon-blue" : "border-transparent"}`}
              onClick={() => setActiveTab("categories")}
            >
              Categories
            </Button>
          </div>
          
          {activeTab === "latest" ? (
            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className={`neon-card p-5 ${post.pinned ? "border-booyah-fire" : ""}`}>
                  {post.pinned && (
                    <div className="mb-3">
                      <Badge variant="fire" className="animate-pulse">Pinned</Badge>
                    </div>
                  )}
                  
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src={post.authorImage} 
                        alt={post.author} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{post.author}</span>
                            {post.authorRank && (
                              <Badge variant="outline" className="text-xs py-0">{post.authorRank}</Badge>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center gap-2">
                            <span>{post.time}</span>
                            {post.category && (
                              <>
                                <span>•</span>
                                <Badge variant="outline" className="text-xs py-0">{post.category}</Badge>
                              </>
                            )}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-booyah-neon-blue">
                          <UserPlus className="h-4 w-4" />
                          <span className="sr-only">Follow</span>
                        </Button>
                      </div>
                      
                      {post.title && (
                        <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                      )}
                      
                      <div className="space-y-3">
                        <p className="whitespace-pre-line">{post.content}</p>
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
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={`flex items-center gap-1 ${post.liked ? "text-booyah-fire" : ""}`}
                          onClick={() => handleLike(post.id)}
                        >
                          <Heart className={`h-4 w-4 ${post.liked ? "fill-booyah-fire" : ""}`} />
                          <span>{post.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{post.comments}</span>
                        </Button>
                        {post.views !== undefined && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Eye className="h-3 w-3" />
                            <span>{post.views} views</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-center mt-8">
                <Button variant="outline">Load More Posts</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {categories.map((category) => (
                <div key={category.id} className="neon-card overflow-hidden">
                  <div className="flex items-center p-4 sm:p-6 gap-4">
                    <div className="h-12 w-12 rounded-full bg-booyah-purple/20 flex items-center justify-center flex-shrink-0">
                      {category.icon}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{category.description}</p>
                    </div>
                    
                    <div className="hidden md:grid grid-cols-3 gap-6 text-center">
                      <div>
                        <div className="font-semibold">{category.threads}</div>
                        <div className="text-xs text-muted-foreground">Threads</div>
                      </div>
                      <div>
                        <div className="font-semibold">{category.posts}</div>
                        <div className="text-xs text-muted-foreground">Posts</div>
                      </div>
                      <div>
                        <div className="text-xs text-booyah-neon-blue">{category.lastPost}</div>
                        <div className="text-xs text-muted-foreground">Last Post</div>
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="flex-shrink-0">
                      <PenSquare className="h-4 w-4" />
                      <span className="sr-only md:not-sr-only md:ml-2">New Thread</span>
                    </Button>
                  </div>
                  
                  <div className="bg-card/80 border-t border-border p-3 flex justify-between items-center">
                    <div className="text-xs text-muted-foreground">
                      {category.posts} posts in {category.threads} threads
                    </div>
                    <Button variant="outline" size="sm" className="text-xs">
                      View All
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center glass-effect p-6 rounded-lg">
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold mb-2">Join Our Community</h3>
            <p className="text-muted-foreground">
              Connect with thousands of players, join discussions, and find your next squad
            </p>
          </div>
          <Button 
            variant="booyah" 
            className="whitespace-nowrap"
            onClick={handleJoinCommunity}
          >
            Create Account
          </Button>
        </div>
      </div>
    </section>
  );
}
