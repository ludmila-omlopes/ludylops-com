import Link from "next/link";
import { GlitchVerb } from "@/components/GlitchVerb";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";

const LABEL_STYLE = {
  fontSize: 13,
  textTransform: "uppercase" as const,
  letterSpacing: ".18em",
  opacity: 0.55,
  fontWeight: 500,
};

export default function HomePage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.NAME,
    url: SITE.URL,
    image: `${SITE.URL}/ludpfp.jpg`,
    jobTitle: "Desenvolvedora e criadora de conteúdo",
    description: SITE.DESCRIPTION,
    sameAs: [SITE.YT_URL, SITE.GH_URL, SITE.X_URL, SITE.TH_URL],
  };

  return (
    <main style={{ background: "var(--bg)", color: "var(--fg)", minHeight: "100%" }}>
      <JsonLd data={personJsonLd} />
      {/* HERO */}
      <section
        className="home-hero"
        style={{
          padding: "56px 40px 72px",
          maxWidth: 1400,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.35fr) minmax(0, 1fr)",
          gap: 64,
          alignItems: "stretch",
        }}
      >
        <div
          className="home-hero-copy"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: 480,
          }}
        >
          <div>
            <div style={{ ...LABEL_STYLE, marginBottom: 20 }}>Oi, eu sou a Ludmila —</div>
            <h1
              className="home-title"
              style={{
                margin: 0,
                fontWeight: 800,
                fontFamily: "var(--font-display)",
                fontSize: "clamp(68px, 8.6vw, 132px)",
                lineHeight: 0.92,
                letterSpacing: "-0.05em",
              }}
            >
              <span style={{ display: "block" }}>
                Eu <GlitchVerb words={["desenvolvo", "jogo", "analiso"]} />
              </span>
              <span style={{ display: "block" }}>coisas.</span>
            </h1>
          </div>

          <div className="home-intro" style={{ marginTop: 40, maxWidth: 540 }}>
            <p style={{ margin: 0, fontSize: 19, lineHeight: 1.5 }}>
              Gamer, desenvolvedora open-source, generalista tech. Extremamente curiosa, 
              exploro IA, web3, e tudo que é novo e interessante. Gosto de resolver problemas.
              E jogar jogos =D
            </p>
          </div>
        </div>

        <div className="home-portrait-wrap" style={{ position: "relative" }}>
          <div
            className="home-portrait"
            style={{
              aspectRatio: "4/5",
              overflow: "hidden",
              background: "var(--fg)",
              width: "100%",
              height: "100%",
              minHeight: 480,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ludmila.jpg"
              alt="Ludmila"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        </div>
      </section>

      {/* THE THREE */}
      <section style={{ borderTop: "1px solid var(--fg)", marginTop: 30 }}>
        {[
          {
            id: "/stream",
            n: "01",
            k: "Lives.",
            d: "Ao vivo no YouTube. Puzzles, metroidvanias e histórias longas.",
            meta: "247 vods · 1.204 h",
          },
          {
            id: "/build",
            n: "02",
            k: "Projetos.",
            d: "Ferramentas open source para a minha live — e algumas para todo mundo.",
            meta: "5 repositórios · MIT",
          },
          {
            id: "/blog",
            n: "03",
            k: "Blog.",
            d: "Textos que ainda vou escrever sobre tech, jogos e experimentos.",
            meta: "rascunhos",
          },
        ].map((s) => (
          <Link
            className="home-index-link"
            key={s.n}
            href={s.id}
            style={{
              display: "grid",
              gridTemplateColumns: "70px 1fr 240px 90px",
              gap: 30,
              alignItems: "center",
              width: "100%",
              padding: "30px 40px",
              borderBottom: "1px solid var(--fg)",
              color: "inherit",
              textDecoration: "none",
              textAlign: "left",
            }}
          >
            <span className="home-index-number" style={{ fontSize: 15, opacity: 0.55 }}>{s.n}</span>
            <span
              className="home-index-title"
              style={{
                fontSize: "clamp(56px, 6vw, 88px)",
                fontWeight: 800,
                fontFamily: "var(--font-display)",
                lineHeight: 1,
                letterSpacing: "-0.04em",
              }}
            >
              {s.k}
            </span>
            <span className="home-index-description" style={{ fontSize: 15, maxWidth: 260 }}>{s.d}</span>
            <span className="home-index-meta" style={{ fontSize: 13, opacity: 0.55, textAlign: "right" }}>
              {s.meta} <span style={{ marginLeft: 6 }}>→</span>
            </span>
          </Link>
        ))}
      </section>

    </main>
  );
}
