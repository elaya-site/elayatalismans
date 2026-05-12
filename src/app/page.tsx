import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Star from "@/components/Star";
import HeroParallax from "@/components/HeroParallax";
import Reveal from "@/components/Reveal";
import BrandGhostLogo from "@/components/BrandGhostLogo";
import CollectionSequence from "@/components/CollectionSequence";
import NewsletterForm from "@/components/NewsletterForm";

export default function HomePage() {
  return (
    <>
      <Nav />

      <HeroParallax>
        <div className="hero__media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/santa-fe-hero.png" alt="" />
        </div>
        <div className="hero__veil" />
        <div className="hero__chrome">
          <div className="hero__brand fade-up delay-1">
            <span><Star size={11} /> ELAYA <Star size={11} /></span>
          </div>
          <div className="hero__center">
            <div className="hero__tag fade-up delay-3">
              <em>Des bijoux</em><br />
              inspirés de lieux<br />
              et d&apos;instants.
            </div>
          </div>
          <div className="hero__foot hero__foot--center">
            <a href="#histoire" className="hero__cta fade-up delay-5">
              <span>Découvrir</span>
              <span className="line" />
            </a>
          </div>
        </div>
      </HeroParallax>

      {/* Manifesto + triptych */}
      <Reveal as="section" className="intro" id="histoire" threshold={0.1}>
        <div className="intro__manifesto">
          <div className="intro__star fade-up"><Star size={14} /></div>
          <div className="intro__quote fade-up delay-1">
            Il existe des lieux qui nous marquent.<br />
            Des instants <em>suspendus.</em><br />
            ELAYA en fait des <em>talismans</em><br />— à porter chaque jour.
          </div>
        </div>
        <div className="intro__triptych">
          <div className="intro__block fade-up delay-1">
            <h3 className="intro__heading">Comment est née <em>ELAYA</em> ?</h3>
            <div className="intro__body">
              ELAYA est née d&apos;un besoin simple :<br />
              immortaliser un lieu, un souvenir, une sensation…<br />
              <em>et pouvoir les porter chaque jour.</em>
            </div>
          </div>
          <div className="intro__block fade-up delay-2">
            <h3 className="intro__heading">À qui s&apos;adresse <em>ELAYA</em> ?</h3>
            <div className="intro__body">
              À celles qui souhaitent porter plus qu&apos;un bijou :<br />
              <em>une histoire, la leur.</em>
            </div>
          </div>
          <div className="intro__block fade-up delay-3">
            <h3 className="intro__heading">Pourquoi choisir <em>ELAYA</em> ?</h3>
            <div className="intro__body">
              Des bijoux qui ont du sens,<br />
              <em>pas seulement du style.</em>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Collections — séquence éditoriale alternée */}
      <CollectionSequence />

      {/* Talisman editorial line */}
      <Reveal as="section" className="talisman" threshold={0.3}>
        {/* Signature de maison — trace fantomatique du logo ELAYA */}
        <BrandGhostLogo variant="default" position="center" intensity="low" />
        <div className="talisman__text fade-up">
          Un bijou ne se porte pas.<br />
          Il <em>se reconnaît.</em>
        </div>
        <div className="talisman__sig fade-up delay-1">— ELAYA, depuis Paris</div>
      </Reveal>

      {/* Newsletter — 10% de bienvenue */}
      <section className="nl-section">
        <div className="nl-inner">
          <div className="nl-star"><Star size={12} /></div>
          <div className="nl-eyebrow">Offre de bienvenue</div>
          <h2 className="nl-title"><em>10% offerts</em><br />sur votre première commande.</h2>
          <p className="nl-body">
            Inscrivez-vous et recevez votre code promo exclusif — immédiatement.
          </p>
          <NewsletterForm />
        </div>
      </section>

      <Footer />
    </>
  );
}
