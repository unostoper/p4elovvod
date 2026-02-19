import { Settings, Zap, Wifi, Cat } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import SectionTitle from "./SectionTitle";

const ICONS = [Settings, Zap, Wifi, Cat];

interface AdvContent {
  title: string;
  items: { title: string; desc: string }[];
}

const AdvantagesSection = () => {
  const { data } = useSiteContent<AdvContent>("advantages");

  const title = data?.title ?? "Что включено";
  const items = data?.items ?? [
    { title: "Никаких настроек", desc: "Вставил ключ — работает." },
    { title: "Максимальная скорость", desc: "Весь канал твоего провайдера." },
    { title: "Стабильное соединение", desc: "Не отваливается." },
    { title: "Подходит всем", desc: "Даже твоему коту." },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionTitle>{title}</SectionTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((a, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div key={i} className="p-6 rounded-xl border border-border/50 hover:border-gold/30 transition-colors bg-background/40 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
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
