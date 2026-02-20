import { useSiteContent } from "@/hooks/useSiteContent";

interface CtaSectionProps {
  onTrialClick: () => void;
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
    <section id="cta" className="py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-muted-foreground mb-10 max-w-md mx-auto">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://t.me/unostoper" target="_blank" rel="noopener noreferrer"
            className="px-8 py-4 bg-primary text-primary-foreground font-display font-semibold text-lg rounded-lg hover:opacity-90 transition-opacity gold-glow">
            {ctaPrimary}
          </a>
          <a href="https://t.me/unostoper" target="_blank" rel="noopener noreferrer"
            className="px-8 py-4 border border-border text-foreground font-display font-semibold text-lg rounded-lg hover:border-gold hover:text-gold transition-colors">
            {ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
