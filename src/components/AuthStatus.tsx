"use client";

import { useAuth } from "@/core/auth/context";

export function AuthStatus() {
  const { user, isLoading, isSupabaseEnabled, signIn, signOut } = useAuth();

  if (!isSupabaseEnabled) {
    return (
      <div className="text-xs text-zinc-500">尚未設定 Supabase（登入功能停用）</div>
    );
  }

  if (isLoading) {
    return <div className="text-xs text-zinc-500">檢查登入狀態…</div>;
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-zinc-400">
          已登入：{user.email ?? user.user_metadata?.user_name ?? user.id}
        </span>
        <button
          onClick={() => signOut()}
          className="text-xs text-zinc-400 hover:text-white"
        >
          登出
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn()}
      className="text-xs text-zinc-400 hover:text-white"
    >
      登入（GitHub）
    </button>
  );
}