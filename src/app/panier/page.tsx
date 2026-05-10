"use client";

import { useCart } from "@/context/CartContext";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";

export default function PanierPage() {
  const { items, remove, update, total, clear } = useCart();
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else setLoading(false);
  }

  return (
    <>
      <Nav />
      <div className="crumb">
        <Link href="/">Accueil</Link>
        <span>/</span>
        <span className="current">Panier</span>
      </div>

      <main className="cart">
        <h1 className="cart__title">Mon <em>panier.</em></h1>

        {items.length === 0 ? (
          <div className="cart__empty">
            <p>Votre panier est vide.</p>
            <Link href="/" className="cart__back">Découvrir les collections →</Link>
          </div>
        ) : (
          <>
            <ul className="cart__list">
              {items.map((item) => (
                <li key={item.id} className="cart__item">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.name} className="cart__img" />
                  <div className="cart__info">
                    <div className="cart__name">{item.name}</div>
                    <div className="cart__price">€{item.price}</div>
                  </div>
                  <div className="cart__qty">
                    <button onClick={() => update(item.id, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => update(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button className="cart__remove" onClick={() => remove(item.id)}>✕</button>
                </li>
              ))}
            </ul>

            <div className="cart__footer">
              <div className="cart__total">
                <span>Total</span>
                <span>€{total.toFixed(2)}</span>
              </div>
              {total >= 80 && (
                <p className="cart__shipping-free">🎁 Livraison offerte !</p>
              )}
              <button
                className="cart__cta"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? "Redirection…" : "Passer commande →"}
              </button>
              <button className="cart__clear" onClick={clear}>Vider le panier</button>
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
