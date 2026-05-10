"use client";

import { useState } from "react";
import type { Review } from "@/data/reviews";

type Props = {
  productId: string;
  productName: string;
  reviews: Review[];
};

function StarRating({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="rev__stars-input">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          className={`rev__star-btn${s <= (hovered || value) ? " active" : ""}`}
          onMouseEnter={() => onChange && setHovered(s)}
          onMouseLeave={() => onChange && setHovered(0)}
          onClick={() => onChange?.(s)}
          aria-label={`${s} étoile${s > 1 ? "s" : ""}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function ProductReviews({ productId, productName, reviews }: Props) {
  const [form, setForm] = useState({ author: "", rating: 0, text: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const avg = reviews.length
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.author || !form.rating || !form.text) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, productName, ...form }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="rev">
      {/* ── En-tête ── */}
      <div className="rev__head">
        <div className="rev__label">Avis clients</div>
        {reviews.length > 0 && (
          <div className="rev__summary">
            <span className="rev__avg">{avg.toFixed(1)}</span>
            <div className="rev__stars">
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} className={s <= Math.round(avg) ? "rev__star on" : "rev__star"}>★</span>
              ))}
            </div>
            <span className="rev__count">{reviews.length} avis</span>
          </div>
        )}
      </div>

      {/* ── Liste des avis ── */}
      {reviews.length > 0 ? (
        <ul className="rev__list">
          {reviews.map((r) => (
            <li key={r.id} className="rev__item">
              <div className="rev__item-head">
                <span className="rev__author">{r.author}</span>
                <div className="rev__stars">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className={s <= r.rating ? "rev__star on" : "rev__star"}>★</span>
                  ))}
                </div>
                <span className="rev__date">{new Date(r.date).toLocaleDateString("fr-FR", { year: "numeric", month: "long" })}</span>
              </div>
              <p className="rev__text">{r.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="rev__empty">Soyez la première à laisser un avis sur ce talisman.</p>
      )}

      {/* ── Formulaire ── */}
      <div className="rev__form-wrap">
        <div className="rev__form-title">Laisser un avis</div>
        {status === "done" ? (
          <p className="rev__thanks">Merci pour votre avis ! Il sera publié après vérification.</p>
        ) : (
          <form className="rev__form" onSubmit={handleSubmit}>
            <div className="rev__field">
              <label>Votre prénom</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                placeholder="Sophie"
                required
              />
            </div>
            <div className="rev__field">
              <label>Note</label>
              <StarRating value={form.rating} onChange={(v) => setForm({ ...form, rating: v })} />
            </div>
            <div className="rev__field">
              <label>Votre avis</label>
              <textarea
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                placeholder="Décrivez votre expérience…"
                rows={4}
                required
              />
            </div>
            <button type="submit" className="rev__submit" disabled={status === "sending"}>
              {status === "sending" ? "Envoi…" : "Envoyer mon avis"}
            </button>
            {status === "error" && <p className="rev__error">Une erreur est survenue, réessayez.</p>}
          </form>
        )}
      </div>
    </section>
  );
}
