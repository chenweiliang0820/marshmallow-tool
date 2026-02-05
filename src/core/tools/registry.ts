import type { ToolManifest } from "./types";

import { tool as helloTool } from "@/tools/hello/tool";
import { tool as jsonTool } from "@/tools/json-format/tool";
import { tool as restrictedDemoTool } from "@/tools/restricted-demo/tool";

const ALL_TOOLS = [helloTool, jsonTool, restrictedDemoTool] satisfies ToolManifest[];

export function getAllTools(): ToolManifest[] {
  return [...ALL_TOOLS].sort((a, b) => a.name.localeCompare(b.name));
}

export function getToolBySlug(slug: string): ToolManifest | undefined {
  return ALL_TOOLS.find((t) => t.slug === slug);
}

export function getVisibleTools(): ToolManifest[] {
  return getAllTools().filter((t) => t.status !== "hidden" && t.status !== "deprecated");
}

export async function loadToolPageComponent(slug: string) {
  switch (slug) {
    case "hello":
      const { default: HelloPage } = await import("@/tools/hello/page");
      return HelloPage;
    case "json-format":
      const { default: JsonFormatPage } = await import("@/tools/json-format/page");
      return JsonFormatPage;
    case "restricted-demo":
      const { default: RestrictedDemoPage } = await import("@/tools/restricted-demo/page");
      return RestrictedDemoPage;
    default:
      return null;
  }
}
