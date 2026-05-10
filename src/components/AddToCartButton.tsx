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

  function handleClick() {
    add({ id, name, price, image });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <button className="detail__cta" type="button" onClick={handleClick}>
      {added ? "✓ Ajouté au panier" : "Ajouter au panier"}
    </button>
  );
}
