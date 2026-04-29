import Link from "next/link";
import { RegistryCard } from "@/components/RegistryCard";
import { registryItems } from "@/lib/registry";
import { reminderDrops, siteCopy } from "@/lib/copy";
import "../c/c.css";
import "./d.css";

export default function DPage({
  featuredImage = "/baby-in-bloom-invite.jpg",
  featuredVariant = "",
}: { featuredImage?: string; featuredVariant?: string } = {}) {
  const featuredItems = registryItems.slice(0, 3);
  const isPortrait = featuredVariant.includes("d-feature--portrait");

  return (
    <main className="c d">
      {/* Top marquee — two halves, each with a spacer so first text appears offset right */}
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
                <p className="d-overlay__eyebrow">
                  <em>An invitation to Baby in Bloom</em>
                </p>
                <h1 className="d-overlay__headline">
                  <em>Brandon</em>
                  <span className="d-overlay__amp">&amp;</span>
                  <em>Shenika</em>
                </h1>
                <p className="d-overlay__date">{siteCopy.heroDateLong}</p>
                <p className="d-overlay__location">Location shared with confirmed guests</p>
              </figcaption>
            )}
          </figure>

          {/* Portrait variant: Join CTA sits right under the overlay image */}
          {isPortrait && (
            <Link href="/join" className="c-rsvp c-rsvp--tight c-rsvp--inline">
              <span className="c-rsvp__label">Join Our Guest List</span>
              <span className="c-rsvp__rule" aria-hidden="true" />
              <span className="c-rsvp__meta">Address · Reminders · Registry</span>
              <span className="c-rsvp__arrow" aria-hidden="true">→</span>
            </Link>
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
            <span className="c-rsvp__label">Join Our Guest List</span>
            <span className="c-rsvp__rule" aria-hidden="true" />
            <span className="c-rsvp__meta">Address · Reminders · Registry</span>
            <span className="c-rsvp__arrow" aria-hidden="true">→</span>
          </Link>
        )}
      </section>

      {/* Schedule */}
      <section className="c-shell c-section">
        <div className="c-marker">
          <span className="c-marker__num">02</span>
          <span className="c-marker__label">What to expect</span>
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

      {/* Registry */}
      <section className="c-shell c-section">
        <div className="c-marker">
          <span className="c-marker__num">03</span>
          <span className="c-marker__label">From the registry</span>
          <span className="c-marker__rule" aria-hidden="true" />
        </div>
        <h2 className="c-h2">
          Things we&rsquo;d <em>love</em> help with<span className="c-title__period">.</span>
        </h2>
        <div className="c-registry">
          {featuredItems.map((item) => (
            <RegistryCard key={item.id} item={item} />
          ))}
        </div>
        <Link href="/registry" className="c-text-link">See everything →</Link>
      </section>

      <footer className="c-footer">
        <span>Baby in Bloom · Vol. I · 2026</span>
        <span aria-hidden="true" className="c-footer__mark">✿</span>
        <span>Made with care · B &amp; S</span>
      </footer>
    </main>
  );
}
