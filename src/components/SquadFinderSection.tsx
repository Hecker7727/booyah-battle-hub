import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  UsersRound, 
  Filter, 
  Globe, 
  Clock, 
  Trophy, 
  Search, 
  ChevronDown,
  PlusCircle,
  Calendar,
  AlignLeft,
  Gamepad2,
  Headphones,
  Settings
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

type Squad = {
  id: string;
  username: string;
  avatar: string;
  rank: string;
  platform: string;
  gameMode: string;
  playStyle: string;
  region: string;
  schedule: string;
  needed: number;
  joined: string[];
  description: string;
  createdAt: string;
};

const SAMPLE_SQUADS: Squad[] = [
  {
    id: "1",
    username: "NinjaSlayer42",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    rank: "Heroic",
    platform: "Mobile",
    gameMode: "Battle Royale",
    playStyle: "Rusher",
    region: "Asia",
    schedule: "Evening",
    needed: 3,
    joined: ["Player1", "Player2"],
    description: "Looking for aggressive players for Rank push to Grandmaster. Must have mic and good game sense.",
    createdAt: "2025-04-15"
  },
  {
    id: "2",
    username: "ShadowGamer",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rank: "Diamond",
    platform: "Mobile",
    gameMode: "Clash Squad",
    playStyle: "Balanced",
    region: "North America",
    schedule: "Weekend",
    needed: 2,
    joined: ["Player3"],
    description: "Casual players welcome. Looking to have fun and improve together. Voice chat preferred.",
    createdAt: "2025-04-16"
  },
  {
    id: "3",
    username: "ProSniper",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rank: "Grandmaster",
    platform: "PC Emulator",
    gameMode: "Battle Royale",
    playStyle: "Sniper",
    region: "Europe",
    schedule: "Night",
    needed: 3,
    joined: [],
    description: "Competitive squad for tournament practice. Serious players only. Looking for 1 rusher, 1 support and 1 flanker.",
    createdAt: "2025-04-14"
  },
  {
    id: "4",
    username: "TacticalQueen",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    rank: "Platinum",
    platform: "Mobile",
    gameMode: "Battle Royale",
    playStyle: "Tactical",
    region: "Global",
    schedule: "Flexible",
    needed: 2,
    joined: ["Player4", "Player5"],
    description: "Looking for team players who communicate well. Focus on position and strategy over kills.",
    createdAt: "2025-04-15"
  },
];

export function SquadFinderSection() {
  const [squads, setSquads] = useState<Squad[]>(SAMPLE_SQUADS);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterExpanded, setFilterExpanded] = useState(false);
  const [filters, setFilters] = useState({
    gameMode: "all",
    region: "all",
    playstyle: "all",
    rank: "all"
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const toggleFilters = () => {
    setFilterExpanded(!filterExpanded);
  };

  const handleJoinSquad = (squadId: string) => {
    setSquads(prevSquads => 
      prevSquads.map(squad => 
        squad.id === squadId 
          ? { 
              ...squad, 
              joined: [...squad.joined, "CurrentUser"],
            } 
          : squad
      )
    );
    
    toast({
      title: "Request sent!",
      description: "The squad leader will review your request.",
    });
  };

  const handleCreateProfile = () => {
    navigate("/login");
  };

  const filteredSquads = squads.filter(squad => {
    const matchesSearch = 
      squad.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      squad.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      squad.region.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesFilters = 
      (filters.gameMode === "all" || squad.gameMode === filters.gameMode) &&
      (filters.region === "all" || squad.region === filters.region) &&
      (filters.playstyle === "all" || squad.playStyle === filters.playstyle) &&
      (filters.rank === "all" || squad.rank === filters.rank);
      
    return matchesSearch && matchesFilters;
  });

  const setFilter = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-booyah-purple-dark/10 to-transparent"></div>
      
      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <Badge variant="neon" className="mb-4">Squad Finder</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Find Your Perfect <span className="text-booyah-neon-blue">Squad</span>
          </h2>
          <p className="text-muted-foreground max-w-[600px]">
            Match with players that fit your playstyle, rank and schedule. Form the ultimate squad and dominate the battlefield together.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <div className="neon-card p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-booyah-purple/20 flex items-center justify-center mb-4">
              <UsersRound className="h-6 w-6 text-booyah-neon-blue" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Player Roles</h3>
            <p className="text-sm text-muted-foreground">
              Rusher, Sniper, Support or Balanced - find players that complement your style
            </p>
          </div>

          <div className="neon-card p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-booyah-purple/20 flex items-center justify-center mb-4">
              <Filter className="h-6 w-6 text-booyah-neon-blue" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Rank Matching</h3>
            <p className="text-sm text-muted-foreground">
              From Bronze to Heroic - play with others at your level or challenge yourself
            </p>
          </div>

          <div className="neon-card p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-booyah-purple/20 flex items-center justify-center mb-4">
              <Globe className="h-6 w-6 text-booyah-neon-blue" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Region Selection</h3>
            <p className="text-sm text-muted-foreground">
              Find players in your region for better ping and communication
            </p>
          </div>

          <div className="neon-card p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-booyah-purple/20 flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-booyah-neon-blue" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Playtime Sync</h3>
            <p className="text-sm text-muted-foreground">
              Match with players who play during the same hours as you
            </p>
          </div>
        </div>

        <div className="glass-effect p-6 rounded-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search by username, description or region..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              className="md:w-auto w-full flex items-center gap-2"
              onClick={toggleFilters}
            >
              <Filter className="h-4 w-4" />
              Filters
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button 
              variant="fire" 
              className="md:w-auto w-full flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              Create Squad Request
            </Button>
          </div>
          
          {filterExpanded && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-black/30 rounded-lg">
              <div>
                <h4 className="text-sm font-medium mb-2">Game Mode</h4>
                <div className="flex gap-2 flex-wrap">
                  <Badge 
                    variant={filters.gameMode === "all" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFilter("gameMode", "all")}
                  >All</Badge>
                  <Badge 
                    variant={filters.gameMode === "Battle Royale" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFilter("gameMode", "Battle Royale")}
                  >Battle Royale</Badge>
                  <Badge 
                    variant={filters.gameMode === "Clash Squad" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFilter("gameMode", "Clash Squad")}
                  >Clash Squad</Badge>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Region</h4>
                <div className="flex gap-2 flex-wrap">
                  <Badge 
                    variant={filters.region === "all" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFilter("region", "all")}
                  >All</Badge>
                  <Badge 
                    variant={filters.region === "Asia" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFilter("region", "Asia")}
                  >Asia</Badge>
                  <Badge 
                    variant={filters.region === "North America" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFilter("region", "North America")}
                  >North America</Badge>
                  <Badge 
                    variant={filters.region === "Europe" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFilter("region", "Europe")}
                  >Europe</Badge>
                  <Badge 
                    variant={filters.region === "Global" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFilter("region", "Global")}
                  >Global</Badge>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Playstyle</h4>
                <div className="flex gap-2 flex-wrap">
                  <Badge 
                    variant={filters.playstyle === "all" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFilter("playstyle", "all")}
                  >All</Badge>
                  <Badge 
                    variant={filters.playstyle === "Rusher" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFilter("playstyle", "Rusher")}
                  >Rusher</Badge>
                  <Badge 
                    variant={filters.playstyle === "Sniper" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFilter("playstyle", "Sniper")}
                  >Sniper</Badge>
                  <Badge 
                    variant={filters.playstyle === "Tactical" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFilter("playstyle", "Tactical")}
                  >Tactical</Badge>
                  <Badge 
                    variant={filters.playstyle === "Balanced" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFilter("playstyle", "Balanced")}
                  >Balanced</Badge>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Rank</h4>
                <div className="flex gap-2 flex-wrap">
                  <Badge 
                    variant={filters.rank === "all" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFilter("rank", "all")}
                  >All</Badge>
                  <Badge 
                    variant={filters.rank === "Bronze" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFilter("rank", "Bronze")}
                  >Bronze</Badge>
                  <Badge 
                    variant={filters.rank === "Silver" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFilter("rank", "Silver")}
                  >Silver</Badge>
                  <Badge 
                    variant={filters.rank === "Gold" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFilter("rank", "Gold")}
                  >Gold</Badge>
                  <Badge 
                    variant={filters.rank === "Platinum" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFilter("rank", "Platinum")}
                  >Platinum</Badge>
                  <Badge 
                    variant={filters.rank === "Diamond" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFilter("rank", "Diamond")}
                  >Diamond</Badge>
                  <Badge 
                    variant={filters.rank === "Heroic" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFilter("rank", "Heroic")}
                  >Heroic</Badge>
                  <Badge 
                    variant={filters.rank === "Grandmaster" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFilter("rank", "Grandmaster")}
                  >Grandmaster</Badge>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6 mb-12">
          <h3 className="text-2xl font-bold">Available Squad Requests</h3>
          
          {filteredSquads.length === 0 ? (
            <div className="neon-card p-6 text-center">
              <p className="text-muted-foreground">No squad requests match your filters. Try adjusting your search or create your own squad request!</p>
            </div>
          ) : (
            filteredSquads.map((squad) => (
              <div key={squad.id} className="neon-card p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/4 flex flex-col items-center text-center">
                    <div className="h-20 w-20 rounded-full border-2 border-booyah-neon-blue overflow-hidden mb-2">
                      <img 
                        src={squad.avatar} 
                        alt={squad.username} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h4 className="font-semibold text-lg mb-1">{squad.username}</h4>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="fire">{squad.rank}</Badge>
                      <Badge variant="outline">{squad.platform}</Badge>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                      <div className="flex items-center text-xs">
                        <Gamepad2 className="h-3 w-3 mr-1 text-booyah-neon-blue" />
                        {squad.gameMode}
                      </div>
                      <div className="flex items-center text-xs">
                        <Globe className="h-3 w-3 mr-1 text-booyah-neon-blue" />
                        {squad.region}
                      </div>
                      <div className="flex items-center text-xs">
                        <Clock className="h-3 w-3 mr-1 text-booyah-neon-blue" />
                        {squad.schedule}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold flex items-center gap-2">
                        <AlignLeft className="h-4 w-4 text-booyah-neon-blue" />
                        Request Details
                      </h3>
                      <div className="text-xs text-muted-foreground">Posted on {squad.createdAt}</div>
                    </div>
                    
                    <p className="text-sm mb-4">{squad.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                        <UsersRound className="h-4 w-4 text-booyah-neon-blue" />
                        Looking for {squad.needed} players • {squad.playStyle} playstyle
                      </h4>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {squad.joined.map((player, index) => (
                          <Badge key={index} variant="outline" className="flex items-center gap-1">
                            <div className="h-4 w-4 rounded-full bg-booyah-purple/50"></div>
                            {player}
                          </Badge>
                        ))}
                        
                        {Array.from({ length: squad.needed }).map((_, index) => (
                          <Badge key={`empty-${index}`} variant="outline" className="bg-black/30 border-dashed">
                            Available Slot
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      <Button 
                        variant="neon" 
                        className="flex items-center gap-2"
                        onClick={() => handleJoinSquad(squad.id)}
                      >
                        <UsersRound className="h-4 w-4" />
                        Join Squad
                      </Button>
                      <Button variant="outline" size="icon">
                        <Headphones className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="glass-effect p-6 rounded-lg">
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
            <div className="h-16 w-16 rounded-full bg-booyah-purple/20 flex items-center justify-center">
              <Trophy className="h-8 w-8 text-booyah-fire" />
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-bold mb-2">Ready to Play in a Squad?</h3>
              <p className="text-muted-foreground">
                Create your profile, set your preferences, and find the perfect teammates for your next Booyah!
              </p>
            </div>
            
            <Button 
              variant="fire" 
              className="w-full sm:w-auto"
              onClick={handleCreateProfile}
            >
              Create Your Profile
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
