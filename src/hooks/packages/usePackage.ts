import { useQuery } from "@tanstack/react-query";
import { PackageAnalyzer } from "../../utils/workers/analysis";

/**
 *
 * @param packageName - The name of the package to get.
 */
export function usePackage(name: string, version: string) {
  return useQuery(["packages", name, version] as const, () =>
    PackageAnalyzer.create(name, version),
  );
}
