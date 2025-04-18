
import { Layout } from "@/components/Layout";
import { SquadFinderSection } from "@/components/SquadFinderSection";
import { GameBackground } from "@/components/GameBackground";
import { FPSHudElements } from "@/components/FPSHudElements";

export default function SquadFinder() {
  return (
    <>
      <GameBackground />
      <Layout>
        <div className="relative z-10 min-h-screen">
          <FPSHudElements />
          <div className="container mx-auto">
            <SquadFinderSection />
          </div>
        </div>
      </Layout>
    </>
  );
}
