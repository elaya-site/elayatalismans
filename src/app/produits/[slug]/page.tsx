import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import GoldenDust from "@/components/GoldenDust";
import Reassurance from "@/components/Reassurance";
import Emphasis from "@/components/Emphasis";
import Star from "@/components/Star";
import Arrow from "@/components/Arrow";
import StockAlertForm from "@/components/StockAlertForm";
import LazyVideo from "@/components/LazyVideo";
import ProductReviews from "@/components/ProductReviews";
import AddToCartButton from "@/components/AddToCartButton";
import { products, getProduct } from "@/data/products";
import { getCollection } from "@/data/collections";
import { reviewsByProduct } from "@/data/reviews";

export function generateStaticParams() {
  return products.filter((p) => p.ready).map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  const typeLabel: Record<string, string> = {
    collier: "collier femme bohème doré",
    bracelet: "bracelet femme doré",
    boucles: "boucles d'oreilles femme tendance",
    bague: "bague femme acier doré",
    pince: "pince à cheveux dorée",
    barrette: "barrette cheveux dorée",
  };
  const label = typeLabel[p.type] ?? "bijou femme doré";
  return {
    title: `${p.name} — ${label} | ELAYA Talismans`,
    description: `${p.talisman.join(" ")} ${p.name} en acier inoxydable doré — résistant à l'eau, hypoallergénique, ne ternit pas. ${p.price}.`,
    keywords: `${p.name}, ${label}, bijoux bohème, bijoux acier inoxydable, bijoux tendance femme, bijoux résistants eau, bijoux hypoallergéniques, ELAYA talismans`,
    openGraph: {
      title: `${p.name} — ELAYA Talismans`,
      description: p.talisman.join(" "),
      images: [{ url: p.still, alt: p.name }],
    },
    alternates: { canonical: `https://www.elayatalismans.com/produits/${p.id}` },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p || !p.ready) notFound();
  const c = getCollection(p.collectionId);
  if (!c) notFound();

  const isSantaFe = c.id === "santa-fe";
  const productReviews = reviewsByProduct(p.id);
  const heroNameLines = (p.heroName ?? p.name).split("\n");

  const priceNum = parseInt(p.price.replace("€", "").trim());
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: p.name,
    description: p.talisman.join(" "),
    image: `https://www.elayatalismans.com${p.still}`,
    brand: { "@type": "Brand", name: "ELAYA Talismans" },
    offers: {
      "@type": "Offer",
      url: `https://www.elayatalismans.com/produits/${p.id}`,
      priceCurrency: "EUR",
      price: priceNum,
      availability: (p.inStock ?? true) ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: { "@type": "MonetaryAmount", value: "3.90", currency: "EUR" },
        shippingDestination: { "@type": "DefinedRegion", addressCountry: "FR" },
      },
    },
    material: "Acier inoxydable doré",
  };

  return (
    <div className={isSantaFe ? "page-santa-fe" : ""}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {isSantaFe && <GoldenDust />}
      <Nav
        links={[
          { href: "/", label: "Accueil" },
          { href: `/collections/${c.id}`, label: c.name },
          { href: "/maison", label: "Maison" },
          { href: "/journal", label: "Journal" },
        ]}
      />

      <div className="crumb">
        <Link href="/">Maison</Link>
        <span>/</span>
        <Link href={`/collections/${c.id}`}>{c.name}</Link>
        <span>/</span>
        <span className="current">{p.name.replace(/^(Collier|Bracelet|Boucles|Bague)\s/, "")}</span>
      </div>

      {/* Immersive intro */}
      <section className="pintro is-revealed">
        <div className={`pintro__media${p.id === "kasha-katuwe" ? " pintro__media--crop" : ""}`}>
          {p.video ? <LazyVideo src={p.video} eager /> : null}
        </div>
        <div className="pintro__veil" />
        <div className="pintro__chrome">
          <div className="pintro__eyebrow fade-up delay-1">
            <span className="sep" />
            Talisman № {p.num} · {c.name}
          </div>
          <h1 className="pintro__name fade-up delay-2">
            {heroNameLines.map((line, i) => (
              <span key={i}>
                {i === 0 ? <em>{line}</em> : line}
                {i < heroNameLines.length - 1 ? <br /> : "."}
              </span>
            ))}
          </h1>
        </div>
      </section>

      {/* Talisman poetic */}
      <Reveal as="section" className="ptalisman" threshold={0.2}>
        <div className="ptalisman__star fade-up"><Star size={14} /></div>
        <div className="ptalisman__text fade-up delay-1">
          {(p.talismanLong ?? p.talisman).map((line, i, arr) => (
            <span key={i}>
              <Emphasis text={line} />
              {i < arr.length - 1 ? <br /> : null}
            </span>
          ))}
        </div>
        <div className="ptalisman__rule" />
      </Reveal>

      {/* Gallery */}
      <section className="gallery">
        <div className="gallery__grid">
          <div className="gallery__cell">
            <div className="gallery__index">№ 01 · Seul</div>
            <Image
              src={p.still}
              alt={`${p.name} — bijou en acier inoxydable doré`}
              width={800}
              height={1000}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="gallery__caption">Le talisman, en lumière naturelle.</div>
          </div>
          <div className="gallery__cell gallery__cell--worn">
            <div className="gallery__index">№ 02 · Porté</div>
            <Image
              src={p.worn}
              alt={`${p.name} porté — collier bracelet boucles femme`}
              width={800}
              height={1000}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="gallery__caption">Porté chaque jour — comme un souvenir.</div>
          </div>
        </div>
      </section>

      {/* Details + price/CTA */}
      <section className="detail">
        <div className="detail__grid">
          <div className="detail__col">
            <div className="detail__label">Détails</div>
            <h3>Façonné pour <em>durer.</em></h3>
            <ul className="detail__list">
              <li><dt>Matière</dt><dd>Acier inoxydable doré</dd></li>
              <li><dt>Résistance</dt><dd>Eau, sport, quotidien</dd></li>
              <li><dt>Entretien</dt><dd>Hypoallergénique · ne ternit pas</dd></li>
            </ul>
          </div>
          <div className="detail__col">
            <div className="detail__label">Le talisman</div>
            {(() => {
              const m = p.name.match(/^(Collier|Bracelet|Boucles|Bague)\s+(.+)$/);
              const prefix = m?.[1] ?? "";
              const rest = m?.[2] ?? p.name;
              return <h3>{prefix} <em>{rest}.</em></h3>;
            })()}
            <div className="detail__price">{p.price}</div>

            {(p.inStock ?? true) ? (
              /* ── En stock ── */
              <>
                <div className="detail__priceSub">— ou 3 fois sans frais.</div>
                <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                  <AddToCartButton
                    id={p.id}
                    name={p.name}
                    price={parseInt(p.price.replace("€", ""))}
                    image={p.still}
                  />
                  <a href="#" className="detail__ctaGhost">
                    Garder en mémoire
                    <Arrow width={14} height={8} />
                  </a>
                </div>
                <div className="detail__shipping">
                  Expédition offerte dès 80€ — emballage cadeau soigné.<br />
                  Retours libres sous 30 jours.
                </div>
                <div className="detail__secure">
                  <span>🔒 Paiement sécurisé</span>
                  <span>· Visa · Mastercard · CB</span>
                </div>
              </>
            ) : (
              /* ── Rupture de stock ── */
              <StockAlertForm productId={p.id} productName={p.name} />
            )}
          </div>
        </div>
      </section>

      <Reassurance />

      {/* Avis clients */}
      <ProductReviews productId={p.id} productName={p.name} reviews={productReviews} />

      {/* Closing */}
      <Reveal as="section" className="closing" threshold={0.2}>
        <div className="closing__line fade-up">
          {(p.closing ?? []).map((line, i, arr) => (
            <span key={i}>
              <Emphasis text={line} />
              {i < arr.length - 1 ? <br /> : null}
            </span>
          ))}
        </div>
        <div className="closing__sig fade-up delay-2">— ELAYA, {c.name} № {p.num}</div>
      </Reveal>

      <Footer />
    </div>
  );
}
