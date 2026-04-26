import { SITE } from "@/lib/site";

const STREAMS_URL = `${SITE.YT_URL}/streams`;

export type YoutubeVod = {
  label: string;
  title: string;
  game: string;
  published: string;
  duration: string;
  url: string;
};

const FALLBACK_VODS: YoutubeVod[] = [
  {
    label: "01",
    title: "Será que é tudo isso mesmo? O INÍCIO | Clair Obscure: Expedition 33",
    game: "Clair Obscure: Expedition 33",
    published: "há 1 dia",
    duration: "2:37:50",
    url: "https://www.youtube.com/watch?v=0qCMko_SwpE",
  },
  {
    label: "02",
    title: "FIM | Silksong #71",
    game: "Silksong",
    published: "há 3 dias",
    duration: "1:56:39",
    url: "https://www.youtube.com/watch?v=_5Szqwevsho",
  },
  {
    label: "03",
    title: "A ÚLTIMA luta (HOJE NA CORRERIA) | Silksong #70",
    game: "Silksong",
    published: "há 8 dias",
    duration: "1:30:17",
    url: "https://www.youtube.com/watch?v=JHvmhk3T2eY",
  },
  {
    label: "04",
    title: "A ÚLTIMA luta | Silksong #69",
    game: "Silksong",
    published: "há 10 dias",
    duration: "2:10:55",
    url: "https://www.youtube.com/watch?v=ZJI-18NUM0s",
  },
  {
    label: "05",
    title: "A ÚLTIMA missão | Silksong #68",
    game: "Silksong",
    published: "há 2 semanas",
    duration: "1:57:35",
    url: "https://www.youtube.com/watch?v=OpnCumQJ6DI",
  },
];

function readText(value: unknown): string {
  if (!value || typeof value !== "object") {
    return "";
  }

  if ("simpleText" in value && typeof value.simpleText === "string") {
    return value.simpleText;
  }

  if ("runs" in value && Array.isArray(value.runs)) {
    return value.runs
      .map((run) => (run && typeof run === "object" && "text" in run ? run.text : ""))
      .filter((text): text is string => typeof text === "string")
      .join("");
  }

  return "";
}

function extractInitialData(html: string): unknown {
  const marker = "var ytInitialData = ";
  const start = html.indexOf(marker);

  if (start === -1) {
    throw new Error("ytInitialData not found");
  }

  const jsonStart = start + marker.length;
  const jsonEnd = html.indexOf(";</script>", jsonStart);

  if (jsonEnd === -1) {
    throw new Error("ytInitialData closing tag not found");
  }

  return JSON.parse(html.slice(jsonStart, jsonEnd));
}

function extractGame(title: string): string {
  const fromPipe = title.split("|").at(-1)?.trim();
  const candidate = fromPipe && fromPipe !== title ? fromPipe : title;

  return candidate.replace(/\s+#\d+\s*$/u, "").trim();
}

function normalizePublished(value: string): string {
  return value.replace(/^Transmitido\s+/u, "").trim();
}

function parseYoutubeVods(data: any, limit: number): YoutubeVod[] {
  const tabs = data?.contents?.twoColumnBrowseResultsRenderer?.tabs;

  if (!Array.isArray(tabs)) {
    return [];
  }

  const selectedTab = tabs.find((tab) => tab?.tabRenderer?.selected)?.tabRenderer;
  const contents = selectedTab?.content?.richGridRenderer?.contents;

  if (!Array.isArray(contents)) {
    return [];
  }

  return contents
    .map((item) => item?.richItemRenderer?.content?.videoRenderer)
    .filter((video): video is any => Boolean(video?.videoId))
    .filter((video) => Boolean(readText(video.lengthText)))
    .slice(0, limit)
    .map((video, index) => {
      const title = readText(video.title).trim();

      return {
        label: String(index + 1).padStart(2, "0"),
        title,
        game: extractGame(title),
        published: normalizePublished(readText(video.publishedTimeText)),
        duration: readText(video.lengthText),
        url: `https://www.youtube.com/watch?v=${video.videoId}`,
      };
    });
}

export async function getLatestYoutubeVods(limit = 5): Promise<YoutubeVod[]> {
  try {
    const response = await fetch(STREAMS_URL, {
      headers: {
        "accept-language": "pt-BR,pt;q=0.9,en;q=0.8",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
      },
      next: { revalidate: 1800 },
    });

    if (!response.ok) {
      throw new Error(`YouTube request failed with ${response.status}`);
    }

    const html = await response.text();
    const vods = parseYoutubeVods(extractInitialData(html), limit);

    if (vods.length > 0) {
      return vods;
    }
  } catch (error) {
    console.error("Failed to fetch latest YouTube VODs", error);
  }

  return FALLBACK_VODS.slice(0, limit);
}
