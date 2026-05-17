import countryResponsesData from "@/data/country-responses.json";
import { getSourcesByIds, type Source } from "@/lib/outbreak";

export type CountryResponse = {
  country: string;
  slug: string;
  latestUpdateDate: string;
  peopleAffected: string;
  response: string;
  monitoring: string;
  caseStatus: string;
  publicRisk: string;
  sourceIds: string[];
};

export type CountryResponseWithSources = CountryResponse & {
  sources: Source[];
};

export const countryResponses = countryResponsesData as CountryResponse[];

export function getCountryResponses(): CountryResponseWithSources[] {
  return countryResponses.map((entry) => ({
    ...entry,
    sources: getSourcesByIds(entry.sourceIds),
  }));
}

export function getCountryResponse(slug: string): CountryResponseWithSources | undefined {
  return getCountryResponses().find((entry) => entry.slug === slug);
}
