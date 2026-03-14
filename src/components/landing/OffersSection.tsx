import { Shield, Globe, Check } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const card = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const cardRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const listItem = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

const OffersSection = ({ onBuyClick }: { onBuyClick?: (label?: string) => void }) => {
  return (
    <section className="py-20 px-4" aria-label="Выбор VPN-ключа">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl sm:text-4xl font-bold text-center mb-4"
        >
          Выберите свой ключ
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground text-center mb-12 max-w-lg mx-auto"
        >
          Два типа ключей. Оба работают. Выбирайте тот, что ближе к&nbsp;сердцу.
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 gap-6 items-stretch"
        >
          {/* Outline Key */}
          <motion.article
            variants={card}
            whileHover={{ y: -4 }}
            className="bg-surface rounded-xl p-8 border border-border hover:border-gold/30 transition-colors group flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center"
              >
                <Shield className="w-6 h-6 text-gold" aria-hidden="true" />
              </motion.div>
              <h3 className="font-display text-2xl font-bold">Ключ для Outline</h3>
            </div>
            <motion.ul
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
              className="space-y-3 mb-8 flex-grow"
            >
              {["Youtube без рекламы", "Максимальная скорость вашего провайдера", "Стабильный доступ без танцев с серверами"].map((item) => (
                <motion.li key={item} variants={listItem} className="flex items-start gap-3 text-secondary-foreground">
                  <Check className="w-5 h-5 text-gold mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
            <button
              onClick={() => onBuyClick?.("Ключ для Outline")}
              className="inline-block w-full text-center px-6 py-3 border border-gold text-gold font-display font-semibold rounded-lg hover:bg-gold hover:text-background transition-colors btn-shine"
            >
              Выбрать
            </button>
          </motion.article>

          {/* VLESS Key */}
          <motion.article
            variants={cardRight}
            whileHover={{ y: -4 }}
            className="bg-surface rounded-xl p-8 border border-gold/30 gold-glow group relative flex flex-col"
          >
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-display font-semibold px-3 py-1 rounded-full">
              Популярный
            </div>
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                whileHover={{ rotate: -10, scale: 1.1 }}
                className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center"
              >
                <Globe className="w-6 h-6 text-gold" aria-hidden="true" />
              </motion.div>
              <h3 className="font-display text-2xl font-bold">Vless ключ</h3>
            </div>
            <motion.ul
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
              className="space-y-3 mb-8 flex-grow"
            >
              {["Ограниченный трафик защищает скорость", "Неограниченное количество устройств", "Современные протоколы шифрования"].map((item) => (
                <motion.li key={item} variants={listItem} className="flex items-start gap-3 text-secondary-foreground">
                  <Check className="w-5 h-5 text-gold mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
            <a
              href="https://t.me/unostoper"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Купить Vless ключ в Telegram"
              className="inline-block w-full text-center px-6 py-3 border border-gold text-gold font-display font-semibold rounded-lg hover:bg-gold hover:text-background transition-colors btn-shine"
            >
              Выбрать
            </a>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
};

export default OffersSection;
