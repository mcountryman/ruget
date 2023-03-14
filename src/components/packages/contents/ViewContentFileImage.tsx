import Box from "@mui/material/Box";
import { useParams } from "react-router";
import { NuPkgEntry } from "../../../hooks/packages/usePackageEntries";
import { usePackageEntryBytes } from "../../../hooks/packages/usePackageEntryBytes";

interface Props {
  entry: NuPkgEntry;
}

export function ViewContentImage({ entry }: Props) {
  // todo: pass this in via props
  const { name, version } = useParams();
  const bytes = usePackageEntryBytes(name, version, entry.path);
  const blob = new Blob([bytes.buffer], { type: entry.mimeType });
  const src = URL.createObjectURL(blob);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        overflow: "scroll",
        alignItems: "center",
        justifyContent: "center",
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
        backgroundImage:
          "linear-gradient(45deg, #202020 25%, transparent 25%), linear-gradient(-45deg, #202020 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #202020 75%), linear-gradient(-45deg, transparent 75%, #202020 75%)",
      }}
    >
      <img
        style={{
          maxWidth: "75%",
          maxHeight: "75%",
          objectFit: "contain",
        }}
        src={src}
      ></img>
    </Box>
  );
}
