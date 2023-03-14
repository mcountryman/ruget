import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { theme } from "../theme";
import { HomePage } from "./home/HomePage";
import { PackagePage } from "./packages/PackagePage";

const queryClient = new QueryClient();

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <GlobalStyles
          styles={`
          html, body, #app {
            height: 100vh;
            margin: 0;
          }
        `}
        />

        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="packages">
              <Route index />
              <Route path=":name/:version" element={<PackagePage />} />
              <Route path=":name/:version/*" element={<PackagePage />} />
            </Route>
          </Routes>
        </BrowserRouter>

        {import.meta.env.DEV && <ReactQueryDevtools />}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
