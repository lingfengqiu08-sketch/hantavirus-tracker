import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { FAQ, type FAQItem } from "@/components/faq";
import { KpiCard } from "@/components/kpi-card";
import { SourceList } from "@/components/source-list";
import { UpdateBanner } from "@/components/update-banner";
import type { OutbreakData, Source } from "@/lib/outbreak";
import { SITE_NAME, canonical } from "@/lib/seo";

export type ReferenceFact = {
  label: string;
  value: string;
  description: string;
  tone?: "default" | "amber" | "red" | "green";
};

export type ReferenceSection = {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export type ReferenceRelatedLink = {
  href: string;
  label: string;
};

export type MedicalReferencePageProps = {
  path: string;
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  quickAnswer?: ReactNode;
  data: OutbreakData;
  facts: ReferenceFact[];
  sections: ReferenceSection[];
  faq: FAQItem[];
  sources: Source[];
  related: ReferenceRelatedLink[];
  condition?: {
    name: string;
    alternateName?: string[];
    signOrSymptom?: string[];
    transmissionMethod?: string[];
    possibleTreatment?: string;
  };
};

export function MedicalReferencePage({
  path,
  eyebrow,
  title,
  description,
  intro,
  quickAnswer,
  data,
  facts,
  sections,
  faq,
  sources,
  related,
  condition,
}: MedicalReferencePageProps) {
  const pageUrl = canonical(path);
  const conditionId = `${pageUrl}#condition`;
  const faqId = `${pageUrl}#faq`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        headline: title,
        description,
        datePublished: "2026-05-13",
        dateModified: data.lastUpdated,
        inLanguage: "en",
        isAccessibleForFree: true,
        mainEntity: [
          ...(condition ? [{ "@id": conditionId }] : []),
          { "@id": faqId },
        ],
        citation: sources.map((source) => ({
          "@type": "CreativeWork",
          name: source.name,
          url: source.url,
        })),
      },
      ...(condition
        ? [
            {
              "@type": "MedicalCondition",
              "@id": conditionId,
              name: condition.name,
              alternateName: condition.alternateName,
              signOrSymptom: condition.signOrSymptom?.map((name) => ({
                "@type": "MedicalSymptom",
                name,
              })),
              transmissionMethod: condition.transmissionMethod,
              possibleTreatment: condition.possibleTreatment
                ? {
                    "@type": "MedicalTherapy",
                    name: condition.possibleTreatment,
                  }
                : undefined,
            },
          ]
        : []),
      {
        "@type": "FAQPage",
        "@id": faqId,
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumbs`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: SITE_NAME,
            item: canonical("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: title,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <article className="space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="animate-fade-up space-y-5">
        <div className="space-y-3">
          <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
            <span className="h-px w-7 bg-primary/50" aria-hidden="true" />
            {eyebrow}
          </p>
          <h1 className="font-heading text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-5xl">
            {title}
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">{intro}</p>
        </div>
        {quickAnswer ? (
          <aside className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-secondary/70 via-card to-card p-5 shadow-[0_2px_8px_-3px_rgba(15,118,110,0.12)] sm:p-6">
            <span className="absolute inset-y-0 left-0 w-1.5 bg-primary" aria-hidden="true" />
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-primary">
              <ShieldCheck className="size-4" aria-hidden="true" />
              Quick answer
            </p>
            <div className="mt-2.5 text-[15px] leading-7 text-foreground/85 [&_strong]:font-semibold [&_strong]:text-foreground">
              {quickAnswer}
            </div>
          </aside>
        ) : null}
        <UpdateBanner
          lastUpdated={data.lastUpdated}
          lastVerifiedAt={data.lastVerifiedAt}
          sourceName={data.sourceName}
          sourceUrl={data.sourceUrl}
        />
      </header>

      <section id="quick-facts" className="space-y-4">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">Quick Facts</h2>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact) => (
            <KpiCard
              key={fact.label}
              label={fact.label}
              value={fact.value}
              description={fact.description}
              tone={fact.tone}
            />
          ))}
        </div>
      </section>

      {sections.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-24 space-y-4">
          <div className="space-y-1">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
              {section.title}
            </h2>
            {section.subtitle ? (
              <p className="text-sm font-medium text-primary/85">{section.subtitle}</p>
            ) : null}
          </div>
          <div className="space-y-3 text-[15px] leading-7 text-muted-foreground [&_a:hover]:text-primary/70 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_strong]:font-semibold [&_strong]:text-foreground">
            {section.children}
          </div>
        </section>
      ))}

      <section id="faq" className="scroll-mt-24 space-y-4">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          Frequently Asked Questions
        </h2>
        <FAQ items={faq} />
      </section>

      <section id="sources" className="scroll-mt-24 space-y-4">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">Sources</h2>
        <SourceList sources={sources} />
      </section>

      <nav className="rounded-2xl border bg-gradient-to-br from-muted/50 to-card p-5 sm:p-6">
        <p className="font-heading text-lg font-semibold tracking-tight">Continue reading</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {related.map((link) => (
            <li key={link.href}>
              <Link
                className="group flex items-center justify-between gap-2 rounded-lg border bg-card px-3.5 py-3 text-sm font-medium text-foreground transition-all hover:border-primary/30 hover:bg-secondary/40"
                href={link.href}
              >
                <span>{link.label}</span>
                <ArrowUpRight
                  className="size-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </article>
  );
}
