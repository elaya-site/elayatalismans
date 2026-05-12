"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { Product } from "@/data/products";
import Arrow from "@/components/Arrow";
import LazyVideo from "@/components/LazyVideo";

/**
 * Grille vidéo unifiée — bas de toutes les pages collection.
 *
 * Architecture des couches (du plus bas au plus haut) :
 *   vgrid__frame        → conteneur fixe aspect-ratio 4:5, overflow:hidden
 *     vgrid__crop       → wrapper de recadrage optionnel (transform: scale)
 *       video           → object-fit:cover, object-position configurable
 *     vgrid__veil       → dégradé bas, pointer-events:none
 *
 * Séparation des transforms :
 *   - cropScale  (vgrid__crop)  → zoom permanent pour masquer filigranes
 *   - hover zoom (vgrid__video) → scale(1.04) au survol — indépendant
 * Les deux s'empilent proprement car ils sont sur des éléments distincts.
 */
export default function CollectionVideoGrid({ products }: { products: Product[] }) {
  if (!products.some((p) => p.video)) return null;

  return (
    <section className="vgrid">
      {/* En-tête éditorial */}
      <div className="vgrid__head">
        <div className="vgrid__eyebrow"><span />En mouvement</div>
        <h3 className="vgrid__title">Les talismans, <em>en lumière.</em></h3>
      </div>

      {/* Grille — 4 colonnes égales */}
      <div className="vgrid__row">
        {products.map((p) => (
          <Link
            key={p.id}
            href={p.ready ? `/produits/${p.id}` : "#"}
            className="vgrid__item"
          >
            {/* Cadre fixe — ratio 4:5, overflow caché */}
            <div className="vgrid__frame">

              {/* Wrapper de recadrage — zoom optionnel pour masquer filigranes */}
              <div
                className="vgrid__crop"
                style={
                  p.cropScale && p.cropScale !== 1
                    ? ({ transform: `scale(${p.cropScale})` } as CSSProperties)
                    : undefined
                }
              >
                {p.video ? (
                  <LazyVideo
                    src={p.video}
                    className="vgrid__video"
                    style={
                      p.videoPosition
                        ? ({ objectPosition: p.videoPosition } as CSSProperties)
                        : undefined
                    }
                  />
                ) : (
                  <div className="vgrid__placeholder" />
                )}
              </div>

              {/* Dégradé bas — lisibilité caption */}
              <div className="vgrid__veil" />
            </div>

            {/* Légende — titre + CTA alignés en bas */}
            <div className="vgrid__caption">
              <span className="vgrid__name">
                {p.name.replace(/^(Collier|Bracelet|Boucles|Bague|Barrettes|Pince à cheveux)\s/, "")}
              </span>
              <span className="vgrid__cta">
                Découvrir <Arrow width={13} height={7} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
