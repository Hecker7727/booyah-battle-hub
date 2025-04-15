
import { Layout } from "@/components/Layout";
import { HeroSection } from "@/components/HeroSection";
import { SquadFinderSection } from "@/components/SquadFinderSection";
import { ClipsSection } from "@/components/ClipsSection";
import { TournamentsSection } from "@/components/TournamentsSection";
import { NewsSection } from "@/components/NewsSection";
import { CommunitySection } from "@/components/CommunitySection";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const Index = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      <HeroSection />
      <SquadFinderSection />
      <ClipsSection />
      <TournamentsSection />
      <NewsSection />
      <CommunitySection />
      
      {/* Scroll to top button */}
      {showScrollToTop && (
        <Button
          variant="fire"
          size="icon"
          className="fixed bottom-6 right-6 rounded-full z-50 shadow-lg animate-fire"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </Layout>
  );
};

export default Index;
