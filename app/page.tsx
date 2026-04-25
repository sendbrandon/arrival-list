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
          <span>{siteCopy.name}</span>
        </div>

        <div className="hero__main">
          <div className="hero__content reveal">
            <p className="eyebrow">{siteCopy.eyebrow}</p>
            <h1 className="hero__title">{siteCopy.heroTitle}</h1>
            <p className="hero__names">{siteCopy.heroNames}</p>
            <p className="hero__sublabel">{siteCopy.heroSubLabel}</p>
            <div className="button-row">
              <Link className="button button--primary" href="/join">{siteCopy.primaryCta}</Link>
            </div>
          </div>

          <div className="hero__letter">
            <p className="eyebrow">{siteCopy.letter.eyebrow}</p>
            <p className="letter">{siteCopy.letter.body}</p>
          </div>
        </div>

        <div className="hero__details" aria-label="Event summary">
          <div>
            <span>The Day</span>
            <strong>{siteCopy.eventDate}</strong>
          </div>
          <div>
            <span>The Place</span>
            <strong>{siteCopy.eventCity}</strong>
          </div>
          <div>
            <span>Staying in Touch</span>
            <strong>Email, with optional texts</strong>
          </div>
        </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="section-heading">
          <p className="eyebrow">What to expect</p>
          <h2>The Schedule</h2>
        </div>
        <ol className="drop-schedule">
          {reminderDrops.map((drop) => (
            <li className="drop-row" key={drop.label}>
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

      <section className="section-shell">
        <div className="section-heading section-heading--inline">
          <div>
            <p className="eyebrow">From the registry</p>
            <h2>Things we&rsquo;d love help with.</h2>
          </div>
          <Link className="text-link" href="/registry">See everything</Link>
        </div>
        <div className="registry-grid">
          {featuredItems.map((item) => <RegistryCard key={item.id} item={item} />)}
        </div>
      </section>
    </main>
  );
}
