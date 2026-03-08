import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Save, Binary } from "lucide-react";

interface MatrixEditorProps {
  content: any;
  onChange: (c: any) => void;
  onSave: () => void;
  saving: boolean;
  dirty: boolean;
}

const MatrixEditor = ({ content, onChange, onSave, saving, dirty }: MatrixEditorProps) => {
  const enabled = content?.enabled !== false;
  const timeout = content?.timeout ?? 60;

  const update = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold flex items-center gap-2">
          <Binary className="w-6 h-6 text-green-500" />
          Эффект «Матрица»
        </h2>
        <Button onClick={onSave} disabled={!dirty || saving} className="gap-2">
          <Save className="w-4 h-4" />
          {saving ? "Сохраняю…" : "Сохранить"}
        </Button>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Switch checked={enabled} onCheckedChange={(v) => update("enabled", v)} />
          <span className="text-sm text-muted-foreground">{enabled ? "Эффект включён" : "Эффект выключен"}</span>
        </div>

        <div>
          <label className="block text-sm text-muted-foreground mb-1">Таймер бездействия (секунды)</label>
          <Input
            type="number"
            min={5}
            max={600}
            value={timeout}
            onChange={(e) => update("timeout", Math.max(5, parseInt(e.target.value) || 60))}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Через сколько секунд без движения мыши/скролла начнут падать символы (5–600 сек)
          </p>
        </div>
      </div>
    </div>
  );
};

export default MatrixEditor;
