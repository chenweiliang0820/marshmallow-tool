import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

import { getToolBySlug, loadToolPageComponent } from "@/core/tools/registry";

export default async function ToolPage({
  params,
}: {
  params: { slug: string };
}) {
  const tool = getToolBySlug(params.slug);

  if (!tool) return notFound();

  const ToolPageComponent = await loadToolPageComponent(tool.slug);

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <header className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Tool
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight">
              {tool.name}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
              {tool.description}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/tools"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 hover:bg-white/10"
            >
              工具列表
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 hover:bg-white/10"
            >
              回首頁
            </Link>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {tool.category ? (
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300">
              {tool.category}
            </span>
          ) : null}
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300">
            {tool.requiresSupabase ? "Supabase" : "純前端"}
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300">
            {tool.visibility === "public"
              ? "公開"
              : tool.visibility === "login_required"
                ? "需登入"
                : "受限"}
          </span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 pb-16">
        {ToolPageComponent ? (
          <Suspense
            fallback={
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-zinc-300">
                載入中…
              </div>
            }
          >
            <ToolPageComponent />
          </Suspense>
        ) : (
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="text-sm text-zinc-300">
              此工具尚未實作頁面元件。
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
