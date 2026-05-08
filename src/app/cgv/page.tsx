import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Conditions générales de vente · ELAYA Talismans",
  description: "Conditions générales de vente d'ELAYA Talismans.",
};

export default function CgvPage() {
  return (
    <>
      <Nav />
      <div className="crumb">
        <Link href="/">Accueil</Link>
        <span>/</span>
        <span className="current">CGV</span>
      </div>
      <header className="phead">
        <div className="phead__eyebrow"><span /> Informations légales</div>
        <h1>Conditions générales <em>de vente.</em></h1>
      </header>
      <div className="editorial">
        <section>
          <div className="editorial__label">Objet</div>
          <p>
            Les présentes conditions générales de vente s&apos;appliquent à toutes les ventes conclues sur le site elayatalismans.com entre ELAYA Talismans (Laura Daydie, auto-entrepreneur, SIRET 831 429 626 00011) et tout client.
          </p>
        </section>

        <section>
          <div className="editorial__label">Prix</div>
          <p>
            Les prix sont indiqués en euros, toutes taxes comprises. ELAYA Talismans se réserve le droit de modifier ses prix à tout moment, étant entendu que le prix applicable est celui en vigueur au moment de la commande.
          </p>
        </section>

        <section>
          <div className="editorial__label">Commandes</div>
          <p>
            Toute commande vaut acceptation des prix et des descriptions des produits proposés. ELAYA Talismans se réserve le droit d&apos;annuler toute commande en cas d&apos;indisponibilité du produit, après en avoir informé le client.
          </p>
        </section>

        <section>
          <div className="editorial__label">Livraison</div>
          <p>
            Les commandes sont expédiées dans un délai de 3 à 5 jours ouvrés après confirmation du paiement. Les délais de livraison varient selon la destination. ELAYA Talismans ne saurait être tenu responsable des retards imputables au transporteur.
          </p>
        </section>

        <section>
          <div className="editorial__label">Droit de rétractation</div>
          <p>
            Conformément à la législation française, vous disposez d&apos;un délai de <em>14 jours</em> à compter de la réception de votre commande pour exercer votre droit de rétractation, sans justification. Les frais de retour sont à la charge du client. Le remboursement sera effectué dans les 14 jours suivant la réception du retour.
          </p>
          <p>
            Pour exercer ce droit, contactez-nous à <strong>contact@elayatalismans.com</strong>.
          </p>
        </section>

        <section>
          <div className="editorial__label">Garanties</div>
          <p>
            Tous nos bijoux bénéficient de la garantie légale de conformité (2 ans) et de la garantie contre les vices cachés, conformément aux articles L.217-4 et suivants du Code de la consommation.
          </p>
        </section>

        <section>
          <div className="editorial__label">Litiges</div>
          <p>
            En cas de litige, une solution amiable sera recherchée avant toute action judiciaire. À défaut, les tribunaux français seront seuls compétents.
          </p>
          <p>
            Vous pouvez également recourir à la médiation en ligne via la plateforme européenne :{" "}
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="inline">
              ec.europa.eu/consumers/odr
            </a>.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}
