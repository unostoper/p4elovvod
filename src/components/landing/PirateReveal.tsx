import { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type PirateAnimation = "sail-in" | "anchor-drop" | "wave" | "flag-unfurl" | "treasure-reveal";

interface PirateRevealProps {
  children: ReactNode;
  animation?: PirateAnimation;
  delay?: number;
  className?: string;
}

const animationStyles: Record<PirateAnimation, { hidden: string; visible: string }> = {
  "sail-in": {
    hidden: "opacity-0 translate-x-[-60px] rotate-[-5deg]",
    visible: "opacity-100 translate-x-0 rotate-0",
  },
  "anchor-drop": {
    hidden: "opacity-0 translate-y-[-40px]",
    visible: "opacity-100 translate-y-0",
  },
  "wave": {
    hidden: "opacity-0 scale-90 translate-y-[20px]",
    visible: "opacity-100 scale-100 translate-y-0",
  },
  "flag-unfurl": {
    hidden: "opacity-0 scale-x-0 origin-left",
    visible: "opacity-100 scale-x-100 origin-left",
  },
  "treasure-reveal": {
    hidden: "opacity-0 scale-75 rotate-[10deg]",
    visible: "opacity-100 scale-100 rotate-0",
  },
};

const PirateReveal = ({ children, animation = "wave", delay = 0, className = "" }: PirateRevealProps) => {
  const { ref, isVisible } = useScrollReveal();
  const styles = animationStyles[animation];

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isVisible ? styles.visible : styles.hidden} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default PirateReveal;
