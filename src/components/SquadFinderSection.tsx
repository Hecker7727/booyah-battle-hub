
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  MapPin, 
  Flame, 
  Shield,
  Clock,
  Plus,
  User,
  Gamepad2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type GameMode = "Battle Royale" | "Clash Squad";
type Region = "Global" | "Asia" | "Europe" | "North America" | "South America";
type PlayStyle = "Aggressive" | "Balanced" | "Defensive" | "Rusher" | "Sniper";
type SquadType = "Solo" | "Duo" | "Squad";
type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Pro";

interface Member {
  id: string;
  name: string;
  avatar?: string;
}

interface SquadRequest {
  id: number;
  playerId: string;
  playerName: string;
  gameMode: GameMode;
  region: Region;
  playStyle: PlayStyle;
  squadType: SquadType;
  skillLevel: SkillLevel;
  description: string;
  spotsFilled: number;
  spotsTotal: number;
  createdAt: string;
  members: Member[];
}

// Form schema for creating a squad request
const squadRequestSchema = z.object({
  gameMode: z.enum(["Battle Royale", "Clash Squad"], {
    required_error: "Please select a game mode",
  }),
  region: z.enum(["Global", "Asia", "Europe", "North America", "South America"], {
    required_error: "Please select a region",
  }),
  playStyle: z.enum(["Aggressive", "Balanced", "Defensive", "Rusher", "Sniper"], {
    required_error: "Please select a play style",
  }),
  squadType: z.enum(["Solo", "Duo", "Squad"], {
    required_error: "Please select a squad type",
  }),
  skillLevel: z.enum(["Beginner", "Intermediate", "Advanced", "Pro"], {
    required_error: "Please select your skill level",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

const SAMPLE_SQUAD_REQUESTS: SquadRequest[] = [
  {
    id: 1,
    playerId: "player123",
    playerName: "FireStorm",
    gameMode: "Battle Royale",
    region: "Asia",
    playStyle: "Aggressive",
    squadType: "Squad",
    skillLevel: "Advanced",
    description: "Looking for experienced players for Heroic push. Must have mic and good communication skills.",
    spotsFilled: 2,
    spotsTotal: 4,
    createdAt: "2025-04-14T10:30:00Z",
    members: [
      { id: "player123", name: "FireStorm" },
      { id: "player456", name: "ShadowKnight" },
    ],
  },
  {
    id: 2,
    playerId: "player789",
    playerName: "HeadshotQueen",
    gameMode: "Battle Royale",
    region: "Europe",
    playStyle: "Balanced",
    squadType: "Squad",
    skillLevel: "Intermediate",
    description: "Casual squad for weekend games. All skill levels welcome, just be friendly!",
    spotsFilled: 1,
    spotsTotal: 4,
    createdAt: "2025-04-15T14:20:00Z",
    members: [
      { id: "player789", name: "HeadshotQueen" },
    ],
  },
  {
    id: 3,
    playerId: "player101",
    playerName: "BooyahKing",
    gameMode: "Battle Royale",
    region: "Global",
    playStyle: "Aggressive",
    squadType: "Duo",
    skillLevel: "Pro",
    description: "Pro player looking for another skilled player for tournament practice. Must be Heroic rank or above.",
    spotsFilled: 1,
    spotsTotal: 2,
    createdAt: "2025-04-16T09:15:00Z",
    members: [
      { id: "player101", name: "BooyahKing" },
    ],
  },
  {
    id: 4,
    playerId: "player202",
    playerName: "SniperElite",
    gameMode: "Clash Squad",
    region: "North America",
    playStyle: "Sniper",
    squadType: "Squad",
    skillLevel: "Advanced",
    description: "Clash Squad team looking for 2 more. Need at least one rusher and one support player.",
    spotsFilled: 2,
    spotsTotal: 4,
    createdAt: "2025-04-15T20:45:00Z",
    members: [
      { id: "player202", name: "SniperElite" },
      { id: "player303", name: "FlankMaster" },
    ],
  },
  {
    id: 5,
    playerId: "player404",
    playerName: "LoneWolf",
    gameMode: "Clash Squad",
    region: "South America",
    playStyle: "Defensive",
    squadType: "Solo",
    skillLevel: "Beginner",
    description: "New player looking to join a Clash Squad team. Can play any role, just want to learn and improve.",
    spotsFilled: 1,
    spotsTotal: 2,
    createdAt: "2025-04-16T12:30:00Z",
    members: [
      { id: "player404", name: "LoneWolf" },
    ],
  },
];

export function SquadFinderSection() {
  const [squadRequests, setSquadRequests] = useState<SquadRequest[]>(SAMPLE_SQUAD_REQUESTS);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    gameMode: "all",
    region: "all",
    playStyle: "all",
    squadType: "all",
    skillLevel: "all",
  });
  const [isCreatingRequest, setIsCreatingRequest] = useState(false);
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<SquadRequest | null>(null);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Check if user is logged in
  const isLoggedIn = false; // Replace with actual auth logic in production

  const form = useForm<z.infer<typeof squadRequestSchema>>({
    resolver: zodResolver(squadRequestSchema),
    defaultValues: {
      gameMode: "Battle Royale",
      region: "Global",
      playStyle: "Balanced",
      squadType: "Squad",
      skillLevel: "Intermediate",
      description: "",
    },
  });

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const setFilter = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleCreateSquadRequest = (values: z.infer<typeof squadRequestSchema>) => {
    if (!isLoggedIn) {
      navigate("/login");
      toast({
        title: "Login required",
        description: "Please login to create a squad request",
      });
      return;
    }
    
    console.log("Creating squad request:", values);
    
    // In a real app, this would be sent to a backend
    const newRequest: SquadRequest = {
      id: Date.now(),
      playerId: "currentUser123",
      playerName: "CurrentUser",
      gameMode: values.gameMode,
      region: values.region,
      playStyle: values.playStyle,
      squadType: values.squadType,
      skillLevel: values.skillLevel,
      description: values.description,
      spotsFilled: 1,
      spotsTotal: values.squadType === "Solo" ? 1 : values.squadType === "Duo" ? 2 : 4,
      createdAt: new Date().toISOString(),
      members: [
        { id: "currentUser123", name: "CurrentUser" },
      ],
    };
    
    setSquadRequests([newRequest, ...squadRequests]);
    setIsCreatingRequest(false);
    
    toast({
      title: "Squad request created!",
      description: "Players can now see your request and join your squad.",
    });
    
    form.reset();
  };

  const handleJoinSquad = (squadId: number) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const squadToJoin = squadRequests.find(squad => squad.id === squadId);
    if (!squadToJoin) return;
    
    if (squadToJoin.spotsFilled >= squadToJoin.spotsTotal) {
      toast({
        title: "Squad is full",
        description: "This squad has reached its maximum number of members.",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedRequest(squadToJoin);
    setShowJoinDialog(true);
  };

  const confirmJoinSquad = () => {
    if (!selectedRequest) return;
    
    // In a real app, this would call a backend API
    const updatedRequests = squadRequests.map(request => {
      if (request.id === selectedRequest.id) {
        const updatedRequest = {
          ...request,
          spotsFilled: request.spotsFilled + 1,
          members: [
            ...request.members,
            { id: "currentUser123", name: "CurrentUser" }
          ]
        };
        return updatedRequest;
      }
      return request;
    });
    
    setSquadRequests(updatedRequests);
    setShowJoinDialog(false);
    
    toast({
      title: "Squad joined!",
      description: `You have joined ${selectedRequest.playerName}'s squad.`,
    });
  };
  
  // Filter squad requests based on selected filters
  const filteredRequests = squadRequests.filter(request => {
    return (filters.gameMode === "all" || request.gameMode === filters.gameMode) &&
           (filters.region === "all" || request.region === filters.region) &&
           (filters.playStyle === "all" || request.playStyle === filters.playStyle) &&
           (filters.squadType === "all" || request.squadType === filters.squadType) &&
           (filters.skillLevel === "all" || request.skillLevel === filters.skillLevel);
  });

  // Get max spots based on squad type
  const getMaxSpots = (squadType: SquadType) => {
    switch (squadType) {
      case "Solo":
        return 1;
      case "Duo":
        return 2;
      case "Squad":
        return 4;
      default:
        return 4;
    }
  };

  // Get max slots for Clash Squad mode
  const getClashSquadSpots = (squadType: SquadType) => {
    if (squadType === "Squad") return 4;
    return squadType === "Duo" ? 2 : 1;
  };

  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 z-0" style={{
        backgroundImage: `
          radial-gradient(circle at 20% 30%, rgba(155, 135, 245, 0.15) 0%, rgba(0, 0, 0, 0) 50%),
          radial-gradient(circle at 80% 70%, rgba(234, 56, 76, 0.1) 0%, rgba(0, 0, 0, 0) 50%)
        `
      }}></div>
      
      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <Badge variant="fire" className="mb-4">Squad Finder</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Find Your Perfect <span className="text-booyah-fire">Squad</span>
          </h2>
          <p className="text-muted-foreground max-w-[700px]">
            Connect with players who match your playstyle, region and skill level. 
            Create a squad request or join an existing one to team up for matches and tournaments.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <Button 
                variant="outline" 
                onClick={toggleFilter}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filter Squads
                {filterOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
              
              <Button 
                variant="fire" 
                className="flex items-center gap-2"
                onClick={() => setIsCreatingRequest(true)}
              >
                <Plus className="h-4 w-4" />
                Create Squad Request
              </Button>
            </div>
            
            {filterOpen && (
              <div className="glass-effect p-4 rounded-lg mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Game Mode</h4>
                    <div className="flex gap-2 flex-wrap">
                      <Badge 
                        variant={filters.gameMode === "all" ? "neon" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setFilter("gameMode", "all")}
                      >
                        All
                      </Badge>
                      <Badge 
                        variant={filters.gameMode === "Battle Royale" ? "neon" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setFilter("gameMode", "Battle Royale")}
                      >
                        Battle Royale
                      </Badge>
                      <Badge 
                        variant={filters.gameMode === "Clash Squad" ? "neon" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setFilter("gameMode", "Clash Squad")}
                      >
                        Clash Squad
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Region</h4>
                    <div className="flex gap-2 flex-wrap">
                      <Badge 
                        variant={filters.region === "all" ? "neon" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setFilter("region", "all")}
                      >
                        All
                      </Badge>
                      <Badge 
                        variant={filters.region === "Global" ? "neon" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setFilter("region", "Global")}
                      >
                        Global
                      </Badge>
                      <Badge 
                        variant={filters.region === "Asia" ? "neon" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setFilter("region", "Asia")}
                      >
                        Asia
                      </Badge>
                      <Badge 
                        variant={filters.region === "Europe" ? "neon" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setFilter("region", "Europe")}
                      >
                        Europe
                      </Badge>
                      <Badge 
                        variant={filters.region === "North America" ? "neon" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setFilter("region", "North America")}
                      >
                        North America
                      </Badge>
                      <Badge 
                        variant={filters.region === "South America" ? "neon" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setFilter("region", "South America")}
                      >
                        South America
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Play Style</h4>
                    <div className="flex gap-2 flex-wrap">
                      <Badge 
                        variant={filters.playStyle === "all" ? "neon" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setFilter("playStyle", "all")}
                      >
                        All
                      </Badge>
                      <Badge 
                        variant={filters.playStyle === "Aggressive" ? "neon" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setFilter("playStyle", "Aggressive")}
                      >
                        Aggressive
                      </Badge>
                      <Badge 
                        variant={filters.playStyle === "Balanced" ? "neon" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setFilter("playStyle", "Balanced")}
                      >
                        Balanced
                      </Badge>
                      <Badge 
                        variant={filters.playStyle === "Defensive" ? "neon" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setFilter("playStyle", "Defensive")}
                      >
                        Defensive
                      </Badge>
                      <Badge 
                        variant={filters.playStyle === "Rusher" ? "neon" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setFilter("playStyle", "Rusher")}
                      >
                        Rusher
                      </Badge>
                      <Badge 
                        variant={filters.playStyle === "Sniper" ? "neon" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setFilter("playStyle", "Sniper")}
                      >
                        Sniper
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Squad Type</h4>
                    <div className="flex gap-2 flex-wrap">
                      <Badge 
                        variant={filters.squadType === "all" ? "neon" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setFilter("squadType", "all")}
                      >
                        All
                      </Badge>
                      <Badge 
                        variant={filters.squadType === "Solo" ? "neon" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setFilter("squadType", "Solo")}
                      >
                        Solo
                      </Badge>
                      <Badge 
                        variant={filters.squadType === "Duo" ? "neon" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setFilter("squadType", "Duo")}
                      >
                        Duo
                      </Badge>
                      <Badge 
                        variant={filters.squadType === "Squad" ? "neon" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setFilter("squadType", "Squad")}
                      >
                        Squad
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Skill Level</h4>
                    <div className="flex gap-2 flex-wrap">
                      <Badge 
                        variant={filters.skillLevel === "all" ? "neon" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setFilter("skillLevel", "all")}
                      >
                        All
                      </Badge>
                      <Badge 
                        variant={filters.skillLevel === "Beginner" ? "neon" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setFilter("skillLevel", "Beginner")}
                      >
                        Beginner
                      </Badge>
                      <Badge 
                        variant={filters.skillLevel === "Intermediate" ? "neon" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setFilter("skillLevel", "Intermediate")}
                      >
                        Intermediate
                      </Badge>
                      <Badge 
                        variant={filters.skillLevel === "Advanced" ? "neon" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setFilter("skillLevel", "Advanced")}
                      >
                        Advanced
                      </Badge>
                      <Badge 
                        variant={filters.skillLevel === "Pro" ? "neon" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setFilter("skillLevel", "Pro")}
                      >
                        Pro
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {filteredRequests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredRequests.map((request) => (
                  <div key={request.id} className="neon-card p-4 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold">{request.playerName}'s Squad</h3>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(request.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{request.squadType}</Badge>
                        <Badge variant={request.gameMode === "Battle Royale" ? "fire" : "neon"}>
                          {request.gameMode === "Battle Royale" ? "BR" : "CS"}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-booyah-neon-blue" />
                        <span>{request.region}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Flame className="h-4 w-4 text-booyah-fire" />
                        <span>{request.playStyle}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Gamepad2 className="h-4 w-4 text-booyah-neon-blue" />
                        <span>{request.gameMode}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-booyah-neon-blue" />
                        <span>{request.skillLevel}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm mb-4 line-clamp-2">{request.description}</p>
                    
                    <div className="mt-auto">
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-booyah-neon-blue" />
                          <span className="text-sm">
                            {request.spotsFilled}/{request.gameMode === "Clash Squad" 
                              ? getClashSquadSpots(request.squadType) 
                              : getMaxSpots(request.squadType)}
                          </span>
                        </div>
                        <div className="flex -space-x-2">
                          {request.members.map((member, index) => (
                            <div 
                              key={member.id} 
                              className="w-8 h-8 rounded-full bg-booyah-purple-dark/60 border-2 border-booyah-purple-dark flex items-center justify-center text-xs"
                              title={member.name}
                            >
                              {member.avatar ? (
                                <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full object-cover" />
                              ) : (
                                member.name.charAt(0)
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Button 
                        variant="neon" 
                        className="w-full"
                        disabled={request.spotsFilled >= (request.gameMode === "Clash Squad" 
                          ? getClashSquadSpots(request.squadType) 
                          : getMaxSpots(request.squadType))}
                        onClick={() => handleJoinSquad(request.id)}
                      >
                        {request.spotsFilled >= (request.gameMode === "Clash Squad" 
                          ? getClashSquadSpots(request.squadType) 
                          : getMaxSpots(request.squadType))
                          ? "Full" 
                          : "Join Squad"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 glass-effect p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">No Squad Requests Found</h3>
                <p className="text-muted-foreground mb-4">
                  No squad requests match your current filters. Try adjusting your filters or create a new squad request.
                </p>
                <Button 
                  variant="fire" 
                  onClick={() => setIsCreatingRequest(true)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Create Squad Request
                </Button>
              </div>
            )}
          </div>
          
          <div className="md:w-[300px] space-y-6">
            <div className="neon-card p-4">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Search className="h-4 w-4" />
                Quick Find
              </h3>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => {
                    setFilters({
                      ...filters,
                      gameMode: "Battle Royale",
                      squadType: "Squad"
                    });
                  }}
                >
                  Battle Royale Squads
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => {
                    setFilters({
                      ...filters,
                      gameMode: "Clash Squad",
                      squadType: "Squad"
                    });
                  }}
                >
                  Clash Squad Teams
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => {
                    setFilters({
                      ...filters,
                      squadType: "Duo"
                    });
                  }}
                >
                  Duo Partners
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => {
                    setFilters({
                      ...filters,
                      region: "Global"
                    });
                  }}
                >
                  Global Players
                </Button>
              </div>
            </div>
            
            <div className="glass-effect p-4 rounded-lg">
              <h3 className="font-bold mb-2">Squad Finder Tips</h3>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-booyah-neon-blue">•</span>
                  <span>Be specific about your playstyle and expectations in your description.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-booyah-neon-blue">•</span>
                  <span>Mention your rank and preferred game mode for better matching.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-booyah-neon-blue">•</span>
                  <span>Respond quickly to join requests to build your squad faster.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-booyah-neon-blue">•</span>
                  <span>Consider players from different regions if you play during varied hours.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Create Squad Request Dialog */}
      <Dialog open={isCreatingRequest} onOpenChange={setIsCreatingRequest}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create Squad Request</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a squad request. Other players will be able to see your request and join your squad.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreateSquadRequest)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="gameMode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Game Mode</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select game mode" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Battle Royale">Battle Royale</SelectItem>
                          <SelectItem value="Clash Squad">Clash Squad</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Region</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select region" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Global">Global</SelectItem>
                          <SelectItem value="Asia">Asia</SelectItem>
                          <SelectItem value="Europe">Europe</SelectItem>
                          <SelectItem value="North America">North America</SelectItem>
                          <SelectItem value="South America">South America</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="playStyle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Play Style</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select play style" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Aggressive">Aggressive</SelectItem>
                          <SelectItem value="Balanced">Balanced</SelectItem>
                          <SelectItem value="Defensive">Defensive</SelectItem>
                          <SelectItem value="Rusher">Rusher</SelectItem>
                          <SelectItem value="Sniper">Sniper</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="squadType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Squad Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select squad type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Solo">Solo (Looking to join)</SelectItem>
                          <SelectItem value="Duo">Duo (2 players)</SelectItem>
                          <SelectItem value="Squad">Squad (4 players)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        {field.value === "Solo" 
                          ? "You're looking to join someone else's team" 
                          : `Creating a ${field.value.toLowerCase()} with ${field.value === "Duo" ? "2" : "4"} spots`}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="skillLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skill Level</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select skill level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                        <SelectItem value="Pro">Pro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe what kind of players you're looking for, your play schedule, etc."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit" variant="fire">Create Squad Request</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Join Squad Confirmation Dialog */}
      <Dialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Join Squad</DialogTitle>
            <DialogDescription>
              {selectedRequest 
                ? `You are about to join ${selectedRequest.playerName}'s ${selectedRequest.squadType === "Squad" ? "squad" : "duo"}.` 
                : "Join this squad?"}
            </DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Game Mode:</span>
                <Badge variant={selectedRequest.gameMode === "Battle Royale" ? "fire" : "neon"}>
                  {selectedRequest.gameMode}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-medium">Region:</span>
                <span>{selectedRequest.region}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-medium">Play Style:</span>
                <span>{selectedRequest.playStyle}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-medium">Skill Level:</span>
                <span>{selectedRequest.skillLevel}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-medium">Members:</span>
                <span>{selectedRequest.spotsFilled}/{selectedRequest.gameMode === "Clash Squad" 
                  ? getClashSquadSpots(selectedRequest.squadType) 
                  : getMaxSpots(selectedRequest.squadType)}</span>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowJoinDialog(false)}>Cancel</Button>
            <Button variant="fire" onClick={confirmJoinSquad}>Join Now</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
