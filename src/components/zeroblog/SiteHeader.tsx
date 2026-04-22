import { Link, useLocation } from "react-router-dom";
import Marquee from "./Marquee";
import { useSiteBlocks } from "@/hooks/useSiteBlocks";

const FALLBACK_NAV = [
  { to: "/", label: "★ HOME" },
  { to: "/archive", label: "📁 ARCHIVE" },
  { to: "/about", label: "👤 ABOUT ME" },
  { to: "/admin", label: "🔐 ADMIN" },
];

const SiteHeader = ({ title, description }: { title?: string; description?: string }) => {
  const loc = useLocation();
  const { data: blocks } = useSiteBlocks();
  const hero = blocks?.hero || {};
  const marqueeText: string = blocks?.marquee_top?.text || "✦ Welcome to my homepage! ✦";
  const navItems: Array<{ to: string; label: string }> =
    blocks?.nav?.items?.length ? blocks.nav.items : FALLBACK_NAV;

  const finalTitle = title || hero.title || "ZeroBlog";
  const finalDesc = description || hero.subtitle || "Личный дневник из 2005-го";

  return (
    <header className="space-y-2">
      <div className="bevel bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan p-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 tile-stars opacity-30 pointer-events-none" />
        <h1 className="font-impact text-5xl md:text-7xl text-white text-glow-pink relative">
          <span className="text-rainbow">{finalTitle}</span>
          <span className="text-white blink-cursor">_</span>
        </h1>
        <p className="font-vt text-2xl text-neon-yellow mt-1 text-glow-cyan relative">{finalDesc}</p>
        {hero.footnote && (
          <p className="font-pixel text-[10px] text-white mt-2 relative">{hero.footnote}</p>
        )}
      </div>

      <Marquee>{marqueeText}</Marquee>

      <nav className="bevel bg-black/70 flex flex-wrap items-center justify-center gap-1 p-2">
        {navItems.map((n) => {
          const active = loc.pathname === n.to;
          return (
            <Link
              key={n.to + n.label}
              to={n.to}
              className={`bevel px-3 py-1 font-impact uppercase text-sm tracking-wider ${
                active
                  ? "bg-neon-yellow text-black"
                  : "bg-neon-purple text-white hover:bg-neon-pink"
              }`}
            >
              {n.label}
            </Link>
          );
        })}
      </nav>

      {blocks?.banners?.items?.length > 0 && (
        <div className="bevel-in bg-black/50 p-2 flex flex-wrap justify-center gap-2">
          {blocks.banners.items.map((b: any, i: number) => {
            const colorClass: Record<string, string> = {
              "neon-pink": "bg-neon-pink text-white",
              "neon-cyan": "bg-neon-cyan text-black",
              "neon-lime": "bg-neon-lime text-black",
              "neon-yellow": "bg-neon-yellow text-black",
              "neon-purple": "bg-neon-purple text-white",
              "neon-orange": "bg-neon-orange text-black",
            };
            const cls = colorClass[b.color] || "bg-neon-pink text-white";
            const inner = (
              <span className={`bevel ${cls} font-pixel text-[10px] px-2 py-1 inline-block blink`}>
                {b.label}
              </span>
            );
            return b.href ? (
              <a key={i} href={b.href} target="_blank" rel="noreferrer">
                {inner}
              </a>
            ) : (
              <span key={i}>{inner}</span>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
