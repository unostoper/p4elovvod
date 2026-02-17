import { useState } from "react";
import HeroSection from "@/components/landing/HeroSection";
import OffersSection from "@/components/landing/OffersSection";
import AdvantagesSection from "@/components/landing/AdvantagesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import ReviewsSection from "@/components/landing/ReviewsSection";
import NewsSection from "@/components/landing/NewsSection";
import CtaSection from "@/components/landing/CtaSection";
import SeoSection from "@/components/landing/SeoSection";
import FooterSection from "@/components/landing/FooterSection";
import TrialModal from "@/components/landing/TrialModal";
import SkyAnimation from "@/components/landing/SkyAnimation";
import PirateReveal from "@/components/landing/PirateReveal";

const Index = () => {
  const [trialOpen, setTrialOpen] = useState(false);

  return (
    <>
      <main className="min-h-screen bg-background">
        <SkyAnimation />
        <HeroSection onTrialClick={() => setTrialOpen(true)} />
        <PirateReveal animation="sail-in">
          <OffersSection />
        </PirateReveal>
        <PirateReveal animation="anchor-drop">
          <AdvantagesSection />
        </PirateReveal>
        <PirateReveal animation="wave">
          <HowItWorksSection />
        </PirateReveal>
        <PirateReveal animation="treasure-reveal">
          <ReviewsSection />
        </PirateReveal>
        <PirateReveal animation="flag-unfurl">
          <NewsSection />
        </PirateReveal>
        <PirateReveal animation="wave">
          <CtaSection onTrialClick={() => setTrialOpen(true)} />
        </PirateReveal>
        <SeoSection />
        <FooterSection />
      </main>
      <TrialModal open={trialOpen} onOpenChange={setTrialOpen} />
    </>
  );
};

export default Index;
