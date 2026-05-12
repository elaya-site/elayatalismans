import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import HeroParallax from "@/components/HeroParallax";
import Reveal from "@/components/Reveal";
import CollectionSignatureLayer from "@/components/CollectionSignatureLayer";
import ProductCard from "@/components/ProductCard";
import Reassurance from "@/components/Reassurance";
import Arrow from "@/components/Arrow";
import Emphasis from "@/components/Emphasis";
import CollectionVideoGrid from "@/components/CollectionVideoGrid";
import LazyVideo from "@/components/LazyVideo";
import Image from "next/image";
import BrandGhostLogo from "@/components/BrandGhostLogo";
import CollectionPictogram from "@/components/CollectionPictogram";
import { collections, getCollection } from "@/data/collections";
import { productsByCollection } from "@/data/products";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.id }));
}

const collectionKeywords: Record<string, string> = {
  "santa-fe":     "bijoux bohème western, bijoux désert doré, collier soleil femme, bijoux aventure, bijoux Nouveau-Mexique",
  "sequoia":      "bijoux nature bohème, bijoux forêt, collier arbre femme, bijoux zen, bijoux Californie",
  "cheyenne":     "bijoux Far West femme, bijoux liberté, bracelet western doré, bijoux audacieux, bijoux Wyoming",
  "newport":      "bijoux élégants femme, bijoux bord de mer, collier chic doré, bijoux raffinés, bijoux côtiers",
  "wakan-tanka":  "bijoux spirituels femme, bijoux amérindiens, bijoux totem, collier plume doré, bijoux Montana",
  "new-york":     "bijoux urbains femme, bijoux modernes tendance, collier graphique doré, bijoux city, bijoux New York",
  "royal-castle": "bijoux féeriques femme, bijoux délicats, collier étoile doré, bijoux romantiques, bijoux rêve",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) return {};
  return {
    title: `Collection ${c.name} — Bijoux bohème dorés | ELAYA Talismans`,
    description: `${c.power} Bijoux en acier inoxydable doré, résistants à l'eau, hypoallergéniques. Colliers, bracelets, boucles d'oreilles et bagues.`,
    keywords: `${collectionKeywords[c.id] ?? ""}, bijoux acier inoxydable, bijoux tendance femme, ELAYA talismans`,
    openGraph: {
      title: `Collection ${c.name} — ELAYA Talismans`,
      description: `${c.power} Bijoux dorés résistants, hypoallergéniques.`,
      images: c.heroImage ? [{ url: c.heroImage, alt: `Collection ${c.name} — ELAYA Talismans` }] : [],
    },
    alternates: { canonical: `https://www.elayatalismans.com/collections/${c.id}` },
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) notFound();

  const products = productsByCollection(c.id);

  // Collections marked `ready: false` get a graceful "à venir" template.
  if (!c.ready) {
    return (
      <>
        <Nav />
        <div className="crumb">
          <Link href="/">Accueil</Link>
          <span>/</span>
          <Link href="/#collections">Collections</Link>
          <span>/</span>
          <span className="current">{c.name}</span>
        </div>

        <HeroParallax className="hero hero--collection" parallax={0.25}>
          <div className="hero__media">
            <div className={`img ${c.bgClass ?? ""}`} style={{ width: "100%", height: "100%" }} />
          </div>
          <div className="hero__veil" />
          <div className="hero__chrome">
            {c.locationLabel && (
              <div className="hero__geo fade-up delay-2">{c.locationLabel}</div>
            )}
            <div className="hero__center">
              <h1 className="hero__title">
                <span className="reveal-line"><span>{c.name}</span></span>
              </h1>
              <div className="hero__rule fade-up delay-3" />
              <div className="hero__sub fade-up delay-3">{c.keyword}.</div>
            </div>
            <div className="hero__foot hero__foot--center">
              <div className="scroll fade-up delay-5">
                <span>Bientôt</span>
                <span className="line" />
              </div>
            </div>
          </div>
        </HeroParallax>

        <section className="closing" style={{ position: "relative", overflow: "hidden" }}>
          {/* Signature fantomatique même sur les collections "à venir" */}
          <BrandGhostLogo variant={c.id} position="center" intensity="low" />
          <div className="closing__line">
            La collection <em>{c.name}</em><br />arrivera bientôt.
          </div>
          <div className="closing__sig">— ELAYA, {c.location}</div>
        </section>

        <Footer />
      </>
    );
  }

  return (
    <div>
      <CollectionSignatureLayer collectionId={c.id} />
      <Nav
        links={[
          { href: "/", label: "Accueil" },
          { href: "#collections", label: "Talismans" },
          { href: "/maison", label: "Maison" },
          { href: "/journal", label: "Journal" },
        ]}
      />

      <HeroParallax className="hero hero--collection" parallax={0.25}>
        <div className="hero__media">
          {c.heroVideo ? (
            <LazyVideo src={c.heroVideo} eager />
          ) : c.heroImage ? (
            <Image src={c.heroImage} alt={`Collection ${c.name} — ELAYA Talismans`} fill style={{ objectFit: "cover" }} priority sizes="100vw" />
          ) : null}
        </div>
        <div className="hero__veil" />
        {/* Pictogramme signature — silhouette fine, bas-droite du hero */}
        <CollectionPictogram collectionId={c.id} placement="hero" />
        <div className="hero__chrome">
          {c.locationLabel && (
            <div className="hero__geo fade-up delay-2">{c.locationLabel}</div>
          )}
          <div className="hero__center">
            <h1 className="hero__title">
              <span className="reveal-line"><span>{c.name.split(" ")[0]}&nbsp;</span></span>
              <span className="reveal-line"><span className="it">{c.name.split(" ").slice(1).join(" ") || ""}</span></span>
            </h1>
            <div className="hero__rule fade-up delay-3" />
            <div className="hero__sub fade-up delay-3">{c.keyword}.</div>
          </div>
          <div className="hero__foot">
            {c.coords ? <div className="fade-up delay-4">{c.coords}</div> : <div />}
            <div className="scroll fade-up delay-5">
              <span className="line" />
            </div>
            <div className="fade-up delay-4" style={{ textAlign: "right" }}>
              {String(products.length).padStart(2, "0")} Talismans
            </div>
          </div>
        </div>
      </HeroParallax>

      {/* Editorial intro */}
      <Reveal as="section" className="intro intro--collection" id="univers" threshold={0.15}>
        {/* Pictogramme filigrane — arrière-plan discret de l'intro */}
        <CollectionPictogram collectionId={c.id} placement="watermark" />
        <div className="intro__inner">
          <div>
            <div className="intro__label fade-up">Univers · {c.name}</div>
            <h2 className="intro__title fade-up delay-1">
              <em>{c.introTitle ?? c.keyword + "."}</em>
            </h2>
          </div>
          <div className="intro__longbody fade-up delay-2">
            {(c.introCopy ?? []).map((p, i) => (
              <p key={i}><Emphasis text={p} breakBefore /></p>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Products */}
      <section className="products" id="collections">
        {/* Signature de maison — empreinte fantomatique, ambiance par collection */}
        <BrandGhostLogo variant={c.id} position="center" intensity="low" />
        <div className="products__head">
          <h2>Les <em>talismans</em><br />de {c.name}.</h2>
        </div>
        <div className="grid-stagger">
          {products.map((p, i) => (
            <ProductCard product={p} index={i} key={p.id} />
          ))}
        </div>
      </section>

      <Reassurance />

      {/* Grille vidéo unifiée */}
      <CollectionVideoGrid products={products} />

      <Footer />
    </div>
  );
}
