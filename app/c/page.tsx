import Link from "next/link";
import { HeroVideo } from "@/components/HeroVideo";
import { RegistryCard } from "@/components/RegistryCard";
import { registryItems } from "@/lib/registry";
import { reminderDrops, siteCopy } from "@/lib/copy";
import "./c.css";

export default function CPage() {
  const featuredItems = registryItems.slice(0, 3);

  return (
    <main className="c">
      {/* Top marquee */}
      <div className="c-marquee" aria-hidden="true">
        <div className="c-marquee__track">
          <span>You are invited &mdash; come eat slow, sit long, and bloom with us &mdash; Summer &rsquo;26</span>
          <span className="c-marquee__mark">✿</span>
          <span>You are invited &mdash; come eat slow, sit long, and bloom with us &mdash; Summer &rsquo;26</span>
          <span className="c-marquee__mark">✿</span>
        </div>
      </div>

      <section className="c-hero">
        <div className="c-hero__video" aria-hidden="true">
          <HeroVideo />
          <div className="c-hero__video-overlay" />
        </div>

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

          {/* Sonogram bleed — atmospheric */}
          <figure className="c-sonogram" aria-hidden="true">
            <img src="/sonogram.jpg" alt="" />
          </figure>

          {/* Title — same content as v1, new skin */}
          <h1 className="c-title">
            <span className="c-title__t1">a new</span>
            <span className="c-title__t2">Life</span>
            <span className="c-title__t3">
              arrives<span className="c-title__period">.</span>
            </span>
          </h1>

          {/* Main row — names + note */}
          <div className="c-main">
            <div className="c-content">
              <p className="c-names">
                Celebrate with <em>Brandon <span className="c-amp">&amp;</span> Shenika</em>
              </p>
              <p className="c-date">{siteCopy.heroDateLong}</p>
              <p className="c-location">{siteCopy.heroLocationShort}</p>
            </div>

            <div className="c-letter">
              <p className="c-eyebrow">A note from us</p>
              <p className="c-letter__body">{siteCopy.letter.body}</p>
              <p className="c-letter__signoff">&mdash; Brandon <span className="c-amp">&amp;</span> Shenika</p>
            </div>
          </div>
        </div>

        {/* Black slab CTA */}
        <Link href="/join" className="c-rsvp">
          <span className="c-rsvp__label">Join Our Guest List</span>
          <span className="c-rsvp__rule" aria-hidden="true" />
          <span className="c-rsvp__meta">Address · Reminders · Registry</span>
          <span className="c-rsvp__arrow" aria-hidden="true">→</span>
        </Link>
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
