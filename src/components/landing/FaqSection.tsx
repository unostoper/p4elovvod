import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    q: "Как настроить VLESS на iPhone (iOS)?",
    a: "Скачайте приложение Streisand из App Store, откройте его, нажмите «+» и вставьте полученный VLESS-ключ. Подключение произойдёт автоматически за 30 секунд. Никаких дополнительных настроек не требуется.",
  },
  {
    q: "Как настроить VLESS на Android?",
    a: "Установите приложение V2RayNG из Google Play или APK-файл. Откройте приложение, нажмите «+» → «Импорт из буфера обмена», предварительно скопировав ключ. Нажмите кнопку подключения — готово.",
  },
  {
    q: "Почему Outline лучше OpenVPN?",
    a: "Outline использует протокол Shadowsocks, который маскирует трафик под обычный HTTPS. В отличие от OpenVPN, Outline сложнее заблокировать, он быстрее работает и проще в настройке — достаточно вставить ключ в приложение.",
  },
  {
    q: "Чем VLESS отличается от Outline?",
    a: "VLESS — более современный протокол с лучшей устойчивостью к DPI-блокировкам и минимальными накладными расходами. Outline проще в использовании и лучше подходит для просмотра YouTube без рекламы. Оба варианта обеспечивают высокую скорость.",
  },
  {
    q: "Можно ли использовать VPN-ключ на роутере?",
    a: "Да, VLESS-ключи работают на роутерах с прошивкой OpenWrt или Keenetic. Это позволяет защитить все устройства в сети одновременно без установки приложений на каждое устройство.",
  },
  {
    q: "Как смотреть YouTube без рекламы через VPN?",
    a: "Используйте ключ Outline — он направляет трафик через сервер, который блокирует рекламные вставки YouTube. Просто вставьте ключ в приложение Outline, и реклама исчезнет автоматически.",
  },
  {
    q: "Сколько устройств можно подключить к одному ключу?",
    a: "Один ключ — одно активное подключение. Но вы можете приобрести несколько ключей для разных устройств. Количество ключей на аккаунт не ограничено.",
  },
  {
    q: "Что делать, если VPN перестал работать?",
    a: "Попробуйте переподключиться в приложении. Если не помогло — напишите в поддержку в Telegram (@unostoper), мы решим вопрос в течение нескольких минут. Поддержка работает 24/7.",
  },
  {
    q: "Безопасно ли использовать ваши VPN-ключи?",
    a: "Да, весь трафик шифруется. Мы не ведём логов активности пользователей. Серверы расположены в надёжных дата-центрах с защитой от утечек DNS и WebRTC.",
  },
];

const FaqSection = () => {
  return (
    <section className="py-16 px-4 bg-surface-raised border-t border-border" id="faq" aria-label="Часто задаваемые вопросы">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
          Часто задаваемые вопросы
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-border">
              <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;
