import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Mentions légales · ELAYA Talismans",
  description: "Mentions légales du site elayatalismans.com",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <Nav />
      <div className="crumb">
        <Link href="/">Accueil</Link>
        <span>/</span>
        <span className="current">Mentions légales</span>
      </div>
      <header className="phead">
        <div className="phead__eyebrow"><span /> Informations légales</div>
        <h1>Mentions <em>légales.</em></h1>
      </header>
      <div className="editorial">
        <section>
          <div className="editorial__label">Éditeur du site</div>
          <p><strong>Nom :</strong> Laura Daydie</p>
          <p><strong>Statut :</strong> Auto-entrepreneur</p>
          <p><strong>SIRET :</strong> 831 429 626 00011</p>
          <p><strong>Adresse :</strong> Lescar, 64230, France</p>
          <p><strong>Email :</strong> contact@elayatalismans.com</p>
        </section>

        <section>
          <div className="editorial__label">Hébergement</div>
          <p><strong>Hébergeur :</strong> Vercel Inc.</p>
          <p><strong>Adresse :</strong> 340 Pine Street, Suite 800, San Francisco, CA 94104, États-Unis</p>
          <p><strong>Site :</strong> vercel.com</p>
        </section>

        <section>
          <div className="editorial__label">Propriété intellectuelle</div>
          <p>
            L&apos;ensemble du contenu de ce site (textes, photographies, visuels, logo) est la propriété exclusive d&apos;ELAYA Talismans.
            Toute reproduction, même partielle, est strictement interdite sans autorisation préalable.
          </p>
        </section>

        <section>
          <div className="editorial__label">Responsabilité</div>
          <p>
            ELAYA Talismans s&apos;efforce d&apos;assurer l&apos;exactitude des informations diffusées sur ce site.
            Toutefois, nous ne saurions être tenus responsables des erreurs ou omissions, ni des dommages directs ou indirects résultant de l&apos;utilisation de ce site.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}
