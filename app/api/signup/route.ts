import { NextResponse } from "next/server";
import crypto from "node:crypto";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SEED_NAMES = ["Baby", "Shenika", "Brandon"];
const SEED_OFFSET = SEED_NAMES.length;

type SignupPayload = {
  name?: string;
  email?: string;
  phone?: string;
  website?: string;
};

function buildTicketUrl(origin: string, name: string, prev1: string, prev2: string, num: number) {
  const params = new URLSearchParams({
    name,
    prev1,
    prev2,
    num: String(num)
  });
  return `${origin}/api/ticket?${params.toString()}`;
}

async function fetchPriorMembers(dc: string, audienceId: string, apiKey: string) {
  const url = `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members?sort_field=timestamp_signup&sort_dir=DESC&count=2&fields=members.merge_fields.FNAME,members.merge_fields.LNAME&status=subscribed`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${Buffer.from(`any:${apiKey}`).toString("base64")}`
    }
  });
  if (!response.ok) {
    return [] as string[];
  }
  const data = (await response.json()) as {
    members?: Array<{ merge_fields?: { FNAME?: string; LNAME?: string } }>;
  };
  return (data.members || [])
    .map((m) => (m.merge_fields?.FNAME || "").trim())
    .filter(Boolean);
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

  if (!name) {
    return NextResponse.json({ message: "Please enter your name." }, { status: 400 });
  }
  if (!email || !emailPattern.test(email)) {
    return NextResponse.json({ message: "Please enter a valid email." }, { status: 400 });
  }
  if (!phone || phone.replace(/\D/g, "").length < 7) {
    return NextResponse.json({ message: "Please enter a valid phone number." }, { status: 400 });
  }

  const [firstName, ...rest] = name.split(" ");
  const lastName = rest.join(" ");

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  const origin = new URL(request.url).origin;

  let prev1 = SEED_NAMES[0];
  let prev2 = SEED_NAMES[1];
  let ticketNum = SEED_OFFSET + 1;

  if (apiKey && audienceId) {
    const dc = apiKey.split("-")[1];
    if (dc) {
      const [priors, count] = await Promise.all([
        fetchPriorMembers(dc, audienceId, apiKey),
        fetchMemberCount(dc, audienceId, apiKey)
      ]);
      const chain = [...priors, ...SEED_NAMES];
      prev1 = chain[0] || SEED_NAMES[0];
      prev2 = chain[1] || SEED_NAMES[1];
      ticketNum = SEED_OFFSET + count + 1;
    }
  }

  const ticketNumPadded = String(ticketNum).padStart(6, "0");
  const ticketUrl = buildTicketUrl(origin, firstName || name, prev1, prev2, ticketNum);

  const tags = ["arrival-list-site"];

  const mergeFields: Record<string, string | number> = {
    FNAME: firstName || name,
    LNAME: lastName,
    PHONE: phone,
    PREV_1: prev1,
    PREV_2: prev2,
    TKT_NUM: ticketNumPadded,
    TKT_URL: ticketUrl
  };

  if (!apiKey || !audienceId) {
    console.warn("Mailchimp not configured. Dev fallback signup:", {
      email,
      name,
      tags,
      mergeFields,
      ticketUrl
    });
    return NextResponse.json(
      { message: "Thanks. You are on the list.", mode: "dev", ticketUrl },
      { status: 200 }
    );
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
    return NextResponse.json(
      { message: "Could not save your signup. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Thanks. You are on the list.", ticketUrl },
    { status: 201 }
  );
}
