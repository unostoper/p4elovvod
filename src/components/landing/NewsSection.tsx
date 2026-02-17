import { Newspaper, Calendar } from "lucide-react";

const news = [
  {
    date: "15 февраля 2026",
    title: "Новые серверы в Европе",
    text: "Подключили дополнительные серверы в Нидерландах и Германии. Скорость выросла на 30% для европейского трафика.",
  },
  {
    date: "2 февраля 2026",
    title: "Поддержка VLESS Reality",
    text: "Добавили поддержку протокола VLESS Reality — ещё более устойчивого к блокировкам. Работает на всех тарифах.",
  },
  {
    date: "20 января 2026",
    title: "Обновление приложения Outline",
    text: "Рекомендуем обновить Outline до последней версии для улучшенной стабильности соединения и исправления багов.",
  },
  {
    date: "10 января 2026",
    title: "YouTube-ключи без рекламы",
    text: "Запустили специальные ключи для YouTube, которые работают без рекламы на максимальной скорости вашего провайдера.",
  },
];

const NewsSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 justify-center mb-12">
          <Newspaper className="w-7 h-7 text-gold" />
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center">
            Новости
          </h2>
        </div>

        <div className="space-y-6">
          {news.map((item) => (
            <article
              key={item.title}
              className="bg-surface border border-border rounded-xl p-6 hover:border-gold/20 transition-colors"
            >
              <div className="flex items-center gap-2 text-gold/60 text-sm mb-2">
                <Calendar className="w-4 h-4" />
                <time>{item.date}</time>
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
