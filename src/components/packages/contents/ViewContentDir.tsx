import ArticleIcon from "@mui/icons-material/ArticleOutlined";
import FolderIcon from "@mui/icons-material/Folder";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { NuPkgDir, NuPkgEntry } from "../../../hooks/packages/usePackageEntries";
import { isNuPkgDir } from "../../../utils/nupkg/isNuPkgDir";
import { isNuPkgEntry } from "../../../utils/nupkg/isNuPkgEntry";

interface Props {
  entry: NuPkgDir;
}

export function ViewContentDir({ entry }: Props) {
  return (
    <List sx={{ pt: 0 }}>
      {entry.parent && (
        <ListItemButton component={Link} to={entry.parent.path}>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>

          <ListItemText primary={".."} />
        </ListItemButton>
      )}

      {entry.entries.filter(isNuPkgDir).map(entry => (
        <DirItem key={entry.path} entry={entry} />
      ))}

      {entry.entries.filter(isNuPkgEntry).map(entry => (
        <FileItem key={entry.path} entry={entry} />
      ))}
    </List>
  );
}

function DirItem({ entry }: Props) {
  return (
    <ListItemButton component={Link} to={entry.path}>
      <ListItemIcon>
        <FolderIcon />
      </ListItemIcon>

      <ListItemText primary={entry.name} />
    </ListItemButton>
  );
}

interface EntryProps {
  entry: NuPkgEntry;
}

function FileItem({ entry }: EntryProps) {
  return (
    <ListItemButton color="text.secondary" component={Link} to={entry.path}>
      <ListItemIcon>
        <ArticleIcon />
      </ListItemIcon>

      <ListItemText primary={entry.name} />

      <ListItemSecondaryAction>
        <ListItemText
          primary={entry.size}
          primaryTypographyProps={{
            color: "text.secondary",
          }}
        />
      </ListItemSecondaryAction>
    </ListItemButton>
  );
}
