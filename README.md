# AI.Skills

Google AI Edge Gallery 的 Agent Skills 集合。

## Skills

| Skill | 說明 |
|-------|------|
| [label-analyzer](label-analyzer/) | 食品標籤批次辨識 — 拍照自動提取品名、淨重、有效日期，支援到期警示與匯出至 Google Sheets |

## 安裝方式

### 從 URL 載入（推薦）

1. 啟用 GitHub Pages：Settings → Pages → Deploy from branch → `main` → `/ (root)`
2. 開啟 AI Edge Gallery → Agent Skills → Skills → (+) → **Load skill from URL**
3. 輸入 `https://<你的帳號>.github.io/AI.Skills/<skill-name>/`

> 若 SKILL.md 被 Jekyll 忽略，請在 repo 根目錄新增 `.nojekyll` 空檔案。

### 本機載入

```bash
adb push <skill-name>/ /sdcard/Download/<skill-name>/
```

AI Edge Gallery → Agent Skills → Skills → (+) → **Import local skill** → 選擇資料夾

## Skill 結構

每個 skill 資料夾的基本結構：

```
<skill-name>/
├── SKILL.md              # Skill 定義 + LLM 指令
├── scripts/
│   └── index.html        # 互動式 UI
├── README.md             # Skill 說明文件
└── ...                   # 其他輔助檔案
```

## 授權

MIT License
