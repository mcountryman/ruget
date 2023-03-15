import Editor from "@monaco-editor/react";
import Box from "@mui/material/Box";
import { useResizeDetector } from "react-resize-detector";
import { useParams } from "react-router";
import { NuPkgEntry } from "../../../hooks/packages/usePackageEntries";
import { usePackageEntryBytes } from "../../../hooks/packages/usePackageEntryBytes";
import { getLanguage } from "../../../utils/mime/getLanguage";

interface Props {
  entry: NuPkgEntry;
}

export function ViewContentText({ entry }: Props) {
  // todo: pass this in via props
  const { name, version } = useParams();
  const { ref, height } = useResizeDetector();
  const { data: bytes } = usePackageEntryBytes(name, version, entry.path);
  const value = bytes ? new TextDecoder().decode(bytes) : "";

  return (
    <Box ref={ref} sx={{ flexGrow: 1 }}>
      <Editor
        theme="vs-dark"
        height={height - 60}
        value={value}
        options={{ readOnly: true, minimap: { enabled: false } }}
        language={getLanguage(entry.mimeType)}
      />
    </Box>
  );
}
