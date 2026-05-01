import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Member = {
  email_address?: string;
  status?: string;
  timestamp_signup?: string;
  timestamp_opt?: string;
  last_changed?: string;
  merge_fields?: {
    FNAME?: string;
    LNAME?: string;
    PHONE?: string;
    TKT_NUM?: string;
    TKT_URL?: string;
  };
  tags?: Array<{ name?: string }>;
};

type Note = {
  note?: string;
};

function tagValue(tags: Array<{ name?: string }> | undefined, prefix: string) {
  if (!tags) return "";
  for (const t of tags) {
    const n = t.name || "";
    if (n.toLowerCase().startsWith(prefix)) return n.slice(prefix.length);
  }
  return "";
}

function csvField(v: unknown) {
  const s = v == null ? "" : String(v);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

async function fetchAllMembers(dc: string, audienceId: string, auth: string) {
  const out: Member[] = [];
  const pageSize = 500;
  let offset = 0;
  // Mailchimp caps responses; loop until fewer than pageSize come back.
  while (true) {
    const url = `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members?count=${pageSize}&offset=${offset}&fields=members.email_address,members.status,members.timestamp_signup,members.timestamp_opt,members.last_changed,members.merge_fields,members.tags`;
    const res = await fetch(url, { headers: { Authorization: auth } });
    if (!res.ok) break;
    const data = (await res.json()) as { members?: Member[] };
    const batch = data.members || [];
    out.push(...batch);
    if (batch.length < pageSize) break;
    offset += pageSize;
  }
  return out;
}

async function fetchNotes(
  dc: string,
  audienceId: string,
  auth: string,
  subscriberHash: string
) {
  const url = `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members/${subscriberHash}/notes?count=10&fields=notes.note`;
  try {
    const res = await fetch(url, { headers: { Authorization: auth } });
    if (!res.ok) return "";
    const data = (await res.json()) as { notes?: Note[] };
    return (data.notes || []).map((n) => n.note || "").filter(Boolean).join(" | ");
  } catch {
    return "";
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token") || "";
  const format = (searchParams.get("format") || "csv").toLowerCase();
  const includeNotes = searchParams.get("notes") !== "0";

  const adminToken = process.env.ADMIN_EXPORT_TOKEN;
  if (!adminToken) {
    return NextResponse.json(
      { message: "Admin export not configured. Set ADMIN_EXPORT_TOKEN." },
      { status: 503 }
    );
  }
  if (!token || token !== adminToken) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  if (!apiKey || !audienceId) {
    return NextResponse.json({ message: "Mailchimp not configured." }, { status: 503 });
  }
  const dc = apiKey.split("-")[1];
  if (!dc) {
    return NextResponse.json({ message: "Malformed API key." }, { status: 503 });
  }

  const auth = `Basic ${Buffer.from(`any:${apiKey}`).toString("base64")}`;
  const members = await fetchAllMembers(dc, audienceId, auth);

  const crypto = await import("node:crypto");
  const rows = await Promise.all(
    members.map(async (m) => {
      const email = (m.email_address || "").toLowerCase();
      const subscriberHash = crypto.createHash("md5").update(email).digest("hex");
      const note = includeNotes && email
        ? await fetchNotes(dc, audienceId, auth, subscriberHash)
        : "";
      return {
        ticket: m.merge_fields?.TKT_NUM || "",
        firstName: m.merge_fields?.FNAME || "",
        lastName: m.merge_fields?.LNAME || "",
        email: m.email_address || "",
        phone: m.merge_fields?.PHONE || "",
        attending: tagValue(m.tags, "rsvp:"),
        party: tagValue(m.tags, "party:"),
        signedUp: m.timestamp_signup || m.timestamp_opt || "",
        lastChanged: m.last_changed || "",
        status: m.status || "",
        note,
        ticketUrl: m.merge_fields?.TKT_URL || ""
      };
    })
  );

  rows.sort((a, b) => {
    const an = parseInt(a.ticket || "0", 10) || 0;
    const bn = parseInt(b.ticket || "0", 10) || 0;
    return an - bn;
  });

  if (format === "json") {
    return NextResponse.json({ count: rows.length, rows });
  }

  const headers = [
    "Ticket",
    "First Name",
    "Last Name",
    "Email",
    "Phone",
    "Attending",
    "Party",
    "Signed Up",
    "Last Changed",
    "Status",
    "Note",
    "Ticket URL"
  ];
  const lines = [headers.join(",")];
  for (const r of rows) {
    lines.push(
      [
        r.ticket,
        r.firstName,
        r.lastName,
        r.email,
        r.phone,
        r.attending,
        r.party,
        r.signedUp,
        r.lastChanged,
        r.status,
        r.note,
        r.ticketUrl
      ]
        .map(csvField)
        .join(",")
    );
  }
  const csv = lines.join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="arrival-list-rsvps-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store"
    }
  });
}
