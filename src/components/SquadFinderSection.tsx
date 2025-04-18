import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SelectValue, SelectTrigger, SelectContent, SelectItem, SelectGroup, Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  UserPlus, Search, Users, Crosshair, Gamepad, Trophy, Map, Headphones, 
  Flame, Zap, Target, Skull
} from "lucide-react";

export interface Player {
  id: string;
  username: string;
  level: number;
  rank: string;
  kd: number;
  winRate: number;
  platform: string;
  region: string;
  languages: string[];
  playstyle: string;
  lookingFor: string;
  lastActive: string;
  mic: boolean;
  avatar?: string;
}

const samplePlayers: Player[] = [
  {
    id: "p1",
    username: "EliteSniper420",
    level: 78,
    rank: "Diamond",
    kd: 3.2,
    winRate: 28,
    platform: "PC",
    region: "NA-East",
    languages: ["English", "Spanish"],
    playstyle: "Aggressive",
    lookingFor: "Competitive",
    lastActive: "2 minutes ago",
    mic: true,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: "p2",
    username: "StealthWolf99",
    level: 63,
    rank: "Platinum",
    kd: 2.4,
    winRate: 20,
    platform: "PC",
    region: "EU",
    languages: ["English", "German"],
    playstyle: "Tactical",
    lookingFor: "Casual",
    lastActive: "10 minutes ago",
    mic: true,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: "p3",
    username: "QuickScope_King",
    level: 92,
    rank: "Heroic",
    kd: 4.1,
    winRate: 35,
    platform: "Mobile",
    region: "Asia",
    languages: ["English", "Hindi"],
    playstyle: "Aggressive",
    lookingFor: "Ranked Push",
    lastActive: "Just now",
    mic: true,
    avatar: "https://randomuser.me/api/portraits/men/28.jpg"
  },
  {
    id: "p4",
    username: "ShadowHunter",
    level: 56,
    rank: "Gold",
    kd: 1.8,
    winRate: 15,
    platform: "Mobile",
    region: "NA-West",
    languages: ["English"],
    playstyle: "Passive",
    lookingFor: "Casual",
    lastActive: "1 hour ago",
    mic: false,
    avatar: "https://randomuser.me/api/portraits/women/22.jpg"
  },
  {
    id: "p5",
    username: "FireStorm_45",
    level: 84,
    rank: "Diamond",
    kd: 2.9,
    winRate: 25,
    platform: "PC",
    region: "South America",
    languages: ["Portuguese", "Spanish"],
    playstyle: "Strategic",
    lookingFor: "Tournament",
    lastActive: "30 minutes ago",
    mic: true,
    avatar: "https://randomuser.me/api/portraits/men/42.jpg"
  }
];

export function SquadFinderSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState<string>("");
  const [platformFilter, setPlatformFilter] = useState<string>("");
  const [players, setPlayers] = useState<Player[]>(samplePlayers);
  const { toast } = useToast();

  // Filter players based on search and filters
  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.username.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = regionFilter ? player.region === regionFilter : true;
    const matchesPlatform = platformFilter ? player.platform === platformFilter : true;
    return matchesSearch && matchesRegion && matchesPlatform;
  });

  const handleAddFriend = (playerId: string) => {
    toast({
      title: "Friend Request Sent",
      description: "Your friend request has been sent successfully.",
    });
  };

  const handleInvite = (playerId: string) => {
    toast({
      title: "Invitation Sent",
      description: "Your squad invitation has been sent successfully.",
    });
  };

  const renderPlayerStats = (player: Player) => (
    <div className="flex flex-wrap gap-2 text-xs">
      <div className="flex items-center gap-1 bg-muted/30 px-2 py-1 rounded-full">
        <Trophy className="h-3 w-3 text-booyah-neon-blue" />
        <span>Lv. {player.level}</span>
      </div>
      <div className="flex items-center gap-1 bg-muted/30 px-2 py-1 rounded-full">
        <Crosshair className="h-3 w-3 text-accent" />
        <span>K/D: {player.kd}</span>
      </div>
      <div className="flex items-center gap-1 bg-muted/30 px-2 py-1 rounded-full">
        <Flame className="h-3 w-3 text-booyah-fire" />
        <span>Win: {player.winRate}%</span>
      </div>
    </div>
  );

  return (
    <div className="container py-12 max-w-7xl mx-auto">
      <div className="space-y-6">
        <div className="fps-card p-6">
          <h1 className="fps-header mb-6 flex items-center gap-2">
            <Users className="h-6 w-6 text-booyah-purple" />
            SQUAD FINDER
          </h1>
          <p className="text-muted-foreground mb-6">
            Find teammates for your next match. Filter by region, skill level, and play style to build the perfect squad.
          </p>

          <Tabs defaultValue="find" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="find" className="data-[state=active]:fps-button">
                <Search className="mr-2 h-4 w-4" />
                Find Players
              </TabsTrigger>
              <TabsTrigger value="create" className="data-[state=active]:fps-button">
                <UserPlus className="mr-2 h-4 w-4" />
                Create Listing
              </TabsTrigger>
            </TabsList>

            <TabsContent value="find" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search by username..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="fps-input pl-10"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Select value={regionFilter} onValueChange={setRegionFilter}>
                    <SelectTrigger className="fps-input">
                      <SelectValue placeholder="Region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all-regions">All Regions</SelectItem>
                        <SelectItem value="NA-East">NA-East</SelectItem>
                        <SelectItem value="NA-West">NA-West</SelectItem>
                        <SelectItem value="EU">Europe</SelectItem>
                        <SelectItem value="Asia">Asia</SelectItem>
                        <SelectItem value="South America">South America</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Select value={platformFilter} onValueChange={setPlatformFilter}>
                    <SelectTrigger className="fps-input">
                      <SelectValue placeholder="Platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all-platforms">All Platforms</SelectItem>
                        <SelectItem value="PC">PC</SelectItem>
                        <SelectItem value="Mobile">Mobile</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPlayers.length > 0 ? (
                  filteredPlayers.map((player) => (
                    <Card key={player.id} className="fps-card overflow-hidden border-booyah-purple/20">
                      <CardHeader className="space-y-1 pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="w-10 h-10 rounded-full bg-muted overflow-hidden border border-booyah-purple/50">
                                {player.avatar ? (
                                  <img 
                                    src={player.avatar} 
                                    alt={player.username}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-lg font-bold">
                                    {player.username.charAt(0)}
                                  </div>
                                )}
                              </div>
                              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border border-background ${player.lastActive === "Just now" ? "bg-green-500" : "bg-orange-500"}`}></div>
                            </div>
                            <div className="space-y-1">
                              <CardTitle className="text-sm md:text-base leading-none">
                                {player.username}
                              </CardTitle>
                              <CardDescription className="text-xs flex items-center gap-1">
                                <div className={`h-2 w-2 rounded-full ${player.lastActive === "Just now" ? "bg-green-500" : "bg-orange-500"}`}></div>
                                {player.lastActive}
                              </CardDescription>
                            </div>
                          </div>
                          <div className="px-1.5 py-0.5 text-xs rounded bg-primary/20 text-primary font-medium tracking-wide">
                            {player.rank}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2 space-y-2">
                        {renderPlayerStats(player)}

                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-xs">
                          <div className="flex items-center gap-1">
                            <Map className="h-3 w-3 text-muted-foreground" />
                            <span>{player.region}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Gamepad className="h-3 w-3 text-muted-foreground" />
                            <span>{player.platform}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Zap className="h-3 w-3 text-muted-foreground" />
                            <span>{player.playstyle}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Headphones className="h-3 w-3 text-muted-foreground" />
                            <span>{player.mic ? "Has Mic" : "No Mic"}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0 flex gap-2">
                        <Button 
                          onClick={() => handleInvite(player.id)}
                          className="fps-button w-full text-xs py-1 h-8"
                        >
                          <Users className="mr-1 h-3 w-3" />
                          Invite
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => handleAddFriend(player.id)}
                          className="w-full text-xs py-1 h-8 border-booyah-purple/30 hover:bg-booyah-purple/10"
                        >
                          <UserPlus className="mr-1 h-3 w-3" />
                          Add Friend
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <div className="bg-muted/20 rounded-lg p-8 flex flex-col items-center">
                      <Skull className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Players Found</h3>
                      <p className="text-muted-foreground">Try adjusting your filters or search criteria.</p>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="create" className="space-y-6">
              <div className="fps-card p-6">
                <h2 className="text-xl font-bold mb-4">Create Your Player Profile</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" placeholder="Your in-game name" className="fps-input" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="rank">Current Rank</Label>
                      <Select>
                        <SelectTrigger className="fps-input">
                          <SelectValue placeholder="Select your rank" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bronze">Bronze</SelectItem>
                          <SelectItem value="silver">Silver</SelectItem>
                          <SelectItem value="gold">Gold</SelectItem>
                          <SelectItem value="platinum">Platinum</SelectItem>
                          <SelectItem value="diamond">Diamond</SelectItem>
                          <SelectItem value="heroic">Heroic</SelectItem>
                          <SelectItem value="grandmaster">Grandmaster</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="platform">Platform</Label>
                      <Select>
                        <SelectTrigger className="fps-input">
                          <SelectValue placeholder="Select your platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pc">PC</SelectItem>
                          <SelectItem value="mobile">Mobile</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="region">Region</Label>
                      <Select>
                        <SelectTrigger className="fps-input">
                          <SelectValue placeholder="Select your region" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="na-east">NA-East</SelectItem>
                          <SelectItem value="na-west">NA-West</SelectItem>
                          <SelectItem value="eu">Europe</SelectItem>
                          <SelectItem value="asia">Asia</SelectItem>
                          <SelectItem value="sa">South America</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="playstyle">Playstyle</Label>
                      <Select>
                        <SelectTrigger className="fps-input">
                          <SelectValue placeholder="Select your playstyle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aggressive">Aggressive</SelectItem>
                          <SelectItem value="passive">Passive</SelectItem>
                          <SelectItem value="tactical">Tactical</SelectItem>
                          <SelectItem value="support">Support</SelectItem>
                          <SelectItem value="sniper">Sniper</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lookingFor">Looking For</Label>
                      <Select>
                        <SelectTrigger className="fps-input">
                          <SelectValue placeholder="What are you looking for?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="casual">Casual Gameplay</SelectItem>
                          <SelectItem value="ranked">Ranked Push</SelectItem>
                          <SelectItem value="competitive">Competitive Team</SelectItem>
                          <SelectItem value="tournament">Tournament Partners</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <Button className="fps-button w-full mt-6">
                  <Target className="mr-2 h-4 w-4" />
                  Create Player Listing
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
