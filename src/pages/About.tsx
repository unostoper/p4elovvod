import { useZeroblogSettings } from "@/hooks/useZeroblogSettings";
import { useSiteBlocks } from "@/hooks/useSiteBlocks";
import SiteHeader from "@/components/zeroblog/SiteHeader";
import SiteSidebar from "@/components/zeroblog/SiteSidebar";
import SiteFooter from "@/components/zeroblog/SiteFooter";
import UnderConstruction from "@/components/zeroblog/UnderConstruction";
import MarkdownView from "@/components/zeroblog/MarkdownView";

const About = () => {
  const { data: settings } = useZeroblogSettings();
  const { data: blocks } = useSiteBlocks();
  const a = blocks?.about_page || {};

  return (
    <div className="container py-4 max-w-5xl">
      <SiteHeader />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 mt-4">
        <main className="bevel bg-black/80 p-5 space-y-4">
          <h1 className="font-impact text-4xl text-rainbow">{a.title || "👤 About me"}</h1>
          {a.avatar ? (
            <img
              src={a.avatar}
              alt="avatar"
              className="bevel mx-auto max-w-[180px] block"
            />
          ) : (
            <div className="text-7xl text-center wiggle">🧑‍💻</div>
          )}
          {a.bio && <MarkdownView>{a.bio}</MarkdownView>}
          {a.facts?.length > 0 && (
            <>
              <h2 className="font-impact text-2xl text-neon-cyan">▼ FACTS ▼</h2>
              <ul className="font-vt text-xl text-neon-yellow list-disc pl-6">
                {a.facts.map((f: string, i: number) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </>
          )}
          <div className="text-center pt-3">
            <UnderConstruction />
          </div>
        </main>
        <SiteSidebar tgChannel={settings?.tg_channel || undefined} />
      </div>
      <SiteFooter />
    </div>
  );
};

export default About;
