import { NugetApiIndex } from "./getNugetApiIndex";

export function getNugetNupkg(index: NugetApiIndex, packageName: string, version: string) {
  const resource = index.resources.find(r => r["@type"].startsWith("PackageBaseAddress"));
  if (!resource) {
    throw new Error(`Failed to find PackageBaseAddress resource`);
  }

  packageName = packageName.toLowerCase();
  version = version.toLowerCase();

  return fetch(`${resource["@id"]}${packageName}/${version}/${packageName}.${version}.nupkg`).then(
    res => {
      if (!res.ok) {
        throw new Error(`Failed to fetch ${packageName}`);
      }

      return res.blob();
    },
  );
}
