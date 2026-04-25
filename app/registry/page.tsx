import Link from "next/link";
import { RegistryCard } from "@/components/RegistryCard";
import { registryCategories, registryItems } from "@/lib/registry";
import "../c/c.css";

export default function RegistryPage() {
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
          <span className="c-marker__num">03</span>
          <span className="c-marker__label">From the Registry</span>
          <span className="c-marker__rule" aria-hidden="true" />
        </div>

        <h1 className="c-h2">
          Things we&rsquo;d <em>love</em> help with.
        </h1>
        <p className="c-intro">
          A short list, organized by need and budget. Click an item to open the full registry &mdash; group gifts and cash funds welcome.
        </p>
      </section>

      {registryCategories.map((category) => {
        const items = registryItems.filter((item) => item.category === category);
        if (!items.length) return null;
        return (
          <section className="c-shell c-section" key={category}>
            <div className="c-marker">
              <span className="c-marker__num">·</span>
              <span className="c-marker__label">{category}</span>
              <span className="c-marker__rule" aria-hidden="true" />
            </div>
            <div className="c-registry">
              {items.map((item) => (
                <RegistryCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        );
      })}

      <footer className="c-footer">
        <span>Baby in Bloom · Vol. I · 2026</span>
        <span aria-hidden="true" className="c-footer__mark">✿</span>
        <span>Made with care · B &amp; S</span>
      </footer>
    </main>
  );
}
