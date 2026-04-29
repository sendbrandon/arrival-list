import type { Metadata } from "next";
import DPage from "../../d/page";

export const metadata: Metadata = {
  title: "Hero Test · Variant 04 — Baby in Bloom",
  robots: { index: false, follow: false },
};

export default function HeroTestV4() {
  return <DPage featuredImage="/hero-tests/04.jpg" featuredVariant="d-feature--portrait" />;
}
