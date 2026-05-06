"use client";

import { useEffect, useRef } from "react";
import type { CollectionId } from "@/data/collections";

/* ─── Types ──────────────────────────────────────────────── */
type Variant   = "default" | CollectionId;
type Position  = "center" | "left" | "right";
type Intensity = "low" | "medium";

/* ─── Config par collection ──────────────────────────────── */
/**
 * maxOpacity : opacité finale de la signature (0.04–0.10)
 * blur       : léger flou en px (effet fantomatique)
 * filter     : filtre CSS pour colorer subtilement le logo
 *              selon l'ambiance de chaque collection
 *
 * mix-blend-mode: screen est appliqué via CSS :
 * le fond noir du PNG disparaît, seul l'or brille.
 */
const CONFIG: Record<Variant, { maxOpacity: number; blur: number; filter: string }> = {
  "default":       { maxOpacity: 0.07, blur: 1.0, filter: "none" },
  "santa-fe":      { maxOpacity: 0.08, blur: 0.5, filter: "sepia(0.25)" },                           // trace dorée dans la poussière chaude
  "cheyenne":      { maxOpacity: 0.07, blur: 1.0, filter: "sepia(0.4) hue-rotate(-12deg)" },         // empreinte balayée par le vent rouge
  "wakan-tanka":   { maxOpacity: 0.08, blur: 1.5, filter: "sepia(0.55) hue-rotate(8deg)" },          // empreinte sacrée dans la lumière du feu
  "sequoia":       { maxOpacity: 0.06, blur: 2.0, filter: "sepia(0.2) hue-rotate(65deg) saturate(0.7)" }, // ombre douce entre les arbres
  "newport":       { maxOpacity: 0.06, blur: 1.5, filter: "sepia(0.3) hue-rotate(175deg)" },         // reflet léger sur l'eau
  "new-york":      { maxOpacity: 0.07, blur: 0.5, filter: "grayscale(0.25) brightness(1.1)" },       // lueur urbaine à peine perceptible
  "royal-castle":  { maxOpacity: 0.08, blur: 2.0, filter: "sepia(0.15) hue-rotate(255deg) saturate(1.2)" }, // poussière lumineuse féérique
};

/* ─── Composant ──────────────────────────────────────────── */
export default function BrandGhostLogo({
  variant   = "default",
  position  = "center",
  intensity = "low",
}: {
  variant?:   Variant;
  position?:  Position;
  intensity?: Intensity;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cfg     = CONFIG[variant] ?? CONFIG["default"];

  /* Intensité medium → +40% opacité */
  const maxOp = intensity === "medium"
    ? Math.min(cfg.maxOpacity * 1.4, 0.12)
    : cfg.maxOpacity;

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    /* Respecte prefers-reduced-motion : supprime l'animation */
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) el.dataset.reduced = "true";

    /* Apparition progressive au scroll via IntersectionObserver */
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("ghost-logo--visible");
          observer.disconnect(); // une seule apparition
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* Classes de position */
  const posClass =
    position === "center" ? "ghost-logo--center" :
    position === "left"   ? "ghost-logo--left"   :
                            "ghost-logo--right";

  return (
    <div
      ref={wrapRef}
      className={`ghost-logo ${posClass}`}
      aria-hidden="true"
      style={{
        /* Custom properties lues dans le CSS */
        ["--ghost-op"     as string]: maxOp,
        ["--ghost-blur"   as string]: `${cfg.blur}px`,
        ["--ghost-filter" as string]: cfg.filter,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/elaya-logo.png"
        alt=""
        width={380}
        height={380}
        className="ghost-logo__img"
        draggable={false}
      />
    </div>
  );
}
