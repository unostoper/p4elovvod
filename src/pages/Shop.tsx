import { ArrowLeft, Anchor } from "lucide-react";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  detailUrl: string;
  buyUrl?: string;
  media: { type: "video" | "image"; src: string };
  soldOut?: boolean;
}

const products: Product[] = [
  {
    id: "power-capsule",
    title: "Пауэр-Капсула «Ядерный Титбит»",
    subtitle: "Легендарный аксессуар из титана",
    description:
      "Стильный аксессуар из авиационного титана и одновременно капсула для самого ценного. Будь то приватный ключ биткоина, пыль первого сервера или песок с того самого пляжа. Авторский дизайн, ювелирная ручная работа, бренд с 20-летней историей. Идеальный подарок человеку, у которого «есть всё».",
    price: "35 000 ₽",
    detailUrl: "https://geekboutique.ru/p/power-capsule",
    buyUrl: "https://geekboutique.ru/p/power-capsule?buy=1",
    media: { type: "video", src: "https://geekboutique.ru/img/products/4/111.mp4" },
  },
  {
    id: "calendar2026",
    title: "Мотивационный календарь «Ядерный Титбитленд 2026»",
    subtitle: "С ежемесячной дозой вдохновения от блондинки-эксперта Ингрид Стейнсдоттир",
    description:
      "Целый год блондинка-эксперт Ингрид Стейнсдоттир будет облучать вас позитивом со страниц мотивационного календаря. Следуйте её рекомендациям — и этот год станет одним из лучших.",
    price: "2 990 ₽",
    detailUrl: "https://geekboutique.ru/p/calendar2026",
    media: { type: "image", src: "https://geekboutique.ru/img/products/5/june.png" },
    soldOut: true,
  },
  {
    id: "ai-free",
    title: "Набор AI FREE",
    subtitle: "Только для людей",
    description:
      "Набор самосертификации AI FREE: маркируйте пространства, проекты, объекты и персоналии, свободные от искусственного интеллекта.",
    price: "7 000 ₽",
    detailUrl: "https://geekboutique.ru/p/nabor-aifree",
    buyUrl: "https://geekboutique.ru/p/nabor-aifree?buy=1",
    media: { type: "video", src: "https://geekboutique.ru/img/products/2/luxurybox.mp4" },
  },
  {
    id: "comic",
    title: "Коллекционный комикс «Ядерный Титбит»",
    subtitle: "Букинистическая редкость",
    description:
      "Ультра-редкий букинистический артефакт: только у 100 экземпляров из всего тиража комикса коллекционная авторская обложка. Теперь можно купить только на Sotheby's.",
    price: "5 000 ₽",
    detailUrl: "https://geekboutique.ru/p/comix-yadernyi-titbit",
    media: { type: "video", src: "https://geekboutique.ru/img/products/1/comixcover.mp4" },
    soldOut: true,
  },
];

const Shop = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Back nav */}
      <div className="max-w-[900px] mx-auto px-4 pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          На главную
        </Link>
      </div>

      {/* Logo / Header — centered like original */}
      <header className="pt-10 pb-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Anchor className="w-8 h-8 text-gold" />
          <span className="font-display text-2xl sm:text-3xl font-bold text-foreground tracking-wide">
            UNOSTOPER
          </span>
        </div>
        <p className="text-muted-foreground text-lg font-body tracking-wide">
          Лавка артефактов будущего
        </p>
        <div className="w-12 h-[3px] bg-gold mx-auto mt-5 rounded-full" />
      </header>

      {/* Products */}
      <section className="max-w-[900px] mx-auto px-4 pb-20">
        {products.map((product, i) => {
          const reversed = i % 2 !== 0;
          return (
            <article
              key={product.id}
              className="flex flex-col md:flex-row items-center gap-0 md:gap-10 py-12 border-b border-border/40 last:border-b-0"
            >
              {/* Media */}
              <div
                className={`w-full md:w-1/2 mb-6 md:mb-0 ${
                  reversed ? "md:order-2" : "md:order-1"
                }`}
              >
                <a
                  href={product.detailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {product.media.type === "video" ? (
                    <video
                      src={product.media.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-auto rounded-lg"
                    />
                  ) : (
                    <img
                      src={product.media.src}
                      alt={product.title}
                      loading="lazy"
                      className="w-full h-auto rounded-lg"
                    />
                  )}
                </a>
              </div>

              {/* Details */}
              <div
                className={`w-full md:w-1/2 ${
                  reversed ? "md:order-1" : "md:order-2"
                }`}
              >
                <a
                  href={product.detailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2 group-hover:text-gold transition-colors">
                    {product.title}
                  </h2>
                  <p className="text-muted-foreground font-body text-sm mb-5">
                    {product.subtitle}
                  </p>
                  <p className="text-secondary-foreground font-body leading-relaxed mb-5">
                    {product.description}
                  </p>
                  <p className="text-gold font-display font-semibold text-sm mb-4 group-hover:underline">
                    Подробнее →
                  </p>
                  <div className="font-display text-3xl font-bold text-foreground mb-5">
                    {product.price}
                  </div>
                </a>

                {product.soldOut ? (
                  <div className="text-center py-3 text-muted-foreground font-display font-semibold text-sm tracking-widest uppercase">
                    Полностью распродан
                  </div>
                ) : (
                  <a
                    href={product.buyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-4 bg-gold text-background font-display font-bold text-lg rounded-lg hover:opacity-90 transition-opacity tracking-wide"
                  >
                    КУПИТЬ
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </section>

      {/* Footer */}
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
