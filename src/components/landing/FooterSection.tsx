import { Send, Anchor } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="py-10 px-4 border-t border-border/30">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <Anchor className="w-5 h-5 text-gold" />
          <span className="font-display font-bold text-sm tracking-wide uppercase">
          </span>
        </div>

        <div className="flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#offers" className="hover:text-gold transition-colors">Ключи</a>
          <a href="#pricing" className="hover:text-gold transition-colors">Тарифы</a>
          <a href="#how" className="hover:text-gold transition-colors">Как работает</a>
        </div>

        <a href="https://t.me/unostoper"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-5 py-2 border border-gold text-gold font-display font-semibold text-sm rounded-full hover:bg-gold hover:text-background transition-colors">

          <Send className="w-3.5 h-3.5" /> Telegram
        </a>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-border/20 text-center text-muted-foreground text-xs">
        © {new Date().getFullYear()} VPN Pirate. Все права защищены. Ну или почти все.
      </div>
    </footer>);

};

export default FooterSection;