import { Plus, Gift, Send } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const card = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const PricingSection = ({ onBuyClick }: { onBuyClick?: (label?: string) => void }) => {
  return (
    <section className="py-20 px-4" aria-label="Тарифы VPN-ключей">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl sm:text-4xl font-bold text-center mb-4"
        >
          Тарифы
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground text-center mb-12 max-w-lg mx-auto"
        >
          Прозрачные цены. Без скрытых платежей.
        </motion.p>

        {/* Tariffs */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-10"
          role="region"
          aria-label="Тарифы VPN"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <PriceCard days={30} traffic="300 ГБ" price={250} label="VPN" index={0} onBuyClick={onBuyClick} />
            <PriceCard days={90} traffic="1 ТБ" price={650} popular label="VPN" index={1} onBuyClick={onBuyClick} />
          </div>
        </motion.div>

        {/* Telegram Proxy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-xl sm:text-2xl font-bold text-center mb-2 flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5 text-gold" />
            Персональный прокси для Telegram
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-center mb-6 max-w-md mx-auto text-sm"
          >
            Стабильный доступ к Telegram без VPN. Личный прокси — только для тебя.
          </motion.p>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <PriceCard days={30} traffic="" price={100} label="Telegram-прокси" index={2} onBuyClick={onBuyClick} icon="telegram" />
              <PriceCard days={90} traffic="" price={300} popular label="Telegram-прокси" index={3} onBuyClick={onBuyClick} icon="telegram" />
            </div>
          </motion.div>
        </motion.div>

        {/* Promo: 4+1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ y: -2 }}
          className="bg-gradient-to-r from-gold/5 to-gold/10 border-2 border-gold/30 rounded-xl p-6 flex items-center justify-between flex-wrap gap-4 mb-4 relative overflow-hidden"
        >
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-[10px] font-display font-bold px-2.5 py-0.5 rounded-full">
            АКЦИЯ
          </div>
          <div className="flex items-center gap-3">
            <Gift className="w-6 h-6 text-gold" aria-hidden="true" />
            <div>
              <span className="font-display font-bold text-lg">4 + 1 = бесплатно</span>
              <p className="text-muted-foreground text-sm">Купи 4 ключа — 5-й в подарок</p>
            </div>
          </div>
          <button
            onClick={() => onBuyClick?.("4+1 ключей")}
            className="px-6 py-3 bg-primary text-primary-foreground font-display font-bold rounded-lg hover:opacity-90 transition-opacity text-sm btn-shine gold-glow"
          >
            Забрать 5 ключей
          </button>
        </motion.div>

        {/* Extra traffic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ y: -2 }}
          className="bg-surface border border-border rounded-xl p-6 flex items-center justify-between flex-wrap gap-4"
        >
          <div className="flex items-center gap-3">
            <Plus className="w-5 h-5 text-gold" aria-hidden="true" />
            <span className="font-display font-semibold">Дополнительный трафик</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-2xl font-bold text-gold">250 ₽</span>
            <span className="text-muted-foreground text-sm">/ 1 ТБ</span>
          </div>
          <button
            onClick={() => onBuyClick?.("Дополнительный трафик — 1 ТБ")}
            className="px-6 py-2 border border-gold text-gold font-display font-semibold rounded-lg hover:bg-gold hover:text-background transition-colors text-sm btn-shine"
          >
            Купить
          </button>
        </motion.div>
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
  index,
  onBuyClick,
  icon,
}: {
  days: number;
  traffic: string;
  price: number;
  popular?: boolean;
  label: string;
  index: number;
  onBuyClick?: (label?: string) => void;
  icon?: string;
}) => (
  <motion.div
    variants={card}
    whileHover={{ y: -4, boxShadow: popular ? "0 0 40px hsl(42 90% 55% / 0.15)" : "0 4px 20px hsl(0 0% 0% / 0.2)" }}
    className={`bg-surface rounded-xl p-6 border ${
      popular ? "border-gold/30 gold-glow" : "border-border"
    } relative hover:border-gold/20 transition-colors`}
  >
    {popular && (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.5 }}
        className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-display font-semibold px-3 py-1 rounded-full"
      >
        Выгодно
      </motion.div>
    )}
    <div className="flex items-center gap-2 font-display text-lg font-bold mb-1">
      {icon === "telegram" && <Send className="w-4 h-4 text-gold" />}
      {days} дней
    </div>
    {traffic ? (
      <div className="text-muted-foreground text-sm mb-4">{traffic}</div>
    ) : (
      <div className="text-muted-foreground text-sm mb-4">Персональный прокси</div>
    )}
    <div className="flex items-baseline gap-1 mb-5">
      <span className="font-display text-3xl font-bold text-gold">{price} ₽</span>
    </div>
    <button
      onClick={() => onBuyClick?.(`${label} — ${days} дней${traffic ? `, ${traffic}` : ""}`)}
      className="inline-block w-full text-center px-6 py-3 border border-gold text-gold font-display font-semibold rounded-lg hover:bg-gold hover:text-background transition-colors btn-shine"
    >
      Выбрать
    </button>
  </motion.div>
);

export default PricingSection;
