import { Newspaper, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteContent } from "@/hooks/useSiteContent";

interface NewsItem {
  date: string;
  title: string;
  desc: string;
  image?: string;
  titleFont?: string;
  textFont?: string;
}

interface NewsContent {
  title: string;
  items: NewsItem[];
}

const parseDate = (d: string): Date => {
  const slashMatch = d.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (slashMatch) return new Date(+slashMatch[3], +slashMatch[2] - 1, +slashMatch[1]);
  return new Date(d);
};

const NewsSection = () => {
  const { data } = useSiteContent<NewsContent>("news");
  const title = data?.title ?? "Новости";
  const items = [...(data?.items ?? [])]
    .sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime())
    .slice(0, 2);

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
              <div className="flex gap-5">
                {item.image && (
                  <div className="shrink-0 hidden sm:block">
                    <img src={item.image} alt="" className="w-[200px] h-[133px] object-cover rounded-lg" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-gold/60 text-sm mb-2">
                    <Calendar className="w-4 h-4" />
                    <time>{item.date}</time>
                  </div>
                  <h3
                    className="font-display font-semibold text-lg mb-2"
                    style={item.titleFont ? { fontFamily: item.titleFont } : undefined}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-muted-foreground text-sm leading-relaxed line-clamp-3"
                    style={item.textFont ? { fontFamily: item.textFont } : undefined}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-gold hover:opacity-80 transition-opacity font-display font-semibold"
          >
            Все новости <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
