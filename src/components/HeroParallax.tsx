"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Hero wrapper that handles:
 * - first-frame `is-revealed` toggle (for fade-up + reveal-line cascades)
 * - light parallax translation of the background media on scroll
 *
 * Children should include a `.hero__media` element to receive the parallax transform.
 */
export default function HeroParallax({
  className = "hero",
  parallax = 0.18,
  children,
}: {
  className?: string;
  parallax?: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const r1 = requestAnimationFrame(() => {
      const r2 = requestAnimationFrame(() => {
        const t = setTimeout(() => setRevealed(true), 200);
        (window as unknown as { __elayaTimer?: number }).__elayaTimer = t as unknown as number;
      });
      (window as unknown as { __elayaR2?: number }).__elayaR2 = r2;
    });

    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const media = el.querySelector<HTMLElement>(".hero__media");
      if (!media) return;
      const y = window.scrollY;
      if (y < window.innerHeight) media.style.transform = `translateY(${y * parallax}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(r1);
    };
  }, [parallax]);

  return (
    <section ref={ref} className={`${className} ${revealed ? "is-revealed" : ""}`.trim()}>
      {children}
    </section>
  );
}
