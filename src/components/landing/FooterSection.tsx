import { BookOpen, Send, ShoppingBag, Users } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollLink from "@/components/ScrollLink";
import { useVisitorCount } from "@/hooks/useTrackVisit";

const FooterSection = () => {
  const visitorCount = useVisitorCount();

  return (
    <footer className="py-8 px-4 border-t border-border" role="contentinfo">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-0">
          <div className="shrink-0 flex flex-col lg:flex-row lg:items-baseline gap-1 lg:gap-3 text-center lg:text-left">
            <p className="font-display font-bold text-base text-gold whitespace-nowrap">VPN без мучений</p>
            <p className="text-muted-foreground text-xs whitespace-nowrap">Готовые VPN-ключи VLESS и Outline • Поддержка 24/7</p>
          </div>

          <nav aria-label="Навигация по разделам" className="flex flex-wrap items-center justify-center lg:justify-end lg:ml-auto gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <ScrollLink to="#offers" className="hover:text-gold transition-colors">Ключи</ScrollLink>
            <ScrollLink to="#pricing" className="hover:text-gold transition-colors">Тарифы</ScrollLink>
            <ScrollLink to="#cta" className="hover:text-gold transition-colors">Пробный ключ</ScrollLink>
            <Link to="/shop" className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <ShoppingBag className="w-4 h-4" />
              Магазин
            </Link>
            <Link to="/blog" className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <BookOpen className="w-4 h-4" />
              Блог
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
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-muted-foreground text-xs">
          <span>© {new Date().getFullYear()} VPN без мучений — купить VPN-ключ VLESS и Outline. Все права защищены.</span>
          {visitorCount !== null && (
            <span className="flex items-center gap-1.5 text-muted-foreground/70">
              <Users className="w-3.5 h-3.5" />
              {visitorCount.toLocaleString("ru-RU")}
            </span>
          )}
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
