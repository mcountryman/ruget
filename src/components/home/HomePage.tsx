import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import styled from "@mui/material/styles/styled";
import { useMemo, useState } from "react";
import { useNugetSearch } from "../../hooks/packages/useNugetSearch";
import { SearchInput } from "./header/SearchInput";
import { ResultItem } from "./results/ResultItem";

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

export function HomePage() {
  const [q, setQ] = useState("");
  const { data } = useNugetSearch({ q });
  const items = useMemo(() => (data?.pages ?? []).map(page => page.data).flat(), [data?.pages]);

  return (
    <Root>
      <Content>
        <Box sx={{ p: 1 }}>
          <SearchInput value={q} onChange={setQ} />
        </Box>

        <List>
          {items.map(item => (
            <ResultItem key={item.id} result={item} />
          ))}
        </List>
      </Content>
    </Root>
  );
}
