import Link from "next/link";
import { RegistryCard } from "@/components/RegistryCard";
import { registryItems } from "@/lib/registry";
import { reminderDrops, siteCopy } from "@/lib/copy";

export default function HomePage() {
  const featuredItems = registryItems.slice(0, 3);

  return (
    <main>
      <section className="hero">
        <div className="hero__video-wrap" aria-hidden="true">
          <video
            className="hero__video"
            src="/hero.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
          <div className="hero__video-overlay" />
        </div>

        <div className="hero__inner">
        <div className="nav-line" aria-label="Site identity">
          <span>{siteCopy.navTitle}</span>
        </div>

        <h1 className="hero__title hero__title--emigre reveal">
          <span className="t-1">a new</span>
          <span className="t-2">Life</span>
          <span className="t-3">arrives.</span>
        </h1>

        <figure className="hero__sonogram reveal" aria-label="Ultrasound — our little one">
          <img src="/sonogram.jpg" alt="Ultrasound profile of the baby" />
          <figcaption className="hero__sonogram-caption">the baby, in profile.</figcaption>
        </figure>

        <div className="hero__main">
          <div className="hero__content reveal">
            <p className="hero__names">{siteCopy.heroNames}</p>
            <p className="hero__date">{siteCopy.heroDateLong}</p>
            <p className="hero__location">{siteCopy.heroLocationShort}</p>
          </div>

          <div className="hero__letter">
            <p className="eyebrow">{siteCopy.letter.eyebrow}</p>
            <p className="letter">{siteCopy.letter.body}</p>
          </div>
        </div>

        <Link href="/join" className="rsvp-band reveal" aria-label="Join Our Guest List">
          <span className="rsvp-band__label">{siteCopy.primaryCta}</span>
          <span className="rsvp-band__meta">{siteCopy.heroDateLong}</span>
          <span className="rsvp-band__arrow" aria-hidden="true">→</span>
        </Link>

        <div className="hero__details" aria-label="Event summary">
          <div>
            <span>Dress</span>
            <strong>Elevated casual, soft neutrals</strong>
          </div>
          <div>
            <span>Parking & Map</span>
            <strong>Shared closer to the day</strong>
          </div>
          <div>
            <span>Staying in Touch</span>
            <strong>Email, with optional texts</strong>
          </div>
        </div>
        </div>
      </section>

      <section className="section-shell reveal-on-scroll">
        <div className="section-heading">
          <p className="eyebrow">What to expect</p>
          <h2>The Schedule</h2>
        </div>
        <ol className="drop-schedule">
          {reminderDrops.map((drop) => (
            <li className="drop-row reveal-on-scroll" key={drop.label}>
              <span className="drop-row__num">{drop.label}</span>
              <div className="drop-row__title">
                <h3>{drop.title}</h3>
              </div>
              <p className="drop-row__body">{drop.body}</p>
              <span className="drop-row__when">{drop.when}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="section-shell reveal-on-scroll">
        <div className="section-heading section-heading--inline">
          <div>
            <p className="eyebrow">From the registry</p>
            <h2>Things we&rsquo;d love help with.</h2>
          </div>
          <Link className="text-link" href="/registry">See everything</Link>
        </div>
        <div className="registry-grid">
          {featuredItems.map((item, i) => (
            <div className="reveal-on-scroll" key={item.id} style={{ animationDelay: `${i * 80}ms` }}>
              <RegistryCard item={item} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
