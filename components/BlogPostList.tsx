import Link from "next/link";
import { formatBlogDate, type BlogPost } from "@/lib/blog-posts";

type BlogPostListProps = {
  posts: BlogPost[];
};

export function BlogPostList({ posts }: BlogPostListProps) {
  return (
    <div style={{ borderTop: "1px solid var(--fg)" }}>
      {posts.map((post, index) => (
        <Link
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
          <span style={{ fontSize: 15, opacity: 0.55 }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h2
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
            <p style={{ margin: "12px 0 0", maxWidth: 680, fontSize: 16, opacity: 0.75 }}>
              {post.excerpt}
            </p>
          </div>
          <span style={{ textAlign: "right", fontSize: 13, opacity: 0.65 }}>{formatBlogDate(post.date)}</span>
        </Link>
      ))}
    </div>
  );
}
