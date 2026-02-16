import { Settings, Zap, Wifi, Cat } from "lucide-react";

const advantages = [
  { icon: Settings, title: "Никаких настроек", desc: "Вставил ключ — работает. Без танцев с бубном и чтения мануалов на английском." },
  { icon: Zap, title: "Максимальная скорость", desc: "Весь канал вашего провайдера. Ни мегабита мимо." },
  { icon: Wifi, title: "Стабильное соединение", desc: "Не отваливается в самый интересный момент. Проверено на сериалах." },
  { icon: Cat, title: "Подходит всем", desc: "Даже вашему коту. Особенно вашему коту." },
];

const AdvantagesSection = () => {
  return (
    <section className="py-20 px-4 bg-surface-raised">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-12">
          Почему это работает
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((a) => (
            <div key={a.title} className="p-6 rounded-xl bg-surface border border-border hover:border-gold/20 transition-colors">
              <a.icon className="w-8 h-8 text-gold mb-4" />
              <h3 className="font-display font-semibold text-lg mb-2">{a.title}</h3>
              <p className="text-muted-foreground text-sm">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
