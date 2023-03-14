import { Req } from "../proto";
import type { PackageMetadata } from "@ruget/analysis";

export type AnalysisReq = AnalyzeReq | InitReq;

export type InitReq = Req<"init", { name: string; version: string }, void>;
export type AnalyzeReq = Req<"analyze", undefined, PackageMetadata>;
