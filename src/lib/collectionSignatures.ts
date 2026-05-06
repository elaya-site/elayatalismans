import type { CollectionId } from "@/data/collections";

export type SignatureType =
  | "particles-sand"
  | "dust-wind"
  | "heat-glow"
  | "light-rays"
  | "water-reflection"
  | "light-flicker"
  | "sparkles-soft";

export type CollectionSignature = {
  type:          SignatureType;
  intensity:     number;   // max opacity reached by each particle
  particleCount: number;
  color:         string;   // rgba base color
};

export const collectionSignatures: Record<CollectionId, CollectionSignature> = {
  "santa-fe":     { type: "particles-sand",   intensity: 0.18, particleCount: 28, color: "rgba(212,175,55,0.92)" },
  "cheyenne":     { type: "dust-wind",        intensity: 0.15, particleCount: 32, color: "rgba(188,98,46,1)" },
  "wakan-tanka":  { type: "heat-glow",        intensity: 0.14, particleCount: 24, color: "rgba(248,128,48,1)" },
  "sequoia":      { type: "light-rays",       intensity: 0.13, particleCount:  8, color: "rgba(170,215,130,1)" },
  "newport":      { type: "water-reflection", intensity: 0.12, particleCount: 22, color: "rgba(210,228,242,1)" },
  "new-york":     { type: "light-flicker",    intensity: 0.11, particleCount: 20, color: "rgba(225,205,160,1)" },
  "royal-castle": { type: "sparkles-soft",    intensity: 0.14, particleCount: 18, color: "rgba(215,205,255,1)" },
};
