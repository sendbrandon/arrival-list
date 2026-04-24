import { NextResponse } from "next/server";

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
  const phone = payload.phone?.trim() || null;
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

  if (!allowedRsvp.has(rsvpStatus)) {
    return NextResponse.json({ message: "Please choose a valid RSVP status." }, { status: 400 });
  }

  if (partySize < 0 || partySize > 10) {
    return NextResponse.json({ message: "Please enter a party size between 0 and 10." }, { status: 400 });
  }

  if (payload.smsConsent && !phone) {
    return NextResponse.json({ message: "Please add a phone number for SMS reminders." }, { status: 400 });
  }

  const row = {
    name,
    email,
    phone,
    rsvp_status: rsvpStatus,
    party_size: partySize,
    dietary_notes: payload.dietaryNotes?.trim() || null,
    email_consent: Boolean(payload.emailConsent),
    sms_consent: Boolean(payload.smsConsent),
    reminder_preferences: reminderPreferences,
    gift_budget: payload.giftBudget || null,
    source: "arrival-list-site"
  };

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.warn("Supabase is not configured. Dev fallback signup:", row);
    return NextResponse.json({ message: "Thanks. You are on the list.", mode: "dev" }, { status: 200 });
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/guests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      Prefer: "return=minimal"
    },
    body: JSON.stringify(row)
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Supabase insert failed:", errorText);
    return NextResponse.json({ message: "Could not save your signup. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ message: "Thanks. You are on the list." }, { status: 201 });
}
