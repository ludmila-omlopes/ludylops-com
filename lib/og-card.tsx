import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/jpeg";

// Copy reuses the home index and page headlines, so share cards match the site.
export const OG_AREAS = {
  youtube: {
    path: "/youtube",
    title: "YouTube.",
    text: "Vídeos editados no Ludylops. Campanhas e lives no LudylopsGames.",
  },
  servicos: {
    path: "/servicos",
    title: "Você cria. Eu automatizo o resto.",
    text: "Automação, IA e sistemas sob medida pra quem cria.",
  },
  build: {
    path: "/build",
    title: "Projetos.",
    text: "Ferramentas open source para a minha live, e algumas para todo mundo.",
  },
  agora: {
    path: "/agora",
    title: "Agora.",
    text: "O que estou jogando, gravando e construindo neste momento.",
  },
  blog: {
    path: "/blog",
    title: "Blog.",
    text: "Textos sobre tech, jogos, IA e experimentos.",
  },
} as const;

export type OgArea = keyof typeof OG_AREAS;

export function ogAlt(area: OgArea): string {
  return `Ludmila: ${OG_AREAS[area].title} ${OG_AREAS[area].text}`;
}

async function loadGoogleFont(family: string, weight: number, text: string): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const source = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];

  if (!source) {
    throw new Error(`No font file for ${family} ${weight}`);
  }

  return (await fetch(source)).arrayBuffer();
}

export async function renderAreaCard(area: OgArea): Promise<Response> {
  const { path: areaPath, title, text } = OG_AREAS[area];
  const footer = `ludylops.com${areaPath}`;
  const isLongTitle = title.length > 12;
  const titleSize = isLongTitle ? 88 : 156;

  const photo = await readFile(path.join(process.cwd(), "public", "ludmila.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  // Without network at build time the card still renders, just in the default font.
  const fonts = await Promise.all([
    loadGoogleFont("Space+Grotesk", 700, title).then((data) => ({
      name: "Space Grotesk",
      data,
      weight: 700 as const,
    })),
    loadGoogleFont("Inter", 500, `Ludmila${text}${footer}`).then((data) => ({
      name: "Inter",
      data,
      weight: 500 as const,
    })),
  ]).catch((error) => {
    console.warn("OG card fonts unavailable, using default font", error);
    return undefined;
  });

  const png = await new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#000",
          color: "#fff",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 64px 56px 72px",
          }}
        >
          <div style={{ fontSize: 22, letterSpacing: 4, textTransform: "uppercase", opacity: 0.55 }}>
            Ludmila
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontFamily: "Space Grotesk",
                fontWeight: 700,
                fontSize: titleSize,
                lineHeight: 0.95,
                letterSpacing: -titleSize * 0.045,
              }}
            >
              {title}
            </div>
            <div style={{ marginTop: 28, fontSize: 30, lineHeight: 1.35, maxWidth: 600 }}>{text}</div>
          </div>
          <div style={{ fontSize: 24, opacity: 0.6 }}>{footer}</div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photoSrc} alt="" width={420} height={630} style={{ objectFit: "cover" }} />
      </div>
    ),
    { ...OG_SIZE, fonts },
  ).arrayBuffer();

  // As PNG the photo pushes the card to ~600 KB, and WhatsApp drops previews that heavy.
  const jpeg = await sharp(Buffer.from(png)).jpeg({ quality: 85, mozjpeg: true }).toBuffer();

  return new Response(new Uint8Array(jpeg), { headers: { "content-type": OG_CONTENT_TYPE } });
}
