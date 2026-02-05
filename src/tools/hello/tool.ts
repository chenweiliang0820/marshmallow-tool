import type { ToolManifest } from "@/core/tools/types";

export const tool: ToolManifest = {
  id: "tool_hello",
  slug: "hello",
  name: "Hello",
  description: "範例工具：確認工具模組化、路由與版型運作。",

  category: "範例",
  tags: ["sample"],

  status: "stable",
  visibility: "public",

  requiresSupabase: false,
  requiresAuth: false,
  dataClassification: "none",

  icon: "spark",
  href: "/tools/hello",
};
