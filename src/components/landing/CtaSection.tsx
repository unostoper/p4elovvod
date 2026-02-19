import { useSiteContent } from "@/hooks/useSiteContent";
import ctaBg from "@/assets/cta-pirate-bg.jpg";

interface CtaSectionProps {
  onTrialClick: () => void;
}

interface CtaContent {
  title: string;
  subtitle: string;
  cta_primary: string;
  cta_secondary: string;
}

const CtaSection = ({ onTrialClick }: CtaSectionProps) => {
  const { data } = useSiteContent<CtaContent>("cta");

  const title = data?.title ?? "Хочешь попробовать, но ещё думаешь?";
  const subtitle = data?.subtitle ?? "Пробный ключ — бесплатный.";
  const ctaPrimary = data?.cta_primary ?? "Получить пробный ключ";
  const ctaSecondary = data?.cta_secondary ?? "Купить ключ";

  return (
    <section id="cta" className="relative py-24 px-4 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={ctaBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="bg-background/60 backdrop-blur-md border border-border/50 rounded-2xl p-8 sm:p-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground mb-8 max-w-md">{subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://t.me/unostoper" target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 bg-gold text-background font-display font-semibold text-lg rounded-lg hover:opacity-90 transition-opacity">
              {ctaPrimary}
            </a>
            <a href="https://t.me/unostoper" target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 border border-gold text-gold font-display font-semibold text-lg rounded-lg hover:bg-gold hover:text-background transition-colors">
              {ctaSecondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
