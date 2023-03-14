import { useMemo } from "react";
import { usePackage } from "./usePackage";

export function usePackageEntryBytes(name: string, version: string, path: string) {
  const { data: pkg } = usePackage(name, version);

  return useMemo(() => {
    if (!pkg) {
      return null;
    }

    return pkg.getEntryBytes(path);
  }, [pkg, path]);
}
