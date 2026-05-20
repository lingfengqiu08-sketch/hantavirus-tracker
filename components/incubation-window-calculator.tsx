"use client";

import { useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type IncubationWindowCalculatorProps = {
  defaultExposureDate: string;
};

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const timingRows = [
  {
    question: "Andes virus incubation period",
    range: "4-42 days",
    use: "Best match for MV Hondius contact monitoring.",
  },
  {
    question: "General HPS incubation period",
    range: "1-8 weeks",
    use: "Broader hantavirus pulmonary syndrome timing.",
  },
  {
    question: "Early negative test",
    range: "Timing-dependent",
    use: "Does not replace monitoring instructions.",
  },
];

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

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function IncubationWindowCalculator({
  defaultExposureDate,
}: IncubationWindowCalculatorProps) {
  const [exposureDate, setExposureDate] = useState(defaultExposureDate);

  const result = useMemo(() => {
    const parsed = parseIsoDate(exposureDate);
    if (!parsed) return null;

    return {
      exposure: parsed,
      andesEarliest: addDays(parsed, 4),
      andesLatest: addDays(parsed, 42),
      generalEarliest: addDays(parsed, 7),
      generalLatest: addDays(parsed, 56),
    };
  }, [exposureDate]);

  return (
    <div className="rounded-lg border bg-card p-4 text-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
            <CalendarDays className="size-4" aria-hidden="true" />
            Exposure Date Window Calculator
          </h3>
          <p className="leading-6 text-muted-foreground">
            Enter the last possible exposure date to estimate the Andes virus 4-42 day
            symptom window and the general HPS 1-8 week reference range.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:w-56">
          <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Last possible exposure
          </label>
          <input
            type="date"
            value={exposureDate}
            onChange={(event) => setExposureDate(event.target.value)}
            className="h-9 rounded-md border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
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
      </div>

      {result ? (
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-md border border-amber-300 bg-amber-50 p-3 dark:bg-amber-950/30">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Andes virus window
            </p>
            <p className="mt-2 text-lg font-semibold text-foreground">
              {formatDate(result.andesEarliest)} - {formatDate(result.andesLatest)}
            </p>
            <p className="mt-1 leading-6 text-muted-foreground">
              4-42 days after exposure.
            </p>
          </div>
          <div className="rounded-md border p-3">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              General HPS range
            </p>
            <p className="mt-2 text-lg font-semibold text-foreground">
              {formatDate(result.generalEarliest)} - {formatDate(result.generalLatest)}
            </p>
            <p className="mt-1 leading-6 text-muted-foreground">
              1-8 weeks after infected rodent contact.
            </p>
          </div>
          <div className="rounded-md border border-emerald-300 bg-emerald-50 p-3 dark:bg-emerald-950/30">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Last exposure entered
            </p>
            <p className="mt-2 text-lg font-semibold text-foreground">
              {formatDate(result.exposure)}
            </p>
            <p className="mt-1 leading-6 text-muted-foreground">
              Follow public-health instructions for your actual exposure.
            </p>
          </div>
        </div>
      ) : (
        <p className="mt-4 rounded-md border border-red-300 bg-red-50 p-3 text-red-900 dark:bg-red-950/30 dark:text-red-200">
          Enter a valid date to calculate the window.
        </p>
      )}

      <div className="mt-4 space-y-2 sm:hidden">
        {timingRows.map((row) => (
          <div key={row.question} className="rounded-md border p-3">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {row.question}
            </p>
            <p className="mt-1 font-semibold text-foreground">{row.range}</p>
            <p className="mt-1 leading-6 text-muted-foreground">{row.use}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timing question</TableHead>
              <TableHead>Range</TableHead>
              <TableHead>Use on this page</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {timingRows.map((row) => (
              <TableRow key={row.question}>
                <TableCell>{row.question}</TableCell>
                <TableCell>{row.range}</TableCell>
                <TableCell>{row.use}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
