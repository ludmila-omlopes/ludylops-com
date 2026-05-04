import { BlogPostList } from "@/components/BlogPostList";
import { getBlogPosts } from "@/lib/blog-posts";

const LABEL_STYLE = {
  fontSize: 13,
  textTransform: "uppercase" as const,
  letterSpacing: ".18em",
  opacity: 0.55,
  fontWeight: 500,
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <main style={{ background: "var(--bg)", color: "var(--fg)", minHeight: "100%" }}>
      <section
        style={{
          padding: "48px 40px 24px",
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        <div>
          <div style={{ ...LABEL_STYLE, marginBottom: 14 }}>Textos publicados</div>
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontSize: "clamp(72px, 10vw, 128px)",
              fontWeight: 800,
              lineHeight: 0.88,
              letterSpacing: "-0.05em",
            }}
          >
            Blog.
          </h1>
          <p style={{ marginTop: 16, fontSize: 18, maxWidth: 620, lineHeight: 1.4 }}>
            Ensaios e notas sobre tecnologia, jogos, cripto, ferramentas e experimentos
            pelo caminho.
          </p>
        </div>
      </section>

      <section style={{ marginTop: 24 }}>
        <BlogPostList posts={posts} />
      </section>
    </main>
  );
}
