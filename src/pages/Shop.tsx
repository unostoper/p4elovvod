import { Anchor, ExternalLink, ArrowLeft, Sparkles, Gem, ScrollText, Skull } from "lucide-react";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  image?: string;
  buyUrl: string;
  soldOut?: boolean;
  badge?: string;
}

const products: Product[] = [
  {
    id: "power-capsule",
    title: "Пауэр-Капсула «Ядерный Титбит»",
    subtitle: "Легендарный аксессуар из титана",
    description:
      "Стильный аксессуар из авиационного титана и одновременно капсула для самого ценного. Будь то приватный ключ биткоина, пыль первого сервера или песок с того самого пляжа. Авторский дизайн, ювелирная ручная работа, бренд с 20-летней историей.",
    price: "35 000 ₽",
    buyUrl: "https://geekboutique.ru/p/power-capsule?buy=1",
    badge: "Хит",
  },
  {
    id: "calendar2026",
    title: "Мотивационный календарь «Ядерный Титбитленд 2026»",
    subtitle: "С ежемесячной дозой вдохновения",
    description:
      "Целый год блондинка-эксперт Ингрид Стейнсдоттир будет облучать вас позитивом со страниц мотивационного календаря. Следуйте её рекомендациям — и этот год станет одним из лучших.",
    price: "2 990 ₽",
    buyUrl: "https://geekboutique.ru/p/calendar2026",
    soldOut: true,
  },
  {
    id: "ai-free",
    title: "Набор AI FREE",
    subtitle: "Только для людей",
    description:
      "Набор самосертификации AI FREE: маркируйте пространства, проекты, объекты и персоналии, свободные от искусственного интеллекта.",
    price: "7 000 ₽",
    buyUrl: "https://geekboutique.ru/p/nabor-aifree?buy=1",
  },
  {
    id: "comic",
    title: "Коллекционный комикс «Ядерный Титбит»",
    subtitle: "Букинистическая редкость",
    description:
      "Ультра-редкий букинистический артефакт: только у 100 экземпляров из всего тиража комикса коллекционная авторская обложка.",
    price: "5 000 ₽",
    buyUrl: "https://geekboutique.ru/p/comic?buy=1",
    badge: "Редкость",
  },
];

const iconForIndex = (i: number) => {
  const icons = [Gem, ScrollText, Sparkles, Skull];
  const Icon = icons[i % icons.length];
  return <Icon className="w-16 h-16 text-gold/60" />;
};

const Shop = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-body text-sm">Назад</span>
          </Link>
          <div className="flex items-center gap-2">
            <Anchor className="w-5 h-5 text-gold" />
            <span className="font-display font-bold text-foreground">UNOSTOPER</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-4 text-center">
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-3">
          Лавка артефактов будущего
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto text-lg">
          Коллекционные предметы для тех, кто ценит редкость и стиль
        </p>
        <div className="w-16 h-0.5 bg-gold mx-auto mt-6" />
      </section>

      {/* Products */}
      <section className="max-w-6xl mx-auto px-4 pb-20 space-y-12">
        {products.map((product, i) => (
          <article
            key={product.id}
            className={`bg-surface rounded-xl border border-border overflow-hidden hover:border-gold/30 transition-colors ${
              i % 2 === 0 ? "" : ""
            }`}
          >
            <div className={`flex flex-col md:flex-row ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
              {/* Image placeholder */}
              <div className="md:w-2/5 bg-surface-raised flex items-center justify-center p-12 min-h-[280px] relative">
                {product.badge && (
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-display font-semibold px-3 py-1 rounded-full">
                    {product.badge}
                  </div>
                )}
                {iconForIndex(i)}
              </div>

              {/* Content */}
              <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  {product.title}
                </h2>
                <p className="text-muted-foreground font-body text-sm mb-4">
                  {product.subtitle}
                </p>
                <p className="text-secondary-foreground font-body leading-relaxed mb-6">
                  {product.description}
                </p>

                <div className="flex items-center justify-between flex-wrap gap-4 mt-auto">
                  <span className="font-display text-3xl font-bold text-gold">
                    {product.price}
                  </span>

                  {product.soldOut ? (
                    <span className="px-6 py-3 border border-border text-muted-foreground font-display font-semibold rounded-lg cursor-not-allowed text-sm">
                      Распродано
                    </span>
                  ) : (
                    <a
                      href={product.buyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-3 border border-gold text-gold font-display font-semibold rounded-lg hover:bg-gold hover:text-background transition-colors"
                    >
                      Купить
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Footer note */}
      <footer className="border-t border-border py-8 text-center">
        <p className="text-muted-foreground text-sm font-body">
          Товары предоставлены партнёром{" "}
          <a
            href="https://geekboutique.ru/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline"
          >
            Geek Boutique
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Shop;
