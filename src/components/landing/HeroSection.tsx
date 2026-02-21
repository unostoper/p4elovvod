import { Ambulance } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

interface HeroSectionProps {
  onTrialClick: () => void;
}

interface HeroContent {
  badge: string;
  title: string;
  subtitle: string;
  cta_primary: string;
  cta_secondary: string;
}

const HeroSection = ({ onTrialClick }: HeroSectionProps) => {
  const { data } = useSiteContent<HeroContent>("hero");

  const badge = data?.badge ?? "VPN без мучений";
  const title = data?.title ?? "Интернет должен работать, а не бороться с\u00a0вами";
  const subtitle = data?.subtitle ?? "Готовые VPN‑ключи без настроек и переключений. Подключил\u00a0— и всё работает.";
  const ctaPrimary = data?.cta_primary ?? "Получить пробный ключ";
  const ctaSecondary = data?.cta_secondary ?? "Купить ключ";

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(hsl(var(--gold)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--gold)) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 text-gold mb-8 opacity-60">
          <Ambulance className="w-5 h-5" />
          <span className="font-display text-sm tracking-widest uppercase">{badge}</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 text-balance">
          {title}
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-xl mx-auto text-balance">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={onTrialClick}
          className="px-8 py-4 bg-primary text-primary-foreground font-display font-semibold text-lg rounded-lg hover:opacity-90 transition-opacity gold-glow">
            {ctaPrimary}
          </button>
          <a href="https://t.me/unostoper" target="_blank" rel="noopener noreferrer"
          className="px-8 py-4 border border-border text-foreground font-display font-semibold text-lg rounded-lg hover:border-gold hover:text-gold transition-colors">
            {ctaSecondary}
          </a>
        </div>
      </div>
    </section>);

};

export default HeroSection;