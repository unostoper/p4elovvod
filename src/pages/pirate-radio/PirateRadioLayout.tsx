import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import tileBg from "@/assets/retro-tile-bg.jpg";
import skullImg from "@/assets/pirate-skull.png";
import "./retro.css";

const NAV_ITEMS = [
  { path: "/pirate-radio", label: "🏠 ГЛАВНАЯ" },
  { path: "/pirate-radio/playlists", label: "🎵 ПЛЕЙЛИСТЫ" },
  { path: "/pirate-radio/history", label: "📜 ИСТОРИЯ" },
  { path: "/pirate-radio/guestbook", label: "📝 ГОСТЕВАЯ" },
  { path: "/pirate-radio/downloads", label: "💾 СКАЧАТЬ" },
  { path: "/pirate-radio/contacts", label: "📡 КОНТАКТЫ" },
];

const PirateRadioLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <div className="retro-site retro-bg-tile" style={{ backgroundImage: `url(${tileBg})` }}>
      {/* Top marquee */}
      <div className="retro-marquee">
        <div className="retro-marquee-inner">
          ★ ПЕРВОЕ ПИРАТСКОЕ РАДИО ИНТЕРНЕТА ★ 2001–2006 ★ СВОБОДНАЯ МУЗЫКА БЕЗ ЦЕНЗУРЫ ★ DJ PIRATE В ПРЯМОМ ЭФИРЕ ★ КАЧАЙ МУЗЫКУ БЕСПЛАТНО ★ ДОБАВЬ В ИЗБРАННОЕ CTRL+D ★ ПИШИ НА МЫЛО pirate-radio@narod.ru ★
        </div>
      </div>

      {/* Header */}
      <header style={{ textAlign: "center", padding: "16px 8px 8px" }}>
        <div style={{ display: "inline-block", position: "relative" }}>
          <img src={skullImg} alt="Пиратское Радио" width={120} height={120} style={{ display: "block", margin: "0 auto" }} />
          <span className="retro-blink neon-red" style={{
            position: "absolute", top: 0, right: -60,
            background: "#ff0000", color: "#fff", padding: "2px 10px",
            fontFamily: "Impact", fontSize: 14, border: "2px solid #ffff00",
            transform: "rotate(12deg)", display: "inline-block"
          }}>
            ON AIR
          </span>
        </div>
        <h1 className="fire-text" style={{ fontSize: "clamp(24px, 5vw, 48px)", margin: "8px 0 0", letterSpacing: 2 }}>
          ПЕРВОЕ ПИРАТСКОЕ РАДИО
        </h1>
        <p className="neon-green" style={{ fontFamily: "'Courier New', monospace", fontSize: 13, margin: "4px 0" }}>
          ▶ ВЕЩАЕМ С 2001 ГОДА ▶ ПИРАТСКАЯ ВОЛНА РУНЕТА ▶
        </p>
      </header>

      {/* Navigation */}
      <nav className="retro-nav">
        {NAV_ITEMS.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={location.pathname === item.path ? "active" : ""}
          >
            {item.label}
          </Link>
        ))}
        <Link to="/" style={{ color: "#ff6666" }}>
          ← НАЗАД
        </Link>
      </nav>

      <div className="retro-hr" />

      {/* Content */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 8px 20px" }}>
        {children}
      </div>

      <div className="retro-hr" />

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "16px 8px 24px", fontFamily: "'Arial', sans-serif", fontSize: 11 }}>
        <p style={{ color: "#888" }}>
          © 2001–2006 ПЕРВОЕ ПИРАТСКОЕ РАДИО • Хостинг: narod.ru • Сделано в Блокноте
        </p>
        <p style={{ color: "#555", marginTop: 4 }}>
          Best viewed with <span style={{ color: "#00ccff" }}>Netscape Navigator 4.7</span> • Resolution 1024x768 • 16 bit color
        </p>
        <div style={{ marginTop: 8 }}>
          <span className="retro-counter">013337</span>
        </div>
        <p style={{ color: "#555", fontSize: 10, marginTop: 4 }}>посетителей с 14.02.2001</p>
        <div style={{ marginTop: 8, display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <span style={{ color: "#666" }}>🏴‍☠️ Пиратство — это свобода!</span>
          <span className="retro-star" style={{ fontSize: 20 }}>⭐</span>
          <span style={{ color: "#666" }}>📧 pirate-radio@narod.ru</span>
        </div>
      </footer>
    </div>
  );
};

export default PirateRadioLayout;
