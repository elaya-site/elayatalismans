"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  /** Si true, charge immédiatement (hero visible dès l'arrivée) */
  eager?: boolean;
};

/**
 * Vidéo qui ne se charge que quand elle entre dans le viewport.
 * Réduit drastiquement le temps de chargement initial des pages.
 */
export default function LazyVideo({ src, className, style, eager = false }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(eager);

  useEffect(() => {
    if (eager) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // commence à charger 200px avant d'être visible
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [eager]);

  return (
    <video
      ref={ref}
      src={visible ? src : undefined}
      autoPlay={visible}
      muted
      loop
      playsInline
      preload={eager ? "metadata" : "none"}
      className={className}
      style={style}
    />
  );
}
