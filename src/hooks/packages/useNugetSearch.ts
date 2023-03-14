import { useInfiniteQuery } from "@tanstack/react-query";
import { findNugetPackages } from "../../utils/nuget/findNugetPackages";
import { useNugetIndex } from "./useNugetIndex";

interface Args {
  q: string;
  prerelease?: boolean;
  semVerLevel?: string;
  packageType?: string;
  pageSize?: number;
}

export function useNugetSearch({ q, prerelease, semVerLevel, packageType, pageSize = 10 }: Args) {
  const { data: index } = useNugetIndex();

  return useInfiniteQuery({
    queryKey: ["nuget", "search", q, prerelease, semVerLevel, packageType, pageSize],
    queryFn: ({ pageParam }) =>
      findNugetPackages(index, {
        q,
        prerelease,
        semVerLevel,
        packageType,
        skip: pageParam,
        take: pageSize,
      }),
    enabled: !!index,
  });
}
