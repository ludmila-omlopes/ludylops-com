import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/blog-posts";
import { SITE } from "@/lib/site";

const staticRoutes = ["", "/blog", "/stream", "/build", "/tinker"];

function toLastModified(date: string) {
  const parsed = new Date(`${date}T00:00:00.000Z`);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticRoutes.map((route) => ({
    url: `${SITE.URL}${route}`,
    lastModified: new Date(),
  }));

  const postEntries = getBlogPosts()
    .filter((post) => post.status === "publicado")
    .map((post) => ({
      url: `${SITE.URL}/blog/${post.slug}`,
      lastModified: toLastModified(post.date),
    }));

  return [...staticEntries, ...postEntries];
}
