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
          <p className="eyebrow">Our guest list</p>
          <h1>We&rsquo;d love to have you.</h1>
          <p>
            Add your details once and we&rsquo;ll keep you in the loop &mdash; the date, final
            location, registry guidance, and a few gentle reminders before the day.
          </p>
        </div>
        <SignupForm />
      </section>
    </main>
  );
}
