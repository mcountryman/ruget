import { NuPkgDir, NuPkgEntry } from "../../hooks/packages/usePackageEntries";

export function isNuPkgEntry(entry: NuPkgDir | NuPkgEntry): entry is NuPkgEntry {
  return !entry.dir;
}
