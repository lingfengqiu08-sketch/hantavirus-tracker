import outbreakData from "@/data/outbreak.json";

export type CaseStatus = "confirmed" | "probable" | "suspected";

export type OutbreakCase = {
  id: string;
  status: CaseStatus;
  nationality: string;
  ageRange: string;
  symptomOnset: string;
  hospital: string;
  outcome: string;
  sources: string[];
};

export type ShipRouteNode = {
  date: string;
  location: string;
  lat: number;
  lng: number;
  event: string;
  sourceUrl: string;
};

export type Ship = {
  name: string;
  operator: string;
  flag: string;
  lastKnownStatus: string;
  lastKnownStatusAt: string;
  route: ShipRouteNode[];
};

export type PassengerStatus = {
  confirmed: number;
  probable: number;
  deaths: number;
  repatriated: number;
  monitoring: number;
  crewOnboard: number;
  note: string;
};

export type TimelineItem = {
  date: string;
  title: string;
  detail: string;
  sources: string[];
};

export type Source = {
  id: string;
  name: string;
  url: string;
  publisher: string;
  date: string;
};

export type OutbreakData = {
  lastUpdated: string;
  lastVerifiedAt: string;
  sourceName: string;
  sourceUrl: string;
  confirmed: number;
  probable: number;
  suspected: number;
  deaths: number;
  monitoringPeriodDays: number;
  monitoringEndsAt: string;
  notes: string;
  cases: OutbreakCase[];
  ship: Ship;
  passengerStatus: PassengerStatus;
  timeline: TimelineItem[];
  sources: Source[];
};

export const outbreak = outbreakData as OutbreakData;

export function getOutbreak(): OutbreakData {
  return outbreak;
}

export function getSourcesByIds(ids: string[]): Source[] {
  return outbreak.sources.filter((s) => ids.includes(s.id));
}
