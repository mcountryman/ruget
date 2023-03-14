import fetch from "cross-fetch";

export interface NugetApiIndex {
  version: string;
  resources: NugetApiResource[];
}

export interface NugetApiResource {
  "@id": string;
  "@type": string;
}

/**
 * Gets the NuGet API source capabilities.
 */
export function getNugetApiIndex(url: string): Promise<NugetApiIndex> {
  return fetch(url).then(res => {
    if (!res.ok) {
      throw new Error(`Failed to fetch index`);
    }

    return res.json();
  });
}
