import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import styled from "@mui/material/styles/styled";
import { usePackageIcon } from "../../../hooks/packages/usePackageIcon";

interface Props {
  name: string;
  version: string;
}

const Container = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(1.5),

  [theme.breakpoints.down("md")]: {
    marginLeft: theme.spacing(1.5),
  },
}));

export function PkgIcon({ name, version }: Props) {
  const { data: src } = usePackageIcon(name, version);
  if (!src) {
    return null;
  }

  return (
    <Container>
      <Avatar sx={{ bgcolor: "divider" }} variant="square" src={src} />
    </Container>
  );
}
