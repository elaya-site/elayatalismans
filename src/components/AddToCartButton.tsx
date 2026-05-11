"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

type Props = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export default function AddToCartButton({ id, name, price, image }: Props) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleAddToCart() {
    add({ id, name, price, image });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  async function handleBuyNow() {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id, name, price, image, quantity: 1 }] }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else setLoading(false);
  }

  return (
    <div className="detail__cta-group">
      <button className="detail__cta" type="button" onClick={handleAddToCart}>
        {added ? "✓ Ajouté" : "Ajouter au panier"}
      </button>
      <button className="detail__cta-express" type="button" onClick={handleBuyNow} disabled={loading}>
        {loading ? "…" : "Acheter maintenant"}
      </button>
    </div>
  );
}
