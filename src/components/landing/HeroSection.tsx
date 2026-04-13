import { Shield, Lock, Zap } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import logoImg from "@/assets/pirate-flag.png";

interface HeroSectionProps {
  onTrialClick: () => void;
  onBuyClick: () => void;
}

interface HeroContent {
  badge: string;
  title: string;
  subtitle: string;
  cta_primary: string;
  cta_secondary: string;
}

const HeroSection = ({ onTrialClick, onBuyClick }: HeroSectionProps) => {
  const { data } = useSiteContent<HeroContent>("hero");

  const badge = data?.badge ?? "VPN без мучений";
  const title = data?.title ?? "Интернет должен работать, а\u00a0не\u00a0бороться с\u00a0вами";
  const subtitle = data?.subtitle ?? "Готовые VPN‑ключи без настроек и переключений. Подключил\u00a0— и всё работает.";
  const ctaPrimary = data?.cta_primary ?? "Получить пробный ключ";
  const ctaSecondary = data?.cta_secondary ?? "Купить ключ";

  return (
    <section className="relative min-h-[85vh] flex flex-col overflow-hidden" aria-label="Главная — VPN-ключи без настроек">
      <div className="flex-1 flex items-center justify-center px-4">
        {/* Grid background */}
        <div className="absolute inset-0 bg-grid" />
        {/* Radial fade for grid */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,hsl(var(--background))_70%)]" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-gold mb-8 opacity-70">
            <img src={logoImg} alt="" className="w-6 h-6" />
            <span className="font-display text-sm tracking-widest uppercase font-semibold">{badge}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6 text-balance text-foreground">
            {title}
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-xl mx-auto text-balance leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={onTrialClick}
              className="btn-shine btn-lift px-8 py-4 bg-primary text-primary-foreground font-display font-bold text-lg rounded-lg gold-glow">
              {ctaPrimary}
            </button>
            <button onClick={onBuyClick}
              className="btn-lift px-8 py-4 border-2 border-gold/40 text-gold font-display font-bold text-lg rounded-lg hover:bg-gold hover:text-primary-foreground transition-all duration-300">
              {ctaSecondary}
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-muted-foreground text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-gold/70" />
              <span>Шифрование AES-256</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-gold/70" />
              <span>Без логов</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-gold/70" />
              <span>Активация за 30 сек</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
