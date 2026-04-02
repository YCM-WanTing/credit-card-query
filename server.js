'use strict';

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const cron = require('node-cron');

const { scrapeAll } = require('./scraper');
const { queryStore, CATEGORY_LABELS } = require('./matcher');

const CACHE_PATH = path.join(__dirname, 'card_data.json');
const PORT = process.env.PORT || 3000;

// ────────────────────────────────────────────────────────────────────────────

function readCache() {
  return JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'));
}

function writeCache(data) {
  data.lastUpdated = new Date().toISOString();
  fs.writeFileSync(CACHE_PATH, JSON.stringify(data, null, 2), 'utf8');
}

function mergeScrapedRates(cache, scrapedMap) {
  cache.cards = cache.cards.map(card => {
    const scraped = scrapedMap[card.id];
    if (scraped) {
      card.rates = { ...card.rates, ...scraped };
    }
    return card;
  });
  return cache;
}

// ────────────────────────────────────────────────────────────────────────────

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// GET /api/cards — 回傳所有卡片完整資料
app.get('/api/cards', (req, res) => {
  try {
    res.json(readCache());
  } catch (e) {
    res.status(500).json({ error: '無法讀取快取', detail: e.message });
  }
});

// GET /api/query?store=<name> — 商家查詢
app.get('/api/query', (req, res) => {
  const store = (req.query.store || '').trim();
  if (!store) {
    return res.status(400).json({ error: '請提供 store 參數' });
  }
  try {
    const cache = readCache();
    const result = queryStore(store, cache.cards);
    res.json({
      store,
      matchedCategory: result.matchedCategory,
      matchedCategoryLabel: CATEGORY_LABELS[result.matchedCategory] || result.matchedCategory,
      matchScore: result.matchScore,
      matchedKeyword: result.matchedKeyword,
      ranked: result.ranked,
    });
  } catch (e) {
    res.status(500).json({ error: '查詢失敗', detail: e.message });
  }
});

// POST /api/refresh — 觸發爬蟲更新（背景執行，立即回應）
let isRefreshing = false;

app.post('/api/refresh', (req, res) => {
  if (isRefreshing) {
    return res.status(409).json({ error: '更新已在進行中，請稍後再試' });
  }

  res.json({ message: '已開始更新資料，請稍後重新查詢', status: 'in_progress' });

  isRefreshing = true;
  scrapeAll()
    .then(scrapedMap => {
      const cache = readCache();
      const updated = mergeScrapedRates(cache, scrapedMap);
      writeCache(updated);
      console.log('[server] 資料更新完成:', updated.lastUpdated);
    })
    .catch(e => {
      console.error('[server] 更新失敗:', e);
    })
    .finally(() => {
      isRefreshing = false;
    });
});

// GET /api/refresh/status — 查詢更新狀態
app.get('/api/refresh/status', (req, res) => {
  try {
    const cache = readCache();
    res.json({
      isRefreshing,
      lastUpdated: cache.lastUpdated,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ────────────────────────────────────────────────────────────────────────────
// 定時任務：每週日凌晨 2 點自動更新

cron.schedule('0 2 * * 0', () => {
  console.log('[cron] 每週自動更新觸發');
  if (isRefreshing) return;
  isRefreshing = true;
  scrapeAll()
    .then(scrapedMap => {
      const cache = readCache();
      writeCache(mergeScrapedRates(cache, scrapedMap));
      console.log('[cron] 自動更新完成');
    })
    .catch(e => console.error('[cron] 自動更新失敗:', e))
    .finally(() => { isRefreshing = false; });
});

// ────────────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`✅ 信用卡優惠查詢系統已啟動：http://localhost:${PORT}`);
  console.log('   GET  /api/cards              — 所有卡片資料');
  console.log('   GET  /api/query?store=<名稱>  — 商家查詢');
  console.log('   POST /api/refresh             — 觸發資料更新');
});
