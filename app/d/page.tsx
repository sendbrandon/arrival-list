import Link from "next/link";
import { reminderDrops, siteCopy } from "@/lib/copy";
import { SignupForm } from "@/components/SignupForm";
import "../c/c.css";
import "./d.css";

export default function DPage({
  featuredImage = "/baby-in-bloom-invite.jpg",
  featuredVariant = "",
}: { featuredImage?: string; featuredVariant?: string } = {}) {
  const isPortrait = featuredVariant.includes("d-feature--portrait");

  return (
    <main className="c d">
      {/* Top marquee — decorative only. aria-hidden on outer + sr-only label
          inside replaces 12 DOM copies of the same sentence with a single
          accessible label. Visual loop: 2 halves, 3 groups each = 6 copies. */}
      <div className="c-marquee" aria-hidden="true">
        <div className="c-marquee__track">
          {Array.from({ length: 2 }).map((_, halfIndex) => (
            <div className="c-marquee__half" key={halfIndex}>
              <div className="c-marquee__spacer" aria-hidden="true" />
              {Array.from({ length: 3 }).map((_, i) => (
                <div className="c-marquee__group" key={i}>
                  <span>You are invited &mdash; come eat slow, sit long, and bloom with us &mdash; Summer &rsquo;26</span>
                  <span className="c-marquee__mark">✿</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="c-hero d-hero">
        <div className="c-shell c-hero__inner">
          {/* Nav */}
          <div className="c-nav">
            <span className="c-nav__brand">
              Baby <em>in</em> Bloom
            </span>
            <span className="c-nav__edition">Vol. I &mdash; Summer &rsquo;26</span>
          </div>

          {/* Section marker — 00 The Invitation */}
          <div className="c-marker">
            <span className="c-marker__num">00</span>
            <span className="c-marker__label">The Invitation</span>
            <span className="c-marker__rule" aria-hidden="true" />
          </div>

          {/* Featured invitation image — fades top + bottom */}
          <figure className={`d-feature${featuredVariant ? " " + featuredVariant : ""}`} aria-label="Baby in Bloom invitation">
            <img src={featuredImage} alt="Baby in Bloom invitation" />
            {isPortrait && (
              <figcaption className="d-feature__overlay">
                <h1 className="d-overlay__headline">
                  <em>Brandon</em>
                  <span className="d-overlay__amp">&amp;</span>
                  <em>Shenika</em>
                </h1>
                <span className="d-overlay__rule" aria-hidden="true" />
                <p className="d-overlay__date">{siteCopy.heroDateLong}</p>
                <p className="d-overlay__location">
                  Private location shared after RSVP &middot; {siteCopy.heroRegionShort}
                </p>
              </figcaption>
            )}
          </figure>

          {/* Portrait variant: signup form sits right under the overlay image */}
          {isPortrait && (
            <div className="c-signup">
              <div className="c-marker">
                <span className="c-marker__num">01</span>
                <span className="c-marker__label">Reserve Your Seat</span>
                <span className="c-marker__rule" aria-hidden="true" />
              </div>
              <p className="c-signup__intro">
                Add your name to the guest list and we&rsquo;ll send the private location
                details, calendar reminder, and final notes closer to the day.
              </p>
              <SignupForm />
            </div>
          )}

          {/* Main row — names + note */}
          <div className="c-main">
            {!isPortrait && (
              <div className="c-content">
                <p className="c-names">
                  Celebrate with <em>Brandon <span className="c-amp">&amp;</span> Shenika</em>
                </p>
                <p className="c-date">{siteCopy.heroDateLong}</p>
                <p className="c-location">{siteCopy.heroLocationShort}</p>
              </div>
            )}

            <div className="c-letter">
              <p className="c-eyebrow">A note from us</p>
              <p className="c-letter__body">{siteCopy.letter.body}</p>
              <p className="c-letter__signoff">&mdash; Brandon <span className="c-amp">&amp;</span> Shenika</p>
            </div>
          </div>
        </div>

        {/* Black slab CTA — bottom of hero (default layout only) */}
        {!isPortrait && (
          <Link href="/join" className="c-rsvp">
            <span className="c-rsvp__label">Reserve Your Seat</span>
            <span className="c-rsvp__rule" aria-hidden="true" />
            <span className="c-rsvp__meta">Confirm RSVP · Receive Details</span>
            <span className="c-rsvp__arrow" aria-hidden="true">→</span>
          </Link>
        )}
      </section>

      {/* Schedule — what happens next */}
      <section className="c-shell c-section">
        <div className="c-marker">
          <span className="c-marker__num">02</span>
          <span className="c-marker__label">What Happens Next</span>
          <span className="c-marker__rule" aria-hidden="true" />
        </div>
        <h2 className="c-h2">
          Between Now <em>&amp;</em> the Day<span className="c-title__period">.</span>
        </h2>
        <ol className="c-schedule">
          {reminderDrops.map((drop) => (
            <li className="c-schedule__row" key={drop.label}>
              <span className="c-schedule__num">{drop.label}</span>
              <h3 className="c-schedule__title">{drop.title}</h3>
              <p className="c-schedule__body">{drop.body}</p>
              <span className="c-schedule__when">{drop.when}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Registry — editorial directory, no fake product cards */}
      <section className="c-section c-section--registry">
        <div className="c-shell">
          <div className="c-marker">
            <span className="c-marker__num">03</span>
            <span className="c-marker__label">The Registry</span>
            <span className="c-marker__rule" aria-hidden="true" />
          </div>
          <h2 className="c-h2 c-h2--registry">
            A small list, <em>thoughtfully</em> kept<span className="c-title__period">.</span>
          </h2>
          <p className="c-registry__intro">
            Nothing is expected. Anything is deeply appreciated. We kept the registry
            simple, useful, and full of things that will actually help.
          </p>
        </div>

        {/* Full-bleed Babylist slab — sits tight under the H2, mirrors hero CTA */}
        <a
          href="https://my.babylist.com/shenika-king"
          target="_blank"
          rel="noopener noreferrer"
          className="c-rsvp c-rsvp--registry"
        >
          <span className="c-rsvp__label">Open the Babylist Registry</span>
          <span className="c-rsvp__rule" aria-hidden="true" />
          <span className="c-rsvp__meta">my.babylist.com / shenika-king</span>
          <span className="c-rsvp__arrow" aria-hidden="true">→</span>
        </a>

        <div className="c-shell">
          <ul className="c-registry-cats" aria-label="Registry categories">
            <li>Most needed</li>
            <li aria-hidden="true">·</li>
            <li>Group gifts</li>
            <li aria-hidden="true">·</li>
            <li>On sale</li>
            <li aria-hidden="true">·</li>
            <li>Diaper fund</li>
            <li aria-hidden="true">·</li>
            <li>Real ones</li>
          </ul>
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
