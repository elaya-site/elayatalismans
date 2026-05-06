export type CollectionId =
  | "santa-fe"
  | "cheyenne"
  | "wakan-tanka"
  | "sequoia"
  | "newport"
  | "new-york"
  | "royal-castle";

export type Collection = {
  id: CollectionId;
  num: string;
  name: string;
  keyword: string;
  /** Tagline / location label shown in the collection hero. */
  location: string;
  /** Editorial coordinates string (optional). */
  coords?: string;
  emotion: string;
  power: string;
  sound: string;
  visualWorld: string;
  signature: string;
  /** Hero photo (homepage card + collection hero fallback). */
  heroImage?: string;
  /** CSS object-position for the banner crop on homepage (focus on jewelry). */
  heroPosition?: string;
  /** Hero video shown on the collection page (overrides heroImage when present). */
  heroVideo?: string;
  /** Background utility class used as a placeholder when no heroImage is set. */
  bgClass?: string;
  /** Long editorial copy for the collection page intro. */
  introTitle?: string;
  introCopy?: string[];
  /** Whether the collection page is fully built out. Others fall back to a "à venir" template. */
  ready: boolean;
  /** Geographic label displayed top-right of the collection hero (e.g. "Nouveau-Mexique"). */
  locationLabel?: string;
};

export const collections: Collection[] = [
  {
    id: "santa-fe",
    num: "01",
    name: "Santa Fe",
    keyword: "Pour les exploratrices",
    location: "Nouveau-Mexique",
    coords: "35°41′N · 105°56′W",
    emotion: "Chaleur, aventure, liberté douce, soleil intérieur.",
    power: "Réveiller l'audace solaire, l'énergie du voyage, l'envie d'avancer.",
    sound: "Harmonica",
    visualWorld: "Désert chaud, lumière dorée, sable, adobe, cactus, chaleur minérale.",
    signature: "Poussière dorée, rayon solaire, cactus discret, chaleur sable.",
    heroImage: "/assets/santa-fe-banner.png",
    heroPosition: "40% 12%",      /* tête + collier + boucles */
    heroVideo: "/assets/video/santa-fe-immersive.mp4",
    bgClass: "bg-santa-fe",
    locationLabel: "Nouveau-Mexique",
    introTitle: "Pour les exploratrices.",
    introCopy: [
      "La collection Santa Fe évoque la chaleur et l'évasion. Son univers s'inspire des villes et paysages du Nouveau-Mexique.",
      "Des teintes dorées, des formes affirmées. *Ses bijoux sont des éclats de soleil.*",
    ],
    ready: true,
  },
  {
    id: "sequoia",
    num: "02",
    name: "Sequoia",
    keyword: "Pour les sensibles",
    location: "Californie",
    coords: "36°34′N · 118°47′W",
    emotion: "Paix intérieure, calme, reconnexion.",
    power: "Retrouver son calme, se recentrer, respirer.",
    sound: "Tam-tam doux",
    visualWorld: "Forêt immense, arbres géants, paix, nature profonde, verticalité.",
    signature: "Feuille qui tombe, lumière entre les arbres, texture bois, rayon vertical.",
    heroImage: "/assets/sequoia-banner.png",
    heroPosition: "45% 8%",       /* tête + collier + boucles + bague */
    heroVideo: "/assets/video/sequoia-immersive.mp4",
    bgClass: "bg-sequoia",
    locationLabel: "Californie",
    introTitle: "Pour les sensibles.",
    introCopy: [
      "La collection Sequoia évoque le calme et la puissance. Son univers s'inspire des grandes forêts et de leurs équilibres.",
      "Des teintes minérales, des formes naturelles. *Ses bijoux sont des ancrages précieux.*",
    ],
    ready: true,
  },
  {
    id: "cheyenne",
    num: "03",
    name: "Cheyenne",
    keyword: "Pour les audacieuses",
    location: "Wyoming",
    coords: "41°08′N · 104°49′W",
    emotion: "Force, audace, liberté.",
    power: "Porter une énergie de conquête, de mouvement et d'indépendance.",
    sound: "Banjo",
    visualWorld: "Far West, grandes plaines, liberté, force, poussière, cuir, horizon.",
    signature: "Ligne d'horizon, poussière légère, mouvement du vent, motif de plaine.",
    heroImage: "/assets/cheyenne-banner.png",
    heroPosition: "68% 10%",      /* tête droite + collier cœur + bracelets */
    heroVideo: "/assets/video/cheyenne-immersive.mp4",
    bgClass: "bg-cheyenne",
    locationLabel: "Wyoming",
    introTitle: "Pour les audacieuses.",
    introCopy: [
      "La collection Cheyenne évoque la liberté et la force. Son univers s'inspire des grandes plaines du Far West et de ses héroïnes.",
      "Des lignes brutes, des formes sauvages. *Ses bijoux sont des symboles de liberté.*",
    ],
    ready: true,
  },
  {
    id: "newport",
    num: "04",
    name: "Newport",
    keyword: "Pour les calmes",
    location: "Nouvelle-Angleterre",
    coords: "41°29′N · 71°19′W",
    emotion: "Élégance, apaisement, fraîcheur, raffinement.",
    power: "Apporter une allure calme, chic et lumineuse.",
    sound: "Piano classique",
    visualWorld: "Bord de mer chic, Nouvelle-Angleterre, élégance côtière, eau scintillante.",
    signature: "Reflet d'eau, vague fine, éclat solaire marin, scintillement sur bijou.",
    heroImage: "/assets/newport-banner.png",
    heroPosition: "32% 8%",       /* tête + boucles + collier + bague */
    heroVideo: "/assets/video/newport-immersive.mp4",
    bgClass: "bg-newport",
    locationLabel: "Nouvelle-Angleterre",
    introTitle: "Pour les calmes.",
    introCopy: [
      "La collection Newport évoque la sérénité et l'élégance. Son univers s'inspire des stations balnéaires de Nouvelle-Angleterre.",
      "Des reflets aquatiques, des formes raffinées. *Ses bijoux sont des gouttes d'océan.*",
    ],
    ready: true,
  },
  {
    id: "wakan-tanka",
    num: "05",
    name: "Wakan Tanka",
    keyword: "Pour les spirituelles",
    location: "Montana",
    coords: "46°52′N · 110°21′W",
    emotion: "Ancrage, sagesse, connexion, intériorité.",
    power: "Se reconnecter à une force ancienne, calme et protectrice.",
    sound: "Flûte tribale",
    visualWorld: "Spiritualité ancestrale, nature, feu, tipi, vent, feuilles, sagesse.",
    signature: "Braise, plume discrète, cercle lumineux, feuilles au vent.",
    heroImage: "/assets/wakan-tanka-banner.png",
    heroPosition: "32% 10%",      /* tête + turquoise collier + boucles */
    heroVideo: "/assets/video/wakan-tanka-immersive.mp4",
    bgClass: "bg-wakan",
    locationLabel: "Montana",
    introTitle: "Pour les spirituelles.",
    introCopy: [
      "La collection Wakan Tanka incarne la nature et la sagesse. Son univers s'inspire des grands espaces et des cultures amérindiennes.",
      "Des couleurs organiques, des matières authentiques. *Ses bijoux sont des totems modernes.*",
    ],
    ready: true,
  },
  {
    id: "new-york",
    num: "06",
    name: "New York",
    keyword: "Pour les dynamiques",
    location: "New York",
    coords: "40°42′N · 74°00′W",
    emotion: "Ambition, intensité, énergie, confiance.",
    power: "Donner une allure magnétique, urbaine, affirmée.",
    sound: "Saxophone",
    visualWorld: "Ville électrique, énergie urbaine, skyline, lumières, mouvement.",
    signature: "Reflet urbain, ligne de building, lumière de taxi, vibration nocturne.",
    heroImage: "/assets/new-york-banner.png",
    heroPosition: "center 8%",    /* tête + collier émeraude + boucles */
    heroVideo: "/assets/video/new-york-immersive.mp4",
    bgClass: "bg-newyork",
    locationLabel: "New York",
    introTitle: "Pour les dynamiques.",
    introCopy: [
      "La collection New York évoque l'énergie et la modernité. Son univers s'inspire de la ville qui ne dort jamais.",
      "Des couleurs contrastées, des formes graphiques. *Ses bijoux sont des sources de pouvoir.*",
    ],
    ready: true,
  },
  {
    id: "royal-castle",
    num: "07",
    name: "Royal Castle",
    keyword: "Pour les rêveuses",
    location: "Caroline du Nord",
    coords: "35°33′N · 82°33′W",
    emotion: "Magie, bonheur, enchantement.",
    power: "Porter une touche de rêve, de grâce et d'émerveillement.",
    sound: "Harpe",
    visualWorld: "Conte, château, magie, lumière douce, merveilleux élégant.",
    signature: "Éclat étoilé discret, reflet de château, couronne minimaliste, lumière féérique.",
    heroImage: "/assets/royal-castle-banner.png",
    heroPosition: "22% 6%",       /* tête + bijoux cheveux + robe */
    heroVideo: "/assets/video/royal-castle-immersive.mp4",
    bgClass: "bg-royal",
    locationLabel: "Caroline du Nord",
    introTitle: "Pour les rêveuses.",
    introCopy: [
      "La collection Royal Castle évoque la magie et la délicatesse. Son univers s'inspire des contes et des châteaux d'exception.",
      "Des lignes fines, des tons pastels. *Ses bijoux sont des fragments de rêve.*",
    ],
    ready: true,
  },
];

export function getCollection(id: string): Collection | undefined {
  return collections.find((c) => c.id === id);
}
