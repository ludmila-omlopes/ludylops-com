import type { ReactNode } from "react";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { ProjectList } from "@/components/ProjectList";
import { SERVICE_PROJECTS } from "@/lib/projects";
import { SITE } from "@/lib/site";

const SERVICES_DESCRIPTION =
  "Consultoria em IA, automações, integrações e ferramentas internas para criadores, artistas e pequenos negócios criativos.";

export const metadata: Metadata = {
  title: "Tecnologia para negócios criativos",
  description: SERVICES_DESCRIPTION,
  alternates: {
    canonical: "/servicos",
  },
  openGraph: {
    type: "website",
    url: "/servicos",
    title: "Tecnologia para negócios criativos | Ludmila",
    description: SERVICES_DESCRIPTION,
  },
};

const LABEL_STYLE = {
  fontSize: 13,
  textTransform: "uppercase" as const,
  letterSpacing: ".18em",
  opacity: 0.55,
  fontWeight: 500,
};

const DISPLAY = { fontFamily: "var(--font-display)" } as const;

const HELP_GROUPS = [
  {
    title: "Conteúdo e publicação",
    audience: "Para produtores de vídeo, newsletters, podcasts, cursos e redes sociais.",
    visual: "signal",
  },
  {
    title: "Edição e produção",
    audience: "Para editores, estúdios pequenos e profissionais de audiovisual.",
    visual: "timeline",
  },
  {
    title: "Arte, artesanato e produtos autorais",
    audience: "Para artistas, ilustradores, artesãos e pequenos ateliês.",
    visual: "rings",
  },
  {
    title: "Comunidades e experiências digitais",
    audience: "Para streamers, criadores com comunidades, cursos e projetos independentes.",
    visual: "nodes",
  },
] as const;

const WORK_FORMATS = [
  {
    title: "Diagnóstico",
    description: "Análise do processo atual, das ferramentas envolvidas e dos principais pontos de atrito.",
    details:
      "Pode incluir mapa do fluxo, problemas identificados, oportunidades de automação, riscos e próximos passos.",
  },
  {
    title: "Protótipo",
    description: "Primeira versão funcional para testar uma ideia antes de uma implementação maior.",
  },
  {
    title: "Projeto sob medida",
    description: "Desenvolvimento de uma automação, integração ou ferramenta específica para o processo.",
  },
  {
    title: "Acompanhamento técnico",
    description: "Melhorias contínuas para criadores ou equipes pequenas que precisam de apoio técnico recorrente.",
  },
] as const;

function SectionMark() {
  return (
    <svg className="services-section-mark" viewBox="0 0 28 12" aria-hidden>
      <path d="M6 1H1v10h5" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M22 1h5v10h-5" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M11 6h6" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function FormatMark() {
  return (
    <svg className="services-format-mark" viewBox="0 0 24 24" aria-hidden>
      <path d="M4 3v18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M11 6v12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M18 9v6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="services-eyebrow" style={LABEL_STYLE}>
      <SectionMark />
      <span>{children}</span>
    </div>
  );
}

function HelpVisual({ kind }: { kind: (typeof HELP_GROUPS)[number]["visual"] }) {
  if (kind === "signal") {
    return (
      <svg className="services-help-visual" viewBox="0 0 160 96" aria-hidden>
        <circle cx="36" cy="48" r="10" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="80" cy="48" r="18" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="126" cy="48" r="28" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.34" />
        <path d="M18 48h8M52 48h10M100 48h12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    );
  }

  if (kind === "timeline") {
    return (
      <svg className="services-help-visual" viewBox="0 0 160 96" aria-hidden>
        <path d="M24 70V26M56 58V22M88 64V16M120 46V28M136 70V36" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M16 78h128" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      </svg>
    );
  }

  if (kind === "rings") {
    return (
      <svg className="services-help-visual" viewBox="0 0 160 96" aria-hidden>
        <circle cx="58" cy="48" r="30" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="58" cy="48" r="18" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="58" cy="48" r="8" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <ellipse cx="116" cy="34" rx="24" ry="10" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <ellipse cx="116" cy="50" rx="18" ry="8" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <ellipse cx="116" cy="64" rx="10" ry="5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  }

  return (
    <svg className="services-help-visual" viewBox="0 0 160 96" aria-hidden>
      <circle cx="30" cy="64" r="5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="54" cy="56" r="8" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="84" cy="46" r="12" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="122" cy="34" r="18" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.4" />
      <path d="M35 62l13-4 25-8 31-9" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export default function ServicesPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Tecnologia para negócios criativos",
    description: SERVICES_DESCRIPTION,
    url: `${SITE.URL}/servicos`,
    provider: {
      "@type": "Person",
      name: SITE.NAME,
      url: SITE.URL,
    },
    serviceType: [
      "Consultoria em inteligência artificial",
      "Automações",
      "Integrações entre ferramentas",
      "Ferramentas internas",
      "Protótipos e sistemas personalizados",
    ],
    audience: {
      "@type": "Audience",
      audienceType:
        "Criadores, artistas, streamers, educadores independentes, newsletters, podcasts e pequenos negócios criativos",
    },
  };

  return (
    <main className="services-page">
      <JsonLd data={serviceJsonLd} />

      <section className="services-hero simple-hero">
        <div className="services-hero-grid">
          <div className="services-title-wrap">
            <span className="services-hero-mark" aria-hidden>
              <FormatMark />
            </span>
            <h1 className="services-title simple-title" style={{ ...DISPLAY }}>
              Tecnologia para negócios criativos
            </h1>
          </div>
          <div className="services-hero-copy">
            <p>
              Eu ajudo criadores, artistas e pequenos negócios a organizar processos, automatizar
              tarefas e construir ferramentas adaptadas ao jeito real de trabalhar.
            </p>
            <p className="services-note">
              Pode começar me mostrando onde a operação está travando: publicação, edição,
              encomendas, comunidade, arquivos, integrações ou uma ferramenta que está faltando.
            </p>
          </div>
        </div>
      </section>

      <section className="services-section" aria-labelledby="services-help-title">
        <div className="services-section-heading">
          <SectionEyebrow>Onde posso ajudar</SectionEyebrow>
          <h2 id="services-help-title" style={{ ...DISPLAY }}>
            Veja onde seu trabalho se parece com isso.
          </h2>
        </div>
        <div className="services-row-list">
          {HELP_GROUPS.map((group, index) => (
            <article className="services-row" key={group.title}>
              <span className="services-row-number">{String(index + 1).padStart(2, "0")}</span>
              <div className="services-help-copy">
                <h3 style={{ ...DISPLAY }}>{group.title}</h3>
                <p>{group.audience}</p>
              </div>
              <div className="services-help-panel">
                <HelpVisual kind={group.visual} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="services-section services-contact" aria-labelledby="services-contact-title">
        <h2 id="services-contact-title" style={{ ...DISPLAY }}>
          Se você se reconheceu em algum desses fluxos, me escreve.
        </h2>
        <div className="services-contact-copy">
          <p>
            Você não precisa chegar com solução pronta. Me conte como esse processo funciona hoje
            e onde ele começou a pesar.
          </p>
          <a className="services-contact-link" href="mailto:contato@ludylops.com.br">
            Me conte como você trabalha
          </a>
          <a className="services-email-link" href="mailto:contato@ludylops.com.br">
            contato@ludylops.com.br
          </a>
        </div>
      </section>

      <section className="services-section" aria-labelledby="services-work-title">
        <div className="services-section-heading">
          <SectionEyebrow>Formas de trabalhar comigo</SectionEyebrow>
          <h2 id="services-work-title" style={{ ...DISPLAY }}>
            O formato depende do ponto em que o processo está.
          </h2>
        </div>
        <div className="services-row-list">
          {WORK_FORMATS.map((format, index) => (
            <article className="services-row services-format-row" key={format.title}>
              <span className="services-row-number">{String(index + 1).padStart(2, "0")}</span>
              <div className="services-format-title">
                <FormatMark />
                <h3 style={{ ...DISPLAY }}>{format.title}</h3>
              </div>
              <div className="services-format-copy">
                <p>{format.description}</p>
                {"details" in format ? (
                  <p className="services-format-detail">{format.details}</p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="services-section" aria-labelledby="services-projects-title">
        <div className="services-section-heading">
          <SectionEyebrow>Projetos relacionados</SectionEyebrow>
          <div>
            <h2 id="services-projects-title" style={{ ...DISPLAY }}>
              Ferramentas que nasceram de problemas reais.
            </h2>
            <p className="services-section-intro">
              Projetos próprios que mostram o tipo de problema que eu costumo investigar e
              transformar em ferramenta.
            </p>
          </div>
        </div>
        <ProjectList projects={SERVICE_PROJECTS} ariaLabel="Projetos relacionados a serviços" />
      </section>

      <section className="services-section services-process" aria-labelledby="services-process-title">
        <SectionEyebrow>Como eu trabalho</SectionEyebrow>
        <div className="services-process-body">
          <h2 id="services-process-title" style={{ ...DISPLAY }}>
            Primeiro o trabalho, depois a ferramenta.
          </h2>
          <div className="services-process-copy">
            <p>
              Antes de escolher uma ferramenta, eu procuro entender o trabalho, as exceções do
              processo e o que acontece quando uma automação falha.
            </p>
            <p>
              A melhor solução pode envolver IA, uma integração simples, uma regra determinística
              ou uma pequena ferramenta interna. O foco é encaixe no uso real.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
