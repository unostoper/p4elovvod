import { useState } from "react";
import { useBlockVisibility } from "@/hooks/useBlockVisibility";
import { useBlockBackgrounds } from "@/hooks/useBlockBackgrounds";
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
  const bg = useBlockBackgrounds();
  const v = (id: string) => visibility[id] !== false;
  const bgStyle = (id: string) => bg[id] ? { background: bg[id] } : undefined;

  return (
    <>
      <main className="min-h-screen bg-background">
        {v("hero") && <div style={bgStyle("hero")}><HeroSection onTrialClick={() => setTrialOpen(true)} /></div>}
        {v("offers") && (
          <div style={bgStyle("offers")}><PirateReveal animation="sail-in"><OffersSection /></PirateReveal></div>
        )}
        {v("pricing") && (
          <div id="pricing-anchor" style={bgStyle("pricing")}><PirateReveal animation="anchor-drop"><PricingSection /></PirateReveal></div>
        )}
        {v("advantages") && (
          <div style={bgStyle("advantages")}><PirateReveal animation="wave"><AdvantagesSection /></PirateReveal></div>
        )}
        {v("how_it_works") && (
          <div style={bgStyle("how_it_works")}><PirateReveal animation="sail-in"><HowItWorksSection /></PirateReveal></div>
        )}
        {v("reviews") && (
          <div style={bgStyle("reviews")}><PirateReveal animation="treasure-reveal"><ReviewsSection /></PirateReveal></div>
        )}
        {v("news") && (
          <div style={bgStyle("news")}><PirateReveal animation="flag-unfurl"><NewsSection /></PirateReveal></div>
        )}
        {v("cta") && (
          <div style={bgStyle("cta")}><PirateReveal animation="wave"><CtaSection onTrialClick={() => setTrialOpen(true)} /></PirateReveal></div>
        )}
        {v("seo") && <div style={bgStyle("seo")}><SeoSection /></div>}
        <FooterSection />
      </main>
      <TrialModal open={trialOpen} onOpenChange={setTrialOpen} />
    </>
  );
};

export default Index;
