import type { ReactNode } from "react";

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
        width: "min(100%, 640px)",
        height: "auto",
        margin: "34px auto 10px",
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

    if (trimmed === "---" || trimmed === "***" || trimmed === "* * *") {
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
