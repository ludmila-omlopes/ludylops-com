"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";

const ITEMS: Array<[string, string]> = [
  ["/stream", "Lives"],
  ["/build", "Projetos"],
  ["/servicos", "Serviços"],
  ["/blog", "Blog"],
];

export function TopMenu() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header
      className="site-header"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        background: "var(--bg)",
        color: "var(--fg)",
        borderBottom: "1px solid var(--fg)",
        padding: "18px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: 15,
      }}
    >
      <Link
        className="site-brand"
        href="/"
        style={{
          color: "var(--fg)",
          fontWeight: 700,
          fontSize: 18,
          letterSpacing: "-0.02em",
          textDecoration: "none",
        }}
      >
        {isHome ? "Ludmila" : "← Ludmila"}
      </Link>

      <nav className="site-nav" style={{ display: "flex", gap: 24, alignItems: "center" }}>
        {ITEMS.map(([href, label]) => {
          const active = pathname === href;
          return (
            <Link
              className="site-nav-link"
              key={href}
              href={href}
              style={{
                color: "var(--fg)",
                fontSize: 15,
                textDecoration: active ? "underline" : "none",
                textUnderlineOffset: 5,
                textDecorationThickness: 1.5,
                opacity: active ? 1 : 0.75,
              }}
            >
              {label}
            </Link>
          );
        })}
        <a
          className="site-nav-link"
          href={SITE.YT_URL}
          target="_blank"
          rel="noreferrer"
          style={{
            color: "var(--fg)",
            textDecoration: "none",
            fontSize: 15,
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
          }}
        >
          <svg width="16" height="12" viewBox="0 0 20 14" fill="currentColor" aria-hidden>
            <path d="M19.6 2.2c-.2-.9-.9-1.6-1.8-1.8C16.2 0 10 0 10 0S3.8 0 2.2.4C1.3.6.6 1.3.4 2.2 0 3.8 0 7 0 7s0 3.2.4 4.8c.2.9.9 1.6 1.8 1.8 1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM8 10V4l5.2 3L8 10z" />
          </svg>
          YouTube
        </a>
        <a
          className="site-nav-link"
          href={SITE.GH_URL}
          target="_blank"
          rel="noreferrer"
          style={{ color: "var(--fg)", textDecoration: "none", fontSize: 15 }}
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}
