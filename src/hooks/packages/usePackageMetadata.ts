import { useQuery } from "@tanstack/react-query";
import { usePackage } from "./usePackage";

/**
 *
 * @param packageName - The name of the package to get.
 */
export function usePackageMetadata(name: string, version: string) {
  const { data: pkg } = usePackage(name, version);

  return useQuery(["packages", name, version, "metadata"], () => pkg?.analyze(), {
    enabled: !!pkg,
  });
}
