import Link from "next/link";
import { siteCopy } from "@/lib/copy";
import "../c/c.css";

export default function DetailsPage() {
  return (
    <main className="c">
      <div className="c-marquee" aria-hidden="true">
        <div className="c-marquee__track">
          {Array.from({ length: 2 }).map((_, halfIndex) => (
            <div className="c-marquee__half" key={halfIndex}>
              <div className="c-marquee__spacer" aria-hidden="true" />
              {Array.from({ length: 6 }).map((_, i) => (
                <div className="c-marquee__group" key={i}>
                  <span>You are invited &mdash; come eat slow, sit long, and bloom with us &mdash; Summer &rsquo;26</span>
                  <span className="c-marquee__mark">✿</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="c-shell c-section c-section--first">
        <div className="c-nav">
          <Link href="/" className="c-nav__brand">
            Baby <em>in</em> Bloom
          </Link>
          <span className="c-nav__edition">Vol. I &mdash; Summer &rsquo;26</span>
        </div>

        <div className="c-marker">
          <span className="c-marker__num">02</span>
          <span className="c-marker__label">The Day</span>
          <span className="c-marker__rule" aria-hidden="true" />
        </div>

        <h1 className="c-h2">
          Save the date.
          <br />
          We&rsquo;ll send the rest <em>closer to June.</em>
        </h1>

        <dl className="c-details">
          <div className="c-details__row">
            <dt>Date</dt>
            <dd>{siteCopy.eventDate}</dd>
          </div>
          <div className="c-details__row">
            <dt>Location</dt>
            <dd>{siteCopy.eventCity}</dd>
          </div>
          <div className="c-details__row">
            <dt>Dress</dt>
            <dd>Elevated casual &mdash; soft neutrals, vintage details welcome</dd>
          </div>
          <div className="c-details__row">
            <dt>Calendar</dt>
            <dd>
              <Link className="c-text-link" href="#replace-with-calendar-link">Add to calendar</Link>
            </dd>
          </div>
        </dl>

        <div className="c-section__cta">
          <Link href="/join" className="c-text-link">Join the guest list →</Link>
        </div>
      </section>

      <footer className="c-footer">
        <span>Baby in Bloom · Vol. I · 2026</span>
        <span aria-hidden="true" className="c-footer__mark">✿</span>
        <span>Made with care · B &amp; S</span>
      </footer>
    </main>
  );
}
