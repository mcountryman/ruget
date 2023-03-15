import DownloadSharp from "@mui/icons-material/DownloadSharp";
import FlagSharp from "@mui/icons-material/FlagSharp";
import Stack from "@mui/material/Stack";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SearchResult } from "../../../utils/nuget/findNugetPackages";

interface Props {
  result: SearchResult;
}

export function ResultItemInfo({ result }: Props) {
  const downloadsFmt = Intl.NumberFormat("en", { notation: "compact" });
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack spacing={2} direction="row" alignItems="center">
      <Stack spacing={0.5} direction="row" alignItems="center">
        <FlagSharp color="primary" fontSize="small" />
        <Typography color="primary" variant="body2" component="span">
          {result.version}
        </Typography>
      </Stack>

      {!isSm && result.totalDownloads !== undefined && (
        <Stack spacing={0.5} direction="row" alignItems="center">
          <DownloadSharp color="secondary" fontSize="small" />
          <Typography color="secondary" variant="body2" component="span">
            {downloadsFmt.format(result.totalDownloads)}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}
