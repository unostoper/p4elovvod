import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, Radio } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

interface RadioConfig {
  stream_url: string;
  station_name: string;
  enabled: boolean;
}

const RadioPlayer = () => {
  const { data } = useSiteContent<RadioConfig>("radio");
  const streamUrl = data?.stream_url ?? "";
  const stationName = data?.station_name ?? "ПЧЕЛОВВОД FM";
  const enabled = data?.enabled !== false;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";
    audio.volume = volume;
    audioRef.current = audio;

    audio.addEventListener("waiting", () => setLoading(true));
    audio.addEventListener("playing", () => { setLoading(false); setError(false); });
    audio.addEventListener("error", () => { setLoading(false); setError(true); setPlaying(false); });

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !streamUrl) return;

    if (playing) {
      audio.pause();
      audio.src = "";
      setPlaying(false);
    } else {
      setLoading(true);
      setError(false);
      audio.src = streamUrl;
      audio.play().catch(() => {
        setError(true);
        setLoading(false);
      });
      setPlaying(true);
    }
  }, [playing, streamUrl]);

  if (!enabled || !streamUrl) return null;

  return (
    <div className="flex items-center gap-2 bg-surface/80 backdrop-blur-sm border border-border/50 rounded-full px-3 py-1.5 shadow-lg">
      {/* ON AIR indicator */}
      <div className="flex items-center gap-1.5">
        <span className={`w-2 h-2 rounded-full ${playing && !error ? "bg-red-500 animate-pulse" : "bg-muted-foreground/40"}`} />
        <Radio className="w-3.5 h-3.5 text-gold/70" />
      </div>

      {/* Station name */}
      <span className="font-display text-[11px] font-bold text-foreground/80 tracking-wide uppercase hidden sm:inline">
        {stationName}
      </span>

      {/* Play/Pause */}
      <button
        onClick={togglePlay}
        disabled={loading}
        className="w-7 h-7 flex items-center justify-center rounded-full bg-gold/10 hover:bg-gold/20 text-gold transition-colors disabled:opacity-50"
        aria-label={playing ? "Пауза" : "Воспроизведение"}
      >
        {loading ? (
          <div className="w-3 h-3 border-2 border-gold/40 border-t-gold rounded-full animate-spin" />
        ) : playing ? (
          <Pause className="w-3.5 h-3.5" />
        ) : (
          <Play className="w-3.5 h-3.5 ml-0.5" />
        )}
      </button>

      {/* Volume */}
      <button
        onClick={() => setMuted(!muted)}
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label={muted ? "Включить звук" : "Выключить звук"}
      >
        {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
      </button>

      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        value={muted ? 0 : volume}
        onChange={(e) => { setVolume(parseFloat(e.target.value)); setMuted(false); }}
        className="w-12 h-1 accent-gold cursor-pointer"
        aria-label="Громкость"
      />

      {error && <span className="text-[10px] text-destructive">оффлайн</span>}
    </div>
  );
};

export default RadioPlayer;
