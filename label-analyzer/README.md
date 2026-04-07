# Label Analyzer — 食品標籤批次辨識

Claude Web (claude.ai) Project Skill

上傳食品標籤照片 → 自動提取品名、淨重、有效日期 → Artifact 互動報表 + 到期警示 → 匯出 CSV / 複製到 Google Sheets

## 功能

- 直接在 Claude 對話中上傳多張標籤照片
- 自動辨識品名、淨重、有效日期
- 按有效日期合計，提供統計摘要
- 30 天內到期 / 已過期自動警示
- 透過 Artifact 產生互動式 HTML 報表
- 支援分享 CSV 與複製表格至 Google Sheets

## 安裝

1. 開啟 [claude.ai](https://claude.ai)
2. 建立新 Project（或使用現有 Project）
3. 進入 Project Settings → **Custom Instructions**
4. 將 [`prompt.md`](prompt.md) 的內容貼入
5. 儲存

## 使用方式

1. 在 Project 中開啟新對話
2. 上傳一張或多張食品標籤照片
3. Claude 會辨識並列出結果，確認無誤後產生互動報表
4. 在報表中點擊「分享 CSV」或「複製表格」匯出資料

## 目錄結構

```
label-analyzer/
├── prompt.md     # Claude Project 自訂指令
└── README.md     # 說明文件
```

## 授權

MIT License
