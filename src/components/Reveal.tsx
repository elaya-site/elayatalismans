"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Threshold for IntersectionObserver. Default 0.15. */
  threshold?: number;
  /** Optional extra class added when revealed (in addition to `is-revealed`). */
  className?: string;
  /** Render as which HTML element. Default `div`. */
  as?: keyof React.JSX.IntrinsicElements;
  /** Optional id for in-page anchors. */
  id?: string;
  /** Reveal once and stop observing. Default true. */
  once?: boolean;
};

/**
 * Wrapper that adds the `is-revealed` class on first intersection.
 * Pair with `.fade-up`, `.reveal-line`, etc. inside.
 */
export default function Reveal({
  children,
  threshold = 0.15,
  className = "",
  as = "div",
  id,
  once = true,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVis(true);
          if (once) io.disconnect();
        } else if (!once) {
          setVis(false);
        }
      },
      { threshold },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [threshold, once]);

  const Tag = as as keyof React.JSX.IntrinsicElements;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (
    // @ts-expect-error generic ref typing
    <Tag ref={ref} id={id} className={`${vis ? "is-revealed " : ""}${className}`.trim()}>
      {children}
    </Tag>
  );
}
