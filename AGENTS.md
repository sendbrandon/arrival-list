# Multi-Agent Plan for Codex

Use separate Codex threads/worktrees when possible. Each agent should read the product, design, and tech docs before editing.

## Agent 1 — Product / UX

Mission: make the flow feel obvious for guests.

Tasks:

- Audit the pages for clarity.
- Simplify signup language.
- Make RSVP and reminder preferences understandable.
- Add microcopy for registry links that feels helpful, not pushy.
- Ensure older relatives can understand the flow without knowing the visual references.

Acceptance criteria:

- A guest can understand what this is within 5 seconds.
- Primary action is obvious.
- Event, RSVP, registry, and reminders are easy to find.

## Agent 2 — Visual System

Mission: make the site feel premium and original.

Tasks:

- Apply the design system from `docs/DESIGN_SYSTEM.md`.
- Add cinematic spacing, oversized typography, subtle grain, and restrained transitions.
- Improve responsive layout.
- Keep contrast accessible.
- Do not add public references to any celebrity/brand IP.

Acceptance criteria:

- The design feels editorial, restrained, and high-end.
- The baby shower context still feels warm and human.
- Mobile is not an afterthought.

## Agent 3 — Backend / Data

Mission: make signup reliable and deployable.

Tasks:

- Validate form input server-side.
- Insert guests into Supabase using REST or SDK.
- Add error handling.
- Keep a local/dev fallback when Supabase credentials are absent.
- Document required environment variables.
- Add simple spam protection placeholder, e.g. hidden honeypot field.

Acceptance criteria:

- Signup returns success in dev.
- Signup stores data in Supabase when configured.
- Sensitive service keys are server-side only.

## Agent 4 — Registry / Reminder Logic

Mission: turn the site into a small shower CRM.

Tasks:

- Structure registry items by category and urgency.
- Add placeholder support for sale price, retailer, and gift note.
- Create reminder cadence content blocks.
- Add future integration notes for Resend/SendGrid/Twilio.
- Add `reminder_preferences` capture to the form.

Acceptance criteria:

- Guests can self-select what reminders they want.
- Registry links are useful and budget-conscious.
- Admin can later segment guests by reminder preferences.

## Agent 5 — QA / Launch Readiness

Mission: make the MVP safe to launch.

Tasks:

- Check accessibility basics.
- Check mobile layout.
- Check form edge cases.
- Check empty/missing environment states.
- Add a launch checklist.

Acceptance criteria:

- Build passes.
- Critical flows are documented.
- No broken placeholder links in production without clear labels.
