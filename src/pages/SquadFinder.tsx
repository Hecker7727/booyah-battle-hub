
import { Layout } from "@/components/Layout";
import { SquadFinderSection } from "@/components/SquadFinderSection";
import { GameBackground } from "@/components/GameBackground";
import { FPSHudElements } from "@/components/FPSHudElements";

export default function SquadFinder() {
  return (
    <>
      <GameBackground />
      <FPSHudElements />
      <Layout>
        <div className="fps-container">
          <SquadFinderSection />
        </div>
      </Layout>
    </>
  );
}
