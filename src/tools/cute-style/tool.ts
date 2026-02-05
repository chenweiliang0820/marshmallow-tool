import type { ToolManifest } from "@/core/tools/types";

export const tool: ToolManifest = {
  id: "tool_cute_style_generator",
  slug: "cute-style",
  name: "可愛風格產生器（文字→描述）",
  description: "輸入主題並選擇風格，輸出可直接丟進 Canva / AI 的描述文字。",

  category: "創作",
  tags: ["prompt", "copy", "canva", "ai"],

  status: "stable",
  visibility: "public",

  requiresSupabase: false,
  requiresAuth: false,
  dataClassification: "none",

  icon: "wand",
  href: "/tools/cute-style",
};
