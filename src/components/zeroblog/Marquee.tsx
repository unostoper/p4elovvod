import { ReactNode } from "react";

const Marquee = ({ children }: { children: ReactNode }) => (
  <div className="bevel-in bg-black/60 py-1 overflow-hidden">
    <div className="marquee text-neon-yellow font-vt text-xl">
      <span>{children}</span>
    </div>
  </div>
);

export default Marquee;
