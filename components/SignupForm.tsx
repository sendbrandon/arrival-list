"use client";

import { FormEvent, useMemo, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function SignupForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const buttonLabel = useMemo(() => {
    if (status === "submitting") return "Sending\u2026";
    if (status === "success") return "We\u2019ve got you";
    return "Send My RSVP";
  }, [status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      rsvpStatus: String(formData.get("rsvpStatus") || "undecided"),
      partySize: Number(formData.get("partySize") || 1),
      dietaryNotes: String(formData.get("dietaryNotes") || ""),
      emailConsent: true,
      smsConsent: true,
      website: String(formData.get("website") || ""),
      reminderPreferences: ["event", "registry", "baby-updates"]
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
      setMessage("You\u2019re on the list. We can\u2019t wait to celebrate with you.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <input className="honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" />

      <div className="field-grid field-grid--two">
        <label>
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>

      <div className="field-grid field-grid--two">
        <label>
          <span>Phone</span>
          <input name="phone" type="tel" autoComplete="tel" required placeholder="For event-day texts" />
        </label>
        <label>
          <span>Party size</span>
          <input name="partySize" type="number" min="1" max="10" defaultValue="1" required />
        </label>
      </div>

      <fieldset>
        <legend>RSVP</legend>
        <div className="choice-row">
          <label><input type="radio" name="rsvpStatus" value="yes" required /> Yes</label>
          <label><input type="radio" name="rsvpStatus" value="maybe" /> Maybe</label>
          <label><input type="radio" name="rsvpStatus" value="no" /> No</label>
        </div>
      </fieldset>

      <label>
        <span>Anything we should know? <span className="signup-form__optional">(optional)</span></span>
        <textarea name="dietaryNotes" rows={3} placeholder="Allergies, accessibility, anything we should know" />
      </label>

      <button className="button button--primary" type="submit" disabled={status === "submitting"}>
        {buttonLabel}
      </button>

      <p className="signup-form__fineprint">
        By sending your RSVP, you agree to receive event details and a few gentle reminders by email and text. We&rsquo;ll keep it brief, kept warm, never spammy.
      </p>

      {message ? <p className={`form-message form-message--${status}`}>{message}</p> : null}
    </form>
  );
}
