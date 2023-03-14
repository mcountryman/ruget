import { init as initWasm, get_metadata } from "@ruget/analysis";
import { createReqHandler } from "../proto";
import { AnalysisReq, AnalyzeReq, InitReq } from "./proto";

let bytes: Uint8Array | undefined;

const init = createReqHandler<InitReq>(async ({ name, version }) => {
  console.log("Fetching package");

  const nameLower = name.toLowerCase();
  const url = `https://api.nuget.org/v3-flatcontainer/${nameLower}/${version}/${nameLower}.${version}.nupkg`;
  const res = await fetch(url);

  console.log("Got response", res);

  if (!res.ok) {
    throw new Error(`Failed to fetch ${name}`);
  }

  const blob = await res.blob();

  bytes = new Uint8Array(await blob.arrayBuffer());

  initWasm();
  console.log("Initialized wasm");
});

const analyze = createReqHandler<AnalyzeReq>(async () => {
  if (!bytes) {
    throw new Error("Package not initialized");
  }

  return get_metadata(bytes);
});

addEventListener("message", function onMessage(event: MessageEvent<AnalysisReq>) {
  console.log("Got message", event.data);

  switch (event.data.name) {
    case "init":
      return init(event.data);
    case "analyze":
      return analyze(event.data);
  }
});
