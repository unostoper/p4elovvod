import { Mail, Send } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="py-12 px-4 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="font-display font-bold text-lg text-gold mb-1">VPN без мучений</p>
            <p className="text-muted-foreground text-sm">Поддержка 24/7 - ну, почти :)</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
            <a
              href="mailto:support@example.com"
              className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors">

              <Mail className="w-4 h-4" />
              support@example.com
            </a>
            <a

              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors" href="https://t.me/unostoper">

              <Send className="w-4 h-4" />
              Telegram
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center text-muted-foreground text-xs">
          © {new Date().getFullYear()} VPN без мучений. Все права защищены. Ну или почти все.
        </div>
      </div>
    </footer>);

};

export default FooterSection;