"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";

const ITEMS: Array<[string, string]> = [
  ["/youtube", "YouTube"],
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
