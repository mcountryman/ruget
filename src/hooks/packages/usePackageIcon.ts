import { useMemo } from "react";
import { usePackageEntryBytes } from "./usePackageEntryBytes";
import { usePackageMetadata } from "./usePackageMetadata";

export function usePackageIcon(packageName: string, version: string) {
  const { data: meta } = usePackageMetadata(packageName, version);
  const { data: iconBytes } = usePackageEntryBytes(packageName, version, meta?.nuspec?.icon);

  return useMemo(() => {
    if (iconBytes) {
      return URL.createObjectURL(
        new Blob([new Uint8Array(iconBytes).buffer], { type: "image/png" }),
      );
    }

    if (typeof meta?.icon_url === "string") {
      return String(meta?.icon_url);
    }

    return null;
  }, [meta, iconBytes]);
}
