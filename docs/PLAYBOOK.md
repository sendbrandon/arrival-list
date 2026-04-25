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
| `/` | Home — Version D (Baby in Bloom) |
| `/join` | RSVP form |
| `/registry` | Full registry list |
| `/details` | Event date / location / dress |
| `/a` | Backup of Version A (editorial / Donda) |
| `/bloom` | Version B (whimsical garden invitation) |
| `/c` | Version C (editorial structure + bloom skin with sonogram) |
| `/d` | Version D (same as `/`) |

## Event Details

| | |
|---|---|
| **Date** | Sunday, June 28, 2026 |
| **Time** | 1:00 p.m. (placeholder) |
| **Location** | Shared with confirmed guests |
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
- [x] Mobile-optimized with architectural left rail
- [x] Favicon + Apple touch icon
- [x] Open Graph / Twitter share image (BABY in BLOOM crop)
- [x] Rich metadata for link previews
- [x] Marquee announcement bar (with start spacer for readability)
- [x] Black slab RSVP CTA
- [x] Schedule + registry sections styled
- [x] All pages skinned in Bloom palette (cream / forest / terracotta)

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
- [ ] **Set up Mailchimp welcome email automation** (Customer Journey using `/email-templates/welcome.html`)
- [ ] **Lock event time** (currently placeholder)
- [ ] **Lock event location** (will be private — only sent post-RSVP)
- [ ] **Test signup form end-to-end** (submit → email arrives → tags applied)
- [ ] **Update Mailchimp Audience defaults**: company website → kingadams.family
- [ ] **Buy a complementary `.com` domain** if you want texts to auto-link without `https://` prefix

### Content tasks
- [ ] Lock real schedule body copy with specific dates
- [ ] Add real registry items + URLs
- [ ] Optional: photo of Brandon & Shenika for the personal note

### Optional polish
- [ ] Make `arrival-list.vercel.app` redirect to `kingadams.family`

---

## ⚠️ Important: SMS Strategy (No EIN = Email-First)

**Mailchimp SMS requires an EIN** (A2P 10DLC carrier registration). Same goes for Klaviyo, Twilio, EZ Texting — every business SMS platform.

**Solution: Email-first campaign + manual iMessage for the day-of moment.**

### Why this works:
- Email is free and requires no business verification
- Email reaches everyone (older relatives prefer it anyway)
- Rich images, formatted layouts, clickable buttons — all native to email
- The ONE moment SMS truly matters (day-of address) is a personal group iMessage from your phone

---

## 📅 The Drop Schedule (Email-First)

| # | Code | When | What | Channel |
|---|---|---|---|---|
| 1 | AL-001 | Apr–May (now) | Save the Date | Mailchimp **email** |
| 2 | AL-002 | Mid May | Registry is live | Mailchimp **email** |
| 3 | AL-003 | Early June | Final Details | Mailchimp **email** |
| 4 | AL-004 | 48 hrs before | Day-of reminder | Manual group iMessage from your phone |
| 5 | AL-005 | Day after | Thank you + photos | Mailchimp **email** |
| 6 | AL-006 | Post-baby | Baby arrival update | Mailchimp **email** |

---

## ✉️ Email Templates (Ready to Paste)

Each template includes: subject, preview text, body. Use the HTML template at `email-templates/welcome.html` as the visual frame, then swap in this copy.

### AL-001 · Save the Date

**Subject:** You're on the list.
**Preview:** Sunday, June 28, 2026 · The address and details to come.

**Body:**
```
Thank you for RSVPing to our baby shower. We can't tell you
how much it means to know who'll be there with us.

To the family we love most — this little one is already so
loved because of you. We can't wait to celebrate together
in June.

— Brandon & Shenika
```

CTA: **View the Details** → `https://kingadams.family/details`

---

### AL-002 · Registry is Live

**Subject:** A few things we'd love help with.
**Preview:** A short list. Group gifts and cash funds welcome.

**Body:**
```
The registry is open.

We've curated a short list of things that would help us
prepare for the little one — sorted by need and budget.
Group gifts and cash funds are always welcome.

Whatever you choose, we are deeply grateful.

— Brandon & Shenika
```

CTA: **See the Registry** → `https://kingadams.family/registry`

---

### AL-003 · Final Details

**Subject:** Final details for Sunday.
**Preview:** Address, parking, dress, and what to expect.

**Body:**
```
The day is almost here.

Here's what you need to know for Sunday, June 28:

  ·  Address — [TBA]
  ·  Time — 1:00 p.m.
  ·  Parking — [TBA]
  ·  Dress — Elevated casual, soft neutrals welcome

We can't wait to see you.

— Brandon & Shenika
```

CTA: **View All Details** → `https://kingadams.family/details`

---

### AL-004 · Day-of Reminder (SMS)

**Send manually as a group iMessage from your phone the day before or morning-of.**

```
Tomorrow at 1pm. Address and parking:
[ADDRESS HERE]
Can't wait to see you. Love, B&S
```

Or break into 2-3 group iMessages of ~25 contacts each (iOS group limit is 32).

---

### AL-005 · Thank You

**Subject:** Thank you for showing up for us.
**Preview:** A few photos and a few words.

**Body:**
```
Thank you for celebrating with us yesterday.

There aren't enough words for what it meant to be
surrounded by the people we love most as we prepare
for this little one. Every dish, every gift, every laugh,
every quiet moment — we'll carry it with us.

We've put together a few photos from the day below.

With all our love,
— Brandon & Shenika
```

CTA: **See the Photos** → (link to a photo gallery — Google Photos shared album works great)

---

### AL-006 · Baby Arrival Update

**Subject:** Our little one is here.
**Preview:** A short note from us, and a name.

**Body:**
```
[Baby's name] arrived on [date].

[Weight, length].

We are exhausted, tender, and so grateful you were
part of welcoming this little one. We'll share more
soon — for now, just this.

With love,
— Brandon & Shenika
```

---

## 🎨 Email Visual Style (Custom HTML in Mailchimp)

Use **Custom HTML** in Mailchimp's email builder to paste the template at `email-templates/welcome.html` (in the repo). It includes:

- Top black marquee bar with "You are invited..." italic
- Cream paper background (`#efe7d0`)
- Forest green text (`#2f3d33`)
- Terracotta accent (`#d35d3a`) for the section markers, drop numerals, "in"
- Georgia serif fallback (since web fonts don't render in most email clients)
- 600px max-width centered layout
- Hero image of the BIB invite
- "What to Expect" numbered list with hairline rules
- Footer signature line: "Baby in Bloom · Vol. I · 2026 · Made with care · B & S"

### How to use the HTML template in Mailchimp

1. **Create → Email**
2. Choose template type: **Code your own** → **Paste in code**
3. Open `email-templates/welcome.html` in any text editor
4. Copy the entire file content
5. Paste into Mailchimp's HTML editor
6. Mailchimp auto-renders preview
7. Customize:
   - Subject line + preview text (in the campaign settings, not the HTML)
   - Body copy (search for "Thank you for RSVP" and replace with the drop-specific copy from above)
8. **Send test** to your own email
9. Check on phone (most opens happen there)
10. Schedule or Send

### Adapting for other drops

For each new drop (AL-002, 003, 005, 006):
1. **Save As** the Welcome template in Mailchimp (Templates → Saved → Save current as template)
2. Edit the body copy section only
3. Update the section marker number (00 → 01 → 02 → 03)
4. Update the CTA button text + link
5. Update subject + preview text in campaign settings

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

### Setting up the Welcome Email Automation
1. **Automations → Customer Journeys** → **+ New Journey**
2. Choose template: **Welcome new subscribers** OR start from scratch
3. **Trigger**: "Subscribes to your audience" or "Tag added: arrival-list-site"
4. Add **Email step** → use the HTML from `email-templates/welcome.html`
5. **Turn on** the journey
6. Test by signing up via the site form yourself

### Sending an email campaign
1. **Create → Email**
2. **Code your own** template type
3. Paste your HTML
4. Filter recipients by tag (e.g., `rsvp-yes`, `arrival-list-site`)
5. Send a test to yourself first
6. Schedule or Send

---

## 🔑 Tags Used in Mailchimp

Auto-applied when someone signs up via the site:

| Tag | Meaning |
|---|---|
| `arrival-list-site` | Signed up via website (always applied) |
| `rsvp-yes` | RSVP'd yes |
| `rsvp-maybe` | RSVP'd maybe |
| `rsvp-no` | RSVP'd no |
| `reminders-event` | Wants event reminders (default on) |
| `reminders-registry` | Wants registry updates (default on) |
| `reminders-baby-updates` | Wants post-shower baby updates (default on) |

Use these to filter campaigns. For example, "Final Details" should only go to `rsvp-yes` and `rsvp-maybe` — not `rsvp-no`.

---

## 🧠 Decisions Locked In

- **Stack**: Next.js + Vercel + Mailchimp Email (no Supabase, no Resend, no SMS platform)
- **Domain**: kingadams.family
- **Primary palette**: cream / forest green / terracotta
- **Backup palettes**: editorial Donda (Version A), garden whimsical (Version B)
- **Hero image**: Baby in Bloom illustrated invitation
- **Sonogram**: stored cropped at `/public/sonogram.jpg`, no PHI in current crop
- **SMS strategy**: Email-first via Mailchimp; day-of reminder via manual iMessage from personal phone

---

## 🧾 Environment Variables (Vercel)

Set in Vercel → Project Settings → Environment Variables:

| Name | Purpose |
|---|---|
| `MAILCHIMP_API_KEY` | API key for posting signups |
| `MAILCHIMP_AUDIENCE_ID` | Which audience to subscribe to |
| `NEXT_PUBLIC_EVENT_DATE` | (Optional) Override default event date |
| `NEXT_PUBLIC_EVENT_DATE_LONG` | (Optional) Override hero "Sunday · June 28, 2026" |
| `NEXT_PUBLIC_EVENT_CITY` | (Optional) Override location placeholder |
| `NEXT_PUBLIC_EVENT_LOCATION_SHORT` | (Optional) Override hero location line |

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

## 📲 The One SMS You Will Send (Manual, From Your Phone)

48 hours or morning-of, send this as a group iMessage from your personal iPhone:

**Group 1 (~24 contacts) message:**
```
Tomorrow at 1pm at [ADDRESS].
Parking: [PARKING NOTE].
Can't wait to see you. Love,
B & S
```

**Tip:** Split your guests into 3 group iMessages of ~24 each. iOS group iMessage limit is 32. This way everyone gets the message but groups stay manageable.

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
