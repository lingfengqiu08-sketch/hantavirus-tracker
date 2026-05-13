import type { ReactNode } from "react";
import Link from "next/link";
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
    <article className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{eyebrow}</p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
        <p className="text-base text-muted-foreground">{intro}</p>
        <UpdateBanner
          lastUpdated={data.lastUpdated}
          lastVerifiedAt={data.lastVerifiedAt}
          sourceName={data.sourceName}
          sourceUrl={data.sourceUrl}
        />
      </header>

      <section id="quick-facts" className="space-y-3">
        <h2 className="text-xl font-semibold">Quick Facts</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
        <section key={section.id} id={section.id} className="space-y-3">
          <h2 className="text-xl font-semibold">{section.title}</h2>
          {section.subtitle ? <h3 className="text-base font-medium">{section.subtitle}</h3> : null}
          <div className="space-y-3 text-sm leading-6 text-muted-foreground">
            {section.children}
          </div>
        </section>
      ))}

      <section id="faq" className="space-y-3">
        <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
        <FAQ items={faq} />
      </section>

      <section id="sources" className="space-y-3">
        <h2 className="text-xl font-semibold">Sources</h2>
        <SourceList sources={sources} />
      </section>

      <nav className="rounded-lg border bg-muted/40 p-4 text-sm">
        <p className="font-medium">Continue reading</p>
        <ul className="mt-2 space-y-1">
          {related.map((link) => (
            <li key={link.href}>
              <Link className="underline underline-offset-4" href={link.href}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </article>
  );
}
