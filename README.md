# ELAYA Talismans — site Next.js 15

Site vitrine e-commerce premium pour la marque de bijoux **ELAYA TALISMANS**.
Porté pixel-près depuis le handoff `elaia/project/` (HTML/CSS/JSX prototypes).

## Stack

- Next.js 15 (App Router) + React 18
- TypeScript strict
- Tailwind CSS 3.4 (tokens uniquement — le design system principal vit dans `globals.css`)
- Polices Google Fonts : Cormorant Garamond + Inter
- Aucune dépendance lourde supplémentaire

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
npm run start    # servir le build
```

## Arborescence

```
src/
  app/
    layout.tsx                   # <html>, fonts, metadata
    globals.css                  # design system complet (tokens + composants CSS)
    page.tsx                     # Accueil
    collections/[slug]/page.tsx  # Page collection (Santa Fe complète, autres = "à venir")
    produits/[slug]/page.tsx     # Page produit (Kasha Katuwe complète)
    maison/page.tsx              # Histoire / Philosophie / Soins
    journal/page.tsx             # Index Journal
  components/
    Nav.tsx, Footer.tsx          # Layout shared
    HeroParallax.tsx             # Wrapper hero (parallax + reveal cascade)
    Reveal.tsx                   # IntersectionObserver helper
    GoldenDust.tsx               # Signature Santa Fe
    CollectionCard.tsx           # Carte collection homepage
    ProductCard.tsx              # Carte produit (hover seul/porté)
    Reassurance.tsx              # Bloc réassurance partagé
    Star.tsx, Arrow.tsx          # Icônes inline
    Emphasis.tsx                 # Parse `*…*` → <em> dans les chaînes
  data/
    collections.ts               # Les 7 collections
    products.ts                  # Produits Santa Fe (extensible)
    journal.ts                   # Articles Journal
public/
  assets/
    santa-fe-hero.png, home-hero.png, elaya-logo.png
    products/                    # Photos still + worn
    video/                       # Vidéos hero + immersives + bijoux seuls
```

## Pages livrées (Priorité 1)

- ✅ `/` — Hero + manifesto + triptych + grille 7 collections (4+3) + bloc Talisman + extrait Journal
- ✅ `/collections/santa-fe` — Hero vidéo, intro éditoriale, 4 produits en mosaïque, réassurance, video strip
- ✅ `/collections/{cheyenne,wakan-tanka,sequoia,newport,new-york,royal-castle}` — template "à venir" propre
- ✅ `/produits/kasha-katuwe` — Page produit complète (immersive intro vidéo, talisman poétique, galerie, détails, CTA, closing)
- ✅ `/maison` — Histoire / Philosophie / Soins
- ✅ `/journal` — Index 8 articles (placeholders propres, prêts à recevoir des pages)
- ✅ Footer global + Nav fixe scroll-aware

## Pour ajouter du contenu

### Activer une nouvelle collection
1. Ouvrir `src/data/collections.ts`
2. Mettre `ready: true`
3. Renseigner `heroImage` ou `heroVideo`, `coords`, `introTitle`, `introCopy[]`
4. Ajouter ses produits dans `src/data/products.ts`
   → la page `/collections/<id>` s'active automatiquement.

### Activer une page produit complète
1. Dans `src/data/products.ts`, mettre `ready: true`
2. Renseigner `heroName`, `talismanLong[]`, `details[]`, `closing[]`, `video`
   → la route `/produits/<id>` est générée au build.

### Mettre à jour les tokens visuels
Tout est dans `:root` au début de `src/app/globals.css` (couleurs, polices).
Modifier 1 valeur retheme l'ensemble du site.

## Priorités V2 (à faire dans une session suivante)

- Animations signatures par collection (au-delà de Santa Fe)
- Pages produits complètes pour Rio Grande / Canyon Road / Chimayo
- Pages détaillées Histoire / Philosophie / Soins (actuellement regroupées dans /maison)
- Articles de journal individuels (`/journal/[slug]`)
- Newsletter functional
- Drawer panier + checkout (Stripe / Shopify)
- CMS (recommandé : Sanity) pour découpler le contenu du code
- Sons d'ambiance par collection (toggle utilisateur, opt-in)

## Déployer sur Vercel

```bash
npx vercel
```

Aucune variable d'environnement requise pour la V1. Les vidéos sont servies depuis `/public/assets/video/` — pour des fichiers > 10 Mo, envisager un CDN (Mux, Cloudflare Stream, Vercel Blob).

## Notes de fidélité

- Le design est une transposition fidèle des prototypes HTML/JSX du handoff.
- Toutes les images / vidéos viennent de `elaia/project/uploads/` et `elaia/project/assets/`.
- Aucune donnée produit n'a été inventée : prix, descriptions, dimensions sont ceux du handoff. Les champs absents sont marqués "à confirmer" dans les types.
