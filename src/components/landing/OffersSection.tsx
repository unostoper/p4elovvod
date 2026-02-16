import { Youtube, Globe, Check } from "lucide-react";

const OffersSection = () => {
  return (
    <section id="offers" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-4">
          Выберите свой ключ
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
          Два типа ключей. Оба работают. Выбирайте тот, что ближе к&nbsp;сердцу.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* YouTube Key */}
          <div className="bg-surface rounded-xl p-8 border border-border hover:border-gold/30 transition-colors group">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Youtube className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-display text-2xl font-bold">Ключ для YouTube</h3>
            </div>
            <ul className="space-y-3 mb-8">
              {[
                "Работает без рекламы",
                "Максимальная скорость вашего провайдера",
                "Стабильный доступ без танцев с серверами",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-secondary-foreground">
                  <Check className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="#cta"
              className="inline-block w-full text-center px-6 py-3 border border-gold text-gold font-display font-semibold rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Выбрать
            </a>
          </div>

          {/* VPN Key */}
          <div className="bg-surface rounded-xl p-8 border border-gold/30 gold-glow group relative">
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-display font-semibold px-3 py-1 rounded-full">
              Популярный
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Globe className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-display text-2xl font-bold">VPN‑ключ</h3>
            </div>
            <ul className="space-y-3 mb-4">
              {[
                "Ограниченный трафик защищает скорость",
                "Канал не забивается «халявщиками»",
                "Стабильная высокая скорость",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-secondary-foreground">
                  <Check className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground text-sm mb-8">Форматы: VLESS и Outline</p>
            <a
              href="#cta"
              className="inline-block w-full text-center px-6 py-3 bg-primary text-primary-foreground font-display font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Выбрать
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
