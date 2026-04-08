const PirateHistory = () => (
  <div>
    <h2 className="fire-text" style={{ textAlign: "center", fontSize: 28, margin: "12px 0" }}>
      📜 ИСТОРИЯ ПЕРВОГО ПИРАТСКОГО РАДИО 📜
    </h2>

    <div className="retro-bevel" style={{ padding: 16, fontFamily: "'Arial'", fontSize: 13, color: "#ccc", lineHeight: 1.8 }}>
      <p className="neon-yellow" style={{ fontFamily: "Impact", fontSize: 18 }}>КАК ВСЁ НАЧИНАЛОСЬ...</p>
      <br />
      <p>
        <span className="neon-green">Февраль 2001 года.</span> Три парня из Москвы — <b style={{ color: "#ff00ff" }}>DJ Pirate</b>,{" "}
        <b style={{ color: "#00ccff" }}>HackerBoy</b> и <b style={{ color: "#ffff00" }}>SoundMaster</b> — решили, что в рунете
        не хватает свободного радио. Такого, где можно крутить любую музыку без цензуры. Где можно слушать хардбасс в 3 часа ночи.
        Где DJ не подчиняется никаким правилам.
      </p>
      <br />
      <p>
        Мы собрали комп из запчастей (Pentium III 800MHz, 256MB RAM!), поставили Winamp + SHOUTcast, подключили безлимитный
        интернет от МТУ-Интел (целых 64kbps!!!) и начали вещать.
      </p>
      <br />
      <p>
        <span className="neon-green">Март 2001.</span> Первый эфир! Слушателей — 3 человека (мы сами). Но мы не сдавались!
      </p>
      <br />
      <p>
        <span className="neon-green">Лето 2001.</span> Нас стали слушать 20–30 человек одновременно. Пошли заявки через ICQ!
        Мы добавили чат и гостевую книгу. На форуме mail.ru про нас начали писать.
      </p>
      <br />
      <p>
        <span className="neon-green">2002 год.</span> БОООМ! Нас упомянули на Udaff.com! За один день к нам пришло 500 человек!
        Сервер упал. Но мы подняли его на более мощном компе (Pentium 4, 512MB RAM, безлимитка от Корбины!). Стрим стал 128kbps!
      </p>
      <br />
      <p>
        <span className="neon-green">2003 год.</span> Золотой век! У нас постоянно онлайн 50–100 слушателей. Каждый вечер DJ Pirate
        выходил в эфир и крутил музыку до утра. У нас появились свои фанаты, свой форум, своя IRC-комната #pirate-radio на DALnet.
      </p>
      <br />
      <p>
        <span className="neon-green">2004 год.</span> Мы запустили второй стрим — «Ночной Пират» (Drum'n'Bass и Jungle 24/7).
        К нам стали приходить гостевые DJ с других радиостанций. Нас знал весь андерграунд рунета.
      </p>
      <br />
      <p>
        <span className="neon-green">2005 год.</span> Появились проблемы. Провайдер стал жаловаться на трафик. RIAA и РАПО начали
        блокировать стримы. Мы переезжали 3 раза.
      </p>
      <br />
      <p>
        <span className="neon-green">2006 год.</span> Последний эфир DJ Pirate — 31 марта 2006 года. «Мы закрываемся, но пиратский дух — навсегда!»
      </p>
      <br />

      <div style={{ textAlign: "center", margin: "12px 0" }}>
        <span className="retro-star" style={{ fontSize: 24 }}>⚓</span>
      </div>

      <p className="neon-pink" style={{ fontFamily: "Impact", fontSize: 16, textAlign: "center" }}>
        «ПИРАТСКОЕ РАДИО УМЕРЛО, НО ПИРАТСКИЙ ДУХ — БЕССМЕРТЕН!»
      </p>

      <div className="retro-hr" />

      <h3 className="neon-blue" style={{ fontFamily: "Impact", fontSize: 16 }}>НАША АППАРАТУРА:</h3>
      <ul style={{ color: "#00ff00", fontFamily: "'Courier New'", fontSize: 12, paddingLeft: 20, lineHeight: 2 }}>
        <li>Компьютер: Pentium 4 2.4GHz, 512MB DDR, 80GB HDD</li>
        <li>Звуковая карта: Creative SB Live! 5.1</li>
        <li>Микрофон: Genius Desktop Microphone (за 150 руб)</li>
        <li>Софт: Winamp 2.91 + SHOUTcast DSP Plugin v1.9.0</li>
        <li>ОС: Windows XP SP1 (крякнутый)</li>
        <li>Интернет: Корбина Телеком, 128kbps безлимит</li>
      </ul>
    </div>
  </div>
);

export default PirateHistory;
