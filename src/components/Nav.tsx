"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Star from "./Star";
import { useCart } from "@/context/CartContext";

type NavLink = { href: string; label: string };

const DEFAULT_LINKS: NavLink[] = [
  { href: "/#collections", label: "Collections" },
  { href: "/soldes", label: "Soldes" },
  { href: "/maison", label: "Maison" },
  { href: "/journal", label: "Journal" },
];

export default function Nav({ links = DEFAULT_LINKS }: { links?: NavLink[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fermer le menu au scroll
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav className={`nav ${scrolled ? "is-scrolled" : ""}`}>
        {/* Liens desktop — cachés sur mobile */}
        <div className="nav__links">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
        </div>

        <Link href="/" className="nav__brand" aria-label="ELAYA — accueil">
          <Star size={9} /> ELAYA <Star size={9} />
        </Link>

        <div className="nav__right">
          <Link href="/panier" className="nav__cart">
            Panier
            {count > 0 && <span className="nav__cart-count">{count}</span>}
          </Link>
          {/* Burger — visible seulement sur mobile */}
          <button
            className="nav__burger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span className={`nav__burger-icon${menuOpen ? " open" : ""}`}>
              <span /><span /><span />
            </span>
          </button>
        </div>
      </nav>

      {/* Menu mobile overlay */}
      <div className={`nav__mobile${menuOpen ? " nav__mobile--open" : ""}`} onClick={() => setMenuOpen(false)}>
        <div className="nav__mobile-inner" onClick={(e) => e.stopPropagation()}>
          <div className="nav__mobile-brand"><Star size={9} /> ELAYA <Star size={9} /></div>
          <ul className="nav__mobile-links">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/panier" onClick={() => setMenuOpen(false)}>
                Panier {count > 0 && `(${count})`}
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
