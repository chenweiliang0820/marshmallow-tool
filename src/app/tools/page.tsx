import Link from "next/link";

import { getVisibleTools } from "@/core/tools/registry";

export default function ToolsIndexPage() {
  const tools = getVisibleTools();

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <header className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Marshmallow Toolbox
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight">工具</h1>
          </div>
          <Link
            href="/"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 hover:bg-white/10"
          >
            回首頁
          </Link>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-zinc-300">
          新增工具時，只需要新增一個 `src/tools/&lt;slug&gt;` 模組，並在
          `src/core/tools/registry.ts` 註冊。
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 pb-16">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {tools.map((t) => (
            <Link
              key={t.id}
              href={t.href}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20 hover:bg-white/10"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold">{t.name}</div>
                  <div className="mt-2 text-sm leading-6 text-zinc-400">
                    {t.description}
                  </div>
                </div>
                <span className="text-sm text-zinc-500 transition group-hover:text-zinc-200">
                  →
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {t.category ? (
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300">
                    {t.category}
                  </span>
                ) : null}
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300">
                  {t.requiresSupabase ? "Supabase" : "純前端"}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300">
                  {t.visibility === "public"
                    ? "公開"
                    : t.visibility === "login_required"
                      ? "需登入"
                      : "受限"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
