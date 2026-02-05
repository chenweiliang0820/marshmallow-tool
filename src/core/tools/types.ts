export type ToolVisibility = "public" | "login_required" | "restricted";

export type ToolStatus = "stable" | "beta" | "hidden" | "deprecated";

export type ToolDataClassification =
  | "none"
  | "user_private"
  | "shared_public"
  | "shared_restricted";

export type ToolManifest = {
  id: string;
  slug: string;
  name: string;
  description: string;

  category?: string;
  tags?: string[];

  status: ToolStatus;
  visibility: ToolVisibility;

  requiresSupabase: boolean;
  requiresAuth: boolean;
  dataClassification: ToolDataClassification;

  icon?: string;
  href: string;
};
