import { NextResponse } from "next/server";
import { dedupeNames } from "@/lib/names";

const SEED_NAMES = ["Brandon", "Shenika", "Baby"];

export const dynamic = "force-dynamic";

export async function GET() {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

  let combined: string[] = [...SEED_NAMES];

  if (apiKey && audienceId) {
    const dc = apiKey.split("-")[1];
    if (dc) {
      const auth = `Basic ${Buffer.from(`any:${apiKey}`).toString("base64")}`;
      try {
        const url = `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members?sort_field=timestamp_signup&sort_dir=ASC&count=500&fields=members.merge_fields.FNAME&status=subscribed`;
        const res = await fetch(url, { headers: { Authorization: auth } });
        if (res.ok) {
          const data = (await res.json()) as {
            members?: Array<{ merge_fields?: { FNAME?: string } }>;
          };
          const realGuests = (data.members || [])
            .map((m) => (m.merge_fields?.FNAME || "").trim())
            .filter(Boolean);
          combined = [...SEED_NAMES, ...realGuests];
        }
      } catch (err) {
        console.error("Guests fetch failed:", err);
      }
    }
  }

  const guests = dedupeNames(combined);
  return NextResponse.json({ guests, count: guests.length });
}
