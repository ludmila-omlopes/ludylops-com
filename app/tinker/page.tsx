import type { Metadata } from "next";

const TINKER_DESCRIPTION =
  "Lab da Ludmila com impressão 3D, portáteis, Raspberry Pi, montagem de PCs, cripto e experimentos de hardware.";

export const metadata: Metadata = {
  title: "Lab de hardware e experimentos",
  description: TINKER_DESCRIPTION,
  alternates: {
    canonical: "/tinker",
  },
  openGraph: {
    type: "website",
    url: "/tinker",
    title: "Lab de hardware e experimentos | Ludmila",
    description: TINKER_DESCRIPTION,
  },
};

const LABEL_STYLE = {
  fontSize: 13,
  textTransform: "uppercase" as const,
  letterSpacing: ".18em",
  opacity: 0.55,
  fontWeight: 500,
};

const ITEMS: Array<[string, string, string]> = [
  ["01", "Impressão 3D", "Peças funcionais, cases e ajustes. Prusa + Bambu."],
  ["02", "Portáteis R36S", "Clone e original. Firmware, baterias e grips impressos."],
  ["03", "Raspberry Pi", "Estações retrô, cola do laboratório caseiro e overlays da live."],
  ["04", "Montagem de PCs", "Workstations silenciosas, water loops e rituais de cabo."],
  ["05", "Web3 / cripto", "UX de carteira, experimentos on-chain e um NFT de vez em quando."],
];

export default function TinkerPage() {
  const fg = "var(--fg)";
  return (
    <main style={{ background: "var(--bg)", color: fg, minHeight: "100%" }}>
      <section className="simple-hero" style={{ padding: "48px 40px 20px", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ ...LABEL_STYLE, marginBottom: 14 }}>Seção - lab</div>
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
          Lab.
        </h1>
        <p className="simple-lede" style={{ marginTop: 16, fontSize: 18, maxWidth: 620, lineHeight: 1.4 }}>
          Hardware em que eu tenho mergulhado. Textos, fotos e a ocasional história de
          advertência.
        </p>
      </section>
      <section style={{ borderTop: `1px solid ${fg}`, marginTop: 24 }}>
        {ITEMS.map(([n, k, d]) => (
          <div
            className="tinker-row"
            key={n}
            style={{
              display: "grid",
              gridTemplateColumns: "70px 1fr 380px",
              gap: 30,
              alignItems: "center",
              padding: "30px 40px",
              borderBottom: `1px solid ${fg}`,
            }}
          >
            <span style={{ fontSize: 15, opacity: 0.55 }}>{n}</span>
            <span
              className="tinker-title"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(44px, 5vw, 72px)",
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: "-0.04em",
              }}
            >
              {k}
            </span>
            <span className="tinker-description" style={{ fontSize: 15, opacity: 0.75 }}>{d}</span>
          </div>
        ))}
      </section>
    </main>
  );
}
