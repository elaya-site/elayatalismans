/**
 * CollectionGallery — editorial mosaic of 7 collection illustrations.
 * Used on the Maison page between Histoire and the interactive map.
 * Layout: 2-column grid, last item full-width.
 * Server component — zero client JS.
 */

import Link from "next/link";
import { collections } from "@/data/collections";
import Reveal from "@/components/Reveal";

export default function CollectionGallery() {
  return (
    <Reveal as="section" className="cgal" threshold={0.08}>
      <div className="cgal__grid">
        {collections.map((c, i) => {
          const isLast = i === collections.length - 1;
          return (
            <Link
              key={c.id}
              href={`/collections/${c.id}`}
              className={`cgal__item${isLast ? " cgal__item--full" : ""} fade-up`}
              style={{ animationDelay: `${(i % 4) * 80}ms` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.heroImage ?? `/assets/${c.id}-banner.png`}
                alt={c.name}
                loading="lazy"
              />
              <div className="cgal__overlay">
                <span className="cgal__num">{c.num}</span>
                <span className="cgal__name">{c.name}</span>
                <span className="cgal__kw">{c.keyword}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </Reveal>
  );
}
