import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Eye, ExternalLink, RadioTower } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { blogPosts, BlogPost } from "@/data/blogPosts";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const CategoryBadge = ({ category }: { category: string }) => (
  <span className="inline-block px-3 py-1 text-xs font-display font-semibold tracking-wider uppercase bg-primary/10 text-primary rounded-full">
    {category}
  </span>
);

/* ─── Single article view ─── */
const BlogArticle = ({ post }: { post: BlogPost }) => {
  const paragraphs = post.content.split("\n\n").filter(Boolean);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-[700px] mx-auto px-4 pt-4">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Все записи
        </Link>
      </div>

      <motion.article
        initial="hidden"
        animate="visible"
        className="max-w-[700px] mx-auto px-4 pt-10 pb-20"
      >
        <motion.div variants={fadeUp} custom={0} className="mb-4 flex items-center gap-3">
          <CategoryBadge category={post.category} />
          <span className="text-muted-foreground text-sm font-body">{post.date}</span>
        </motion.div>

        <motion.div variants={fadeUp} custom={0.5} className="text-5xl mb-6">
          {post.emoji}
        </motion.div>

        <motion.h1
          variants={fadeUp}
          custom={1}
          className="font-display text-3xl sm:text-4xl font-bold leading-tight mb-6"
        >
          {post.title}
        </motion.h1>

        <motion.div variants={fadeUp} custom={1.5} className="flex items-center gap-4 mb-10 text-muted-foreground text-sm">
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" /> {post.views}
          </span>
          <a
            href={post.telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-primary transition-colors"
          >
            <ExternalLink className="w-4 h-4" /> Telegram
          </a>
        </motion.div>

        <div className="w-12 h-[2px] bg-primary rounded-full mb-10" />

        {paragraphs.map((p, i) => {
          const isItalic = p.startsWith("_") && p.endsWith("_");
          const isBold = p.startsWith("**") && p.endsWith("**");
          const text = p.replace(/^[_*]+|[_*]+$/g, "");

          // Handle mixed bold/italic inline
          const rendered = text
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/_(.*?)_/g, "<em>$1</em>");

          return (
            <motion.p
              key={i}
              variants={fadeUp}
              custom={2 + i * 0.15}
              className={`font-body text-lg leading-relaxed mb-6 ${
                isItalic
                  ? "text-muted-foreground italic border-l-2 border-primary/40 pl-4"
                  : isBold
                  ? "font-semibold text-foreground"
                  : "text-secondary-foreground"
              }`}
              dangerouslySetInnerHTML={{ __html: rendered }}
            />
          );
        })}
      </motion.article>
    </div>
  );
};

/* ─── Blog list view ─── */
const BlogList = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Back nav */}
      <div className="max-w-[900px] mx-auto px-4 pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          На главную
        </Link>
      </div>

      {/* Header */}
      <header className="pt-10 pb-6 text-center py-[50px]">
        <div className="flex items-center justify-center gap-3 mb-4">
          <RadioTower className="w-8 h-8 text-primary" />
          <span className="font-display text-2xl sm:text-3xl font-bold text-foreground tracking-wide">
            ПЧЕЛОВВОД FM
          </span>
        </div>
        <p className="text-muted-foreground text-lg font-body tracking-wide">
          Блог из эфира
        </p>
        <div className="w-12 h-[3px] bg-primary mx-auto mt-5 rounded-full" />
      </header>

      {/* Posts grid */}
      <motion.section
        initial="hidden"
        animate="visible"
        className="max-w-[900px] mx-auto px-4 pb-20"
      >
        <div className="grid gap-6">
          {blogPosts.map((post, i) => (
            <motion.div key={post.id} variants={fadeUp} custom={i}>
              <Link
                to={`/blog/${post.id}`}
                className="block group"
                onMouseEnter={() => setHoveredId(post.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <article className="relative border border-border/40 rounded-xl p-6 sm:p-8 bg-card/30 hover:bg-card/60 transition-all duration-300 hover:border-primary/30 overflow-hidden">
                  {/* Hover glow */}
                  <AnimatePresence>
                    {hoveredId === post.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none"
                      />
                    )}
                  </AnimatePresence>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{post.emoji}</span>
                      <CategoryBadge category={post.category} />
                      <span className="text-muted-foreground text-xs font-body ml-auto flex items-center gap-1">
                        <Eye className="w-3 h-3" /> {post.views}
                      </span>
                    </div>

                    <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-muted-foreground font-body text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-xs font-body">{post.date}</span>
                      <span className="text-primary font-display text-sm font-semibold group-hover:underline">
                        Читать →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center">
        <p className="text-muted-foreground text-sm font-body">
          Источник:{" "}
          <a
            href="https://t.me/p4elovvod_FM"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            @p4elovvod_FM
          </a>
        </p>
      </footer>
    </div>
  );
};

/* ─── Router wrapper ─── */
const Blog = () => {
  const { postId } = useParams<{ postId: string }>();

  if (postId) {
    const post = blogPosts.find((p) => p.id === postId);
    if (!post) return <Navigate to="/blog" replace />;
    return <BlogArticle post={post} />;
  }

  return <BlogList />;
};

export default Blog;
