const PirateContacts = () => (
  <div>
    <h2 className="fire-text" style={{ textAlign: "center", fontSize: 28, margin: "12px 0" }}>
      📡 КОНТАКТЫ / КАК ПОЙМАТЬ ВОЛНУ 📡
    </h2>

    <table className="retro-table">
      <tbody>
        <tr>
          <td style={{ width: "50%", background: "#0a0a2a", border: "2px outset #555", padding: 14 }}>
            <h3 className="neon-pink" style={{ fontFamily: "Impact", fontSize: 18, margin: "0 0 10px" }}>
              📧 СВЯЗЬ С НАМИ
            </h3>
            <div style={{ fontFamily: "'Courier New'", fontSize: 13, color: "#00ff00", lineHeight: 2 }}>
              <p>E-mail: <a href="mailto:pirate-radio@narod.ru" style={{ color: "#00ccff" }}>pirate-radio@narod.ru</a></p>
              <p>ICQ: <span style={{ color: "#ffff00" }}>133713371</span></p>
              <p>IRC: <span style={{ color: "#ff00ff" }}>#pirate-radio @ irc.dalnet.ru</span></p>
              <p>Форум: <span style={{ color: "#00ccff" }}>pirate-radio.fastbb.ru</span></p>
              <p>ЖЖ: <span style={{ color: "#00ccff" }}>pirate-radio.livejournal.com</span></p>
            </div>

            <div className="retro-hr" />

            <h4 className="neon-yellow" style={{ fontFamily: "Impact", fontSize: 14 }}>НАША КОМАНДА:</h4>
            <ul style={{ color: "#ccc", fontFamily: "'Arial'", fontSize: 12, paddingLeft: 16, lineHeight: 1.8 }}>
              <li><span style={{ color: "#ff00ff" }}>DJ Pirate</span> — основатель, главный DJ</li>
              <li><span style={{ color: "#00ccff" }}>HackerBoy</span> — техническая поддержка, вебмастер</li>
              <li><span style={{ color: "#ffff00" }}>SoundMaster</span> — звукорежиссёр, подбор треков</li>
              <li><span style={{ color: "#00ff00" }}>DarkKnight</span> — ночной DJ (с 02:00 до 06:00)</li>
            </ul>
          </td>

          <td style={{ width: "50%", background: "#0a1a0a", border: "2px outset #555", padding: 14 }}>
            <h3 className="neon-blue" style={{ fontFamily: "Impact", fontSize: 18, margin: "0 0 10px" }}>
              📻 КАК ПОЙМАТЬ ВОЛНУ
            </h3>
            <div style={{ fontFamily: "'Arial'", fontSize: 13, color: "#ccc", lineHeight: 1.8 }}>
              <p><b className="neon-green">Шаг 1:</b> Скачай Winamp (winamp.com)</p>
              <p><b className="neon-green">Шаг 2:</b> Открой Winamp, нажми Ctrl+L</p>
              <p><b className="neon-green">Шаг 3:</b> Вставь адрес потока:</p>
              <div className="retro-bevel-inset" style={{ padding: 8, margin: "6px 0", fontFamily: "'Courier New'", fontSize: 14 }}>
                <span className="neon-yellow">http://stream.pirate-radio.ru:8000/live</span>
              </div>
              <p><b className="neon-green">Шаг 4:</b> Жми OK и наслаждайся!</p>

              <div className="retro-hr" />

              <p style={{ fontSize: 12, color: "#888" }}>
                Требования: Интернет 56kbps+ (рекомендуется 128kbps+).
                Winamp 2.91 или выше. Windows 98/ME/2000/XP.
              </p>
              <p style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
                Также работает в XMMS (Linux) и iTunes (Mac OS X).
              </p>
            </div>

            <div className="retro-hr" />

            <h4 className="neon-yellow" style={{ fontFamily: "Impact", fontSize: 14 }}>РАСПИСАНИЕ ЭФИРОВ:</h4>
            <div style={{ fontFamily: "'Courier New'", fontSize: 12, color: "#00ff00", lineHeight: 1.8 }}>
              <p>ПН–ПТ: 22:00 — 04:00 (DJ Pirate)</p>
              <p>СБ: 20:00 — 06:00 (МАРАФОН)</p>
              <p>ВС: 18:00 — 02:00 (Тематический эфир)</p>
              <p style={{ color: "#ff00ff" }}>Ночной эфир: 02:00 — 06:00 (DarkKnight)</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div className="retro-hr" />

    <div style={{ textAlign: "center" }}>
      <p className="neon-green" style={{ fontFamily: "Impact", fontSize: 14, marginBottom: 8 }}>
        ХОЧЕШЬ СТАТЬ DJ НА НАШЕМ РАДИО?
      </p>
      <p style={{ color: "#aaa", fontFamily: "'Arial'", fontSize: 12 }}>
        Пиши на pirate-radio@narod.ru с темой «ХОЧУ В ЭФИР». Приложи свой микс (до 10 минут, 128kbps MP3).
        Если нам понравится — дадим слот!
      </p>
    </div>
  </div>
);

export default PirateContacts;
