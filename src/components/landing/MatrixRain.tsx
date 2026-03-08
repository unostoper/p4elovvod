import { useEffect, useRef, useState } from "react";

const CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFZ<>{}[]|/\\=+*&^%$#@!";
const FONT_SIZE = 16;
const IDLE_TIMEOUT = 10_000; // 10 seconds (for testing)

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const animRef = useRef<number>(0);
  const dropsRef = useRef<number[]>([]);
  const activeRef = useRef(false);

  // Keep ref in sync
  useEffect(() => { activeRef.current = active; }, [active]);

  // Idle detection — runs once
  useEffect(() => {
    const resetTimer = () => {
      if (activeRef.current) setActive(false);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setActive(true), IDLE_TIMEOUT);
    };

    const events = ["scroll", "mousemove", "mousedown", "keydown", "touchstart"];
    events.forEach((e) => window.addEventListener(e, resetTimer, { passive: true }));
    timerRef.current = setTimeout(() => setActive(true), IDLE_TIMEOUT);

    return () => {
      clearTimeout(timerRef.current);
      events.forEach((e) => window.removeEventListener(e, resetTimer));
    };
  }, []);

  // Canvas animation
  useEffect(() => {
    if (!active) {
      cancelAnimationFrame(animRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frameCount = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const columns = Math.floor(canvas.width / FONT_SIZE);
      dropsRef.current = Array(columns).fill(0).map(() => Math.random() * -50);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      frameCount++;

      // Gradually darken the background — starts fully transparent, slowly builds up
      const bgAlpha = Math.min(0.03, frameCount * 0.00005);
      ctx.fillStyle = `rgba(0, 0, 0, ${bgAlpha})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${FONT_SIZE}px monospace`;

      // Symbol opacity fades in over time
      const symbolAlpha = Math.min(1, frameCount / 120);

      const drops = dropsRef.current;
      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * FONT_SIZE;
        const y = drops[i] * FONT_SIZE;

        const brightness = Math.random() * 0.5 + 0.5;
        const g = Math.floor(200 * brightness + 55);
        ctx.fillStyle = `rgba(0, ${g}, 0, ${symbolAlpha * brightness})`;
        ctx.fillText(char, x, y);

        if (Math.random() > 0.95) {
          ctx.fillStyle = `rgba(180, 255, 180, ${symbolAlpha})`;
          ctx.fillText(char, x, y);
        }

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none animate-fade-in"
      aria-hidden="true"
    />
  );
};

export default MatrixRain;
