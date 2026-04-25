export const siteCopy = {
  name: "The Arrival List",
  navTitle: "Baby Shower",
  heroTitle: "A New Life Arrives",
  heroNames: "Celebrate with Brandon & Shenika",
  heroDateLong: process.env.NEXT_PUBLIC_EVENT_DATE_LONG || "Sunday · June 28, 2026",
  heroLocationShort: process.env.NEXT_PUBLIC_EVENT_LOCATION_SHORT || "Location shared with confirmed guests",
  letter: {
    eyebrow: "A note from us",
    body: "To the family we love most — this little one is already so loved because of you. We can\u2019t wait to see you in June.",
    signoff: "— Brandon & Shenika"
  },
  heroBody: "",
  primaryCta: "Join Our Guest List",
  secondaryCta: "View Registry",
  eventDate: process.env.NEXT_PUBLIC_EVENT_DATE || "Sunday, June 28, 2026",
  eventCity: process.env.NEXT_PUBLIC_EVENT_CITY || "Location shared with confirmed guests",
  reminderPromise:
    "No noise. Just the details that help everyone show up, celebrate, and prepare."
};

export const reminderDrops = [
  {
    label: "01",
    title: "Save the Date",
    body: "The day, the city, the calendar invite.",
    when: "April"
  },
  {
    label: "02",
    title: "The Registry",
    body: "What we\u2019d love help with — by need, by budget.",
    when: "May"
  },
  {
    label: "03",
    title: "Final Details",
    body: "Address, parking, timing, what to wear.",
    when: "Early June"
  },
  {
    label: "04",
    title: "After the Shower",
    body: "Thank-yous, photos, baby updates.",
    when: "Late June"
  }
];
