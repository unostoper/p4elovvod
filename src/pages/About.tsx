import { useZeroblogSettings } from "@/hooks/useZeroblogSettings";
import SiteHeader from "@/components/zeroblog/SiteHeader";
import SiteSidebar from "@/components/zeroblog/SiteSidebar";
import SiteFooter from "@/components/zeroblog/SiteFooter";
import UnderConstruction from "@/components/zeroblog/UnderConstruction";

const About = () => {
  const { data: settings } = useZeroblogSettings();
  return (
    <div className="container py-4 max-w-5xl">
      <SiteHeader
        title={settings?.site_title || "ZeroBlog"}
        description={settings?.site_description || "Личный дневник из 2005-го"}
      />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 mt-4">
        <main className="bevel bg-black/80 p-5 space-y-4">
          <h1 className="font-impact text-4xl text-rainbow">★ Hi, I'm Admin ★</h1>
          <div className="text-7xl text-center wiggle">🧑‍💻</div>
          <p className="font-vt text-2xl text-white">
            Welcome to my personal homepage on the World Wide Web! 🌐 Этот сайт сделан в духе старого
            доброго веба — без cookie-banner'ов, без AI и без мёртвых лайков.
          </p>
          <h2 className="font-impact text-2xl text-neon-cyan">▼ FAVES ▼</h2>
          <ul className="font-vt text-xl text-neon-yellow list-disc pl-6">
            <li>🎮 Half-Life · GTA: SA · Sims 2</li>
            <li>🎵 Linkin Park · Evanescence · t.A.T.u.</li>
            <li>📺 South Park · Smallville</li>
            <li>💻 ICQ · MSN · LiveJournal</li>
          </ul>
          <h2 className="font-impact text-2xl text-neon-pink">▼ CONTACT ▼</h2>
          <p className="font-vt text-2xl text-neon-lime">
            ICQ: 123-456-789 (offline) <br />
            Email: <span className="underline-link">admin@zeroblog.geocities</span>
          </p>
          <div className="text-center pt-3"><UnderConstruction /></div>
        </main>
        <SiteSidebar tgChannel={settings?.tg_channel || undefined} />
      </div>
      <SiteFooter />
    </div>
  );
};

export default About;
