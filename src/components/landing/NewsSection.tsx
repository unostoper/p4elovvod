import { Newspaper, Calendar } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

interface NewsContent {
  title: string;
  items: { date: string; title: string; desc: string }[];
}

const NewsSection = () => {
  const { data } = useSiteContent<NewsContent>("news");

  const title = data?.title ?? "Новости";
  const items = data?.items ?? [];

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 justify-center mb-12">
          <Newspaper className="w-7 h-7 text-gold" />
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center">{title}</h2>
        </div>

        <div className="space-y-6">
          {items.map((item, i) => (
            <article key={i} className="bg-surface border border-border rounded-xl p-6 hover:border-gold/20 transition-colors">
              <div className="flex items-center gap-2 text-gold/60 text-sm mb-2">
                <Calendar className="w-4 h-4" />
                <time>{item.date}</time>
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
