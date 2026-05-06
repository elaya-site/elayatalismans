"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Star from "./Star";

type NavLink = { href: string; label: string };

const DEFAULT_LINKS: NavLink[] = [
  { href: "/#collections", label: "Collections" },
  { href: "/maison", label: "Maison" },
  { href: "/journal", label: "Journal" },
];

export default function Nav({ links = DEFAULT_LINKS }: { links?: NavLink[] }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav__links">
        {links.map((l) => (
          <Link key={l.href} href={l.href}>{l.label}</Link>
        ))}
      </div>
      <Link href="/" className="nav__brand" aria-label="ELAYA — accueil">
        <Star size={9} /> ELAYA <Star size={9} />
      </Link>
      <div className="nav__right">
        <a href="#">Recherche</a>
        <a href="#">Panier <span style={{ opacity: .6 }}>(0)</span></a>
      </div>
    </nav>
  );
}
