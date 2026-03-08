import { useState } from "react";
import { ArrowLeft, RadioTower } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";
import OrderModal from "@/components/shop/OrderModal";

const Shop = () => {
  const [orderModal, setOrderModal] = useState<{open: boolean;title: string;price: string;}>({
    open: false, title: "", price: ""
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
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" />
          На главную
        </Link>
      </div>

      {/* Logo / Header */}
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
              <div className={`w-full md:w-1/2 mb-6 md:mb-0 ${reversed ? "md:order-2" : "md:order-1"}`}>
                <Link to={`/shop/${product.id}`} className="block">
                  {product.media.type === "video" ?
                  <video src={product.media.src} autoPlay loop muted playsInline className="w-full h-auto rounded-lg" /> :

                  <img src={product.media.src} alt={product.title} loading="lazy" className="w-full h-auto rounded-lg" />
                  }
                </Link>
              </div>

              {/* Details */}
              <div className={`w-full md:w-1/2 ${reversed ? "md:order-1" : "md:order-2"}`}>
                <Link to={`/shop/${product.id}`} className="block group">
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2 group-hover:text-gold transition-colors">
                    {product.title}
                  </h2>
                  <p className="text-muted-foreground font-body text-sm mb-5">{product.subtitle}</p>
                  <p className="text-secondary-foreground font-body leading-relaxed mb-5">{product.description}</p>
                  <p className="text-gold font-display font-semibold text-sm mb-4 group-hover:underline">Подробнее →</p>
                  <div className="font-display text-3xl font-bold text-foreground mb-5">{product.price}</div>
                </Link>

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
          Все товары являются эксклюзивными продуктами ограниченной серии
        </p>
      </footer>
    </div>);

};

export default Shop;