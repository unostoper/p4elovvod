import { BookOpen, Send, ShoppingBag, Shield, Lock, Zap, Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollLink from "@/components/ScrollLink";
import { useSiteContent } from "@/hooks/useSiteContent";
import logoImg from "@/assets/logo.png";
import RadioPlayer from "@/components/landing/RadioPlayer";

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
    <section className="relative min-h-[90vh] flex flex-col overflow-hidden" aria-label="Главная — VPN-ключи без настроек">
      {/* Top nav */}
      <nav className="relative z-20 w-full border-b border-border/50 backdrop-blur-sm bg-background/80" aria-label="Основная навигация">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-3 shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <img src={logoImg} alt="VPN без мучений" className="w-8 h-8" />
              <span className="font-display font-bold text-gold text-sm tracking-wide hidden sm:inline">VPN без мучений</span>
            </Link>
            <RadioPlayer />
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <ScrollLink to="#offers" className="hover:text-gold transition-colors duration-200">Ключи</ScrollLink>
            <ScrollLink to="#pricing" className="hover:text-gold transition-colors duration-200">Тарифы</ScrollLink>
            <ScrollLink to="#cta" className="hover:text-gold transition-colors duration-200">Пробный ключ</ScrollLink>
            <Link to="/shop" className="flex items-center gap-1.5 hover:text-gold transition-colors duration-200">
              <ShoppingBag className="w-4 h-4" />
              Магазин
            </Link>
            <Link to="/blog" className="flex items-center gap-1.5 hover:text-gold transition-colors duration-200">
              <BookOpen className="w-4 h-4" />
              Блог
            </Link>
            <Link to="/free-key" className="flex items-center gap-1.5 hover:text-gold transition-colors duration-200">
              <Gamepad2 className="w-4 h-4" />
              Выиграй ключ
            </Link>
            <a
              href="https://t.me/unostoper"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-gold transition-colors duration-200"
            >
              <Send className="w-4 h-4" />
              Telegram
            </a>
          </div>
        </div>
      </nav>

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
