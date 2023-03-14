import { useQuery } from "@tanstack/react-query";
import { getNugetApiIndex } from "../../utils/nuget/getNugetApiIndex";

export function useNugetIndex() {
  return useQuery(["nuget", "index"], () =>
    getNugetApiIndex("https://api.nuget.org/v3/index.json"),
  );
}
