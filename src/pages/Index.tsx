import { useState } from "react";
import { useBlockVisibility } from "@/hooks/useBlockVisibility";
import HeroSection from "@/components/landing/HeroSection";
import OffersSection from "@/components/landing/OffersSection";
import AdvantagesSection from "@/components/landing/AdvantagesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import ReviewsSection from "@/components/landing/ReviewsSection";
import NewsSection from "@/components/landing/NewsSection";
import PricingSection from "@/components/landing/PricingSection";
import CtaSection from "@/components/landing/CtaSection";
import SeoSection from "@/components/landing/SeoSection";
import FooterSection from "@/components/landing/FooterSection";
import TrialModal from "@/components/landing/TrialModal";
import PirateReveal from "@/components/landing/PirateReveal";

const Index = () => {
  const [trialOpen, setTrialOpen] = useState(false);
  const { visibility } = useBlockVisibility();
  const v = (id: string) => visibility[id] !== false;

  return (
    <>
      <main className="min-h-screen bg-background">
        {v("hero") && <HeroSection onTrialClick={() => setTrialOpen(true)} />}
        {v("offers") && (
          <PirateReveal animation="sail-in"><OffersSection /></PirateReveal>
        )}
        {v("pricing") && (
          <PirateReveal animation="anchor-drop"><PricingSection /></PirateReveal>
        )}
        {v("advantages") && (
          <PirateReveal animation="wave"><AdvantagesSection /></PirateReveal>
        )}
        {v("how_it_works") && (
          <PirateReveal animation="sail-in"><HowItWorksSection /></PirateReveal>
        )}
        {v("reviews") && (
          <PirateReveal animation="treasure-reveal"><ReviewsSection /></PirateReveal>
        )}
        {v("news") && (
          <PirateReveal animation="flag-unfurl"><NewsSection /></PirateReveal>
        )}
        {v("cta") && (
          <PirateReveal animation="wave"><CtaSection onTrialClick={() => setTrialOpen(true)} /></PirateReveal>
        )}
        {v("seo") && <SeoSection />}
        <FooterSection />
      </main>
      <TrialModal open={trialOpen} onOpenChange={setTrialOpen} />
    </>
  );
};

export default Index;
