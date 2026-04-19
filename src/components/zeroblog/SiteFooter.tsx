const SiteFooter = () => (
  <footer className="mt-8 bevel bg-black/80 p-4 text-center space-y-2">
    <div className="font-vt text-neon-yellow text-xl">
      © 2005-{new Date().getFullYear()} ZeroBlog · made with{" "}
      <span className="text-neon-pink animate-pulse">♥</span> in Notepad.exe
    </div>
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
    <p className="font-pixel text-[9px] text-neon-cyan">
      no cookies · no analytics · no AI · just vibes
    </p>
  </footer>
);

export default SiteFooter;
