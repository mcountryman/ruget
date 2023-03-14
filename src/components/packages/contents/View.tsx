import Paper from "@mui/material/Paper";
import { NuPkgDir, NuPkgEntry } from "../../../hooks/packages/usePackageEntries";
import { ViewBreadcrumbs } from "./ViewBreadcrumbs";
import { ViewContentDir } from "./ViewContentDir";
import { ViewContentFile } from "./ViewContentFile";

interface Props {
  entry: NuPkgDir | NuPkgEntry;
}

export function View({ entry }: Props) {
  return (
    <Paper sx={{ flexGrow: 1 }} variant="outlined" square>
      <ViewBreadcrumbs entry={entry} />

      {entry.dir && <ViewContentDir entry={entry} />}
      {entry.dir === false && <ViewContentFile entry={entry} />}
    </Paper>
  );
}
