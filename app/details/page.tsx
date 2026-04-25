import Link from "next/link";
import { siteCopy } from "@/lib/copy";

export default function DetailsPage() {
  return (
    <main className="page-shell">
      <nav className="mini-nav" aria-label="Back navigation">
        <Link href="/">← The Arrival List</Link>
        <Link href="/join">Join</Link>
      </nav>

      <section className="details-layout">
        <div>
          <p className="eyebrow">The day</p>
          <h1>Save the date. We&rsquo;ll send the rest closer to June.</h1>
        </div>

        <div className="detail-panel">
          <dl>
            <div>
              <dt>Date</dt>
              <dd>{siteCopy.eventDate}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{siteCopy.eventCity}</dd>
            </div>
            <div>
              <dt>Dress vibe</dt>
              <dd>Elevated casual. Cream, black, soft neutrals, vintage details welcome.</dd>
            </div>
            <div>
              <dt>Calendar</dt>
              <dd><a className="text-link" href="#replace-with-calendar-link">Add to calendar</a></dd>
            </div>
          </dl>
        </div>
      </section>
    </main>
  );
}
