import Link from "next/link";
import { SignupForm } from "@/components/SignupForm";
import "../c/c.css";

export default function JoinPage() {
  return (
    <main className="c">
      {/* Top marquee */}
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
          <span className="c-marker__num">01</span>
          <span className="c-marker__label">Join the Guest List</span>
          <span className="c-marker__rule" aria-hidden="true" />
        </div>

        <h1 className="c-h2">
          Tell us you&rsquo;re <em>coming.</em>
        </h1>
        <p className="c-intro">
          We&rsquo;ll send the address, parking notes, and gentle reminders &mdash; kept brief, kept warm, never spammy.
        </p>
      </section>

      <section className="c-form-shell">
        <div className="c-shell c-form-shell__inner">
          <SignupForm />
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
