import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/blog-posts";
import { SITE } from "@/lib/site";

const staticRoutes = ["", "/blog", "/stream", "/build", "/servicos", "/tinker"];

function toLastModified(date: string) {
  const parsed = new Date(`${date}T00:00:00.000Z`);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticRoutes.map((route) => ({
    url: `${SITE.URL}${route}`,
    lastModified: new Date(),
  }));

  const posts = getBlogPosts().filter((post) => post.status === "publicado");
  const publishedSlugs = new Set(posts.map((post) => post.slug));

  const postEntries = posts.map((post) => {
    const translationSlug =
      post.translationSlug && publishedSlugs.has(post.translationSlug) ? post.translationSlug : null;

    return {
      url: `${SITE.URL}/blog/${post.slug}`,
      lastModified: toLastModified(post.date),
      ...(translationSlug
        ? {
            alternates: {
              languages: {
                [post.lang]: `${SITE.URL}/blog/${post.slug}`,
                ...(() => {
                  const translation = posts.find((entry) => entry.slug === translationSlug);
                  return translation ? { [translation.lang]: `${SITE.URL}/blog/${translation.slug}` } : {};
                })(),
              },
            },
          }
        : {}),
    };
  });

  return [...staticEntries, ...postEntries];
}
