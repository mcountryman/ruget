import { set_hook, get_metadata, get_entry } from "@ruget/analysis";

export class PackageAnalyzer {
  constructor(private readonly _bytes: Uint8Array) {}

  analyze() {
    return get_metadata(this._bytes);
  }

  getEntryBytes(path: string) {
    return get_entry(this._bytes, path);
  }

  static async create(name: string, version: string): Promise<PackageAnalyzer> {
    const nameLower = name.toLowerCase();
    const url = `https://api.nuget.org/v3-flatcontainer/${nameLower}/${version}/${nameLower}.${version}.nupkg`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch ${name}`);
    }

    const blob = await res.blob();
    const bytes = new Uint8Array(await blob.arrayBuffer());

    set_hook();

    return new PackageAnalyzer(bytes);
  }
}
