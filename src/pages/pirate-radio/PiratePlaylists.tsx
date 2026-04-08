const PLAYLISTS = [
  {
    name: "🎧 TRANCE / EURODANCE",
    color: "#00ccff",
    tracks: [
      "Darude — Sandstorm",
      "Alice Deejay — Better Off Alone",
      "ATB — 9pm (Till I Come)",
      "Robert Miles — Children",
      "Faithless — Insomnia",
      "PPK — ResuRection",
      "Chicane — Saltwater",
      "Sash! — Encore Une Fois",
    ],
  },
  {
    name: "🔥 HARDBASS / ELECTRONIC",
    color: "#ff00ff",
    tracks: [
      "XS Project — Хардбасс Атака",
      "XS Project — Бочка Басс Колбасёр",
      "The Prodigy — Smack My B*tch Up",
      "The Prodigy — Firestarter",
      "Chemical Brothers — Block Rockin' Beats",
      "Fatboy Slim — Right Here Right Now",
      "Aphex Twin — Windowlicker",
    ],
  },
  {
    name: "🎤 РУССКИЙ РЭП",
    color: "#00ff00",
    tracks: [
      "Каста — Матрица",
      "Каста — Вокруг шум",
      "Кирпичи — Электричка",
      "Кирпичи — Джедай",
      "Centr — Город Дорог",
      "Бумбокс — Та4то",
      "Lumen — Сид и Нэнси",
    ],
  },
  {
    name: "🥁 DRUM'N'BASS",
    color: "#ffff00",
    tracks: [
      "Pendulum — Slam",
      "DJ Gvozd — Pirate Station Mix #5",
      "Sub Focus — Rock It",
      "Chase & Status — End Credits",
      "High Contrast — If We Ever",
      "Netsky — Memory Lane",
    ],
  },
  {
    name: "🎸 ROCK / ALTERNATIVE",
    color: "#ff6600",
    tracks: [
      "Linkin Park — In The End",
      "System of a Down — Toxicity",
      "Nirvana — Smells Like Teen Spirit",
      "Rammstein — Du Hast",
      "Metallica — Enter Sandman",
      "Limp Bizkit — Rollin'",
    ],
  },
];

const PiratePlaylists = () => (
  <div>
    <h2 className="fire-text" style={{ textAlign: "center", fontSize: 28, margin: "12px 0" }}>
      🎵 ПЛЕЙЛИСТЫ ПИРАТСКОГО РАДИО 🎵
    </h2>
    <p className="neon-green" style={{ textAlign: "center", fontFamily: "'Courier New'", fontSize: 12, marginBottom: 16 }}>
      Лучшая музыка рунета • Обновляется каждый понедельник • Слушай бесплатно!
    </p>

    {PLAYLISTS.map((pl, idx) => (
      <div key={idx} className="retro-bevel" style={{ marginBottom: 16, padding: 12 }}>
        <h3 style={{ color: pl.color, fontFamily: "Impact", fontSize: 20, margin: "0 0 8px", textTransform: "uppercase" }}>
          {pl.name}
        </h3>
        <table className="retro-playlist-table">
          <thead>
            <tr>
              <th style={{ width: 40 }}>#</th>
              <th>ТРЕК</th>
              <th style={{ width: 80 }}>БИТРЕЙТ</th>
            </tr>
          </thead>
          <tbody>
            {pl.tracks.map((t, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{t}</td>
                <td>128kbps</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ))}
  </div>
);

export default PiratePlaylists;
