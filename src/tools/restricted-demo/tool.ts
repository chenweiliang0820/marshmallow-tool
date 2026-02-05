import type { ToolManifest } from "@/core/tools/types";

export const tool: ToolManifest = {
  id: "tool_restricted_demo",
  slug: "restricted-demo",
  name: "受限工具示範",
  description: "示範「需登入」與「受限」工具的存取控制與 UI 提示（不需 Supabase 也能看到提示）。",

  category: "範例",
  tags: ["demo", "auth", "access"],

  status: "stable",
  visibility: "restricted",

  requiresSupabase: false,
  requiresAuth: true,
  dataClassification: "none",

  icon: "lock",
  href: "/tools/restricted-demo",
};