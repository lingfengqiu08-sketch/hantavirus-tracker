"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

type TestTimingCheckerProps = {
  defaultExposureDate: string;
};

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function parseIsoDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return date;
}

function addDays(date: Date, days: number) {
  return new Date(date.getTime() + days * MS_PER_DAY);
}

function daysBetween(start: Date, end: Date) {
  return Math.round((end.getTime() - start.getTime()) / MS_PER_DAY);
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function trackCheckerUse(hasSymptomDate: boolean) {
  if (typeof window.gtag !== "function") return;

  window.gtag("event", "test_checker_use", {
    page_path: "/test",
    has_symptom_date: hasSymptomDate,
  });
}

export function TestTimingChecker({ defaultExposureDate }: TestTimingCheckerProps) {
  const [exposureDate, setExposureDate] = useState(defaultExposureDate);
  const [symptomDate, setSymptomDate] = useState("");
  const hasTrackedInitialState = useRef(false);

  const result = useMemo(() => {
    const exposure = parseIsoDate(exposureDate);
    const symptom = symptomDate ? parseIsoDate(symptomDate) : null;

    if (!exposure) return null;

    const earliestSymptoms = addDays(exposure, 4);
    const latestSymptoms = addDays(exposure, 42);
    const symptomDelayDays = symptom ? daysBetween(exposure, symptom) : null;
    const symptomInAndesWindow =
      symptomDelayDays !== null && symptomDelayDays >= 4 && symptomDelayDays <= 42;

    return {
      exposure,
      symptom,
      earliestSymptoms,
      latestSymptoms,
      symptomDelayDays,
      symptomInAndesWindow,
    };
  }, [exposureDate, symptomDate]);

  useEffect(() => {
    if (!hasTrackedInitialState.current) {
      hasTrackedInitialState.current = true;
      return;
    }

    if (!result) return;
    trackCheckerUse(Boolean(result.symptom));
  }, [result]);

  return (
    <div className="rounded-lg border bg-card p-4 text-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-1">
          <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
            <CalendarDays className="size-4" aria-hidden="true" />
            PCR Test Timing Checker
          </h3>
          <p className="leading-6 text-muted-foreground">
            Enter a last possible exposure date and, if relevant, a first symptom date.
            This gives education-only timing context for what to ask a clinician or
            public-health team.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:w-[28rem]">
          <label className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Last possible exposure
            </span>
            <input
              type="date"
              value={exposureDate}
              onChange={(event) => setExposureDate(event.target.value)}
              className="h-9 rounded-md border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              First symptom date
            </span>
            <input
              type="date"
              value={symptomDate}
              onChange={(event) => setSymptomDate(event.target.value)}
              className="h-9 rounded-md border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          </label>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setExposureDate("2026-05-10")}
        >
          MV Hondius May 10
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setExposureDate("2026-05-06")}
        >
          Cabo Verde May 6
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setSymptomDate("")}
        >
          Clear symptom date
        </Button>
      </div>

      {result ? (
        <>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-md border border-amber-300 bg-amber-50 p-3 dark:bg-amber-950/30">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Andes symptom window
              </p>
              <p className="mt-2 text-lg font-semibold text-foreground">
                {formatDate(result.earliestSymptoms)} - {formatDate(result.latestSymptoms)}
              </p>
              <p className="mt-1 leading-6 text-muted-foreground">
                CDC Andes timing is 4-42 days after exposure.
              </p>
            </div>
            <div className="rounded-md border p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                If no symptoms
              </p>
              <p className="mt-2 text-lg font-semibold text-foreground">Monitor</p>
              <p className="mt-1 leading-6 text-muted-foreground">
                Testing choices for contacts are managed by clinicians or health departments.
              </p>
            </div>
            <div className="rounded-md border border-emerald-300 bg-emerald-50 p-3 dark:bg-emerald-950/30">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                If symptoms appear
              </p>
              <p className="mt-2 text-lg font-semibold text-foreground">Call first</p>
              <p className="mt-1 leading-6 text-muted-foreground">
                Contact a medical professional or local public-health authority promptly.
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-md border bg-muted/30 p-3 leading-6 text-muted-foreground">
            {result.symptom && result.symptomDelayDays !== null ? (
              <>
                <p className="font-medium text-foreground">
                  Symptom timing: {result.symptomDelayDays} days after exposure.
                </p>
                <p className="mt-1">
                  {result.symptomInAndesWindow
                    ? "That falls inside the 4-42 day Andes virus monitoring window. A clinician or health department can decide whether PCR, IgM/IgG serology, repeat testing, or isolation guidance is appropriate."
                    : "That does not fit neatly inside the 4-42 day Andes virus window. Do not use this page to rule anything in or out; ask a clinician or public-health authority how to interpret the date."}
                </p>
                <p className="mt-2">
                  If antibody testing is negative from a specimen collected within 72 hours of
                  symptom onset, CDC guidance says a later specimen collected after 72 hours may be
                  needed to rule out New World hantavirus infection.
                </p>
              </>
            ) : (
              <>
                <p className="font-medium text-foreground">
                  No symptom onset date entered.
                </p>
                <p className="mt-1">
                  For an exposed but asymptomatic person, a single early negative test should not be
                  treated as a self-clearance result. Follow the monitoring plan from the health
                  department or clinician managing the exposure.
                </p>
              </>
            )}
          </div>
        </>
      ) : (
        <p className="mt-4 rounded-md border border-red-300 bg-red-50 p-3 text-red-900 dark:bg-red-950/30 dark:text-red-200">
          Enter a valid exposure date to see timing guidance.
        </p>
      )}

      <p className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 leading-6 text-red-900 dark:bg-red-950/30 dark:text-red-200">
        This checker is not a diagnostic tool. If you have symptoms after a possible
        hantavirus or Andes virus exposure, contact a medical professional or local
        public-health authority.
      </p>
    </div>
  );
}
