import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Gamepad2 } from "lucide-react";

interface GamesEditorProps {
  content: any;
  onChange: (c: any) => void;
  onSave: () => void;
  saving: boolean;
  dirty: boolean;
}

const GamesEditor = ({ content, onChange, onSave, saving, dirty }: GamesEditorProps) => {
  const winChance = content?.win_chance ?? 20;

  const update = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold flex items-center gap-2">
          <Gamepad2 className="w-6 h-6 text-gold" />
          Игры — бесплатный ключ
        </h2>
        <Button onClick={onSave} disabled={!dirty || saving} className="gap-2">
          <Save className="w-4 h-4" />
          {saving ? "Сохраняю…" : "Сохранить"}
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm text-muted-foreground mb-1">Вероятность выигрыша (%)</label>
          <Input
            type="number"
            min={0}
            max={100}
            value={winChance}
            onChange={(e) => update("win_chance", Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
          />
          <p className="text-xs text-muted-foreground mt-1">
            От 0 до 100. Текущее: {winChance}% — из 100 игроков ~{winChance} выиграют ключ.
          </p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-4">
          <h3 className="font-display font-semibold text-sm mb-2">Статистика</h3>
          <p className="text-xs text-muted-foreground">
            Шанс проигрыша: {100 - winChance}% · Ограничение: 1 игра в месяц на IP
          </p>
        </div>
      </div>
    </div>
  );
};

export default GamesEditor;
