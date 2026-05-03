import type { ReactNode } from "react";

type MarkdownContentProps = {
  content: string;
};

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

    if (trimmed === "---" || trimmed === "***") {
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

    if (trimmed.startsWith("- ")) {
      flushParagraph(blocks, paragraph);
      flushOrderedList(blocks, orderedList);
      list.push(trimmed.slice(2));
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
