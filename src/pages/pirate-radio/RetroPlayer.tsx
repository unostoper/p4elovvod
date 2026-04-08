import { useState, useRef, useEffect, useCallback } from "react";

interface Track {
  title: string;
  artist: string;
  genre: string;
  duration: string;
}

const TRACKS: Track[] = [
  { title: "Digital Pirates", artist: "DJ Pirate", genre: "Trance", duration: "5:23" },
  { title: "Матрица", artist: "Каста", genre: "Русский Рэп", duration: "4:11" },
  { title: "Ночной Дозор", artist: "PPK", genre: "Eurodance", duration: "3:45" },
  { title: "Хардбасс Атака", artist: "XS Project", genre: "Hardbass", duration: "4:02" },
  { title: "Pirate Station", artist: "DJ Gvozd", genre: "Drum'n'Bass", duration: "6:18" },
  { title: "Электричка", artist: "Кирпичи", genre: "Русский Рэп", duration: "3:33" },
  { title: "Better Off Alone", artist: "Alice Deejay", genre: "Eurodance", duration: "3:28" },
  { title: "Sandstorm", artist: "Darude", genre: "Trance", duration: "5:31" },
  { title: "Smack My B*tch Up", artist: "The Prodigy", genre: "Electronic", duration: "5:42" },
  { title: "Кислотный DJ", artist: "Вирус", genre: "Eurodance", duration: "3:55" },
];

const RetroPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [bars, setBars] = useState<number[]>(Array(20).fill(4));
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const [elapsed, setElapsed] = useState(0);

  // Animate waveform when playing
  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setBars(prev => prev.map(() => Math.random() * 36 + 4));
        setElapsed(e => e + 1);
      }, 150);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setBars(Array(20).fill(4));
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [playing]);

  const togglePlay = () => setPlaying(!playing);
  const nextTrack = () => {
    setCurrentTrack(i => (i + 1) % TRACKS.length);
    setElapsed(0);
  };
  const prevTrack = () => {
    setCurrentTrack(i => (i - 1 + TRACKS.length) % TRACKS.length);
    setElapsed(0);
  };

  const track = TRACKS[currentTrack];
  const mins = Math.floor(elapsed / 7);
  const secs = (elapsed * 9) % 60;

  return (
    <div className="retro-player">
      {/* Screen */}
      <div className="retro-player-screen">
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#009900" }}>
          <span>FM 101.3 MHz</span>
          <span>{playing ? "▶ PLAYING" : "■ STOPPED"}</span>
        </div>
        <div style={{ fontSize: 18, fontWeight: "bold", marginTop: 6, color: "#00ff00" }}>
          {track.artist}
        </div>
        <div style={{ fontSize: 14, color: "#00cc00" }}>
          «{track.title}»
        </div>
        <div style={{ fontSize: 11, color: "#007700", marginTop: 2 }}>
          [{track.genre}] • {track.duration}
        </div>
        <div style={{ fontSize: 11, color: "#005500", marginTop: 4 }}>
          {String(mins).padStart(2, "0")}:{String(Math.floor(secs)).padStart(2, "0")} / {track.duration}
        </div>
      </div>

      {/* Waveform visualizer */}
      <div className="retro-waveform" style={{ marginTop: 10 }}>
        {bars.map((h, i) => (
          <div key={i} className="retro-waveform-bar" style={{ height: h }} />
        ))}
      </div>

      {/* Frequency indicator */}
      <div style={{
        marginTop: 8, background: "#000", border: "2px inset #333",
        padding: "4px 8px", display: "flex", justifyContent: "space-between",
        fontFamily: "'Courier New'", fontSize: 11, color: "#00cc00"
      }}>
        <span>FREQ: 101.3 FM</span>
        <span>BITRATE: 128kbps</span>
        <span>STEREO</span>
        <span>VOL: {Math.round(volume * 100)}%</span>
      </div>

      {/* Controls */}
      <div className="retro-player-controls">
        <button className="retro-btn retro-btn-blue" onClick={prevTrack}>⏮ PREV</button>
        <button className="retro-btn retro-btn-green" onClick={togglePlay} style={{ minWidth: 100 }}>
          {playing ? "⏸ PAUSE" : "▶ PLAY"}
        </button>
        <button className="retro-btn retro-btn-blue" onClick={nextTrack}>NEXT ⏭</button>
        <button className="retro-btn retro-btn-red" onClick={() => setPlaying(false)}>⏹ STOP</button>
      </div>

      {/* Volume */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 10 }}>
        <span style={{ color: "#888", fontSize: 12, fontFamily: "'Arial'" }}>🔈</span>
        <input
          type="range" min="0" max="1" step="0.05"
          value={volume}
          onChange={e => setVolume(parseFloat(e.target.value))}
          className="retro-volume"
        />
        <span style={{ color: "#888", fontSize: 12, fontFamily: "'Arial'" }}>🔊</span>
      </div>

      {/* ON AIR button */}
      <div style={{ textAlign: "center", marginTop: 14 }}>
        <button
          className="retro-btn"
          onClick={() => { setPlaying(true); setCurrentTrack(Math.floor(Math.random() * TRACKS.length)); setElapsed(0); }}
          style={{
            background: playing
              ? "linear-gradient(180deg, #ff0000, #990000)"
              : "linear-gradient(180deg, #ff4444, #cc0000)",
            color: "#fff", fontSize: 18, padding: "10px 30px",
            border: "3px outset #ff6666"
          }}
        >
          📡 В ЭФИР
        </button>
        {playing && (
          <p className="retro-blink neon-red" style={{ fontSize: 13, marginTop: 6, fontFamily: "Impact" }}>
            🎙 DJ PIRATE В ПРЯМОМ ЭФИРЕ 🎙
          </p>
        )}
      </div>

      {/* Track list */}
      <div style={{ marginTop: 14 }}>
        <table className="retro-playlist-table">
          <thead>
            <tr>
              <th>#</th>
              <th>ТРЕК</th>
              <th>ЖАНР</th>
              <th>⏱</th>
            </tr>
          </thead>
          <tbody>
            {TRACKS.map((t, i) => (
              <tr
                key={i}
                onClick={() => { setCurrentTrack(i); setPlaying(true); setElapsed(0); }}
                style={i === currentTrack ? { background: "#002200" } : undefined}
              >
                <td style={i === currentTrack ? { color: "#ffff00" } : undefined}>
                  {i === currentTrack && playing ? "▶" : (i + 1)}
                </td>
                <td>{t.artist} — {t.title}</td>
                <td>{t.genre}</td>
                <td>{t.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RetroPlayer;
