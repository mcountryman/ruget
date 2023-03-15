import { useQuery } from "@tanstack/react-query";
import { useNupkg } from "./useNupkg";
import init, { get_entry } from "@ruget/analysis";

export function usePackageEntryBytes(name: string, version: string, path?: string) {
  const { data } = useNupkg(name, version);

  return useQuery(
    ["packages", name, version, "entry", path],
    async () => {
      await init();
      const bytes = new Uint8Array(await data.arrayBuffer());
      return get_entry(bytes, path);
    },
    { enabled: !!data && !!path },
  );
}
