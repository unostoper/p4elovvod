import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";

const BG_BLOCK_LABELS: Record<string, string> = {
  hero: "Главный экран",
  offers: "Предложения",
  pricing: "Цены",
  advantages: "Преимущества",
  how_it_works: "Как это работает",
  reviews: "Отзывы",
  news: "Новости",
  cta: "Призыв к действию",
  seo: "SEO",
};

interface BlockBackgroundsEditorProps {
  content: Record<string, string>;
  onChange: (c: Record<string, string>) => void;
  onSave: () => void;
  saving: boolean;
  dirty: boolean;
}

const BlockBackgroundsEditor = ({ content, onChange, onSave, saving, dirty }: BlockBackgroundsEditorProps) => {
  const updateField = (key: string, value: string) => {
    onChange({ ...content, [key]: value });
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold">Фоны блоков</h2>
        <Button onClick={onSave} disabled={!dirty || saving} className="gap-2">
          <Save className="w-4 h-4" />
          {saving ? "Сохраняю…" : "Сохранить"}
        </Button>
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        Укажите CSS-значение для фона каждого блока. Например: <code className="text-gold">#1a1a2e</code>, <code className="text-gold">linear-gradient(135deg, #1a1a2e, #16213e)</code> или оставьте пустым для фона по умолчанию.
      </p>

      <div className="space-y-4">
        {Object.entries(BG_BLOCK_LABELS).map(([key, label]) => (
          <div key={key}>
            <label className="block text-sm text-muted-foreground mb-1">{label}</label>
            <div className="flex gap-2 items-center">
              <Input
                value={content?.[key] || ""}
                onChange={(e) => updateField(key, e.target.value)}
                placeholder="По умолчанию"
              />
              {content?.[key] && (
                <div
                  className="w-10 h-10 rounded border border-border shrink-0"
                  style={{ background: content[key] }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlockBackgroundsEditor;
