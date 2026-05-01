import { NextResponse } from "next/server";
import { dedupeNames } from "@/lib/names";

export const dynamic = "force-dynamic";

const PREVIEW_CAP = 5;

type Member = {
  merge_fields?: { FNAME?: string };
  tags?: Array<{ name?: string }>;
};

export async function GET() {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    return NextResponse.json({ count: 0, preview: [], hiddenCount: 0 });
  }

  const dc = apiKey.split("-")[1];
  if (!dc) {
    return NextResponse.json({ count: 0, preview: [], hiddenCount: 0 });
  }

  const auth = `Basic ${Buffer.from(`any:${apiKey}`).toString("base64")}`;
  const url = `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members?sort_field=timestamp_signup&sort_dir=ASC&count=500&fields=members.merge_fields.FNAME,members.tags.name&status=subscribed`;

  try {
    const res = await fetch(url, { headers: { Authorization: auth } });
    if (!res.ok) {
      return NextResponse.json({ count: 0, preview: [], hiddenCount: 0 });
    }
    const data = (await res.json()) as { members?: Member[] };
    // Confirmed = anyone who said yes or didn't tag (legacy records). Excludes "no" RSVPs.
    const confirmed = (data.members || []).filter((m) => {
      const tagNames = (m.tags || []).map((t) => t.name?.toLowerCase() || "");
      return !tagNames.includes("rsvp:no");
    });
    const allNames = dedupeNames(
      confirmed.map((m) => (m.merge_fields?.FNAME || "").trim()).filter(Boolean)
    );
    const count = allNames.length;
    const preview = allNames.slice(0, PREVIEW_CAP);
    const hiddenCount = Math.max(0, count - preview.length);
    return NextResponse.json({ count, preview, hiddenCount });
  } catch (err) {
    console.error("Guests fetch failed:", err);
    return NextResponse.json({ count: 0, preview: [], hiddenCount: 0 });
  }
}
