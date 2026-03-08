import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Gamepad2, Copy, Check } from "lucide-react";
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

const FreeKey = () => {
  const [status, setStatus] = useState<GameStatus>("idle");
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [result, setResult] = useState<GameResult | null>(null);
  const [copied, setCopied] = useState(false);

  const playGame = async (gameType: string) => {
    setSelectedGame(gameType);
    setStatus("checking");

    const { data, error } = await supabase.functions.invoke("play-game", {
      body: { game_type: gameType },
    });

    if (error) {
      toast.error("Ошибка подключения");
      setStatus("idle");
      return;
    }

    setResult(data);

    if (!data.allowed) {
      setStatus("blocked");
      return;
    }

    setStatus("playing");

    // Simulate game animation delay
    return data;
  };

  const finishGame = (data: GameResult) => {
    setStatus(data.won ? "won" : "lost");
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
          <Gamepad2 className="w-5 h-5 text-gold" />
          <span className="font-display font-bold text-foreground">Выиграй бесплатный ключ</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">🎰 Испытай удачу</h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Выбери игру и попробуй выиграть бесплатный VPN-ключ. Одна попытка в месяц — используй её с умом!
          </p>
        </div>

        {/* Blocked state */}
        {status === "blocked" && (
          <div className="text-center bg-surface border border-border rounded-2xl p-8 max-w-md mx-auto animate-fade-in">
            <div className="text-5xl mb-4">⏳</div>
            <h2 className="font-display text-xl font-bold mb-2">Ты уже играл</h2>
            <p className="text-muted-foreground mb-4">
              Следующая попытка будет доступна <strong className="text-foreground">{nextPlayDate}</strong>
            </p>
            {result?.last_won && result?.last_key && (
              <div className="bg-background border border-gold/30 rounded-lg p-4 mt-4">
                <p className="text-sm text-muted-foreground mb-2">Твой выигранный ключ:</p>
                <div className="flex items-center gap-2 justify-center">
                  <code className="text-gold font-mono text-sm">{result.last_key}</code>
                  <button onClick={() => copyKey(result.last_key!)} className="text-muted-foreground hover:text-gold">
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Won state */}
        {status === "won" && result?.key && (
          <div className="text-center bg-surface border border-gold/40 rounded-2xl p-8 max-w-md mx-auto animate-fade-in">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="font-display text-2xl font-bold text-gold mb-2">Ты выиграл!</h2>
            <p className="text-muted-foreground mb-6">Вот твой бесплатный VPN-ключ:</p>
            <div className="bg-background border border-gold/30 rounded-lg p-4">
              <div className="flex items-center gap-2 justify-center">
                <code className="text-gold font-mono">{result.key}</code>
                <button onClick={() => copyKey(result.key!)} className="text-muted-foreground hover:text-gold">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Lost state */}
        {status === "lost" && (
          <div className="text-center bg-surface border border-border rounded-2xl p-8 max-w-md mx-auto animate-fade-in">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="font-display text-2xl font-bold mb-2">Не повезло</h2>
            <p className="text-muted-foreground mb-4">Попробуй снова через месяц!</p>
            <Link to="/#pricing" className="text-gold hover:underline text-sm">
              Или купи ключ со скидкой →
            </Link>
          </div>
        )}

        {/* Game selection */}
        {(status === "idle" || status === "checking" || status === "playing") && status !== "blocked" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SlotMachine
              onPlay={playGame}
              onFinish={finishGame}
              active={selectedGame === "slots" && status === "playing"}
              disabled={status !== "idle"}
            />
            <CoinFlip
              onPlay={playGame}
              onFinish={finishGame}
              active={selectedGame === "coinflip" && status === "playing"}
              disabled={status !== "idle"}
            />
            <ScratchCard
              onPlay={playGame}
              onFinish={finishGame}
              active={selectedGame === "scratch" && status === "playing"}
              disabled={status !== "idle"}
            />
          </div>
        )}
      </main>
    </div>
  );
};

/* ───────── SLOT MACHINE ───────── */
interface GameProps {
  onPlay: (type: string) => Promise<GameResult | undefined>;
  onFinish: (result: GameResult) => void;
  active: boolean;
  disabled: boolean;
}

const SLOT_SYMBOLS = ["🍒", "🔑", "💎", "⚡", "🏴‍☠️", "🍋", "7️⃣"];

const SlotMachine = ({ onPlay, onFinish, active, disabled }: GameProps) => {
  const [reels, setReels] = useState(["🔑", "🔑", "🔑"]);
  const [spinning, setSpinning] = useState(false);
  const resultRef = useRef<GameResult | null>(null);

  const spin = async () => {
    const data = await onPlay("slots");
    if (!data) return;
    resultRef.current = data;
    setSpinning(true);

    // Spin animation
    let ticks = 0;
    const maxTicks = 20;
    const interval = setInterval(() => {
      setReels([
        SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
        SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
        SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
      ]);
      ticks++;
      if (ticks >= maxTicks) {
        clearInterval(interval);
        const finalReels = data.won
          ? ["🔑", "🔑", "🔑"]
          : [
              SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
              SLOT_SYMBOLS[Math.floor(Math.random() * (SLOT_SYMBOLS.length - 1)) + 1],
              SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
            ];
        setReels(finalReels);
        setSpinning(false);
        setTimeout(() => onFinish(data), 800);
      }
    }, 100);
  };

  return (
    <div className="bg-surface border border-border rounded-2xl p-6 text-center hover:border-gold/30 transition-colors">
      <div className="text-3xl mb-3">🎰</div>
      <h3 className="font-display text-lg font-bold mb-2">Однорукий бандит</h3>
      <p className="text-muted-foreground text-sm mb-6">Собери три одинаковых символа</p>

      <div className="flex justify-center gap-2 mb-6">
        {reels.map((symbol, i) => (
          <div
            key={i}
            className={`w-16 h-16 bg-background border border-border rounded-lg flex items-center justify-center text-3xl ${
              spinning ? "animate-pulse" : ""
            }`}
          >
            {symbol}
          </div>
        ))}
      </div>

      <button
        onClick={spin}
        disabled={disabled || spinning}
        className="w-full px-6 py-3 bg-primary text-primary-foreground font-display font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {spinning ? "Крутим…" : "Крутить"}
      </button>
    </div>
  );
};

/* ───────── COIN FLIP ───────── */
const CoinFlip = ({ onPlay, onFinish, active, disabled }: GameProps) => {
  const [flipping, setFlipping] = useState(false);
  const [face, setFace] = useState<"heads" | "tails" | null>(null);

  const flip = async () => {
    const data = await onPlay("coinflip");
    if (!data) return;
    setFlipping(true);

    // Flip animation
    let ticks = 0;
    const interval = setInterval(() => {
      setFace(ticks % 2 === 0 ? "heads" : "tails");
      ticks++;
      if (ticks >= 16) {
        clearInterval(interval);
        setFace(data.won ? "heads" : "tails");
        setFlipping(false);
        setTimeout(() => onFinish(data), 800);
      }
    }, 120);
  };

  return (
    <div className="bg-surface border border-border rounded-2xl p-6 text-center hover:border-gold/30 transition-colors">
      <div className="text-3xl mb-3">🪙</div>
      <h3 className="font-display text-lg font-bold mb-2">Орёл или решка</h3>
      <p className="text-muted-foreground text-sm mb-6">Угадай — выпадет орёл (🔑)</p>

      <div
        className={`w-20 h-20 mx-auto mb-6 bg-background border-2 border-gold/30 rounded-full flex items-center justify-center text-4xl transition-transform ${
          flipping ? "animate-spin" : ""
        }`}
      >
        {face === null ? "🪙" : face === "heads" ? "🔑" : "💀"}
      </div>

      <button
        onClick={flip}
        disabled={disabled || flipping}
        className="w-full px-6 py-3 bg-primary text-primary-foreground font-display font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {flipping ? "Подбрасываем…" : "Подбросить"}
      </button>
    </div>
  );
};

/* ───────── SCRATCH CARD ───────── */
const ScratchCard = ({ onPlay, onFinish, active, disabled }: GameProps) => {
  const [revealed, setRevealed] = useState<boolean[]>([false, false, false, false, false, false, false, false, false]);
  const [symbols, setSymbols] = useState<string[]>(Array(9).fill("❓"));
  const [scratching, setScratching] = useState(false);
  const resultRef = useRef<GameResult | null>(null);
  const [gameStarted, setGameStarted] = useState(false);

  const startScratch = async () => {
    const data = await onPlay("scratch");
    if (!data) return;
    resultRef.current = data;
    setGameStarted(true);
    setScratching(true);

    // Generate symbols
    const winSymbol = "🔑";
    const loseSymbols = ["💀", "🍋", "⚡", "🏴‍☠️", "💎"];
    let grid: string[];

    if (data.won) {
      grid = Array(9).fill("").map((_, i) =>
        i < 3 ? winSymbol : loseSymbols[Math.floor(Math.random() * loseSymbols.length)]
      );
    } else {
      grid = Array(9).fill("").map(() =>
        loseSymbols[Math.floor(Math.random() * loseSymbols.length)]
      );
      // Ensure max 2 of same symbol
      grid[0] = "🔑";
    }

    // Shuffle
    for (let i = grid.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [grid[i], grid[j]] = [grid[j], grid[i]];
    }

    setSymbols(grid);
  };

  const revealCell = (index: number) => {
    if (!scratching || revealed[index]) return;
    const newRevealed = [...revealed];
    newRevealed[index] = true;
    setRevealed(newRevealed);

    // Check if all revealed
    if (newRevealed.filter(Boolean).length >= 9) {
      setTimeout(() => {
        setScratching(false);
        if (resultRef.current) onFinish(resultRef.current);
      }, 500);
    }
  };

  const revealAll = () => {
    setRevealed(Array(9).fill(true));
    setTimeout(() => {
      setScratching(false);
      if (resultRef.current) onFinish(resultRef.current);
    }, 500);
  };

  return (
    <div className="bg-surface border border-border rounded-2xl p-6 text-center hover:border-gold/30 transition-colors">
      <div className="text-3xl mb-3">🎟️</div>
      <h3 className="font-display text-lg font-bold mb-2">Скретч-карта</h3>
      <p className="text-muted-foreground text-sm mb-6">Найди 3 ключа 🔑 под покрытием</p>

      <div className="grid grid-cols-3 gap-1.5 mb-6 max-w-[200px] mx-auto">
        {symbols.map((symbol, i) => (
          <button
            key={i}
            onClick={() => revealCell(i)}
            disabled={!scratching}
            className={`w-14 h-14 rounded-lg flex items-center justify-center text-2xl transition-all ${
              revealed[i]
                ? "bg-background border border-border"
                : "bg-gold/20 border border-gold/40 hover:bg-gold/30 cursor-pointer"
            }`}
          >
            {revealed[i] ? symbol : "✦"}
          </button>
        ))}
      </div>

      {!gameStarted ? (
        <button
          onClick={startScratch}
          disabled={disabled}
          className="w-full px-6 py-3 bg-primary text-primary-foreground font-display font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          Стереть
        </button>
      ) : scratching ? (
        <button
          onClick={revealAll}
          className="w-full px-6 py-3 border border-gold/40 text-gold font-display font-bold rounded-lg hover:bg-gold hover:text-primary-foreground transition-all"
        >
          Открыть всё
        </button>
      ) : null}
    </div>
  );
};

export default FreeKey;
