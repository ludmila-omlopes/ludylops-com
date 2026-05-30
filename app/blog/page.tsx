import type { Metadata } from "next";
import { BlogPostList } from "@/components/BlogPostList";
import { JsonLd } from "@/components/JsonLd";
import { getBlogPost, getListedBlogPosts } from "@/lib/blog-posts";
import { SITE } from "@/lib/site";

const BLOG_DESCRIPTION =
  "Textos da Ludmila sobre tecnologia, jogos, cripto, ferramentas, IA e experimentos.";

export const metadata: Metadata = {
  title: "Blog sobre tecnologia, jogos e cripto",
  description: BLOG_DESCRIPTION,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    url: "/blog",
    title: "Blog sobre tecnologia, jogos e cripto | Ludmila",
    description: BLOG_DESCRIPTION,
  },
};

const LABEL_STYLE = {
  fontSize: 13,
  textTransform: "uppercase" as const,
  letterSpacing: ".18em",
  opacity: 0.55,
  fontWeight: 500,
};

export default function BlogPage() {
  const posts = getListedBlogPosts().map((post) => {
    const translation = post.translationSlug ? getBlogPost(post.translationSlug) : null;
    return {
      ...post,
      translationLang: translation?.lang,
    };
  });
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog da Ludmila",
    url: `${SITE.URL}/blog`,
    description: BLOG_DESCRIPTION,
    author: {
      "@type": "Person",
      name: SITE.NAME,
      url: SITE.URL,
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${SITE.URL}/blog/${post.slug}`,
      datePublished: post.date,
    })),
  };

  return (
    <main style={{ background: "var(--bg)", color: "var(--fg)", minHeight: "100%" }}>
      <JsonLd data={blogJsonLd} />
      <section
        className="simple-hero"
        style={{
          padding: "48px 40px 24px",
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        <div>
          <div style={{ ...LABEL_STYLE, marginBottom: 14 }}>Textos publicados</div>
          <h1
            className="simple-title"
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
          <p className="simple-lede" style={{ marginTop: 16, fontSize: 18, maxWidth: 620, lineHeight: 1.4 }}>
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
