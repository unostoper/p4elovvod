import { Key, Smartphone, Globe } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import SectionTitle from "./SectionTitle";

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
    { num: "02", title: "Вставляешь в приложение", desc: "Копировать — вставить." },
    { num: "03", title: "Интернет работает", desc: "Вот и всё." },
  ];

  return (
    <section id="how" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionTitle>{title}</SectionTitle>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gold/20 hidden md:block" />

          <div className="space-y-12 md:space-y-16">
            {steps.map((step, i) => {
              const Icon = ICONS[i % ICONS.length];
              const isLeft = i % 2 === 0;
              return (
                <div key={i} className="relative flex flex-col md:flex-row items-center gap-6">
                  {/* Dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold border-2 border-background z-10 hidden md:block" />

                  {/* Content */}
                  <div className={`md:w-1/2 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:ml-auto"}`}>
                    <span className="font-display text-gold text-sm tracking-widest">{step.num}</span>
                    <h3 className="font-display font-semibold text-xl mt-1 mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
