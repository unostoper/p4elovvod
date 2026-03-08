import { Shield, Globe, Plus } from "lucide-react";

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 px-4" aria-label="Тарифы VPN-ключей">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-4">
          Тарифы
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
          Прозрачные цены. Без скрытых платежей.
        </p>

        {/* Tariffs */}
        <div className="mb-10" role="region" aria-label="Тарифы VPN">
          <div className="grid sm:grid-cols-2 gap-4">
            <PriceCard days={30} traffic="300 ГБ" price={250} label="VPN" />
            <PriceCard days={90} traffic="1 ТБ" price={650} popular label="VPN" />
          </div>
        </div>

        {/* Extra traffic */}
        <div className="bg-surface border border-border rounded-xl p-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Plus className="w-5 h-5 text-gold" aria-hidden="true" />
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
            aria-label="Купить дополнительный трафик"
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
  label,
}: {
  days: number;
  traffic: string;
  price: number;
  popular?: boolean;
  label: string;
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
      aria-label={`Купить ${label} ключ на ${days} дней за ${price} рублей`}
      className="inline-block w-full text-center px-6 py-3 border border-gold text-gold font-display font-semibold rounded-lg hover:bg-gold hover:text-background transition-colors"
    >
      Выбрать
    </a>
  </div>
);

export default PricingSection;