import { SITE } from "@/lib/site";

const STREAMS_URL = `${SITE.YT_GAMES_URL}/streams`;
const VIDEOS_URL = `${SITE.YT_LUDYLOPS_URL}/videos`;
const SHORTS_URL = `${SITE.YT_GAMES_URL}/shorts`;

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

export type YoutubeVideo = {
  videoId: string;
  title: string;
  views: string;
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

// Joins the non-empty bits of a meta line, e.g. views and date, with a middle dot.
export function metaLine(...parts: string[]): string {
  return parts.filter(Boolean).join(" · ");
}

function youtubeThumbnail(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hq720.jpg`;
}

function fallbackVod(label: string, videoId: string, title: string, duration: string): YoutubeVod {
  return {
    label,
    videoId,
    title,
    game: extractGame(title),
    // A frozen "há 2 dias" goes stale, so fallback entries carry no date.
    published: "",
    duration,
    url: `https://www.youtube.com/watch?v=${videoId}`,
    thumbnailUrl: youtubeThumbnail(videoId),
  };
}

// Only used when the live fetch fails. Refresh it now and then from the channel.
const FALLBACK_VODS: YoutubeVod[] = [
  fallbackVod("01", "WIvJRGrcNCQ", "Vamos passear mais em Caelid | Elden Ring #20", "2:36:12"),
  fallbackVod("02", "fRlZcwwfRGU", "Explorando Caelid | Elden Ring #19", "2:28:30"),
  fallbackVod("03", "zZEGdG4eTSg", "O chat votou, eu vou jogar Doki Doki Literature Club | PIPETZ GAMES #4", "4:17:40"),
  fallbackVod("04", "sT5uqdBu8Vw", "Tentando não enlouquecer | Elden Ring #18", "2:34:49"),
  fallbackVod("05", "5mNmwaKJ_WA", "Mais desafio em Liurnia dos Lagos | Elden Ring #17", "2:29:47"),
  fallbackVod("06", "sq73uFSI_bA", "Explorando mais a Academia Raya Lucaria | Elden Ring #16", "2:35:53"),
  fallbackVod("07", "z9e4sfBLrtc", "Explorando mais a Academia Raya Lucaria | Elden Ring #15", "2:42:43"),
];

function fallbackVideo(videoId: string, title: string, duration: string): YoutubeVideo {
  return {
    videoId,
    title,
    // Views and dates go stale, so fallback entries leave them out.
    views: "",
    published: "",
    duration,
    url: `https://www.youtube.com/watch?v=${videoId}`,
    thumbnailUrl: youtubeThumbnail(videoId),
  };
}

const FALLBACK_VIDEOS: YoutubeVideo[] = [
  fallbackVideo("EsQ6xIaUh8s", "Jogar mudou meu jeito de pensar?", "22:34"),
  fallbackVideo("_hNo9fiVNug", "Realismo não basta: o que Zelda ainda ensina aos jogos modernos", "26:21"),
  fallbackVideo("Bp-gSlqD-wQ", "14 hábitos que estão estragando sua experiência com jogos", "23:38"),
  fallbackVideo("-GbvcemGErs", "Como os jogos transformam solidão em conforto?", "21:10"),
  fallbackVideo("4P_mpqEJ-GI", "Cozy games não funcionam pra mim", "26:06"),
  fallbackVideo("4P_GnlKl1-Q", "Por que perder deixa alguns jogos melhores?", "32:25"),
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

type GridVideo = {
  videoId: string;
  title: string;
  views: string;
  published: string;
  duration: string;
  membersOnly: boolean;
};

// Live and upcoming streams carry a badge like "AO VIVO" instead of a length.
const DURATION_PATTERN = /^\d+(?::\d{2})+$/;

function fromVideoRenderer(video: any): GridVideo | null {
  if (!video?.videoId) {
    return null;
  }

  return {
    videoId: video.videoId,
    title: readText(video.title).trim(),
    views: readText(video.shortViewCountText) || readText(video.viewCountText),
    published: readText(video.publishedTimeText),
    duration: readText(video.lengthText),
    membersOnly: (video.badges ?? []).some(
      (badge: any) => badge?.metadataBadgeRenderer?.style === "BADGE_STYLE_TYPE_MEMBERS_ONLY",
    ),
  };
}

// Channel grids now use lockupViewModel; videoRenderer is kept as a fallback shape.
function fromLockup(lockup: any): GridVideo | null {
  if (lockup?.contentType !== "LOCKUP_CONTENT_TYPE_VIDEO" || !lockup.contentId) {
    return null;
  }

  const metadata = lockup.metadata?.lockupMetadataViewModel;
  const rows: any[] = metadata?.metadata?.contentMetadataViewModel?.metadataRows ?? [];
  const parts: any[] = rows.flatMap((row) => row?.metadataParts ?? []);
  // The views part is the one labelled "N visualizações"; it is missing when views are hidden.
  const viewsPart = parts.find((part) => /visualiza|views?\b/i.test(part?.accessibilityLabel ?? ""));
  const overlays: any[] = lockup.contentImage?.thumbnailViewModel?.overlays ?? [];
  const badgeTexts = overlays
    .flatMap((overlay) => overlay?.thumbnailBottomOverlayViewModel?.badges ?? [])
    .map((badge) => badge?.thumbnailBadgeViewModel?.text);

  return {
    videoId: lockup.contentId,
    title: readText(metadata?.title).trim(),
    views: viewsPart?.accessibilityLabel ?? "",
    // The date is always the last part, after views (and channel names on collabs).
    published: readText(parts.at(-1)?.text),
    duration: badgeTexts.find((text) => typeof text === "string" && DURATION_PATTERN.test(text)) ?? "",
    membersOnly: rows
      .flatMap((row) => row?.badges ?? [])
      .some((badge) => badge?.badgeViewModel?.badgeStyle === "BADGE_MEMBERS_ONLY"),
  };
}

function parseGridVideos(data: any, limit: number): GridVideo[] {
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
    .map((item) => {
      const content = item?.richItemRenderer?.content;
      return fromLockup(content?.lockupViewModel) ?? fromVideoRenderer(content?.videoRenderer);
    })
    .filter((video): video is GridVideo => Boolean(video))
    .filter((video) => DURATION_PATTERN.test(video.duration) && !video.membersOnly)
    .slice(0, limit);
}

function parseYoutubeVods(data: unknown, limit: number): YoutubeVod[] {
  return parseGridVideos(data, limit).map((video, index) => ({
    label: String(index + 1).padStart(2, "0"),
    videoId: video.videoId,
    title: video.title,
    game: extractGame(video.title),
    published: normalizePublished(video.published),
    duration: video.duration,
    url: `https://www.youtube.com/watch?v=${video.videoId}`,
    thumbnailUrl: youtubeThumbnail(video.videoId),
  }));
}

function parseYoutubeVideos(data: unknown, limit: number): YoutubeVideo[] {
  return parseGridVideos(data, limit).map((video) => ({
    videoId: video.videoId,
    title: video.title,
    views: video.views,
    published: video.published,
    duration: video.duration,
    url: `https://www.youtube.com/watch?v=${video.videoId}`,
    thumbnailUrl: youtubeThumbnail(video.videoId),
  }));
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

    // An empty parse usually means YouTube changed its markup again.
    console.warn("YouTube VOD parser found no videos, serving fallback VODs");
  } catch (error) {
    console.error("Failed to fetch latest YouTube VODs", error);
  }

  return FALLBACK_VODS.slice(0, limit);
}

// Edited videos from the main channel; members-only uploads are skipped.
export async function getLatestYoutubeVideos(limit = 6): Promise<YoutubeVideo[]> {
  try {
    const videos = parseYoutubeVideos(await fetchYoutubeInitialData(VIDEOS_URL), limit);

    if (videos.length > 0) {
      return videos;
    }

    console.warn("YouTube video parser found no videos, serving fallback videos");
  } catch (error) {
    console.error("Failed to fetch latest YouTube videos", error);
  }

  return FALLBACK_VIDEOS.slice(0, limit);
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
