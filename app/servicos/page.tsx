import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { ProjectList } from "@/components/ProjectList";
import { SERVICE_PROJECTS } from "@/lib/projects";
import { SITE } from "@/lib/site";

const SERVICES_DESCRIPTION =
  "Automação, IA, sites e sistemas sob medida para criadores, artistas e pequenos negócios criativos ganharem tempo para criar.";

export const metadata: Metadata = {
  title: "Automação e IA para quem cria",
  description: SERVICES_DESCRIPTION,
  alternates: {
    canonical: "/servicos",
  },
  openGraph: {
    type: "website",
    url: "/servicos",
    title: "Automação e IA para quem cria | Ludmila",
    description: SERVICES_DESCRIPTION,
  },
};

const DISPLAY = { fontFamily: "var(--font-display)" } as const;

const HELP_GROUPS = [
  {
    title: "Conteúdo e publicação",
    audience: "Para quem produz vídeo, newsletter, podcast, curso ou redes sociais.",
    examples: [
      "Um vídeo longo vira cortes, descrição, capítulos e posts, de uma vez.",
      "Publicação e agendamento em várias plataformas sem copiar e colar.",
      "Transcrições que viram material novo em vez de dormir no drive.",
    ],
  },
  {
    title: "Edição e produção",
    audience: "Para editores, estúdios pequenos e profissionais de audiovisual.",
    examples: [
      "Timeline editável gerada a partir da transcrição do vídeo.",
      "Organização automática de arquivos, versões e backups.",
      "Rotinas de exportação e entrega que rodam sozinhas.",
    ],
  },
  {
    title: "Arte, artesanato e produtos autorais",
    audience: "Para artistas, ilustradores, artesãos e pequenos ateliês.",
    examples: [
      "Controle de encomendas, prazos e orçamentos sem planilha manual.",
      "Catálogo ou loja própria, do jeito que o seu trabalho merece.",
      "Follow-up de clientes que não depende de você lembrar.",
    ],
  },
  {
    title: "Comunidades e experiências digitais",
    audience: "Para streamers, criadores com comunidade, cursos e projetos independentes.",
    examples: [
      "Bots de Discord e integrações com OBS e Streamer.bot.",
      "Overlays e interações de live sob medida.",
      "Área de membros, inscrições e avisos automáticos.",
    ],
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
    description: "Desenvolvimento de um site, automação, integração ou sistema específico para o processo.",
  },
  {
    title: "Acompanhamento técnico",
    description: "Melhorias contínuas para criadores ou equipes pequenas que precisam de apoio técnico recorrente.",
  },
] as const;

function FormatMark() {
  return (
    <svg className="services-format-mark" viewBox="0 0 24 24" aria-hidden>
      <path d="M4 3v18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M11 6v12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M18 9v6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export default function ServicesPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Automação e IA para negócios criativos",
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
      "Sites e sistemas web sob medida",
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
              Você cria. Eu automatizo o resto.
            </h1>
          </div>
          <div className="services-hero-copy">
            <p>
              Sou desenvolvedora e trabalho com quem vive de criar: artistas, editores, streamers,
              quem escreve, quem ensina. Uso automação e IA para tirar do seu caminho o trabalho
              repetitivo que rouba tempo de criação.
            </p>
            <p className="services-note">
              E quando a ferramenta que você precisa não existe, eu construo: sites, sistemas web e
              ferramentas internas sob medida para o seu jeito de trabalhar.
            </p>
          </div>
        </div>
      </section>

      <section className="services-section services-process" aria-labelledby="services-process-title">
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

      <section className="services-section" aria-labelledby="services-help-title">
        <div className="services-section-heading">
          <h2 id="services-help-title" style={{ ...DISPLAY }}>
            O trabalho chato tem nome, e dá pra automatizar.
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
                <ul className="services-help-examples">
                  {group.examples.map((example) => (
                    <li key={example}>{example}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="services-section" aria-labelledby="services-work-title">
        <div className="services-section-heading">
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
          <div>
            <h2 id="services-projects-title" style={{ ...DISPLAY }}>
              Ferramentas que nasceram de problemas reais.
            </h2>
            <p className="services-section-intro">
              Projetos que nasceram do meu próprio fluxo de trabalho, o mesmo tipo de problema que
              eu resolvo para outras pessoas.
            </p>
          </div>
        </div>
        <ProjectList
          projects={SERVICE_PROJECTS.map((project) => ({
            ...project,
            description: project.serviceStory ?? project.description,
          }))}
          ariaLabel="Projetos relacionados a serviços"
        />
      </section>

      <section className="services-section services-contact" aria-labelledby="services-contact-title">
        <h2 id="services-contact-title" style={{ ...DISPLAY }}>
          Me conte o que está roubando seu tempo de criar.
        </h2>
        <div className="services-contact-copy">
          <p>
            Você não precisa chegar com a solução pronta. Me conte como o trabalho funciona hoje e
            onde ele começou a pesar. A primeira conversa é só uma conversa.
          </p>
          <a className="services-email-link" href="mailto:contato@ludylops.com.br">
            contato@ludylops.com.br
          </a>
        </div>
      </section>
    </main>
  );
}
