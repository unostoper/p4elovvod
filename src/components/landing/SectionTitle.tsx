interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

const SectionTitle = ({ children, className = "" }: SectionTitleProps) => (
  <div className={`flex items-center gap-4 justify-center mb-12 ${className}`}>
    <div className="h-px flex-1 max-w-[80px] bg-gold/30" />
    <h2 className="font-display text-3xl sm:text-4xl font-bold text-center uppercase tracking-wide">
      {children}
    </h2>
    <div className="h-px flex-1 max-w-[80px] bg-gold/30" />
  </div>
);

export default SectionTitle;
