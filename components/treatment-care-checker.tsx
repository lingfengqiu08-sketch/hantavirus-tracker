"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

type CareLevel = "emergency" | "same-day" | "monitor" | "ask";

type CheckerState = {
  knownExposure: boolean;
  feverOrGi: boolean;
  coughOrBreathing: boolean;
  chestOrFainting: boolean;
  underMonitoring: boolean;
};

const initialState: CheckerState = {
  knownExposure: false,
  feverOrGi: false,
  coughOrBreathing: false,
  chestOrFainting: false,
  underMonitoring: false,
};

const options: Array<{
  key: keyof CheckerState;
  label: string;
  help: string;
}> = [
  {
    key: "knownExposure",
    label: "Known rodent, Andes virus, or MV Hondius exposure",
    help: "Examples: rodent droppings, South America exposure, close contact, or public-health notification.",
  },
  {
    key: "feverOrGi",
    label: "Fever, chills, severe aches, nausea, vomiting, or diarrhea",
    help: "Early symptoms can look non-specific, especially after a known exposure.",
  },
  {
    key: "coughOrBreathing",
    label: "Cough, shortness of breath, or breathing feels different",
    help: "Respiratory symptoms after possible exposure should be discussed with clinicians promptly.",
  },
  {
    key: "chestOrFainting",
    label: "Chest tightness, blue lips, fainting, confusion, or severe weakness",
    help: "These can be emergency warning signs and should not be watched at home.",
  },
  {
    key: "underMonitoring",
    label: "A health department or clinician is already monitoring you",
    help: "Follow the exact plan from the team managing your exposure.",
  },
];

function trackCareCheckerUse(level: CareLevel) {
  if (typeof window.gtag !== "function") return;

  window.gtag("event", "treatment_checker_use", {
    page_path: "/treatment",
    care_level: level,
  });
}

function getGuidance(state: CheckerState): {
  level: CareLevel;
  label: string;
  title: string;
  text: string;
  toneClass: string;
} {
  if (state.chestOrFainting || state.coughOrBreathing) {
    return {
      level: "emergency",
      label: "Urgent",
      title: "Seek urgent medical care now",
      text:
        "Breathing changes, chest tightness, fainting, confusion, or severe weakness after possible hantavirus exposure should be treated as urgent. Contact emergency services or urgent care and mention the exposure history.",
      toneClass: "border-red-300 bg-red-50 text-red-950 dark:bg-red-950/30 dark:text-red-100",
    };
  }

  if (state.knownExposure && state.feverOrGi) {
    return {
      level: "same-day",
      label: "Same day",
      title: "Contact a clinician or public-health team today",
      text:
        "Fever or gastrointestinal symptoms after a known exposure should be reported promptly. Ask whether testing, monitoring changes, or hospital evaluation is appropriate.",
      toneClass:
        "border-amber-300 bg-amber-50 text-amber-950 dark:bg-amber-950/30 dark:text-amber-100",
    };
  }

  if (state.knownExposure || state.underMonitoring) {
    return {
      level: "monitor",
      label: "Monitor",
      title: "Continue the official monitoring plan",
      text:
        "If you have no symptoms, continue the monitoring plan from the clinician or health department. Do not use a normal day or an early negative test as self-clearance.",
      toneClass:
        "border-emerald-300 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-100",
    };
  }

  return {
    level: "ask",
    label: "Ask",
    title: "Use this as a discussion guide, not a diagnosis",
    text:
      "If you are unsure whether an exposure counts, compare your situation with official public-health guidance and contact a medical professional if symptoms or concern continue.",
    toneClass: "border-border bg-muted/40 text-foreground",
  };
}

export function TreatmentCareChecker() {
  const [state, setState] = useState<CheckerState>(initialState);
  const hasTrackedInitialState = useRef(false);
  const guidance = useMemo(() => getGuidance(state), [state]);

  useEffect(() => {
    if (!hasTrackedInitialState.current) {
      hasTrackedInitialState.current = true;
      return;
    }

    trackCareCheckerUse(guidance.level);
  }, [guidance.level]);

  return (
    <div className="rounded-lg border bg-card p-4 text-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1">
          <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
            <Activity className="size-4" aria-hidden="true" />
            Treatment care pathway checker
          </h3>
          <p className="leading-6 text-muted-foreground">
            Select what applies. The result is education-only timing and care-pathway
            guidance for talking with a clinician or public-health team.
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setState(initialState)}
          className="md:shrink-0"
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

      <p className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 leading-6 text-red-900 dark:bg-red-950/30 dark:text-red-200">
        This checker does not diagnose hantavirus, rule out infection, or replace
        emergency care. If symptoms are severe or breathing changes appear, seek
        urgent medical help.
      </p>
    </div>
  );
}
