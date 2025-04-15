
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UsersRound, Filter, Globe, Clock, Trophy } from "lucide-react";

export function SquadFinderSection() {
  return (
    <section className="py-16 relative">
      {/* Background effect */}
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

        <div className="glass-effect p-6 rounded-lg mb-12">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Featured Players Looking for Squads</h3>
              
              <div className="space-y-4">
                {[1, 2, 3].map((player) => (
                  <div key={player} className="flex items-center gap-4 p-3 bg-black/20 rounded-lg border border-booyah-purple/20 hover:border-booyah-purple/50 transition-colors">
                    <div className="h-12 w-12 rounded-full bg-booyah-purple/30 overflow-hidden">
                      <img src={`https://randomuser.me/api/portraits/men/${20 + player}.jpg`} alt="Player avatar" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">NinjaSlayer{player}2</span>
                        <Badge variant="fire" className="text-xs py-0">Heroic</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Rusher</span>
                        <span>•</span>
                        <span>Asia</span>
                        <span>•</span>
                        <span>Evening Player</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View Profile</Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6 justify-center items-center text-center p-6 bg-black/30 rounded-lg border border-booyah-neon-blue/30">
              <div className="h-16 w-16 rounded-full bg-booyah-purple/20 flex items-center justify-center mb-2">
                <Trophy className="h-8 w-8 text-booyah-fire" />
              </div>
              <h3 className="text-xl font-bold">Looking For Squad?</h3>
              <p className="text-muted-foreground">
                Register your profile now to find the perfect teammates for your next Booyah!
              </p>
              <Button variant="fire" className="w-full max-w-xs">Find Your Squad Now</Button>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button variant="neon">View All Players</Button>
        </div>
      </div>
    </section>
  );
}
