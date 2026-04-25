import type { Metadata } from "next";
import "./globals.css";

const title = "Baby in Bloom — Brandon & Shenika's Baby Shower";
const description =
  "Sunday, June 28, 2026. Join the guest list for address, reminders, and the registry. A small, slow afternoon — flowers, a long table, and the people who already love this little one most.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL("https://arrival-list.vercel.app"),
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
        height: 632,
        alt: "Baby in Bloom — Brandon & Shenika's Baby Shower"
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
