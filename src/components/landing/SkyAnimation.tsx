import { useEffect, useState } from "react";

type TimePhase = "dawn" | "day" | "sunset" | "night";

const getPhase = (): TimePhase => {
  const h = new Date().getHours();
  if (h >= 5 && h < 8) return "dawn";
  if (h >= 8 && h < 17) return "day";
  if (h >= 17 && h < 21) return "sunset";
  return "night";
};

const getMoonPhase = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const c = Math.floor(365.25 * year) + Math.floor(30.6001 * (month + 1)) + day - 694039.09;
  const phase = (c / 29.5305882) % 1;
  return phase;
};

const SkyAnimation = () => {
  const [phase, setPhase] = useState<TimePhase>(getPhase());
  const [moonPhase] = useState(getMoonPhase());

  useEffect(() => {
    const interval = setInterval(() => setPhase(getPhase()), 60000);
    return () => clearInterval(interval);
  }, []);

  const skyGradients: Record<TimePhase, string> = {
    dawn: "from-orange-400/20 via-pink-300/15 to-indigo-400/10",
    day: "from-sky-400/15 via-blue-300/10 to-cyan-200/5",
    sunset: "from-orange-500/20 via-red-400/15 to-purple-500/10",
    night: "from-indigo-900/30 via-slate-800/20 to-purple-900/15",
  };

  const moonIllumination = Math.round(moonPhase * 100);

  return (
    <div className="fixed top-4 left-4 z-50 w-16 h-16 pointer-events-none">
      {/* Sky background */}
      <div
        className={`absolute inset-0 rounded-full bg-gradient-to-b ${skyGradients[phase]} backdrop-blur-sm border border-border/30 transition-all duration-[3000ms]`}
      />

      {phase === "night" ? (
        /* Moon */
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 rounded-full bg-yellow-100/80 shadow-[0_0_12px_rgba(255,255,200,0.4)]" />
            <div
              className="absolute inset-0 rounded-full bg-background/90"
              style={{
                clipPath: `inset(0 ${Math.max(0, 50 - moonIllumination)}% 0 0)`,
                transition: "clip-path 1s ease",
              }}
            />
            {/* Stars */}
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-0.5 bg-yellow-200/60 rounded-full animate-pulse"
                style={{
                  top: `${-4 + Math.random() * 20}px`,
                  left: `${-4 + i * 10}px`,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            ))}
          </div>
        </div>
      ) : phase === "dawn" ? (
        /* Sunrise */
        <div className="absolute inset-0 flex items-end justify-center pb-2">
          <div className="w-6 h-3 rounded-t-full bg-gradient-to-t from-orange-400/60 to-yellow-300/40 shadow-[0_0_15px_rgba(255,165,0,0.3)]">
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-transparent via-orange-300/30 to-transparent" />
          </div>
        </div>
      ) : phase === "sunset" ? (
        /* Sunset */
        <div className="absolute inset-0 flex items-end justify-center pb-3">
          <div className="w-5 h-2.5 rounded-t-full bg-gradient-to-t from-red-500/50 to-orange-400/40 shadow-[0_0_12px_rgba(255,100,0,0.3)]" />
          <div className="absolute bottom-1 w-full h-1 bg-gradient-to-r from-transparent via-red-400/20 to-transparent" />
        </div>
      ) : (
        /* Day - sun */
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-300/70 to-orange-300/50 shadow-[0_0_15px_rgba(255,200,0,0.3)] animate-pulse" style={{ animationDuration: "4s" }} />
        </div>
      )}
    </div>
  );
};

export default SkyAnimation;
