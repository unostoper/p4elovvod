import { useSiteBlocks } from "@/hooks/useSiteBlocks";

const SiteFooter = () => {
  const { data: blocks } = useSiteBlocks();
  const f = blocks?.footer || {};
  const copyright =
    f.copyright || `© 2005-${new Date().getFullYear()} ZeroBlog · made with ♥ in Notepad.exe`;
  const links: Array<{ label: string; href: string }> = f.links || [];

  return (
    <footer className="mt-8 bevel bg-black/80 p-4 text-center space-y-2">
      <div className="font-vt text-neon-yellow text-xl">{copyright}</div>
      {links.length > 0 && (
        <div className="flex justify-center gap-3 flex-wrap font-vt text-lg">
          {links.map((l, i) => (
            <a key={i} href={l.href || "#"} className="underline-link" target="_blank" rel="noreferrer">
              · {l.label} ·
            </a>
          ))}
        </div>
      )}
      <div className="flex justify-center gap-2 flex-wrap">
        {["HTML 4.01", "CSS", "Made on Mac", "Netscape Now!", "GeoCities", "Web 1.0"].map((b) => (
          <span
            key={b}
            className="bevel bg-neon-purple text-white font-pixel text-[10px] px-2 py-1"
          >
            {b}
          </span>
        ))}
      </div>
      {f.tagline && (
        <p className="font-pixel text-[9px] text-neon-cyan">{f.tagline}</p>
      )}
    </footer>
  );
};

export default SiteFooter;
