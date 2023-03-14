import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";
import { NuPkgEntry } from "../../../hooks/packages/usePackageEntries";
import { isImageType } from "../../../utils/mime/isImageType";
import { isTextType } from "../../../utils/mime/isTextType";
import { ViewContentDownload } from "./ViewContentFileDownload";
import { ViewContentImage } from "./ViewContentFileImage";
import { ViewContentText } from "./ViewContentFileText";

interface Props {
  entry: NuPkgEntry;
}

export function ViewContentFile({ entry }: Props) {
  return (
    <Stack sx={{ height: "100%" }}>
      <ViewContentFileStats entry={entry} />
      <ViewContentFileView entry={entry} />
    </Stack>
  );
}

function ViewContentFileStats({ entry }: Props) {
  const navigate = useNavigate();

  return (
    <Paper square sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Stack sx={{ height: 48, pl: 1, pr: 2, alignItems: "center" }} direction="row">
        <IconButton color="inherit" onClick={() => navigate(-1)}>
          <NavigateBeforeIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Typography variant="caption">{entry.mimeType}</Typography>

        <Divider sx={{ m: 2, height: "60%" }} orientation="vertical" />

        <Typography variant="caption">{entry.size}</Typography>
      </Stack>
    </Paper>
  );
}

function ViewContentFileView({ entry }: Omit<Props, "setEntry">) {
  if (isImageType(entry.mimeType)) {
    return <ViewContentImage entry={entry} />;
  }

  if (isTextType(entry.mimeType)) {
    return <ViewContentText entry={entry} />;
  }

  return <ViewContentDownload entry={entry} />;
}
