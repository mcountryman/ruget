import { useQuery } from "@tanstack/react-query";
import { useNupkg } from "./useNupkg";
import init, { get_metadata } from "@ruget/analysis";

/**
 *
 * @param packageName - The name of the package to get.
 */
export function usePackageMetadata(name: string, version: string) {
  const { data: pkg, error } = useNupkg(name, version);

  if (error) console.error(error);

  return useQuery(
    ["packages", name, version, "metadata"],
    async () => {
      await init();
      const bytes = new Uint8Array(await pkg.arrayBuffer());
      return get_metadata(bytes);
    },
    {
      enabled: !!pkg,
    },
  );
}
