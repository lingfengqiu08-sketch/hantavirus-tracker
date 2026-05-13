import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_NAME, SITE_URL, canonical } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hantavirus Tracker | MV Hondius Andes Virus Map",
    template: "%s | Hantavirus Tracker",
  },
  description:
    "Track the 2026 MV Hondius Andes virus outbreak with case counts, deaths, route map, passenger status, timeline, methodology, and official sources.",
  applicationName: SITE_NAME,
  alternates: { canonical: canonical("/") },
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    url: canonical("/"),
    title: "Hantavirus Tracker | MV Hondius Andes Virus Map",
    description:
      "2026 MV Hondius Andes virus outbreak map, case count, deaths, timeline, and sources.",
  },
  twitter: {
    card: "summary_large_image",
  },
  verification: {
    other: {
      "msvalidate.01": "F0579576AB55E316B917500C2D411048",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b">
          <nav className="mx-auto flex max-w-5xl items-center justify-between p-4 text-sm">
            <Link href="/" className="font-semibold tracking-tight">
              Hantavirus Tracker
            </Link>
            <ul className="flex items-center gap-4 text-muted-foreground">
              <li>
                <Link href="/cruise/mv-hondius" className="hover:text-foreground">
                  MV Hondius
                </Link>
              </li>
              <li>
                <Link href="/symptoms" className="hover:text-foreground">
                  Symptoms
                </Link>
              </li>
              <li>
                <Link href="/what-is-hantavirus" className="hover:text-foreground">
                  What is Hantavirus
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="hover:text-foreground">
                  Methodology
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">{children}</main>
        <footer className="border-t">
          <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-muted-foreground">
            <p>
              Independent tracker compiled from WHO, ECDC, and CDC public updates. Not a
              diagnostic resource. For medical emergencies contact local services.
            </p>
            <p className="mt-2">
              © {new Date().getFullYear()} {SITE_NAME}. Data last verified {" "}
              <Link href="/methodology" className="underline underline-offset-2">
                see methodology
              </Link>
              .
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
