import Link from "next/link";
import { formatBlogDate, type BlogPost } from "@/lib/blog-posts";

type BlogPostListItem = BlogPost & {
  translationLang?: string;
};

type BlogPostListProps = {
  posts: BlogPostListItem[];
};

const TRANSLATION_BADGES: Record<string, string> = {
  en: "English available",
  "en-US": "English available",
  pt: "Versão em português",
  "pt-BR": "Versão em português",
};

function translationBadge(lang?: string) {
  if (!lang) {
    return null;
  }
  return TRANSLATION_BADGES[lang] ?? `Disponível em ${lang}`;
}

export function BlogPostList({ posts }: BlogPostListProps) {
  return (
    <div className="blog-list" style={{ borderTop: "1px solid var(--fg)" }}>
      {posts.map((post, index) => (
        <Link
          className="blog-list-row"
          key={post.slug}
          href={`/blog/${post.slug}`}
          style={{
            display: "grid",
            gridTemplateColumns: "70px minmax(0, 1fr) 190px",
            gap: 28,
            alignItems: "center",
            padding: "30px 40px",
            borderBottom: "1px solid var(--fg)",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <span className="blog-list-number" style={{ fontSize: 15, opacity: 0.55 }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h2
              className="blog-list-title"
              style={{
                margin: 0,
                fontFamily: "var(--font-display)",
                fontSize: "clamp(34px, 4vw, 60px)",
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: "-0.04em",
              }}
            >
              {post.title}
            </h2>
            <p className="blog-list-excerpt" style={{ margin: "12px 0 0", maxWidth: 680, fontSize: 16, opacity: 0.75 }}>
              {post.excerpt}
            </p>
            {translationBadge(post.translationLang) ? (
              <span
                className="blog-list-translation"
                style={{
                  display: "inline-block",
                  marginTop: 14,
                  padding: "4px 10px",
                  border: "1px solid var(--fg)",
                  borderRadius: 999,
                  fontSize: 12,
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  opacity: 0.7,
                }}
              >
                {translationBadge(post.translationLang)}
              </span>
            ) : null}
          </div>
          <span className="blog-list-date" style={{ textAlign: "right", fontSize: 13, opacity: 0.65 }}>{formatBlogDate(post.date)}</span>
        </Link>
      ))}
    </div>
  );
}
