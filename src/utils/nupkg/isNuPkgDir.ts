import { NuPkgDir, NuPkgEntry } from "../../hooks/packages/usePackageEntries";

export function isNuPkgDir(entry: NuPkgDir | NuPkgEntry): entry is NuPkgDir {
  return entry.dir;
}
