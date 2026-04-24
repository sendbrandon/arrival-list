# Technical Spec — The Arrival List

## MVP architecture

- Framework: Next.js App Router
- Language: TypeScript
- Styling: global CSS with custom properties
- Backend: Next.js API route
- Database: Supabase Postgres
- Hosting: Vercel
- Email: Resend or SendGrid later
- SMS: Twilio later

## Data model

See `docs/SCHEMA.sql`.

Core table:

- `guests`

Future tables:

- `registry_items`
- `message_campaigns`
- `message_events`

## Signup API behavior

Endpoint: `POST /api/signup`

Expected body:

```json
{
  "name": "Guest Name",
  "email": "guest@example.com",
  "phone": "+15555555555",
  "rsvpStatus": "yes",
  "partySize": 2,
  "dietaryNotes": "vegetarian",
  "emailConsent": true,
  "smsConsent": false,
  "reminderPreferences": ["event", "registry"],
  "giftBudget": "under-50",
  "website": ""
}
```

`website` is a honeypot. If filled, the API should reject or silently ignore.

Validation:

- Name required
- Email required and valid
- RSVP status required
- Party size integer >= 1 if RSVP yes/maybe
- SMS consent requires phone
- Reminder preferences must be allowlisted

Supabase mode:

If these variables are present, insert into Supabase:

```bash
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

Dev fallback:

If Supabase variables are missing, return success and log a warning. This lets the designer iterate on UI before backend setup.

## Security notes

- Never expose `SUPABASE_SERVICE_ROLE_KEY` to the browser.
- Keep admin features protected.
- Add rate limiting before public launch.
- Add unsubscribe/preference management before sending marketing-style emails.
- For SMS, collect explicit opt-in and keep messaging sparse.

## Deployment checklist

1. Create Supabase project.
2. Run `docs/SCHEMA.sql`.
3. Add Vercel project.
4. Add environment variables.
5. Test signup on preview deployment.
6. Replace placeholder registry links.
7. Replace placeholder event details.
8. Add privacy/consent language.
9. Add real email provider integration.
10. QA mobile and accessibility.
