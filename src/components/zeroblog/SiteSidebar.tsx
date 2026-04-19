import HitCounter from "./HitCounter";
import UnderConstruction from "./UnderConstruction";

const SiteSidebar = ({ tgChannel }: { tgChannel?: string }) => (
  <aside className="space-y-3">
    <div className="bevel bg-black/70 p-3">
      <h3 className="font-impact text-neon-pink text-glow-pink text-lg mb-2 text-center">
        ★ ABOUT ★
      </h3>
      <div className="text-6xl text-center mb-2">🧑‍💻</div>
      <p className="font-vt text-neon-cyan text-lg text-center">Admin · age ??</p>
      <p className="font-vt text-neon-lime text-base text-center">Mood: 🤘 rad</p>
      <p className="font-vt text-white text-base text-center">Listening: Linkin Park</p>
    </div>

    <div className="bevel bg-black/70 p-3 text-center">
      <h3 className="font-impact text-neon-yellow text-glow-cyan text-lg mb-2">VISITORS</h3>
      <HitCounter />
      <p className="font-vt text-white text-sm mt-1">You're visitor #!</p>
    </div>

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

    <div className="bevel bg-black/70 p-3">
      <h3 className="font-impact text-neon-lime text-glow-lime text-lg mb-2 text-center">
        WEBRING
      </h3>
      <ul className="font-vt text-lg space-y-1">
        <li>← <span className="underline-link">prev</span></li>
        <li>🎲 <span className="underline-link">random</span></li>
        <li>→ <span className="underline-link">next</span></li>
        <li>📖 <span className="underline-link">guestbook</span></li>
      </ul>
    </div>

    <div className="text-center"><UnderConstruction /></div>

    <div className="bevel bg-neon-pink/30 p-2 text-center">
      <p className="font-pixel text-[10px] text-white blink">SIGN MY GUESTBOOK!!</p>
    </div>
  </aside>
);

export default SiteSidebar;
