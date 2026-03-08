import { Settings, Zap, Wifi, Cat } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const ICONS = [Settings, Zap, Wifi, Cat];

interface AdvContent {
  title: string;
  items: { title: string; desc: string }[];
}

const AdvantagesSection = () => {
  const { data } = useSiteContent<AdvContent>("advantages");

  const title = data?.title ?? "Почему это работает";
  const items = data?.items ?? [
    { title: "Никаких настроек", desc: "Вставил ключ — работает." },
    { title: "Максимальная скорость", desc: "Весь канал твоего провайдера." },
    { title: "Стабильное соединение", desc: "Не отваливается." },
    { title: "Подходит всем", desc: "Даже твоему коту." },
  ];

  return (
    <section className="py-20 px-4 bg-surface-raised" aria-label="Преимущества VPN-ключей">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-14">{title}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((a, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div key={i} className="card-glow p-6 rounded-xl bg-surface border border-border">
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{a.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{a.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
