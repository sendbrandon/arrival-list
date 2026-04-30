# Mailchimp Ticket Setup

The site now generates a personalized ticket image for each guest and passes the URL to Mailchimp via merge fields. The welcome email embeds the image automatically.

## 1. Add merge fields to your audience

In Mailchimp → **Audience → Settings → Audience fields and *|MERGE|* tags**, add the following text fields:

| Field label    | Tag       | Type | Required | Visible |
| -------------- | --------- | ---- | -------- | ------- |
| Prior Name 1   | `PREV_1`  | Text | No       | No      |
| Prior Name 2   | `PREV_2`  | Text | No       | No      |
| Ticket Number  | `TKT_NUM` | Text | No       | No      |
| Ticket URL     | `TKT_URL` | Text | No       | No      |

Existing default fields used: `FNAME`, `LNAME`, `PHONE`. (You can keep / remove `RSVP`, `PARTY`, `BUDGET`, `DIET` from the previous schema — they are no longer being written.)

## 2. Confirm the welcome automation

The welcome HTML in `email-templates/welcome.html` references:
- `*|TKT_URL|*` — `<img src="...">` of the personalized ticket
- `*|TKT_NUM|*` — printed twice (kicker + caption)
- `*|PREV_1|*` and `*|PREV_2|*` — the two arrivals before this guest

Paste the welcome HTML into your **Customer Journey** welcome email (or **Classic Automation → Welcome new subscribers**). Mailchimp resolves merge tags at send time, so each guest gets their own image.

## 3. How the ticket numbering works

- N° 000001 — Brandon (seed)
- N° 000002 — Shenika (seed)
- N° 000003 — Baby (seed)
- N° 000004+ — Real signups (one per Mailchimp subscriber, in order)

Seed names are hardcoded in `app/api/signup/route.ts` and `app/api/lineage/route.ts`. The 4th guest sees Baby and Shenika in their lineage. The 5th guest sees the 4th guest and Baby. And so on.

## 4. Test before launch

1. Set `MAILCHIMP_API_KEY` and `MAILCHIMP_AUDIENCE_ID` in Vercel → Project → Settings → Environment Variables.
2. Submit a test signup with your own email.
3. Verify in Mailchimp that the new contact has `TKT_URL`, `TKT_NUM`, `PREV_1`, `PREV_2` populated.
4. Open `*|TKT_URL|*`'s value in a browser — it should render the PNG ticket.
5. Send yourself the welcome — the embedded `<img>` should resolve to your ticket.

## Notes & limits

- **Race condition:** Two simultaneous signups in the same second could see the same prior pair. Acceptable for a ~50-guest baby shower; not for high-traffic sites.
- **Image caching:** The ticket route sets `Cache-Control: public, max-age=31536000, immutable`. The URL is unique per (name, prev1, prev2, num), so cached images stay correct.
- **Mailchimp image proxy:** Mailchimp may rewrite `<img src>` through its own CDN. The first send fetches our `/api/ticket` route; subsequent sends use Mailchimp's cached copy. Don't expect the image to ever update after the first send for a given subscriber.
