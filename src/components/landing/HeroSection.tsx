import { Ambulance, BookOpen, Send, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
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
    <section className="relative min-h-[90vh] flex flex-col overflow-hidden" aria-label="Главная — VPN-ключи без настроек">
      {/* Top nav */}
      <nav className="relative z-20 w-full border-b border-border/50" aria-label="Основная навигация">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <a href="#offers" className="hover:text-gold transition-colors">Ключи</a>
          <a href="#pricing" className="hover:text-gold transition-colors">Тарифы</a>
          <a href="#cta" className="hover:text-gold transition-colors">Пробный ключ</a>
          <Link to="/shop" className="flex items-center gap-1.5 hover:text-gold transition-colors">
            <ShoppingBag className="w-4 h-4" />
            Магазин
          </Link>
          <a
            href="https://t.me/unostoper"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-gold transition-colors"
          >
            <Send className="w-4 h-4" />
            Telegram
          </a>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4">
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
      </div>
    </section>);

};

export default HeroSection;