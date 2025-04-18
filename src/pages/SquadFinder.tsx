
import { Layout } from "@/components/Layout";
import { SquadFinderSection } from "@/components/SquadFinderSection";
import { GameBackground } from "@/components/GameBackground";
import { FPSHudElements } from "@/components/FPSHudElements";

export default function SquadFinder() {
  return (
    <div className="relative min-h-screen">
      <GameBackground />
      <Layout>
        <div className="relative z-10">
          <FPSHudElements />
          <div className="fps-container">
            <SquadFinderSection />
          </div>
        </div>
      </Layout>
    </div>
  );
}
