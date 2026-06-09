import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Star from "@/components/Star";
import { journalEntries } from "@/data/journal";

export function generateStaticParams() {
  return journalEntries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = journalEntries.find((e) => e.slug === slug);
  if (!entry) return {};
  return {
    title: `${entry.title} — Journal ELAYA Talismans`,
    description: entry.sub,
  };
}

export default async function JournalArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = journalEntries.find((e) => e.slug === slug);
  if (!entry) notFound();

  const currentIndex = journalEntries.findIndex((e) => e.slug === slug);
  const next = journalEntries[currentIndex + 1] ?? null;
  const prev = journalEntries[currentIndex - 1] ?? null;

  return (
    <>
      <Nav />

      <div className="crumb">
        <Link href="/">Accueil</Link>
        <span>/</span>
        <Link href="/journal">Journal</Link>
        <span>/</span>
        <span className="current">{entry.title}</span>
      </div>

      <article className="article">
        <header className="article__header">
          <div className="article__num">№ {entry.num}</div>
          <h1 className="article__title">{entry.title}</h1>
          <p className="article__sub">{entry.sub}</p>
          <div className="article__rule" />
        </header>

        <div className="article__body">
          {entry.body.map((section, i) => {
            if (section.type === "quote") {
              return (
                <blockquote key={i} className="article__quote">
                  <Star size={10} />
                  <p>{section.text}</p>
                </blockquote>
              );
            }
            if (section.type === "heading") {
              return <h2 key={i} className="article__heading">{section.text}</h2>;
            }
            return <p key={i} className="article__para">{section.text}</p>;
          })}
        </div>

        {/* Navigation entre articles */}
        <nav className="article__nav">
          {prev ? (
            <Link href={prev.href} className="article__nav-link article__nav-link--prev">
              <span className="article__nav-label">Article précédent</span>
              <span className="article__nav-title">{prev.title}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={next.href} className="article__nav-link article__nav-link--next">
              <span className="article__nav-label">Article suivant</span>
              <span className="article__nav-title">{next.title}</span>
            </Link>
          ) : <div />}
        </nav>
      </article>

      <Footer />
    </>
  );
}
