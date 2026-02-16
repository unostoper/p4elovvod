import { Shield, Zap, Wifi, Cat } from "lucide-react";
import { useState } from "react";
import HeroSection from "@/components/landing/HeroSection";
import OffersSection from "@/components/landing/OffersSection";
import AdvantagesSection from "@/components/landing/AdvantagesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import ReviewsSection from "@/components/landing/ReviewsSection";
import CtaSection from "@/components/landing/CtaSection";
import SeoSection from "@/components/landing/SeoSection";
import FooterSection from "@/components/landing/FooterSection";
import TrialModal from "@/components/landing/TrialModal";

const Index = () => {
  const [trialOpen, setTrialOpen] = useState(false);

  return (
    <>
      <main className="min-h-screen bg-background">
        <HeroSection onTrialClick={() => setTrialOpen(true)} />
        <OffersSection />
        <AdvantagesSection />
        <HowItWorksSection />
        <ReviewsSection />
        <CtaSection onTrialClick={() => setTrialOpen(true)} />
        <SeoSection />
        <FooterSection />
      </main>
      <TrialModal open={trialOpen} onOpenChange={setTrialOpen} />
    </>
  );
};

export default Index;
