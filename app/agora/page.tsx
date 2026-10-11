import type { Metadata } from "next";
import Link from "next/link";
import { getRecentGithubRepos } from "@/lib/github";
import { SITE } from "@/lib/site";
import { getLatestYoutubeVideos, getLatestYoutubeVods, metaLine } from "@/lib/youtube-vods";

const AGORA_DESCRIPTION = "O que a Ludmila está jogando, gravando e construindo neste momento.";

export const metadata: Metadata = {
  title: "Agora",
  description: AGORA_DESCRIPTION,
  alternates: {
    canonical: "/agora",
  },
  openGraph: {
    type: "website",
    url: "/agora",
    title: "Agora | Ludmila",
    description: AGORA_DESCRIPTION,
  },
};

// Keeps the relative dates below honest between YouTube/GitHub refreshes.
export const revalidate = 1800;

// "hoje" and "ontem" read well after "atualizado"; "semana passada" does not, so weeks stay numeric.
const RELATIVE_DAYS = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" });
const RELATIVE_TIME = new Intl.RelativeTimeFormat("pt-BR", { numeric: "always" });

function since(iso: string): string {
  const days = Math.round((Date.parse(iso) - Date.now()) / 86_400_000);

  if (days > -7) {
    return RELATIVE_DAYS.format(days, "day");
  }

  if (days > -60) {
    return RELATIVE_TIME.format(Math.round(days / 7), "week");
  }

  return RELATIVE_TIME.format(Math.round(days / 30), "month");
}

export default async function AgoraPage() {
  const [[latestVod], [latestVideo], repos] = await Promise.all([
    getLatestYoutubeVods(1),
    getLatestYoutubeVideos(1),
    getRecentGithubRepos(3),
  ]);

  return (
    <main style={{ background: "var(--bg)", color: "var(--fg)", minHeight: "100%" }}>
      <section className="simple-hero" style={{ padding: "48px 40px 20px", maxWidth: 1400, margin: "0 auto" }}>
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
          Agora.
        </h1>
        <p className="simple-lede" style={{ marginTop: 16, fontSize: 18, maxWidth: 620, lineHeight: 1.4 }}>
          O que estou jogando, gravando e construindo neste momento. A página se atualiza sozinha
          com o YouTube e o GitHub.
        </p>
      </section>

      <div className="now-list">
        {latestVod && (
          <section className="now-row">
            <h2 className="now-label">Jogando ao vivo</h2>
            <div>
              <a className="now-title" href={latestVod.url} target="_blank" rel="noreferrer">
                {latestVod.game}
              </a>
              <p className="now-detail">{metaLine(`Último episódio: ${latestVod.title}`, latestVod.published)}</p>
            </div>
          </section>
        )}

        {latestVideo && (
          <section className="now-row">
            <h2 className="now-label">Último vídeo</h2>
            <div>
              <a className="now-title" href={latestVideo.url} target="_blank" rel="noreferrer">
                {latestVideo.title}
              </a>
              <p className="now-detail">{metaLine("No Ludylops", latestVideo.views, latestVideo.published)}</p>
            </div>
          </section>
        )}

        <section className="now-row">
          <h2 className="now-label">Construindo</h2>
          {repos.length > 0 ? (
            <div className="now-repos">
              {repos.map((repo) => (
                <div key={repo.url}>
                  <a className="now-title" href={repo.url} target="_blank" rel="noreferrer">
                    {repo.name}
                  </a>
                  <p className="now-detail">{metaLine(repo.description, `atualizado ${since(repo.pushedAt)}`)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="now-detail">
              Tudo no{" "}
              <a href={SITE.GH_URL} target="_blank" rel="noreferrer">
                GitHub
              </a>
              .
            </p>
          )}
        </section>

        <section className="now-row">
          <h2 className="now-label">Contato</h2>
          <p className="now-detail">
            Para falar de um projeto, escreva para{" "}
            <a href="mailto:contato@ludylops.com.br">contato@ludylops.com.br</a>. O jeito como eu
            trabalho está em <Link href="/servicos">Serviços</Link>.
          </p>
        </section>
      </div>
    </main>
  );
}
