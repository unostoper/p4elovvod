import HitCounter from "./HitCounter";
import UnderConstruction from "./UnderConstruction";
import Marquee from "./Marquee";
import { useSiteBlocks } from "@/hooks/useSiteBlocks";

const SiteSidebar = ({ tgChannel }: { tgChannel?: string }) => {
  const { data: blocks } = useSiteBlocks();
  const about = blocks?.sidebar_about || {};
  const links = blocks?.sidebar_links || {};
  const friends = blocks?.sidebar_friends || {};
  const now = blocks?.sidebar_now_playing || {};

  return (
    <aside className="space-y-3">
      {about.lines?.length > 0 && (
        <div className="bevel bg-black/70 p-3">
          <h3 className="font-impact text-neon-pink text-glow-pink text-lg mb-2 text-center">
            {about.title || "★ About ★"}
          </h3>
          <ul className="font-vt text-neon-cyan text-lg space-y-1">
            {about.lines.map((l: string, i: number) => (
              <li key={i}>★ {l}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="bevel bg-black/70 p-3 text-center">
        <h3 className="font-impact text-neon-yellow text-glow-cyan text-lg mb-2">VISITORS</h3>
        <HitCounter />
        <p className="font-vt text-white text-sm mt-1 blink">You're visitor #!</p>
      </div>

      {now.track && (
        <div className="bevel bg-neon-purple/30 p-3">
          <h3 className="font-impact text-neon-yellow text-lg mb-1 text-center">
            {now.title || "♫ Now playing"}
          </h3>
          {now.marquee ? (
            <Marquee>♪ {now.track} ♪</Marquee>
          ) : (
            <p className="font-vt text-neon-cyan text-lg text-center">{now.track}</p>
          )}
        </div>
      )}

      {tgChannel && (
        <div className="bevel bg-neon-cyan/20 p-3 text-center">
          <h3 className="font-impact text-neon-cyan text-lg mb-1">TELEGRAM</h3>
          <a
            href={tgChannel.startsWith("http") ? tgChannel : `https://t.me/${tgChannel.replace("@", "")}`}
            target="_blank"
            rel="noreferrer"
            className="underline-link font-vt text-xl break-all"
          >
            {tgChannel}
          </a>
        </div>
      )}

      {links.items?.length > 0 && (
        <div className="bevel bg-black/70 p-3">
          <h3 className="font-impact text-neon-lime text-glow-lime text-lg mb-2 text-center">
            {links.title || "LINKS"}
          </h3>
          <ul className="font-vt text-lg space-y-1">
            {links.items.map((it: any, i: number) => (
              <li key={i}>
                →{" "}
                <a href={it.href || "#"} className="underline-link" target="_blank" rel="noreferrer">
                  {it.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {friends.items?.length > 0 && (
        <div className="bevel bg-neon-pink/20 p-3">
          <h3 className="font-impact text-neon-pink text-glow-pink text-lg mb-2 text-center">
            {friends.title || "♥ Friends"}
          </h3>
          <ul className="font-vt text-lg space-y-1">
            {friends.items.map((it: any, i: number) => (
              <li key={i}>
                ♥{" "}
                <a href={it.href || "#"} className="underline-link" target="_blank" rel="noreferrer">
                  {it.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="text-center">
        <UnderConstruction />
      </div>

      <div className="bevel bg-neon-pink/30 p-2 text-center">
        <p className="font-pixel text-[10px] text-white blink">SIGN MY GUESTBOOK!!</p>
      </div>
    </aside>
  );
};

export default SiteSidebar;
