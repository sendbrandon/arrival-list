"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

type Lineage = {
  prev1: string;
  prev2: string;
  num: string;
};

const SEED_FALLBACK: Lineage = {
  prev1: "Baby",
  prev2: "Shenika",
  num: "000004"
};

export function SignupForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [lineage, setLineage] = useState<Lineage>(SEED_FALLBACK);
  const [ticketUrl, setTicketUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/lineage")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data) {
          setLineage({ prev1: data.prev1, prev2: data.prev2, num: data.num });
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const buttonLabel = useMemo(() => {
    if (status === "submitting") return "Adding\u2026";
    if (status === "success") return "On the list";
    return "Add Name";
  }, [status]);

  const previewName = name.trim() || "Your Name";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      website: String(formData.get("website") || "")
    };

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Something went wrong.");
      }

      setStatus("success");
      setMessage("You\u2019re on the list. Check your email for your ticket.");
      if (data?.ticketUrl) setTicketUrl(data.ticketUrl);
      form.reset();
      setName("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  if (status === "success" && ticketUrl) {
    return (
      <div className="ticket-success">
        <p className="ticket-success__kicker">N&deg; {lineage.num} &middot; You&rsquo;re on the list</p>
        <img src={ticketUrl} alt="Your Arrival List ticket" className="ticket-success__image" />
        <p className="ticket-success__note">{message}</p>
      </div>
    );
  }

  return (
    <form className="add-name" onSubmit={handleSubmit} noValidate>
      <input className="honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" />

      <div className="add-name__label">Add a Name</div>

      <div className="add-name__row">
        <input
          className="add-name__input"
          name="name"
          type="text"
          placeholder="Your full name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button className="add-name__button" type="submit" disabled={status === "submitting"}>
          {buttonLabel}
        </button>
      </div>

      <div className="add-name__grid">
        <label className="add-name__field">
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label className="add-name__field">
          <span>Phone</span>
          <input name="phone" type="tel" autoComplete="tel" required placeholder="For event-day texts" />
        </label>
      </div>

      <div className="lineage-preview">
        <div className="lineage-preview__rule" aria-hidden="true" />
        <div className="lineage-preview__body">
          <p className="lineage-preview__kicker">Already On The List</p>
          <p className="lineage-preview__prev">{lineage.prev1}</p>
          <p className="lineage-preview__you">{previewName.toUpperCase()}</p>
          <p className="lineage-preview__prev">{lineage.prev2}</p>
          <p className="lineage-preview__num">N&deg; {lineage.num}</p>
        </div>
      </div>

      <p className="add-name__fineprint">
        All three fields are required. We&rsquo;ll email your ticket and a few gentle reminders &mdash; kept brief, kept warm, never spammy.
      </p>

      {message && status !== "success" ? (
        <p className={`form-message form-message--${status}`}>{message}</p>
      ) : null}
    </form>
  );
}
