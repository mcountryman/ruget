import { useQuery } from "@tanstack/react-query";
import { getNugetNupkg } from "../../utils/nuget/getNugetNupkg";
import { useNugetIndex } from "./useNugetIndex";

export function useNupkg(packageName: string, version: string) {
  const { data } = useNugetIndex();

  return useQuery(
    ["packages", packageName, version, "nupkg"],
    () => getNugetNupkg(data, packageName, version),
    { enabled: !!data },
  );
}
