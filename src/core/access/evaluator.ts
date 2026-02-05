import type { AccessDecision, AccessContext, ToolAccessPolicy } from "./types";

export function evaluateAccess(
  policy: ToolAccessPolicy,
  ctx: AccessContext,
): AccessDecision {
  if (policy.visibility === "public") {
    return { allow: true };
  }

  if (policy.visibility === "login_required" && !ctx.isAuthenticated) {
    return {
      allow: false,
      reason: "此工具需要登入後才能使用。",
      action: "login",
    };
  }

  if (policy.visibility === "restricted") {
    if (!ctx.isAuthenticated) {
      return {
        allow: false,
        reason: "此工具為受限工具，需要登入與授權。",
        action: "login",
      };
    }

    if (policy.allowlistEmails?.length) {
      if (!ctx.email || !policy.allowlistEmails.includes(ctx.email)) {
        return {
          allow: false,
          reason: "您的帳號不在允許清單中。",
          action: "request_access",
        };
      }
    }

    if (policy.allowlistUserIds?.length) {
      if (!ctx.userId || !policy.allowlistUserIds.includes(ctx.userId)) {
        return {
          allow: false,
          reason: "您的帳號未獲得此工具的存取權限。",
          action: "request_access",
        };
      }
    }

    if (policy.requiredRoles?.length) {
      const hasRole = policy.requiredRoles.some((r) => ctx.roles?.includes(r));
      if (!hasRole) {
        return {
          allow: false,
          reason: "您的帳號角色不滿足此工具的要求。",
        };
      }
    }

    return { allow: true };
  }

  return { allow: false, reason: "未知的存取政策。" };
}