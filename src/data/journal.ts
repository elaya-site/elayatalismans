export type JournalEntry = {
  num: string;
  title: string;
  sub: string;
  href: string;
};

export const journalEntries: JournalEntry[] = [
  { num: "I", title: "Comment choisir son talisman", sub: "Trouver le bijou qui vous reconnaît plutôt que celui qui vous habille.", href: "#" },
  { num: "II", title: "Les sept énergies ELAYA", sub: "Sept collections, sept lieux, sept manières d'être au monde.", href: "#" },
  { num: "III", title: "Pourquoi porter un bijou symbolique", sub: "Un objet d'intention, pas un accessoire.", href: "#" },
  { num: "IV", title: "Santa Fe : l'appel du désert", sub: "Une collection née d'un coucher de soleil sur la mesa.", href: "#" },
  { num: "V", title: "Le pouvoir des lieux", sub: "Pourquoi certains endroits ne nous quittent jamais.", href: "#" },
  { num: "VI", title: "Bijoux et émotions", sub: "Comment un bijou devient le repère d'un instant.", href: "#" },
  { num: "VII", title: "Peut-on porter plusieurs talismans ?", sub: "Superposer, mêler, accorder — la grammaire du multiple.", href: "#" },
  { num: "VIII", title: "Le bijou comme souvenir vivant", sub: "Quand l'objet devient mémoire, et la mémoire allure.", href: "#" },
];
