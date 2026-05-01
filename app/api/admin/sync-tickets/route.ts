import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { importExistingTicket, isStorageConfigured } from "@/lib/storage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Member = {
  email_address?: string;
  status?: string;
  merge_fields?: { TKT_NUM?: string };
};

async function fetchAllMembers(dc: string, audienceId: string, auth: string) {
  const out: Member[] = [];
  const pageSize = 500;
  let offset = 0;
  while (true) {
    const url = `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members?count=${pageSize}&offset=${offset}&fields=members.email_address,members.status,members.merge_fields.TKT_NUM`;
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

export async function POST(request: Request) {
  return runSync(request);
}

export async function GET(request: Request) {
  return runSync(request);
}

async function runSync(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token") || "";

  const adminToken = process.env.ADMIN_EXPORT_TOKEN;
  if (!adminToken) {
    return NextResponse.json(
      { message: "Admin sync not configured. Set ADMIN_EXPORT_TOKEN." },
      { status: 503 }
    );
  }
  if (!token || token !== adminToken) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  if (!isStorageConfigured()) {
    return NextResponse.json(
      { message: "Storage not configured. Set UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN." },
      { status: 503 }
    );
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

  let imported = 0;
  let skipped = 0;
  let maxNum = 0;

  for (const m of members) {
    const email = (m.email_address || "").toLowerCase();
    const raw = m.merge_fields?.TKT_NUM?.trim();
    if (!email || !raw) {
      skipped++;
      continue;
    }
    const num = parseInt(raw, 10);
    if (!Number.isFinite(num) || num <= 0) {
      skipped++;
      continue;
    }
    const subscriberHash = crypto.createHash("md5").update(email).digest("hex");
    await importExistingTicket(subscriberHash, num);
    if (num > maxNum) maxNum = num;
    imported++;
  }

  return NextResponse.json({
    message: "Sync complete.",
    imported,
    skipped,
    totalMembers: members.length,
    counterNowAt: maxNum
  });
}
