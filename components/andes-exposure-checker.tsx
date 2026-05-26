"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CalendarDays, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

type AndesGuidanceLevel = "medical" | "monitor" | "rodent" | "low" | "ask";

type AndesCheckerState = {
  closeContact: boolean;
  bodyFluidContact: boolean;
  sameRoomOnly: boolean;
  rodentExposure: boolean;
  compatibleSymptoms: boolean;
};

const initialState: AndesCheckerState = {
  closeContact: false,
  bodyFluidContact: false,
  sameRoomOnly: false,
  rodentExposure: false,
  compatibleSymptoms: false,
};

const MS_PER_DAY = 24 * 60 * 60 * 1000;

const options: Array<{
  key: keyof AndesCheckerState;
  label: string;
  help: string;
}> = [
  {
    key: "closeContact",
    label: "Close or prolonged contact with a symptomatic Andes virus case",
    help: "This is the person-to-person exception that makes Andes virus different.",
  },
  {
    key: "bodyFluidContact",
    label: "Direct contact with saliva, blood, vomit, urine, or other body fluids",
    help: "Body-fluid exposure is more relevant than casual public-space contact.",
  },
  {
    key: "sameRoomOnly",
    label: "Only casual same-room, ship, airport, or public-space contact",
    help: "Casual presence alone is not the usual description of Andes virus spread.",
  },
  {
    key: "rodentExposure",
    label: "Rodent droppings, urine, nesting material, or contaminated dust were present",
    help: "Rodent exposure remains the main hantavirus route outside close Andes contact.",
  },
  {
    key: "compatibleSymptoms",
    label: "Fever, gastrointestinal symptoms, cough, or breathing changes appeared",
    help: "Symptoms after credible exposure should be discussed with a clinician or health department.",
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

function trackAndesCheckerUse(level: AndesGuidanceLevel) {
  if (typeof window.gtag !== "function") return;

  window.gtag("event", "andes_checker_use", {
    page_path: "/andes-virus",
    andes_guidance_level: level,
  });
}

function getGuidance(state: AndesCheckerState): {
  level: AndesGuidanceLevel;
  label: string;
  title: string;
  text: string;
  toneClass: string;
} {
  const closeAndesExposure = state.closeContact || state.bodyFluidContact;
  const credibleExposure = closeAndesExposure || state.rodentExposure;

  if (state.compatibleSymptoms && credibleExposure) {
    return {
      level: "medical",
      label: "Medical",
      title: "Contact a clinician or public-health team promptly",
      text:
        "Symptoms after close Andes virus contact or rodent exposure should not be interpreted as low risk on this page. Ask whether testing, monitoring, or medical evaluation is needed.",
      toneClass:
        "border-red-300 bg-red-50 text-red-950 dark:bg-red-950/30 dark:text-red-100",
    };
  }

  if (closeAndesExposure) {
    return {
      level: "monitor",
      label: "Monitor",
      title: "This fits the Andes virus close-contact scenario",
      text:
        "Andes virus can rarely spread after close contact with a symptomatic person. Follow the 42-day monitoring, isolation, and testing instructions from the authority managing the exposure.",
      toneClass:
        "border-amber-300 bg-amber-50 text-amber-950 dark:bg-amber-950/30 dark:text-amber-100",
    };
  }

  if (state.rodentExposure) {
    return {
      level: "rodent",
      label: "Rodent",
      title: "This sounds more like the usual hantavirus route",
      text:
        "The main hantavirus route is exposure to infected rodent urine, droppings, saliva, nesting material, or contaminated dust. Use official cleanup and prevention guidance.",
      toneClass:
        "border-amber-300 bg-amber-50 text-amber-950 dark:bg-amber-950/30 dark:text-amber-100",
    };
  }

  if (state.sameRoomOnly) {
    return {
      level: "low",
      label: "Low context",
      title: "Casual same-room contact alone is not the usual Andes virus risk pattern",
      text:
        "Public-health concern rises with close, prolonged contact, body-fluid exposure, symptoms, rodent exposure, or direct monitoring instructions. If a health department contacted you, follow that advice.",
      toneClass:
        "border-emerald-300 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-100",
    };
  }

  return {
    level: "ask",
    label: "Choose details",
    title: "Select the exposure details that match the situation",
    text:
      "This checker separates close-contact Andes virus risk from routine rodent exposure and casual public contact. It is educational and cannot confirm or rule out infection.",
    toneClass: "border-border bg-muted/40 text-foreground",
  };
}

export function AndesExposureChecker({
  defaultExposureDate,
}: {
  defaultExposureDate: string;
}) {
  const [state, setState] = useState<AndesCheckerState>(initialState);
  const [exposureDate, setExposureDate] = useState(defaultExposureDate);
  const hasTrackedInitialState = useRef(false);

  const guidance = useMemo(() => getGuidance(state), [state]);
  const windowDates = useMemo(() => {
    const parsed = parseIsoDate(exposureDate);
    if (!parsed) return null;

    return {
      start: addDays(parsed, 4),
      end: addDays(parsed, 42),
    };
  }, [exposureDate]);

  useEffect(() => {
    if (!hasTrackedInitialState.current) {
      hasTrackedInitialState.current = true;
      return;
    }

    trackAndesCheckerUse(guidance.level);
  }, [guidance.level]);

  return (
    <div className="rounded-lg border bg-card p-4 text-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-1">
          <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
            <ShieldAlert className="size-4" aria-hidden="true" />
            Andes virus exposure checker
          </h3>
          <p className="leading-6 text-muted-foreground">
            Select the exposure details and enter the last possible exposure date. The result
            explains whether the scenario looks like close Andes contact, ordinary rodent
            exposure, or low-context casual contact.
          </p>
        </div>
        <div className="flex flex-col gap-2 lg:w-60 lg:shrink-0">
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
          variant="ghost"
          size="sm"
          onClick={() => {
            setState(initialState);
            setExposureDate(defaultExposureDate);
          }}
        >
          Clear
        </Button>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {options.map((option) => (
          <label key={option.key} className="rounded-md border p-3">
            <span className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={state[option.key]}
                onChange={(event) =>
                  setState((current) => ({
                    ...current,
                    [option.key]: event.target.checked,
                  }))
                }
                className="mt-1 size-4 rounded border"
              />
              <span>
                <span className="font-medium text-foreground">{option.label}</span>
                <span className="mt-1 block leading-6 text-muted-foreground">
                  {option.help}
                </span>
              </span>
            </span>
          </label>
        ))}
      </div>

      <div className={`mt-4 rounded-md border p-3 leading-6 ${guidance.toneClass}`}>
        <p className="text-xs font-medium uppercase tracking-wide opacity-80">
          {guidance.label} guidance
        </p>
        <p className="mt-2 text-base font-semibold">{guidance.title}</p>
        <p className="mt-1">{guidance.text}</p>
      </div>

      {windowDates ? (
        <div className="mt-4 rounded-md border p-3 leading-6">
          <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <CalendarDays className="size-4" aria-hidden="true" />
            4-42 day symptom window
          </p>
          <p className="mt-2 text-base font-semibold text-foreground">
            {formatDate(windowDates.start)} to {formatDate(windowDates.end)}
          </p>
          <p className="mt-1 text-muted-foreground">
            This timing estimate does not replace the monitoring dates given by clinicians or
            public-health authorities.
          </p>
        </div>
      ) : (
        <p className="mt-4 rounded-md border border-red-300 bg-red-50 p-3 text-red-900 dark:bg-red-950/30 dark:text-red-200">
          Enter a valid exposure date to estimate the 4-42 day Andes virus window.
        </p>
      )}

      <p className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 leading-6 text-red-900 dark:bg-red-950/30 dark:text-red-200">
        This checker does not diagnose infection, confirm exposure, or clear anyone from
        monitoring. If symptoms appear or a health department contacted you, follow medical and
        public-health instructions.
      </p>
    </div>
  );
}
