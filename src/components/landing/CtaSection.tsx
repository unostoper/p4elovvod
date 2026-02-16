interface CtaSectionProps {
  onTrialClick: () => void;
}

const CtaSection = ({ onTrialClick }: CtaSectionProps) => {
  return (
    <section id="cta" className="py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
          Попробуйте и забудьте о проблемах
        </h2>
        <p className="text-muted-foreground mb-10 max-w-md mx-auto">
          Пробный ключ бесплатный. Если не понравится — ну, хотя бы попробовали.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://t.me/unostoper"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-primary text-primary-foreground font-display font-semibold text-lg rounded-lg hover:opacity-90 transition-opacity gold-glow"
          >
            Получить пробный ключ
          </a>
          <a
            href="https://t.me/unostoper"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border border-border text-foreground font-display font-semibold text-lg rounded-lg hover:border-gold hover:text-gold transition-colors"
          >
            Купить ключ
          </a>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
