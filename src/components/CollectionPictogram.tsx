/**
 * CollectionPictogram — Signature SVG fine, style bijou gravé, par collection.
 *
 * Rendu purement statique (server component). Aucun JS client.
 * Placement :
 *   "hero"      → grande silhouette, bas-droite du hero, opacité ~7 %
 *   "watermark" → filigrane discret, arrière-plan section intro, opacité ~4 %
 */
import type { CollectionId } from "@/data/collections";

export type PictogramPlacement = "hero" | "watermark";

/* ─────────────────────────────────────────
   SVG SEQUOIA — silhouette séquoia stylisée
   Niveaux de branchage triangulaires, tronc élancé.
   viewBox 80 × 220
   ───────────────────────────────────────── */
function Sequoia() {
  return (
    <svg
      viewBox="0 0 80 220"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Tronc */}
      <line x1="40" y1="136" x2="40" y2="208" strokeWidth="1.8" />
      {/* Légères racines au sol */}
      <path d="M40 206 C37 200 29 203 24 208" strokeWidth="0.8" />
      <path d="M40 206 C43 200 51 203 56 208" strokeWidth="0.8" />
      {/* 7 niveaux de branchage — du bas vers la pointe */}
      <path d="M40 108 L4 146 L76 146 Z" strokeWidth="0.75" />
      <path d="M40 90  L8 126 L72 126 Z" strokeWidth="0.75" />
      <path d="M40 73  L12 108 L68 108 Z" strokeWidth="0.75" />
      <path d="M40 57  L16 90  L64 90  Z" strokeWidth="0.75" />
      <path d="M40 42  L20 72  L60 72  Z" strokeWidth="0.72" />
      <path d="M40 28  L25 55  L55 55  Z" strokeWidth="0.70" />
      {/* Pointe sommitale */}
      <path d="M40 14  L33 32  L47 32  Z" strokeWidth="0.65" />
      {/* Aiguille terminale */}
      <line x1="40" y1="5" x2="40" y2="16" strokeWidth="0.6" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   SVG NEWPORT — double vague élégante,
   points d'écume, motif marin raffiné.
   viewBox 220 × 70
   ───────────────────────────────────────── */
function Newport() {
  return (
    <svg
      viewBox="0 0 220 70"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Vague principale */}
      <path
        d="M0 35 C27 8 53 8 80 35 C107 62 133 62 160 35 C187 8 205 10 220 22"
        strokeWidth="1.1"
      />
      {/* Vague secondaire décalée */}
      <path
        d="M0 48 C27 21 53 21 80 48 C107 75 133 75 160 48 C187 21 205 23 220 35"
        strokeWidth="0.55"
        opacity="0.7"
      />
      {/* Points d'écume aux crêtes */}
      <circle cx="0"   cy="35" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="80"  cy="35" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="160" cy="35" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="220" cy="22" r="1.2" fill="currentColor" stroke="none" />
      {/* Petite ligne de cap (référence nautique) */}
      <line x1="0" y1="62" x2="220" y2="62" strokeWidth="0.35" opacity="0.4" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   SVG NEW YORK — skyline verticale stylisée,
   immeubles de hauteurs variées, flèches.
   viewBox 200 × 110
   ───────────────────────────────────────── */
function NewYork() {
  return (
    <svg
      viewBox="0 0 200 110"
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeLinecap="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Ligne de sol */}
      <line x1="0" y1="100" x2="200" y2="100" strokeWidth="0.5" />
      {/* — Immeubles gauche → droite — */}
      <rect x="2"  y="82" width="12" height="18" strokeWidth="0.7" />
      <rect x="15" y="70" width="14" height="30" strokeWidth="0.7" />
      <rect x="30" y="57" width="13" height="43" strokeWidth="0.7" />
      {/* Immeuble avec flèche (style Empire State) */}
      <rect x="44" y="44" width="17" height="56" strokeWidth="0.75" />
      <line x1="52" y1="44" x2="52" y2="30" strokeWidth="0.65" />
      <line x1="50" y1="36" x2="52" y2="30" strokeWidth="0.55" />
      <line x1="54" y1="36" x2="52" y2="30" strokeWidth="0.55" />
      <rect x="62" y="60" width="14" height="40" strokeWidth="0.7" />
      {/* Immeuble central — le plus haut */}
      <rect x="77" y="26" width="22" height="74" strokeWidth="0.85" />
      <line x1="88" y1="26" x2="88" y2="10" strokeWidth="0.7" />
      <line x1="86" y1="18" x2="88" y2="10" strokeWidth="0.6" />
      <line x1="90" y1="18" x2="88" y2="10" strokeWidth="0.6" />
      {/* Fenêtres suggestives sur l'immeuble central */}
      <rect x="80" y="40" width="5" height="6" strokeWidth="0.4" opacity="0.6" />
      <rect x="88" y="40" width="5" height="6" strokeWidth="0.4" opacity="0.6" />
      <rect x="80" y="54" width="5" height="6" strokeWidth="0.4" opacity="0.6" />
      <rect x="88" y="54" width="5" height="6" strokeWidth="0.4" opacity="0.6" />
      {/* — Immeubles droite — */}
      <rect x="100" y="52" width="15" height="48" strokeWidth="0.7" />
      <rect x="116" y="65" width="16" height="35" strokeWidth="0.7" />
      <rect x="133" y="46" width="15" height="54" strokeWidth="0.7" />
      <line x1="140" y1="46" x2="140" y2="33" strokeWidth="0.55" />
      <rect x="149" y="72" width="18" height="28" strokeWidth="0.7" />
      <rect x="168" y="60" width="13" height="40" strokeWidth="0.7" />
      <rect x="182" y="76" width="16" height="24" strokeWidth="0.7" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   SVG ROYAL CASTLE — château héraldique minimaliste.
   Deux tours latérales, corps central, tourelle,
   créneaux fins, arche. Étoile féérique au sommet.
   viewBox 120 × 152
   ───────────────────────────────────────── */
function RoyalCastle() {
  return (
    <svg
      viewBox="0 0 120 152"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ── Tour gauche ── */}
      <rect x="6"  y="52" width="27" height="95" strokeWidth="0.85" />
      {/* Créneaux tour gauche */}
      <path
        d="M6 52 L6 44 L11 44 L11 52 M16 44 L16 52 M16 44 L21 44 L21 52 M26 44 L26 52 M26 44 L33 44 L33 52"
        strokeWidth="0.65"
      />
      {/* Fenêtre arrondie tour gauche */}
      <path d="M12 67 L12 81 Q19.5 74 27 81 L27 67" strokeWidth="0.6" />

      {/* ── Tour droite ── */}
      <rect x="87" y="52" width="27" height="95" strokeWidth="0.85" />
      {/* Créneaux tour droite */}
      <path
        d="M87 52 L87 44 L92 44 L92 52 M97 44 L97 52 M97 44 L102 44 L102 52 M107 44 L107 52 M107 44 L114 44 L114 52"
        strokeWidth="0.65"
      />
      {/* Fenêtre arrondie tour droite */}
      <path d="M93 67 L93 81 Q100.5 74 108 81 L108 67" strokeWidth="0.6" />

      {/* ── Corps central ── */}
      <rect x="30" y="70" width="60" height="77" strokeWidth="0.85" />
      {/* Créneaux corps central */}
      <path
        d="M30 70 L30 62 L36 62 L36 70 M42 62 L42 70 M42 62 L48 62 L48 70 M54 62 L54 70 M54 62 L60 62 L60 70 M66 62 L66 70 M66 62 L72 62 L72 70 M78 62 L78 70 M78 62 L84 62 L84 70 M90 70"
        strokeWidth="0.65"
      />
      {/* Portail (arche romane) */}
      <path d="M44 147 L44 112 Q60 98 76 112 L76 147" strokeWidth="0.8" />
      {/* Fenêtres corps central */}
      <path d="M36 80 L36 92 Q43 85 50 92 L50 80" strokeWidth="0.6" />
      <path d="M70 80 L70 92 Q77 85 84 92 L84 80" strokeWidth="0.6" />

      {/* ── Tourelle centrale ── */}
      <rect x="48" y="32" width="24" height="38" strokeWidth="0.75" />
      {/* Créneaux tourelle */}
      <path
        d="M48 32 L48 24 L53 24 L53 32 M58 24 L58 32 M58 24 L63 24 L63 32 M68 24 L68 32 M68 24 L72 24 L72 32"
        strokeWidth="0.6"
      />
      {/* Fenêtre tourelle (arche) */}
      <path d="M53 42 L53 54 Q60 47 67 54 L67 42" strokeWidth="0.6" />

      {/* ── Étoile féérique ── */}
      {/* Pentagone étoilé centré sur (60, 14) — style gravure */}
      <path
        d="M60 6 L61.8 12 L68 12 L63 15.5 L65 21.5 L60 18 L55 21.5 L57 15.5 L52 12 L58.2 12 Z"
        strokeWidth="0.55"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────
   SVG SANTA FE — cactus saguaro stylisé.
   Tronc élancé, deux bras asymétriques
   qui remontent, sommets arrondis.
   viewBox 80 × 200
   ───────────────────────────────────────── */
function SantaFe() {
  return (
    <svg
      viewBox="0 0 80 200"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Tronc central */}
      <line x1="40" y1="162" x2="40" y2="25" strokeWidth="1.5" />
      {/* Sommet du tronc — arrondi */}
      <path d="M36,25 Q40,16 44,25" strokeWidth="0.85" />
      {/* Bras gauche — sort à mi-hauteur, remonte */}
      <path d="M40,90 C33,90 17,88 14,72 C11,56 17,46 25,44" strokeWidth="0.9" />
      {/* Sommet bras gauche */}
      <path d="M21,44 Q25,36 29,44" strokeWidth="0.75" />
      {/* Bras droit — sort plus bas, remonte */}
      <path d="M40,112 C47,112 63,110 67,94 C71,78 65,68 57,66" strokeWidth="0.9" />
      {/* Sommet bras droit */}
      <path d="M53,66 Q57,58 61,66" strokeWidth="0.75" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   SVG CHEYENNE — fer à cheval stylisé.
   Double contour (épaisseur du métal forgé),
   trous de clou, ouverture vers le bas.
   viewBox 100 × 115
   ───────────────────────────────────────── */
function Cheyenne() {
  return (
    <svg
      viewBox="0 0 100 115"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Contour extérieur du fer */}
      <path d="M14,112 L14,50 C14,20 86,20 86,50 L86,112" strokeWidth="1.0" />
      {/* Contour intérieur — épaisseur du métal */}
      <path d="M28,112 L28,54 C28,36 72,36 72,54 L72,112" strokeWidth="0.75" />
      {/* Trous de clous — forgés, répartis sur les branches */}
      <circle cx="21" cy="98" r="2.2" strokeWidth="0.65" />
      <circle cx="21" cy="78" r="2.2" strokeWidth="0.65" />
      <circle cx="21" cy="57" r="2.0" strokeWidth="0.60" />
      <circle cx="79" cy="98" r="2.2" strokeWidth="0.65" />
      <circle cx="79" cy="78" r="2.2" strokeWidth="0.65" />
      <circle cx="79" cy="57" r="2.0" strokeWidth="0.60" />
      {/* Trous dans la courbe du fer */}
      <circle cx="34" cy="28" r="1.8" strokeWidth="0.55" />
      <circle cx="66" cy="28" r="1.8" strokeWidth="0.55" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   SVG WAKAN TANKA — tipi géométrique minimal.
   Triangle pur, perches sommitales légères,
   entrée arquée. Abstrait, non caricatural.
   viewBox 100 × 168
   ───────────────────────────────────────── */
function WakanTanka() {
  return (
    <svg
      viewBox="0 0 100 168"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Corps principal — triangle épuré */}
      <path d="M50,20 L4,150 L96,150 Z" strokeWidth="0.85" />
      {/* Perches sommitales — 5 baguettes légères */}
      <line x1="50" y1="20" x2="38" y2="4"  strokeWidth="0.65" />
      <line x1="50" y1="20" x2="44" y2="2"  strokeWidth="0.55" />
      <line x1="50" y1="20" x2="50" y2="0"  strokeWidth="0.60" />
      <line x1="50" y1="20" x2="56" y2="2"  strokeWidth="0.55" />
      <line x1="50" y1="20" x2="62" y2="4"  strokeWidth="0.65" />
      {/* Entrée — ouverture arquée à la base */}
      <path d="M43,150 L43,120 Q50,109 57,120 L57,150" strokeWidth="0.70" />
      {/* Ligne de sol */}
      <line x1="4" y1="150" x2="96" y2="150" strokeWidth="0.45" />
      {/* Bande géométrique abstraite — décor, non ethnique spécifique */}
      <line x1="20" y1="113" x2="80" y2="113" strokeWidth="0.40" opacity="0.55" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   Map collection → SVG
   Retourne null pour les collections sans pictogramme.
   ───────────────────────────────────────── */
const PICTOGRAMS: Partial<Record<CollectionId, React.ReactNode>> = {
  "santa-fe":     <SantaFe />,
  cheyenne:       <Cheyenne />,
  "wakan-tanka":  <WakanTanka />,
  sequoia:        <Sequoia />,
  newport:        <Newport />,
  "new-york":     <NewYork />,
  "royal-castle": <RoyalCastle />,
};

/* ─────────────────────────────────────────
   Composant principal
   ───────────────────────────────────────── */
export default function CollectionPictogram({
  collectionId,
  placement = "hero",
}: {
  collectionId: CollectionId;
  placement?: PictogramPlacement;
}) {
  const pictogram = PICTOGRAMS[collectionId];
  if (!pictogram) return null;

  return (
    <div
      className={`coll-pict coll-pict--${placement} coll-pict--${collectionId}`}
      aria-hidden="true"
    >
      {pictogram}
    </div>
  );
}
