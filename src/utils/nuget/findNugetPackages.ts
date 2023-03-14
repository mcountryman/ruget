import { NugetApiIndex } from "./getNugetApiIndex";

export interface SearchResults {
  totalHits: number;
  data: SearchResult[];
}

export interface SearchResult {
  id: string;
  version: string;
  description: string;
  versions: string[];
  authors: string | string[];
  iconUrl: string;
  licenseUrl: string;
  totalDownloads?: number;
}

interface Args {
  q: string;
  skip?: number;
  take?: number;
  prerelease?: boolean;
  semVerLevel?: string;
  packageType?: string;
}

/**
 * Finds NuGet packages matching the given search criteria for the given {@link NugetApiIndex}.
 *
 * @param index - The NuGet API index to search.
 * @param args - The search arguments.
 * @returns The search result.
 */
export function findNugetPackages(index: NugetApiIndex, args: Args): Promise<SearchResults> {
  const service = index.resources.find(r => r["@type"] === "SearchQueryService");
  if (!service) {
    throw new Error("Nuget API index does not contain a search service.");
  }

  const url = new URL(service["@id"]);
  appendSearchParams(args, url.searchParams);

  return fetch(url).then(res => {
    if (!res.ok) {
      throw new Error(`Failed to fetch search results`);
    }

    return res.json();
  });
}

function appendSearchParams(args: Args, params: URLSearchParams) {
  for (const [key, value] of Object.entries(args)) {
    if (value !== undefined) {
      params.append(key, String(value));
    }
  }
}
