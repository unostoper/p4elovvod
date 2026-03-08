import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";

interface ReviewsContent {
  title: string;
  items: { name: string; text: string }[];
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const card = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const ReviewsSection = () => {
  const { data } = useSiteContent<ReviewsContent>("reviews");

  const title = data?.title ?? "Что говорят почти живые люди";
  const items = data?.items ?? [];

  return (
    <section className="py-20 px-4 bg-surface-raised" aria-label="Отзывы о VPN-ключах">
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
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {items.map((r, i) => (
            <motion.div
              key={i}
              variants={card}
              whileHover={{ y: -4, boxShadow: "0 8px 30px hsl(42 90% 55% / 0.1)" }}
              className="bg-surface border border-border rounded-xl p-6 relative cursor-default"
            >
              <Quote className="w-6 h-6 text-gold/30 absolute top-4 right-4" />
              <p className="text-secondary-foreground mb-4 text-sm leading-relaxed">«{r.text}»</p>
              <p className="font-display font-semibold text-gold text-sm">— {r.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;
