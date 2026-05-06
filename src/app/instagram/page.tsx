import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Star from "@/components/Star";

export const metadata = {
  title: "Instagram · ELAYA Talismans",
  description: "L'univers ELAYA arrive bientôt sur Instagram.",
};

export default function InstagramPage() {
  return (
    <>
      <Nav />

      <main className="soon">
        <div className="soon__inner">
          <div className="soon__star">
            <Star size={13} />
          </div>
          <div className="soon__eyebrow">Instagram</div>
          <h1 className="soon__title">
            Bientôt sur<br /><em>Instagram.</em>
          </h1>
          <p className="soon__body">
            L&apos;univers ELAYA se prépare doucement.<br />
            Retrouvez bientôt nos talismans, nos collections<br />
            et nos inspirations en images.
          </p>
          <Link href="/" className="soon__back">
            <span className="soon__back-line" />
            <span>Retour à l&apos;accueil</span>
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
