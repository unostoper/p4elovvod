import { Quote } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

interface ReviewsContent {
  title: string;
  items: { name: string; text: string }[];
}

const ReviewsSection = () => {
  const { data } = useSiteContent<ReviewsContent>("reviews");

  const title = data?.title ?? "Что говорят почти живые люди";
  const items = data?.items ?? [];

  return (
    <section className="py-20 px-4 bg-surface-raised" aria-label="Отзывы о VPN-ключах">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-12">{title}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((r, i) => (
            <div key={i} className="bg-surface border border-border rounded-xl p-6 relative">
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
