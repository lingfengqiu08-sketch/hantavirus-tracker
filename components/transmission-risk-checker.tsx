"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Wind } from "lucide-react";
import { Button } from "@/components/ui/button";

type TransmissionLevel = "medical" | "rodent" | "andes" | "surface" | "low" | "ask";

type CheckerState = {
  rodentDust: boolean;
  disturbedDroppings: boolean;
  closeAndesContact: boolean;
  sameRoomOnly: boolean;
  surfaceThenFace: boolean;
  compatibleSymptoms: boolean;
};

const initialState: CheckerState = {
  rodentDust: false,
  disturbedDroppings: false,
  closeAndesContact: false,
  sameRoomOnly: false,
  surfaceThenFace: false,
  compatibleSymptoms: false,
};

const options: Array<{
  key: keyof CheckerState;
  label: string;
  help: string;
}> = [
  {
    key: "rodentDust",
    label: "Rodent droppings, urine, nesting material, or dead rodents were present",
    help: "This is the classic hantavirus exposure setting.",
  },
  {
    key: "disturbedDroppings",
    label: "Dust was stirred up by sweeping, vacuuming, cleaning, or entering a closed space",
    help: "Airborne risk usually means inhaling contaminated rodent dust, not casual person-to-person air.",
  },
  {
    key: "closeAndesContact",
    label: "Close contact with a symptomatic Andes virus or MV Hondius-linked case",
    help: "Andes virus is the known hantavirus exception for rare person-to-person spread.",
  },
  {
    key: "sameRoomOnly",
    label: "Only casual same-room or public-space contact",
    help: "This alone is different from prolonged close contact or body-fluid exposure.",
  },
  {
    key: "surfaceThenFace",
    label: "Touched a possibly contaminated surface, then touched mouth, nose, or eyes",
    help: "CDC describes this as a possible route for Andes virus when virus is present on a surface.",
  },
  {
    key: "compatibleSymptoms",
    label: "Fever, gastrointestinal symptoms, cough, or breathing changes appeared",
    help: "Symptoms after a credible exposure should be discussed with a clinician or public-health team.",
  },
];

function trackTransmissionCheckerUse(level: TransmissionLevel) {
  if (typeof window.gtag !== "function") return;

  window.gtag("event", "transmission_checker_use", {
    page_path: "/transmission",
    transmission_level: level,
  });
}

function getGuidance(state: CheckerState): {
  level: TransmissionLevel;
  label: string;
  title: string;
  text: string;
  toneClass: string;
} {
  const credibleExposure =
    state.rodentDust ||
    state.disturbedDroppings ||
    state.closeAndesContact ||
    state.surfaceThenFace;

  if (state.compatibleSymptoms && credibleExposure) {
    return {
      level: "medical",
      label: "Medical",
      title: "Call a clinician or public-health team promptly",
      text:
        "Symptoms after a credible rodent, Andes virus, or MV Hondius-linked exposure should not be interpreted on this page. Ask whether testing, monitoring, or medical evaluation is needed.",
      toneClass:
        "border-red-300 bg-red-50 text-red-950 dark:bg-red-950/30 dark:text-red-100",
    };
  }

  if (state.rodentDust || state.disturbedDroppings) {
    return {
      level: "rodent",
      label: "Rodent dust",
      title: "This fits the usual hantavirus exposure route",
      text:
        "The main hantavirus route is inhaling dust contaminated by infected rodent urine, droppings, saliva, or nesting material. Avoid dry sweeping or vacuuming rodent waste; follow official cleanup guidance.",
      toneClass:
        "border-amber-300 bg-amber-50 text-amber-950 dark:bg-amber-950/30 dark:text-amber-100",
    };
  }

  if (state.closeAndesContact) {
    return {
      level: "andes",
      label: "Andes exception",
      title: "This matches the person-to-person exception to know about",
      text:
        "Andes virus can rarely spread after close, prolonged contact with a symptomatic person. Follow the monitoring plan from the health department or clinician managing the exposure.",
      toneClass:
        "border-amber-300 bg-amber-50 text-amber-950 dark:bg-amber-950/30 dark:text-amber-100",
    };
  }

  if (state.surfaceThenFace) {
    return {
      level: "surface",
      label: "Surface route",
      title: "Surface-to-face contact is possible in the right setting",
      text:
        "A surface route depends on whether virus was present and whether it reached the mouth, nose, or eyes. Wash hands, avoid touching the face during cleanup, and follow official advice if the exposure was part of monitoring.",
      toneClass:
        "border-amber-300 bg-amber-50 text-amber-950 dark:bg-amber-950/30 dark:text-amber-100",
    };
  }

  if (state.sameRoomOnly) {
    return {
      level: "low",
      label: "Low context",
      title: "Casual airborne spread is not the expected route",
      text:
        "Hantavirus is not treated like measles or flu. Same-room contact alone is not the usual risk description unless there was close Andes virus contact, body-fluid exposure, or a public-health monitoring instruction.",
      toneClass:
        "border-emerald-300 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-100",
    };
  }

  return {
    level: "ask",
    label: "Ask",
    title: "Choose the exposure details that match your situation",
    text:
      "The key distinction is rodent-contaminated dust versus rare close-contact Andes virus spread. If you are unsure whether your exposure counts, ask a clinician or public-health authority.",
    toneClass: "border-border bg-muted/40 text-foreground",
  };
}

export function TransmissionRiskChecker() {
  const [state, setState] = useState<CheckerState>(initialState);
  const hasTrackedInitialState = useRef(false);
  const guidance = useMemo(() => getGuidance(state), [state]);

  useEffect(() => {
    if (!hasTrackedInitialState.current) {
      hasTrackedInitialState.current = true;
      return;
    }

    trackTransmissionCheckerUse(guidance.level);
  }, [guidance.level]);

  return (
    <div className="rounded-lg border bg-card p-4 text-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1">
          <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
            <Wind className="size-4" aria-hidden="true" />
            Airborne or contagious checker
          </h3>
          <p className="leading-6 text-muted-foreground">
            Select the exposure details. The result explains which transmission route the
            situation most closely matches. It is not a diagnosis or clearance tool.
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
        This checker does not diagnose infection, confirm exposure, or rule out risk. If
        symptoms appear after possible hantavirus or Andes virus exposure, contact a
        medical professional or local public-health authority.
      </p>
    </div>
  );
}
