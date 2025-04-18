
import React from 'react';
import { Shield, Users, Zap, Target, Crosshair, Flame } from 'lucide-react';

export const FPSHudElements: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {/* Crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 z-50">
        <Crosshair className="w-full h-full text-white/80" />
      </div>
      
      {/* Top left HUD - Player stats */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-md border border-booyah-purple/30">
          <Shield className="w-4 h-4 text-booyah-purple" />
          <div className="text-xs text-white">
            <div className="w-40 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-red-500 to-booyah-fire" style={{ width: '85%' }}></div>
            </div>
            <span className="text-xs text-white/80">85/100</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-md border border-booyah-purple/30">
          <Zap className="w-4 h-4 text-booyah-neon-blue" />
          <div className="text-xs text-white">
            <div className="w-40 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-booyah-neon-blue" style={{ width: '60%' }}></div>
            </div>
            <span className="text-xs text-white/80">60/100</span>
          </div>
        </div>
      </div>
      
      {/* Top right HUD - Squad info */}
      <div className="absolute top-4 right-4">
        <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-md border border-booyah-purple/30">
          <Users className="w-4 h-4 text-booyah-neon-orange" />
          <span className="text-xs text-white">3/4 SQUAD</span>
        </div>
      </div>
      
      {/* Bottom left HUD - Weapon */}
      <div className="absolute bottom-4 left-4">
        <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-md border border-booyah-purple/30">
          <Target className="w-4 h-4 text-accent" />
          <span className="text-xs text-white">30 / 90</span>
        </div>
      </div>
      
      {/* Bottom right HUD - Score */}
      <div className="absolute bottom-4 right-4">
        <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-md border border-booyah-purple/30">
          <Flame className="w-4 h-4 text-booyah-fire" />
          <span className="text-xs text-white">KILLS: 12</span>
        </div>
      </div>
    </div>
  );
};
