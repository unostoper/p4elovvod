import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MarkdownView = ({ children, className = "" }: { children: string; className?: string }) => (
  <div className={`md-y2k font-vt text-xl text-white leading-snug whitespace-pre-wrap ${className}`}>
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: (props) => <a {...props} className="underline-link" target="_blank" rel="noreferrer" />,
        h1: (props) => <h1 {...props} className="font-impact text-3xl text-rainbow my-2" />,
        h2: (props) => <h2 {...props} className="font-impact text-2xl text-neon-cyan my-2" />,
        h3: (props) => <h3 {...props} className="font-impact text-xl text-neon-pink my-1" />,
        ul: (props) => <ul {...props} className="list-disc pl-6 text-neon-yellow" />,
        ol: (props) => <ol {...props} className="list-decimal pl-6 text-neon-yellow" />,
        blockquote: (props) => (
          <blockquote {...props} className="bevel-in bg-black/60 px-3 py-2 my-2 text-neon-cyan" />
        ),
        code: (props) => (
          <code {...props} className="bg-black/70 text-neon-lime px-1 font-mono" />
        ),
        img: (props) => (
          <img {...props} className="bevel max-w-full inline-block mx-1" alt={props.alt || ""} />
        ),
      }}
    >
      {children || ""}
    </ReactMarkdown>
  </div>
);

export default MarkdownView;
