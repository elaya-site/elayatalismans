/**
 * CollectionMapSection — luxury editorial US map replacing the linear collection grid.
 * Desktop: stylised SVG outline of the continental US + 7 gold hotspot dots with hover cards.
 * Mobile (<768px): vertical itinerary list.
 * Server component — zero client JS.
 */

import Link from "next/link";
import { collections } from "@/data/collections";
import Reveal from "@/components/Reveal";

/* ─── Spot definitions ─── */

type CardSide = "right" | "left" | "above-left";

type Spot = {
  id: string;
  num: string;
  name: string;
  location: string;
  phrase: string;
  /** Hero photo path (relative to /public) */
  heroImage: string;
  /** SVG x coordinate within the 960-wide viewBox */
  x: number;
  /** SVG y coordinate within the 640-tall viewBox */
  y: number;
  /** Which side the hover card opens on */
  card: CardSide;
};

const SPOTS: Spot[] = [
  {
    id: "sequoia",
    num: "04",
    name: "Sequoia",
    location: "Californie",
    phrase: "paix intérieure, forêt géante, calme profond",
    heroImage: "/assets/sequoia-hero.png",
    x: 88,
    y: 318,
    card: "right",
  },
  {
    id: "wakan-tanka",
    num: "03",
    name: "Wakan Tanka",
    location: "Montana",
    phrase: "sagesse ancestrale, souffle spirituel, lien à la terre",
    heroImage: "/assets/wakan-tanka-hero.png",
    x: 229,
    y: 60,
    card: "right",
  },
  {
    id: "cheyenne",
    num: "02",
    name: "Cheyenne",
    location: "Wyoming",
    phrase: "force, assurance, esprit Far West",
    heroImage: "/assets/cheyenne-hero.png",
    x: 323,
    y: 205,
    card: "right",
  },
  {
    id: "santa-fe",
    num: "01",
    name: "Santa Fe",
    location: "Nouveau-Mexique",
    phrase: "chaleur du désert, talisman solaire et libre",
    heroImage: "/assets/santa-fe-hero.png",
    x: 305,
    y: 345,
    card: "right",
  },
  {
    id: "royal-castle",
    num: "07",
    name: "Royal Castle",
    location: "Caroline du Nord",
    phrase: "magie, bonheur, éclat de conte moderne",
    heroImage: "/assets/royal-castle-hero.jpg",
    x: 699,
    y: 346,
    card: "left",
  },
  {
    id: "new-york",
    num: "06",
    name: "New York",
    location: "New York",
    phrase: "éclat urbain, énergie nocturne, allure magnétique",
    heroImage: "/assets/new-york-hero.png",
    x: 842,
    y: 218,
    card: "left",
  },
  {
    id: "newport",
    num: "05",
    name: "Newport",
    location: "Rhode Island",
    phrase: "élégance côtière, lumière chic, douceur marine",
    heroImage: "/assets/newport-hero.png",
    x: 893,
    y: 175,
    card: "above-left",
  },
];

/* ─── Simplified continental US outline ─── */
/* 960 × 640 viewBox. Clockwise from NW Washington. Editorial / stylised. */
const US_PATH =
  "M 10,28 L 10,85 L 5,175 L 8,255 " +
  "Q 30,298 100,388 " +
  "L 120,425 L 162,428 L 256,456 L 298,446 " +
  "L 364,508 L 416,556 L 448,590 " +
  "Q 480,600 494,504 Q 532,490 578,490 " +
  "L 593,480 L 624,478 L 663,491 " +
  "Q 688,510 698,548 Q 708,582 712,606 " +
  "Q 722,618 730,608 Q 734,596 732,560 " +
  "L 726,498 L 720,472 " +
  "L 742,458 L 764,418 L 786,378 L 822,350 " +
  "L 814,308 L 827,276 L 841,248 L 844,215 " +
  "L 864,200 L 890,190 L 898,178 " +
  "L 908,138 L 952,116 L 948,44 " +
  "L 902,40 L 856,38 L 840,38 L 812,30 L 764,28 " +
  "L 734,32 L 712,30 L 680,34 L 628,30 " +
  "L 520,30 L 418,30 L 312,28 " +
  "L 196,28 L 112,26 L 52,26 Z";

/* ─── Component ─── */

export default function CollectionMapSection() {
  return (
    <Reveal as="section" className="atlas" id="collections" threshold={0.12}>

      {/* Section header */}
      <div className="atlas__head">
        <div className="atlas__eyebrow fade-up">
          <span className="atlas__eyebrow-rule" />
          <span>Sept collections</span>
        </div>
        <h2 className="atlas__title fade-up delay-1">
          Sept <em>univers,</em> sept <em>allures.</em>
        </h2>
        <p className="atlas__sub fade-up delay-2">
          Chaque collection est inspirée d&apos;un lieu — réel ou rêvé —{" "}
          et d&apos;une émotion qui lui est propre.
        </p>
      </div>

      {/* ── Map stage — desktop / tablet ── */}
      <div
        className="atlas__stage fade-up delay-3"
        aria-label="Carte des collections ELAYA aux États-Unis"
      >

        {/* ── Couche 1 : filigranes photo (derrière le SVG) ── */}
        <div className="atlas__washes" aria-hidden="true">
          {SPOTS.map((s) => (
            <div
              key={s.id + "-wash"}
              className={`atlas__wash atlas__wash--${s.id}`}
              style={{
                left: `${(s.x / 960) * 100}%`,
                top:  `${(s.y / 640) * 100}%`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.heroImage} alt="" loading="lazy" />
            </div>
          ))}
        </div>

        {/* ── Couche 2 : SVG — contour US + anneaux + points ── */}
        <svg
          className="atlas__svg"
          viewBox="0 0 960 640"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Remplissage subtil */}
          <path className="atlas__land-fill" d={US_PATH} />
          {/* Contour */}
          <path className="atlas__land-stroke" d={US_PATH} />

          {/* Anneaux de pulsation (un par hotspot, décalés) */}
          {SPOTS.map((s) => (
            <circle
              key={s.id + "-ring"}
              className={`atlas__ring atlas__ring--${s.id}`}
              cx={s.x}
              cy={s.y}
              r="10"
            />
          ))}

          {/* Points dorés */}
          {SPOTS.map((s) => (
            <circle
              key={s.id + "-gem"}
              className="atlas__gem"
              cx={s.x}
              cy={s.y}
              r="4.5"
            />
          ))}
        </svg>

        {/* ── Couche 3 : hotspots interactifs HTML ── */}
        {SPOTS.map((s) => (
          <Link
            key={s.id}
            href={`/collections/${s.id}`}
            className={`atlas__spot atlas__spot--${s.card} atlas__spot--${s.id}`}
            style={{
              left: `${(s.x / 960) * 100}%`,
              top:  `${(s.y / 640) * 100}%`,
            }}
            aria-label={`Collection ${s.name} — ${s.location}`}
          >
            <div className="atlas__card">
              {/* Vignette hero dans la carte hover */}
              <div className="atlas__card-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.heroImage} alt={s.name} loading="lazy" />
              </div>
              <div className="atlas__card-body">
                <div className="atlas__card-num">{s.num}</div>
                <div className="atlas__card-name">{s.name}</div>
                <div className="atlas__card-loc">{s.location}</div>
                <div className="atlas__card-phrase">{s.phrase}</div>
                <div className="atlas__card-cta">
                  Découvrir <span aria-hidden="true">→</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Mobile itinerary (< 768 px) ── */}
      <ul className="atlas__list" aria-label="Liste des collections">
        {collections.map((c) => (
          <li key={c.id}>
            <Link href={`/collections/${c.id}`} className="atlas__entry">
              <span className="atlas__entry-num">{c.num}</span>
              <span className="atlas__entry-rule" aria-hidden="true" />
              <span className="atlas__entry-body">
                <span className="atlas__entry-name">{c.name}</span>
                <span className="atlas__entry-loc">{c.location}</span>
              </span>
              <span className="atlas__entry-go" aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>

    </Reveal>
  );
}
