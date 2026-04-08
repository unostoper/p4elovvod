const DOWNLOADS = [
  { file: "Darude_-_Sandstorm.mp3", size: "4.2 MB", quality: "128kbps", category: "Trance" },
  { file: "The_Prodigy_-_Smack_My_Bitch_Up.mp3", size: "5.8 MB", quality: "192kbps", category: "Electronic" },
  { file: "PPK_-_ResuRection.mp3", size: "3.9 MB", quality: "128kbps", category: "Trance" },
  { file: "Kasta_-_Vokrug_Shum.mp3", size: "4.5 MB", quality: "128kbps", category: "Рэп" },
  { file: "XS_Project_-_Hardbass_Ataka.mp3", size: "3.7 MB", quality: "128kbps", category: "Hardbass" },
  { file: "Linkin_Park_-_In_The_End.mp3", size: "4.1 MB", quality: "128kbps", category: "Rock" },
  { file: "Alice_Deejay_-_Better_Off_Alone.mp3", size: "3.5 MB", quality: "128kbps", category: "Eurodance" },
  { file: "Kirpichi_-_Elektrichka.mp3", size: "3.3 MB", quality: "128kbps", category: "Рэп" },
  { file: "Pendulum_-_Slam.mp3", size: "5.1 MB", quality: "192kbps", category: "DnB" },
  { file: "Rammstein_-_Du_Hast.mp3", size: "4.8 MB", quality: "128kbps", category: "Rock" },
  { file: "ATB_-_9pm_Till_I_Come.mp3", size: "3.6 MB", quality: "128kbps", category: "Trance" },
  { file: "Fatboy_Slim_-_Right_Here_Right_Now.mp3", size: "4.4 MB", quality: "128kbps", category: "Electronic" },
];

const PirateDownloads = () => (
  <div>
    <h2 className="fire-text" style={{ textAlign: "center", fontSize: 28, margin: "12px 0" }}>
      💾 СКАЧАТЬ МУЗЫКУ 💾
    </h2>

    <div className="retro-bevel-inset" style={{ padding: 10, marginBottom: 12, textAlign: "center" }}>
      <p className="retro-blink neon-yellow" style={{ fontFamily: "Impact", fontSize: 14 }}>
        ⚠ ВНИМАНИЕ: СКАЧИВАНИЕ MP3 ФАЙЛОВ МОЖЕТ БЫТЬ НЕЗАКОННЫМ В ВАШЕЙ СТРАНЕ! ⚠
      </p>
      <p style={{ color: "#888", fontSize: 11, fontFamily: "'Arial'", marginTop: 4 }}>
        Администрация сайта не несёт ответственности за использование скачанных файлов.
        Все файлы предоставлены исключительно для ознакомления. После прослушивания удалите файлы с вашего компьютера.
      </p>
    </div>

    <div className="retro-bevel" style={{ padding: 12 }}>
      <table className="retro-playlist-table">
        <thead>
          <tr>
            <th>#</th>
            <th>ФАЙЛ</th>
            <th>РАЗМЕР</th>
            <th>КАЧЕСТВО</th>
            <th>ЖАНР</th>
            <th>СКАЧАТЬ</th>
          </tr>
        </thead>
        <tbody>
          {DOWNLOADS.map((d, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td style={{ color: "#00ccff" }}>{d.file}</td>
              <td>{d.size}</td>
              <td>{d.quality}</td>
              <td>{d.category}</td>
              <td>
                <button
                  className="retro-dl-link"
                  style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "inherit" }}
                  onClick={() => alert(`Файл ${d.file} — ссылка битая :(\nПопробуйте позже или пишите на pirate-radio@narod.ru`)}
                >
                  СКАЧАТЬ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="retro-hr" />

    <div style={{ textAlign: "center" }}>
      <p className="neon-green" style={{ fontFamily: "'Courier New'", fontSize: 12 }}>
        💡 СОВЕТ: Используйте ReGet или FlashGet для докачки файлов!
      </p>
      <p style={{ color: "#666", fontSize: 11, fontFamily: "'Arial'", marginTop: 4 }}>
        Зеркала: pirate-radio.narod.ru | pirate-radio.by.ru | pirate-radio.boom.ru
      </p>
    </div>
  </div>
);

export default PirateDownloads;
