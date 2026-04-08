import RetroPlayer from "./RetroPlayer";
import underConstruction from "@/assets/under-construction.png";

const PirateHome = () => (
  <div>
    <div style={{ textAlign: "center", margin: "12px 0" }}>
      <span className="neon-yellow" style={{ fontFamily: "Impact", fontSize: "clamp(18px, 4vw, 28px)" }}>
        ★ ДОБРО ПОЖАЛОВАТЬ НА БОРТ, ПИРАТ! ★
      </span>
    </div>

    {/* Main player */}
    <RetroPlayer />

    <div className="retro-hr" />

    {/* Side panels in table layout */}
    <table className="retro-table">
      <tbody>
        <tr>
          <td style={{ width: "50%", background: "#0a0a2a", border: "2px outset #555" }}>
            <h3 className="neon-pink" style={{ fontFamily: "Impact", fontSize: 16, margin: "0 0 8px" }}>
              📢 НОВОСТИ ЭФИРА
            </h3>
            <div style={{ fontFamily: "'Arial'", fontSize: 12, color: "#aaa", lineHeight: 1.6 }}>
              <p><span className="neon-green">14.03.2003</span> — Запустили новый стрим! Теперь 128kbps! Слушайте drum'n'bass каждую пятницу!</p>
              <p style={{ marginTop: 6 }}><span className="neon-green">02.02.2003</span> — DJ Pirate вернулся из отпуска. Эфир каждый день с 22:00 до 04:00 MSK.</p>
              <p style={{ marginTop: 6 }}><span className="neon-green">15.01.2003</span> — Обновили плейлист! Добавлено 50 новых треков. Качайте на здоровье!</p>
              <p style={{ marginTop: 6 }}><span className="neon-green">31.12.2002</span> — С НОВЫМ ГОДОМ!!! Новогодний эфир с 20:00!!! 🎄🎅</p>
            </div>
          </td>
          <td style={{ width: "50%", background: "#1a0a0a", border: "2px outset #555" }}>
            <h3 className="neon-blue" style={{ fontFamily: "Impact", fontSize: 16, margin: "0 0 8px" }}>
              🔥 ТОП ТРЕКИ НЕДЕЛИ
            </h3>
            <ol style={{ fontFamily: "'Courier New'", fontSize: 12, color: "#00ccff", paddingLeft: 20, lineHeight: 1.8 }}>
              <li>The Prodigy — Smack My B*tch Up</li>
              <li>Darude — Sandstorm</li>
              <li>PPK — Ночной Дозор</li>
              <li>Каста — Матрица</li>
              <li>XS Project — Хардбасс Атака</li>
            </ol>
          </td>
        </tr>
      </tbody>
    </table>

    <div className="retro-hr" />

    {/* Share buttons */}
    <div style={{ textAlign: "center", padding: "8px 0" }}>
      <p className="neon-green" style={{ fontFamily: "Impact", fontSize: 14, marginBottom: 8 }}>
        РАССКАЖИ ДРУЗЬЯМ:
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
        <button className="retro-btn retro-btn-blue" onClick={() => alert("ICQ#: 133713371")}>
          💬 ПОДЕЛИТЬСЯ В ICQ
        </button>
        <button className="retro-btn retro-btn-yellow" onClick={() => alert("Нажми Ctrl+D!")}>
          ⭐ В ЗАКЛАДКИ
        </button>
        <a href="mailto:pirate-radio@narod.ru" className="retro-btn retro-btn-green" style={{ textDecoration: "none", display: "inline-block" }}>
          📧 НАПИСАТЬ НА МЫЛО
        </a>
      </div>
    </div>

    <div className="retro-hr" />

    {/* Under construction */}
    <div style={{ textAlign: "center", padding: "8px 0" }}>
      <img src={underConstruction} alt="Under Construction" loading="lazy" width={300} style={{ maxWidth: "80%" }} />
      <p className="retro-blink neon-yellow" style={{ fontFamily: "Impact", fontSize: 14, marginTop: 4 }}>
        СЕКЦИЯ «ЧАТ» СКОРО БУДЕТ ГОТОВА!!!
      </p>
    </div>
  </div>
);

export default PirateHome;
