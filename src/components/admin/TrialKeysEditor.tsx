import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Upload, Key } from "lucide-react";
import { toast } from "sonner";

interface TrialKey {
  id: string;
  key: string;
  assigned_ip: string | null;
  assigned_at: string | null;
  created_at: string;
}

const TrialKeysEditor = () => {
  const [keys, setKeys] = useState<TrialKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [bulkText, setBulkText] = useState("");
  const [uploading, setUploading] = useState(false);

  const fetchKeys = async () => {
    const { data, error } = await supabase
      .from("trial_keys")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Ошибка загрузки ключей");
      return;
    }
    setKeys(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchKeys(); }, []);

  const handleBulkUpload = async () => {
    const newKeys = bulkText
      .split("\n")
      .map((k) => k.trim())
      .filter((k) => k.length > 0);

    if (newKeys.length === 0) {
      toast.error("Введите хотя бы один ключ");
      return;
    }

    setUploading(true);
    const { error } = await supabase
      .from("trial_keys")
      .insert(newKeys.map((key) => ({ key })));

    if (error) {
      toast.error(error.message.includes("duplicate") ? "Некоторые ключи уже существуют" : "Ошибка добавления");
    } else {
      toast.success(`Добавлено ${newKeys.length} ключей`);
      setBulkText("");
      fetchKeys();
    }
    setUploading(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("trial_keys").delete().eq("id", id);
    if (error) {
      toast.error("Ошибка удаления");
    } else {
      setKeys((prev) => prev.filter((k) => k.id !== id));
    }
  };

  const freeCount = keys.filter((k) => !k.assigned_ip).length;
  const assignedCount = keys.filter((k) => k.assigned_ip).length;

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Key className="w-6 h-6 text-gold" />
        <h2 className="font-display text-2xl font-bold">Пробные ключи</h2>
      </div>

      <div className="flex gap-4 mb-6 text-sm">
        <span className="text-muted-foreground">
          Всего: <strong className="text-foreground">{keys.length}</strong>
        </span>
        <span className="text-muted-foreground">
          Свободных: <strong className="text-green-500">{freeCount}</strong>
        </span>
        <span className="text-muted-foreground">
          Выдано: <strong className="text-gold">{assignedCount}</strong>
        </span>
      </div>

      {/* Bulk upload */}
      <div className="mb-8 space-y-3">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
          Загрузить ключи (по одному на строку)
        </h3>
        <Textarea
          value={bulkText}
          onChange={(e) => setBulkText(e.target.value)}
          placeholder={"vless://abc123...\nvless://def456...\nvless://ghi789..."}
          rows={5}
          className="font-mono text-xs"
        />
        <Button onClick={handleBulkUpload} disabled={uploading || !bulkText.trim()} className="gap-2">
          <Upload className="w-4 h-4" />
          {uploading ? "Загрузка…" : "Загрузить"}
        </Button>
      </div>

      {/* Keys list */}
      <div className="space-y-2">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">
          Список ключей
        </h3>
        {loading ? (
          <p className="text-muted-foreground text-sm">Загрузка…</p>
        ) : keys.length === 0 ? (
          <p className="text-muted-foreground text-sm">Ключей пока нет</p>
        ) : (
          keys.map((k) => (
            <div
              key={k.id}
              className="flex items-center gap-3 bg-surface border border-border rounded-lg px-4 py-3"
            >
              <code className="flex-1 text-xs font-mono truncate text-foreground">
                {k.key}
              </code>
              {k.assigned_ip ? (
                <span className="text-xs text-gold shrink-0">
                  {k.assigned_ip}
                </span>
              ) : (
                <span className="text-xs text-green-500 shrink-0">свободен</span>
              )}
              <button
                onClick={() => handleDelete(k.id)}
                className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TrialKeysEditor;
