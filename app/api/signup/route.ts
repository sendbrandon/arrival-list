import { NextResponse } from "next/server";
import crypto from "node:crypto";

const allowedRsvp = new Set(["yes", "maybe", "no", "undecided"]);
const allowedReminders = new Set(["event", "registry", "sale", "baby-updates"]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SignupPayload = {
  name?: string;
  email?: string;
  phone?: string;
  rsvpStatus?: string;
  partySize?: number;
  dietaryNotes?: string;
  emailConsent?: boolean;
  smsConsent?: boolean;
  reminderPreferences?: string[];
  giftBudget?: string;
  website?: string;
};

export async function POST(request: Request) {
  let payload: SignupPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  if (payload.website) {
    return NextResponse.json({ message: "Thanks. You are on the list." }, { status: 200 });
  }

  const name = payload.name?.trim();
  const email = payload.email?.trim().toLowerCase();
  const phone = payload.phone?.trim() || "";
  const rsvpStatus = payload.rsvpStatus || "undecided";
  const partySize = Number.isFinite(payload.partySize) ? Number(payload.partySize) : 1;
  const reminderPreferences = Array.isArray(payload.reminderPreferences)
    ? payload.reminderPreferences.filter((preference) => allowedReminders.has(preference))
    : [];

  if (!name) {
    return NextResponse.json({ message: "Please enter your name." }, { status: 400 });
  }

  if (!email || !emailPattern.test(email)) {
    return NextResponse.json({ message: "Please enter a valid email." }, { status: 400 });
  }

  if (!phone || phone.length < 7) {
    return NextResponse.json({ message: "Please enter a valid phone number." }, { status: 400 });
  }

  if (!allowedRsvp.has(rsvpStatus)) {
    return NextResponse.json({ message: "Please choose a valid RSVP status." }, { status: 400 });
  }

  if (partySize < 1 || partySize > 10) {
    return NextResponse.json({ message: "Please enter a party size between 1 and 10." }, { status: 400 });
  }

  const [firstName, ...rest] = name.split(" ");
  const lastName = rest.join(" ");

  const tags = [
    "arrival-list-site",
    `rsvp-${rsvpStatus}`,
    ...reminderPreferences.map((p) => `reminders-${p}`),
    ...(payload.giftBudget ? [`budget-${payload.giftBudget}`] : [])
  ];

  const mergeFields: Record<string, string | number> = {
    FNAME: firstName || name,
    LNAME: lastName,
    PARTY: partySize,
    RSVP: rsvpStatus,
    BUDGET: payload.giftBudget || "",
    DIET: payload.dietaryNotes?.trim() || ""
  };

  if (phone) mergeFields.PHONE = phone;

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    console.warn("Mailchimp not configured. Dev fallback signup:", { email, name, tags, mergeFields });
    return NextResponse.json({ message: "Thanks. You are on the list.", mode: "dev" }, { status: 200 });
  }

  const dc = apiKey.split("-")[1];
  if (!dc) {
    console.error("Malformed MAILCHIMP_API_KEY — expected format KEY-dcXX.");
    return NextResponse.json({ message: "Signup is temporarily unavailable." }, { status: 500 });
  }

  const subscriberHash = crypto.createHash("md5").update(email).digest("hex");
  const url = `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members/${subscriberHash}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`any:${apiKey}`).toString("base64")}`
    },
    body: JSON.stringify({
      email_address: email,
      status_if_new: "subscribed",
      merge_fields: mergeFields,
      tags
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Mailchimp subscribe failed:", errorText);
    return NextResponse.json({ message: "Could not save your signup. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ message: "Thanks. You are on the list." }, { status: 201 });
}
