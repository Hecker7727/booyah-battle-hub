
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
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle 
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

// Schema for creating a new squad request
const createSquadSchema = z.object({
  gameMode: z.enum(["Battle Royale", "Clash Squad"], {
    required_error: "Please select a game mode",
  }),
  playStyle: z.enum(["Rusher", "Sniper", "Tactical", "Balanced"], {
    required_error: "Please select a playstyle",
  }),
  region: z.enum(["Asia", "North America", "Europe", "Global"], {
    required_error: "Please select a region",
  }),
  schedule: z.enum(["Morning", "Afternoon", "Evening", "Night", "Weekend", "Flexible"], {
    required_error: "Please select a schedule",
  }),
  needed: z.string().transform(val => parseInt(val, 10)),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

// Schema for joining a squad
const joinSquadSchema = z.object({
  playstyle: z.enum(["Rusher", "Sniper", "Tactical", "Balanced"], {
    required_error: "Please select your playstyle",
  }),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

type CreateSquadFormValues = z.infer<typeof createSquadSchema>;
type JoinSquadFormValues = z.infer<typeof joinSquadSchema>;

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
  const [createSquadOpen, setCreateSquadOpen] = useState(false);
  const [joinSquadOpen, setJoinSquadOpen] = useState(false);
  const [currentSquad, setCurrentSquad] = useState<Squad | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  const toggleFilters = () => {
    setFilterExpanded(!filterExpanded);
  };

  const handleJoinSquad = (squadId: string) => {
    const squad = squads.find(s => s.id === squadId);
    
    if (!isLoggedIn) {
      toast({
        title: "Login required",
        description: "You need to login to join a squad",
        variant: "destructive"
      });
      navigate("/login");
      return;
    }
    
    if (squad) {
      setCurrentSquad(squad);
      setJoinSquadOpen(true);
    }
  };

  const submitJoinRequest = (values: JoinSquadFormValues) => {
    if (!currentSquad) return;
    
    // Update the squad with the new user
    setSquads(prevSquads => 
      prevSquads.map(squad => 
        squad.id === currentSquad.id 
          ? { 
              ...squad, 
              joined: [...squad.joined, "CurrentUser"],
            } 
          : squad
      )
    );
    
    toast({
      title: "Request sent!",
      description: `You've requested to join ${currentSquad.username}'s squad as a ${values.playstyle}`,
    });
    
    setJoinSquadOpen(false);
  };

  const handleCreateSquad = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login required",
        description: "You need to login to create a squad request",
        variant: "destructive"
      });
      navigate("/login");
      return;
    }
    
    setCreateSquadOpen(true);
  };

  const submitCreateSquad = (values: CreateSquadFormValues) => {
    // Create a new squad
    const newSquad: Squad = {
      id: `${squads.length + 1}`,
      username: "CurrentUser",
      avatar: "https://randomuser.me/api/portraits/men/66.jpg",
      rank: "Diamond", // In a real app, this would come from the user's profile
      platform: "Mobile", // Same here
      gameMode: values.gameMode,
      playStyle: values.playStyle,
      region: values.region,
      schedule: values.schedule,
      needed: values.needed,
      joined: [],
      description: values.description,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setSquads(prev => [newSquad, ...prev]);
    
    toast({
      title: "Squad request created!",
      description: "Your squad request has been posted. Players can now join your squad.",
    });
    
    setCreateSquadOpen(false);
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

  // Form for creating a squad
  const createSquadForm = useForm<CreateSquadFormValues>({
    resolver: zodResolver(createSquadSchema),
    defaultValues: {
      gameMode: "Battle Royale",
      playStyle: "Balanced",
      region: "Global",
      schedule: "Flexible",
      needed: "3",
      description: "",
    },
  });

  // Form for joining a squad
  const joinSquadForm = useForm<JoinSquadFormValues>({
    resolver: zodResolver(joinSquadSchema),
    defaultValues: {
      playstyle: "Balanced",
      message: "",
    },
  });

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
              onClick={handleCreateSquad}
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

      {/* Create Squad Dialog */}
      <Dialog open={createSquadOpen} onOpenChange={setCreateSquadOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create Squad Request</DialogTitle>
            <DialogDescription>
              Fill out the details below to create a new squad request. Players who match your criteria will be able to request to join.
            </DialogDescription>
          </DialogHeader>

          <Form {...createSquadForm}>
            <form onSubmit={createSquadForm.handleSubmit(submitCreateSquad)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={createSquadForm.control}
                  name="gameMode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Game Mode</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Battle Royale" id="br" />
                            <Label htmlFor="br">Battle Royale</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Clash Squad" id="cs" />
                            <Label htmlFor="cs">Clash Squad</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={createSquadForm.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Region</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Asia" id="asia" />
                            <Label htmlFor="asia">Asia</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="North America" id="na" />
                            <Label htmlFor="na">North America</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Europe" id="eu" />
                            <Label htmlFor="eu">Europe</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Global" id="global" />
                            <Label htmlFor="global">Global</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={createSquadForm.control}
                  name="playStyle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Playstyle</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Rusher" id="rusher" />
                            <Label htmlFor="rusher">Rusher</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Sniper" id="sniper" />
                            <Label htmlFor="sniper">Sniper</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Tactical" id="tactical" />
                            <Label htmlFor="tactical">Tactical</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Balanced" id="balanced" />
                            <Label htmlFor="balanced">Balanced</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={createSquadForm.control}
                  name="schedule"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Playing Schedule</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Morning" id="morning" />
                            <Label htmlFor="morning">Morning</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Afternoon" id="afternoon" />
                            <Label htmlFor="afternoon">Afternoon</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Evening" id="evening" />
                            <Label htmlFor="evening">Evening</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Night" id="night" />
                            <Label htmlFor="night">Night</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Weekend" id="weekend" />
                            <Label htmlFor="weekend">Weekend</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Flexible" id="flexible" />
                            <Label htmlFor="flexible">Flexible</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={createSquadForm.control}
                name="needed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Players Needed</FormLabel>
                    <FormControl>
                      <RadioGroup 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1" id="one" />
                          <Label htmlFor="one">1</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="2" id="two" />
                          <Label htmlFor="two">2</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="3" id="three" />
                          <Label htmlFor="three">3</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={createSquadForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Squad Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell others about your squad goals, playstyle preferences, and any requirements..."
                        className="resize-none h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Be specific about what you're looking for in teammates.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setCreateSquadOpen(false)}>Cancel</Button>
                <Button type="submit" variant="fire">Create Squad</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Join Squad Dialog */}
      <Dialog open={joinSquadOpen} onOpenChange={setJoinSquadOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Join {currentSquad?.username}'s Squad</DialogTitle>
            <DialogDescription>
              Send a request to join this squad. The squad leader will review your application.
            </DialogDescription>
          </DialogHeader>

          <Form {...joinSquadForm}>
            <form onSubmit={joinSquadForm.handleSubmit(submitJoinRequest)} className="space-y-4">
              <FormField
                control={joinSquadForm.control}
                name="playstyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Playstyle</FormLabel>
                    <FormControl>
                      <RadioGroup 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        className="flex flex-wrap gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Rusher" id="join-rusher" />
                          <Label htmlFor="join-rusher">Rusher</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Sniper" id="join-sniper" />
                          <Label htmlFor="join-sniper">Sniper</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Tactical" id="join-tactical" />
                          <Label htmlFor="join-tactical">Tactical</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Balanced" id="join-balanced" />
                          <Label htmlFor="join-balanced">Balanced</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={joinSquadForm.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message to Squad Leader</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell the squad leader about your experience and why you want to join..."
                        className="resize-none h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A personal message increases your chances of being accepted.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setJoinSquadOpen(false)}>Cancel</Button>
                <Button type="submit" variant="fire">Send Request</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
