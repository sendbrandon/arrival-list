import { NextResponse } from "next/server";

const SEED_OFFSET = 3;

export const dynamic = "force-dynamic";

export async function GET() {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

  let nextNum = SEED_OFFSET + 1;

  if (apiKey && audienceId) {
    const dc = apiKey.split("-")[1];
    if (dc) {
      const auth = `Basic ${Buffer.from(`any:${apiKey}`).toString("base64")}`;
      try {
        const res = await fetch(
          `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}?fields=stats.member_count`,
          { headers: { Authorization: auth } }
        );
        if (res.ok) {
          const data = (await res.json()) as { stats?: { member_count?: number } };
          nextNum = SEED_OFFSET + (data.stats?.member_count || 0) + 1;
        }
      } catch (error) {
        console.error("Lineage fetch failed:", error);
      }
    }
  }

  return NextResponse.json({
    num: String(nextNum).padStart(6, "0"),
    numRaw: nextNum
  });
}
