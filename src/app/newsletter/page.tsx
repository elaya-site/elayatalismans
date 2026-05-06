import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Star from "@/components/Star";

export const metadata = {
  title: "Newsletter · ELAYA Talismans",
  description: "La lettre ELAYA arrive bientôt.",
};

export default function NewsletterPage() {
  return (
    <>
      <Nav />

      <main className="soon">
        <div className="soon__inner">
          <div className="soon__star">
            <Star size={13} />
          </div>
          <div className="soon__eyebrow">Newsletter</div>
          <h1 className="soon__title">
            Bientôt<br /><em>la lettre ELAYA.</em>
          </h1>
          <p className="soon__body">
            Une lettre rare, douce et inspirée —<br />
            pour découvrir les nouvelles collections,<br />
            les histoires de talismans et les éclats de saison.
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
