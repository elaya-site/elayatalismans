"use client";

import { useState, useRef } from "react";

type Props = {
  productId:   string;
  productName: string;
};

type Status = "idle" | "loading" | "success" | "duplicate" | "error";

export default function StockAlertForm({ productId, productName }: Props) {
  const [email,  setEmail]  = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [err,    setErr]    = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");

    const trimmed = email.trim();
    const valid   = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!valid) {
      setErr("Veuillez saisir une adresse e-mail valide.");
      inputRef.current?.focus();
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/stock-alert", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email: trimmed, productId, productName }),
      });

      if (res.status === 201) {
        setStatus("success");
        return;
      }

      const body = await res.json().catch(() => ({}));

      if (res.status === 409) {
        setStatus("duplicate");
        return;
      }

      setErr(body.error ?? "Une erreur est survenue. Réessayez.");
      setStatus("idle");
    } catch {
      setErr("Impossible de contacter le serveur. Réessayez.");
      setStatus("idle");
    }
  }

  /* ── Confirmation ── */
  if (status === "success" || status === "duplicate") {
    return (
      <div className="stock-alert">
        <div className="stock-alert__status">
          Actuellement en rupture de stock
        </div>
        <div className="stock-alert__confirm">
          {status === "success"
            ? "Merci — vous serez informé·e dès son retour."
            : "Vous êtes déjà inscrit·e pour ce talisman."}
        </div>
      </div>
    );
  }

  /* ── Formulaire ── */
  return (
    <div className="stock-alert">
      <div className="stock-alert__status">
        Actuellement en rupture de stock
      </div>

      <p className="stock-alert__invite">
        Soyez informé·e dès son retour.
      </p>

      <form className="stock-alert__form" onSubmit={handleSubmit} noValidate>
        <div className="stock-alert__field">
          <input
            ref={inputRef}
            className="stock-alert__input"
            type="email"
            autoComplete="email"
            placeholder="Votre adresse e-mail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (err) setErr("");
            }}
            disabled={status === "loading"}
            required
          />
          {err && <span className="stock-alert__error">{err}</span>}
        </div>

        <button
          className="stock-alert__btn"
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Envoi…" : "Être alerté·e du retour"}
        </button>
      </form>

      <p className="stock-alert__note">
        Aucun compte requis · une seule notification · jamais de spam.
      </p>
    </div>
  );
}
