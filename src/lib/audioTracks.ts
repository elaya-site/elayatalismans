import type { CollectionId } from "@/data/collections";

export type AudioTrack = {
  src:        string;  // path sous /public
  label:      string;  // nom affiché dans l'UI
  instrument: string;  // description courte pour l'ambiance
};

export const audioTracks: Record<CollectionId, AudioTrack> = {
  "santa-fe":     { src: "/audio/santa-fe.mp3",    label: "Santa Fe",     instrument: "Harmonica"          },
  "cheyenne":     { src: "/audio/cheyenne.mp3",    label: "Cheyenne",     instrument: "Banjo"              },
  "wakan-tanka":  { src: "/audio/wakan-tanka.mp3", label: "Wakan Tanka",  instrument: "Flûte & percussions"},
  "sequoia":      { src: "/audio/sequoia.mp3",     label: "Sequoia",      instrument: "Tam-tam doux"       },
  "newport":      { src: "/audio/newport.mp3",     label: "Newport",      instrument: "Piano classique"    },
  "new-york":     { src: "/audio/new-york.mp3",    label: "New York",     instrument: "Saxophone jazz"     },
  "royal-castle": { src: "/audio/royal-castle.mp3",label: "Royal Castle", instrument: "Harpe"              },
};
