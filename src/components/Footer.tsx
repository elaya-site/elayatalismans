import Link from "next/link";
import { collections } from "@/data/collections";

export default function Footer() {
  return (
    <footer className="foot">
      <div className="foot__top">
        <div>
          <div className="foot__brand">ELAYA</div>
          <div className="foot__tag">
            Des bijoux inspirés de lieux et d&apos;instants.<br />
            Talismans en édition limitée.
          </div>
        </div>
        <div className="foot__col">
          <h4>Collections</h4>
          <ul>
            {collections.map((c) => (
              <li key={c.id}>
                <Link href={`/collections/${c.id}`}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="foot__col">
          <h4>Maison</h4>
          <ul>
            <li><Link href="/maison#histoire">Histoire</Link></li>
            <li><Link href="/maison#philosophie">Philosophie</Link></li>
            <li><Link href="/maison#soins">Soins</Link></li>
            <li><Link href="/journal">Journal</Link></li>
          </ul>
        </div>
        <div className="foot__col">
          <h4>Contact</h4>
          <ul>
            <li><Link href="/contact">Nous écrire</Link></li>
            <li><a href="https://www.instagram.com/elaya.talismans/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://www.facebook.com/profile.php?id=61576732449496" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><Link href="/newsletter">Newsletter</Link></li>
          </ul>
        </div>
      </div>
      <div className="foot__bottom">
        <div>© ELAYA Talismans 2026</div>
        <div className="foot__legal">
          <Link href="/mentions-legales">Mentions légales</Link>
          <Link href="/cgv">CGV</Link>
          <Link href="/confidentialite">Confidentialité</Link>
        </div>
      </div>
    </footer>
  );
}
