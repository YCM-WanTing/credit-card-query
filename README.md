# 💳 台灣信用卡優惠查詢系統

輸入商家名稱，立即找出最划算的信用卡。支援手機使用，不需要安裝任何 App。

**線上版本：** https://ycm-wanting.github.io/credit-card-query/

---

## 功能

- **商家查詢**：輸入商家或消費類別（例如：全聯、蝦皮、日本、加油站），自動比較各卡回饋率並排名
- **快速標籤**：常用商家一鍵查詢
- **查看所有優惠**：展開檢視每張卡的完整回饋明細
- **智慧匹配**：自動將商家名稱對應到正確消費類別（超市、餐廳、網購、海外…等）

## 收錄卡片

| 卡片 | 發卡銀行 |
|------|----------|
| Richart 卡 | 台新銀行 |
| DAWAY 卡 | 永豐銀行 |
| LINE PAY 卡（賴點卡） | 聯邦銀行 |
| J卡 | 富邦銀行 |
| 現金御璽卡 | 匯豐銀行 |
| 鑽金卡 | 元大銀行 |

## 專案結構

```
credit-card/
├── docs/
│   └── index.html      # 靜態頁面（GitHub Pages 部署來源）
├── public/
│   └── index.html      # 有後端 API 的完整版前端
├── card_data.json       # 卡片優惠資料（唯一需要維護的資料檔）
├── matcher.js           # 商家名稱 → 消費類別的匹配邏輯
├── build.js             # 從 card_data.json 重新產生靜態頁面
├── server.js            # Express 後端（本地開發用）
└── scraper.js           # 爬蟲腳本（自動抓取優惠資料）
```

## 更新優惠資料

### 手動更新

1. 修改 `card_data.json`
2. 執行 build 腳本重新產生靜態頁面：
   ```bash
   node build.js
   # 或
   npm run build
   ```
3. Commit 並 push：
   ```bash
   git add card_data.json docs/index.html
   git commit -m "更新卡片資料"
   git push
   ```

Push 完成後約 1 分鐘，GitHub Pages 自動更新。

### card_data.json 結構

```json
{
  "lastUpdated": "2026-04-02T10:00:00.000Z",
  "cards": [
    {
      "id": "card_id",
      "name": "卡片名稱",
      "issuer": "發卡銀行",
      "color": "#hex色碼",
      "sourceUrl": "官方網頁",
      "annualFee": "年費說明",
      "notes": "備註",
      "rates": {
        "general":     { "rate": 1.0, "unit": "%", "cap": null, "capUnit": null, "note": "說明" },
        "dining":      { "rate": 3.0, "unit": "%", "cap": 500,  "capUnit": "points/月", "note": "說明" }
      }
    }
  ]
}
```

**支援的消費類別 key：** `general` / `convenience` / `dining` / `online` / `department` / `supermarket` / `fuel` / `travel` / `overseas` / `insurance` / `linepay`

## 本地開發

```bash
# 安裝相依套件
npm install

# 啟動後端伺服器（含自動重啟）
npm run dev

# 只重新產生靜態頁面
npm run build
```

伺服器啟動後開啟 http://localhost:3000

## 技術說明

- **靜態版**（`docs/index.html`）：純 HTML + CSS + JavaScript，零相依，可直接部署到任何靜態空間或用手機開啟
- **後端版**（`server.js`）：Node.js + Express，支援即時爬蟲更新
- **匹配演算法**：關鍵字完全比對 → 包含比對 → 字元相似度計分，自動退回「一般消費」