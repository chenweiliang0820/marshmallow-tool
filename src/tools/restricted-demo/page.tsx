"use client";

import { useAuth } from "@/core/auth/context";

export default function RestrictedDemoPage() {
  const { user, isLoading, isSupabaseEnabled } = useAuth();

  if (!isSupabaseEnabled) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">受限工具示範</h2>
          <p className="mt-2 text-sm text-zinc-400">
            此工具需要 Supabase Auth 才能示範「需登入」與「受限」工具的完整流程。
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-zinc-300">
            請設定 NEXT_PUBLIC_SUPABASE_URL 與 NEXT_PUBLIC_SUPABASE_ANON_KEY
            環境變數並重新啟動，即可看到登入/受限流程。
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm text-zinc-300">檢查登入狀態…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">受限工具示範</h2>
          <p className="mt-2 text-sm text-zinc-400">
            此工具為受限工具，需要登入後才能使用。
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-zinc-300">
            請先登入以使用此工具。登入後將顯示工具內容。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold">受限工具示範</h2>
        <p className="mt-2 text-sm text-zinc-400">
          已登入。這是受限工具的內容（未來可加上白名單/角色檢查）。
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm text-zinc-300">
          歡迎，{user.email ?? user.user_metadata?.user_name ?? user.id}！
        </p>
      </div>
    </div>
  );
}