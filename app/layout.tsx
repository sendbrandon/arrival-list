import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Arrival List",
  description: "A private baby shower sign-up, RSVP, registry, and reminder portal."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
