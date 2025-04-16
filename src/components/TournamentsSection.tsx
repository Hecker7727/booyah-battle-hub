
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Trophy, 
  Users, 
  Clock, 
  MapPin, 
  CheckCircle,
  Filter,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Tournament = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  prize: string;
  maxTeams: number;
  registeredTeams: number;
  game: string;
  status: "upcoming" | "live" | "completed";
  image?: string;
};

const SAMPLE_TOURNAMENTS: Tournament[] = [
  {
    id: "1",
    title: "Booyah Battle Royale",
    description: "Weekly tournament for squads with amazing prizes.",
    date: "2025-04-20",
    time: "18:00 - 22:00",
    location: "Asia Server",
    prize: "$1,000",
    maxTeams: 25,
    registeredTeams: 18,
    game: "Battle Royale",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
  },
  {
    id: "2",
    title: "Clash Squad Championship",
    description: "2v2 tournament with rapid elimination rounds.",
    date: "2025-04-25",
    time: "20:00 - 23:00",
    location: "Global",
    prize: "$2,500",
    maxTeams: 32,
    registeredTeams: 24,
    game: "Clash Squad",
    status: "upcoming"
  },
  {
    id: "3",
    title: "Pro League Qualifier",
    description: "Qualify for the professional league with your squad.",
    date: "2025-05-02",
    time: "19:00 - 00:00",
    location: "North America",
    prize: "$5,000 + Pro League Entry",
    maxTeams: 50,
    registeredTeams: 42,
    game: "Battle Royale",
    status: "upcoming"
  },
  {
    id: "4",
    title: "Weekend Warriors Cup",
    description: "Casual weekend tournament for all skill levels.",
    date: "2025-04-18",
    time: "15:00 - 18:00",
    location: "Europe",
    prize: "Premium Character Bundles",
    maxTeams: 20,
    registeredTeams: 20,
    game: "Battle Royale",
    status: "live"
  },
];

export function TournamentsSection() {
  const [tournaments, setTournaments] = useState<Tournament[]>(SAMPLE_TOURNAMENTS);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    game: "all",
    status: "all",
    region: "all"
  });
  
  const { toast } = useToast();

  const handleRegister = (tournamentId: string) => {
    setTournaments(prevTournaments => 
      prevTournaments.map(tournament => 
        tournament.id === tournamentId 
          ? { 
              ...tournament, 
              registeredTeams: tournament.registeredTeams + 1 
            } 
          : tournament
      )
    );
    
    toast({
      title: "Successfully registered!",
      description: "Check your notifications for tournament details.",
    });
  };

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const setFilter = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const filteredTournaments = tournaments.filter(tournament => {
    return (filters.game === "all" || tournament.game === filters.game) &&
           (filters.status === "all" || tournament.status === filters.status) &&
           (filters.region === "all" || tournament.location.includes(filters.region));
  });

  return (
    <section className="py-16 relative">
      {/* Background effect */}
      <div className="absolute inset-0 z-0" style={{
        backgroundImage: `
          radial-gradient(circle at 30% 20%, rgba(155, 135, 245, 0.15) 0%, rgba(0, 0, 0, 0) 50%),
          radial-gradient(circle at 80% 70%, rgba(234, 56, 76, 0.1) 0%, rgba(0, 0, 0, 0) 50%)
        `
      }}></div>
      
      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <Badge variant="fire" className="mb-4">Tournaments</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Compete & <span className="text-booyah-fire">Conquer</span>
          </h2>
          <p className="text-muted-foreground max-w-[700px]">
            Join exciting tournaments, showcase your skills, and win amazing prizes. 
            From casual weekend cups to professional qualifiers, there's something for everyone.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={toggleFilter}
            className="flex items-center gap-2 mb-4"
          >
            <Filter className="h-4 w-4" />
            Filter Tournaments
            {filterOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          
          {filterOpen && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-card/80 rounded-lg border border-border mb-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Game Mode</h4>
                <div className="flex gap-2 flex-wrap">
                  <Badge 
                    variant={filters.game === "all" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFilter("game", "all")}
                  >
                    All
                  </Badge>
                  <Badge 
                    variant={filters.game === "Battle Royale" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFilter("game", "Battle Royale")}
                  >
                    Battle Royale
                  </Badge>
                  <Badge 
                    variant={filters.game === "Clash Squad" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFilter("game", "Clash Squad")}
                  >
                    Clash Squad
                  </Badge>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Status</h4>
                <div className="flex gap-2 flex-wrap">
                  <Badge 
                    variant={filters.status === "all" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFilter("status", "all")}
                  >
                    All
                  </Badge>
                  <Badge 
                    variant={filters.status === "upcoming" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFilter("status", "upcoming")}
                  >
                    Upcoming
                  </Badge>
                  <Badge 
                    variant={filters.status === "live" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFilter("status", "live")}
                  >
                    Live
                  </Badge>
                  <Badge 
                    variant={filters.status === "completed" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFilter("status", "completed")}
                  >
                    Completed
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
                    variant={filters.region === "Asia" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFilter("region", "Asia")}
                  >
                    Asia
                  </Badge>
                  <Badge 
                    variant={filters.region === "North America" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFilter("region", "North America")}
                  >
                    North America
                  </Badge>
                  <Badge 
                    variant={filters.region === "Europe" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFilter("region", "Europe")}
                  >
                    Europe
                  </Badge>
                  <Badge 
                    variant={filters.region === "Global" ? "neon" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setFilter("region", "Global")}
                  >
                    Global
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Featured tournament */}
        <div className="mb-12 neon-card overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="h-64 md:h-auto relative">
              <img 
                src={SAMPLE_TOURNAMENTS[0].image || "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"} 
                alt="Featured tournament" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="fire" className="animate-pulse">Featured</Badge>
              </div>
            </div>
            <div className="p-6 flex flex-col justify-between">
              <div>
                <Badge 
                  variant={SAMPLE_TOURNAMENTS[0].status === "live" ? "fire" : "neon"}
                  className="mb-2"
                >
                  {SAMPLE_TOURNAMENTS[0].status === "live" ? "Live Now" : "Upcoming"}
                </Badge>
                <h3 className="text-2xl font-bold mb-2">{SAMPLE_TOURNAMENTS[0].title}</h3>
                <p className="text-muted-foreground mb-4">{SAMPLE_TOURNAMENTS[0].description}</p>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-booyah-neon-blue" />
                    <span className="text-sm">{SAMPLE_TOURNAMENTS[0].date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-booyah-neon-blue" />
                    <span className="text-sm">{SAMPLE_TOURNAMENTS[0].time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-booyah-fire" />
                    <span className="text-sm">{SAMPLE_TOURNAMENTS[0].prize}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-booyah-neon-blue" />
                    <span className="text-sm">{SAMPLE_TOURNAMENTS[0].location}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-4 w-4 text-booyah-neon-blue" />
                  <span className="text-sm">{SAMPLE_TOURNAMENTS[0].registeredTeams}/{SAMPLE_TOURNAMENTS[0].maxTeams} Teams</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-booyah-neon-blue rounded-full"
                      style={{ width: `${(SAMPLE_TOURNAMENTS[0].registeredTeams / SAMPLE_TOURNAMENTS[0].maxTeams) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <Button 
                variant="fire"
                className="w-full"
                onClick={() => handleRegister(SAMPLE_TOURNAMENTS[0].id)}
                disabled={SAMPLE_TOURNAMENTS[0].registeredTeams >= SAMPLE_TOURNAMENTS[0].maxTeams}
              >
                {SAMPLE_TOURNAMENTS[0].registeredTeams >= SAMPLE_TOURNAMENTS[0].maxTeams 
                  ? "Full" : "Register for Tournament"}
              </Button>
            </div>
          </div>
        </div>

        {/* Tournaments list */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredTournaments.slice(1).map((tournament) => (
            <div key={tournament.id} className="neon-card p-6 flex flex-col">
              <div className="mb-4">
                <Badge 
                  variant={tournament.status === "live" ? "fire" : tournament.status === "completed" ? "secondary" : "neon"}
                  className="mb-2"
                >
                  {tournament.status === "live" ? "Live Now" : tournament.status === "completed" ? "Completed" : "Upcoming"}
                </Badge>
                <h3 className="text-xl font-bold mb-2">{tournament.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{tournament.description}</p>
                
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-booyah-neon-blue" />
                    <span>{tournament.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-booyah-neon-blue" />
                    <span>{tournament.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-booyah-fire" />
                    <span>{tournament.prize}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-booyah-neon-blue" />
                    <span>{tournament.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-4 w-4 text-booyah-neon-blue" />
                  <span className="text-sm">{tournament.registeredTeams}/{tournament.maxTeams}</span>
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-booyah-neon-blue rounded-full"
                      style={{ width: `${(tournament.registeredTeams / tournament.maxTeams) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto">
                <Button 
                  variant={tournament.status === "completed" ? "outline" : "neon"}
                  className="w-full"
                  onClick={() => handleRegister(tournament.id)}
                  disabled={tournament.registeredTeams >= tournament.maxTeams || tournament.status === "completed"}
                >
                  {tournament.status === "completed" 
                    ? "View Results" 
                    : tournament.registeredTeams >= tournament.maxTeams 
                      ? "Full" 
                      : "Register"}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Create your own tournament section */}
        <div className="neon-card p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="h-24 w-24 rounded-full bg-booyah-purple/30 flex items-center justify-center">
              <Trophy className="h-12 w-12 text-booyah-fire" />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Create Your Own Tournament</h3>
              <p className="text-muted-foreground mb-4">
                Are you a clan leader or content creator? Host your own tournament with custom rules and prizes.
              </p>
            </div>
            
            <Button variant="fire" size="lg">
              Create Tournament
            </Button>
          </div>
        </div>

        {/* Tournament rules and info */}
        <div className="glass-effect p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Tournament Information</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-booyah-neon-blue" />
                General Rules
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground pl-5">
                <li>All team members must be registered on BooyahZone</li>
                <li>Players must be at least 16 years old to participate</li>
                <li>Teams must check in 30 minutes before tournament start</li>
                <li>Fair play and sportsmanship are required</li>
                <li>Tournament admins' decisions are final</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-booyah-neon-blue" />
                How to Join
              </h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground pl-5">
                <li>Register for the tournament</li>
                <li>Form your team or join solo (depending on tournament type)</li>
                <li>Check your email/notifications for confirmation</li>
                <li>Join our Discord server for tournament communication</li>
                <li>Check in on tournament day</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
