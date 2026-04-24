export const siteCopy = {
  name: "The Arrival List",
  eyebrow: "June / Private Shower List",
  heroTitle: "A New Life Arrives",
  heroBody:
    "Join the private list for shower details, RSVP updates, registry guidance, and gentle reminders before the day.",
  primaryCta: "Join the List",
  secondaryCta: "View Registry",
  eventDate: process.env.NEXT_PUBLIC_EVENT_DATE || "June 2026",
  eventCity: process.env.NEXT_PUBLIC_EVENT_CITY || "Location shared with confirmed guests",
  reminderPromise:
    "No noise. Just the details that help everyone show up, celebrate, and prepare."
};

export const reminderDrops = [
  {
    label: "Drop 01",
    title: "Save the date",
    body: "Date, city, and calendar reminder."
  },
  {
    label: "Drop 02",
    title: "Registry guide",
    body: "Most-needed items, budget picks, and group gift options."
  },
  {
    label: "Drop 03",
    title: "Final details",
    body: "Address, parking, timing, and dress vibe."
  },
  {
    label: "Drop 04",
    title: "After the shower",
    body: "Thank-you notes, photo updates, and baby arrival opt-in."
  }
];
