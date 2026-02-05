import type { ToolVisibility } from "@/core/tools/types";

export type AccessDecision =
  | { allow: true }
  | { allow: false; reason: string; action?: "login" | "request_access" };

export type AccessContext = {
  isAuthenticated: boolean;
  userId?: string;
  email?: string;
  roles?: string[];
};

export type ToolAccessPolicy = {
  visibility: ToolVisibility;
  allowlistEmails?: string[];
  allowlistUserIds?: string[];
  requiredRoles?: string[];
};
