import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Trash2, Save, Download, Pencil, X, Eye, EyeOff } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  emoji: string;
  views: number;
  telegram_link: string | null;
  telegram_message_id: number | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

const BlogEditor = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [importUrls, setImportUrls] = useState("");
  const [importing, setImporting] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchPosts = async () => {
    // Use service role via edge function or direct query (RLS allows select for published)
    // For admin we need all posts including unpublished
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
      toast.error("Ошибка загрузки постов");
    } else {
      setPosts((data as BlogPost[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleImport = async () => {
    const urls = importUrls
      .split("\n")
      .map((u) => u.trim())
      .filter((u) => u.includes("t.me/"));

    if (urls.length === 0) {
      toast.error("Вставь ссылки на посты Telegram (по одной на строку)");
      return;
    }

    setImporting(true);
    try {
      const { data, error } = await supabase.functions.invoke("fetch-telegram-post", {
        body: { urls },
      });

      if (error) throw error;

      const results = data?.results || [];
      const success = results.filter((r: any) => r.success).length;
      const failed = results.filter((r: any) => !r.success);

      if (success > 0) {
        toast.success(`Импортировано: ${success} из ${urls.length}`);
        setImportUrls("");
        fetchPosts();
      }

      failed.forEach((r: any) => {
        toast.error(`${r.url}: ${r.error}`);
      });
    } catch (e) {
      console.error("Import error:", e);
      toast.error("Ошибка импорта");
    } finally {
      setImporting(false);
    }
  };

  const handleSavePost = async () => {
    if (!editingPost) return;
    setSaving(true);

    const { error } = await supabase
      .from("blog_posts")
      .update({
        title: editingPost.title,
        excerpt: editingPost.excerpt,
        content: editingPost.content,
        category: editingPost.category,
        emoji: editingPost.emoji,
        published: editingPost.published,
        updated_at: new Date().toISOString(),
      })
      .eq("id", editingPost.id);

    if (error) {
      toast.error("Ошибка сохранения");
    } else {
      toast.success("Пост сохранён");
      setEditingPost(null);
      fetchPosts();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить пост?")) return;

    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) {
      toast.error("Ошибка удаления");
    } else {
      toast.success("Пост удалён");
      fetchPosts();
    }
  };

  const handleTogglePublished = async (post: BlogPost) => {
    const { error } = await supabase
      .from("blog_posts")
      .update({ published: !post.published })
      .eq("id", post.id);

    if (error) {
      toast.error("Ошибка");
    } else {
      fetchPosts();
    }
  };

  const handleCreatePost = async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .insert({
        title: "Новый пост",
        excerpt: "",
        content: "Текст поста...",
        category: "Заметки",
        emoji: "📝",
        published: false,
      })
      .select()
      .single();

    if (error) {
      toast.error("Ошибка создания");
    } else {
      toast.success("Черновик создан");
      setEditingPost(data as BlogPost);
      fetchPosts();
    }
  };

  if (editingPost) {
    return (
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold">Редактирование поста</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setEditingPost(null)}>
              <X className="w-4 h-4 mr-1" /> Отмена
            </Button>
            <Button size="sm" onClick={handleSavePost} disabled={saving}>
              <Save className="w-4 h-4 mr-1" /> {saving ? "Сохраняю…" : "Сохранить"}
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="w-16">
              <label className="block text-xs text-muted-foreground mb-1">Emoji</label>
              <Input
                value={editingPost.emoji}
                onChange={(e) => setEditingPost({ ...editingPost, emoji: e.target.value })}
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs text-muted-foreground mb-1">Заголовок</label>
              <Input
                value={editingPost.title}
                onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">Категория</label>
            <Input
              value={editingPost.category}
              onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">Краткое описание</label>
            <Textarea
              value={editingPost.excerpt}
              onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
              rows={2}
            />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">Содержание</label>
            <Textarea
              value={editingPost.content}
              onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
              rows={15}
              className="font-mono text-sm"
            />
          </div>

          <div className="flex items-center gap-3">
            <Switch
              checked={editingPost.published}
              onCheckedChange={(checked) => setEditingPost({ ...editingPost, published: checked })}
            />
            <span className="text-sm text-muted-foreground">
              {editingPost.published ? "Опубликован" : "Черновик"}
            </span>
          </div>

          {editingPost.telegram_link && (
            <div className="text-xs text-muted-foreground">
              Источник:{" "}
              <a href={editingPost.telegram_link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {editingPost.telegram_link}
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold">Блог</h2>
        <Button size="sm" onClick={handleCreatePost} className="gap-1">
          <Plus className="w-4 h-4" /> Новый пост
        </Button>
      </div>

      {/* Import from Telegram */}
      <div className="bg-surface border border-border rounded-xl p-5 mb-8">
        <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
          <Download className="w-4 h-4 text-primary" />
          Импорт из Telegram
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          Вставь ссылки на посты (по одной на строку). Система автоматически извлечёт текст и сгенерирует заголовок.
        </p>
        <Textarea
          value={importUrls}
          onChange={(e) => setImportUrls(e.target.value)}
          placeholder={"https://t.me/p4elovvod_FM/8071\nhttps://t.me/p4elovvod_FM/8080"}
          rows={4}
          className="mb-3 font-mono text-sm"
        />
        <Button onClick={handleImport} disabled={importing || !importUrls.trim()} size="sm">
          {importing ? "Импортирую…" : "Импортировать"}
        </Button>
      </div>

      {/* Posts list */}
      {loading ? (
        <p className="text-muted-foreground">Загрузка…</p>
      ) : posts.length === 0 ? (
        <p className="text-muted-foreground">Нет постов. Импортируй из Telegram или создай вручную.</p>
      ) : (
        <div className="space-y-2">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center gap-3 bg-surface border border-border rounded-lg px-4 py-3 group"
            >
              <span className="text-lg shrink-0">{post.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-display font-semibold text-sm truncate">{post.title}</span>
                  {!post.published && (
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">черновик</span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  {post.category} · {new Date(post.created_at).toLocaleDateString("ru-RU")} · 👁 {post.views}
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleTogglePublished(post)}
                  title={post.published ? "Скрыть" : "Опубликовать"}
                >
                  {post.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setEditingPost(post)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:text-destructive"
                  onClick={() => handleDelete(post.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogEditor;
