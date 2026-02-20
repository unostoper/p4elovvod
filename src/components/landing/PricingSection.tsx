import { Youtube, Globe, Plus } from "lucide-react";

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-4">
          Тарифы
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
          Прозрачные цены. Без скрытых платежей.
        </p>

        {/* YouTube tariffs */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Youtube className="w-5 h-5 text-gold" />
            </div>
            <h3 className="font-display text-xl font-bold">Ключ для YouTube</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <PriceCard days={30} traffic="400 ГБ" price={250} />
            <PriceCard days={90} traffic="1200 ГБ" price={650} popular />
          </div>
        </div>

        {/* VPN tariffs */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-gold" />
            </div>
            <h3 className="font-display text-xl font-bold">VPN‑ключ</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <PriceCard days={30} traffic="300 ГБ" price={250} />
            <PriceCard days={90} traffic="900 ГБ" price={650} popular />
          </div>
        </div>

        {/* Extra traffic */}
        <div className="bg-surface border border-border rounded-xl p-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Plus className="w-5 h-5 text-gold" />
            <span className="font-display font-semibold">Дополнительный трафик</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-2xl font-bold text-gold">250 ₽</span>
            <span className="text-muted-foreground text-sm">/ 1 ТБ</span>
          </div>
          <a
            href="https://t.me/unostoper"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 border border-gold text-gold font-display font-semibold rounded-lg hover:bg-gold hover:text-background transition-colors text-sm"
          >
            Купить
          </a>
        </div>
      </div>
    </section>
  );
};

const PriceCard = ({
  days,
  traffic,
  price,
  popular,
}: {
  days: number;
  traffic: string;
  price: number;
  popular?: boolean;
}) => (
  <div
    className={`bg-surface rounded-xl p-6 border ${
      popular ? "border-gold/30 gold-glow" : "border-border"
    } relative hover:border-gold/20 transition-colors`}
  >
    {popular && (
      <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-display font-semibold px-3 py-1 rounded-full">
        Выгодно
      </div>
    )}
    <div className="font-display text-lg font-bold mb-1">{days} дней</div>
    <div className="text-muted-foreground text-sm mb-4">{traffic}</div>
    <div className="flex items-baseline gap-1 mb-5">
      <span className="font-display text-3xl font-bold text-gold">{price} ₽</span>
    </div>
    <a
      href="https://t.me/unostoper"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block w-full text-center px-6 py-3 border border-gold text-gold font-display font-semibold rounded-lg hover:bg-gold hover:text-background transition-colors"
    >
      Выбрать
    </a>
  </div>
);

export default PricingSection;
