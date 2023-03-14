import { filesize } from "filesize";
import * as mime from "mime";
import { useMapQueryData } from "../common/useMapQueryData";
import { usePackageMetadata } from "./usePackageMetadata";

export interface NuPkgDir {
  dir: true;
  name: string;
  path: string;
  entries: (NuPkgEntry | NuPkgDir)[];
  parent?: NuPkgDir;
}

export interface NuPkgEntry {
  dir: false;
  name: string;
  path: string;
  size: string;
  mimeType: string;
  parent?: NuPkgDir;
}

export function usePackageEntries(packageName: string, version: string) {
  return useMapQueryData(usePackageMetadata(packageName, version), meta => {
    const root = getDefaultDir("", "");
    const entries = meta.entries as NuPkgEntry[];

    for (const entry of entries) {
      const dir = getDir(root, entry.name);
      const extension = entry.name.split(".").pop() ?? "";
      const fileName = entry.name.split("/").pop() ?? entry.name;

      dir.entries.push({
        dir: false,
        name: fileName,
        path: entry.name,
        size: String(filesize(entry.size)),
        mimeType:
          extension === "nuspec"
            ? "application/xml"
            : mime.getType(extension) ?? "application/octet-stream",
        parent: dir,
      });
    }

    return root;
  });
}

function getDir(dir: NuPkgDir, path: string) {
  const parts = path.replace("\\", "/").split("/");

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    const entry = dir.entries.find(e => e.name === part);
    if (!entry) {
      const childDir = getDefaultDir(part, `${dir.path}/${part}`, dir);

      dir.entries.push(childDir);
      dir = childDir;
    } else if (!entry.dir) {
      throw new Error(`Path ${path} is not a directory`);
    } else {
      dir = entry;
    }
  }

  return dir;
}

function getDefaultDir(name: string, path: string, parent?: NuPkgDir) {
  return {
    dir: true,
    name,
    path: path.replace(/^\//, ""),
    entries: [],
    parent,
  } as NuPkgDir;
}
