You are helping build a private baby shower portal called **The Arrival List**.

Goal: ship a polished MVP website that lets guests join the list, RSVP, choose reminder preferences, view event details, and browse a curated registry guide. The experience should feel like a premium private drop portal rather than a generic baby shower site.

Read these files first:

- `README.md`
- `docs/PRODUCT_BRIEF.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/TECH_SPEC.md`
- `docs/SCHEMA.sql`
- `AGENTS.md`

Project direction:

- Public name: **The Arrival List**
- Tone: intimate, premium, editorial, useful, family-safe
- Visual language: ash black, bone, cream, antique gold, concrete, soft grain, large type, restrained motion
- Avoid direct references to Kanye, Ye, Yeezy, Donda, Bully, Poor Things, album art, celebrity imagery, or protected brand assets in public code/copy/assets. Treat those as internal moodboard references only.
- Primary CTA: `JOIN THE LIST`
- Secondary CTA: `VIEW REGISTRY`

MVP features to implement:

1. Make the Next.js app compile and run locally.
2. Polish the landing page responsive layout.
3. Make the signup / RSVP form functional.
4. Add API route validation and Supabase insertion when environment variables are present.
5. Keep a graceful dev fallback when Supabase is not configured.
6. Add registry cards for Most Needed, On Sale, Under $50, and Group Gift.
7. Add event details page with save-the-date/calendar-link placeholder.
8. Add accessible focus states, semantic markup, and mobile-first layout.
9. Add a simple `README_SETUP.md` explaining how to deploy to Vercel and connect Supabase.
10. Add basic tests or validation checks if the framework setup supports them.

Environment variables to support:

```bash
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_EVENT_DATE=
NEXT_PUBLIC_EVENT_CITY=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

Suggested first task:

> Inspect the repo, run install/build, fix any TypeScript or Next.js issues, then improve the MVP UI and signup flow while preserving the creative direction.

After making changes, summarize:

- What changed
- How to run locally
- What still needs real credentials/content
- Recommended next Codex task
