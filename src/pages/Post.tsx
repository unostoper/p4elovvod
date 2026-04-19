import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useZeroblogSettings } from "@/hooks/useZeroblogSettings";
import SiteHeader from "@/components/zeroblog/SiteHeader";
import SiteSidebar from "@/components/zeroblog/SiteSidebar";
import SiteFooter from "@/components/zeroblog/SiteFooter";
import PostMedia from "@/components/zeroblog/PostMedia";

const Post = () => {
  const { id } = useParams();
  const { data: settings } = useZeroblogSettings();
  const { data: post, isLoading } = useQuery({
    queryKey: ["zeroblog_post", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("zeroblog_posts")
        .select("*")
        .eq("id", id!)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (post?.id) {
      // best-effort view increment via RPC-less update; will silently fail without policy
      supabase
        .from("zeroblog_posts")
        .update({ views: (post.views || 0) + 1 })
        .eq("id", post.id)
        .then(() => {});
      document.title = `${post.title} · ZeroBlog`;
    }
  }, [post?.id]);

  return (
    <div className="container py-4 max-w-5xl">
      <SiteHeader
        title={settings?.site_title || "ZeroBlog"}
        description={settings?.site_description || "Личный дневник из 2005-го"}
      />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 mt-4">
        <main>
          {isLoading && (
            <div className="bevel bg-black/70 p-6 text-center font-vt text-2xl text-neon-cyan">
              Loading<span className="blink">...</span>
            </div>
          )}
          {!isLoading && !post && (
            <div className="bevel bg-black/70 p-6 text-center font-vt text-2xl text-neon-pink">
              404 · post not found
              <div className="mt-3">
                <Link to="/" className="underline-link">← на главную</Link>
              </div>
            </div>
          )}
          {post && (
            <article className="bevel bg-black/80 p-5 space-y-3">
              <div className="bevel-in bg-neon-pink/30 -mx-5 -mt-5 mb-2 px-5 py-2 flex justify-between">
                <span className="font-pixel text-[10px] text-neon-yellow">
                  📅 {new Date(post.published_at).toLocaleString("ru-RU")}
                </span>
                <span className="font-pixel text-[10px] text-neon-cyan">
                  by {settings?.author_name || "Admin"}
                </span>
              </div>
              <h1 className="font-impact text-4xl md:text-5xl text-rainbow">
                {post.emoji} {post.title}
              </h1>
              <p className="font-vt text-2xl text-white whitespace-pre-wrap leading-snug">
                {post.content}
              </p>
              <PostMedia media={(post.media as any[]) || []} />

              <section className="mt-6 bevel-in bg-black/60 p-3">
                <h3 className="font-impact text-neon-lime text-xl mb-2">★ Комментарии (0)</h3>
                <p className="font-vt text-neon-yellow text-lg">
                  Гостевая книга в разработке. <span className="blink">★</span>
                </p>
              </section>

              <Link to="/" className="underline-link font-vt text-lg">
                ← назад к ленте
              </Link>
            </article>
          )}
        </main>
        <SiteSidebar tgChannel={settings?.tg_channel || undefined} />
      </div>
      <SiteFooter />
    </div>
  );
};

export default Post;
