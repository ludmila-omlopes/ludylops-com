import { SITE } from "@/lib/site";
import {
  getLatestYoutubeShorts,
  getLatestYoutubeVods,
  type YoutubeShort,
  type YoutubeVod,
} from "@/lib/youtube-vods";

const LABEL_STYLE = {
  fontSize: 13,
  textTransform: "uppercase" as const,
  letterSpacing: ".18em",
  opacity: 0.6,
  fontWeight: 700,
};

const DISPLAY = { fontFamily: "var(--font-display)" } as const;

type Series = {
  title: string;
  meta: string;
  url: string;
  thumbnailUrl: string;
};

const SERIES: Series[] = [
  {
    title: "Clair Obscur",
    meta: "campanha atual",
    url: `${SITE.YT_URL}/search?query=Clair%20Obscur`,
    thumbnailUrl: "https://i.ytimg.com/vi/0qCMko_SwpE/hqdefault.jpg",
  },
  {
    title: "Silksong",
    meta: "71 episodios",
    url: `${SITE.YT_URL}/search?query=Silksong`,
    thumbnailUrl: "https://i.ytimg.com/vi/_5Szqwevsho/hqdefault.jpg",
  },
  {
    title: "Blue Prince",
    meta: "puzzle e investigacao",
    url: `${SITE.YT_URL}/search?query=Blue%20Prince`,
    thumbnailUrl: "https://i.ytimg.com/vi/ZJI-18NUM0s/hqdefault.jpg",
  },
  {
    title: "Enigma do Medo",
    meta: "terror brasileiro",
    url: `${SITE.YT_URL}/search?query=Enigma%20do%20Medo`,
    thumbnailUrl: "https://i.ytimg.com/vi/OpnCumQJ6DI/hqdefault.jpg",
  },
];

function PlayMark() {
  return (
    <span className="stream-play-mark" aria-hidden>
      <svg width="16" height="18" viewBox="0 0 20 22" fill="currentColor">
        <path d="M18.5 9.3c1.3.8 1.3 2.6 0 3.4L3.1 21.4C1.8 22.2 0 21.3 0 19.7V2.3C0 .7 1.8-.2 3.1.6l15.4 8.7z" />
      </svg>
    </span>
  );
}

function VodThumb({ vod, eager = false }: { vod: YoutubeVod; eager?: boolean }) {
  return (
    <img
      src={vod.thumbnailUrl}
      alt=""
      width={1280}
      height={720}
      loading={eager ? "eager" : "lazy"}
    />
  );
}

function ShortThumb({ short }: { short: YoutubeShort }) {
  return <img src={short.thumbnailUrl} alt="" width={720} height={1280} loading="lazy" />;
}

export default async function StreamPage() {
  const [latestVods, latestShorts] = await Promise.all([
    getLatestYoutubeVods(6),
    getLatestYoutubeShorts(4),
  ]);
  const featuredVod = latestVods[0];
  const secondaryVods = latestVods.slice(1);
  const latestVodUrl = featuredVod?.url ?? `${SITE.YT_URL}/streams`;

  return (
    <main className="stream-page">
      <section className="stream-hero">
        <div className="stream-hero-copy">
          <div style={{ ...LABEL_STYLE, marginBottom: 18 }}>Lives no YouTube</div>
          <h1 style={{ ...DISPLAY }} className="stream-title">
            Eu faco lives de jogos.
          </h1>
          <p className="stream-lede">
            Campanhas longas, puzzles, metroidvanias, terror, conversa com o chat e
            pequenas ferramentas que eu invento para deixar a live mais interativa.
          </p>
          <div className="stream-actions">
            <a className="stream-primary-link" href={SITE.YT_URL} target="_blank" rel="noreferrer">
              Ver canal
            </a>
            <a className="stream-text-link" href={latestVodUrl} target="_blank" rel="noreferrer">
              Assistir ultimo VOD →
            </a>
          </div>
        </div>

        <aside className="stream-intro-panel" aria-label="Resumo das lives">
          <div>
            <div style={{ ...LABEL_STYLE, marginBottom: 12 }}>O que voce encontra</div>
            <ul className="stream-intro-list">
              <li>Lives normalmente as tercas e quintas</li>
              <li>Jogos narrativos, puzzles e boss fight teimosa</li>
              <li>Chat participando com ideias, quotes e apostas pipetz</li>
            </ul>
          </div>
          <div className="stream-current">
            <span>Atualmente jogando</span>
            <strong style={{ ...DISPLAY }}>Clair Obscur: Expedition 33</strong>
          </div>
        </aside>
      </section>

      {featuredVod && (
        <section className="stream-start-here">
          <div>
            <div style={{ ...LABEL_STYLE, marginBottom: 12 }}>Comece por aqui</div>
            <h2 style={{ ...DISPLAY }}>O ultimo VOD da live</h2>
            <p>
              Um ponto de entrada rapido para entender o ritmo: jogo longo, comentarios
              durante a gameplay e aquela energia de descobrir as coisas junto com o chat.
            </p>
          </div>
          <a className="stream-featured-card" href={featuredVod.url} target="_blank" rel="noreferrer">
            <div className="stream-featured-thumb">
              <VodThumb vod={featuredVod} eager />
              <span>{featuredVod.duration}</span>
            </div>
            <div className="stream-featured-card-copy">
              <span>
                {featuredVod.game} · {featuredVod.published}
              </span>
              <strong>{featuredVod.title}</strong>
            </div>
          </a>
        </section>
      )}

      <section className="stream-section">
        <div className="stream-section-heading">
          <div style={LABEL_STYLE}>VODs recentes</div>
          <p>Arquivo das ultimas transmissoes, com duracao e jogo para escolher sem precisar adivinhar.</p>
        </div>
        <div className="stream-vod-grid">
          {secondaryVods.map((vod) => (
            <a className="stream-vod-card" key={vod.url} href={vod.url} target="_blank" rel="noreferrer">
              <div className="stream-vod-thumb">
                <VodThumb vod={vod} />
                <span>{vod.duration}</span>
              </div>
              <div className="stream-vod-copy">
                <span>
                  #{vod.label} · {vod.published}
                </span>
                <strong>{vod.title}</strong>
                <em>{vod.game}</em>
              </div>
            </a>
          ))}
        </div>
      </section>

      {latestShorts.length > 0 && (
        <section className="stream-section stream-shorts-section">
          <div className="stream-section-heading">
            <div style={LABEL_STYLE}>YouTube Shorts</div>
            <p>Videos curtos do canal: melhores momentos, reacoes e pequenos recortes das lives.</p>
          </div>
          <div className="stream-shorts-grid">
            {latestShorts.map((short) => (
              <a className="stream-short" key={short.videoId} href={short.url} target="_blank" rel="noreferrer">
                <ShortThumb short={short} />
                <div className="stream-short-overlay">
                  <PlayMark />
                  <div>
                    <span>{short.views || `Short #${short.label}`}</span>
                    <strong>{short.title}</strong>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      <section className="stream-section">
        <div className="stream-section-heading">
          <div style={LABEL_STYLE}>Series do canal</div>
          <p>Campanhas, obsessoes recentes e jogos que ja passaram pela bancada.</p>
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
          para a tela e entre na fila de jogos. Codigo aberto.
          <div>
            <a href={SITE.LUDYLOPS_LIVE} target="_blank" rel="noreferrer">
              Abrir ↗
            </a>
            <a href={SITE.GH_URL} target="_blank" rel="noreferrer">
              Codigo ↗
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
