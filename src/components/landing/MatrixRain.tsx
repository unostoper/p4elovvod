import { useEffect, useRef, useState, useCallback } from "react";

const CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFZ<>{}[]|/\\=+*&^%$#@!";
const FONT_SIZE = 16;
const FADE_SPEED = 0.05;
const IDLE_TIMEOUT = 60_000; // 1 minute

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(false);
  const opacityRef = useRef(0);
  const animRef = useRef<number>(0);
  const dropsRef = useRef<number[]>([]);

  const activate = useCallback(() => {
    setActive(true);
  }, []);

  const deactivate = useCallback(() => {
    opacityRef.current = 0;
    setActive(false);
  }, []);

  // Idle detection
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      if (active) deactivate();
      clearTimeout(timer);
      timer = setTimeout(activate, IDLE_TIMEOUT);
    };

    const events = ["scroll", "mousemove", "mousedown", "keydown", "touchstart"];
    events.forEach((e) => window.addEventListener(e, resetTimer, { passive: true }));
    timer = setTimeout(activate, IDLE_TIMEOUT);

    return () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, resetTimer));
    };
  }, [active, activate, deactivate]);

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

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const columns = Math.floor(canvas.width / FONT_SIZE);
      dropsRef.current = Array(columns).fill(0).map(() => Math.random() * -50);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      // Fade in
      if (opacityRef.current < 1) {
        opacityRef.current = Math.min(1, opacityRef.current + FADE_SPEED);
      }

      ctx.fillStyle = `rgba(0, 0, 0, 0.05)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${FONT_SIZE}px monospace`;

      const drops = dropsRef.current;
      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * FONT_SIZE;
        const y = drops[i] * FONT_SIZE;

        // Random green shades
        const brightness = Math.random() * 0.5 + 0.5;
        const g = Math.floor(200 * brightness + 55);
        ctx.fillStyle = `rgba(0, ${g}, 0, ${opacityRef.current * brightness})`;
        ctx.fillText(char, x, y);

        // Bright head
        if (Math.random() > 0.95) {
          ctx.fillStyle = `rgba(180, 255, 180, ${opacityRef.current})`;
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
      className="fixed inset-0 z-50 pointer-events-none"
      style={{ opacity: opacityRef.current }}
      aria-hidden="true"
    />
  );
};

export default MatrixRain;
