import fs from "node:fs";
import path from "node:path";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  status: "planejado" | "rascunho" | "publicado";
  date: string;
  coverImage?: string;
  keywords: string[];
  lang: string;
  translationSlug?: string;
  content: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const DATE_FORMATTER = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function parseFrontmatter(fileContent: string) {
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

  if (!match) {
    return {
      metadata: {},
      content: fileContent.trim(),
    };
  }

  const metadata = Object.fromEntries(
    match[1]
      .split(/\r?\n/)
      .map((line) => line.match(/^([^:]+):\s*(.*)$/))
      .filter((line): line is RegExpMatchArray => Boolean(line))
      .map((line) => [line[1].trim(), line[2].trim()]),
  );

  return {
    metadata,
    content: match[2].trim(),
  };
}

function readPost(filename: string): BlogPost {
  const slug = filename.replace(/\.md$/, "");
  const fileContent = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
  const { metadata, content } = parseFrontmatter(fileContent);
  const firstMarkdownImage = content.match(/!\[[^\]]*]\(([^)]+)\)/)?.[1];

  return {
    slug,
    title: metadata.title ?? slug,
    excerpt: metadata.excerpt ?? "",
    status:
      metadata.status === "rascunho" || metadata.status === "publicado"
        ? metadata.status
        : "planejado",
    date: metadata.date ?? "Em breve",
    coverImage: metadata.cover ?? metadata.image ?? firstMarkdownImage,
    keywords: metadata.keywords
      ? metadata.keywords.split(",").map((keyword) => keyword.trim()).filter(Boolean)
      : [],
    lang: metadata.lang?.trim() || "pt-BR",
    translationSlug: metadata.translationSlug?.trim() || undefined,
    content,
  };
}

export function getBlogPosts(): BlogPost[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((filename) => filename.endsWith(".md"))
    .map(readPost)
    .sort((postA, postB) => {
      const dateA = Date.parse(`${postA.date}T00:00:00.000Z`);
      const dateB = Date.parse(`${postB.date}T00:00:00.000Z`);

      if (!Number.isNaN(dateA) && !Number.isNaN(dateB) && dateA !== dateB) {
        return dateB - dateA;
      }

      return postA.slug.localeCompare(postB.slug);
    });
}

export const DEFAULT_LANG = "pt-BR";

// Collapses translation pairs into a single listed entry, keeping the
// default-language version (falling back to a deterministic slug order).
export function getListedBlogPosts(): BlogPost[] {
  const posts = getBlogPosts();
  const bySlug = new Map(posts.map((post) => [post.slug, post]));

  return posts.filter((post) => {
    if (!post.translationSlug) {
      return true;
    }

    const counterpart = bySlug.get(post.translationSlug);

    if (!counterpart) {
      return true;
    }

    if (post.lang === DEFAULT_LANG) {
      return true;
    }

    if (counterpart.lang === DEFAULT_LANG) {
      return false;
    }

    return post.slug < counterpart.slug;
  });
}

export function getBlogPost(slug: string): BlogPost | null {
  const filename = `${slug}.md`;

  if (!fs.existsSync(path.join(BLOG_DIR, filename))) {
    return null;
  }

  return readPost(filename);
}

export function formatBlogDate(date: string) {
  const parsed = new Date(`${date}T00:00:00.000Z`);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return DATE_FORMATTER.format(parsed);
}
