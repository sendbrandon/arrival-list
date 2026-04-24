import Link from "next/link";
import { RegistryCard } from "@/components/RegistryCard";
import { registryItems } from "@/lib/registry";
import { reminderDrops, siteCopy } from "@/lib/copy";

export default function HomePage() {
  const featuredItems = registryItems.slice(0, 3);

  return (
    <main>
      <section className="hero section-shell">
        <div className="nav-line" aria-label="Site identity">
          <span>{siteCopy.name}</span>
          <span>{siteCopy.eventDate}</span>
        </div>

        <div className="hero__content reveal">
          <p className="eyebrow">{siteCopy.eyebrow}</p>
          <h1>{siteCopy.heroTitle}</h1>
          <p className="hero__body">{siteCopy.heroBody}</p>
          <div className="button-row">
            <Link className="button button--primary" href="/join">{siteCopy.primaryCta}</Link>
            <Link className="button button--secondary" href="/registry">{siteCopy.secondaryCta}</Link>
          </div>
        </div>

        <div className="hero__details" aria-label="Event summary">
          <div>
            <span>Date</span>
            <strong>{siteCopy.eventDate}</strong>
          </div>
          <div>
            <span>Location</span>
            <strong>{siteCopy.eventCity}</strong>
          </div>
          <div>
            <span>Reminders</span>
            <strong>Email / optional SMS</strong>
          </div>
        </div>
      </section>

      <section className="section-shell split-section">
        <div>
          <p className="eyebrow">Private List</p>
          <h2>Not just an RSVP. A small portal for everything guests need.</h2>
        </div>
        <p>{siteCopy.reminderPromise}</p>
      </section>

      <section className="section-shell">
        <div className="section-heading">
          <p className="eyebrow">Reminder cadence</p>
          <h2>The Drop Schedule</h2>
        </div>
        <div className="drop-grid">
          {reminderDrops.map((drop) => (
            <article className="drop-card" key={drop.label}>
              <span>{drop.label}</span>
              <h3>{drop.title}</h3>
              <p>{drop.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="section-heading section-heading--inline">
          <div>
            <p className="eyebrow">Registry preview</p>
            <h2>Things that help us prepare.</h2>
          </div>
          <Link className="text-link" href="/registry">Open full registry guide</Link>
        </div>
        <div className="registry-grid">
          {featuredItems.map((item) => <RegistryCard key={item.id} item={item} />)}
        </div>
      </section>
    </main>
  );
}
