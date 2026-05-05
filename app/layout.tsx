import type { Metadata } from "next";
import { Space_Grotesk, Inter, Fraunces } from "next/font/google";
import { TopMenu } from "@/components/TopMenu";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/site";
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
  metadataBase: new URL(SITE.URL),
  title: {
    default: "Ludmila | Dev, streamer e criadora open source",
    template: "%s | Ludmila",
  },
  description: SITE.DESCRIPTION,
  applicationName: SITE.NAME,
  authors: [{ name: SITE.NAME, url: SITE.URL }],
  creator: SITE.NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE.URL,
    siteName: SITE.NAME,
    title: "Ludmila | Dev, streamer e criadora open source",
    description: SITE.DESCRIPTION,
    images: [
      {
        url: "/ludpfp.jpg",
        width: 1200,
        height: 1200,
        alt: "Ludmila",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ludmila | Dev, streamer e criadora open source",
    description: SITE.DESCRIPTION,
    images: ["/ludpfp.jpg"],
    creator: "@ludylops",
  },
  robots: {
    index: true,
    follow: true,
  },
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
