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
    <section className="py-20 px-4 bg-surface-raised">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-12">{title}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((a, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div key={i} className="p-6 rounded-xl bg-surface border border-border hover:border-gold/20 transition-colors">
                <Icon className="w-8 h-8 text-gold mb-4" />
                <h3 className="font-display font-semibold text-lg mb-2">{a.title}</h3>
                <p className="text-muted-foreground text-sm">{a.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
