
import React from 'react';
import { Shield, Users, Zap, Target, Crosshair, Flame } from 'lucide-react';

export const FPSHudElements: React.FC = () => {
  return (
    <>
      {/* Crosshair */}
      <div className="target-cursor w-8 h-8">
        <Crosshair className="w-full h-full text-white/80" />
      </div>
      
      {/* Top left HUD - Player stats */}
      <div className="hud-top-left flex flex-col gap-2">
        <div className="ammo-counter">
          <Shield className="w-4 h-4 text-booyah-purple" />
          <div className="text-xs text-white">
            <div className="health-bar">
              <div className="health-fill" style={{ width: '85%' }}></div>
            </div>
            <span className="text-xs text-white/80">85/100</span>
          </div>
        </div>
        
        <div className="ammo-counter">
          <Zap className="w-4 h-4 text-booyah-neon-blue" />
          <div className="text-xs text-white">
            <div className="health-bar">
              <div className="health-fill bg-gradient-to-r from-blue-500 to-booyah-neon-blue" style={{ width: '60%' }}></div>
            </div>
            <span className="text-xs text-white/80">60/100</span>
          </div>
        </div>
      </div>
      
      {/* Top right HUD - Squad info */}
      <div className="hud-top-right">
        <div className="ammo-counter">
          <Users className="w-4 h-4 text-booyah-neon-orange" />
          <span className="text-xs text-white">3/4 SQUAD</span>
        </div>
      </div>
      
      {/* Bottom left HUD - Weapon */}
      <div className="hud-bottom-left">
        <div className="ammo-counter">
          <Target className="w-4 h-4 text-accent" />
          <span className="text-xs text-white">30 / 90</span>
        </div>
      </div>
      
      {/* Bottom right HUD - Score */}
      <div className="hud-bottom-right">
        <div className="ammo-counter">
          <Flame className="w-4 h-4 text-booyah-fire" />
          <span className="text-xs text-white">KILLS: 12</span>
        </div>
      </div>
    </>
  );
};
