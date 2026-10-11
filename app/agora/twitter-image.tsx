import { OG_CONTENT_TYPE, OG_SIZE, ogAlt, renderAreaCard } from "@/lib/og-card";

export const alt = ogAlt("agora");
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderAreaCard("agora");
}
