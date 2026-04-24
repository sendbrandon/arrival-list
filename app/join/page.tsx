import Link from "next/link";
import { SignupForm } from "@/components/SignupForm";

export default function JoinPage() {
  return (
    <main className="page-shell">
      <nav className="mini-nav" aria-label="Back navigation">
        <Link href="/">← The Arrival List</Link>
        <Link href="/registry">Registry</Link>
      </nav>

      <section className="form-layout">
        <div>
          <p className="eyebrow">Join the list</p>
          <h1>RSVP, reminders, registry guidance.</h1>
          <p>
            Add your details once. We will send the important notes: date, final location,
            registry guidance, and event-day reminders.
          </p>
        </div>
        <SignupForm />
      </section>
    </main>
  );
}
