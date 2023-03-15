import DownloadIcon from "@mui/icons-material/Download";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useParams } from "react-router";
import { NuPkgEntry } from "../../../hooks/packages/usePackageEntries";
import { usePackageEntryBytes } from "../../../hooks/packages/usePackageEntryBytes";

interface Props {
  entry: NuPkgEntry;
}

export function ViewContentDownload({ entry }: Props) {
  // todo: pass this in via props
  const { name, version } = useParams();
  const { data: bytes } = usePackageEntryBytes(name, version, entry.path);
  if (!bytes) {
    return null;
  }

  const blob = new Blob([bytes.buffer], { type: entry.mimeType });
  const src = URL.createObjectURL(blob);

  return (
    <Box sx={{ height: "60%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Button startIcon={<DownloadIcon />} variant="contained" href={src} download={entry.name}>
        Download
      </Button>
    </Box>
  );
}
