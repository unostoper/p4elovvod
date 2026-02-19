import { Skull, Send } from "lucide-react";
import { useState, useEffect } from "react";

interface NavbarProps {
  onTrialClick: () => void;
}

const Navbar = ({ onTrialClick }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skull className="w-6 h-6 text-gold" />
          <span className="font-display font-bold text-lg tracking-wide uppercase text-foreground">
            VPN Pirate
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-body text-foreground/70">
          <a href="#offers" className="hover:text-gold transition-colors">Ключи</a>
          <a href="#pricing" className="hover:text-gold transition-colors">Тарифы</a>
          <a href="#how" className="hover:text-gold transition-colors">Как работает</a>
          <a href="https://t.me/unostoper" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors flex items-center gap-1">
            <Send className="w-3.5 h-3.5" /> Telegram
          </a>
        </div>

        <a
          href="https://t.me/unostoper"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 border border-gold text-gold font-display font-semibold text-sm rounded-full hover:bg-gold hover:text-background transition-colors"
        >
          Купить
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
