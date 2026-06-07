"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/cruise/mv-hondius", label: "MV Hondius" },
  { href: "/symptoms", label: "Symptoms" },
  { href: "/transmission", label: "Transmission" },
  { href: "/treatment", label: "Treatment" },
  { href: "/what-is-hantavirus", label: "What is Hantavirus" },
  { href: "/cases", label: "Cases" },
  { href: "/response-tracker", label: "Response" },
  { href: "/methodology", label: "Methodology" },
  { href: "/about", label: "About" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop: inline links */}
      <ul className="hidden flex-wrap items-center justify-end gap-x-5 gap-y-2 text-[13px] font-medium text-muted-foreground sm:flex">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="transition-colors hover:text-primary">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile: hamburger toggle */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-9 items-center justify-center rounded-lg border text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary sm:hidden"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        {open ? (
          <X className="size-5" aria-hidden="true" />
        ) : (
          <Menu className="size-5" aria-hidden="true" />
        )}
      </button>

      {/* Mobile: dropdown panel */}
      {open ? (
        <ul className="absolute inset-x-0 top-full z-50 grid gap-0.5 border-b bg-background/95 px-4 py-3 shadow-sm backdrop-blur-md sm:hidden">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary/50 hover:text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
