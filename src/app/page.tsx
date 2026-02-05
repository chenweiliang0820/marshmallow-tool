import Link from "next/link";

import { getVisibleTools } from "@/core/tools/registry";
import { AuthStatus } from "@/components/AuthStatus";

export default function Home() {
  const tools = getVisibleTools();

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute -bottom-40 right-[-120px] h-[520px] w-[520px] rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:24px_24px] opacity-60" />
      </div>

      <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8">
        <div className="flex flex-col">
          <span className="text-sm text-zinc-400">Marshmallow Toolbox</span>
          <h1 className="text-xl font-semibold tracking-tight">棉花糖工具箱</h1>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          <Link className="text-zinc-300 hover:text-white" href="/tools">
            工具
          </Link>
          <a
            className="text-zinc-300 hover:text-white"
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <div className="flex items-center gap-2 border-l border-white/10 pl-4">
            <AuthStatus />
          </div>
        </nav>
      </header>

      <main className="relative mx-auto w-full max-w-6xl px-6 pb-20">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur md:p-12">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
            Tool Platform
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
            一個可長期擴充的工具集合平台
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300">
            這裡是工具箱入口。每個工具可獨立運作、低耦合，可按需接入 Supabase
            以支援登入、資料庫與儲存。
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/tools"
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-medium text-black hover:bg-zinc-100"
            >
              瀏覽所有工具
            </Link>
            <Link
              href="/tools/hello"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/0 px-5 py-3 text-sm font-medium text-white hover:bg-white/10"
            >
              開始（範例工具）
            </Link>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <h3 className="text-lg font-semibold">已註冊工具</h3>
            <Link className="text-sm text-zinc-400 hover:text-white" href="/tools">
              查看全部 →
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {tools.slice(0, 4).map((t) => (
              <Link
                key={t.id}
                href={t.href}
                className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-white/20 hover:bg-white/10"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-base font-semibold">{t.name}</div>
                    <div className="mt-1 text-sm text-zinc-400">{t.description}</div>
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
        </section>
      </main>

      <footer className="relative mx-auto w-full max-w-6xl px-6 pb-10 text-xs text-zinc-500">
        © {new Date().getFullYear()} Marshmallow Toolbox
      </footer>
    </div>
  );
}
