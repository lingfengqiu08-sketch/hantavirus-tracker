import updatesData from "@/data/updates.json";
import { getSourcesByIds, type Source } from "@/lib/outbreak";

export type UpdateEntry = {
  id: string;
  date: string;
  title: string;
  summary: string;
  sourceIds: string[];
};

export type UpdateEntryWithSources = UpdateEntry & {
  sources: Source[];
};

export const updates = updatesData as UpdateEntry[];

export function getUpdates(): UpdateEntryWithSources[] {
  return updates.map((entry) => ({
    ...entry,
    sources: getSourcesByIds(entry.sourceIds),
  }));
}
