import type { Project } from "@/lib/projects";

type ProjectListProps = {
  projects: readonly Project[];
  ariaLabel?: string;
};

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function ProjectList({ projects, ariaLabel }: ProjectListProps) {
  const fg = "var(--fg)";

  return (
    <div className="project-list" aria-label={ariaLabel} style={{ borderTop: `1px solid ${fg}` }}>
      {projects.map((project) => {
        const isExternal = isExternalHref(project.href);

        return (
          <a
            className="project-row"
            key={project.href}
            href={project.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer" : undefined}
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
              {project.title}
            </span>
            <span className="project-description" style={{ fontSize: 15, opacity: 0.75 }}>
              {project.description}
            </span>
            <span style={{ textAlign: "right", fontSize: 22 }} aria-hidden>
              {isExternal ? "↗" : "→"}
            </span>
          </a>
        );
      })}
    </div>
  );
}
