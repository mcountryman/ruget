import { useMapQueryData } from "../common/useMapQueryData";
import { usePackageMetadata } from "./usePackageMetadata";

export function usePackageIcon(packageName: string, version: string) {
  return useMapQueryData(usePackageMetadata(packageName, version), meta => {
    if (meta.icon) {
      return URL.createObjectURL(
        new Blob([new Uint8Array(meta.icon).buffer], { type: "image/png" }),
      );
    }

    if (typeof meta.icon_url === "string") {
      return String(meta.icon_url);
    }

    return null;
  });
}
