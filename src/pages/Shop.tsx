import { useState } from "react";
import { ArrowLeft, RadioTower } from "lucide-react";
import { Link } from "react-router-dom";
import OrderModal from "@/components/shop/OrderModal";

interface Product {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  detailUrl: string;
  buyUrl?: string;
  media: {type: "video" | "image";src: string;};
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
  media: { type: "video", src: "https://geekboutique.ru/img/products/4/111.mp4" }
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
  soldOut: true
},
{
  id: "mystery-box-steel",
  title: "Mystery Box «Последний вздох» — Сталь",
  subtitle: "Загадочный артефакт из нержавеющей стали, 75×75 мм",
  description:
  "Стальной куб, запечатанный навсегда. Внутри — послание, артефакт или пустота. Никто не знает, пока не вскроет. Но вскрыть — значит уничтожить. Идеальная метафора доверия, терпения и иррационального любопытства. Нержавеющая сталь, брутальный вес, ручная полировка.",
  price: "15 000 ₽",
  detailUrl: "https://geekboutique.ru/",
  buyUrl: "https://geekboutique.ru/",
  media: { type: "video", src: "https://geekboutique.ru/img/products/4/111.mp4" }
},
{
  id: "mystery-box-aluminium",
  title: "Mystery Box «Последний вздох» — Алюминий",
  subtitle: "Лёгкий и элегантный артефакт из авиационного алюминия, 75×75 мм",
  description:
  "Тот же запечатанный секрет, но в невесомом корпусе из анодированного алюминия. Холодный на ощупь, тёплый по смыслу. Что внутри? Может быть, ничего. А может — всё. Откроешь — потеряешь тайну. Не откроешь — останешься с ней навсегда.",
  price: "25 000 ₽",
  detailUrl: "https://geekboutique.ru/",
  buyUrl: "https://geekboutique.ru/",
  media: { type: "video", src: "https://geekboutique.ru/img/products/4/111.mp4" }
},
{
  id: "memory-steel",
  title: "Память Предков — Скрижаль Судного Дня (Сталь)",
  subtitle: "Стальная пластина с древней мудростью шрифтом Брайля",
  description:
  "Послание, которое переживёт цивилизацию. Нержавеющая сталь, гравировка шрифтом Брайля — мудрость предков, зашифрованная для тех, кто готов искать истину на ощупь. Когда экраны погаснут, эта скрижаль останется. Вес, холод металла и текстура точек под пальцами — единственный интерфейс, который не требует электричества.",
  price: "10 000 ₽",
  detailUrl: "https://geekboutique.ru/",
  buyUrl: "https://geekboutique.ru/",
  media: { type: "video", src: "https://geekboutique.ru/img/products/4/111.mp4" }
},
{
  id: "memory-aluminium",
  title: "Память Предков — Скрижаль Судного Дня (Алюминий)",
  subtitle: "Алюминиевая пластина с древней мудростью шрифтом Брайля",
  description:
  "Та же вечная мудрость, но в невесомом корпусе из анодированного алюминия. Пластина, которую можно носить с собой как талисман или спрятать в тайник на случай конца света. Каждая точка Брайля — это мост между эпохами, между зрением и осязанием, между знанием и верой.",
  price: "15 000 ₽",
  detailUrl: "https://geekboutique.ru/",
  buyUrl: "https://geekboutique.ru/",
  media: { type: "video", src: "https://geekboutique.ru/img/products/4/111.mp4" }
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
  media: { type: "video", src: "https://geekboutique.ru/img/products/2/luxurybox.mp4" }
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
  soldOut: true
}];


const Shop = () => {
  const [orderModal, setOrderModal] = useState<{open: boolean;title: string;price: string;}>({
    open: false,
    title: "",
    price: ""
  });

  const openOrder = (title: string, price: string) => {
    setOrderModal({ open: true, title, price });
  };

  return (
    <div className="min-h-screen bg-background">
      <OrderModal
        open={orderModal.open}
        onOpenChange={(open) => setOrderModal((prev) => ({ ...prev, open }))}
        productTitle={orderModal.title}
        productPrice={orderModal.price} />
      

      {/* Back nav */}
      <div className="max-w-[900px] mx-auto px-4 pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors text-sm">
          
          <ArrowLeft className="w-4 h-4" />
          На главную
        </Link>
      </div>

      {/* Logo / Header — centered like original */}
      <header className="pt-10 pb-6 text-center py-[50px]">
        <div className="flex items-center justify-center gap-3 mb-4">
          <RadioTower className="w-8 h-8 text-gold" />
          <span className="font-display text-2xl sm:text-3xl font-bold text-foreground tracking-wide">
            ПЧЕЛОВВОД FM 
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
              className="flex flex-col md:flex-row items-center gap-0 md:gap-10 py-12 border-b border-border/40 last:border-b-0">
              
              {/* Media */}
              <div
                className={`w-full md:w-1/2 mb-6 md:mb-0 ${
                reversed ? "md:order-2" : "md:order-1"}`
                }>
                
                <a
                  href={product.detailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block">
                  
                  {product.media.type === "video" ?
                  <video
                    src={product.media.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto rounded-lg" /> :


                  <img
                    src={product.media.src}
                    alt={product.title}
                    loading="lazy"
                    className="w-full h-auto rounded-lg" />

                  }
                </a>
              </div>

              {/* Details */}
              <div
                className={`w-full md:w-1/2 ${
                reversed ? "md:order-1" : "md:order-2"}`
                }>
                
                <a
                  href={product.detailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group">
                  
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

                {product.soldOut ?
                <div className="text-center py-3 text-muted-foreground font-display font-semibold text-sm tracking-widest uppercase">
                    Полностью распродан
                  </div> :

                <button
                  onClick={() => openOrder(product.title, product.price)}
                  className="block w-full text-center py-4 bg-gold text-background font-display font-bold text-lg rounded-lg hover:opacity-90 transition-opacity tracking-wide cursor-pointer">
                  
                    КУПИТЬ
                  </button>
                }
              </div>
            </article>);

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
            className="text-gold hover:underline">
            
            Geek Boutique
          </a>
        </p>
      </footer>
    </div>);

};

export default Shop;