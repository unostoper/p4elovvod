import { motion } from "framer-motion";

type BlueprintType = "capsule" | "cube" | "tablet" | "box" | "book";

const drawTransition = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { delay: i * 0.3, duration: 1.5, ease: "easeInOut" as const }, opacity: { delay: i * 0.3, duration: 0.3 } },
  }),
};

const dimLineProps = {
  stroke: "hsl(42 90% 55% / 0.5)",
  strokeWidth: 0.5,
  strokeDasharray: "4 2",
  fill: "none",
};

const mainLineProps = {
  stroke: "hsl(42 90% 55%)",
  strokeWidth: 1,
  fill: "none",
};

const CapsuleBlueprint = () => (
  <svg viewBox="0 0 400 200" className="w-full h-auto">
    {/* Main body */}
    <motion.rect x="100" y="60" width="200" height="80" rx="40" {...mainLineProps} variants={drawTransition} custom={0} />
    {/* Center line */}
    <motion.line x1="200" y1="40" x2="200" y2="160" {...dimLineProps} variants={drawTransition} custom={1} />
    {/* Dimension lines */}
    <motion.line x1="100" y1="155" x2="300" y2="155" {...dimLineProps} variants={drawTransition} custom={2} />
    <motion.text x="200" y="175" textAnchor="middle" fill="hsl(42 90% 55% / 0.7)" fontSize="10" fontFamily="monospace" variants={drawTransition} custom={2}>65 mm</motion.text>
    {/* Thread detail */}
    <motion.path d="M140 70 L140 130 M150 65 L150 135 M160 62 L160 138" {...{ ...mainLineProps, strokeWidth: 0.3 }} variants={drawTransition} custom={3} />
    {/* Cross section marks */}
    <motion.circle cx="200" cy="100" r="15" {...{ ...dimLineProps, strokeDasharray: "2 2" }} variants={drawTransition} custom={4} />
    <motion.text x="350" y="105" textAnchor="middle" fill="hsl(42 90% 55% / 0.7)" fontSize="10" fontFamily="monospace" variants={drawTransition} custom={4}>Ø12 mm</motion.text>
  </svg>
);

const CubeBlueprint = () => (
  <svg viewBox="0 0 400 300" className="w-full h-auto">
    {/* Front face */}
    <motion.rect x="80" y="100" width="150" height="150" {...mainLineProps} variants={drawTransition} custom={0} />
    {/* Top face (perspective) */}
    <motion.path d="M80 100 L170 50 L320 50 L230 100" {...mainLineProps} variants={drawTransition} custom={1} />
    {/* Right face (perspective) */}
    <motion.path d="M230 100 L320 50 L320 200 L230 250" {...mainLineProps} variants={drawTransition} custom={2} />
    {/* Dimension */}
    <motion.line x1="80" y1="265" x2="230" y2="265" {...dimLineProps} variants={drawTransition} custom={3} />
    <motion.text x="155" y="285" textAnchor="middle" fill="hsl(42 90% 55% / 0.7)" fontSize="10" fontFamily="monospace" variants={drawTransition} custom={3}>75 mm</motion.text>
    {/* Weld seam indication */}
    <motion.path d="M155 100 L155 250" {...{ ...dimLineProps, strokeDasharray: "1 3" }} variants={drawTransition} custom={4} />
    <motion.text x="155" y="95" textAnchor="middle" fill="hsl(42 90% 55% / 0.5)" fontSize="8" fontFamily="monospace" variants={drawTransition} custom={4}>SEALED</motion.text>
  </svg>
);

const TabletBlueprint = () => (
  <svg viewBox="0 0 400 250" className="w-full h-auto">
    {/* Main plate */}
    <motion.rect x="75" y="50" width="250" height="150" rx="4" {...mainLineProps} variants={drawTransition} custom={0} />
    {/* Braille dots grid */}
    {[0, 1, 2, 3, 4, 5].map((row) =>
      [0, 1, 2, 3, 4, 5, 6, 7].map((col) => (
        <motion.circle
          key={`${row}-${col}`}
          cx={110 + col * 25}
          cy={80 + row * 20}
          r={2.5}
          fill="hsl(42 90% 55% / 0.3)"
          stroke="hsl(42 90% 55% / 0.5)"
          strokeWidth={0.5}
          variants={drawTransition}
          custom={1 + (row * 8 + col) * 0.05}
        />
      ))
    )}
    {/* Dimensions */}
    <motion.line x1="75" y1="215" x2="325" y2="215" {...dimLineProps} variants={drawTransition} custom={4} />
    <motion.text x="200" y="235" textAnchor="middle" fill="hsl(42 90% 55% / 0.7)" fontSize="10" fontFamily="monospace" variants={drawTransition} custom={4}>150 mm</motion.text>
    <motion.line x1="340" y1="50" x2="340" y2="200" {...dimLineProps} variants={drawTransition} custom={5} />
    <motion.text x="365" y="130" textAnchor="middle" fill="hsl(42 90% 55% / 0.7)" fontSize="10" fontFamily="monospace" variants={drawTransition} custom={5}>100 mm</motion.text>
    {/* Thickness callout */}
    <motion.text x="55" y="130" textAnchor="middle" fill="hsl(42 90% 55% / 0.5)" fontSize="8" fontFamily="monospace" transform="rotate(-90, 55, 130)" variants={drawTransition} custom={6}>3 mm</motion.text>
  </svg>
);

const BoxBlueprint = () => (
  <svg viewBox="0 0 400 250" className="w-full h-auto">
    {/* Box bottom */}
    <motion.rect x="100" y="80" width="200" height="130" rx="6" {...mainLineProps} variants={drawTransition} custom={0} />
    {/* Lid */}
    <motion.path d="M100 80 L100 60 Q100 50 110 50 L290 50 Q300 50 300 60 L300 80" {...mainLineProps} variants={drawTransition} custom={1} />
    {/* Hinge line */}
    <motion.line x1="100" y1="80" x2="300" y2="80" {...{ ...dimLineProps, strokeDasharray: "6 3" }} variants={drawTransition} custom={2} />
    {/* Inner compartments */}
    <motion.line x1="200" y1="90" x2="200" y2="200" {...{ ...dimLineProps, strokeDasharray: "2 4" }} variants={drawTransition} custom={3} />
    {/* Label area */}
    <motion.rect x="140" y="55" width="120" height="18" rx="3" {...{ ...dimLineProps, strokeDasharray: "3 2" }} variants={drawTransition} custom={4} />
    <motion.text x="200" y="67" textAnchor="middle" fill="hsl(42 90% 55% / 0.5)" fontSize="7" fontFamily="monospace" variants={drawTransition} custom={4}>AI FREE</motion.text>
  </svg>
);

const BookBlueprint = () => (
  <svg viewBox="0 0 400 280" className="w-full h-auto">
    {/* Pages stack */}
    <motion.rect x="115" y="45" width="180" height="220" rx="2" {...{ ...mainLineProps, strokeWidth: 0.5 }} variants={drawTransition} custom={0} />
    <motion.rect x="110" y="40" width="180" height="220" rx="2" {...{ ...mainLineProps, strokeWidth: 0.5 }} variants={drawTransition} custom={0.5} />
    {/* Cover */}
    <motion.rect x="105" y="35" width="185" height="225" rx="3" {...mainLineProps} variants={drawTransition} custom={1} />
    {/* Spine */}
    <motion.line x1="105" y1="35" x2="105" y2="260" {...{ ...mainLineProps, strokeWidth: 2 }} variants={drawTransition} custom={2} />
    {/* Title area */}
    <motion.rect x="135" y="80" width="125" height="40" rx="2" {...dimLineProps} variants={drawTransition} custom={3} />
    {/* Format */}
    <motion.text x="200" y="280" textAnchor="middle" fill="hsl(42 90% 55% / 0.7)" fontSize="10" fontFamily="monospace" variants={drawTransition} custom={4}>A3 / 297×420 mm</motion.text>
  </svg>
);

const blueprints: Record<BlueprintType, React.FC> = {
  capsule: CapsuleBlueprint,
  cube: CubeBlueprint,
  tablet: TabletBlueprint,
  box: BoxBlueprint,
  book: BookBlueprint,
};

const BlueprintSVG = ({ type }: { type: BlueprintType }) => {
  const Blueprint = blueprints[type];
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="relative p-8"
    >
      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(42 90% 55%) 1px, transparent 1px), linear-gradient(90deg, hsl(42 90% 55%) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }} />
      <Blueprint />
    </motion.div>
  );
};

export default BlueprintSVG;
