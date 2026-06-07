import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/components/google-analytics";
import { LogoMark } from "@/components/site-logo";
import { SiteNav } from "@/components/site-nav";
import { SITE_NAME, SITE_URL, canonical } from "@/lib/seo";
import { getOutbreak } from "@/lib/outbreak";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
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
  alternates: {
    canonical: canonical("/"),
    types: {
      "application/rss+xml": `${SITE_URL}/feed.xml`,
    },
  },
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
  const data = getOutbreak();
  const lastVerifiedDate = new Date(data.lastVerifiedAt).toISOString().slice(0, 10);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <GoogleAnalytics />
        <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/65">
          <nav className="relative mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3.5 text-sm">
            <Link
              href="/"
              className="group flex items-center gap-2.5 text-foreground"
              aria-label="Hantavirus Tracker home"
            >
              <LogoMark className="size-8 shrink-0 transition-transform duration-300 group-hover:scale-105" />
              <span className="font-heading text-lg font-semibold tracking-tight">Hantavirus Tracker</span>
            </Link>
            <SiteNav />
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
              © {new Date().getFullYear()} {SITE_NAME}. Data last verified{" "}
              <strong className="font-medium text-foreground">{lastVerifiedDate}</strong>.{" "}
              <Link href="/methodology" className="underline underline-offset-2">
                See methodology
              </Link>
              .
            </p>
            <nav className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              <Link href="/about" className="underline underline-offset-2">
                About
              </Link>
              <Link href="/editorial-policy" className="underline underline-offset-2">
                Editorial policy
              </Link>
              <Link href="/medical-disclaimer" className="underline underline-offset-2">
                Medical disclaimer
              </Link>
              <Link href="/corrections" className="underline underline-offset-2">
                Corrections
              </Link>
              <Link href="/privacy" className="underline underline-offset-2">
                Privacy
              </Link>
              <Link href="/updates" className="underline underline-offset-2">
                Updates
              </Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
