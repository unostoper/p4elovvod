import { Skull, Shield, Zap, Wifi, Smartphone } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import heroBg from "@/assets/hero-pirate.jpg";

interface HeroSectionProps {
  onTrialClick: () => void;
}

interface HeroContent {
  badge: string;
  title: string;
  subtitle: string;
  cta_primary: string;
  cta_secondary: string;
}

const features = [
  { icon: Shield, label: "Без настроек" },
  { icon: Zap, label: "Макс. скорость" },
  { icon: Wifi, label: "Стабильно" },
  { icon: Smartphone, label: "Все устройства" },
];

const HeroSection = ({ onTrialClick }: HeroSectionProps) => {
  const { data } = useSiteContent<HeroContent>("hero");

  const title = data?.title ?? "VPN";
  const subtitle = data?.subtitle ?? "Интернет должен работать,\nа не бороться с\u00a0тобой";
  const ctaPrimary = data?.cta_primary ?? "Получить пробный ключ";
  const ctaSecondary = data?.cta_secondary ?? "Купить ключ";

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
      </div>

      {/* Large title */}
      <div className="absolute top-1/4 left-0 right-0 text-center z-10">
        <h1 className="font-display text-[8rem] sm:text-[12rem] md:text-[16rem] font-bold leading-none text-foreground/10 uppercase tracking-widest select-none">
          {title}
        </h1>
      </div>

      {/* Content */}
      <div className="relative z-10 pb-12 pt-[60vh]">
        <div className="max-w-6xl mx-auto px-4">
          {/* Subtitle */}
          <p className="font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-8 max-w-lg whitespace-pre-line">
            {subtitle}
          </p>

          {/* Feature cards row + CTA */}
          <div className="flex flex-col lg:flex-row items-end justify-between gap-6">
            <div className="flex gap-3 flex-wrap">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="bg-background/40 backdrop-blur-sm border border-border/50 rounded-lg p-3 w-[120px] sm:w-[140px]"
                >
                  <f.icon className="w-5 h-5 text-gold mb-2" />
                  <p className="text-xs sm:text-sm text-foreground/80 font-body">{f.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://t.me/unostoper"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gold text-background font-display font-semibold text-lg rounded-lg hover:opacity-90 transition-opacity"
              >
                {ctaSecondary}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
