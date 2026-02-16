import { Key, Smartphone, Globe } from "lucide-react";

const steps = [
  { icon: Key, num: "01", title: "Получаете ключ", desc: "Пробный или платный — оба настоящие." },
  { icon: Smartphone, num: "02", title: "Вставляете в приложение", desc: "Копировать-вставить. Вы это умеете." },
  { icon: Globe, num: "03", title: "Интернет работает", desc: "Вот и всё. Серьёзно, всё." },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-12">
          Как это работает
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.num} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 border border-gold/20 flex items-center justify-center">
                <step.icon className="w-7 h-7 text-gold" />
              </div>
              <span className="font-display text-gold text-sm tracking-widest">{step.num}</span>
              <h3 className="font-display font-semibold text-xl mt-2 mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
