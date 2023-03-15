import FlagSharp from "@mui/icons-material/FlagSharp";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { usePackageMetadata } from "../../../hooks/packages/usePackageMetadata";
import { PkgIcon } from "./PkgIcon";

interface Props {
  name: string;
  version: string;
}

export function PkgTitle({ name, version }: Props) {
  const { data: meta } = usePackageMetadata(name, version);
  if (!meta) {
    return null;
  }

  return (
    <Stack sx={{ ml: 0.5, py: 2, alignItems: "center" }} direction="row">
      <PkgIcon name={name} version={version} />

      <Typography variant="h6">{meta.nuspec.id}</Typography>

      <Stack sx={{ mx: 1 }} spacing={0.5} direction="row" alignItems="center">
        <FlagSharp fontSize="small" color="primary" />

        <Typography variant="h6" color="primary">
          {meta.nuspec.version}
        </Typography>
      </Stack>
    </Stack>
  );
}
