"use client";

import { useState } from "react";
import Star from "@/components/Star";

export default function NewsletterForm() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail]         = useState("");
  const [status, setStatus]       = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName }),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="nl-success">
        <Star size={13} />
        <h2>Votre code est en route !</h2>
        <p>
          Consultez votre boîte mail — vous y trouverez votre code <strong>BIENVENUE10</strong> pour
          bénéficier de <strong>10% de réduction</strong> sur votre première commande.
        </p>
        <div className="nl-code">BIENVENUE10</div>
        <p className="nl-hint">Entrez ce code dans le champ "Code promotionnel" lors du paiement.</p>
      </div>
    );
  }

  return (
    <form className="nl-form" onSubmit={handleSubmit}>
      <input
        className="nl-input"
        type="text"
        placeholder="Votre prénom"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        autoComplete="given-name"
      />
      <input
        className="nl-input"
        type="email"
        placeholder="Votre adresse email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />
      <button className="nl-btn" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Envoi…" : "Recevoir mon code — 10% offerts"}
      </button>
      {status === "error" && (
        <p className="nl-error">Une erreur est survenue, veuillez réessayer.</p>
      )}
      <p className="nl-legal">
        En vous inscrivant, vous acceptez de recevoir nos actualités.
        Désinscription possible à tout moment.
      </p>
    </form>
  );
}
