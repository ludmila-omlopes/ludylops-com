import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/MarkdownContent";
import { formatBlogDate, getBlogPost, getBlogPosts } from "@/lib/blog-posts";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main style={{ background: "var(--bg)", color: "var(--fg)", minHeight: "100%" }}>
      <article style={{ maxWidth: 920, margin: "0 auto", padding: "48px 40px 72px" }}>
        <Link href="/blog" style={{ fontSize: 14, opacity: 0.75, textUnderlineOffset: 4 }}>
          Voltar para o blog
        </Link>

        <header style={{ marginTop: 28, paddingBottom: 30, borderBottom: "1px solid var(--fg)" }}>
          <div
            style={{
              display: "flex",
              gap: 14,
              alignItems: "center",
              marginBottom: 18,
              fontSize: 13,
              letterSpacing: ".08em",
              opacity: 0.65,
            }}
          >
            <span>{formatBlogDate(post.date)}</span>
          </div>
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontSize: "clamp(56px, 8vw, 104px)",
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: "-0.05em",
            }}
          >
            {post.title}
          </h1>
          <p style={{ margin: "20px 0 0", maxWidth: 720, fontSize: 20, lineHeight: 1.45, opacity: 0.78 }}>
            {post.excerpt}
          </p>
        </header>

        <section style={{ paddingTop: 34 }}>
          <MarkdownContent content={post.content} />
        </section>
      </article>
    </main>
  );
}
