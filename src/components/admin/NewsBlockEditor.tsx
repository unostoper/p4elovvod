import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus, Trash2, Upload, Image } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const FONT_OPTIONS = [
  { label: "По умолчанию", value: "" },
  { label: "Space Grotesk", value: "Space Grotesk, sans-serif" },
  { label: "Inter", value: "Inter, sans-serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Courier", value: "Courier New, monospace" },
];

interface NewsItem {
  date: string;
  title: string;
  desc: string;
  image?: string;
  titleFont?: string;
  textFont?: string;
}

interface Props {
  content: { title: string; items: NewsItem[] };
  onChange: (c: any) => void;
  onSave: () => void;
  saving: boolean;
  dirty: boolean;
}

const NewsBlockEditor = ({ content, onChange, onSave, saving, dirty }: Props) => {
  const [uploading, setUploading] = useState<number | null>(null);

  const updateTitle = (val: string) => onChange({ ...content, title: val });

  const updateItem = (i: number, field: string, val: string) => {
    const items = [...content.items];
    items[i] = { ...items[i], [field]: val };
    onChange({ ...content, items });
  };

  const addItem = () => {
    onChange({
      ...content,
      items: [
        { date: new Date().toISOString().split("T")[0], title: "", desc: "", image: "", titleFont: "", textFont: "" },
        ...content.items,
      ],
    });
  };

  const removeItem = (i: number) => {
    const items = [...content.items];
    items.splice(i, 1);
    onChange({ ...content, items });
  };

  const handleImageUpload = async (i: number, file: File) => {
    setUploading(i);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const { data, error } = await supabase.functions.invoke("upload-news-image", {
        body: formData,
      });
      if (error) throw error;
      updateItem(i, "image", data.url);
      toast.success("Фото загружено");
    } catch {
      toast.error("Ошибка загрузки фото");
    } finally {
      setUploading(null);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold">Новости</h2>
        <Button onClick={onSave} disabled={!dirty || saving} className="gap-2">
          <Save className="w-4 h-4" />
          {saving ? "Сохраняю…" : "Сохранить"}
        </Button>
      </div>

      <div className="mb-6">
        <label className="block text-sm text-muted-foreground mb-1">Заголовок раздела</label>
        <Input value={content.title || ""} onChange={(e) => updateTitle(e.target.value)} />
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-lg">Новости ({content.items?.length || 0})</h3>
        <Button variant="outline" size="sm" onClick={addItem} className="gap-1">
          <Plus className="w-4 h-4" /> Добавить
        </Button>
      </div>

      <div className="space-y-6">
        {content.items?.map((item, i) => (
          <div key={i} className="bg-surface border border-border rounded-lg p-4 space-y-3 relative">
            <button
              onClick={() => removeItem(i)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-destructive transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Дата</label>
                <Input value={item.date} onChange={(e) => updateItem(i, "date", e.target.value)} />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Фото</label>
                <div className="flex gap-2">
                  {item.image ? (
                    <div className="flex items-center gap-2 flex-1">
                      <img src={item.image} alt="" className="w-10 h-7 object-cover rounded" />
                      <button
                        onClick={() => updateItem(i, "image", "")}
                        className="text-xs text-muted-foreground hover:text-destructive"
                      >
                        Удалить
                      </button>
                    </div>
                  ) : (
                    <label className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer flex-1">
                      <Upload className="w-4 h-4" />
                      {uploading === i ? "Загрузка…" : "Загрузить"}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handleImageUpload(i, f);
                        }}
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs text-muted-foreground mb-1">Заголовок</label>
              <Input value={item.title} onChange={(e) => updateItem(i, "title", e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Шрифт заголовка</label>
                <select
                  value={item.titleFont || ""}
                  onChange={(e) => updateItem(i, "titleFont", e.target.value)}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                >
                  {FONT_OPTIONS.map((f) => (
                    <option key={f.value} value={f.value}>{f.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Шрифт текста</label>
                <select
                  value={item.textFont || ""}
                  onChange={(e) => updateItem(i, "textFont", e.target.value)}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                >
                  {FONT_OPTIONS.map((f) => (
                    <option key={f.value} value={f.value}>{f.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-muted-foreground mb-1">Текст новости</label>
              <Textarea
                value={item.desc}
                onChange={(e) => updateItem(i, "desc", e.target.value)}
                rows={4}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsBlockEditor;
