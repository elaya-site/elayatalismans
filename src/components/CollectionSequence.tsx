/**
 * CollectionSequence — homepage collection section.
 * 7 collections in an alternating left/right editorial layout.
 * Each item: hero image (60%) + text block (40%), compact height.
 * Server component — zero client JS (Reveal handles scroll reveal).
 */

import Link from "next/link";
import { collections } from "@/data/collections";
import Reveal from "@/components/Reveal";
import BrandGhostLogo from "@/components/BrandGhostLogo";

export default function CollectionSequence() {
  return (
    <section className="cseq" id="collections">

      {/* ── En-tête ── */}
      <Reveal className="cseq__head" threshold={0.2}>
        {/* Logo fantôme centré — signature discrète avant le titre */}
        <BrandGhostLogo variant="default" position="center" intensity="medium" />
        <div className="cseq__eyebrow fade-up">
          <span className="cseq__eyebrow-rule" />
          <span>Sept collections</span>
        </div>
        <h2 className="cseq__title fade-up delay-1">
          Sept <em>univers,</em> sept <em>allures.</em>
        </h2>
        <p className="cseq__sub fade-up delay-2">
          Chaque collection est inspirée d&apos;un lieu — réel ou rêvé —
          et d&apos;une émotion qui lui est propre.
        </p>
      </Reveal>

      {/* ── Séquence ── */}
      <div className="cseq__list">
        {collections.map((c, i) => (
          <Reveal
            key={c.id}
            as="article"
            className={`cseq__item${i % 2 !== 0 ? " cseq__item--reverse" : ""}`}
            threshold={0.15}
          >
            {/* Lien étendu — rend toute la carte cliquable */}
            <Link
              href={`/collections/${c.id}`}
              className="cseq__link"
              aria-label={`Découvrir la collection ${c.name}`}
            />

            {/* Photo hero */}
            <div className="cseq__img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.heroImage ?? `/assets/${c.id}-hero.png`}
                alt={c.name}
                loading={i < 2 ? "eager" : "lazy"}
                style={c.heroPosition ? { objectPosition: c.heroPosition } : undefined}
              />
            </div>

            {/* Texte */}
            <div className="cseq__text">
              <div className="cseq__num fade-up">{c.num}</div>
              <h3 className="cseq__name fade-up delay-1">{c.name}</h3>
              <p className="cseq__keyword fade-up delay-2">
                <em>{c.keyword}</em>
              </p>
              <div className="cseq__loc fade-up delay-2">{c.location}</div>
              <span className="cseq__cta fade-up delay-3" aria-hidden="true">
                Découvrir <span>→</span>
              </span>
            </div>
          </Reveal>
        ))}
      </div>

    </section>
  );
}
