import type { Metadata } from "next";
import Link from "next/link";
import "../globals.css";
import "./hero-test.css";

export const metadata: Metadata = {
  title: "Hero Test — Baby in Bloom",
  robots: { index: false, follow: false },
};

const variants = [
  { id: "03", href: "/hero-test/v3", note: "Golden hour · burgundy suit · warm bokeh" },
  { id: "04", href: "/hero-test/v4", note: "Sunset · burgundy suit · deeper warmth" },
];

export default function HeroTestIndex() {
  return (
    <main className="hero-test">
      <header className="hero-test__intro">
        <span className="eyebrow">Hero Test · Vol. I — Summer '26</span>
        <h1>Two live versions.</h1>
        <p>Both rendered in the real home layout — same nav, schedule, registry. Click a variant to view it as the actual hero image, with the live fade and burgundy ground.</p>
      </header>

      {variants.map(({ id, href, note }) => (
        <Link key={id} href={href} className="hero-test__bay hero-test__bay--link">
          <div className="hero-test__bleed">
            <img src={`/hero-tests/${id}.jpg`} alt={`Hero variant ${id}`} />
          </div>
          <div className="hero-test__caption">
            <span className="hero-test__num">{id}</span>
            <span className="hero-test__note">{note}</span>
            <span className="hero-test__cta">View live →</span>
          </div>
        </Link>
      ))}

      <footer className="hero-test__foot">
        <span className="eyebrow">Internal preview · noindex</span>
      </footer>
    </main>
  );
}
