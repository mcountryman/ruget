import DownloadSharp from "@mui/icons-material/DownloadSharp";
import FlagSharp from "@mui/icons-material/FlagSharp";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { SearchResult } from "../../../utils/nuget/findNugetPackages";

interface Props {
  result: SearchResult;
}

export function ResultItem({ result }: Props) {
  const downloadsFmt = Intl.NumberFormat("en", { notation: "compact" });

  return (
    <ListItemButton component={Link} to={`packages/${result.id}/${result.version}`}>
      <ResultItemAvatar iconUrl={result.iconUrl} />
      <ListItemText
        primary={
          <Stack spacing={2} direction="row" alignItems="center">
            <Typography variant="body1" component="span">
              {result.id}
            </Typography>
          </Stack>
        }
        secondary={
          <div style={{ width: "100%" }}>
            <Typography
              sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
              color="text.secondary"
              variant="body2"
            >
              {result.description}
            </Typography>
          </div>
        }
        disableTypography
      />

      <Stack spacing={2} direction="row" alignItems="center">
        <Stack spacing={0.5} direction="row" alignItems="center">
          <FlagSharp color="primary" fontSize="small" />
          <Typography color="primary" variant="body2" component="span">
            {result.version}
          </Typography>
        </Stack>

        {result.totalDownloads !== undefined && (
          <Stack spacing={0.5} direction="row" alignItems="center">
            <DownloadSharp color="secondary" fontSize="small" />
            <Typography color="secondary" variant="body2" component="span">
              {downloadsFmt.format(result.totalDownloads)}
            </Typography>
          </Stack>
        )}
      </Stack>
    </ListItemButton>
  );
}

function ResultItemAvatar({ iconUrl }: { iconUrl?: string }) {
  iconUrl ??= "https://nuget.org/Content/gallery/img/default-package-icon.svg";

  return (
    <ListItemAvatar>
      <Avatar src={iconUrl} sx={{ bgcolor: "divider" }} variant="square" />
    </ListItemAvatar>
  );
}
