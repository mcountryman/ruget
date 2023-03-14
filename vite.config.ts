import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), wasm(), topLevelAwait(), tsconfigPaths()],
  worker: {
    plugins: [wasm(), topLevelAwait()],
  },
});
