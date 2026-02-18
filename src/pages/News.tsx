import { Newspaper, Calendar, ArrowLeft } from "lucide-react";
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
  // Handle DD/MM/YYYY
  const slashMatch = d.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (slashMatch) return new Date(+slashMatch[3], +slashMatch[2] - 1, +slashMatch[1]);
  return new Date(d);
};

const News = () => {
  const { data } = useSiteContent<NewsContent>("news");
  const title = data?.title ?? "Новости";
  const items = [...(data?.items ?? [])].sort(
    (a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4 sticky top-0 bg-background z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-gold" />
            <h1 className="font-display text-xl font-bold">{title}</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="space-y-8">
          {items.map((item, i) => (
            <article
              key={i}
              className="bg-surface border border-border rounded-xl p-6 hover:border-gold/20 transition-colors"
            >
              <div className="flex gap-5">
                {item.image && (
                  <div className="shrink-0">
                    <img
                      src={item.image}
                      alt=""
                      className="w-[200px] h-[133px] object-cover rounded-lg"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-gold/60 text-sm mb-2">
                    <Calendar className="w-4 h-4" />
                    <time>{item.date}</time>
                  </div>
                  <h2
                    className="font-display font-semibold text-xl mb-3"
                    style={item.titleFont ? { fontFamily: item.titleFont } : undefined}
                  >
                    {item.title}
                  </h2>
                  <p
                    className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line"
                    style={item.textFont ? { fontFamily: item.textFont } : undefined}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
          {items.length === 0 && (
            <p className="text-center text-muted-foreground">Пока нет новостей</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default News;
