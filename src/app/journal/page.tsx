import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Arrow from "@/components/Arrow";
import { journalEntries } from "@/data/journal";

export const metadata = {
  title: "Journal · ELAYA Talismans",
  description:
    "Lectures pour celles qui se reconnaissent dans nos talismans : histoires de lieux, inspirations, symbolique.",
};

export default function JournalPage() {
  return (
    <>
      <Nav />

      <div className="crumb">
        <Link href="/">Accueil</Link>
        <span>/</span>
        <Link href="/maison">Maison</Link>
        <span>/</span>
        <span className="current">Journal</span>
      </div>

      <header className="phead">
        <div className="phead__eyebrow"><span /> Journal</div>
        <h1>Le <em>Journal.</em></h1>
        <p className="phead__sub">Lectures pour celles qui se reconnaissent dans nos talismans.</p>
      </header>

      <nav className="subnav">
        <Link href="/maison#histoire">Histoire</Link>
        <Link href="/maison#philosophie">Philosophie</Link>
        <Link href="/maison#soins">Soins</Link>
        <Link href="/journal" className="is-active">Journal</Link>
      </nav>

      <main className="editorial">
        <div className="journal__list" style={{ borderTop: "1px solid var(--line-soft)" }}>
          {journalEntries.map((e) => (
            <Link key={e.num} href={e.href} className="journal__item">
              <div className="journal__num">{e.num}</div>
              <div>
                <div className="journal__title">{e.title}</div>
                <div className="journal__sub">{e.sub}</div>
              </div>
              <div className="journal__arrow"><Arrow /></div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
