import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Politique de confidentialité · ELAYA Talismans",
  description: "Politique de confidentialité et protection des données personnelles d'ELAYA Talismans.",
};

export default function ConfidentialitePage() {
  return (
    <>
      <Nav />
      <div className="crumb">
        <Link href="/">Accueil</Link>
        <span>/</span>
        <span className="current">Confidentialité</span>
      </div>
      <header className="phead">
        <div className="phead__eyebrow"><span /> RGPD</div>
        <h1>Politique de <em>confidentialité.</em></h1>
      </header>
      <div className="editorial">
        <section>
          <div className="editorial__label">Responsable du traitement</div>
          <p>
            Laura Daydie — ELAYA Talismans<br />
            Lescar, 64230, France<br />
            contact@elayatalismans.com
          </p>
        </section>

        <section>
          <div className="editorial__label">Données collectées</div>
          <p>
            Lors de l&apos;utilisation de notre formulaire de contact, nous collectons les informations que vous nous transmettez volontairement : nom, prénom, adresse email, et contenu du message.
          </p>
          <p>
            Ces données sont utilisées uniquement pour répondre à votre demande. Elles ne sont ni vendues, ni cédées à des tiers.
          </p>
        </section>

        <section>
          <div className="editorial__label">Durée de conservation</div>
          <p>
            Vos données sont conservées pendant une durée maximale de 3 ans à compter de notre dernier échange, puis supprimées.
          </p>
        </section>

        <section>
          <div className="editorial__label">Vos droits</div>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
          </p>
          <p>
            <em>Droit d&apos;accès, de rectification, de suppression, d&apos;opposition et de portabilité</em> de vos données.
          </p>
          <p>
            Pour exercer ces droits, contactez-nous à <strong>contact@elayatalismans.com</strong>.
            Vous pouvez également introduire une réclamation auprès de la CNIL (cnil.fr).
          </p>
        </section>

        <section>
          <div className="editorial__label">Cookies</div>
          <p>
            Ce site n&apos;utilise pas de cookies de tracking ou publicitaires. Des cookies techniques essentiels au bon fonctionnement du site peuvent être déposés.
          </p>
        </section>

        <section>
          <div className="editorial__label">Hébergement</div>
          <p>
            Ce site est hébergé par Vercel Inc. (États-Unis). Les données transmises via le formulaire de contact sont acheminées via Resend (service d&apos;envoi d&apos;emails), dans le respect des réglementations en vigueur.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}
