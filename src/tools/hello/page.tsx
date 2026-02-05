"use client";

import { useState } from "react";

export default function HelloToolPage() {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");

  const handleGreet = () => {
    if (!name.trim()) {
      setGreeting("請輸入名字");
      return;
    }
    setGreeting(`Hello, ${name}！這是棉花糖工具箱的範例工具。`);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold">Hello 工具</h2>
        <p className="mt-2 text-sm text-zinc-400">
          確認工具模組化、路由與版型運作。輸入名字後點擊按鈕。
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300">
              你的名字
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="輸入名字"
              className="mt-1 block w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/10"
            />
          </div>

          <button
            onClick={handleGreet}
            className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            打招呼
          </button>

          {greeting && (
            <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-zinc-300">
              {greeting}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
