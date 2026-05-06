"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Collection } from "@/data/collections";
import Arrow from "./Arrow";

export default function CollectionCard({ c, idx }: { c: Collection; idx: number }) {
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
      { threshold: 0.1 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <Link
      ref={ref}
      href={`/collections/${c.id}`}
      className={`col-card ${vis ? "is-visible" : ""}`}
      style={{ transitionDelay: `${(idx % 4) * 0.08}s` }}
    >
      <div className="col-card__media">
        <div className="col-card__media__num">№ {c.num}</div>
        {c.heroImage ? (
          <div className="img img--photo" style={{ backgroundImage: `url('${c.heroImage}')` }} />
        ) : (
          <div className={`img ${c.bgClass ?? ""}`} />
        )}
        <div className="col-card__overlay" />
      </div>
      <div className="col-card__caption">
        <div>
          <div className="col-card__name">{c.name}</div>
          <div className="col-card__keyword">{c.keyword}</div>
        </div>
        <div className="col-card__arrow"><Arrow /></div>
      </div>
    </Link>
  );
}
