import { SITE } from "@/lib/site";

const STREAMS_URL = `${SITE.YT_URL}/streams`;
const SHORTS_URL = `${SITE.YT_URL}/shorts`;

export type YoutubeVod = {
  label: string;
  videoId: string;
  title: string;
  game: string;
  published: string;
  duration: string;
  url: string;
  thumbnailUrl: string;
};

export type YoutubeShort = {
  label: string;
  videoId: string;
  title: string;
  views: string;
  url: string;
  thumbnailUrl: string;
};

function youtubeThumbnail(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hq720.jpg`;
}

const FALLBACK_VODS: YoutubeVod[] = [
  {
    label: "01",
    videoId: "0qCMko_SwpE",
    title: "Sera que e tudo isso mesmo? O INICIO | Clair Obscure: Expedition 33",
    game: "Clair Obscure: Expedition 33",
    published: "ha 1 dia",
    duration: "2:37:50",
    url: "https://www.youtube.com/watch?v=0qCMko_SwpE",
    thumbnailUrl: youtubeThumbnail("0qCMko_SwpE"),
  },
  {
    label: "02",
    videoId: "_5Szqwevsho",
    title: "FIM | Silksong #71",
    game: "Silksong",
    published: "ha 3 dias",
    duration: "1:56:39",
    url: "https://www.youtube.com/watch?v=_5Szqwevsho",
    thumbnailUrl: youtubeThumbnail("_5Szqwevsho"),
  },
  {
    label: "03",
    videoId: "JHvmhk3T2eY",
    title: "A ULTIMA luta (HOJE NA CORRERIA) | Silksong #70",
    game: "Silksong",
    published: "ha 8 dias",
    duration: "1:30:17",
    url: "https://www.youtube.com/watch?v=JHvmhk3T2eY",
    thumbnailUrl: youtubeThumbnail("JHvmhk3T2eY"),
  },
  {
    label: "04",
    videoId: "ZJI-18NUM0s",
    title: "A ULTIMA luta | Silksong #69",
    game: "Silksong",
    published: "ha 10 dias",
    duration: "2:10:55",
    url: "https://www.youtube.com/watch?v=ZJI-18NUM0s",
    thumbnailUrl: youtubeThumbnail("ZJI-18NUM0s"),
  },
  {
    label: "05",
    videoId: "OpnCumQJ6DI",
    title: "A ULTIMA missao | Silksong #68",
    game: "Silksong",
    published: "ha 2 semanas",
    duration: "1:57:35",
    url: "https://www.youtube.com/watch?v=OpnCumQJ6DI",
    thumbnailUrl: youtubeThumbnail("OpnCumQJ6DI"),
  },
];

const FALLBACK_SHORTS: YoutubeShort[] = [];

function readText(value: unknown): string {
  if (!value || typeof value !== "object") {
    return "";
  }

  if ("content" in value && typeof value.content === "string") {
    return value.content;
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

function bestThumbnail(thumbnails: unknown, videoId: string): string {
  if (Array.isArray(thumbnails) && thumbnails.length > 0) {
    const sorted = [...thumbnails].sort((a, b) => {
      const aSize = typeof a === "object" && a && "height" in a && typeof a.height === "number" ? a.height : 0;
      const bSize = typeof b === "object" && b && "height" in b && typeof b.height === "number" ? b.height : 0;
      return bSize - aSize;
    });
    const url = sorted.find((item) => item && typeof item === "object" && "url" in item)?.url;

    if (typeof url === "string") {
      return url;
    }
  }

  return youtubeThumbnail(videoId);
}

function walk(value: unknown, visit: (value: any) => void) {
  if (!value || typeof value !== "object") {
    return;
  }

  visit(value);

  if (Array.isArray(value)) {
    value.forEach((item) => walk(item, visit));
    return;
  }

  Object.values(value).forEach((item) => walk(item, visit));
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
        videoId: video.videoId,
        title,
        game: extractGame(title),
        published: normalizePublished(readText(video.publishedTimeText)),
        duration: readText(video.lengthText),
        url: `https://www.youtube.com/watch?v=${video.videoId}`,
        thumbnailUrl: youtubeThumbnail(video.videoId),
      };
    });
}

function parseYoutubeShorts(data: unknown, limit: number): YoutubeShort[] {
  const shorts = new Map<string, Omit<YoutubeShort, "label">>();

  walk(data, (node) => {
    const reel = node?.reelItemRenderer;
    if (reel?.videoId && !shorts.has(reel.videoId)) {
      shorts.set(reel.videoId, {
        videoId: reel.videoId,
        title: readText(reel.headline) || "Short do canal",
        views: readText(reel.viewCountText),
        url: `https://www.youtube.com/shorts/${reel.videoId}`,
        thumbnailUrl: bestThumbnail(reel.thumbnail?.thumbnails, reel.videoId),
      });
    }

    const lockup = node?.shortsLockupViewModel;
    const lockupVideoId =
      lockup?.onTap?.innertubeCommand?.reelWatchEndpoint?.videoId ??
      lockup?.inlinePlayerData?.onVisible?.innertubeCommand?.watchEndpoint?.videoId;

    if (lockupVideoId && !shorts.has(lockupVideoId)) {
      shorts.set(lockupVideoId, {
        videoId: lockupVideoId,
        title: readText(lockup.overlayMetadata?.primaryText) || "Short do canal",
        views: readText(lockup.overlayMetadata?.secondaryText),
        url: `https://www.youtube.com/shorts/${lockupVideoId}`,
        thumbnailUrl: bestThumbnail(lockup.thumbnail?.sources, lockupVideoId),
      });
    }
  });

  return Array.from(shorts.values())
    .slice(0, limit)
    .map((short, index) => ({
      ...short,
      label: String(index + 1).padStart(2, "0"),
    }));
}

async function fetchYoutubeInitialData(url: string): Promise<unknown> {
  const response = await fetch(url, {
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

  return extractInitialData(await response.text());
}

export async function getLatestYoutubeVods(limit = 5): Promise<YoutubeVod[]> {
  try {
    const vods = parseYoutubeVods(await fetchYoutubeInitialData(STREAMS_URL), limit);

    if (vods.length > 0) {
      return vods;
    }
  } catch (error) {
    console.error("Failed to fetch latest YouTube VODs", error);
  }

  return FALLBACK_VODS.slice(0, limit);
}

export async function getLatestYoutubeShorts(limit = 4): Promise<YoutubeShort[]> {
  try {
    const shorts = parseYoutubeShorts(await fetchYoutubeInitialData(SHORTS_URL), limit);

    if (shorts.length > 0) {
      return shorts;
    }
  } catch (error) {
    console.error("Failed to fetch latest YouTube Shorts", error);
  }

  return FALLBACK_SHORTS.slice(0, limit);
}
