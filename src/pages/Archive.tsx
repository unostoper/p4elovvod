import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useZeroblogSettings } from "@/hooks/useZeroblogSettings";
import SiteHeader from "@/components/zeroblog/SiteHeader";
import SiteSidebar from "@/components/zeroblog/SiteSidebar";
import SiteFooter from "@/components/zeroblog/SiteFooter";

const Archive = () => {
  const { data: settings } = useZeroblogSettings();
  const { data: posts } = useQuery({
    queryKey: ["zeroblog_archive"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("zeroblog_posts")
        .select("id, title, emoji, published_at")
        .eq("published", true)
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  const grouped: Record<string, any[]> = {};
  posts?.forEach((p) => {
    const d = new Date(p.published_at);
    const k = `${d.getFullYear()} · ${d.toLocaleString("ru-RU", { month: "long" })}`;
    (grouped[k] ||= []).push(p);
  });

  return (
    <div className="container py-4 max-w-5xl">
      <SiteHeader
        title={settings?.site_title || "ZeroBlog"}
        description={settings?.site_description || "Личный дневник из 2005-го"}
      />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 mt-4">
        <main className="bevel bg-black/80 p-5 space-y-4">
          <h1 className="font-impact text-4xl text-rainbow">📁 Архив записей</h1>
          {!posts?.length && (
            <p className="font-vt text-2xl text-neon-yellow">Архив пока пуст.</p>
          )}
          {Object.entries(grouped).map(([month, items]) => (
            <section key={month} className="bevel-in bg-black/60 p-3">
              <h2 className="font-impact text-2xl text-neon-cyan mb-2">▶ {month}</h2>
              <ul className="font-vt text-xl space-y-1 pl-4">
                {items.map((p) => (
                  <li key={p.id}>
                    <span className="text-neon-yellow">
                      {new Date(p.published_at).toLocaleDateString("ru-RU")}
                    </span>{" "}
                    —{" "}
                    <Link to={`/post/${p.id}`} className="underline-link">
                      {p.emoji} {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </main>
        <SiteSidebar tgChannel={settings?.tg_channel || undefined} />
      </div>
      <SiteFooter />
    </div>
  );
};

export default Archive;
