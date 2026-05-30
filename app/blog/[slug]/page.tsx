import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { MarkdownContent } from "@/components/MarkdownContent";
import { formatBlogDate, getBlogPost, getBlogPosts } from "@/lib/blog-posts";
import { SITE } from "@/lib/site";

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

const OG_LOCALES: Record<string, string> = {
  "pt-BR": "pt_BR",
  pt: "pt_BR",
  en: "en_US",
  "en-US": "en_US",
};

function toOgLocale(lang: string) {
  return OG_LOCALES[lang] ?? lang.replace("-", "_");
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {};
  }

  const translation = post.translationSlug ? getBlogPost(post.translationSlug) : null;

  const languages: Record<string, string> = {
    [post.lang]: `/blog/${post.slug}`,
  };

  if (translation) {
    languages[translation.lang] = `/blog/${translation.slug}`;
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
      languages,
    },
    openGraph: {
      type: "article",
      url: `/blog/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      locale: toOgLocale(post.lang),
      alternateLocale: translation ? toOgLocale(translation.lang) : undefined,
      publishedTime: post.date,
      authors: [SITE.NAME],
      images: post.coverImage ? [post.coverImage] : ["/ludpfp.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : ["/ludpfp.jpg"],
      creator: "@ludylops",
    },
  };
}

const TRANSLATION_LABELS: Record<string, string> = {
  "pt-BR": "Ler em português",
  pt: "Ler em português",
  en: "Read in English",
  "en-US": "Read in English",
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const translation = post.translationSlug ? getBlogPost(post.translationSlug) : null;
  const translationLabel = translation
    ? TRANSLATION_LABELS[translation.lang] ?? `Read in ${translation.lang}`
    : null;

  const postUrl = `${SITE.URL}/blog/${post.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ? [post.coverImage] : [`${SITE.URL}/ludpfp.jpg`],
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: postUrl,
    author: {
      "@type": "Person",
      name: SITE.NAME,
      url: SITE.URL,
    },
    publisher: {
      "@type": "Person",
      name: SITE.NAME,
      url: SITE.URL,
    },
  };

  return (
    <main style={{ background: "var(--bg)", color: "var(--fg)", minHeight: "100%" }}>
      <JsonLd data={articleJsonLd} />
      <article className="post-article" style={{ maxWidth: 920, margin: "0 auto", padding: "48px 40px 72px" }}>
        <Link href="/blog" style={{ fontSize: 14, opacity: 0.75, textUnderlineOffset: 4 }}>
          Voltar para o blog
        </Link>

        <header className="post-header" style={{ marginTop: 28, paddingBottom: 30, borderBottom: "1px solid var(--fg)" }}>
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
            {translation && translationLabel ? (
              <>
                <span aria-hidden>·</span>
                <Link href={`/blog/${translation.slug}`} style={{ textUnderlineOffset: 4 }}>
                  {translationLabel}
                </Link>
              </>
            ) : null}
          </div>
          <h1
            className="post-title"
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
          <p className="post-excerpt" style={{ margin: "20px 0 0", maxWidth: 720, fontSize: 20, lineHeight: 1.45, opacity: 0.78 }}>
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
