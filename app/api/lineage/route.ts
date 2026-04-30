import { NextResponse } from "next/server";
import { normalizeName } from "@/lib/names";

const SEED_NAMES = ["Baby", "Shenika", "Brandon"];
const SEED_OFFSET = SEED_NAMES.length;

export const dynamic = "force-dynamic";

export async function GET() {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

  let prev1 = SEED_NAMES[0];
  let prev2 = SEED_NAMES[1];
  let nextNum = SEED_OFFSET + 1;

  if (apiKey && audienceId) {
    const dc = apiKey.split("-")[1];
    if (dc) {
      const auth = `Basic ${Buffer.from(`any:${apiKey}`).toString("base64")}`;

      try {
        const [priorsRes, countRes] = await Promise.all([
          fetch(
            `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members?sort_field=timestamp_signup&sort_dir=DESC&count=2&fields=members.merge_fields.FNAME&status=subscribed`,
            { headers: { Authorization: auth } }
          ),
          fetch(
            `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}?fields=stats.member_count`,
            { headers: { Authorization: auth } }
          )
        ]);

        if (priorsRes.ok) {
          const data = (await priorsRes.json()) as {
            members?: Array<{ merge_fields?: { FNAME?: string } }>;
          };
          const priors = (data.members || [])
            .map((m) => normalizeName(m.merge_fields?.FNAME || ""))
            .filter(Boolean);
          const chain = [...priors, ...SEED_NAMES];
          prev1 = chain[0] || SEED_NAMES[0];
          prev2 = chain[1] || SEED_NAMES[1];
        }

        if (countRes.ok) {
          const data = (await countRes.json()) as { stats?: { member_count?: number } };
          nextNum = SEED_OFFSET + (data.stats?.member_count || 0) + 1;
        }
      } catch (error) {
        console.error("Lineage fetch failed:", error);
      }
    }
  }

  return NextResponse.json({
    prev1,
    prev2,
    num: String(nextNum).padStart(6, "0"),
    numRaw: nextNum
  });
}
