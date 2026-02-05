import type { ToolManifest } from "@/core/tools/types";
import type { ToolAccessPolicy } from "./types";

export function getPolicyForTool(tool: ToolManifest): ToolAccessPolicy {
  // 目前以 manifest 的 visibility 作為最小政策來源。
  // 未來可擴充：每個工具可提供更細的 policy（白名單、角色、條件規則等）。
  return {
    visibility: tool.visibility,
  };
}
