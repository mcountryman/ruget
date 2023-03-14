import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import styled from "@mui/material/styles/styled";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePackageEntries, NuPkgDir, NuPkgEntry } from "../../hooks/packages/usePackageEntries";
import { View } from "./contents/View";
import { PkgTitle } from "./header/PkgTitle";

const Root = styled(Box)({
  height: "100vh",
  display: "flex",
  overflow: "hidden",
  justifyContent: "center",
});

const Content = styled(Stack)(({ theme }) => ({
  width: "100%",
  height: "calc(100% + 5px)",

  [theme.breakpoints.up("md")]: {
    maxWidth: 960,
  },
}));

export function PackagePage() {
  const params = useParams();
  const { name, version } = params;
  const path = params["*"];
  const { data: dir } = usePackageEntries(name, version);
  const [entry, setEntry] = useState<NuPkgDir | NuPkgEntry>(dir);

  useEffect(() => {
    if (!dir) {
      return;
    }

    if (path === undefined) {
      return setEntry(dir);
    }

    const parts = path.split("/");
    let current: NuPkgDir | NuPkgEntry = dir;
    for (const part of parts) {
      if (!current.dir) {
        break;
      }

      const next = current.entries.find(entry => entry.name === part);
      if (!next) {
        break;
      }

      current = next;
    }

    setEntry(current);
  }, [dir, path]);

  if (!entry) {
    return null;
  }

  return (
    <Root>
      <Content>
        <PkgTitle name={name} version={version} />

        <View entry={entry} />
      </Content>
    </Root>
  );
}
