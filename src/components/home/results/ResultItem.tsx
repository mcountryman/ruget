import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { SearchResult } from "../../../utils/nuget/findNugetPackages";
import { ResultItemInfo } from "./ResultItemInfo";

interface Props {
  result: SearchResult;
}

export function ResultItem({ result }: Props) {
  return (
    <ListItemButton component={Link} to={`packages/${result.id}/${result.version}`}>
      <ResultItemAvatar iconUrl={result.iconUrl} />
      <ListItemText
        primary={
          <Stack spacing={2} direction="row" alignItems="center">
            <Typography
              sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
              variant="body1"
              component="span"
            >
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

      <ResultItemInfo result={result} />
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
