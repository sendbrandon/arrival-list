# Baby in Bloom · Campaign Playbook

A living reference for running the King Adams baby shower campaign through launch and beyond.

---

## Quick Links

| Item | URL / Where |
|---|---|
| Live site (primary) | https://kingadams.family |
| Live site (backup) | https://arrival-list.vercel.app |
| GitHub repo | https://github.com/sendbrandon/arrival-list |
| Vercel dashboard | https://vercel.com/dashboard |
| Mailchimp dashboard | https://admin.mailchimp.com |

## Key Routes

| Route | Purpose |
|---|---|
| `/` | Home — Version D (Baby in Bloom skin) |
| `/join` | RSVP form |
| `/registry` | Full registry list |
| `/details` | Event date / location / dress |
| `/a` | Backup of Version A (editorial / Donda direction) |
| `/bloom` | Version B (whimsical garden invitation) |
| `/c` | Version C (editorial structure + bloom skin with sonogram) |
| `/d` | Version D (same as `/` — kept as alternate URL) |

## Event Details

| | |
|---|---|
| **Date** | Sunday, June 28, 2026 |
| **Time** | 1:00 p.m. (TBD on actual time) |
| **Location** | Shared with confirmed guests (TBD) |
| **Hosts** | Brandon & Shenika |
| **Theme** | Baby in Bloom |
| **Domain** | kingadams.family |

---

## ✅ What's Done

### Site
- [x] Next.js app deployed to Vercel
- [x] Custom domain: kingadams.family (SSL auto-managed)
- [x] Mailchimp signup integration (form → audience)
- [x] Real date set: Sunday, June 28, 2026
- [x] Sonogram image (cropped, no PHI)
- [x] Baby in Bloom invitation image (Version D hero)
- [x] All four design versions live (A, B, C, D)
- [x] Mobile-optimized
- [x] Favicon + Apple touch icon
- [x] Open Graph / Twitter share image
- [x] Rich metadata for link previews
- [x] Marquee announcement bar
- [x] Architectural left rail (mobile)
- [x] Black slab RSVP CTA
- [x] Schedule + registry sections styled

### Mailchimp
- [x] Audience created
- [x] Custom merge fields set: RSVP, PARTY, BUDGET, DIET
- [x] API key + Audience ID added to Vercel env vars
- [x] Site signup form posts to Mailchimp on submit
- [x] Tags applied automatically: `arrival-list-site`, `rsvp-{status}`

---

## ⏳ What's Left to Do

### Before launching the campaign
- [ ] **Replace registry placeholder URLs** with real Babylist/Amazon links in `lib/registry.ts`
- [ ] **Set up Mailchimp welcome email automation** (auto-sends after signup)
- [ ] **Lock event time** (currently placeholder)
- [ ] **Lock event location** (will be private — only sent post-RSVP)
- [ ] **Test signup form end-to-end** (submit → email arrives → tags applied)
- [ ] **Update Mailchimp Audience defaults**: company website → kingadams.family
- [ ] **Test SMS to your own number** before sending to guest list

### Content tasks
- [ ] Lock real schedule body copy with specific dates
- [ ] Add real registry items + URLs
- [ ] Optional: Photo of Brandon & Shenika for the personal note

### Optional polish
- [ ] Make `arrival-list.vercel.app` redirect to `kingadams.family` (Vercel → Domains → click .vercel.app → Redirect)
- [ ] Set up Mailchimp drop campaigns for AL-001 → AL-008

---

## 📅 The Drop Schedule (Mailchimp Campaign Plan)

Plan to send approximately 3 SMS + email rounds to your ~70 guests:

| # | Code | Timing | What | Send via |
|---|---|---|---|---|
| 1 | AL-001 | ~April–May (now) | Save the Date · Date + RSVP link | Email + SMS |
| 2 | AL-002 | Mid May | Registry is live · Few items, link | Email |
| 3 | AL-003 | Early June | Final Details · Address, parking, dress | Email + SMS |
| 4 | AL-004 | 48 hours before | Day-of reminder · Time, address, parking | SMS only |
| 5 | AL-005 | Day after | Thank you + photos | Email |
| 6 | AL-006 | Post-baby | Baby arrival update | Email |

---

## 📱 SMS Credits Math (Mailchimp)

You have **2,500 SMS credits**. Plenty of headroom.

### Pricing (US numbers)
| Type | Credits per recipient |
|---|---|
| Standard SMS (≤160 chars, no emoji) | **1** |
| Long SMS (161–320 chars) | **2** |
| MMS (with image) | **3** |

### Your campaign math
70 recipients × 3 sends:

| Format | Per send | Total (3 sends) |
|---|---|---|
| Short plain SMS | 70 | **210 credits** |
| Longer SMS (>160 chars) | 140 | **420 credits** |
| MMS with image | 210 | **630 credits** |

**Worst realistic case: ~630 credits. You have 2,500 → 4× buffer. You can send 8–10 campaigns easily.**

### Tips to stretch credits
- Keep texts ≤160 chars
- Avoid emojis (encoding switches limit to ~70 chars)
- Use plain dashes / punctuation
- Save MMS for one important moment (day-of address with map image)
- Filter by `rsvp-yes` and `rsvp-maybe` tags — don't send to "no" replies
- Test to your own number before sending to all

### Watch out for
- **International numbers** cost 3–10× more
- **Failed sends still burn credits**

---

## 📝 Mailchimp How-To

### Updating Audience defaults
1. Audience → click your audience name (top dropdown)
2. **Settings** → **Audience name and defaults**
3. Update:
   - **Default from name:** `Brandon & Shenika`
   - **Default from email address:** sendbrandon@icloud.com
   - **Company website:** `https://kingadams.family`
   - **Company/organization:** `King Adams · Baby in Bloom`
4. **Save**

### Sending an email campaign
1. **Create → Email**
2. Pick a template (Plain Text or Custom HTML matches your brand)
3. Compose body — paste links like `https://kingadams.family/join`
4. Filter recipients by tag (e.g., `rsvp-yes`, `arrival-list-site`)
5. Send a test to yourself first
6. Schedule or Send

### Sending an SMS campaign
1. **Create → SMS** (requires Marketing plan or SMS add-on)
2. Pick audience → filter by tag
3. Compose message — Mailchimp shows live character count + credit cost
4. Send test to your own number first
5. Schedule or Send Now
6. Check **Reports → SMS Reports** afterward

---

## 📲 SMS Templates (under 160 chars each)

### Save the date
> Hi! Brandon & Shenika are throwing a baby shower — Sunday June 28. Sending address + details closer to the day. RSVP: kingadams.family
>
> *(155 chars)*

### Registry reminder
> A few items we'd love help with for the baby — kingadams.family/registry. With love, B&S
>
> *(94 chars)*

### Final details (1 week before)
> It's almost here. Address, parking, dress, and timing for Sunday's baby shower: kingadams.family/details
>
> *(115 chars)*

### Day-of reminder (48 hours before)
> Tomorrow, 1pm. Address & parking: kingadams.family/details. Can't wait to see you. — B&S
>
> *(95 chars)*

### Thank you (day after)
> Thank you for showing up for us yesterday. We loved every minute. Photos coming soon. — B&S
>
> *(96 chars)*

---

## 🔑 Tags Used in Mailchimp

Auto-applied when someone signs up via the site:

| Tag | Meaning |
|---|---|
| `arrival-list-site` | Source: signed up via website (always applied) |
| `rsvp-yes` | RSVP'd yes |
| `rsvp-maybe` | RSVP'd maybe |
| `rsvp-no` | RSVP'd no |
| `reminders-event` | Wants event reminders (default on) |
| `reminders-registry` | Wants registry updates (default on) |
| `reminders-baby-updates` | Wants post-shower baby updates (default on) |

Use these tags to filter your campaign sends.

---

## 🧠 Decisions Locked In

- **Stack**: Next.js + Vercel + Mailchimp (no Supabase, no Resend)
- **Domain**: kingadams.family (generational family domain)
- **Primary palette**: cream / forest green / terracotta (Bloom skin)
- **Backup palettes**: editorial Donda (Version A), garden whimsical (Version B)
- **Hero image**: Baby in Bloom illustrated invitation (AI-generated, Sept 2026)
- **Sonogram**: stored cropped at `/public/sonogram.jpg`, no PHI in current crop

---

## 🧾 Environment Variables (Vercel)

Currently set in Vercel → Project Settings → Environment Variables:

| Name | Purpose |
|---|---|
| `MAILCHIMP_API_KEY` | API key for posting signups |
| `MAILCHIMP_AUDIENCE_ID` | Which audience to subscribe to |
| `NEXT_PUBLIC_EVENT_DATE` | (Optional) Override default event date string |
| `NEXT_PUBLIC_EVENT_DATE_LONG` | (Optional) Override hero "Sunday · June 28, 2026" |
| `NEXT_PUBLIC_EVENT_CITY` | (Optional) Override location placeholder |
| `NEXT_PUBLIC_EVENT_LOCATION_SHORT` | (Optional) Override hero location line |

To update event details site-wide: edit these env vars in Vercel and redeploy.

---

## 🛠 Common "How do I…" Tasks

### Update event time/date/location across the site
Edit `lib/copy.ts` directly OR set the env vars above in Vercel and redeploy.

### Add a real registry item
Edit `lib/registry.ts` — change the `href` field to the real URL.

### Add a photo to the personal note
Drop the file at `public/family-photo.jpg`, then add to `app/d/page.tsx` near the personal note section.

### Switch which version is at `/`
Edit `app/page.tsx` — currently re-exports from `./d/page`. Change to `./a/page`, `./bloom/page`, or `./c/page` to switch.

### Pull guest contact info for a campaign
Mailchimp → Audience → All contacts → Filter by tag → Export CSV.

---

## 📖 Future Use of `kingadams.family`

This domain is generational. Future event ideas:

| Event | URL pattern |
|---|---|
| Wedding | `kingadams.family/wedding` |
| Birth announcement | `kingadams.family/baby` |
| First birthday | `kingadams.family/one` |
| Family annual letter | `kingadams.family/2027` |
| Anniversary | `kingadams.family/anniversary` |
| Family chronicle | `kingadams.family/letters` |

Build a lightweight pattern: each event is its own `app/[event]/page.tsx`.

---

*Last updated: April 25, 2026*
