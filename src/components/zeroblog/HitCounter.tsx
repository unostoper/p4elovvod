import { useEffect, useState } from "react";

const HitCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const stored = Number(localStorage.getItem("zeroblog_hits") || "133742");
    const next = stored + 1;
    localStorage.setItem("zeroblog_hits", String(next));
    setCount(next);
  }, []);

  const digits = String(count).padStart(7, "0").split("");

  return (
    <div className="inline-flex items-center gap-1 bevel-in bg-black px-2 py-1">
      {digits.map((d, i) => (
        <span
          key={i}
          className="font-pixel text-sm text-neon-lime bg-black px-1 border border-neon-lime/40"
        >
          {d}
        </span>
      ))}
    </div>
  );
};

export default HitCounter;
