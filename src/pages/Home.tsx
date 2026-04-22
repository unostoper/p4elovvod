import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useZeroblogSettings } from "@/hooks/useZeroblogSettings";
import SiteHeader from "@/components/zeroblog/SiteHeader";
import SiteSidebar from "@/components/zeroblog/SiteSidebar";
import SiteFooter from "@/components/zeroblog/SiteFooter";
import PostMedia from "@/components/zeroblog/PostMedia";
import MarkdownView from "@/components/zeroblog/MarkdownView";

const formatDate = (s: string) =>
  new Date(s).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const Home = () => {
  const { data: settings } = useZeroblogSettings();
  const { data: posts, isLoading } = useQuery({
    queryKey: ["zeroblog_posts_list"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("zeroblog_posts")
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false })
        .limit(30);
      if (error) throw error;
      return data || [];
    },
  });

  return (
    <div className="container py-4 max-w-6xl">
      <SiteHeader />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 mt-4">
        <main className="space-y-4">
          {isLoading && (
            <div className="bevel bg-black/70 p-6 text-center font-vt text-2xl text-neon-cyan">
              Loading<span className="blink">...</span>
            </div>
          )}

          {posts?.length === 0 && (
            <div className="bevel bg-black/70 p-6 text-center">
              <p className="font-vt text-2xl text-neon-yellow">
                Постов пока нет. Загляни позже! ✨
              </p>
              <p className="font-pixel text-[10px] text-white mt-2 blink">
                ★ STAY TUNED ★
              </p>
            </div>
          )}

          {posts?.map((p: any) => (
            <article key={p.id} className="bevel bg-black/75 p-4 space-y-2">
              <div className="bevel-in bg-neon-purple/40 -mx-4 -mt-4 mb-2 px-4 py-1 flex items-center justify-between">
                <span className="font-pixel text-[10px] text-neon-yellow">
                  📅 {formatDate(p.published_at)}
                </span>
                <span className="font-pixel text-[10px] text-neon-cyan">
                  by {settings?.author_name || "Admin"}
                </span>
              </div>

              <h2 className="font-impact text-3xl text-rainbow">
                {p.emoji} {p.title || "(без названия)"}
              </h2>

              <MarkdownView>{p.content}</MarkdownView>

              <PostMedia media={p.media || []} />

              <div className="flex items-center justify-between pt-2 border-t-2 border-dashed border-neon-pink/50">
                <Link
                  to={`/post/${p.id}`}
                  className="underline-link font-vt text-lg"
                >
                  → читать дальше · комментарии
                </Link>
                <span className="font-pixel text-[10px] text-neon-lime">
                  👁 {p.views || 0}
                </span>
              </div>
            </article>
          ))}
        </main>

        <SiteSidebar tgChannel={settings?.tg_channel || undefined} />
      </div>

      <SiteFooter />
    </div>
  );
};

export default Home;
