import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Save, Radio } from "lucide-react";

interface RadioEditorProps {
  content: any;
  onChange: (c: any) => void;
  onSave: () => void;
  saving: boolean;
  dirty: boolean;
}

const RadioEditor = ({ content, onChange, onSave, saving, dirty }: RadioEditorProps) => {
  const streamUrl = content?.stream_url ?? "";
  const stationName = content?.station_name ?? "ПЧЕЛОВВОД FM";
  const enabled = content?.enabled !== false;

  const update = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold flex items-center gap-2">
          <Radio className="w-6 h-6 text-gold" />
          Онлайн-радио
        </h2>
        <Button onClick={onSave} disabled={!dirty || saving} className="gap-2">
          <Save className="w-4 h-4" />
          {saving ? "Сохраняю…" : "Сохранить"}
        </Button>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Switch checked={enabled} onCheckedChange={(v) => update("enabled", v)} />
          <span className="text-sm text-muted-foreground">{enabled ? "Радио включено" : "Радио выключено"}</span>
        </div>

        <div>
          <label className="block text-sm text-muted-foreground mb-1">Название станции</label>
          <Input
            value={stationName}
            onChange={(e) => update("station_name", e.target.value)}
            placeholder="ПЧЕЛОВВОД FM"
          />
        </div>

        <div>
          <label className="block text-sm text-muted-foreground mb-1">URL аудиопотока</label>
          <Input
            value={streamUrl}
            onChange={(e) => update("stream_url", e.target.value)}
            placeholder="https://your-server.com:8000/stream.mp3"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Icecast/Shoutcast стрим URL (.mp3 или .ogg). Без URL плеер не отображается.
          </p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <h3 className="font-display font-semibold mb-3">📡 Как запустить Icecast бесплатно</h3>
          <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
            <p><strong>1. Арендуй VPS</strong> — подойдёт любой за $3–5/мес (Hetzner, Timeweb, Firstvds). Ubuntu 22.04.</p>
            <p><strong>2. Установи Icecast:</strong></p>
            <pre className="bg-background rounded-lg p-3 text-xs font-mono overflow-x-auto">
{`sudo apt update && sudo apt install -y icecast2
# При установке задай пароли admin/source/relay
sudo systemctl enable icecast2
sudo systemctl start icecast2`}
            </pre>
            <p><strong>3. Установи Liquidsoap</strong> (автоматический эфир из MP3):</p>
            <pre className="bg-background rounded-lg p-3 text-xs font-mono overflow-x-auto">
{`sudo apt install -y liquidsoap
# Создай файл radio.liq:`}
            </pre>
            <pre className="bg-background rounded-lg p-3 text-xs font-mono overflow-x-auto">
{`#!/usr/bin/liquidsoap
set("log.file.path", "/tmp/radio.log")

# Папка с музыкой
music = playlist("/home/radio/music")

# Подключение к Icecast
output.icecast(
  %mp3(bitrate=192),
  host="localhost",
  port=8000,
  password="your_source_password",
  mount="/stream.mp3",
  music
)`}
            </pre>
            <p><strong>4. Запусти:</strong></p>
            <pre className="bg-background rounded-lg p-3 text-xs font-mono overflow-x-auto">
{`mkdir -p /home/radio/music
# Загрузи MP3 файлы в эту папку
liquidsoap /path/to/radio.liq &`}
            </pre>
            <p><strong>5. URL потока:</strong> <code className="bg-background px-1.5 py-0.5 rounded">http://YOUR_SERVER_IP:8000/stream.mp3</code></p>
            <p>Вставь этот URL выше — и радио заработает на сайте!</p>
            <p className="text-gold/80"><strong>Бесплатная альтернатива:</strong> <a href="https://zeno.fm" target="_blank" rel="noopener noreferrer" className="underline hover:text-gold">Zeno.fm</a> — загрузи MP3, получи stream URL без VPS.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadioEditor;
