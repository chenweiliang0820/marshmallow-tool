"use client";

import { useState } from "react";

export default function JsonFormatToolPage() {
  const [raw, setRaw] = useState("");
  const [formatted, setFormatted] = useState("");
  const [error, setError] = useState("");

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(raw);
      const pretty = JSON.stringify(parsed, null, 2);
      setFormatted(pretty);
      setError("");
    } catch (e) {
      setError("JSON 格式錯誤：" + (e instanceof Error ? e.message : String(e)));
      setFormatted("");
    }
  };

  const handleClear = () => {
    setRaw("");
    setFormatted("");
    setError("");
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold">JSON 格式化</h2>
        <p className="mt-2 text-sm text-zinc-400">
          純前端 JSON 格式化與驗證工具，無需後端。
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300">
              貼上或輸入 JSON
            </label>
            <textarea
              value={raw}
              onChange={(e) => setRaw(e.target.value)}
              placeholder='{"key":"value"}'
              rows={8}
              className="mt-1 block w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-zinc-500 font-mono focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/10"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleFormat}
              className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              格式化
            </button>
            <button
              onClick={handleClear}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/10"
            >
              清空
            </button>
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
              {error}
            </div>
          )}

          {formatted && (
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                格式化結果
              </label>
              <textarea
                value={formatted}
                readOnly
                rows={12}
                className="block w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white font-mono focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/10"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(formatted);
                }}
                className="mt-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-white/10"
              >
                複製到剪貼簿
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}