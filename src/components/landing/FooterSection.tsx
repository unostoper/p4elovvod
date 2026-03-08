import { BookOpen, Send, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollLink from "@/components/ScrollLink";

const FooterSection = () => {
  return (
    <footer className="py-12 px-4 border-t border-border" role="contentinfo">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="font-display font-bold text-lg text-gold mb-1">VPN без мучений</p>
            <p className="text-muted-foreground text-sm">Готовые VPN-ключи VLESS и Outline • Поддержка 24/7</p>
          </div>

          <nav aria-label="Навигация по разделам" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <a href="#offers" className="hover:text-gold transition-colors">Ключи</a>
            <a href="#pricing" className="hover:text-gold transition-colors">Тарифы</a>
            <a href="#cta" className="hover:text-gold transition-colors">Пробный ключ</a>
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
              className="flex items-center gap-2 hover:text-gold transition-colors"
            >
              <Send className="w-4 h-4" />
              Telegram
            </a>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center text-muted-foreground text-xs">
          © {new Date().getFullYear()} VPN без мучений — купить VPN-ключ VLESS и Outline. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;