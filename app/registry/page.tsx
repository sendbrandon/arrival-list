import Link from "next/link";
import { RegistryCard } from "@/components/RegistryCard";
import { registryCategories, registryItems } from "@/lib/registry";

export default function RegistryPage() {
  return (
    <main className="page-shell">
      <nav className="mini-nav" aria-label="Back navigation">
        <Link href="/">← The Arrival List</Link>
        <Link href="/join">Join</Link>
      </nav>

      <section className="registry-hero">
        <p className="eyebrow">Registry Guide</p>
        <h1>Gift guidance by need, budget, and timing.</h1>
        <p>
          This is designed to make gifting easier. Start with most-needed items, choose a budget,
          or join a group gift for one of the bigger essentials.
        </p>
      </section>

      {registryCategories.map((category) => {
        const items = registryItems.filter((item) => item.category === category);
        if (!items.length) return null;
        return (
          <section className="registry-section" key={category}>
            <div className="section-heading section-heading--inline">
              <div>
                <p className="eyebrow">{category}</p>
                <h2>{category === "Real Ones" ? "The practical love." : category}</h2>
              </div>
            </div>
            <div className="registry-grid">
              {items.map((item) => <RegistryCard key={item.id} item={item} />)}
            </div>
          </section>
        );
      })}
    </main>
  );
}
