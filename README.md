# The Arrival List — Codex Handoff Kit

A Codex-ready starter for a private baby shower sign-up, RSVP, registry, and reminder portal.

The concept: **a private luxury arrival campaign** — not a generic baby shower site. The public language should feel original, intimate, elevated, and useful.

## How to use this in Codex

1. Create a new GitHub repo, for example `arrival-list`.
2. Upload or copy these files into the repo.
3. Open the repo in Codex App, Codex Web, Codex CLI, or Codex IDE extension.
4. Paste the contents of `CODEX_START_PROMPT.md` into Codex.
5. Ask Codex to run the app, fix build issues, and open the local browser preview.
6. Use `AGENTS.md` when you want multiple Codex agents to work in parallel.

## Recommended MVP scope

Build the first version around:

- Landing page
- Join / RSVP form
- Registry guide
- Reminder preference capture
- Event details page
- Admin-ready database schema
- Email/SMS integration placeholders

## Suggested stack

- Next.js / React
- TypeScript
- CSS custom properties for the visual system
- Supabase for database
- Resend or SendGrid for email
- Twilio for optional SMS
- Vercel for hosting
- Babylist, Amazon registry, Target registry, or custom registry links

## Included files

- `CODEX_START_PROMPT.md` — paste into Codex first
- `AGENTS.md` — multi-agent task breakdown
- `docs/PRODUCT_BRIEF.md` — product and feature strategy
- `docs/DESIGN_SYSTEM.md` — creative direction and UI rules
- `docs/TECH_SPEC.md` — implementation approach
- `docs/SCHEMA.sql` — starter Supabase schema
- `app/` — minimal Next.js app shell
- `components/` — core UI components
- `lib/` — copy and sample registry data

## Visual principle

Brutalist outside. Ornate inside. Premium, intimate, useful.

Do not directly copy or namecheck celebrity/brand IP on the public site. Use those references only as internal direction: restraint, ritual, negative space, monochrome, grain, cinematic pacing, rich surreal accents.
