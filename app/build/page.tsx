import type { Metadata } from "next";
import { ProjectList } from "@/components/ProjectList";
import { PROJECTS } from "@/lib/projects";

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
      <section style={{ marginTop: 24 }}>
        <ProjectList projects={PROJECTS} ariaLabel="Projetos open source" />
      </section>
    </main>
  );
}
