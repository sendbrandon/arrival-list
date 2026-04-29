import type { Metadata } from "next";
import DPage from "../../d/page";

export const metadata: Metadata = {
  title: "Hero Test · Variant 03 — Baby in Bloom",
  robots: { index: false, follow: false },
};

export default function HeroTestV3() {
  return <DPage featuredImage="/hero-tests/03.jpg" featuredVariant="d-feature--portrait" />;
}
