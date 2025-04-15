
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Calendar, Users, Flame, Clock } from "lucide-react";

export function TournamentsSection() {
  const upcomingTournaments = [
    {
      id: 1,
      title: "Weekly Showdown",
      description: "Join our weekly competition for Free Fire supremacy. Solo & Squad modes.",
      date: "April 20, 2025",
      time: "8:00 PM GMT",
      prize: "5000 Diamonds",
      participants: 64,
      status: "registering"
    },
    {
      id: 2,
      title: "Pro League Season 5",
      description: "The prestigious tournament returns with an increased prize pool.",
      date: "May 5-12, 2025",
      time: "Various",
      prize: "25000 Diamonds + Gaming Gear",
      participants: 128,
      status: "upcoming"
    },
    {
      id: 3,
      title: "Booyah Classic",
      description: "Our monthly tournament with custom rules and special rewards.",
      date: "April 30, 2025",
      time: "7:00 PM GMT",
      prize: "10000 Diamonds",
      participants: 96,
      status: "registering"
    }
  ];

  return (
    <section className="py-16 relative">
      {/* Background effects */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 70% 20%, rgba(234, 56, 76, 0.15) 0%, rgba(0, 0, 0, 0) 60%)
          `
        }}
      ></div>
      
      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <Badge variant="fire" className="mb-4">Tournaments & Events</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Compete & <span className="text-booyah-fire animate-flicker">Conquer</span>
          </h2>
          <p className="text-muted-foreground max-w-[600px]">
            Join exciting tournaments, climb the leaderboards, and win amazing prizes while showcasing your skills.
          </p>
        </div>

        {/* Featured tournament */}
        <div className="neon-card mb-12 overflow-hidden border border-booyah-purple/30">
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-video md:aspect-auto">
              <img 
                src="https://images.unsplash.com/photo-1500673922987-e212871fec22" 
                alt="Tournament banner" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent"></div>
              <div className="absolute top-4 left-4">
                <Badge variant="fire" className="animate-fire">FEATURED</Badge>
              </div>
              <div className="absolute bottom-4 left-4 right-4 md:hidden">
                <h3 className="text-xl font-bold">Regional Championship</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">The biggest Free Fire tournament of the year with massive prizes!</p>
              </div>
            </div>

            <div className="p-6 md:p-8 flex flex-col">
              <div className="mb-auto">
                <div className="hidden md:block">
                  <h3 className="text-2xl font-bold mb-2">Regional Championship</h3>
                  <p className="text-muted-foreground mb-6">
                    The biggest Free Fire tournament of the year with massive prizes and global recognition. Qualify now!
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-booyah-neon-blue" />
                    <span className="text-sm">May 15-22, 2025</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-booyah-neon-blue" />
                    <span className="text-sm">6:00 PM GMT</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-booyah-neon-blue" />
                    <span className="text-sm">256 Teams</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-booyah-fire" />
                    <span className="text-sm font-semibold">$50,000 Prize Pool</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-x-4">
                <Button variant="fire">
                  Register Now
                </Button>
                <Button variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming tournaments */}
        <h3 className="text-2xl font-bold mb-6">Upcoming Tournaments</h3>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {upcomingTournaments.map((tournament) => (
            <div key={tournament.id} className="neon-card overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-bold">{tournament.title}</h4>
                  {tournament.status === "registering" ? (
                    <Badge variant="neon">Registering</Badge>
                  ) : (
                    <Badge variant="outline">Upcoming</Badge>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {tournament.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{tournament.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{tournament.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Trophy className="h-4 w-4 text-booyah-fire" />
                    <span className="font-semibold">{tournament.prize}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{tournament.participants} Participants</span>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  {tournament.status === "registering" ? (
                    <Button variant="neon" className="w-full">Register</Button>
                  ) : (
                    <Button variant="outline" className="w-full">Reminder</Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button variant="booyah">View All Tournaments</Button>
        </div>
      </div>
    </section>
  );
}
