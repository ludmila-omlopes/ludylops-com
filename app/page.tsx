import Link from "next/link";
import { GlitchVerb } from "@/components/GlitchVerb";
import { SITE } from "@/lib/site";

const LABEL_STYLE = {
  fontSize: 13,
  textTransform: "uppercase" as const,
  letterSpacing: ".18em",
  opacity: 0.55,
  fontWeight: 500,
};

export default function HomePage() {
  return (
    <main style={{ background: "var(--bg)", color: "var(--fg)", minHeight: "100%" }}>
      {/* HERO */}
      <section
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

          <div style={{ marginTop: 40, maxWidth: 540 }}>
            <p style={{ margin: 0, fontSize: 19, lineHeight: 1.5 }}>
              Gamer, desenvolvedora open-source, generalista tech. Extremamente curiosa, 
              exploro IA, web3, e tudo que é novo e interessante. Gosto de resolver problemas.
              E jogar jogos =D
            </p>
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <div
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
            meta: "4 repositórios · MIT",
          },
          {
            id: "/tinker",
            n: "03",
            k: "Lab.",
            d: "Impressões 3D, mods em portáteis, projetos com Pi e experimentos web3.",
            meta: "14 textos",
          },
        ].map((s) => (
          <Link
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
            <span style={{ fontSize: 15, opacity: 0.55 }}>{s.n}</span>
            <span
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
            <span style={{ fontSize: 15, maxWidth: 260 }}>{s.d}</span>
            <span style={{ fontSize: 13, opacity: 0.55, textAlign: "right" }}>
              {s.meta} <span style={{ marginLeft: 6 }}>→</span>
            </span>
          </Link>
        ))}
      </section>

    </main>
  );
}
