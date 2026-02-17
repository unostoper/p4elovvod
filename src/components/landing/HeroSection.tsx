import { Ambulance } from "lucide-react";

interface HeroSectionProps {
  onTrialClick: () => void;
}

const HeroSection = ({ onTrialClick }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(hsl(var(--gold)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--gold)) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 text-gold mb-8 opacity-60">
          <Ambulance className="w-5 h-5" />
          <span className="font-display text-sm tracking-widest uppercase">VPN без мучений</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 text-balance">
          Интернет должен работать, а не бороться с&nbsp;вами
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-xl mx-auto text-balance">
          Готовые VPN‑ключи без настроек и переключений. Подключил&nbsp;— и всё работает.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://t.me/unostoper"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-primary text-primary-foreground font-display font-semibold text-lg rounded-lg hover:opacity-90 transition-opacity gold-glow">

            Получить пробный ключ
          </a>
          <a
            href="https://t.me/unostoper"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border border-border text-foreground font-display font-semibold text-lg rounded-lg hover:border-gold hover:text-gold transition-colors">

            Купить ключ
          </a>
        </div>
      </div>
    </section>);

};

export default HeroSection;