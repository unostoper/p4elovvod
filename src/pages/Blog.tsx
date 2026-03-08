import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Eye, ExternalLink, RadioTower } from "lucide-react";
import { motion } from "framer-motion";
import { blogPosts, BlogPost } from "@/data/blogPosts";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

/* ─── Single article view ─── */
const BlogArticle = ({ post }: { post: BlogPost }) => {
  const paragraphs = post.content.split("\n\n").filter(Boolean);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-[700px] mx-auto px-4 pt-6">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-body"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад
        </Link>
      </div>

      <motion.article
        initial="hidden"
        animate="visible"
        className="max-w-[700px] mx-auto px-4 pt-12 pb-24"
      >
        <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-6">
          <span className="text-muted-foreground text-sm font-body">{post.date}</span>
          <span className="text-muted-foreground text-sm">·</span>
          <span className="text-muted-foreground text-sm font-body">{post.category}</span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          custom={0.5}
          className="font-display text-3xl sm:text-5xl font-bold leading-tight mb-8 tracking-tight"
        >
          {post.title}
        </motion.h1>

        <motion.div variants={fadeUp} custom={1} className="flex items-center gap-4 mb-10 text-muted-foreground text-sm font-body">
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" /> {post.views}
          </span>
          <a
            href={post.telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-primary transition-colors"
          >
            <ExternalLink className="w-4 h-4" /> Источник
          </a>
        </motion.div>

        <div className="w-16 h-px bg-border mb-10" />

        {paragraphs.map((p, i) => {
          const isItalic = p.startsWith("_") && p.endsWith("_");
          const isBold = p.startsWith("**") && p.endsWith("**");
          const text = p.replace(/^[_*]+|[_*]+$/g, "");
          const rendered = text
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/_(.*?)_/g, "<em>$1</em>");

          return (
            <motion.p
              key={i}
              variants={fadeUp}
              custom={1.5 + i * 0.1}
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

/* ─── Blog list view (danya.ru/xakep style) ─── */
const BlogList = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Back nav */}
      <div className="max-w-[700px] mx-auto px-4 pt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-body"
        >
          <ArrowLeft className="w-4 h-4" />
          На главную
        </Link>
      </div>

      {/* Header — editorial style */}
      <header className="max-w-[700px] mx-auto px-4 pt-16 pb-8">
        <div className="flex items-center gap-3 mb-6">
          <RadioTower className="w-7 h-7 text-primary" />
          <span className="font-display text-xl font-bold text-foreground tracking-wide uppercase">
            ПЧЕЛОВВОД FM
          </span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight mb-6 tracking-tight">
          Блог из эфира
        </h1>
        <p className="text-muted-foreground text-lg font-body leading-relaxed max-w-[560px]">
          Тексты из Telegram-канала{" "}
          <a
            href="https://t.me/p4elovvod_FM"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            @p4elovvod_FM
          </a>
          . Уютный островок романтики и отдохновения души посреди тоталитарного цифрового ада.
        </p>
        <div className="w-16 h-px bg-primary mt-8" />
      </header>

      {/* Posts — simple link list */}
      <motion.section
        initial="hidden"
        animate="visible"
        className="max-w-[700px] mx-auto px-4 pb-24"
      >
        <div className="divide-y divide-border/40">
          {blogPosts.map((post, i) => (
            <motion.div key={post.id} variants={fadeUp} custom={i}>
              <Link
                to={`/blog/${post.id}`}
                className="group block py-6 first:pt-8"
              >
                <div className="flex items-baseline justify-between gap-4 mb-1">
                  <h2 className="font-display text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <span className="text-muted-foreground text-xs font-body shrink-0 tabular-nums">
                    {post.date}
                  </span>
                </div>
                <p className="text-muted-foreground font-body text-sm line-clamp-1">
                  {post.excerpt}
                </p>
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
