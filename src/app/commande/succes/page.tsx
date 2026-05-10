"use client";

import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function SuccesPage() {
  const { clear } = useCart();

  useEffect(() => {
    clear();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Nav />
      <main className="success">
        <div className="success__icon">✦</div>
        <h1>Commande <em>confirmée.</em></h1>
        <p>Merci pour votre confiance. Votre talisman sera préparé avec soin et expédié dans les 3 à 5 jours ouvrés.</p>
        <p>Un email de confirmation vous a été envoyé.</p>
        <Link href="/" className="success__back">Retour aux collections →</Link>
      </main>
      <Footer />
    </>
  );
}
