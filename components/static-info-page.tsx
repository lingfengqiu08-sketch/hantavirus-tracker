import Link from "next/link";
import type { ReactNode } from "react";

export type StaticInfoSection = {
  id: string;
  title: string;
  children: ReactNode;
};

export type StaticInfoPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  updatedLabel?: string;
  sections: StaticInfoSection[];
  related?: Array<{ href: string; label: string }>;
};

export function StaticInfoPage({
  eyebrow,
  title,
  description,
  updatedLabel,
  sections,
  related = [],
}: StaticInfoPageProps) {
  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{eyebrow}</p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
        <p className="max-w-3xl text-base leading-7 text-muted-foreground">{description}</p>
        {updatedLabel ? (
          <p className="text-sm text-muted-foreground">Last reviewed: {updatedLabel}</p>
        ) : null}
      </header>

      <div className="space-y-6">
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="space-y-3">
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <div className="space-y-3 text-sm leading-6 text-muted-foreground">
              {section.children}
            </div>
          </section>
        ))}
      </div>

      {related.length > 0 ? (
        <nav className="rounded-lg border bg-muted/40 p-4 text-sm">
          <p className="font-medium">Related pages</p>
          <ul className="mt-2 space-y-1">
            {related.map((item) => (
              <li key={item.href}>
                <Link className="underline underline-offset-4" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </article>
  );
}
