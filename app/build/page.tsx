import type { Metadata } from "next";

const BUILD_DESCRIPTION =
  "Projetos open source da Ludmila para lives, automações, análise de vídeos, ferramentas web e experimentos.";

export const metadata: Metadata = {
  title: "Projetos open source",
  description: BUILD_DESCRIPTION,
  alternates: {
    canonical: "/build",
  },
  openGraph: {
    type: "website",
    url: "/build",
    title: "Projetos open source | Ludmila",
    description: BUILD_DESCRIPTION,
  },
};

const ITEMS = [
  {
    t: "ludylops.live",
    d: "Interaja com minha live, sugira jogos, mande quotes pra tela e mais! Integrado com streamerbot e OBS.",
    href: "https://ludylops.live",
  },
  {
    t: "YouTube Analyzer MCP",
    d: "MCP local com Gemini para analisar vídeos do YouTube.",
    href: "https://github.com/ludmila-omlopes/youtube-video-analyzer-mcp",
  },
  {
    t: "Talk to the Other Side",
    d: "Tradutor Estrangeiro <-> português para fãs de Ordem Paranormal RPG.",
    href: "https://other-side-nine.vercel.app/",
  },
  {
    t: "Lens Agora",
    d: "Um marketplace social na web3. Atualmente sendo migrado e repensado.",
    href: "https://lensagora.xyz",
  },
  {
    t: "ludylops.com",
    d: "Este site. Tudo o que eu crio, jogo e quebro.",
    href: "#",
  },
];

export default function BuildPage() {
  const fg = "var(--fg)";
  return (
    <main style={{ background: "var(--bg)", color: fg, minHeight: "100%" }}>
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
          Projetos.
        </h1>
        <p className="simple-lede" style={{ marginTop: 16, fontSize: 18, maxWidth: 620, lineHeight: 1.4 }}>
          Ferramentas open source que eu crio para a minha live, e algumas para todo
          mundo. Está tudo no GitHub.
        </p>
      </section>
      <section style={{ borderTop: `1px solid ${fg}`, marginTop: 24 }}>
        {ITEMS.map((p, i) => (
          <a
            className="project-row"
            key={i}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) 320px 60px",
              gap: 28,
              alignItems: "center",
              padding: "32px 40px",
              borderBottom: `1px solid ${fg}`,
              textDecoration: "none",
              color: fg,
            }}
          >
            <span
              className="project-title"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(40px, 4vw, 56px)",
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: "-0.03em",
              }}
            >
              {p.t}
            </span>
            <span className="project-description" style={{ fontSize: 15, opacity: 0.75 }}>{p.d}</span>
            <span style={{ textAlign: "right", fontSize: 22 }}>↗</span>
          </a>
        ))}
      </section>
    </main>
  );
}
