import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getAdminToken } from "@/lib/admin";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import MarkdownView from "@/components/zeroblog/MarkdownView";

type BlockKey =
  | "hero"
  | "marquee_top"
  | "nav"
  | "banners"
  | "sidebar_about"
  | "sidebar_links"
  | "sidebar_friends"
  | "sidebar_now_playing"
  | "about_page"
  | "footer";

const BLOCK_LABELS: Record<BlockKey, string> = {
  hero: "🦄 Главный заголовок (Hero)",
  marquee_top: "📢 Бегущая строка сверху",
  nav: "🧭 Меню навигации",
  banners: "🎌 88×31 баннеры под меню",
  sidebar_about: "🪪 Сайдбар: About me",
  sidebar_links: "🔗 Сайдбар: Links",
  sidebar_friends: "♥ Сайдбар: Friends",
  sidebar_now_playing: "♫ Сайдбар: Now playing",
  about_page: "👤 Страница About",
  footer: "📜 Футер",
};

const BLOCK_ORDER: BlockKey[] = [
  "hero",
  "marquee_top",
  "nav",
  "banners",
  "sidebar_about",
  "sidebar_links",
  "sidebar_friends",
  "sidebar_now_playing",
  "about_page",
  "footer",
];

const BlocksEditor = () => {
  const qc = useQueryClient();
  const [active, setActive] = useState<BlockKey>("hero");
  const [draft, setDraft] = useState<any>(null);

  const { data: blocks } = useQuery({
    queryKey: ["admin_site_blocks"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_blocks").select("key, data");
      if (error) throw error;
      const map: Record<string, any> = {};
      (data || []).forEach((r: any) => (map[r.key] = r.data));
      return map;
    },
  });

  useEffect(() => {
    if (blocks) setDraft(blocks[active] || {});
  }, [blocks, active]);

  const save = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.functions.invoke("zeroblog-admin", {
        body: { action: "save_block", token: getAdminToken(), key: active, data: draft },
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Блок сохранён");
      qc.invalidateQueries({ queryKey: ["admin_site_blocks"] });
      qc.invalidateQueries({ queryKey: ["site_blocks"] });
    },
    onError: (e: any) => toast.error(e.message || "Ошибка"),
  });

  if (!draft) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-3">
      <div className="bevel bg-black/80 p-2 space-y-1 h-fit">
        {BLOCK_ORDER.map((k) => (
          <button
            key={k}
            onClick={() => setActive(k)}
            className={`w-full text-left bevel px-2 py-1 font-vt text-base ${
              active === k ? "bg-neon-yellow text-black" : "bg-neon-purple/60 text-white"
            }`}
          >
            {BLOCK_LABELS[k]}
          </button>
        ))}
      </div>

      <div className="bevel bg-black/85 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-impact text-2xl text-neon-cyan">{BLOCK_LABELS[active]}</h3>
          <Button
            onClick={() => save.mutate()}
            disabled={save.isPending}
            className="bevel bg-neon-pink text-white font-impact uppercase"
          >
            💾 save
          </Button>
        </div>

        {active === "hero" && <HeroEditor value={draft} onChange={setDraft} />}
        {active === "marquee_top" && (
          <Field label="Текст бегущей строки">
            <Input value={draft.text || ""} onChange={(v) => setDraft({ ...draft, text: v })} />
          </Field>
        )}
        {active === "nav" && (
          <ListEditor
            value={draft.items || []}
            onChange={(items) => setDraft({ ...draft, items })}
            fields={[
              { key: "label", label: "Подпись" },
              { key: "to", label: "Путь (/about, /archive...)" },
            ]}
            empty={{ label: "★ NEW", to: "/" }}
          />
        )}
        {active === "banners" && (
          <ListEditor
            value={draft.items || []}
            onChange={(items) => setDraft({ ...draft, items })}
            fields={[
              { key: "label", label: "Текст" },
              {
                key: "color",
                label: "Цвет",
                options: ["neon-pink", "neon-cyan", "neon-lime", "neon-yellow", "neon-purple", "neon-orange"],
              },
              { key: "href", label: "Ссылка (опц.)" },
            ]}
            empty={{ label: "★ NEW BANNER ★", color: "neon-pink", href: "" }}
          />
        )}
        {active === "sidebar_about" && (
          <>
            <Field label="Заголовок">
              <Input
                value={draft.title || ""}
                onChange={(v) => setDraft({ ...draft, title: v })}
              />
            </Field>
            <StringListEditor
              label="Строки"
              value={draft.lines || []}
              onChange={(lines) => setDraft({ ...draft, lines })}
            />
          </>
        )}
        {(active === "sidebar_links" || active === "sidebar_friends") && (
          <>
            <Field label="Заголовок">
              <Input
                value={draft.title || ""}
                onChange={(v) => setDraft({ ...draft, title: v })}
              />
            </Field>
            <ListEditor
              value={draft.items || []}
              onChange={(items) => setDraft({ ...draft, items })}
              fields={[
                { key: "label", label: "Подпись" },
                { key: "href", label: "Ссылка" },
              ]}
              empty={{ label: "Cool site", href: "https://" }}
            />
          </>
        )}
        {active === "sidebar_now_playing" && (
          <>
            <Field label="Заголовок">
              <Input value={draft.title || ""} onChange={(v) => setDraft({ ...draft, title: v })} />
            </Field>
            <Field label="Трек">
              <Input value={draft.track || ""} onChange={(v) => setDraft({ ...draft, track: v })} />
            </Field>
            <Checkbox
              label="Бегущая строка"
              checked={!!draft.marquee}
              onChange={(v) => setDraft({ ...draft, marquee: v })}
            />
          </>
        )}
        {active === "about_page" && <AboutPageEditor value={draft} onChange={setDraft} />}
        {active === "footer" && (
          <>
            <Field label="Копирайт">
              <Input
                value={draft.copyright || ""}
                onChange={(v) => setDraft({ ...draft, copyright: v })}
              />
            </Field>
            <Field label="Тэглайн (мелкий текст)">
              <Input
                value={draft.tagline || ""}
                onChange={(v) => setDraft({ ...draft, tagline: v })}
              />
            </Field>
            <ListEditor
              value={draft.links || []}
              onChange={(links) => setDraft({ ...draft, links })}
              fields={[
                { key: "label", label: "Подпись" },
                { key: "href", label: "Ссылка" },
              ]}
              empty={{ label: "RSS", href: "#" }}
            />
          </>
        )}
      </div>
    </div>
  );
};

/* ---------- маленькие переиспользуемые контролы ---------- */

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block font-vt text-xl text-neon-yellow space-y-1">
    {label}
    {children}
  </label>
);

const Input = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <input
    className="bevel-in w-full bg-neon-purple/30 px-3 py-2 font-vt text-xl text-white"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

const Checkbox = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) => (
  <label className="flex items-center gap-2 font-vt text-xl text-neon-yellow">
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    {label}
  </label>
);

const HeroEditor = ({ value, onChange }: { value: any; onChange: (v: any) => void }) => (
  <>
    <Field label="Заголовок">
      <Input value={value.title || ""} onChange={(v) => onChange({ ...value, title: v })} />
    </Field>
    <Field label="Подзаголовок">
      <Input value={value.subtitle || ""} onChange={(v) => onChange({ ...value, subtitle: v })} />
    </Field>
    <Field label="Подпись внизу (мелким пиксельным)">
      <Input value={value.footnote || ""} onChange={(v) => onChange({ ...value, footnote: v })} />
    </Field>
  </>
);

const AboutPageEditor = ({ value, onChange }: { value: any; onChange: (v: any) => void }) => (
  <>
    <Field label="Заголовок">
      <Input value={value.title || ""} onChange={(v) => onChange({ ...value, title: v })} />
    </Field>
    <Field label="URL аватарки (опц.)">
      <Input value={value.avatar || ""} onChange={(v) => onChange({ ...value, avatar: v })} />
    </Field>
    <Field label="Био (Markdown)">
      <Textarea
        value={value.bio || ""}
        onChange={(e) => onChange({ ...value, bio: e.target.value })}
        className="bevel-in bg-neon-purple/30 font-vt text-lg text-white min-h-[180px]"
      />
    </Field>
    {value.bio && (
      <div className="bevel bg-black/60 p-3">
        <div className="font-pixel text-[10px] text-neon-cyan mb-1">PREVIEW</div>
        <MarkdownView>{value.bio}</MarkdownView>
      </div>
    )}
    <StringListEditor
      label="Факты обо мне"
      value={value.facts || []}
      onChange={(facts) => onChange({ ...value, facts })}
    />
  </>
);

const StringListEditor = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
}) => (
  <div className="space-y-1">
    <div className="font-vt text-xl text-neon-yellow">{label}</div>
    {value.map((line, i) => (
      <div key={i} className="flex gap-2">
        <input
          className="bevel-in flex-1 bg-neon-purple/30 px-3 py-1 font-vt text-lg text-white"
          value={line}
          onChange={(e) => {
            const next = [...value];
            next[i] = e.target.value;
            onChange(next);
          }}
        />
        <button
          onClick={() => onChange(value.filter((_, j) => j !== i))}
          className="bevel bg-destructive text-white font-impact text-sm px-2"
        >
          ×
        </button>
      </div>
    ))}
    <button
      onClick={() => onChange([...value, ""])}
      className="bevel bg-neon-lime text-black font-impact text-sm px-2 py-1"
    >
      + add
    </button>
  </div>
);

type FieldDef = { key: string; label: string; options?: string[] };

const ListEditor = ({
  value,
  onChange,
  fields,
  empty,
}: {
  value: any[];
  onChange: (v: any[]) => void;
  fields: FieldDef[];
  empty: any;
}) => (
  <div className="space-y-2">
    {value.map((item, i) => (
      <div key={i} className="bevel-in bg-black/40 p-2 space-y-1">
        {fields.map((f) => (
          <div key={f.key} className="flex items-center gap-2">
            <span className="font-vt text-base text-neon-cyan w-32 shrink-0">{f.label}</span>
            {f.options ? (
              <select
                value={item[f.key] || ""}
                onChange={(e) => {
                  const next = [...value];
                  next[i] = { ...item, [f.key]: e.target.value };
                  onChange(next);
                }}
                className="bevel-in flex-1 bg-neon-purple/30 px-2 py-1 font-vt text-lg text-white"
              >
                {f.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : (
              <input
                className="bevel-in flex-1 bg-neon-purple/30 px-2 py-1 font-vt text-lg text-white"
                value={item[f.key] || ""}
                onChange={(e) => {
                  const next = [...value];
                  next[i] = { ...item, [f.key]: e.target.value };
                  onChange(next);
                }}
              />
            )}
          </div>
        ))}
        <div className="flex gap-2 justify-end">
          <button
            disabled={i === 0}
            onClick={() => {
              const next = [...value];
              [next[i - 1], next[i]] = [next[i], next[i - 1]];
              onChange(next);
            }}
            className="bevel bg-neon-cyan text-black font-impact text-xs px-2 disabled:opacity-30"
          >
            ↑
          </button>
          <button
            disabled={i === value.length - 1}
            onClick={() => {
              const next = [...value];
              [next[i + 1], next[i]] = [next[i], next[i + 1]];
              onChange(next);
            }}
            className="bevel bg-neon-cyan text-black font-impact text-xs px-2 disabled:opacity-30"
          >
            ↓
          </button>
          <button
            onClick={() => onChange(value.filter((_, j) => j !== i))}
            className="bevel bg-destructive text-white font-impact text-xs px-2"
          >
            × del
          </button>
        </div>
      </div>
    ))}
    <button
      onClick={() => onChange([...value, { ...empty }])}
      className="bevel bg-neon-lime text-black font-impact text-sm px-3 py-1"
    >
      + add item
    </button>
  </div>
);

export default BlocksEditor;
