import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CollectionMapSection from "@/components/CollectionMapSection";

export const metadata = {
  title: "Maison · ELAYA Talismans",
  description:
    "L'histoire, la philosophie et les soins apportés à chaque talisman ELAYA.",
};

export default function MaisonPage() {
  return (
    <>
      <Nav />

      <div className="crumb">
        <Link href="/">Accueil</Link>
        <span>/</span>
        <span className="current">Maison</span>
      </div>

      <header className="phead">
        <div className="phead__eyebrow"><span /> La Maison ELAYA</div>
        <h1>La <em>Maison.</em></h1>
        <p className="phead__sub">
          Notre histoire, notre philosophie, et l&apos;attention que nous portons à chaque pièce.
        </p>
      </header>

      <nav className="subnav">
        <a href="#histoire">Histoire</a>
        <a href="#collections">Collections</a>
        <a href="#philosophie">Philosophie</a>
        <a href="#soins">Soins</a>
        <Link href="/journal">Journal</Link>
      </nav>

      <main className="editorial">
        <section id="histoire">
          <div className="editorial__label">Histoire</div>
          <h2>Comment est née <em>Elaya ?</em></h2>
          <p>
            Elaya est née d&apos;un besoin simple :<br />
            immortaliser un lieu, un souvenir, une sensation… et pouvoir les porter chaque jour.
          </p>
          <p>
            Il existe des lieux qui nous marquent.<br />
            Des instants suspendus.<br />
            Un désert au crépuscule.<br />
            Le vent des plaines.<br />
            L&apos;appel des grands espaces.<br />
            Le silence de la forêt.<br />
            L&apos;horizon marin.<br />
            La ville en mouvement.<br />
            Un château illuminé.
          </p>
          <p>
            Chaque collection ELAYA est l&apos;écho d&apos;un lieu qui nous a marqués. Chaque pièce, un fragment de cette mémoire — façonné pour durer.
          </p>
        </section>
      </main>

      {/* Carte des sept lieux — atlas interactif */}
      <CollectionMapSection />

      <div className="editorial">
        <section id="philosophie">
          <div className="editorial__label">Philosophie</div>
          <h2>À qui s&apos;adresse <em>ELAYA ?</em></h2>
          <p>
            Nous ne créons pas des accessoires. Nous façonnons des <em>talismans</em> — des objets qui portent une intention, une émotion, une histoire qui n&apos;appartient qu&apos;à celle qui les choisit.
          </p>
          <p>
            Entre délicatesse et caractère,<br />
            les sept collections Elaya accompagnent chaque facette d&apos;une femme :<br />
            <em>aventurière, audacieuse, spirituelle, naturelle, douce, lumineuse ou rêveuse.</em>
          </p>
        </section>

        <section id="soins">
          <div className="editorial__label">Soins</div>
          <h2>Que votre talisman <em>traverse le temps !</em></h2>
          <p>
            Nos bijoux sont conçus en <em>acier inoxydable de qualité</em> — un matériau qui ne s&apos;oxyde pas, ne ternit pas, et conserve son éclat dans le temps. Ils peuvent être portés au quotidien : sous la douche, à la mer, en voyage.
          </p>
          <p>
            Quelques gestes simples suffisent à préserver leur éclat : un essuyage doux après chaque port, un rangement à l&apos;abri de la lumière directe, et — de temps à autre — un nettoyage à l&apos;eau tiède savonneuse.
          </p>
        </section>
      </div>

      <Footer />
    </>
  );
}
