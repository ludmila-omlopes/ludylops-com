import type { Metadata } from "next";
import { Space_Grotesk, Inter, Fraunces } from "next/font/google";
import { TopMenu } from "@/components/TopMenu";
import { Footer } from "@/components/Footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ludmila — Eu crio, jogo e quebro coisas.",
  description:
    "Streamer, criadora e inventeira. Em São Paulo. Ao vivo no YouTube, desenvolvendo o ludylops.live e mexendo com portáteis, impressões 3D e projetos com Raspberry Pi.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${inter.variable} ${fraunces.variable}`}
    >
      <body>
        <TopMenu />
        {children}
        <Footer />
      </body>
    </html>
  );
}
