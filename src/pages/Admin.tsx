import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAllSiteContent, useUpdateSiteContent } from "@/hooks/useSiteContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Save, Plus, Trash2, ArrowLeft } from "lucide-react";
import NewsBlockEditor from "@/components/admin/NewsBlockEditor";
import BlogEditor from "@/components/admin/BlogEditor";
import RadioEditor from "@/components/admin/RadioEditor";
import MatrixEditor from "@/components/admin/MatrixEditor";
import GamesEditor from "@/components/admin/GamesEditor";
import BlockBackgroundsEditor from "@/components/admin/BlockBackgroundsEditor";
import TrialKeysEditor from "@/components/admin/TrialKeysEditor";
import { Switch } from "@/components/ui/switch";
import { useBlockVisibilityAdmin } from "@/hooks/useBlockVisibility";

const BLOCK_LABELS: Record<string, string> = {
  hero: "Главный экран",
  advantages: "Преимущества",
  how_it_works: "Как это работает",
  reviews: "Отзывы",
  cta: "Призыв к действию",
  news: "Новости",
  trial_modal: "Окно выдачи ключа",
  block_backgrounds: "Фоны блоков",
  page_shop: "Магазин",
  page_blog: "Блог",
  page_news: "Новости (страница)",
};

const Admin = () => {
  const navigate = useNavigate();
  const { data: blocks, isLoading } = useAllSiteContent();
  const updateMutation = useUpdateSiteContent();
  const [editState, setEditState] = useState<Record<string, any>>({});
  const [activeBlock, setActiveBlock] = useState<string | null>(null);
  const { visibility, toggle: toggleVisibility, saving: visibilitySaving } = useBlockVisibilityAdmin();

  const VISIBILITY_BLOCKS = ["hero", "offers", "pricing", "advantages", "how_it_works", "reviews", "news", "cta", "seo"];
  const VISIBILITY_PAGES = ["page_shop", "page_blog", "page_news"];

  useEffect(() => {
    if (!sessionStorage.getItem("admin_token")) {
      navigate("/captain-hook-panel/login", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    navigate("/captain-hook-panel/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Загрузка…</p>
      </div>
    );
  }

  const getContent = (id: string) => {
    if (editState[id] !== undefined) return editState[id];
    const block = blocks?.find((b) => b.id === id);
    return block?.content ?? {};
  };

  const setContent = (id: string, content: any) => {
    setEditState((prev) => ({ ...prev, [id]: content }));
  };

  const handleSave = (id: string) => {
    const content = getContent(id);
    updateMutation.mutate(
      { id, content },
      {
        onSuccess: () => {
          toast.success(`Блок «${BLOCK_LABELS[id] || id}» сохранён`);
          setEditState((prev) => {
            const next = { ...prev };
            delete next[id];
            return next;
          });
        },
        onError: () => toast.error("Ошибка сохранения"),
      }
    );
  };

  const isDirty = (id: string) => editState[id] !== undefined;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 bg-background z-10">
        <div className="flex items-center gap-3">
          <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </a>
          <h1 className="font-display text-xl font-bold">Админ-панель</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground text-xs">Редактирование контента сайта</span>
          <Button variant="outline" size="sm" onClick={handleLogout}>Выйти</Button>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-65px)]">
        <nav className="w-56 border-r border-border p-4 space-y-1 shrink-0">
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">Видимость блоков</h3>
            {VISIBILITY_BLOCKS.map((id) => (
              <div key={id} className="flex items-center justify-between px-3 py-1.5">
                <span className="text-sm text-muted-foreground">{BLOCK_LABELS[id] || id}</span>
                <Switch
                  checked={visibility[id] !== false}
                  onCheckedChange={() => toggleVisibility(id)}
                  disabled={visibilitySaving}
                  className="scale-75"
                />
              </div>
            ))}
          </div>
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">Видимость страниц</h3>
            {VISIBILITY_PAGES.map((id) => (
              <div key={id} className="flex items-center justify-between px-3 py-1.5">
                <span className="text-sm text-muted-foreground">{BLOCK_LABELS[id] || id}</span>
                <Switch
                  checked={visibility[id] !== false}
                  onCheckedChange={() => toggleVisibility(id)}
                  disabled={visibilitySaving}
                  className="scale-75"
                />
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">Управление</h3>
            <button
              onClick={() => setActiveBlock("radio")}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                activeBlock === "radio"
                  ? "bg-primary/10 text-gold font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              } ${isDirty("radio") ? "border-l-2 border-gold" : ""}`}
            >
              📻 Онлайн-радио
            </button>
            <button
              onClick={() => setActiveBlock("matrix")}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                activeBlock === "matrix"
                  ? "bg-primary/10 text-gold font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              } ${isDirty("matrix") ? "border-l-2 border-gold" : ""}`}
            >
              🟩 Эффект «Матрица»
            </button>
            <button
              onClick={() => setActiveBlock("games")}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                activeBlock === "games"
                  ? "bg-primary/10 text-gold font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              } ${isDirty("games") ? "border-l-2 border-gold" : ""}`}
            >
              🎰 Игры
            </button>
            <button
              onClick={() => setActiveBlock("trial_keys")}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                activeBlock === "trial_keys"
                  ? "bg-primary/10 text-gold font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              Пробные ключи
            </button>
            <button
              onClick={() => setActiveBlock("block_backgrounds")}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                activeBlock === "block_backgrounds"
                  ? "bg-primary/10 text-gold font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              } ${isDirty("block_backgrounds") ? "border-l-2 border-gold" : ""}`}
            >
              Фоны блоков
            </button>
          </div>
          <div className="border-t border-border pt-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">Редактирование</h3>
            {blocks?.filter(b => b.id !== "block_visibility").map((block) => (
              <button
                key={block.id}
                onClick={() => setActiveBlock(block.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeBlock === block.id
                    ? "bg-primary/10 text-gold font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                } ${isDirty(block.id) ? "border-l-2 border-gold" : ""}`}
              >
                {BLOCK_LABELS[block.id] || block.id}
              </button>
            ))}
          </div>
        </nav>

        <main className="flex-1 p-6 overflow-auto">
          {!activeBlock ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Выбери блок для редактирования ←
            </div>
          ) : activeBlock === "radio" ? (
            <RadioEditor
              content={getContent("radio")}
              onChange={(c) => setContent("radio", c)}
              onSave={() => handleSave("radio")}
              saving={updateMutation.isPending}
              dirty={isDirty("radio")}
            />
          ) : activeBlock === "matrix" ? (
            <MatrixEditor
              content={getContent("matrix")}
              onChange={(c) => setContent("matrix", c)}
              onSave={() => handleSave("matrix")}
              saving={updateMutation.isPending}
              dirty={isDirty("matrix")}
            />
          ) : activeBlock === "trial_keys" ? (
            <TrialKeysEditor />
          ) : activeBlock === "blog" ? (
            <BlogEditor />
          ) : activeBlock === "block_backgrounds" ? (
            <BlockBackgroundsEditor
              content={getContent("block_backgrounds")}
              onChange={(c) => setContent("block_backgrounds", c)}
              onSave={() => handleSave("block_backgrounds")}
              saving={updateMutation.isPending}
              dirty={isDirty("block_backgrounds")}
            />
          ) : activeBlock === "news" ? (
            <NewsBlockEditor
              content={getContent("news")}
              onChange={(c) => setContent("news", c)}
              onSave={() => handleSave("news")}
              saving={updateMutation.isPending}
              dirty={isDirty("news")}
            />
          ) : (
            <BlockEditor
              id={activeBlock}
              content={getContent(activeBlock)}
              onChange={(c) => setContent(activeBlock, c)}
              onSave={() => handleSave(activeBlock)}
              saving={updateMutation.isPending}
              dirty={isDirty(activeBlock)}
            />
          )}
        </main>
      </div>
    </div>
  );
};

interface BlockEditorProps {
  id: string;
  content: any;
  onChange: (c: any) => void;
  onSave: () => void;
  saving: boolean;
  dirty: boolean;
}

const BlockEditor = ({ id, content, onChange, onSave, saving, dirty }: BlockEditorProps) => {
  const updateField = (key: string, value: string) => {
    onChange({ ...content, [key]: value });
  };

  const updateArrayItem = (arrKey: string, index: number, field: string, value: string) => {
    const arr = [...(content[arrKey] || [])];
    arr[index] = { ...arr[index], [field]: value };
    onChange({ ...content, [arrKey]: arr });
  };

  const addArrayItem = (arrKey: string, template: any) => {
    const arr = [...(content[arrKey] || []), template];
    onChange({ ...content, [arrKey]: arr });
  };

  const removeArrayItem = (arrKey: string, index: number) => {
    const arr = [...(content[arrKey] || [])];
    arr.splice(index, 1);
    onChange({ ...content, [arrKey]: arr });
  };

  const arrayKey = content.items ? "items" : content.steps ? "steps" : null;
  const arrayData: any[] = arrayKey ? content[arrayKey] || [] : [];

  const simpleFields = Object.entries(content).filter(
    ([k, v]) => typeof v === "string"
  ) as [string, string][];

  const FIELD_LABELS: Record<string, string> = {
    title: "Заголовок",
    subtitle: "Подзаголовок",
    badge: "Бейдж",
    cta_primary: "Кнопка (основная)",
    cta_secondary: "Кнопка (вторичная)",
    desc: "Описание",
    name: "Имя",
    text: "Текст",
    date: "Дата",
    num: "Номер",
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold">
          {BLOCK_LABELS[id] || id}
        </h2>
        <Button onClick={onSave} disabled={!dirty || saving} className="gap-2">
          <Save className="w-4 h-4" />
          {saving ? "Сохраняю…" : "Сохранить"}
        </Button>
      </div>

      <div className="space-y-4 mb-8">
        {simpleFields.map(([key, val]) => (
          <div key={key}>
            <label className="block text-sm text-muted-foreground mb-1">
              {FIELD_LABELS[key] || key}
            </label>
            {val.length > 60 ? (
              <Textarea
                value={val}
                onChange={(e) => updateField(key, e.target.value)}
                rows={3}
              />
            ) : (
              <Input
                value={val}
                onChange={(e) => updateField(key, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>

      {arrayKey && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-lg">
              Элементы ({arrayData.length})
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const template = arrayData[0]
                  ? Object.fromEntries(Object.keys(arrayData[0]).map((k) => [k, ""]))
                  : { title: "", desc: "" };
                addArrayItem(arrayKey, template);
              }}
              className="gap-1"
            >
              <Plus className="w-4 h-4" /> Добавить
            </Button>
          </div>

          <div className="space-y-4">
            {arrayData.map((item: any, i: number) => (
              <div
                key={i}
                className="bg-surface border border-border rounded-lg p-4 space-y-3 relative"
              >
                <button
                  onClick={() => removeArrayItem(arrayKey, i)}
                  className="absolute top-3 right-3 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {Object.entries(item)
                  .filter(([, v]) => typeof v === "string")
                  .map(([field, val]) => (
                    <div key={field}>
                      <label className="block text-xs text-muted-foreground mb-1">
                        {FIELD_LABELS[field] || field}
                      </label>
                      {(val as string).length > 50 ? (
                        <Textarea
                          value={val as string}
                          onChange={(e) =>
                            updateArrayItem(arrayKey, i, field, e.target.value)
                          }
                          rows={2}
                        />
                      ) : (
                        <Input
                          value={val as string}
                          onChange={(e) =>
                            updateArrayItem(arrayKey, i, field, e.target.value)
                          }
                        />
                      )}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
