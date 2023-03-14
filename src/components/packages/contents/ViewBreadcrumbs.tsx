import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useMemo } from "react";
import { Link as ReactLink } from "react-router-dom";
import { NuPkgDir, NuPkgEntry } from "../../../hooks/packages/usePackageEntries";

interface Props {
  entry: NuPkgDir | NuPkgEntry;
}

export function ViewBreadcrumbs({ entry }: Props) {
  const entries = useMemo(() => {
    const entries = [entry];
    let parent = entry.parent;
    while (parent) {
      entries.unshift(parent);
      parent = parent.parent;
    }
    return entries;
  }, [entry]);

  return (
    <Paper square>
      <Breadcrumbs sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
        {entries.map((entry, i, all) => (
          <Breadcrumb key={entry.path} last={i === all.length - 1} entry={entry} />
        ))}
      </Breadcrumbs>
    </Paper>
  );
}

function Breadcrumb({ entry, last }: Props & { last: boolean }) {
  const name = entry.name.length > 0 ? entry.name : ".nupkg";

  if (!last) {
    return (
      <Link component={ReactLink} underline="hover" color="inherit" to={entry.path}>
        {name}
      </Link>
    );
  }

  return <Typography color="text.primary">{name}</Typography>;
}
