import fs from "node:fs";
import path from "node:path";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  status: "planejado" | "rascunho" | "publicado";
  date: string;
  content: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

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

  return {
    slug,
    title: metadata.title ?? slug,
    excerpt: metadata.excerpt ?? "",
    status:
      metadata.status === "rascunho" || metadata.status === "publicado"
        ? metadata.status
        : "planejado",
    date: metadata.date ?? "Em breve",
    content,
  };
}

export function getBlogPosts(): BlogPost[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((filename) => filename.endsWith(".md"))
    .sort()
    .map(readPost);
}

export function getBlogPost(slug: string): BlogPost | null {
  const filename = `${slug}.md`;

  if (!fs.existsSync(path.join(BLOG_DIR, filename))) {
    return null;
  }

  return readPost(filename);
}
