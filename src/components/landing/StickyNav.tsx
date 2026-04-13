import { BookOpen, Send, ShoppingBag, Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollLink from "@/components/ScrollLink";
import RadioPlayer from "@/components/landing/RadioPlayer";
import logoImg from "@/assets/pirate-flag.png";

const StickyNav = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 backdrop-blur-sm bg-background/80" aria-label="Основная навигация">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-3 shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImg} alt="VPN без мучений" className="w-12 h-12" />
            <span className="font-display font-bold text-gold text-sm tracking-wide hidden sm:inline">VPN без мучений</span>
          </Link>
          <RadioPlayer />
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
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
  );
};

export default StickyNav;
