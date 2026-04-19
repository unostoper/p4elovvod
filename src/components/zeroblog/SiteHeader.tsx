import { Link, useLocation } from "react-router-dom";
import Marquee from "./Marquee";

const nav = [
  { to: "/", label: "★ HOME" },
  { to: "/archive", label: "📁 ARCHIVE" },
  { to: "/about", label: "👤 ABOUT ME" },
  { to: "/admin", label: "🔐 ADMIN" },
];

const SiteHeader = ({ title = "ZeroBlog", description = "Личный дневник из 2005-го" }) => {
  const loc = useLocation();
  return (
    <header className="space-y-2">
      <div className="bevel bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan p-4 text-center">
        <h1 className="font-impact text-5xl md:text-7xl text-white text-glow-pink">
          <span className="text-rainbow">{title}</span>
          <span className="text-white blink">_</span>
        </h1>
        <p className="font-vt text-2xl text-neon-yellow mt-1 text-glow-cyan">{description}</p>
        <p className="font-pixel text-[10px] text-white mt-2">
          Best viewed in Internet Explorer 6 @ 1024×768
        </p>
      </div>

      <Marquee>
        ✦ Welcome to my homepage! ✦ Sign my guestbook! ✦ Don't forget to bookmark! ✦
        New posts every week! ✦ This site is best viewed with Netscape Navigator ✦
      </Marquee>

      <nav className="bevel bg-black/70 flex flex-wrap items-center justify-center gap-1 p-2">
        {nav.map((n) => {
          const active = loc.pathname === n.to;
          return (
            <Link
              key={n.to}
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
    </header>
  );
};

export default SiteHeader;
