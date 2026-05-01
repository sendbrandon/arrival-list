import type { Metadata } from "next";
import "./globals.css";

const title = "Baby in Bloom — Brandon & Shenika";
const description =
  "A small, slow afternoon for the people we love most. RSVP to save your seat.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL("https://kingadams.family"),
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_US",
    siteName: "Baby in Bloom",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Baby in Bloom — Brandon & Shenika"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image.png"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
