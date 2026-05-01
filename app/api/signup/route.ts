import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { normalizeName } from "@/lib/names";
import {
  SEED_OFFSET,
  allocateTicket,
  importExistingTicket,
  isStorageConfigured
} from "@/lib/storage";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ATTENDING_VALUES = new Set(["yes", "no", "maybe"]);
const PARTY_VALUES = new Set(["1", "2", "family"]);

// Mailchimp's "Phone Number" merge field type validates against a fixed
// format (e.g. 555-555-5555). Normalize before sending so users can type
// any common shape without hitting the format check.
function formatPhoneForMailchimp(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11 && digits.startsWith("1")) {
    return `${digits.slice(1, 4)}-${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return raw;
}

type SignupPayload = {
  name?: string;
  email?: string;
  phone?: string;
  attending?: string;
  partySize?: string;
  dietary?: string;
  note?: string;
  website?: string;
};

function buildTicketUrl(
  origin: string,
  name: string,
  num: number,
  party: string,
  attending: string
) {
  const params = new URLSearchParams({
    name,
    num: String(num),
    party,
    attending
  });
  return `${origin}/api/ticket?${params.toString()}`;
}

async function fetchMemberCount(dc: string, audienceId: string, apiKey: string) {
  const url = `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}?fields=stats.member_count`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${Buffer.from(`any:${apiKey}`).toString("base64")}`
    }
  });
  if (!response.ok) return 0;
  const data = (await response.json()) as { stats?: { member_count?: number } };
  return data.stats?.member_count || 0;
}

async function fetchExistingTicketNum(
  dc: string,
  audienceId: string,
  apiKey: string,
  subscriberHash: string
) {
  const url = `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members/${subscriberHash}?fields=merge_fields.TKT_NUM`;
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Basic ${Buffer.from(`any:${apiKey}`).toString("base64")}`
      }
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { merge_fields?: { TKT_NUM?: string } };
    const raw = data.merge_fields?.TKT_NUM?.trim();
    if (!raw) return null;
    const n = parseInt(raw, 10);
    return Number.isFinite(n) && n > 0 ? n : null;
  } catch {
    return null;
  }
}

async function postSubscriberNote(
  dc: string,
  audienceId: string,
  apiKey: string,
  subscriberHash: string,
  note: string
) {
  const url = `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members/${subscriberHash}/notes`;
  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`any:${apiKey}`).toString("base64")}`
      },
      body: JSON.stringify({ note })
    });
  } catch (err) {
    console.warn("Mailchimp note attach failed:", err);
  }
}

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
  const phone = payload.phone?.trim();
  const attendingRaw = payload.attending?.trim().toLowerCase() || "yes";
  const partySizeRaw = payload.partySize?.trim().toLowerCase() || "1";
  const dietary = payload.dietary?.trim().slice(0, 500) || "";
  const note = payload.note?.trim().slice(0, 1000) || "";

  if (!name) {
    return NextResponse.json({ message: "Please enter your name." }, { status: 400 });
  }
  if (!email || !emailPattern.test(email)) {
    return NextResponse.json({ message: "Please enter a valid email." }, { status: 400 });
  }
  if (!phone || phone.replace(/\D/g, "").length < 7) {
    return NextResponse.json({ message: "Please enter a valid phone number." }, { status: 400 });
  }

  const attending = ATTENDING_VALUES.has(attendingRaw) ? attendingRaw : "yes";
  const partySize = PARTY_VALUES.has(partySizeRaw) ? partySizeRaw : "1";

  const [rawFirstName, ...rest] = name.split(" ");
  const firstName = normalizeName(rawFirstName || name);
  const lastName = normalizeName(rest.join(" "));

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  const origin = new URL(request.url).origin;
  const subscriberHash = crypto.createHash("md5").update(email).digest("hex");

  let ticketNum = SEED_OFFSET + 1;
  let dc: string | undefined;

  if (apiKey && audienceId) {
    dc = apiKey.split("-")[1];
  }

  if (isStorageConfigured()) {
    // Redis is the source of truth: atomic INCR on the counter, idempotent
    // per-email cache. Mailchimp existing TKT_NUM is checked first only as a
    // safety net for records created before sync ran.
    if (dc && apiKey && audienceId) {
      const mcExisting = await fetchExistingTicketNum(dc, audienceId, apiKey, subscriberHash);
      if (mcExisting) {
        await importExistingTicket(subscriberHash, mcExisting);
        ticketNum = mcExisting;
      } else {
        const allocated = await allocateTicket(subscriberHash);
        if (allocated) ticketNum = allocated;
      }
    } else {
      const allocated = await allocateTicket(subscriberHash);
      if (allocated) ticketNum = allocated;
    }
  } else if (dc && apiKey && audienceId) {
    // Fallback when Redis isn't configured: idempotent on existing TKT_NUM,
    // then derive a new number from member_count. Race-prone on simultaneous
    // new signups — Upstash setup eliminates that risk.
    const existing = await fetchExistingTicketNum(dc, audienceId, apiKey, subscriberHash);
    if (existing) {
      ticketNum = existing;
    } else {
      const count = await fetchMemberCount(dc, audienceId, apiKey);
      ticketNum = SEED_OFFSET + count + 1;
    }
  }

  const ticketNumPadded = String(ticketNum).padStart(6, "0");
  const displayFirst = firstName || normalizeName(name);
  const ticketUrl = buildTicketUrl(origin, displayFirst, ticketNum, partySize, attending);

  const tags = [
    "arrival-list-site",
    `rsvp:${attending}`,
    `party:${partySize}`
  ];

  const mergeFields: Record<string, string | number> = {
    FNAME: displayFirst,
    LNAME: lastName,
    PHONE: formatPhoneForMailchimp(phone),
    TKT_NUM: ticketNumPadded,
    TKT_URL: ticketUrl
  };

  if (!apiKey || !audienceId) {
    console.warn("Mailchimp not configured. Dev fallback signup:", {
      email,
      name,
      attending,
      partySize,
      dietary,
      note,
      tags,
      mergeFields,
      ticketUrl
    });
    return NextResponse.json(
      { message: "Thanks. You are on the list.", mode: "dev", ticketUrl, attending },
      { status: 200 }
    );
  }

  if (!dc) {
    console.error("Malformed MAILCHIMP_API_KEY — expected format KEY-dcXX.");
    return NextResponse.json({ message: "Signup is temporarily unavailable." }, { status: 500 });
  }

  const url = `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members/${subscriberHash}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`any:${apiKey}`).toString("base64")}`
    },
    body: JSON.stringify({
      email_address: email,
      // status forces re-activation for previously-archived contacts;
      // status_if_new applies only when creating a brand-new record.
      status: "subscribed",
      status_if_new: "subscribed",
      merge_fields: mergeFields,
      tags
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Mailchimp subscribe failed:", errorText);
    let detail = "";
    try {
      const parsed = JSON.parse(errorText) as { title?: string; detail?: string };
      detail = parsed.detail || parsed.title || "";
    } catch {}
    return NextResponse.json(
      {
        message: detail
          ? `Could not save your signup. ${detail}`
          : "Could not save your signup. Please try again."
      },
      { status: 500 }
    );
  }

  if (dietary || note) {
    const lines = [
      `RSVP: ${attending} · Party: ${partySize}`,
      dietary ? `Dietary: ${dietary}` : null,
      note ? `Note: ${note}` : null
    ].filter(Boolean) as string[];
    await postSubscriberNote(dc, audienceId, apiKey, subscriberHash, lines.join("\n"));
  }

  return NextResponse.json(
    { message: "Thanks. You are on the list.", ticketUrl, attending },
    { status: 201 }
  );
}
