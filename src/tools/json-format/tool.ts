import type { ToolManifest } from "@/core/tools/types";

export const tool: ToolManifest = {
  id: "tool_json_format",
  slug: "json-format",
  name: "JSON 格式化",
  description: "純前端 JSON 格式化與驗證工具，無需後端。",

  category: "開發",
  tags: ["json", "format", "validator"],

  status: "stable",
  visibility: "public",

  requiresSupabase: false,
  requiresAuth: false,
  dataClassification: "none",

  icon: "code",
  href: "/tools/json-format",
};