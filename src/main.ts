import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/App";

const app = document.getElementById("app");
if (!app) {
  throw new Error("No app element found");
}

createRoot(app).render(createElement(App));
