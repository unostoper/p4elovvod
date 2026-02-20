import { Key, Smartphone, Globe } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const ICONS = [Key, Smartphone, Globe];

interface HowContent {
  title: string;
  steps: { num: string; title: string; desc: string }[];
}

const HowItWorksSection = () => {
  const { data } = useSiteContent<HowContent>("how_it_works");

  const title = data?.title ?? "Как это работает";
  const steps = data?.steps ?? [
    { num: "01", title: "Получаешь ключ", desc: "Пробный или платный." },
    { num: "02", title: "Вставляешь в приложение", desc: "Копировать - вставить." },
    { num: "03", title: "Интернет работает", desc: "Вот и всё." },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-12">{title}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 border border-gold/20 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-gold" />
                </div>
                <span className="font-display text-gold text-sm tracking-widest">{step.num}</span>
                <h3 className="font-display font-semibold text-xl mt-2 mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
