"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";
type Attending = "yes" | "no" | "maybe";
type PartySize = "1" | "2" | "family";

const VALIDATION_MESSAGES: Record<string, { missing: string; mismatch?: string }> = {
  name: { missing: "Please add your name." },
  email: {
    missing: "Please add your email so we can send your details.",
    mismatch: "That email looks off — please check the format."
  },
  phone: { missing: "Please add your phone number." }
};

function setCustomMessage(input: HTMLInputElement, fieldKey: string) {
  const v = input.validity;
  const messages = VALIDATION_MESSAGES[fieldKey];
  if (!messages) return;
  if (v.valueMissing) {
    input.setCustomValidity(messages.missing);
  } else if (v.typeMismatch && messages.mismatch) {
    input.setCustomValidity(messages.mismatch);
  } else {
    input.setCustomValidity("");
  }
}

function partyLabel(party: PartySize) {
  if (party === "1") return "Party of 1";
  if (party === "2") return "Party of 2";
  return "Family";
}

export function SignupForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<Attending>("yes");
  const [partySize, setPartySize] = useState<PartySize>("1");
  const [previewNum, setPreviewNum] = useState<string>("000004");
  const [submittedNum, setSubmittedNum] = useState<string | null>(null);
  const [submittedAttending, setSubmittedAttending] = useState<Attending>("yes");
  const [submittedParty, setSubmittedParty] = useState<PartySize>("1");
  const [ticketUrl, setTicketUrl] = useState<string | null>(null);
  const [guestCount, setGuestCount] = useState<number>(0);
  const [guestPreview, setGuestPreview] = useState<string[]>([]);
  const [guestHidden, setGuestHidden] = useState<number>(0);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/lineage")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data?.num) {
          setPreviewNum(data.num);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (status !== "success") return;
    let cancelled = false;
    fetch("/api/guests")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        if (typeof data.count === "number") setGuestCount(data.count);
        if (Array.isArray(data.preview)) setGuestPreview(data.preview);
        if (typeof data.hiddenCount === "number") setGuestHidden(data.hiddenCount);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [status]);

  const buttonLabel = useMemo(() => {
    if (status === "submitting") return "Confirming\u2026";
    if (status === "success") return "On the list";
    return "Confirm My RSVP";
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
      attending: String(formData.get("attending") || "yes"),
      partySize: String(formData.get("partySize") || "1"),
      dietary: String(formData.get("dietary") || ""),
      note: String(formData.get("note") || ""),
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

      const finalAttending = (data?.attending as Attending) || (payload.attending as Attending);
      const finalParty = payload.partySize as PartySize;

      setStatus("success");
      setSubmittedAttending(finalAttending);
      setSubmittedParty(finalParty);

      if (finalAttending === "no") {
        setMessage(
          "Thanks for letting us know. We\u2019ll miss you \u2014 and we\u2019ll keep you in the loop with photos after the day."
        );
      } else {
        setMessage(
          "Your private location details and calendar invite will be sent by email."
        );
      }

      if (data?.ticketUrl) setTicketUrl(data.ticketUrl);
      if (data?.ticketUrl) {
        try {
          const url = new URL(data.ticketUrl);
          const num = url.searchParams.get("num");
          if (num) setSubmittedNum(String(num).padStart(6, "0"));
        } catch {}
      }
      form.reset();
      setName("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    const isNo = submittedAttending === "no";
    return (
      <div className="ticket-success">
        <p className="ticket-success__kicker">
          {submittedNum ? <>N&deg; {submittedNum} &middot; </> : null}
          {isNo ? "Heard, with love" : "You\u2019re on the list"}
        </p>
        <h3 className="ticket-success__headline">
          {isNo ? (
            <>We&rsquo;ll <em>miss</em> you<span className="c-title__period">.</span></>
          ) : (
            <>You&rsquo;re <em>on</em> the list<span className="c-title__period">.</span></>
          )}
        </h3>
        <p className="ticket-success__note">{message}</p>

        {!isNo && ticketUrl ? (
          <img src={ticketUrl} alt="Your Baby in Bloom ticket" className="ticket-success__image" />
        ) : null}

        {!isNo && guestCount > 0 ? (
          <div className="ticket-success__guests">
            <p className="ticket-success__guests-kicker">
              The Guest List <span className="ticket-success__guests-count">&middot; {guestCount} confirmed</span>
            </p>
            <p className="ticket-success__guests-names">
              {guestPreview.map((guestName, i) => (
                <span key={`${guestName}-${i}`}>
                  <em>{guestName}</em>
                  {i < guestPreview.length - 1 ? <span aria-hidden="true"> &middot; </span> : null}
                </span>
              ))}
              {guestHidden > 0 ? (
                <>
                  <span aria-hidden="true"> &middot; </span>
                  <span className="ticket-success__guests-more">+{guestHidden} more</span>
                </>
              ) : null}
            </p>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <form className="add-name" onSubmit={handleSubmit}>
      <input className="honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" />

      <div className="add-name__label">Reserve Your Seat <span aria-hidden="true">*</span></div>

      {message && status === "error" ? (
        <p className="form-message form-message--error" role="alert">{message}</p>
      ) : null}

      <div className="add-name__row">
        <input
          className="add-name__input"
          name="name"
          type="text"
          placeholder="Your full name (required)"
          autoComplete="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            e.currentTarget.setCustomValidity("");
          }}
          onInvalid={(e) => setCustomMessage(e.currentTarget, "name")}
          required
        />
      </div>

      <div className="add-name__grid">
        <label className="add-name__field">
          <span>Email <span aria-hidden="true">*</span></span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            onInput={(e) => e.currentTarget.setCustomValidity("")}
            onInvalid={(e) => setCustomMessage(e.currentTarget, "email")}
          />
        </label>
        <label className="add-name__field">
          <span>Phone <span aria-hidden="true">*</span></span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            placeholder="For event-day texts"
            onInput={(e) => e.currentTarget.setCustomValidity("")}
            onInvalid={(e) => setCustomMessage(e.currentTarget, "phone")}
          />
        </label>
      </div>

      <fieldset className="add-name__fieldset">
        <legend>Will you attend?</legend>
        <div className="add-name__choices" role="radiogroup">
          {[
            { v: "yes", label: "Yes" },
            { v: "maybe", label: "Not sure yet" },
            { v: "no", label: "No" }
          ].map((opt) => (
            <label
              key={opt.v}
              className={`add-name__choice${attending === opt.v ? " is-selected" : ""}`}
            >
              <input
                type="radio"
                name="attending"
                value={opt.v}
                checked={attending === opt.v}
                onChange={() => setAttending(opt.v as Attending)}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {attending !== "no" ? (
        <fieldset className="add-name__fieldset">
          <legend>How many guests?</legend>
          <div className="add-name__choices" role="radiogroup">
            {[
              { v: "1", label: "Just me" },
              { v: "2", label: "Plus one" },
              { v: "family", label: "Family" }
            ].map((opt) => (
              <label
                key={opt.v}
                className={`add-name__choice${partySize === opt.v ? " is-selected" : ""}`}
              >
                <input
                  type="radio"
                  name="partySize"
                  value={opt.v}
                  checked={partySize === opt.v}
                  onChange={() => setPartySize(opt.v as PartySize)}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : (
        <input type="hidden" name="partySize" value="1" />
      )}

      <div className="add-name__grid add-name__grid--single">
        <label className="add-name__field">
          <span>Dietary notes <em className="add-name__optional">— optional</em></span>
          <input
            name="dietary"
            type="text"
            placeholder="Allergies, preferences, kids' menu"
            autoComplete="off"
          />
        </label>
      </div>

      <label className="add-name__field add-name__field--note">
        <span>A note for Brandon &amp; Shenika <em className="add-name__optional">— optional</em></span>
        <textarea
          name="note"
          rows={3}
          placeholder="Anything you want them to know"
        />
      </label>

      <button className="add-name__button" type="submit" disabled={status === "submitting"}>
        {buttonLabel}
      </button>

      {attending !== "no" ? (
        <div className="lineage-preview">
          <div className="lineage-preview__rule" aria-hidden="true" />
          <div className="lineage-preview__body">
            <p className="lineage-preview__kicker">Baby in Bloom</p>
            <p className="lineage-preview__admit">
              {attending === "maybe" ? "Saving Your Seat" : "Confirmed Guest"}
            </p>
            <p className="lineage-preview__you">{previewName.toUpperCase()}</p>
            <p className="lineage-preview__date">{partyLabel(partySize)}</p>
            <p className="lineage-preview__num">N&deg; {previewNum}</p>
          </div>
        </div>
      ) : null}

      <p className="add-name__fineprint">
        We&rsquo;ll email your ticket, the private location details, and a few gentle reminders &mdash; kept brief, kept warm, never spammy.
      </p>
    </form>
  );
}
