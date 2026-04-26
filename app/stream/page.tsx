import { SITE } from "@/lib/site";
import { getLatestYoutubeVods } from "@/lib/youtube-vods";

const LABEL_STYLE = {
  fontSize: 13,
  textTransform: "uppercase" as const,
  letterSpacing: ".18em",
  opacity: 0.55,
  fontWeight: 500,
};

const DISPLAY = { fontFamily: "var(--font-display)" } as const;

export default async function StreamPage() {
  const isLive = true;
  const showSchedule = false;
  const fg = "var(--fg)";
  const bg = "var(--bg)";
  const latestVods = await getLatestYoutubeVods();
  const latestVodUrl = latestVods[0]?.url ?? `${SITE.YT_URL}/streams`;

  const schedule: Array<[string, string, string, boolean]> = [
    ["Ter", "Blue Prince", "20:00", true],
    ["Qui", "Clair Obscur", "20:00", false],
    ["Sáb", "Outer Wilds", "15:00", false],
    ["Dom", "Pedidos do chat", "19:00", false],
  ];

  return (
    <main style={{ background: bg, color: fg, minHeight: "100%" }}>
      {/* title */}
      <section
        style={{
          padding: "48px 40px 16px",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          alignItems: "end",
          gap: 30,
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        <div>
          <h1
            style={{
              ...DISPLAY,
              margin: 0,
              fontSize: "clamp(72px, 10vw, 128px)",
              fontWeight: 800,
              lineHeight: 0.88,
              letterSpacing: "-0.05em",
            }}
          >
            Lives.
          </h1>
          <p style={{ marginTop: 16, fontSize: 18, maxWidth: 560, lineHeight: 1.4 }}>
            Ao vivo toda terça e quinta. Outros dias também, se vocês pedirem com
            carinho.
          </p>
        </div>
        <a
          href={SITE.YT_URL}
          target="_blank"
          rel="noreferrer"
          style={{
            color: bg,
            background: fg,
            padding: "12px 18px",
            fontSize: 15,
            fontWeight: 600,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            alignSelf: "end",
          }}
        >
          <svg width="18" height="13" viewBox="0 0 20 14" fill="currentColor" aria-hidden>
            <path d="M19.6 2.2c-.2-.9-.9-1.6-1.8-1.8C16.2 0 10 0 10 0S3.8 0 2.2.4C1.3.6.6 1.3.4 2.2 0 3.8 0 7 0 7s0 3.2.4 4.8c.2.9.9 1.6 1.8 1.8 1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM8 10V4l5.2 3L8 10z" />
          </svg>
          Assistir no YouTube
        </a>
      </section>

      {/* now-playing bar */}
      {isLive && (
        <section
          style={{
            margin: "28px 40px 0",
            maxWidth: 1320,
            background: fg,
            color: bg,
            padding: "24px 28px",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: ".15em",
                opacity: 0.7,
                marginBottom: 8,
                fontWeight: 500,
              }}
            >
              Atualmente dissecando
            </div>
            <div
              style={{
                ...DISPLAY,
                fontSize: 42,
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: "-0.03em",
              }}
            >
              Clair Obscure:{" "}
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontFamily: "var(--font-serif)",
                }}
              >
                Expedition 33.
              </em>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <a
              href={latestVodUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-block",
                marginTop: 10,
                fontSize: 13,
                color: bg,
                textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >
              Último VOD →
            </a>
          </div>
        </section>
      )}

      {/* schedule */}
      <section
        hidden={!showSchedule}
        aria-hidden={!showSchedule}
        style={{
          display: showSchedule ? undefined : "none",
          padding: "48px 40px 8px",
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        <div style={{ ...LABEL_STYLE, marginBottom: 16 }}>Esta semana</div>
        {schedule.map(([d, g, t, live], i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "90px 1fr 110px",
              alignItems: "baseline",
              padding: "16px 0",
              borderTop:
                i === 0
                  ? `1px solid ${fg}`
                  : "1px solid color-mix(in srgb, var(--fg) 20%, transparent)",
              fontSize: 34,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            <span
              style={{
                fontSize: 15,
                opacity: 0.6,
                textTransform: "uppercase",
                letterSpacing: ".1em",
                fontWeight: 500,
              }}
            >
              {d}
            </span>
            <span>
              {g}
              {live && (
                <em
                  style={{
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: 22,
                    fontFamily: "var(--font-serif)",
                  }}
                >
                  {" "}
                  · ao vivo
                </em>
              )}
            </span>
            <span
              style={{
                textAlign: "right",
                fontSize: 16,
                fontWeight: 500,
                opacity: 0.7,
              }}
            >
              {t}
            </span>
          </div>
        ))}
        <div style={{ borderTop: `1px solid ${fg}` }} />
      </section>

      {/* games */}
      <section style={{ padding: "48px 40px 20px", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ ...LABEL_STYLE, marginBottom: 16 }}>Jogos que já passaram no canal</div>
        <div
          style={{
            ...DISPLAY,
            fontSize: "clamp(32px, 4vw, 54px)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          Blue Prince, Silksong, Enigma do Medo, Neva, Ghost of Tsushima{" "}</div>
      </section>

      {/* recent vods */}
      <section style={{ padding: "40px 40px", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ ...LABEL_STYLE, marginBottom: 16 }}>Vods recentes</div>
        <div style={{ borderTop: `1px solid ${fg}` }}>
          {latestVods.map((vod) => (
            <a
              key={vod.url}
              href={vod.url}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "grid",
                gridTemplateColumns: "48px minmax(0, 1fr) 220px 110px 80px",
                gap: 16,
                alignItems: "baseline",
                padding: "16px 0",
                borderBottom:
                  "1px solid color-mix(in srgb, var(--fg) 20%, transparent)",
                textDecoration: "none",
                color: fg,
              }}
            >
              <span style={{ fontSize: 13, opacity: 0.5 }}>#{vod.label}</span>
              <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.01em" }}>
                {vod.title}
              </span>
              <span style={{ fontSize: 13, opacity: 0.7 }}>{vod.game}</span>
              <span style={{ fontSize: 13, opacity: 0.7 }}>{vod.published}</span>
              <span style={{ fontSize: 13, opacity: 0.7, textAlign: "right" }}>
                {vod.duration}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ludylops.live */}
      <section
        style={{
          padding: "48px 40px",
          borderTop: `1px solid ${fg}`,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
          alignItems: "end",
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            ...DISPLAY,
            fontSize: "clamp(44px, 5vw, 64px)",
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
          }}
        >
          ludylops
          <em
            style={{
              fontStyle: "italic",
              fontWeight: 500,
              fontFamily: "var(--font-serif)",
            }}
          >
            .live
          </em>
        </div>
        <div
          style={{
            fontSize: 16,
            lineHeight: 1.55,
            maxWidth: 440,
            justifySelf: "end",
          }}
        >
          Uma camada personalizada para a minha live. Aposte pontos pipetz, mande
          quotes para a tela e entre na fila de jogos. Código aberto.
          <div style={{ marginTop: 14, display: "flex", gap: 20 }}>
            <a
              href={SITE.LUDYLOPS_LIVE}
              target="_blank"
              rel="noreferrer"
              style={{ color: fg, textDecoration: "underline", textUnderlineOffset: 4 }}
            >
              Abrir ↗
            </a>
            <a
              href={SITE.GH_URL}
              target="_blank"
              rel="noreferrer"
              style={{ color: fg, textDecoration: "underline", textUnderlineOffset: 4 }}
            >
              Código ↗
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
