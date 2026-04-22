import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type SiteBlocks = Record<string, any>;

const DEFAULTS: SiteBlocks = {
  hero: {
    title: "ZeroBlog",
    subtitle: "Личный дневник из 2005-го",
    footnote: "Best viewed in Internet Explorer 6 @ 1024×768",
    showCursor: true,
  },
  marquee_top: {
    text: "✦ Welcome to my homepage! ✦ Sign my guestbook! ✦ Don't forget to bookmark! ✦",
  },
  nav: {
    items: [
      { to: "/", label: "★ HOME" },
      { to: "/archive", label: "📁 ARCHIVE" },
      { to: "/about", label: "👤 ABOUT ME" },
      { to: "/admin", label: "🔐 ADMIN" },
    ],
  },
  banners: { items: [] },
  sidebar_about: { title: "★ About me", lines: [] },
  sidebar_links: { title: "→ Links", items: [] },
  sidebar_friends: { title: "♥ Friends", items: [] },
  sidebar_now_playing: { title: "♫ Now playing", track: "", marquee: true },
  about_page: { title: "👤 About me", avatar: "", bio: "", facts: [] },
  footer: { copyright: "", links: [], tagline: "" },
};

export const useSiteBlocks = () =>
  useQuery({
    queryKey: ["site_blocks"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_blocks").select("key, data");
      if (error) throw error;
      const map: SiteBlocks = { ...DEFAULTS };
      (data || []).forEach((row: any) => {
        map[row.key] = { ...(DEFAULTS[row.key] || {}), ...(row.data || {}) };
      });
      return map;
    },
    staleTime: 30_000,
  });

export const useSiteBlock = <T = any>(key: string): T | undefined => {
  const { data } = useSiteBlocks();
  return data?.[key] as T | undefined;
};
