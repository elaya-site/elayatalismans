"use client";

import { useEffect, useRef, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const mountTimeRef = useRef<number>(0);

  // Record mount time for minimal delay anti-spam check
  useEffect(() => {
    mountTimeRef.current = Date.now();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Anti-spam: require at least 3 s on page before submitting
    if (Date.now() - mountTimeRef.current < 3000) return;

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      prenom:  data.get("prenom")  as string,
      nom:     data.get("nom")     as string,
      email:   data.get("email")   as string,
      sujet:   data.get("sujet")   as string,
      message: data.get("message") as string,
      // Honeypot — must be empty
      _hp:     data.get("_hp")     as string,
    };

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        const json = await res.json().catch(() => ({}));
        setErrorMsg(json.error ?? "Une erreur est survenue.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Impossible d'envoyer le message. Veuillez réessayer.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="cconfirm" role="alert">
        <div className="cconfirm__icon">✦</div>
        <p className="cconfirm__text">
          Votre message a bien été envoyé.<br />
          <em>Nous vous répondrons bientôt.</em>
        </p>
      </div>
    );
  }

  return (
    <form className="cform" onSubmit={handleSubmit} noValidate>
      {/* Honeypot — hidden from real users, bots fill it */}
      <div className="cform__hp" aria-hidden="true">
        <input
          type="text"
          name="_hp"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="cform__row">
        <div className="cfield">
          <label className="cfield__label" htmlFor="cf-prenom">
            Prénom <span className="cfield__req">*</span>
          </label>
          <input
            id="cf-prenom"
            className="cfield__input"
            type="text"
            name="prenom"
            autoComplete="given-name"
            required
            disabled={status === "loading"}
          />
        </div>
        <div className="cfield">
          <label className="cfield__label" htmlFor="cf-nom">
            Nom <span className="cfield__req">*</span>
          </label>
          <input
            id="cf-nom"
            className="cfield__input"
            type="text"
            name="nom"
            autoComplete="family-name"
            required
            disabled={status === "loading"}
          />
        </div>
      </div>

      <div className="cfield">
        <label className="cfield__label" htmlFor="cf-email">
          Email <span className="cfield__req">*</span>
        </label>
        <input
          id="cf-email"
          className="cfield__input"
          type="email"
          name="email"
          autoComplete="email"
          required
          disabled={status === "loading"}
        />
      </div>

      <div className="cfield">
        <label className="cfield__label" htmlFor="cf-sujet">
          Sujet
        </label>
        <input
          id="cf-sujet"
          className="cfield__input"
          type="text"
          name="sujet"
          disabled={status === "loading"}
        />
      </div>

      <div className="cfield">
        <label className="cfield__label" htmlFor="cf-message">
          Message <span className="cfield__req">*</span>
        </label>
        <textarea
          id="cf-message"
          className="cfield__textarea"
          name="message"
          rows={6}
          required
          disabled={status === "loading"}
        />
      </div>

      {status === "error" && (
        <p className="cerror" role="alert">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        className={`csubmit ${status === "loading" ? "csubmit--loading" : ""}`}
        disabled={status === "loading"}
      >
        <span>{status === "loading" ? "Envoi en cours…" : "Envoyer le message"}</span>
      </button>
    </form>
  );
}
