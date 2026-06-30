import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export const metadata = {
  title: "Soldes Été — ELAYA Talismans | Bijoux bohème jusqu'à −30 %",
  description: "Profitez des soldes d'été sur une sélection de bijoux ELAYA Talismans — colliers, bracelets, boucles d'oreilles et bagues en acier inoxydable doré à −30 %.",
};

export default function SoldesPage() {
  const saleProducts = products.filter((p) => p.salePrice && p.ready);

  return (
    <>
      <Nav />
      <div className="soldes-hero">
        <div className="soldes-hero__eyebrow">Soldes d'été 2026</div>
        <h1 className="soldes-hero__title">Une sélection <em>à saisir.</em></h1>
        <p className="soldes-hero__sub">−30 % sur {saleProducts.length} talismans — édition limitée.</p>
      </div>

      <section style={{ padding: "0 clamp(20px, 5vw, 80px) 80px" }}>
        <div className="grid-stagger">
          {saleProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
