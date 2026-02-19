import { Youtube, Globe, Check } from "lucide-react";
import SectionTitle from "./SectionTitle";

const OffersSection = () => {
  return (
    <section id="offers" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionTitle>Выбери свой ключ</SectionTitle>

        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {/* YouTube Key */}
          <div className="rounded-xl p-8 border border-border/50 hover:border-gold/40 transition-colors group flex flex-col bg-background/40 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
                <Youtube className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-display text-2xl font-bold">Ключ для YouTube</h3>
            </div>
            <ul className="space-y-3 mb-8 flex-grow">
              {["Работает без рекламы", "Максимальная скорость провайдера", "Стабильный доступ без танцев с серверами"].map((item) => (
                <li key={item} className="flex items-start gap-3 text-secondary-foreground">
                  <Check className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="https://t.me/unostoper"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full text-center px-6 py-3 border border-gold text-gold font-display font-semibold rounded-lg hover:bg-gold hover:text-background transition-colors"
            >
              Выбрать
            </a>
          </div>

          {/* VPN Key */}
          <div className="rounded-xl p-8 border border-gold/30 group relative flex flex-col bg-background/40 backdrop-blur-sm gold-glow">
            <div className="absolute top-4 right-4 bg-gold text-background text-xs font-display font-semibold px-3 py-1 rounded-full">
              Популярный
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
                <Globe className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-display text-2xl font-bold">VPN‑ключ</h3>
            </div>
            <ul className="space-y-3 mb-8 flex-grow">
              {["Ограниченный трафик защищает скорость", "Форматы: VLESS и Outline", "Стабильная высокая скорость"].map((item) => (
                <li key={item} className="flex items-start gap-3 text-secondary-foreground">
                  <Check className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="https://t.me/unostoper"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full text-center px-6 py-3 border border-gold text-gold font-display font-semibold rounded-lg hover:bg-gold hover:text-background transition-colors"
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
