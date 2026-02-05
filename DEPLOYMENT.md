# 部署與環境變數說明

## Netlify 部署

### 1. 基本部署（純前端工具）

1. 推送此專案到 GitHub
2. 在 Netlify 連結該 repo
3. Netlify 會自動讀取 `netlify.toml` 並執行 `npm run build`
4. 部署完成，全站可公開使用

### 2. 啟用 Supabase Auth（需要登入/受限工具）

在 Netlify「Site settings > Environment variables」加入：

```
NEXT_PUBLIC_SUPABASE_URL = "https://your-project-id.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY = "your_supabase_anon_key"
```

> 這兩個變數可在 Supabase 專案設定頁找到。

### 3. 部署後驗證

- 首頁右上應顯示「登入（GitHub）」而非「尚未設定 Supabase」
- 進入「受限工具示範」應看到「需登入才能使用」提示
- 登入後應顯示使用者資訊

## 本機開發（含 Supabase）

建立 `.env.local`：

```
NEXT_PUBLIC_SUPABASE_URL = "https://your-project-id.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY = "your_supabase_anon_key"
```

然後 `npm run dev`。

## Supabase 專案初始化（若尚未建立）

1. 在 https://supabase.com 建立新專案
2. 在 Authentication > Providers 啟用 GitHub
3. 設定 GitHub OAuth App（callback URL：`https://your-site.netlify.app/auth/callback`）
4. 取得 `URL` 與 `anon key`，填入 Netlify 環境變數

## 注意事項

- **全站不強制依賴 Supabase**：未設定環境變數時，登入功能停用，但工具仍可正常使用
- **RLS 建議**：若有私有資料，請在 Supabase 設定 Row Level Security
- **Functions/Edge**：若需要伺服端邏輯，可在 `netlify/functions/` 加入，並在 `netlify.toml` 設定重寫規則

---

> 若遇到部署問題，請檢查 Netlify 的「Deploy logs」與「Functions logs」。