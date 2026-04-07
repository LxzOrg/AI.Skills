# AI.Skills

Claude Web (claude.ai) Project Skills 集合。

將 `prompt.md` 貼入 Project Custom Instructions 即可使用。

## Skills

| Skill | 說明 |
|-------|------|
| [label-analyzer](label-analyzer/) | 食品標籤批次辨識 — 上傳照片自動提取品名、淨重、有效日期，Artifact 互動報表 + 到期警示 + 匯出 CSV |

## 安裝方式

1. 開啟 [claude.ai](https://claude.ai) → 建立或選擇 Project
2. 進入 Project Settings → **Custom Instructions**
3. 將對應 skill 的 `prompt.md` 內容貼入
4. 儲存後在 Project 中開啟新對話即可使用

## Skill 結構

```
<skill-name>/
├── prompt.md     # Claude Project 自訂指令
└── README.md     # 說明文件
```

## 授權

MIT License
