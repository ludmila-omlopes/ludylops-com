import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { getLatestYoutubeVideos, getLatestYoutubeVods, metaLine } from "@/lib/youtube-vods";

const YOUTUBE_DESCRIPTION =
  "Dois canais no YouTube: Ludylops para vídeos editados e LudylopsGames para campanhas, lives e VODs.";

export const metadata: Metadata = {
  title: "YouTube",
  description: YOUTUBE_DESCRIPTION,
  alternates: {
    canonical: "/youtube",
  },
  openGraph: {
    type: "website",
    url: "/youtube",
    title: "YouTube | Ludmila",
    description: YOUTUBE_DESCRIPTION,
  },
};

const LABEL_STYLE = {
  fontSize: 13,
  textTransform: "uppercase" as const,
  letterSpacing: ".18em",
  opacity: 0.6,
  fontWeight: 700,
};

const DISPLAY = { fontFamily: "var(--font-display)" } as const;

type Channel = {
  label: string;
  name: string;
  handle: string;
  url: string;
  variant: "edited" | "games";
};

const CHANNELS: Channel[] = [
  {
    label: "Vídeos editados",
    name: "Ludylops",
    handle: "@ludylops",
    url: SITE.YT_LUDYLOPS_URL,
    variant: "edited",
  },
  {
    label: "Campanhas, lives e VODs",
    name: "LudylopsGames",
    handle: "@ludylopsGames",
    url: SITE.YT_GAMES_URL,
    variant: "games",
  },
];

type Series = {
  title: string;
  meta: string;
  url: string;
  thumbnailUrl: string;
};

function playlistUrl(listId: string): string {
  return `https://www.youtube.com/playlist?list=${listId}`;
}

const SERIES: Series[] = [
  {
    title: "Elden Ring",
    meta: "campanha atual",
    url: playlistUrl("PLfOjr4Ef6xKE"),
    thumbnailUrl: "https://i.ytimg.com/vi/x7M0lWIUiT0/hqdefault.jpg",
  },
  {
    title: "Clair Obscur",
    meta: "34 episódios",
    url: playlistUrl("PL2vL7fUizS0EjanZx_a93TLagKFIzBqlO"),
    thumbnailUrl: "https://i.ytimg.com/vi/0qCMko_SwpE/hqdefault.jpg",
  },
  {
    title: "Silksong",
    meta: "71 episódios",
    url: playlistUrl("PL2vL7fUizS0EKF3wKNFuNt8kycTH7ptyh"),
    thumbnailUrl: "https://i.ytimg.com/vi/_5Szqwevsho/hqdefault.jpg",
  },
  {
    title: "Blue Prince",
    meta: "puzzle e investigação",
    url: playlistUrl("PL2vL7fUizS0GTtSSHmvSXQ3lxHXSCJWBk"),
    thumbnailUrl: "https://i.ytimg.com/vi/OrfnIJedOh4/hqdefault.jpg",
  },
];

function VodThumb({ src, eager = false }: { src: string; eager?: boolean }) {
  return (
    <img
      src={src}
      alt=""
      width={1280}
      height={720}
      loading={eager ? "eager" : "lazy"}
    />
  );
}

export default async function YoutubePage() {
  const [latestVods, latestVideos] = await Promise.all([
    getLatestYoutubeVods(7),
    getLatestYoutubeVideos(6),
  ]);
  const featuredVod = latestVods[0];
  const secondaryVods = latestVods.slice(1);

  return (
    <main className="stream-page">
      <section className="stream-channel-hero">
        <div className="stream-channel-hero-heading">
          <div style={LABEL_STYLE}>YouTube</div>
          <h1 style={{ ...DISPLAY }} className="stream-title">
            Canais no YouTube.
          </h1>
          <p className="stream-lede">
            No Ludylops, faço vídeos sobre jogos e sobre o que eles mudam na gente. No
            LudylopsGames, jogo campanhas inteiras ao vivo, do começo ao fim, com o chat junto.
          </p>
        </div>
        <div className="stream-channel-grid">
          {CHANNELS.map((channel) => (
            <a
              className={`stream-channel-card stream-channel-card--${channel.variant}`}
              href={channel.url}
              key={channel.name}
              target="_blank"
              rel="noreferrer"
            >
              <div>
                <span>{channel.label}</span>
                <h2 style={{ ...DISPLAY }}>{channel.name}</h2>
              </div>
              <strong>{channel.handle} <em aria-hidden>→</em></strong>
            </a>
          ))}
        </div>
      </section>

      {latestVideos.length > 0 && (
        <section className="stream-section">
          <div className="stream-section-heading">
            <div style={LABEL_STYLE}>No Ludylops</div>
            <p>Os vídeos editados mais recentes.</p>
          </div>
          <div className="stream-vod-grid">
            {latestVideos.map((video) => (
              <a className="stream-vod-card" key={video.url} href={video.url} target="_blank" rel="noreferrer">
                <div className="stream-vod-thumb">
                  <VodThumb src={video.thumbnailUrl} />
                  <span>{video.duration}</span>
                </div>
                <div className="stream-vod-copy">
                  <span>{metaLine(video.views, video.published)}</span>
                  <strong>{video.title}</strong>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {featuredVod && (
        <section className="stream-start-here">
          <div>
            <div style={{ ...LABEL_STYLE, marginBottom: 12 }}>No LudylopsGames</div>
            <h2 style={{ ...DISPLAY }}>Última live</h2>
          </div>
          <a className="stream-featured-card" href={featuredVod.url} target="_blank" rel="noreferrer">
            <div className="stream-featured-thumb">
              <VodThumb src={featuredVod.thumbnailUrl} eager />
              <span>{featuredVod.duration}</span>
            </div>
            <div className="stream-featured-card-copy">
              <span>{metaLine(featuredVod.game, featuredVod.published)}</span>
              <strong>{featuredVod.title}</strong>
            </div>
          </a>
        </section>
      )}

      <section className="stream-section">
        <div className="stream-section-heading">
          <div style={LABEL_STYLE}>VODs recentes</div>
          <p>As últimas transmissões, com duração e jogo.</p>
        </div>
        <div className="stream-vod-grid">
          {secondaryVods.map((vod) => (
            <a className="stream-vod-card" key={vod.url} href={vod.url} target="_blank" rel="noreferrer">
              <div className="stream-vod-thumb">
                <VodThumb src={vod.thumbnailUrl} />
                <span>{vod.duration}</span>
              </div>
              <div className="stream-vod-copy">
                <span>{metaLine(`#${vod.label}`, vod.published)}</span>
                <strong>{vod.title}</strong>
                <em>{vod.game}</em>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="stream-section">
        <div className="stream-section-heading">
          <div style={LABEL_STYLE}>Campanhas</div>
          <p>Jogos acompanhados do começo ao fim no LudylopsGames.</p>
        </div>
        <div className="stream-series-grid">
          {SERIES.map((series) => (
            <a className="stream-series" key={series.title} href={series.url} target="_blank" rel="noreferrer">
              <div className="stream-series-thumb">
                <img src={series.thumbnailUrl} alt="" width={1280} height={720} loading="lazy" />
              </div>
              <div>
                <span>{series.meta}</span>
                <strong style={{ ...DISPLAY }}>{series.title}</strong>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="stream-live-tools">
        <div style={{ ...DISPLAY }} className="stream-tools-title">
          ludylops
          <em style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}>.live</em>
        </div>
        <div className="stream-tools-copy">
          Uma camada personalizada para a minha live. Aposte pontos pipetz, mande quotes
          para a tela e entre na fila de jogos. Código aberto.
          <div>
            <a href={SITE.LUDYLOPS_LIVE} target="_blank" rel="noreferrer">
              Abrir ↗
            </a>
            <a href={SITE.GH_URL} target="_blank" rel="noreferrer">
              Código ↗
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
