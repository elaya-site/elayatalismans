"use client";

import { useEffect, useMemo, type CSSProperties } from "react";
import type { CollectionId } from "@/data/collections";
import { collectionSignatures, type CollectionSignature, type SignatureType } from "@/lib/collectionSignatures";
import { useAudio } from "@/components/AudioProvider";

/* ─── Mapping type → nom du @keyframes ─── */
const ANIM: Record<SignatureType, string> = {
  "particles-sand":   "sig-sand",
  "dust-wind":        "sig-wind",
  "heat-glow":        "sig-heat",
  "light-rays":       "sig-ray",
  "water-reflection": "sig-water",
  "light-flicker":    "sig-flicker",
  "sparkles-soft":    "sig-sparkle",
};

/* ─── Génération déterministe des particules (SSR-safe, 0 Math.random) ─── */
function buildParticles(sig: CollectionSignature) {
  const { type, particleCount: count, color, intensity } = sig;

  return Array.from({ length: count }, (_, i) => {
    // Distribution dorée → répartition uniforme sans aléatoire
    const baseLeft = (i * 137.5) % 100;
    const baseTop  = (i * 53.7)  % 100;

    // Concentration vers le centre (zone bijou ≈ 30–70% H, 20–60% V)
    // Les premières particules (~40%) sont attirées vers la zone centrale,
    // les suivantes se dispersent librement sur tout l'écran.
    const centerBias = Math.max(0, 1 - (i / count) * 2.5);
    const centerLeft = 30 + (i % 9) * 4.4;   // 30–67 %
    const centerTop  = 20 + (i % 7) * 5.8;   // 20–57 %
    const left = centerBias * centerLeft + (1 - centerBias) * baseLeft;
    const top  = centerBias * centerTop  + (1 - centerBias) * baseTop;

    const dx   = ((i * 31) % 26) - 13; // -13 to +13 px — dérive douce
    const dy   = ((i * 17) % 18) - 9;
    // Légère respiration d'opacité : variation 70–100% de l'intensité
    const op   = intensity * (0.70 + (i % 5) * 0.075);

    let w: string, h: string, br: string, dur: number, glow = false;
    // Par défaut la couleur de la particule = couleur de la collection.
    // heat-glow alterne entre orange chaud et rouge braise pour un effet multi-tonalité.
    let particleColor = color;

    switch (type) {
      case "particles-sand":
        w = h = `${2.5 + (i % 3) * 0.5}px`; br = "50%"; dur = 34 + (i % 10) * 3; break; // 2.5–3.5px, 34–61s
      case "dust-wind":
        w = `${2 + (i % 3)}px`; h = `${1 + (i % 2)}px`; br = "2px"; dur = 32 + (i % 7) * 3; break; // 2–4px × 1–2px, 32–50s
      case "heat-glow":
        // 2–3px ronds, trajectoires lentes 28–46s (braises qui montent)
        w = h = `${2 + (i % 3) * 0.5}px`; br = "50%"; dur = 28 + (i % 10) * 2; glow = true;
        // Toutes les 3ème particules : rouge braise pour la profondeur de couleur
        if (i % 3 === 2) particleColor = "rgba(218,72,36,1)";
        break;
      case "light-rays":
        w = `${1 + (i % 2)}px`; h = `${50 + (i % 6) * 18}px`; br = "1px"; dur = 18 + (i % 6) * 4; break;
      case "water-reflection":
        // 2/3 : reflets ronds (2–3px) · 1/3 : shimmer court (5–8px × 1.5px)
        if (i % 3 === 2) {
          w = `${5 + (i % 4)}px`; h = "1.5px"; br = "2px";
        } else {
          w = h = `${2 + (i % 3) * 0.5}px`; br = "50%";
        }
        dur = 22 + (i % 9) * 2; // 22–38s — lent et fluide
        glow = true;
        // Alternance bleu doux / blanc chaud champagne
        if (i % 4 === 0) particleColor = "rgba(255,248,238,1)";
        break;
      case "light-flicker":
        w = h = `${1 + (i % 3)}px`; br = "50%"; dur = 3 + (i % 5) * 1.5; break;
      case "sparkles-soft":
      default:
        w = h = `${1 + (i % 3)}px`; br = "2px"; dur = 14 + (i % 7) * 2; glow = true; break;
    }

    const delay = -((i * 1.3) % dur);

    return {
      key:       i,
      className: `sig-particle${glow ? " sig-particle--glow" : ""}`,
      style:     {
        left:              `${left}%`,
        top:               `${top}%`,
        width:             w,
        height:            h,
        borderRadius:      br,
        background:        particleColor,
        // color = particleColor pour que box-shadow currentColor sur --glow soit correct
        color:             particleColor,
        animationName:     ANIM[type],
        animationDuration: `${dur}s`,
        animationDelay:    `${delay}s`,
        ["--sig-op" as string]: op,
        ["--dx"     as string]: `${dx}px`,
        ["--dy"     as string]: `${dy}px`,
      } as CSSProperties,
    };
  });
}

/* ─── Composant ─── */
export default function CollectionSignatureLayer({
  collectionId,
}: {
  collectionId: CollectionId;
}) {
  /* 1. Déclenche la piste audio de cette collection */
  const { isEnabled, playTrack } = useAudio();
  useEffect(() => {
    if (isEnabled) playTrack(collectionId);
  }, [collectionId, isEnabled, playTrack]);

  /* 2. Génère les particules (mémoïsées par collectionId) */
  const sig       = collectionSignatures[collectionId];
  const particles = useMemo(() => buildParticles(sig), [sig]);

  /* 3. Rendu de la couche visuelle */
  return (
    <div className="sig-layer" aria-hidden="true">
      {particles.map((p) => (
        <span key={p.key} className={p.className} style={p.style} />
      ))}
    </div>
  );
}
