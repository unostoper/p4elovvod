import { useState } from "react";

interface GuestEntry {
  author: string;
  date: string;
  message: string;
  city?: string;
}

const INITIAL_ENTRIES: GuestEntry[] = [
  { author: "xXx_DarkAngel_xXx", date: "15.03.2003 22:14", message: "ВАШЕ РАДИО ПРОСТО ОГОНЬ!!! СЛУШАЮ КАЖДЫЙ ДЕНЬ!!! Привет DJ Pirate из Самары!!!", city: "Самара" },
  { author: "Hacker_007", date: "14.03.2003 19:33", message: "Парни, добавьте больше drum'n'bass плиз!!! А то одна электронщина. И ещё — у вас ICQ-бот не работает!", city: "Москва" },
  { author: "KiSsKa_2003", date: "12.03.2003 15:07", message: "Приветик всем!!! :))) Обожаю ваше радио, слушаю на работе, начальник ругается хехе ^_^ Целую DJ Pirate :-*", city: "Питер" },
  { author: "DJ_Скорпион", date: "10.03.2003 03:45", message: "Респект и уважуха!!! Я тоже хочу у вас постримить, как мне к вам попасть? Пишите в ICQ 228337441", city: "Екатеринбург" },
  { author: "NeoMatrix", date: "08.03.2003 12:00", message: "С 8 МАРТА ВСЕХ ДЕВЧОНОК!!! А кстати у вас на сайте битая ссылка на страницу скачивания. Исправьте плз", city: "Новосибирск" },
  { author: "Punk_Not_Dead", date: "05.03.2003 20:22", message: "Кру-у-уто! Но добавьте рок тоже!!! А то одна электронщина и рэпчик. PUNK'S NOT DEAD!!!", city: "Воронеж" },
  { author: "Anonимус", date: "01.03.2003 11:11", message: "первое пиратское радио рулит! добавьте в избранное, народ! ctrl+d!!!", city: "" },
  { author: "GlamourGirl", date: "28.02.2003 18:30", message: "Фу, у вас одна тяжёлая музыка! Поставьте Бритни Спирс хоть раз!!! =Р", city: "Москва" },
];

const PirateGuestbook = () => {
  const [entries, setEntries] = useState(INITIAL_ENTRIES);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!name.trim() || !message.trim()) {
      alert("Заполни имя и сообщение, пират!");
      return;
    }
    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, "0")}.${String(now.getMonth() + 1).padStart(2, "0")}.${now.getFullYear()} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    setEntries([{ author: name, date: dateStr, message, city }, ...entries]);
    setName("");
    setCity("");
    setMessage("");
  };

  return (
    <div>
      <h2 className="fire-text" style={{ textAlign: "center", fontSize: 28, margin: "12px 0" }}>
        📝 ГОСТЕВАЯ КНИГА 📝
      </h2>
      <p className="neon-green" style={{ textAlign: "center", fontFamily: "'Courier New'", fontSize: 12, marginBottom: 12 }}>
        Оставь свой след в истории пиратского радио! Без мата, пожалуйста (хотя кого мы обманываем)
      </p>

      {/* Form */}
      <div className="retro-bevel" style={{ padding: 12, marginBottom: 16 }}>
        <h3 className="neon-pink" style={{ fontFamily: "Impact", fontSize: 16, margin: "0 0 8px" }}>
          ✍ НАПИСАТЬ В ГОСТЕВУЮ:
        </h3>
        <table style={{ width: "100%", fontFamily: "'Arial'", fontSize: 13 }}>
          <tbody>
            <tr>
              <td style={{ color: "#00ccff", padding: "4px 8px 4px 0", whiteSpace: "nowrap" }}>Твой ник:</td>
              <td><input className="retro-input" value={name} onChange={e => setName(e.target.value)} placeholder="xXx_CoolHacker_xXx" /></td>
            </tr>
            <tr>
              <td style={{ color: "#00ccff", padding: "4px 8px 4px 0", whiteSpace: "nowrap" }}>Город:</td>
              <td><input className="retro-input" value={city} onChange={e => setCity(e.target.value)} placeholder="Москва" /></td>
            </tr>
            <tr>
              <td style={{ color: "#00ccff", padding: "4px 8px 4px 0", whiteSpace: "nowrap", verticalAlign: "top" }}>Сообщение:</td>
              <td><textarea className="retro-textarea" value={message} onChange={e => setMessage(e.target.value)} placeholder="Пишите что думаете!!!" /></td>
            </tr>
          </tbody>
        </table>
        <div style={{ textAlign: "center", marginTop: 8 }}>
          <button className="retro-btn retro-btn-green" onClick={handleSubmit}>
            📨 ОТПРАВИТЬ
          </button>
        </div>
      </div>

      {/* Entries */}
      <div>
        {entries.map((entry, i) => (
          <div key={i} className="retro-guestbook-entry">
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
              <span className="author">{entry.author}</span>
              <span className="date">{entry.date}{entry.city && ` • ${entry.city}`}</span>
            </div>
            <div className="message">{entry.message}</div>
          </div>
        ))}
      </div>

      <p style={{ textAlign: "center", color: "#555", fontSize: 11, marginTop: 12, fontFamily: "'Arial'" }}>
        Гостевая книга powered by narod.ru © 2001–2003
      </p>
    </div>
  );
};

export default PirateGuestbook;
