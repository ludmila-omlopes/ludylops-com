import { SITE } from "@/lib/site";

export type GithubRepo = {
  name: string;
  description: string;
  url: string;
  pushedAt: string;
};

const GITHUB_USER = new URL(SITE.GH_URL).pathname.replace(/^\//, "");

// Most recently pushed public repos, skipping forks, archived repos and dotfile repos like .github.
export async function getRecentGithubRepos(limit = 3): Promise<GithubRepo[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=20&type=owner`,
      {
        headers: {
          accept: "application/vnd.github+json",
          "user-agent": "ludylops.com",
        },
        next: { revalidate: 1800 },
      },
    );

    if (!response.ok) {
      throw new Error(`GitHub request failed with ${response.status}`);
    }

    const repos: any[] = await response.json();

    return repos
      .filter((repo) => !repo.fork && !repo.archived && !repo.name.startsWith("."))
      .slice(0, limit)
      .map((repo) => ({
        name: repo.name,
        description: repo.description ?? "",
        url: repo.html_url,
        pushedAt: repo.pushed_at,
      }));
  } catch (error) {
    // Unauthenticated calls share a small rate limit; the page falls back to a GitHub link.
    console.error("Failed to fetch recent GitHub repos", error);
    return [];
  }
}
