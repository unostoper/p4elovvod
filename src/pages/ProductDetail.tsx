import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Package, Ruler, Shield, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import BlueprintSVG from "@/components/shop/BlueprintSVG";
import OrderModal from "@/components/shop/OrderModal";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = products.find((p) => p.id === productId);
  const [orderModal, setOrderModal] = useState({ open: false, title: "", price: "" });

  if (!product || !product.details) return <Navigate to="/shop" replace />;

  const { details } = product;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <OrderModal
        open={orderModal.open}
        onOpenChange={(open) => setOrderModal((prev) => ({ ...prev, open }))}
        productTitle={orderModal.title}
        productPrice={orderModal.price}
      />

      {/* Back nav */}
      <div className="max-w-[1000px] mx-auto px-4 pt-4">
        <Link to="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" />
          Назад в лавку
        </Link>
      </div>

      {/* Hero */}
      <section className="max-w-[1000px] mx-auto px-4 pt-10 pb-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Media */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
            {details.heroVideo ? (
              <video src={details.heroVideo} autoPlay loop muted playsInline className="w-full rounded-xl" />
            ) : (
              <img src={product.media.src} alt={product.title} className="w-full rounded-xl" />
            )}
          </motion.div>

          {/* Info */}
          <motion.div initial="hidden" animate="visible" className="space-y-6">
            <motion.h1 variants={fadeUp} custom={0} className="font-display text-3xl sm:text-4xl font-bold leading-tight">
              {product.title}
            </motion.h1>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground font-body text-lg">
              {product.subtitle}
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="font-display text-4xl font-bold text-gold">
              {product.price}
            </motion.div>
            <motion.div variants={fadeUp} custom={3}>
              {product.soldOut ? (
                <div className="py-4 text-center text-muted-foreground font-display font-semibold tracking-widest uppercase border border-border rounded-lg">
                  Полностью распродан
                </div>
              ) : (
                <button
                  onClick={() => setOrderModal({ open: true, title: product.title, price: product.price })}
                  className="w-full py-4 bg-gold text-background font-display font-bold text-lg rounded-lg hover:opacity-90 transition-opacity tracking-wide cursor-pointer"
                >
                  ЗАКАЗАТЬ
                </button>
              )}
            </motion.div>
            {/* Scroll hint */}
            <motion.div variants={fadeUp} custom={4} className="flex justify-center pt-4">
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-muted-foreground">
                <ChevronDown className="w-6 h-6" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-16 h-[2px] bg-gold mx-auto rounded-full" />

      {/* Long description */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
        className="max-w-[700px] mx-auto px-4 py-20"
      >
        <motion.p variants={fadeUp} custom={0} className="text-secondary-foreground font-body text-lg leading-relaxed">
          {details.longDescription}
        </motion.p>
      </motion.section>

      {/* Blueprint drawing */}
      <section className="max-w-[600px] mx-auto px-4 pb-16">
        <motion.h2
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="font-display text-xl font-semibold text-center mb-2 text-muted-foreground tracking-widest uppercase"
        >
          Технический чертёж
        </motion.h2>
        <div className="border border-border/30 rounded-xl overflow-hidden bg-card/30">
          <BlueprintSVG type={details.blueprintType} />
        </div>
      </section>

      {/* Specs */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
        className="max-w-[800px] mx-auto px-4 pb-20"
      >
        <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-8 justify-center">
          <Ruler className="w-5 h-5 text-gold" />
          <h2 className="font-display text-2xl font-bold">Характеристики</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-4">
          {details.specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              variants={fadeUp}
              custom={i * 0.3 + 1}
              className="flex justify-between items-baseline border-b border-border/30 pb-3 gap-4"
            >
              <span className="text-muted-foreground font-body text-sm">{spec.label}</span>
              <span className="font-display font-semibold text-sm text-right">{spec.value}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Features */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
        className="max-w-[700px] mx-auto px-4 pb-20"
      >
        <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-8 justify-center">
          <Shield className="w-5 h-5 text-gold" />
          <h2 className="font-display text-2xl font-bold">Особенности</h2>
        </motion.div>
        <div className="space-y-4">
          {details.features.map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i * 0.2 + 1}
              className="flex items-start gap-4 group"
            >
              <div className="w-2 h-2 rounded-full bg-gold mt-2 shrink-0 group-hover:scale-150 transition-transform" />
              <p className="font-body text-secondary-foreground">{feature}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Gallery */}
      {details.gallery.length > 0 && (
        <motion.section
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
          className="max-w-[800px] mx-auto px-4 pb-20"
        >
          <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-8 justify-center">
            <Package className="w-5 h-5 text-gold" />
            <h2 className="font-display text-2xl font-bold">Галерея</h2>
          </motion.div>
          <div className="grid gap-6">
            {details.gallery.map((item, i) => (
              <motion.div key={i} variants={fadeUp} custom={i + 1} className="rounded-xl overflow-hidden">
                {item.type === "video" ? (
                  <video src={item.src} autoPlay loop muted playsInline className="w-full rounded-xl" />
                ) : (
                  <img src={item.src} alt={item.caption || ""} loading="lazy" className="w-full rounded-xl" />
                )}
                {item.caption && (
                  <p className="text-muted-foreground text-sm font-body mt-3 text-center">{item.caption}</p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Bottom CTA */}
      <section className="max-w-[500px] mx-auto px-4 pb-20">
        <div className="border border-border/40 rounded-xl p-8 text-center bg-card/50">
          <h3 className="font-display text-2xl font-bold mb-2">{product.title}</h3>
          <p className="font-display text-3xl font-bold text-gold mb-6">{product.price}</p>
          {product.soldOut ? (
            <div className="py-3 text-muted-foreground font-display font-semibold tracking-widest uppercase">
              Полностью распродан
            </div>
          ) : (
            <button
              onClick={() => setOrderModal({ open: true, title: product.title, price: product.price })}
              className="w-full py-4 bg-gold text-background font-display font-bold text-lg rounded-lg hover:opacity-90 transition-opacity tracking-wide cursor-pointer"
            >
              ЗАКАЗАТЬ
            </button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center">
        <p className="text-muted-foreground text-sm font-body">
          Товары предоставлены партнёром{" "}
          <a href="https://geekboutique.ru/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
            Geek Boutique
          </a>
        </p>
      </footer>
    </div>
  );
};

export default ProductDetail;
