# 食品標籤分析器 (Label Analyzer)

Google AI Edge Gallery Agent Skill — 直接拍照辨識食品標籤，批次分析多張照片，整理表格並上傳 Google Sheets。

## 目錄結構

```
label-analyzer/
├── SKILL.md                  # Skill 定義＋LLM 指令
├── scripts/
│   └── index.html            # JS Skill：報表渲染 + Google Sheets 上傳
├── google-apps-script.js     # 部署到 Google Apps Script 的 webhook
└── README.md
```

## 使用流程

1. **在 Agent Skills 中載入** `label-analyzer` skill
2. **拍照或上傳**一張或多張食品標籤照片
3. LLM 自動辨識品名、淨重、有效日期 → 顯示表格請你確認
4. 可**繼續上傳更多照片**，累積合併後統一分析
5. 確認後產生完整報表（明細 + 按日期合計 + 統計摘要 + 到期警示）
6. 詢問是否上傳 Google Sheets → 一鍵上傳

## 設定 Google Sheets 上傳

1. 到 [script.google.com](https://script.google.com) 建立新專案
2. 貼上 `google-apps-script.js` 內容
3. 將 `SPREADSHEET_ID` 替換為你的目標試算表 ID
4. 部署 →「網頁應用程式」→ 存取權「所有人」
5. 複製 Web App URL，在 skill 啟動時貼入 secret 欄位

## 適用場景

- 倉庫盤點：掃描整批產品標籤，快速彙整到期日管理報表
- 品管檢驗：批量記錄進料或成品標籤資訊
- 門市收貨：驗收核對並自動建檔到 Google Sheets
