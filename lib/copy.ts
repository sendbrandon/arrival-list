export const siteCopy = {
  name: "The Arrival List",
  eyebrow: "June / Private Shower List",
  heroTitle: "Brandon & Shenika",
  heroBody: "",
  primaryCta: "RSVP",
  secondaryCta: "View Registry",
  eventDate: process.env.NEXT_PUBLIC_EVENT_DATE || "June 2026",
  eventCity: process.env.NEXT_PUBLIC_EVENT_CITY || "Location shared with confirmed guests",
  reminderPromise:
    "No noise. Just the details that help everyone show up, celebrate, and prepare."
};

export const reminderDrops = [
  {
    label: "01",
    title: "Save the date",
    body: "Date, city, and calendar reminder.",
    when: "April"
  },
  {
    label: "02",
    title: "Registry guide",
    body: "Most-needed items, budget picks, and group gift options.",
    when: "May"
  },
  {
    label: "03",
    title: "Final details",
    body: "Address, parking, timing, and dress vibe.",
    when: "Early June"
  },
  {
    label: "04",
    title: "After the shower",
    body: "Thank-you notes, photo updates, and baby arrival opt-in.",
    when: "Late June"
  }
];
