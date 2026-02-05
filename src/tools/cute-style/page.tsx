"use client";

import { useState } from "react";

type Style = "cute" | "tech" | "storybook";
type ColorScheme = "pastel" | "vivid" | "mono";
type Composition = "center" | "full" | "sticker";

const styleLabels: Record<Style, string> = {
  cute: "可愛風格",
  tech: "科技感",
  storybook: "童書風格",
};

const colorSchemeLabels: Record<ColorScheme, string> = {
  pastel: "粉彩",
  vivid: "鮮明",
  mono: "黑白/單色",
};

const compositionLabels: Record<Composition, string> = {
  center: "置中主體",
  full: "滿版構圖",
  sticker: "貼圖/透明背景",
};

type PromptParts = {
  subject: string;
  style: string;
  color: string;
  composition: string;
  background: string;
  lighting: string;
  details: string;
  negative: string;
};

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildPrompt(parts: PromptParts) {
  return [
    `主體：${parts.subject}`,
    `風格：${parts.style}`,
    `色系：${parts.color}`,
    `構圖：${parts.composition}`,
    `背景：${parts.background}`,
    `光線：${parts.lighting}`,
    `細節：${parts.details}`,
    `負面詞：${parts.negative}`,
  ].join("\n");
}

function generateParts(
  topic: string,
  style: Style,
  colorScheme: ColorScheme,
  composition: Composition,
  detailLevel: number,
): PromptParts {
  const baseSubject = topic.trim();

  const styleBank: Record<Style, { style: string[]; details: string[]; negative: string[] }> = {
    cute: {
      style: ["Q版", "圓潤線條", "大眼睛", "軟萌表情", "手繪插畫"],
      details: [
        "乾淨線條、可愛比例、表情親切",
        "圓潤輪廓、微笑表情、童趣小道具",
        "簡約但有重點、適合貼圖/插畫",
      ],
      negative: [
        "寫實", "恐怖", "血腥", "噪點", "模糊", "低解析度", "文字", "浮水印",
      ],
    },
    tech: {
      style: ["賽博風", "霓虹光暈", "幾何線條", "金屬材質", "數位質感"],
      details: [
        "高對比、乾淨邊緣、發光輪廓",
        "精準線條、冷色調、未來感介面元素",
        "科技細節、材質清晰、光暈自然",
      ],
      negative: [
        "復古", "髒污", "模糊", "低解析度", "過曝", "文字", "浮水印",
      ],
    },
    storybook: {
      style: ["繪本插畫", "水彩質感", "溫暖筆觸", "柔和陰影", "童趣"],
      details: [
        "溫暖色調、柔和邊緣、像故事書插畫",
        "手繪筆觸明顯、紙張質感、溫馨氛圍",
        "角色表情溫柔、場景簡單但有故事感",
      ],
      negative: [
        "寫實", "冷硬金屬", "噪點", "模糊", "低解析度", "文字", "浮水印",
      ],
    },
  };

  const colorBank: Record<ColorScheme, string[]> = {
    pastel: ["粉彩配色", "柔和漸層", "低飽和、乾淨"],
    vivid: ["高飽和鮮明配色", "明亮對比", "活潑色塊"],
    mono: ["黑白單色", "單色系強對比", "極簡配色"],
  };

  const backgroundBank: Record<Composition, string[]> = {
    center: ["簡潔背景、留白", "柔和背景色塊", "簡單幾何背景"],
    full: ["滿版背景、有場景", "層次背景、景深", "主體與背景互動"],
    sticker: ["透明背景（sticker）", "純色背景（可去背）", "無背景、只保留主體"],
  };

  const compositionBank: Record<Composition, string[]> = {
    center: ["主體置中、清楚輪廓", "適合封面/主視覺"],
    full: ["滿版構圖、畫面豐富", "適合海報/社群貼文"],
    sticker: ["貼圖構圖、外框乾淨", "適合表情包/貼圖"],
  };

  const lightingBank: Record<Style, string[]> = {
    cute: ["柔和漫射光", "微微高光", "溫柔陰影"],
    tech: ["霓虹側光", "冷色輪廓光", "高對比光影"],
    storybook: ["暖色窗光", "柔和光暈", "自然陰影"],
  };

  const bank = styleBank[style];
  const extraDetail =
    detailLevel >= 2
      ? "，細節豐富、材質清晰、邊緣乾淨"
      : detailLevel === 1
        ? "，細節適中、乾淨不雜亂"
        : "，極簡清爽";

  return {
    subject: baseSubject,
    style: `${pick(bank.style)}、${pick(bank.style)}、${pick(bank.style)}`,
    color: pick(colorBank[colorScheme]),
    composition: pick(compositionBank[composition]),
    background: pick(backgroundBank[composition]),
    lighting: pick(lightingBank[style]),
    details: `${pick(bank.details)}${extraDetail}`,
    negative: bank.negative.join("、"),
  };
}

const exampleTopics = [
  "國小校園",
  "動物園",
  "萬聖節",
  "貓咪",
  "恐龍",
  "太空",
  "生日派對",
  "森林",
  "機器人",
  "甜點",
  "海洋",
];

export default function CuteStyleGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState<Style>("cute");
  const [colorScheme, setColorScheme] = useState<ColorScheme>("pastel");
  const [composition, setComposition] = useState<Composition>("center");
  const [detailLevel, setDetailLevel] = useState(1);

  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  // 即時預覽：任一選項變更就自動更新
  const refresh = () => {
    const trimmed = topic.trim();
    if (!trimmed) {
      setOutput("");
      return;
    }
    const parts = generateParts(trimmed, style, colorScheme, composition, detailLevel);
    setOutput(buildPrompt(parts));
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  const handleExample = (t: string) => {
    setTopic(t);
    setCopied(false);
    // 不清空 output，讓即時預覽生效
  };

  const canGenerate = topic.trim().length > 0;
  const topicLen = topic.trim().length;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold">可愛風格產生器（文字→描述）</h2>
        <p className="mt-2 text-sm text-zinc-400">
          輸入主題並選擇風格，輸出可直接丟進 Canva / AI 的描述文字。
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-zinc-300">
                主題（例如：貓咪、恐龍、太空）
              </label>
              <span className="text-xs text-zinc-500">
                {topicLen} 字
              </span>
            </div>
            <input
              type="text"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                refresh();
              }}
              placeholder="輸入主題"
              className="mt-1 block w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              風格
            </label>
            <div className="flex gap-2 flex-wrap">
              {(Object.keys(styleLabels) as Style[]).map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setStyle(s);
                    refresh();
                  }}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    style === s
                      ? "bg-white text-black"
                      : "border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                  }`}
                >
                  {styleLabels[s]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              色系
            </label>
            <div className="flex gap-2 flex-wrap">
              {(Object.keys(colorSchemeLabels) as ColorScheme[]).map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setColorScheme(c);
                    refresh();
                  }}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    colorScheme === c
                      ? "bg-white text-black"
                      : "border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                  }`}
                >
                  {colorSchemeLabels[c]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              構圖
            </label>
            <div className="flex gap-2 flex-wrap">
              {(Object.keys(compositionLabels) as Composition[]).map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setComposition(c);
                    refresh();
                  }}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    composition === c
                      ? "bg-white text-black"
                      : "border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                  }`}
                >
                  {compositionLabels[c]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              細節等級
            </label>
            <div className="flex gap-2">
              {[0, 1, 2].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => {
                    setDetailLevel(lvl);
                    refresh();
                  }}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    detailLevel === lvl
                      ? "bg-white text-black"
                      : "border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                  }`}
                >
                  {lvl === 0 ? "極簡" : lvl === 1 ? "適中" : "豐富"}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleGenerate}
              disabled={!canGenerate}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                canGenerate
                  ? "bg-white text-black hover:bg-zinc-100"
                  : "border border-white/10 bg-white/5 text-zinc-500 cursor-not-allowed"
              }`}
            >
              產生描述
            </button>
            <button
              onClick={() => {
                setTopic("");
                setOutput("");
                setCopied(false);
              }}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/10"
            >
              清空
            </button>
          </div>

          {output && (
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                結構化輸出（可直接貼到 Canva / AI）
              </label>
              <textarea
                value={output}
                readOnly
                rows={8}
                className="block w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white font-mono focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/10"
              />
              <button
                onClick={handleCopy}
                className="mt-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-white/10"
              >
                {copied ? "已複製" : "複製到剪貼簿"}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-sm font-medium text-zinc-300 mb-3">範例主題（點擊帶入）</h3>
        <div className="flex flex-wrap gap-2">
          {exampleTopics.map((t) => (
            <button
              key={t}
              onClick={() => handleExample(t)}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300 hover:bg-white/10"
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}