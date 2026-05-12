import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Star from "@/components/Star";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata = {
  title: "10% de réduction · Newsletter ELAYA Talismans",
  description: "Inscrivez-vous à la newsletter ELAYA et recevez immédiatement 10% de réduction sur votre première commande.",
};

export default function NewsletterPage() {
  return (
    <>
      <Nav />

      <main className="nl-page">
        <div className="nl-inner">

          <div className="nl-star">
            <Star size={13} />
          </div>

          <div className="nl-eyebrow">Offre de bienvenue</div>

          <h1 className="nl-title">
            <em>10% offerts</em><br />
            sur votre première commande.
          </h1>

          <p className="nl-body">
            Inscrivez-vous et recevez instantanément votre code promo exclusif.
            Découvrez aussi en avant-première les nouvelles collections
            et les histoires derrière chaque talisman.
          </p>

          <NewsletterForm />

        </div>
      </main>

      <Footer />
    </>
  );
}
