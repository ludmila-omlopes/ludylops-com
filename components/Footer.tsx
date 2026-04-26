import { SITE } from "@/lib/site";

export function Footer() {
  const linkStyle = {
    color: "var(--fg)",
    textDecoration: "underline",
    textUnderlineOffset: 4,
  } as const;

  return (
    <footer
      style={{
        borderTop: "1px solid var(--fg)",
        padding: "28px 40px 40px",
        display: "flex",
        justifyContent: "space-between",
        fontSize: 14,
        background: "var(--bg)",
        color: "var(--fg)",
      }}
    >
      <div style={{ display: "flex", gap: 20 }}>
        <a href={SITE.YT_URL} target="_blank" rel="noreferrer" style={linkStyle}>
          YouTube
        </a>
        <a href={SITE.GH_URL} target="_blank" rel="noreferrer" style={linkStyle}>
          GitHub
        </a>
        <a href={SITE.X_URL} target="_blank" rel="noreferrer" style={linkStyle}>
          X
        </a>
        <a href={SITE.TH_URL} target="_blank" rel="noreferrer" style={linkStyle}>
          Threads
        </a>
      </div>
      <div style={{ opacity: 0.6 }}>
        © 2026 Ludmila · código aberto · feito na teimosia &amp; no CSS
      </div>
    </footer>
  );
}
