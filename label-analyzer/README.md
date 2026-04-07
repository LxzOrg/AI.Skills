# 🏷️ Label Analyzer — 食品標籤批次辨識

Google AI Edge Gallery Agent Skill

拍照辨識食品標籤 → 自動提取品名、淨重、有效日期 → 表格彙整 + 到期警示 → 匯出至 Google Sheets

## 功能

- 📸 直接在 Agent Skills 內拍照或上傳多張標籤照片
- 🔍 自動辨識品名、淨重、有效日期
- 📊 按有效日期合計，提供統計摘要
- ⚠️ 30 天內到期 / 已過期自動警示
- 📤 三種匯出方式（見下方）

## 匯出至 Google Sheets

### 方式一：📤 分享 CSV（推薦，零設定）

點「分享 CSV」→ 手機跳出分享選單 → 選擇 Google 雲端硬碟 或 Google Sheets → 完成。

**使用者不需要做任何事前設定。**

### 方式二：📋 複製表格（零設定）

點「複製表格」→ 開啟 Google Sheets → 貼上（Ctrl+V / 長按貼上）→ 資料自動填入儲存格。

### 方式三：☁️ SheetDB 自動上傳（需簡單設定）

如果想要一鍵自動寫入 Google Sheets：

1. 到 [sheetdb.io](https://sheetdb.io) 免費註冊
2. 建立 API → 連結你的 Google Sheet
3. 在 Sheet 第一列填入欄位名稱：`序號`、`品名`、`淨重`、`有效日期`、`上傳時間`
4. 複製 SheetDB 的 API URL（格式如 `https://sheetdb.io/api/v1/xxxxx`）
5. 載入 skill 時在 secret 欄位貼上此 URL

免費方案：2 個 Sheet、每月 500 次請求，夠用了。

### 方式四：Google Apps Script（進階）

詳見 `google-apps-script.js`。適合需要自訂寫入格式或多 Sheet 寫入的進階使用者。

## 安裝

### 從 URL 載入（推薦）

1. 將此 repo 發佈到 GitHub Pages
2. AI Edge Gallery → Agent Skills → Skills → (+) → Load skill from URL
3. 輸入 `https://你的帳號.github.io/label-analyzer/`

### 本機載入

```bash
adb push label-analyzer/ /sdcard/Download/label-analyzer/
```
AI Edge Gallery → Agent Skills → Skills → (+) → Import local skill → 選擇資料夾

## 目錄結構

```
label-analyzer/
├── SKILL.md              # Skill 定義 + LLM 指令
├── scripts/
│   └── index.html        # 報表 UI + 匯出功能
├── google-apps-script.js  # （可選）Apps Script webhook
└── README.md
```

## GitHub Pages 注意

- 必須使用 GitHub Pages（不能用 raw.githubusercontent.com，MIME type 不對）
- 如果 SKILL.md 被 Jekyll 吃掉，在 repo 根目錄加一個 `.nojekyll` 空檔案
- Settings → Pages → Deploy from branch → main → / (root) → Save

## 授權

MIT License
