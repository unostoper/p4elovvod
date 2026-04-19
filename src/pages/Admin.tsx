import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { clearAdminToken, getAdminToken, isAdmin } from "@/lib/admin";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const Admin = () => {
  const qc = useQueryClient();
  const [tab, setTab] = useState<"posts" | "settings" | "telegram">("posts");

  if (!isAdmin()) return <Navigate to="/admin/login" replace />;

  return (
    <div className="container py-4 max-w-5xl space-y-4">
      <div className="bevel bg-black/85 p-3 flex flex-wrap items-center justify-between gap-2">
        <h1 className="font-impact text-3xl text-rainbow">⚙ ZeroBlog Admin</h1>
        <div className="flex gap-2">
          {(["posts", "settings", "telegram"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`bevel px-3 py-1 font-impact uppercase ${
                tab === t ? "bg-neon-yellow text-black" : "bg-neon-purple text-white"
              }`}
            >
              {t}
            </button>
          ))}
          <button
            onClick={() => {
              clearAdminToken();
              window.location.href = "/admin/login";
            }}
            className="bevel bg-destructive text-white px-3 py-1 font-impact uppercase"
          >
            logout
          </button>
        </div>
      </div>

      {tab === "posts" && <PostsTab qc={qc} />}
      {tab === "settings" && <SettingsTab qc={qc} />}
      {tab === "telegram" && <TelegramTab qc={qc} />}
    </div>
  );
};

const PostsTab = ({ qc }: { qc: any }) => {
  const { data: posts } = useQuery({
    queryKey: ["admin_posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("zeroblog_posts")
        .select("*")
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  const [edit, setEdit] = useState<any | null>(null);

  const save = useMutation({
    mutationFn: async (p: any) => {
      const { error } = await supabase.functions.invoke("zeroblog-admin", {
        body: { action: "save_post", token: getAdminToken(), post: p },
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Сохранено");
      setEdit(null);
      qc.invalidateQueries({ queryKey: ["admin_posts"] });
      qc.invalidateQueries({ queryKey: ["zeroblog_posts_list"] });
    },
    onError: (e: any) => toast.error(e.message || "Ошибка"),
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.functions.invoke("zeroblog-admin", {
        body: { action: "delete_post", token: getAdminToken(), id },
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Удалено");
      qc.invalidateQueries({ queryKey: ["admin_posts"] });
      qc.invalidateQueries({ queryKey: ["zeroblog_posts_list"] });
    },
  });

  return (
    <div className="space-y-3">
      <Button
        onClick={() =>
          setEdit({
            id: null,
            title: "",
            content: "",
            emoji: "✨",
            media: [],
            published: true,
          })
        }
        className="bevel bg-neon-lime text-black font-impact uppercase"
      >
        + New post
      </Button>

      {edit && (
        <div className="bevel bg-black/85 p-4 space-y-3">
          <input
            className="bevel-in w-full bg-neon-purple/30 px-3 py-2 font-vt text-xl text-white"
            placeholder="title"
            value={edit.title}
            onChange={(e) => setEdit({ ...edit, title: e.target.value })}
          />
          <input
            className="bevel-in w-32 bg-neon-purple/30 px-3 py-2 font-vt text-xl text-white"
            placeholder="emoji"
            value={edit.emoji || ""}
            onChange={(e) => setEdit({ ...edit, emoji: e.target.value })}
          />
          <textarea
            className="bevel-in w-full bg-neon-purple/30 px-3 py-2 font-vt text-lg text-white min-h-[200px]"
            placeholder="content"
            value={edit.content}
            onChange={(e) => setEdit({ ...edit, content: e.target.value })}
          />
          <input
            className="bevel-in w-full bg-neon-purple/30 px-3 py-2 font-vt text-base text-white"
            placeholder='media JSON, например: [{"url":"https://...","type":"photo"}]'
            value={JSON.stringify(edit.media || [])}
            onChange={(e) => {
              try {
                setEdit({ ...edit, media: JSON.parse(e.target.value) });
              } catch {
                /* ignore */
              }
            }}
          />
          <label className="flex items-center gap-2 font-vt text-xl text-neon-yellow">
            <input
              type="checkbox"
              checked={edit.published}
              onChange={(e) => setEdit({ ...edit, published: e.target.checked })}
            />
            Опубликован
          </label>
          <div className="flex gap-2">
            <Button
              onClick={() => save.mutate(edit)}
              disabled={save.isPending}
              className="bevel bg-neon-pink text-white font-impact uppercase"
            >
              save
            </Button>
            <Button
              onClick={() => setEdit(null)}
              className="bevel bg-muted text-white font-impact uppercase"
            >
              cancel
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {posts?.map((p: any) => (
          <div key={p.id} className="bevel bg-black/70 p-3 flex items-center justify-between gap-2">
            <div className="font-vt text-xl text-white truncate">
              <span className={p.published ? "text-neon-lime" : "text-muted-foreground"}>
                {p.published ? "●" : "○"}
              </span>{" "}
              {p.emoji} {p.title || "(без названия)"}
              <span className="text-neon-cyan text-sm ml-2">
                {new Date(p.published_at).toLocaleDateString("ru-RU")}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEdit(p)}
                className="bevel bg-neon-yellow text-black font-impact text-sm px-2 py-1"
              >
                edit
              </button>
              <button
                onClick={() => {
                  if (confirm("Удалить пост?")) del.mutate(p.id);
                }}
                className="bevel bg-destructive text-white font-impact text-sm px-2 py-1"
              >
                del
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SettingsTab = ({ qc }: { qc: any }) => {
  const { data } = useQuery({
    queryKey: ["zeroblog_settings_admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("zeroblog_settings")
        .select("*")
        .eq("id", 1)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });
  const [s, setS] = useState<any>(null);
  useEffect(() => {
    if (data) setS(data);
  }, [data]);

  const save = useMutation({
    mutationFn: async (settings: any) => {
      const { error } = await supabase.functions.invoke("zeroblog-admin", {
        body: { action: "save_settings", token: getAdminToken(), settings },
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Настройки сохранены");
      qc.invalidateQueries({ queryKey: ["zeroblog_settings"] });
      qc.invalidateQueries({ queryKey: ["zeroblog_settings_admin"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  if (!s) return null;
  return (
    <div className="bevel bg-black/85 p-4 space-y-3">
      {[
        ["site_title", "Название сайта"],
        ["site_description", "Описание"],
        ["author_name", "Имя автора"],
        ["accent_color", "Акцентный цвет (hex)"],
        ["tg_channel", "Telegram канал (@name или ссылка)"],
      ].map(([k, label]) => (
        <label key={k} className="block font-vt text-xl text-neon-yellow">
          {label}
          <input
            className="bevel-in w-full bg-neon-purple/30 px-3 py-2 font-vt text-xl text-white"
            value={s[k] || ""}
            onChange={(e) => setS({ ...s, [k]: e.target.value })}
          />
        </label>
      ))}
      <Button
        onClick={() => save.mutate(s)}
        disabled={save.isPending}
        className="bevel bg-neon-pink text-white font-impact uppercase"
      >
        save settings
      </Button>
    </div>
  );
};

const TelegramTab = ({ qc }: { qc: any }) => {
  const [log, setLog] = useState<string>("");

  const importNow = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke("zeroblog-import-telegram", {
        body: { token: getAdminToken() },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      setLog(JSON.stringify(data, null, 2));
      toast.success(`Импортировано постов: ${data?.imported ?? 0}`);
      qc.invalidateQueries({ queryKey: ["admin_posts"] });
      qc.invalidateQueries({ queryKey: ["zeroblog_posts_list"] });
    },
    onError: (e: any) => {
      setLog(String(e.message || e));
      toast.error("Ошибка импорта");
    },
  });

  return (
    <div className="space-y-3">
      <div className="bevel bg-black/85 p-4 space-y-3">
        <h2 className="font-impact text-2xl text-neon-cyan">📡 Импорт из Telegram</h2>
        <p className="font-vt text-lg text-white">
          1. Создай бота через <a className="underline-link" href="https://t.me/BotFather" target="_blank" rel="noreferrer">@BotFather</a> и добавь его как администратора в свой канал.
          <br />
          2. Бот получает только НОВЫЕ посты канала через getUpdates (история недоступна Bot API).
          <br />
          3. Жми кнопку — функция заберёт все накопившиеся posts и сохранит их.
        </p>
        <Button
          onClick={() => importNow.mutate()}
          disabled={importNow.isPending}
          className="bevel bg-neon-lime text-black font-impact uppercase text-lg px-4 py-2"
        >
          {importNow.isPending ? "⏳ импортирую…" : "📥 Загрузить посты из Telegram"}
        </Button>
      </div>
      {log && (
        <pre className="bevel-in bg-black/80 p-3 font-mono text-sm text-neon-lime whitespace-pre-wrap break-all">
          {log}
        </pre>
      )}
    </div>
  );
};

export default Admin;
