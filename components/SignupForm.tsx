"use client";

import { FormEvent, useMemo, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const reminderOptions = [
  { value: "event", label: "Event reminders" },
  { value: "registry", label: "Registry updates" },
  { value: "sale", label: "Sale alerts" },
  { value: "baby-updates", label: "Baby arrival updates" }
];

export function SignupForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const buttonLabel = useMemo(() => {
    if (status === "submitting") return "Joining...";
    if (status === "success") return "Confirmed";
    return "Join the List";
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
      emailConsent: formData.get("emailConsent") === "on",
      smsConsent: formData.get("smsConsent") === "on",
      giftBudget: String(formData.get("giftBudget") || ""),
      website: String(formData.get("website") || ""),
      reminderPreferences: formData.getAll("reminderPreferences").map(String)
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
      setMessage("You are on the list. Details and reminders will arrive closer to the date.");
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
          <span>Phone optional</span>
          <input name="phone" type="tel" autoComplete="tel" placeholder="For SMS reminders" />
        </label>
        <label>
          <span>Party size</span>
          <input name="partySize" type="number" min="0" max="10" defaultValue="1" />
        </label>
      </div>

      <fieldset>
        <legend>RSVP</legend>
        <div className="choice-row">
          <label><input type="radio" name="rsvpStatus" value="yes" required /> Yes</label>
          <label><input type="radio" name="rsvpStatus" value="maybe" /> Maybe</label>
          <label><input type="radio" name="rsvpStatus" value="no" /> No</label>
          <label><input type="radio" name="rsvpStatus" value="undecided" /> Keep me posted</label>
        </div>
      </fieldset>

      <fieldset>
        <legend>Reminder preferences</legend>
        <div className="choice-grid">
          {reminderOptions.map((option) => (
            <label key={option.value}>
              <input type="checkbox" name="reminderPreferences" value={option.value} defaultChecked={option.value === "event"} />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <label>
        <span>Gift budget preference optional</span>
        <select name="giftBudget" defaultValue="">
          <option value="">No preference</option>
          <option value="under-25">Under $25</option>
          <option value="under-50">Under $50</option>
          <option value="under-100">Under $100</option>
          <option value="group-gift">Group gift</option>
        </select>
      </label>

      <label>
        <span>Dietary notes optional</span>
        <textarea name="dietaryNotes" rows={4} placeholder="Allergies, preferences, or anything we should know" />
      </label>

      <div className="consent-stack">
        <label>
          <input name="emailConsent" type="checkbox" defaultChecked />
          Email me event details and registry reminders.
        </label>
        <label>
          <input name="smsConsent" type="checkbox" />
          Text me important event updates. Standard rates may apply.
        </label>
      </div>

      <button className="button button--primary" type="submit" disabled={status === "submitting"}>
        {buttonLabel}
      </button>

      {message ? <p className={`form-message form-message--${status}`}>{message}</p> : null}
    </form>
  );
}
