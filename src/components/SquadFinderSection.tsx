
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  Trophy,
  Clock,
  Gamepad,
  MessageSquare,
  Check,
  X,
  User,
  UserPlus,
  PlusCircle
} from "lucide-react";

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
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

// Type definitions for our data
type GameMode = "Battle Royale" | "Clash Squad" | "Lone Wolf";
type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Pro";
type PlayStyle = "Aggressive" | "Tactical" | "Balanced" | "Defensive";
type Region = "Asia" | "Europe" | "North America" | "South America" | "Global";
type SquadType = "Squad" | "Duo" | "Solo";

type SquadRequest = {
  id: number;
  playerId: string;
  playerName: string;
  gameMode: GameMode;
  region: Region;
  skillLevel: SkillLevel;
  playStyle: PlayStyle;
  squadType: SquadType;
  description: string;
  spotsFilled: number;
  spotsTotal: number;
  createdAt: string;
  members: SquadMember[];
};

type SquadMember = {
  id: number;
  name: string;
  level: number;
  role: string;
};

type Player = {
  id: number;
  name: string;
  level: number;
  skillLevel: SkillLevel;
  gameMode: GameMode;
  region: Region;
  playStyle: PlayStyle;
  gamesPlayed: number;
  winRate: string;
  lastActive: string;
  isOnline: boolean;
};

// Sample data
const SAMPLE_PLAYERS: Player[] = [
  {
    id: 1,
    name: "HeadshotHero",
    level: 45,
    skillLevel: "Advanced",
    gameMode: "Battle Royale",
    region: "Asia",
    playStyle: "Aggressive",
    gamesPlayed: 789,
    winRate: "28%",
    lastActive: "2 minutes ago",
    isOnline: true
  },
  {
    id: 2,
    name: "SniperQueen",
    level: 67,
    skillLevel: "Pro",
    gameMode: "Clash Squad",
    region: "North America",
    playStyle: "Tactical",
    gamesPlayed: 1243,
    winRate: "32%",
    lastActive: "Just now",
    isOnline: true
  },
  {
    id: 3,
    name: "TacticalTiger",
    level: 38,
    skillLevel: "Intermediate",
    gameMode: "Battle Royale",
    region: "Europe",
    playStyle: "Balanced",
    gamesPlayed: 562,
    winRate: "22%",
    lastActive: "1 hour ago",
    isOnline: false
  },
  {
    id: 4,
    name: "StealthShadow",
    level: 52,
    skillLevel: "Advanced",
    gameMode: "Lone Wolf",
    region: "South America",
    playStyle: "Defensive",
    gamesPlayed: 927,
    winRate: "25%",
    lastActive: "5 hours ago",
    isOnline: false
  },
  {
    id: 5,
    name: "BattleBeard",
    level: 71,
    skillLevel: "Pro",
    gameMode: "Battle Royale",
    region: "Global",
    playStyle: "Aggressive",
    gamesPlayed: 1524,
    winRate: "35%",
    lastActive: "30 minutes ago",
    isOnline: true
  },
  {
    id: 6,
    name: "FlankMaster",
    level: 49,
    skillLevel: "Advanced",
    gameMode: "Clash Squad",
    region: "Asia",
    playStyle: "Tactical",
    gamesPlayed: 873,
    winRate: "29%",
    lastActive: "15 minutes ago",
    isOnline: true
  }
];

const SAMPLE_SQUAD_REQUESTS: SquadRequest[] = [
  {
    id: 1,
    playerId: "12345",
    playerName: "HeadshotHero",
    gameMode: "Battle Royale",
    region: "Asia",
    skillLevel: "Advanced",
    playStyle: "Aggressive",
    squadType: "Squad",
    description: "Looking for aggressive players who know how to coordinate attacks. No mic needed, just follow my pings.",
    spotsFilled: 1,
    spotsTotal: 4,
    createdAt: "2025-04-15T15:30:00Z",
    members: [
      {
        id: 1,
        name: "HeadshotHero",
        level: 45,
        role: "Leader"
      }
    ]
  },
  {
    id: 2,
    playerId: "23456",
    playerName: "SniperQueen",
    gameMode: "Clash Squad",
    region: "North America",
    skillLevel: "Pro",
    playStyle: "Tactical",
    squadType: "Duo",
    description: "Need one good player for CS tournament practice. Must have mic and be available evenings.",
    spotsFilled: 1,
    spotsTotal: 2,
    createdAt: "2025-04-16T10:15:00Z",
    members: [
      {
        id: 2,
        name: "SniperQueen",
        level: 67,
        role: "Leader"
      }
    ]
  },
  {
    id: 3,
    playerId: "34567",
    playerName: "TacticalTiger",
    gameMode: "Battle Royale",
    region: "Europe",
    playStyle: "Balanced",
    squadType: "Squad",
    description: "Casual squad for rank pushing. No pressure, just have fun and communicate.",
    spotsFilled: 2,
    spotsTotal: 4,
    createdAt: "2025-04-16T08:45:00Z",
    members: [
      {
        id: 3,
        name: "TacticalTiger",
        level: 38,
        role: "Leader"
      },
      {
        id: 6,
        name: "FlankMaster",
        level: 49,
        role: "Member"
      }
    ]
  },
  {
    id: 4,
    playerId: "45678",
    playerName: "BattleBeard",
    gameMode: "Battle Royale",
    region: "Global",
    playStyle: "Aggressive",
    squadType: "Duo",
    description: "Looking for a partner for duo matches. Prefer someone who can play daily.",
    spotsFilled: 1,
    spotsTotal: 2,
    createdAt: "2025-04-16T12:30:00Z",
    members: [
      {
        id: 5,
        name: "BattleBeard",
        level: 71,
        role: "Leader"
      }
    ]
  }
];

// Create Squad Request Form schema
const createSquadSchema = z.object({
  gameMode: z.enum(["Battle Royale", "Clash Squad", "Lone Wolf"]),
  region: z.enum(["Asia", "Europe", "North America", "South America", "Global"]),
  skillLevel: z.enum(["Beginner", "Intermediate", "Advanced", "Pro"]),
  playStyle: z.enum(["Aggressive", "Tactical", "Balanced", "Defensive"]),
  squadType: z.enum(["Squad", "Duo", "Solo"]),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }).max(200, {
    message: "Description must not exceed 200 characters.",
  }),
  spotsTotal: z.number().min(2).max(4)
});

export function SquadFinderSection() {
  const [players, setPlayers] = useState<Player[]>(SAMPLE_PLAYERS);
  const [squadRequests, setSquadRequests] = useState<SquadRequest[]>(SAMPLE_SQUAD_REQUESTS);
  const [filter, setFilter] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [currentTab, setCurrentTab] = useState("squad-requests");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<SquadRequest | null>(null);
  
  const [filters, setFilters] = useState({
    gameMode: "all",
    region: "all",
    skillLevel: "all",
    playStyle: "all",
    squadType: "all"
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();

  // Initialize the form with default values
  const form = useForm<z.infer<typeof createSquadSchema>>({
    resolver: zodResolver(createSquadSchema),
    defaultValues: {
      gameMode: "Battle Royale",
      region: "Global",
      skillLevel: "Intermediate",
      playStyle: "Balanced",
      squadType: "Squad",
      description: "",
      spotsTotal: 4
    },
  });

  const toggleFilter = () => {
    setFilter(!filter);
  };

  const applyFilter = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleViewProfile = (player: Player) => {
    setSelectedPlayer(player);
  };

  const handleCreateSquad = (values: z.infer<typeof createSquadSchema>) => {
    // Check if user is logged in (this would be replaced with actual auth check)
    // For demo, we'll assume user is not logged in and redirect to login
    navigate("/login");
    
    // In a real app with auth, the below code would run instead
    /*
    const newSquadRequest: SquadRequest = {
      id: squadRequests.length + 1,
      playerId: "current-user-id",
      playerName: "CurrentUserName", // Would be from auth
      gameMode: values.gameMode,
      region: values.region,
      skillLevel: values.skillLevel,
      playStyle: values.playStyle,
      squadType: values.squadType,
      description: values.description,
      spotsFilled: 1, // Start with just the creator
      spotsTotal: values.spotsTotal,
      createdAt: new Date().toISOString(),
      members: [
        {
          id: 999, // Would be current user's id
          name: "CurrentUserName", // Would be from auth
          level: 50, // Would be from user profile
          role: "Leader"
        }
      ]
    };
    
    setSquadRequests(prev => [...prev, newSquadRequest]);
    setIsCreateDialogOpen(false);
    form.reset();
    
    toast({
      title: "Squad request created!",
      description: "Other players can now join your squad.",
    });
    */
  };

  const handleJoinSquad = (request: SquadRequest) => {
    // Check if user is logged in (this would be replaced with actual auth check)
    // For demo, we'll assume user is not logged in and redirect to login
    navigate("/login");
    
    // In a real app with auth, the below code would run instead
    /*
    // Check if squad is already full
    if (request.spotsFilled >= request.spotsTotal) {
      toast({
        title: "Cannot join squad",
        description: "This squad is already full.",
        variant: "destructive"
      });
      return;
    }
    
    // Check if user is already in this squad
    const isAlreadyMember = request.members.some(member => member.id === currentUser.id);
    if (isAlreadyMember) {
      toast({
        title: "Already a member",
        description: "You are already part of this squad.",
        variant: "destructive"
      });
      return;
    }
    
    // Add user to squad
    const updatedRequest = {
      ...request,
      spotsFilled: request.spotsFilled + 1,
      members: [
        ...request.members,
        {
          id: currentUser.id,
          name: currentUser.name,
          level: currentUser.level,
          role: "Member"
        }
      ]
    };
    
    setSquadRequests(prev => 
      prev.map(item => item.id === request.id ? updatedRequest : item)
    );
    
    setIsJoinDialogOpen(false);
    
    toast({
      title: "Joined squad!",
      description: `You have joined ${request.playerName}'s squad.`,
    });
    */
  };

  // Filter squad requests based on user filters
  const filteredSquadRequests = squadRequests.filter(request => {
    return (filters.gameMode === "all" || request.gameMode === filters.gameMode) &&
           (filters.region === "all" || request.region === filters.region) &&
           (filters.skillLevel === "all" || request.skillLevel === filters.skillLevel) &&
           (filters.playStyle === "all" || request.playStyle === filters.playStyle) &&
           (filters.squadType === "all" || request.squadType === filters.squadType);
  });

  // Filter players based on user filters
  const filteredPlayers = players.filter(player => {
    return (filters.gameMode === "all" || player.gameMode === filters.gameMode) &&
           (filters.region === "all" || player.region === filters.region) &&
           (filters.skillLevel === "all" || player.skillLevel === filters.skillLevel) &&
           (filters.playStyle === "all" || player.playStyle === filters.playStyle);
  });

  return (
    <section className="py-16 relative">
      {/* Background effect */}
      <div className="absolute inset-0 z-0" style={{
        backgroundImage: `
          radial-gradient(circle at 70% 20%, rgba(155, 135, 245, 0.15) 0%, rgba(0, 0, 0, 0) 50%),
          radial-gradient(circle at 30% 70%, rgba(234, 56, 76, 0.1) 0%, rgba(0, 0, 0, 0) 50%)
        `
      }}></div>
      
      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <Badge variant="neon" className="mb-4">Squad Finder</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Find Your Perfect <span className="text-booyah-neon-blue animate-pulse-neon">Squad</span>
          </h2>
          <p className="text-muted-foreground max-w-[700px]">
            Connect with players who match your playstyle, skill level, and goals. 
            Whether you're looking for tournament teammates or casual squadmates, find them here.
          </p>
        </div>

        {/* Create Squad Request Button */}
        <div className="mb-8 flex justify-center">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="fire" size="lg" className="gap-2">
                <PlusCircle className="h-5 w-5" />
                Create Squad Request
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create a Squad Request</DialogTitle>
                <DialogDescription>
                  Fill out the details for your squad. Other players will be able to see and join your request.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleCreateSquad)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="gameMode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Game Mode</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select game mode" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Battle Royale">Battle Royale</SelectItem>
                              <SelectItem value="Clash Squad">Clash Squad</SelectItem>
                              <SelectItem value="Lone Wolf">Lone Wolf</SelectItem>
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
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select squad type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Squad">Squad (4 players)</SelectItem>
                              <SelectItem value="Duo">Duo (2 players)</SelectItem>
                              <SelectItem value="Solo">Solo (find 1 player)</SelectItem>
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
                      name="region"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Region</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select region" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Asia">Asia</SelectItem>
                              <SelectItem value="Europe">Europe</SelectItem>
                              <SelectItem value="North America">North America</SelectItem>
                              <SelectItem value="South America">South America</SelectItem>
                              <SelectItem value="Global">Global</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="skillLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Skill Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="playStyle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Play Style</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select play style" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Aggressive">Aggressive</SelectItem>
                              <SelectItem value="Tactical">Tactical</SelectItem>
                              <SelectItem value="Balanced">Balanced</SelectItem>
                              <SelectItem value="Defensive">Defensive</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="spotsTotal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Team Size</FormLabel>
                          <Select 
                            onValueChange={(value) => field.onChange(parseInt(value))} 
                            defaultValue={field.value.toString()}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select team size" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="2">2 Players</SelectItem>
                              <SelectItem value="3">3 Players</SelectItem>
                              <SelectItem value="4">4 Players</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Tell others what kind of players you're looking for..."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Describe your gaming goals and requirements for potential squadmates.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button type="submit" variant="fire">Create Request</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tab Navigation */}
        <Tabs defaultValue="squad-requests" className="mb-8" onValueChange={setCurrentTab}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="squad-requests" className="gap-2">
              <Users className="h-4 w-4" />
              Squad Requests
            </TabsTrigger>
            <TabsTrigger value="players" className="gap-2">
              <User className="h-4 w-4" />
              Find Players
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Filters */}
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={toggleFilter}
            className="flex items-center gap-2 mb-4"
          >
            <Filter className="h-4 w-4" />
            Filter {currentTab === "squad-requests" ? "Squad Requests" : "Players"}
            {filter ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          
          {filter && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-card/80 rounded-lg border border-border mb-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Game Mode</h4>
                <div className="flex gap-2 flex-wrap">
                  <Badge 
                    variant={filters.gameMode === "all" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => applyFilter("gameMode", "all")}
                  >
                    All
                  </Badge>
                  <Badge 
                    variant={filters.gameMode === "Battle Royale" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => applyFilter("gameMode", "Battle Royale")}
                  >
                    Battle Royale
                  </Badge>
                  <Badge 
                    variant={filters.gameMode === "Clash Squad" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => applyFilter("gameMode", "Clash Squad")}
                  >
                    Clash Squad
                  </Badge>
                  <Badge 
                    variant={filters.gameMode === "Lone Wolf" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => applyFilter("gameMode", "Lone Wolf")}
                  >
                    Lone Wolf
                  </Badge>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Region</h4>
                <div className="flex gap-2 flex-wrap">
                  <Badge 
                    variant={filters.region === "all" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => applyFilter("region", "all")}
                  >
                    All
                  </Badge>
                  <Badge 
                    variant={filters.region === "Asia" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => applyFilter("region", "Asia")}
                  >
                    Asia
                  </Badge>
                  <Badge 
                    variant={filters.region === "Europe" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => applyFilter("region", "Europe")}
                  >
                    Europe
                  </Badge>
                  <Badge 
                    variant={filters.region === "North America" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => applyFilter("region", "North America")}
                  >
                    North America
                  </Badge>
                  <Badge 
                    variant={filters.region === "South America" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => applyFilter("region", "South America")}
                  >
                    South America
                  </Badge>
                  <Badge 
                    variant={filters.region === "Global" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => applyFilter("region", "Global")}
                  >
                    Global
                  </Badge>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Skill Level</h4>
                <div className="flex gap-2 flex-wrap">
                  <Badge 
                    variant={filters.skillLevel === "all" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => applyFilter("skillLevel", "all")}
                  >
                    All
                  </Badge>
                  <Badge 
                    variant={filters.skillLevel === "Beginner" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => applyFilter("skillLevel", "Beginner")}
                  >
                    Beginner
                  </Badge>
                  <Badge 
                    variant={filters.skillLevel === "Intermediate" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => applyFilter("skillLevel", "Intermediate")}
                  >
                    Intermediate
                  </Badge>
                  <Badge 
                    variant={filters.skillLevel === "Advanced" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => applyFilter("skillLevel", "Advanced")}
                  >
                    Advanced
                  </Badge>
                  <Badge 
                    variant={filters.skillLevel === "Pro" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => applyFilter("skillLevel", "Pro")}
                  >
                    Pro
                  </Badge>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Play Style</h4>
                <div className="flex gap-2 flex-wrap">
                  <Badge 
                    variant={filters.playStyle === "all" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => applyFilter("playStyle", "all")}
                  >
                    All
                  </Badge>
                  <Badge 
                    variant={filters.playStyle === "Aggressive" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => applyFilter("playStyle", "Aggressive")}
                  >
                    Aggressive
                  </Badge>
                  <Badge 
                    variant={filters.playStyle === "Tactical" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => applyFilter("playStyle", "Tactical")}
                  >
                    Tactical
                  </Badge>
                  <Badge 
                    variant={filters.playStyle === "Balanced" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => applyFilter("playStyle", "Balanced")}
                  >
                    Balanced
                  </Badge>
                  <Badge 
                    variant={filters.playStyle === "Defensive" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => applyFilter("playStyle", "Defensive")}
                  >
                    Defensive
                  </Badge>
                </div>
              </div>
              
              {currentTab === "squad-requests" && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Squad Type</h4>
                  <div className="flex gap-2 flex-wrap">
                    <Badge 
                      variant={filters.squadType === "all" ? "neon" : "outline"}
                      className="cursor-pointer"
                      onClick={() => applyFilter("squadType", "all")}
                    >
                      All
                    </Badge>
                    <Badge 
                      variant={filters.squadType === "Squad" ? "neon" : "outline"}
                      className="cursor-pointer"
                      onClick={() => applyFilter("squadType", "Squad")}
                    >
                      Squad
                    </Badge>
                    <Badge 
                      variant={filters.squadType === "Duo" ? "neon" : "outline"}
                      className="cursor-pointer"
                      onClick={() => applyFilter("squadType", "Duo")}
                    >
                      Duo
                    </Badge>
                    <Badge 
                      variant={filters.squadType === "Solo" ? "neon" : "outline"}
                      className="cursor-pointer"
                      onClick={() => applyFilter("squadType", "Solo")}
                    >
                      Solo
                    </Badge>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Squad Requests Tab Content */}
        <div className={`${currentTab === "squad-requests" ? "block" : "hidden"}`}>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredSquadRequests.map(request => (
              <div key={request.id} className="neon-card p-6 flex flex-col">
                <div className="mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="neon" className="mb-2">{request.squadType}</Badge>
                    <Badge variant={request.spotsFilled < request.spotsTotal ? "fire" : "secondary"}>
                      {request.spotsFilled < request.spotsTotal ? "Recruiting" : "Full"}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-1">{request.playerName}'s Squad</h3>
                  <div className="text-sm text-muted-foreground mb-4">{request.description}</div>
                  
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Gamepad className="h-4 w-4 text-booyah-neon-blue" />
                      <span>{request.gameMode}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-booyah-neon-blue" />
                      <span>{request.skillLevel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-booyah-neon-blue" />
                      <span>{request.spotsFilled}/{request.spotsTotal} Members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-booyah-neon-blue" />
                      <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm font-medium">Members:</span>
                    <div className="flex -space-x-2">
                      {request.members.map((member, index) => (
                        <HoverCard key={member.id}>
                          <HoverCardTrigger asChild>
                            <div className="h-8 w-8 rounded-full bg-booyah-purple/50 flex items-center justify-center text-xs font-bold border-2 border-background cursor-pointer">
                              {member.name.charAt(0)}
                            </div>
                          </HoverCardTrigger>
                          <HoverCardContent side="top" className="w-64">
                            <div className="flex flex-col gap-2">
                              <div className="font-semibold">{member.name}</div>
                              <div className="text-sm flex items-center gap-2">
                                <span className="text-muted-foreground">Level:</span>
                                <span>{member.level}</span>
                              </div>
                              <div className="text-sm flex items-center gap-2">
                                <span className="text-muted-foreground">Role:</span>
                                <Badge variant={member.role === "Leader" ? "fire" : "outline"}>
                                  {member.role}
                                </Badge>
                              </div>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      ))}
                      
                      {request.spotsFilled < request.spotsTotal && Array.from({ length: request.spotsTotal - request.spotsFilled }).map((_, index) => (
                        <div key={`empty-${index}`} className="h-8 w-8 rounded-full bg-muted/30 flex items-center justify-center text-muted-foreground border-2 border-dashed border-muted">
                          <span className="text-xs">+</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <Dialog open={isJoinDialogOpen && selectedRequest?.id === request.id} onOpenChange={(open) => {
                    setIsJoinDialogOpen(open);
                    if (open) setSelectedRequest(request);
                  }}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="neon"
                        className="w-full"
                        disabled={request.spotsFilled >= request.spotsTotal}
                        onClick={() => setSelectedRequest(request)}
                      >
                        <UserPlus className="mr-2 h-4 w-4" />
                        {request.spotsFilled >= request.spotsTotal ? "Squad Full" : "Join Squad"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Join {request.playerName}'s Squad</DialogTitle>
                        <DialogDescription>
                          You're about to join this {request.squadType.toLowerCase()}. The squad leader will be notified.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div className="glass-effect p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Squad Details</h4>
                          <div className="grid grid-cols-2 gap-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Gamepad className="h-4 w-4 text-booyah-neon-blue" />
                              <span className="text-muted-foreground">Game Mode:</span>
                              <span>{request.gameMode}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Trophy className="h-4 w-4 text-booyah-neon-blue" />
                              <span className="text-muted-foreground">Skill Level:</span>
                              <span>{request.skillLevel}</span>
                            </div>
                            <div className="flex items-center gap-2 col-span-2">
                              <MessageSquare className="h-4 w-4 text-booyah-neon-blue" />
                              <span className="text-muted-foreground">Description:</span>
                              <span>{request.description}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Current Members</h4>
                          <div className="space-y-2">
                            {request.members.map(member => (
                              <div key={member.id} className="flex items-center justify-between p-2 bg-card/50 rounded-lg">
                                <div className="flex items-center gap-2">
                                  <div className="h-8 w-8 rounded-full bg-booyah-purple/50 flex items-center justify-center text-xs font-bold">
                                    {member.name.charAt(0)}
                                  </div>
                                  <div>
                                    <div className="font-medium">{member.name}</div>
                                    <div className="text-xs text-muted-foreground">Level {member.level}</div>
                                  </div>
                                </div>
                                <Badge variant={member.role === "Leader" ? "fire" : "outline"}>
                                  {member.role}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button variant="outline" className="gap-2" asChild>
                          <DialogClose>
                            <X className="h-4 w-4" />
                            Cancel
                          </DialogClose>
                        </Button>
                        <Button variant="fire" className="gap-2" onClick={() => handleJoinSquad(request)}>
                          <Check className="h-4 w-4" />
                          Confirm Join
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
          
          {filteredSquadRequests.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex h-20 w-20 rounded-full bg-muted/30 items-center justify-center mb-4">
                <Users className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">No Squad Requests Found</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                No squads match your current filters or there are no active squad requests.
              </p>
              <Button variant="fire" onClick={() => setIsCreateDialogOpen(true)}>
                Create Your Own Squad
              </Button>
            </div>
          )}
        </div>

        {/* Players Tab Content */}
        <div className={`${currentTab === "players" ? "block" : "hidden"}`}>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPlayers.map(player => (
              <div key={player.id} className="neon-card p-6 flex flex-col">
                <div className="mb-4">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{player.name}</h3>
                    <Badge variant={player.isOnline ? "fire" : "outline"}>
                      {player.isOnline ? "Online" : "Offline"}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-booyah-neon-blue" />
                      <span className="text-muted-foreground">Level:</span>
                      <span>{player.level}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gamepad className="h-4 w-4 text-booyah-neon-blue" />
                      <span className="text-muted-foreground">Mode:</span>
                      <span>{player.gameMode}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-booyah-neon-blue" />
                      <span className="text-muted-foreground">Games:</span>
                      <span>{player.gamesPlayed}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-booyah-fire" />
                      <span className="text-muted-foreground">Win Rate:</span>
                      <span>{player.winRate}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline">{player.region}</Badge>
                    <Badge variant="outline">{player.skillLevel}</Badge>
                    <Badge variant="outline">{player.playStyle}</Badge>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Last active: {player.lastActive}
                  </div>
                </div>
                
                <div className="mt-auto">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="neon"
                        className="w-full"
                        onClick={() => handleViewProfile(player)}
                      >
                        View Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{player.name}'s Profile</DialogTitle>
                        <DialogDescription>
                          Player stats and information
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 rounded-full bg-booyah-purple/50 flex items-center justify-center text-xl font-bold">
                            {player.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold flex items-center gap-2">
                              {player.name}
                              <Badge variant={player.isOnline ? "fire" : "outline"}>
                                {player.isOnline ? "Online" : "Offline"}
                              </Badge>
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Last active: {player.lastActive}
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="glass-effect p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Player Stats</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Level:</span>
                                <span>{player.level}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Games Played:</span>
                                <span>{player.gamesPlayed}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Win Rate:</span>
                                <span>{player.winRate}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="glass-effect p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Play Style</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Favorite Mode:</span>
                                <span>{player.gameMode}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Skill Level:</span>
                                <span>{player.skillLevel}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Play Style:</span>
                                <span>{player.playStyle}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Button variant="fire" className="w-full gap-2">
                            <MessageSquare className="h-4 w-4" />
                            Send Message
                          </Button>
                          <Button variant="outline" className="w-full gap-2">
                            <UserPlus className="h-4 w-4" />
                            Add Friend
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
          
          {filteredPlayers.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex h-20 w-20 rounded-full bg-muted/30 items-center justify-center mb-4">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">No Players Found</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                No players match your current filter criteria. Try adjusting your filters.
              </p>
              <Button variant="outline" onClick={() => setFilters({
                gameMode: "all",
                region: "all",
                skillLevel: "all",
                playStyle: "all",
                squadType: "all"
              })}>
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
