import { Quote } from "lucide-react";

const reviews = [
  {
    name: "Алексей",
    text: "Купил ключ, вставил в Outline, всё заработало. Потратил 30 секунд. Остальное время смотрел YouTube без рекламы.",
  },
  {
    name: "Марина",
    text: "Настроила маме за 2 минуты по телефону. Мама даже не поняла, что я что-то настраивала. Идеально.",
  },
  {
    name: "Дмитрий",
    text: "Третий месяц — ни одного обрыва. Раньше менял VPN как носки. Теперь просто пользуюсь.",
  },
];

const ReviewsSection = () => {
  return (
    <section className="py-20 px-4 bg-surface-raised">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-12">
          Что говорят люди
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div key={r.name} className="bg-surface border border-border rounded-xl p-6 relative">
              <Quote className="w-6 h-6 text-gold/30 absolute top-4 right-4" />
              <p className="text-secondary-foreground mb-4 text-sm leading-relaxed">«{r.text}»</p>
              <p className="font-display font-semibold text-gold text-sm">— {r.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
