import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Nous écrire · ELAYA Talismans",
  description: "Contactez ELAYA — pour toute question sur nos collections, vos commandes ou un message personnel.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />

      <div className="crumb">
        <Link href="/">Accueil</Link>
        <span>/</span>
        <span className="current">Nous écrire</span>
      </div>

      <header className="phead">
        <div className="phead__eyebrow"><span /> Contact</div>
        <h1>Nous <em>écrire.</em></h1>
        <p className="phead__sub">
          Une question sur une collection, une commande,<br />
          ou simplement l&apos;envie de nous dire bonjour —<br />
          nous vous lisons avec soin.
        </p>
      </header>

      <main className="contact">
        <ContactForm />
      </main>

      <Footer />
    </>
  );
}
