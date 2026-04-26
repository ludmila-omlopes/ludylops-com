"use client";

import { useEffect, useRef, useState } from "react";

const CHARS_POOL =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%&*/?<>";

export function GlitchVerb({
  words,
  interval = 2200,
  glitchMs = 380,
}: {
  words: readonly string[];
  interval?: number;
  glitchMs?: number;
}) {
  const [i, setI] = useState(0);
  const [glitch, setGlitch] = useState<string | null>(null);
  const wordRef = useRef<HTMLSpanElement | null>(null);
  const [boxWidth, setBoxWidth] = useState(0);

  useEffect(() => {
    if (!wordRef.current) return;
    const probe = document.createElement("span");
    probe.style.cssText =
      "position:absolute; visibility:hidden; white-space:pre; font: inherit; font-style: italic; font-weight: 500;";
    wordRef.current.appendChild(probe);
    let max = 0;
    for (const w of words) {
      probe.textContent = w;
      max = Math.max(max, probe.getBoundingClientRect().width);
    }
    probe.remove();
    setBoxWidth(Math.ceil(max));
  }, [words]);

  useEffect(() => {
    let scrambleTimer: ReturnType<typeof setTimeout> | undefined;
    const next = () => {
      const target = words[(i + 1) % words.length];
      const cur = words[i];
      const maxLen = Math.max(cur.length, target.length);
      const start = Date.now();
      const tick = () => {
        const t = Math.min(1, (Date.now() - start) / glitchMs);
        if (t < 1) {
          let s = "";
          for (let k = 0; k < maxLen; k++) {
            const settled = t > 0.55 + (k / maxLen) * 0.35;
            s += settled
              ? target[k] || ""
              : CHARS_POOL[Math.floor(Math.random() * CHARS_POOL.length)];
          }
          setGlitch(s);
          scrambleTimer = setTimeout(tick, 40);
        } else {
          setGlitch(null);
          setI((x) => (x + 1) % words.length);
        }
      };
      tick();
    };
    const cycleTimer = setTimeout(next, interval);
    return () => {
      clearTimeout(cycleTimer);
      if (scrambleTimer) clearTimeout(scrambleTimer);
    };
  }, [i, words, interval, glitchMs]);

  const displayed = glitch ?? words[i];
  const glitching = glitch != null;

  return (
    <span
      ref={wordRef}
      className={glitching ? "glitching" : ""}
      style={{
        display: "inline-block",
        minWidth: boxWidth || undefined,
        fontStyle: "italic",
        fontWeight: 500,
        position: "relative",
      }}
      aria-live="polite"
    >
      {displayed}
    </span>
  );
}
