import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type GameStatus = "idle" | "checking" | "blocked" | "playing" | "won" | "lost";

interface GameResult {
  allowed: boolean;
  won?: boolean;
  key?: string;
  message?: string;
  next_play_date?: string;
  last_won?: boolean;
  last_key?: string;
}

const SYMBOLS = ["🍒", "🔑", "💎", "⚡", "🏴‍☠️", "🍋", "7️⃣", "💰", "🎯"];
const REEL_SIZE = 20; // symbols per reel strip

const FreeKey = () => {
  const [status, setStatus] = useState<GameStatus>("idle");
  const [result, setResult] = useState<GameResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [reelStrips, setReelStrips] = useState<string[][]>([[], [], []]);
  const [finalSymbols, setFinalSymbols] = useState(["🔑", "💎", "🍒"]);
  const [reelStopped, setReelStopped] = useState([false, false, false]);
  const resultRef = useRef<GameResult | null>(null);

  // Generate random reel strip
  const generateStrip = () =>
    Array.from({ length: REEL_SIZE }, () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);

  const spin = async () => {
    setStatus("checking");
    setReelStopped([false, false, false]);

    const { data, error } = await supabase.functions.invoke("play-game", {
      body: { game_type: "slots" },
    });

    if (error) {
      toast.error("Ошибка подключения");
      setStatus("idle");
      return;
    }

    setResult(data);
    resultRef.current = data;

    if (!data.allowed) {
      setStatus("blocked");
      return;
    }

    // Generate strips with final symbols at end
    const final = data.won
      ? ["🔑", "🔑", "🔑"]
      : [
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS.filter((s) => s !== SYMBOLS[0])[Math.floor(Math.random() * (SYMBOLS.length - 1))],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        ];

    setFinalSymbols(final);
    setReelStrips([
      [...generateStrip(), final[0]],
      [...generateStrip(), ...generateStrip().slice(0, 5), final[1]],
      [...generateStrip(), ...generateStrip().slice(0, 10), final[2]],
    ]);

    setSpinning(true);
    setStatus("playing");

    // Stop reels sequentially
    setTimeout(() => setReelStopped((p) => [true, p[1], p[2]]), 1500);
    setTimeout(() => setReelStopped((p) => [p[0], true, p[2]]), 2200);
    setTimeout(() => {
      setReelStopped([true, true, true]);
      setSpinning(false);
      setTimeout(() => {
        setStatus(data.won ? "won" : "lost");
      }, 600);
    }, 2900);
  };

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nextPlayDate = result?.next_play_date
    ? new Date(result.next_play_date).toLocaleDateString("ru-RU", { day: "numeric", month: "long" })
    : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="font-display font-bold text-foreground">Испытай удачу</span>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-65px)] px-4 py-12">
        <AnimatePresence mode="wait">
          {/* BLOCKED */}
          {status === "blocked" && (
            <motion.div
              key="blocked"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center max-w-md w-full"
            >
              <div className="bg-surface border border-border rounded-3xl p-10 shadow-2xl">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="text-6xl mb-6"
                >
                  ⏳
                </motion.div>
                <h2 className="font-display text-2xl font-bold mb-3">Ты уже играл</h2>
                <p className="text-muted-foreground mb-6">
                  Следующая попытка: <strong className="text-foreground">{nextPlayDate}</strong>
                </p>
                {result?.last_won && result?.last_key && (
                  <div className="bg-background border border-gold/30 rounded-xl p-5 overflow-hidden">
                    <p className="text-sm text-muted-foreground mb-2">Твой ключ:</p>
                    <code className="text-gold font-mono text-xs break-all block mb-4">{result.last_key}</code>
                    <button
                      onClick={() => copyKey(result.last_key!)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-display font-bold text-sm rounded-xl w-full justify-center transition-all hover:opacity-90"
                    >
                      {copied ? <><Check className="w-4 h-4" /> Скопировано</> : <><Copy className="w-4 h-4" /> Копировать</>}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* WON */}
          {status === "won" && result?.key && (
            <motion.div
              key="won"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center max-w-md w-full"
            >
              <div className="bg-surface border-2 border-gold/40 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--gold)/0.08),transparent_70%)]" />
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.3, 1] }}
                    transition={{ duration: 0.6, ease: "backOut" }}
                    className="text-7xl mb-6"
                  >
                    🎉
                  </motion.div>
                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="font-display text-3xl font-bold text-gold mb-2"
                  >
                    Джекпот!
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-muted-foreground mb-6"
                  >
                    Вот твой бесплатный VPN-ключ:
                  </motion.p>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-background border border-gold/30 rounded-xl p-5 overflow-hidden"
                  >
                    <code className="text-gold font-mono text-xs break-all block mb-4">{result.key}</code>
                    <button
                      onClick={() => copyKey(result.key!)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-display font-bold text-sm rounded-xl w-full justify-center transition-all hover:opacity-90"
                    >
                      {copied ? <><Check className="w-4 h-4" /> Скопировано</> : <><Copy className="w-4 h-4" /> Копировать ключ</>}
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {/* LOST */}
          {status === "lost" && (
            <motion.div
              key="lost"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center max-w-md w-full"
            >
              <div className="bg-surface border border-border rounded-3xl p-10 shadow-2xl">
                <motion.div
                  initial={{ y: -20 }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 1, repeat: 1 }}
                  className="text-7xl mb-6"
                >
                  😔
                </motion.div>
                <h2 className="font-display text-2xl font-bold mb-3">Не повезло</h2>
                <p className="text-muted-foreground mb-6">Попробуй снова через месяц!</p>
                <Link
                  to="/#pricing"
                  className="inline-flex px-6 py-3 border border-gold/40 text-gold font-display font-bold rounded-xl hover:bg-gold hover:text-primary-foreground transition-all"
                >
                  Купить ключ со скидкой →
                </Link>
              </div>
            </motion.div>
          )}

          {/* SLOT MACHINE */}
          {(status === "idle" || status === "checking" || status === "playing") && (
            <motion.div
              key="machine"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="max-w-lg w-full"
            >
              {/* Title */}
              <div className="text-center mb-8">
                <motion.div
                  animate={{ rotate: spinning ? [0, -5, 5, 0] : 0 }}
                  transition={{ duration: 0.3, repeat: spinning ? Infinity : 0 }}
                  className="text-5xl mb-4"
                >
                  🎰
                </motion.div>
                <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Однорукий бандит</h1>
                <p className="text-muted-foreground">
                  Крути барабаны — собери три 🔑 и получи VPN-ключ бесплатно
                </p>
              </div>

              {/* Machine body */}
              <div className="bg-surface border-2 border-border rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                {/* Decorative top bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

                {/* Reels */}
                <div className="flex justify-center gap-3 sm:gap-4 mb-8">
                  {[0, 1, 2].map((reelIndex) => (
                    <Reel
                      key={reelIndex}
                      spinning={spinning && !reelStopped[reelIndex]}
                      symbol={finalSymbols[reelIndex]}
                      strip={reelStrips[reelIndex]}
                      stopped={reelStopped[reelIndex]}
                    />
                  ))}
                </div>

                {/* Spin button */}
                <motion.button
                  onClick={spin}
                  disabled={status !== "idle"}
                  whileHover={status === "idle" ? { scale: 1.02 } : {}}
                  whileTap={status === "idle" ? { scale: 0.97 } : {}}
                  className="w-full py-4 bg-primary text-primary-foreground font-display font-bold text-lg rounded-2xl transition-all disabled:opacity-50 gold-glow relative overflow-hidden group"
                >
                  <span className="relative z-10">
                    {status === "checking" ? "Проверяем…" : spinning ? "Крутим барабаны…" : "🎰 Крутить"}
                  </span>
                  {status === "idle" && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  )}
                </motion.button>

                {/* Info */}
                <div className="mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span>🎯 Одна попытка в месяц</span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span>🔑 Три ключа = победа</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

/* ───────── REEL COMPONENT ───────── */
const Reel = ({
  spinning,
  symbol,
  strip,
  stopped,
}: {
  spinning: boolean;
  symbol: string;
  strip: string[];
  stopped: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displaySymbols, setDisplaySymbols] = useState<string[]>(["🔑"]);
  const animRef = useRef<number>(0);
  const offsetRef = useRef(0);

  useEffect(() => {
    if (spinning && strip.length > 0) {
      setDisplaySymbols(strip);
      offsetRef.current = 0;

      const speed = 8 + Math.random() * 4;
      let pos = 0;

      const animate = () => {
        pos += speed;
        offsetRef.current = pos;
        if (containerRef.current) {
          containerRef.current.style.transform = `translateY(-${pos % (strip.length * 80)}px)`;
        }
        animRef.current = requestAnimationFrame(animate);
      };

      animRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animRef.current);
    }

    if (stopped && !spinning) {
      cancelAnimationFrame(animRef.current);
      setDisplaySymbols([symbol]);
      if (containerRef.current) {
        containerRef.current.style.transform = "translateY(0)";
        containerRef.current.style.transition = "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)";
        setTimeout(() => {
          if (containerRef.current) containerRef.current.style.transition = "";
        }, 300);
      }
    }
  }, [spinning, stopped, strip, symbol]);

  return (
    <div className="w-20 h-24 sm:w-24 sm:h-28 bg-background border-2 border-border rounded-2xl overflow-hidden relative">
      {/* Shine overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-white/5 z-10 pointer-events-none" />
      {/* Shadow edges */}
      <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

      <div
        ref={containerRef}
        className="flex flex-col items-center"
      >
        {displaySymbols.map((s, i) => (
          <div
            key={i}
            className="w-full h-24 sm:h-28 flex items-center justify-center text-4xl sm:text-5xl shrink-0"
          >
            {s}
          </div>
        ))}
      </div>

      {/* Win highlight */}
      {stopped && symbol === "🔑" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute inset-0 border-2 border-gold rounded-2xl pointer-events-none"
        />
      )}
    </div>
  );
};

export default FreeKey;
