export type Review = {
  id: string;
  productId: string;
  author: string;
  rating: number; // 1–5
  text: string;
  date: string;
};

/** Avis approuvés — à compléter manuellement après validation par email. */
export const reviews: Review[] = [
  /* Exemple — à supprimer ou garder comme modèle :
  {
    id: "1",
    productId: "calamity-jane",
    author: "Sophie M.",
    rating: 5,
    text: "Magnifique collier, exactement comme sur les photos. Je l'ai reçu en 3 jours dans un emballage soigné.",
    date: "2026-04-12",
  },
  */
];

export function reviewsByProduct(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId);
}

export function averageRating(productId: string): number {
  const r = reviewsByProduct(productId);
  if (!r.length) return 0;
  return r.reduce((sum, r) => sum + r.rating, 0) / r.length;
}
