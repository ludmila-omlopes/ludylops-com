import type { ReactNode } from "react";
import Script from "next/script";

type MarkdownContentProps = {
  content: string;
};

type TweetData = {
  name?: string;
  handle?: string;
  avatar?: string;
  url?: string;
  date?: string;
  stats?: string;
  media?: string[];
  cardDomain?: string;
  cardTitle?: string;
  cardUrl?: string;
  text: string;
};

const defaultTweetAvatar = "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png";

function getYoutubeVideoId(value: string) {
  const markdownLink = value.match(/^\[([^\]]+)]\((https?:\/\/[^)]+)\)$/);
  const url = markdownLink?.[2] ?? value;

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsed.pathname === "/watch") {
        return parsed.searchParams.get("v");
      }

      const embedMatch = parsed.pathname.match(/^\/(?:embed|shorts)\/([^/?#]+)/);
      return embedMatch?.[1] ?? null;
    }

    if (host === "youtu.be") {
      return parsed.pathname.split("/").filter(Boolean)[0] ?? null;
    }
  } catch {
    return null;
  }

  return null;
}

function getThreadsPost(value: string) {
  const markdownLink = value.match(/^\[([^\]]+)]\((https?:\/\/[^)]+)\)$/);
  const url = markdownLink?.[2] ?? value;

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host !== "threads.com" && host !== "threads.net") {
      return null;
    }

    const postMatch = parsed.pathname.match(/^\/@[^/]+\/post\/([^/?#]+)/);
    const shortMatch = parsed.pathname.match(/^\/t\/([^/?#]+)/);
    const postId = postMatch?.[1] ?? shortMatch?.[1];

    if (!postId) {
      return null;
    }

    return {
      postId,
      permalink: `https://www.threads.com/t/${postId}?utm_source=th_embed&utm_campaign=threads_api`,
    };
  } catch {
    return null;
  }
}

function renderThreadsEmbed(markdown: string, key: string) {
  const post = getThreadsPost(markdown);

  if (!post) {
    return null;
  }

  return (
    <div key={key} style={{ display: "flex", justifyContent: "center", margin: "34px 0" }}>
      <blockquote
        className="text-post-media"
        data-text-post-permalink={post.permalink}
        data-text-post-version="0"
        data-theme="light"
        id={`ig-tp-${post.postId}`}
        style={{
          background: "#fff",
          border: "1px solid rgba(0, 0, 0, 0.15)",
          borderRadius: 16,
          maxWidth: 658,
          minWidth: 270,
          margin: 1,
          padding: 0,
          width: "calc(100% - 2px)",
        }}
      >
        <a
          href={post.permalink}
          target="_blank"
          rel="noreferrer"
          style={{
            background: "#fff",
            color: "#000",
            display: "block",
            fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
            lineHeight: 0,
            padding: 0,
            textAlign: "center",
            textDecoration: "none",
            width: "100%",
          }}
        >
          <span
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              padding: 40,
            }}
          >
            <svg aria-label="Threads" height="32" role="img" viewBox="0 0 192 192" width="32" xmlns="http://www.w3.org/2000/svg">
              <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848H97.4576C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" />
            </svg>
            <span style={{ color: "#000", fontSize: 15, fontWeight: 600, lineHeight: "21px", marginTop: 16 }}>View on Threads</span>
          </span>
        </a>
      </blockquote>
      <Script src="https://www.threads.com/embed.js" strategy="afterInteractive" />
    </div>
  );
}

function renderYoutubeEmbed(markdown: string, key: string) {
  const videoId = getYoutubeVideoId(markdown);

  if (!videoId) {
    return null;
  }

  return (
    <div
      key={key}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 9",
        margin: "34px 0",
        overflow: "hidden",
        border: "1px solid var(--fg)",
        background: "#000",
      }}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          border: 0,
        }}
      />
    </div>
  );
}

function renderInline(text: string) {
  const parts: ReactNode[] = [];
  const pattern = /(\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[([^\]]+)\]\(([^)]+)\))/g;
  let cursor = 0;
  let partIndex = 0;

  for (const match of text.matchAll(pattern)) {
    const matchIndex = match.index ?? 0;
    const token = match[0];

    if (matchIndex > cursor) {
      parts.push(text.slice(cursor, matchIndex));
    }

    if (match[2] && match[3]) {
      parts.push(
        <a key={`inline-${partIndex}`} href={match[3]} style={{ color: "inherit", textUnderlineOffset: 4 }}>
          {renderInline(match[2])}
        </a>,
      );
    } else if (token.startsWith("***") && token.endsWith("***")) {
      parts.push(
        <strong key={`inline-${partIndex}`}>
          <em>{renderInline(token.slice(3, -3))}</em>
        </strong>,
      );
    } else if (token.startsWith("**") && token.endsWith("**")) {
      parts.push(<strong key={`inline-${partIndex}`}>{renderInline(token.slice(2, -2))}</strong>);
    } else if (token.startsWith("*") && token.endsWith("*")) {
      parts.push(<em key={`inline-${partIndex}`}>{renderInline(token.slice(1, -1))}</em>);
    } else if (token.startsWith("`") && token.endsWith("`")) {
      parts.push(
        <code
          key={`inline-${partIndex}`}
          style={{
            padding: "2px 6px",
            border: "1px solid currentColor",
            fontSize: "0.88em",
          }}
        >
          {token.slice(1, -1)}
        </code>,
      );
    }

    cursor = matchIndex + token.length;
    partIndex += 1;
  }

  if (cursor < text.length) {
    parts.push(text.slice(cursor));
  }

  return parts.length > 0 ? parts : text;
}

function renderTweetText(text: string) {
  const parts: ReactNode[] = [];
  const pattern = /(@[A-Za-z0-9_]+|#[A-Za-z0-9_]+)/g;
  let cursor = 0;
  let partIndex = 0;

  for (const match of text.matchAll(pattern)) {
    const matchIndex = match.index ?? 0;
    const token = match[0];

    if (matchIndex > cursor) {
      parts.push(text.slice(cursor, matchIndex));
    }

    parts.push(
      <span key={`tweet-token-${partIndex}`} style={{ color: "#7756e3" }}>
        {token}
      </span>,
    );

    cursor = matchIndex + token.length;
    partIndex += 1;
  }

  if (cursor < text.length) {
    parts.push(text.slice(cursor));
  }

  return parts.length > 0 ? parts : text;
}

function parseTweetBlock(lines: string[]): TweetData {
  const metadata: Record<string, string> = {};
  const textLines: string[] = [];
  let isText = false;

  for (const line of lines) {
    if (line.trim() === "text:") {
      isText = true;
      continue;
    }

    if (isText) {
      textLines.push(line);
      continue;
    }

    const match = line.match(/^([A-Za-z]+):\s*(.*)$/);

    if (match) {
      metadata[match[1]] = match[2];
    }
  }

  return {
    name: metadata.name,
    handle: metadata.handle?.replace(/^@/, ""),
    avatar: metadata.avatar,
    url: metadata.url,
    date: metadata.date,
    stats: metadata.stats,
    media: metadata.media
      ?.split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    cardDomain: metadata.cardDomain,
    cardTitle: metadata.cardTitle,
    cardUrl: metadata.cardUrl,
    text: textLines.join("\n").trim(),
  };
}

function renderTweet(tweet: TweetData, key: string) {
  const media = tweet.media ?? [];
  const hasPreview = tweet.cardTitle || tweet.cardDomain || tweet.cardUrl;
  const avatar = tweet.avatar || (tweet.handle ? `https://unavatar.io/twitter/${tweet.handle}` : defaultTweetAvatar);

  return (
    <article
      key={key}
      style={{
        maxWidth: 550,
        margin: "28px auto 30px",
        padding: 16,
        border: "1px solid rgba(54, 55, 55, 0.16)",
        borderRadius: 12,
        background: "#ffffff",
        color: "#1f2933",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
        boxShadow: "0 1px 0 rgba(54, 55, 55, 0.03)",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <img
          src={avatar}
          alt={tweet.name ? `${tweet.name} avatar` : "Tweet avatar"}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            objectFit: "cover",
            border: "1px solid rgba(54, 55, 55, 0.12)",
          }}
        />
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.25 }}>{tweet.name || tweet.handle || "X"}</div>
          {tweet.handle ? (
            <div style={{ fontSize: 14, color: "rgba(54, 55, 55, 0.62)", lineHeight: 1.25 }}>@{tweet.handle}</div>
          ) : null}
        </div>
        {tweet.url ? (
          <a
            href={tweet.url}
            aria-label="Abrir tweet no X"
            style={{
              color: "#111827",
              fontSize: 25,
              lineHeight: 1,
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            X
          </a>
        ) : (
          <span style={{ fontSize: 25, lineHeight: 1 }}>X</span>
        )}
      </div>

      <div
        style={{
          marginTop: 14,
          whiteSpace: "pre-wrap",
          fontSize: 15,
          lineHeight: 1.42,
          color: "rgba(54, 55, 55, 0.95)",
        }}
      >
        {renderTweetText(tweet.text)}
      </div>

      {media.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: media.length === 1 ? "1fr" : "repeat(2, minmax(0, 1fr))",
            gap: 4,
            marginTop: 14,
            overflow: "hidden",
            border: "1px solid rgba(54, 55, 55, 0.12)",
            borderRadius: 8,
          }}
        >
          {media.map((src, mediaIndex) => (
            <img
              key={src}
              src={src}
              alt=""
              style={{
                width: "100%",
                height: media.length === 1 ? "auto" : 170,
                minHeight: media.length === 1 ? undefined : 170,
                objectFit: "cover",
                gridColumn: media.length === 3 && mediaIndex === 0 ? "span 2" : undefined,
              }}
            />
          ))}
        </div>
      ) : null}

      {hasPreview ? (
        <a
          href={tweet.cardUrl || tweet.url || "#"}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 14,
            marginTop: 14,
            padding: 12,
            minHeight: 64,
            border: "1px solid rgba(54, 55, 55, 0.12)",
            borderRadius: 8,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <span style={{ minWidth: 0 }}>
            {tweet.cardDomain ? (
              <span style={{ display: "block", fontSize: 13, color: "rgba(54, 55, 55, 0.62)" }}>{tweet.cardDomain}</span>
            ) : null}
            {tweet.cardTitle ? <span style={{ display: "block", fontSize: 15, fontWeight: 600 }}>{tweet.cardTitle}</span> : null}
          </span>
          <span
            aria-hidden="true"
            style={{
              display: "grid",
              placeItems: "center",
              flex: "0 0 64px",
              width: 64,
              height: 64,
              borderRadius: 12,
              background: "rgba(54, 55, 55, 0.07)",
              fontSize: 26,
              color: "rgba(54, 55, 55, 0.55)",
            }}
          >
            ↗
          </span>
        </a>
      ) : null}

      {tweet.date ? (
        <div style={{ marginTop: 14, fontSize: 13, color: "rgba(54, 55, 55, 0.56)" }}>{tweet.date}</div>
      ) : null}
      {tweet.stats ? (
        <>
          <div style={{ marginTop: 10, borderTop: "1px solid rgba(54, 55, 55, 0.12)" }} />
          <div style={{ marginTop: 10, fontSize: 13, color: "rgba(54, 55, 55, 0.56)" }}>{tweet.stats}</div>
        </>
      ) : null}
    </article>
  );
}

function renderImage(markdown: string, key: string) {
  const match = markdown.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);

  if (!match) {
    return null;
  }

  return (
    <img
      key={key}
      src={match[2]}
      alt={match[1]}
      style={{
        display: "block",
        maxWidth: "min(100%, 640px)",
        maxHeight: "min(760px, 80vh)",
        width: "auto",
        height: "auto",
        margin: "34px auto 10px",
        objectFit: "contain",
      }}
    />
  );
}

function flushParagraph(blocks: ReactNode[], paragraph: string[]) {
  if (paragraph.length === 0) {
    return;
  }

  blocks.push(
    <p key={`p-${blocks.length}`} style={{ margin: "0 0 22px", fontSize: 18, lineHeight: 1.65 }}>
      {renderInline(paragraph.join(" "))}
    </p>,
  );
  paragraph.length = 0;
}

function flushList(blocks: ReactNode[], list: string[]) {
  if (list.length === 0) {
    return;
  }

  blocks.push(
    <ul key={`ul-${blocks.length}`} style={{ margin: "0 0 28px", paddingLeft: 24, fontSize: 18, lineHeight: 1.6 }}>
      {list.map((item) => (
        <li key={item} style={{ marginBottom: 8 }}>
          {renderInline(item)}
        </li>
      ))}
    </ul>,
  );
  list.length = 0;
}

function flushOrderedList(blocks: ReactNode[], list: string[]) {
  if (list.length === 0) {
    return;
  }

  blocks.push(
    <ol key={`ol-${blocks.length}`} style={{ margin: "0 0 28px", paddingLeft: 24, fontSize: 18, lineHeight: 1.6 }}>
      {list.map((item) => (
        <li key={item} style={{ marginBottom: 8 }}>
          {renderInline(item)}
        </li>
      ))}
    </ol>,
  );
  list.length = 0;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  const blocks: ReactNode[] = [];
  const paragraph: string[] = [];
  const list: string[] = [];
  const orderedList: string[] = [];
  const lines = content.split(/\r?\n/);
  let previousBlockWasImage = false;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph(blocks, paragraph);
      flushList(blocks, list);
      flushOrderedList(blocks, orderedList);
      continue;
    }

    if (trimmed === ":::tweet") {
      flushParagraph(blocks, paragraph);
      flushList(blocks, list);
      flushOrderedList(blocks, orderedList);

      const tweetLines: string[] = [];
      index += 1;

      while (index < lines.length && lines[index].trim() !== ":::") {
        tweetLines.push(lines[index]);
        index += 1;
      }

      blocks.push(renderTweet(parseTweetBlock(tweetLines), `tweet-${blocks.length}`));
      previousBlockWasImage = false;
      continue;
    }

    if (lines[index + 1]?.trim().match(/^-{3,}$/)) {
      flushParagraph(blocks, paragraph);
      flushList(blocks, list);
      flushOrderedList(blocks, orderedList);
      blocks.push(
        <h2
          key={`h2-${blocks.length}`}
          style={{
            margin: "44px 0 16px",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(34px, 4vw, 52px)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
        >
          {renderInline(trimmed.replace(/^\*\*(.*)\*\*$/, "$1"))}
        </h2>,
      );
      previousBlockWasImage = false;
      index += 1;
      continue;
    }

    if (trimmed.match(/^(?:-{3,}|\*{3,}|_{3,}|-(?:\s+-){2,}|\*(?:\s+\*){2,}|_(?:\s+_){2,})$/)) {
      flushParagraph(blocks, paragraph);
      flushList(blocks, list);
      flushOrderedList(blocks, orderedList);
      blocks.push(
        <hr
          key={`hr-${blocks.length}`}
          style={{
            margin: "34px 0",
            border: 0,
            borderTop: "1px solid var(--fg)",
            opacity: 0.5,
          }}
        />,
      );
      previousBlockWasImage = false;
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushParagraph(blocks, paragraph);
      flushList(blocks, list);
      flushOrderedList(blocks, orderedList);
      blocks.push(
        <h2
          key={`h2-${blocks.length}`}
          style={{
            margin: "44px 0 16px",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(34px, 4vw, 52px)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
        >
          {renderInline(trimmed.slice(3))}
        </h2>,
      );
      previousBlockWasImage = false;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushParagraph(blocks, paragraph);
      flushList(blocks, list);
      flushOrderedList(blocks, orderedList);
      blocks.push(
        <h3
          key={`h3-${blocks.length}`}
          style={{
            margin: "34px 0 14px",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(26px, 3vw, 36px)",
            lineHeight: 1.05,
          }}
        >
          {renderInline(trimmed.slice(4))}
        </h3>,
      );
      previousBlockWasImage = false;
      continue;
    }

    if (trimmed.startsWith("# ")) {
      flushParagraph(blocks, paragraph);
      flushList(blocks, list);
      flushOrderedList(blocks, orderedList);
      previousBlockWasImage = false;
      continue;
    }

    const youtubeEmbed = renderYoutubeEmbed(trimmed, `youtube-${blocks.length}`);

    if (youtubeEmbed) {
      flushParagraph(blocks, paragraph);
      flushList(blocks, list);
      flushOrderedList(blocks, orderedList);
      blocks.push(youtubeEmbed);
      previousBlockWasImage = false;
      continue;
    }

    const threadsEmbed = renderThreadsEmbed(trimmed, `threads-${blocks.length}`);

    if (threadsEmbed) {
      flushParagraph(blocks, paragraph);
      flushList(blocks, list);
      flushOrderedList(blocks, orderedList);
      blocks.push(threadsEmbed);
      previousBlockWasImage = false;
      continue;
    }

    if (trimmed.startsWith("![")) {
      const image = renderImage(trimmed, `image-${blocks.length}`);

      if (image) {
        flushParagraph(blocks, paragraph);
        flushList(blocks, list);
        flushOrderedList(blocks, orderedList);
        blocks.push(image);
        previousBlockWasImage = true;
        continue;
      }
    }

    if (trimmed.startsWith("> ")) {
      flushParagraph(blocks, paragraph);
      flushList(blocks, list);
      flushOrderedList(blocks, orderedList);
      const isCallout = trimmed.startsWith("> 💡") || trimmed.startsWith("> 🚨");
      const isCaption = previousBlockWasImage && !isCallout;

      if (isCaption) {
        blocks.push(
          <p
            key={`caption-${blocks.length}`}
            style={{
              maxWidth: 560,
              margin: "0 auto 34px",
              textAlign: "center",
              fontSize: 14,
              lineHeight: 1.45,
              opacity: 0.58,
            }}
          >
            <em>{renderInline(trimmed.slice(2))}</em>
          </p>,
        );
        previousBlockWasImage = false;
        continue;
      }

      blocks.push(
        <blockquote
          key={`quote-${blocks.length}`}
          style={{
            margin: "0 0 28px",
            padding: isCallout ? "18px 20px" : "16px 0 16px 22px",
            border: isCallout ? "1px solid var(--fg)" : undefined,
            borderLeft: isCallout ? "1px solid var(--fg)" : "2px solid var(--fg)",
            fontSize: 17,
            lineHeight: 1.55,
            opacity: isCallout ? 1 : 0.78,
          }}
        >
          {isCallout ? renderInline(trimmed.slice(2)) : <em>{renderInline(trimmed.slice(2))}</em>}
        </blockquote>,
      );
      previousBlockWasImage = false;
      continue;
    }

    if (trimmed.startsWith("- ") || trimmed.match(/^\*\s+/)) {
      flushParagraph(blocks, paragraph);
      flushOrderedList(blocks, orderedList);
      list.push(trimmed.replace(/^[-*]\s+/, ""));
      previousBlockWasImage = false;
      continue;
    }

    const orderedListMatch = trimmed.match(/^\d+\.\s+(.*)$/);

    if (orderedListMatch) {
      flushParagraph(blocks, paragraph);
      flushList(blocks, list);
      orderedList.push(orderedListMatch[1]);
      previousBlockWasImage = false;
      continue;
    }

    if (previousBlockWasImage) {
      flushList(blocks, list);
      flushOrderedList(blocks, orderedList);
      blocks.push(
        <p
          key={`caption-${blocks.length}`}
          style={{
            maxWidth: 560,
            margin: "0 auto 34px",
            textAlign: "center",
            fontSize: 14,
            lineHeight: 1.45,
            opacity: 0.58,
          }}
        >
          <em>{renderInline(trimmed)}</em>
        </p>,
      );
      previousBlockWasImage = false;
      continue;
    }

    flushList(blocks, list);
    flushOrderedList(blocks, orderedList);
    paragraph.push(trimmed);
    previousBlockWasImage = false;
  }

  flushParagraph(blocks, paragraph);
  flushList(blocks, list);
  flushOrderedList(blocks, orderedList);

  return <div>{blocks}</div>;
}
