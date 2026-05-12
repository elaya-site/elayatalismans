"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/data/products";

export default function ProductCard({ product, index }: { product: Product; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVis(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const num = String(index + 1).padStart(2, "0");
  const href = product.ready ? `/produits/${product.id}` : "#";

  return (
    <Link ref={ref} href={href} className={`pcard ${vis ? "is-visible" : ""}`}>
      <div className="pcard__media">
        <div className="pcard__index">№ {num}</div>
        <div className="pcard__corner"><span className="dot" /> Édition limitée</div>
        <div className="layer layer--still">
          <Image
            src={product.still}
            alt={`${product.name} — bijou femme doré`}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="layer layer--worn">
          <Image
            src={product.worn}
            alt={`${product.name} porté`}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="pcard__hint">Survoler — voir porté</div>
      </div>
      <div className="pcard__meta">
        <div>
          <div className="pcard__title">{product.name}</div>
          <div className="pcard__sub">{product.sub}</div>
        </div>
        <div className="pcard__price">{product.price}</div>
      </div>
      <div className="pcard__talisman">
        {product.talisman.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
      <div className="pcard__cta">
        Voir le talisman
        <svg viewBox="0 0 14 8" aria-hidden="true">
          <path d="M0 4 L13 4 M9 0 L13 4 L9 8" stroke="currentColor" fill="none" strokeWidth="1" />
        </svg>
      </div>
    </Link>
  );
}
