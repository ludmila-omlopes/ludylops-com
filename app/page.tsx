import Link from "next/link";
import { GlitchVerb } from "@/components/GlitchVerb";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { getListedBlogPosts } from "@/lib/blog-posts";
import { CHANNEL_STATS } from "@/lib/channel-stats";
import { PROJECTS } from "@/lib/projects";

const LABEL_STYLE = {
  fontSize: 13,
  textTransform: "uppercase" as const,
  letterSpacing: ".18em",
  opacity: 0.55,
  fontWeight: 500,
};

export default function HomePage() {
  const postCount = getListedBlogPosts().length;
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.NAME,
    url: SITE.URL,
    image: `${SITE.URL}/ludpfp.jpg`,
    jobTitle: "Desenvolvedora e criadora de conteúdo",
    description: SITE.DESCRIPTION,
    knowsAbout: ["Criação de conteúdo", "YouTube", "Jogos", "Inteligência artificial", "Automação", "Desenvolvimento web"],
    sameAs: [SITE.YT_LUDYLOPS_URL, SITE.YT_GAMES_URL, SITE.GH_URL, SITE.X_URL, SITE.TH_URL, SITE.DC_URL],
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
            <div style={{ ...LABEL_STYLE, marginBottom: 20 }}>Oi, eu sou a Ludmila</div>
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
                Eu <GlitchVerb words={["crio", "desenvolvo", "automatizo", "jogo"]} />
              </span>
              <span style={{ display: "block" }}>coisas.</span>
            </h1>
          </div>

          <div className="home-intro" style={{ marginTop: 40, maxWidth: 540 }}>
            <p style={{ margin: 0, fontSize: 19, lineHeight: 1.5 }}>
              Crio vídeos sobre jogos no YouTube e construo ferramentas com IA e automação para
              quem, como eu, vive de criar.
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

      {/* MAIN AREAS: the two things I do, then the blog */}
      <section className="home-pillars">
        {[
          {
            title: "Crio.",
            links: [
              {
                href: "/youtube",
                title: "YouTube",
                description: "Vídeos editados no Ludylops. Campanhas e lives no LudylopsGames.",
                meta: `2 canais · +${CHANNEL_STATS.liveHours} h de live`,
              },
            ],
          },
          {
            title: "Construo.",
            links: [
              {
                href: "/servicos",
                title: "Serviços",
                description:
                  "Automação, IA e sistemas sob medida pra quem cria. Menos trabalho chato, mais tempo criando.",
                meta: "automação · IA · sites",
              },
              {
                href: "/build",
                title: "Projetos",
                description: "Ferramentas open source para a minha live, e algumas para todo mundo.",
                meta: `${PROJECTS.length} projetos · open source`,
              },
            ],
          },
        ].map((pillar) => (
          <div className="home-pillar" key={pillar.title}>
            <h2 className="home-pillar-title">{pillar.title}</h2>
            <div className="home-pillar-links">
              {pillar.links.map((link) => (
                <Link className="home-pillar-link" key={link.href} href={link.href}>
                  <span className="home-pillar-link-title">{link.title}</span>
                  <span className="home-pillar-link-description">{link.description}</span>
                  <span className="home-pillar-link-meta">
                    {link.meta} <span aria-hidden>→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}

        <Link className="home-pillar home-pillar--minor" href="/blog">
          <span className="home-pillar-title">Blog.</span>
          <span className="home-pillar-link">
            <span className="home-pillar-link-description">Textos sobre tech, jogos, IA e experimentos.</span>
            <span className="home-pillar-link-meta">
              {postCount} textos <span aria-hidden>→</span>
            </span>
          </span>
        </Link>
      </section>

    </main>
  );
}
