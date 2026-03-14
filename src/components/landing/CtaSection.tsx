import { useSiteContent } from "@/hooks/useSiteContent";

interface CtaSectionProps {
  onTrialClick: () => void;
  onBuyClick: () => void;
}

interface CtaContent {
  title: string;
  subtitle: string;
  cta_primary: string;
  cta_secondary: string;
}

const CtaSection = ({ onTrialClick }: CtaSectionProps) => {
  const { data } = useSiteContent<CtaContent>("cta");

  const title = data?.title ?? "Попробуй и забудь о проблемах";
  const subtitle = data?.subtitle ?? "Пробный ключ — бесплатный.";
  const ctaPrimary = data?.cta_primary ?? "Получить пробный ключ";
  const ctaSecondary = data?.cta_secondary ?? "Купить ключ";

  return (
    <section className="py-24 px-4 relative overflow-hidden" aria-label="Получить пробный VPN-ключ бесплатно">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--gold)/0.05)_0%,transparent_60%)]" />
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">{title}</h2>
        <p className="text-muted-foreground mb-10 max-w-md mx-auto text-lg">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={onTrialClick}
            className="btn-shine btn-lift px-8 py-4 bg-primary text-primary-foreground font-display font-bold text-lg rounded-lg gold-glow">
            {ctaPrimary}
          </button>
          <a href="https://t.me/unostoper" target="_blank" rel="noopener noreferrer"
            className="btn-lift px-8 py-4 border-2 border-gold/40 text-gold font-display font-bold text-lg rounded-lg hover:bg-gold hover:text-primary-foreground transition-all duration-300">
            {ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
