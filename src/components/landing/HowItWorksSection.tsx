import { Key, Smartphone, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";

const ICONS = [Key, Smartphone, Globe];

interface HowContent {
  title: string;
  steps: { num: string; title: string; desc: string }[];
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const HowItWorksSection = () => {
  const { data } = useSiteContent<HowContent>("how_it_works");

  const title = data?.title ?? "Как это работает";
  const steps = data?.steps ?? [
    { num: "01", title: "Получаешь ключ", desc: "Пробный или платный." },
    { num: "02", title: "Вставляешь в приложение", desc: "Копировать - вставить." },
    { num: "03", title: "Интернет работает", desc: "Вот и всё." },
  ];

  return (
    <section className="py-20 px-4" aria-label="Как активировать VPN-ключ">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl sm:text-4xl font-bold text-center mb-12"
        >
          {title}
        </motion.h2>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {steps.map((step, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div key={i} variants={item} className="text-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 border border-gold/20 flex items-center justify-center"
                >
                  <Icon className="w-7 h-7 text-gold" />
                </motion.div>
                <span className="font-display text-gold text-sm tracking-widest">{step.num}</span>
                <h3 className="font-display font-semibold text-xl mt-2 mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
