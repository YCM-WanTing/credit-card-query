'use strict';
/**
 * build.js — 從 card_data.json + matcher.js 重新產生 docs/index.html
 *
 * 用法：node build.js
 *
 * 會做什麼：
 *   1. 從 card_data.json 讀取最新卡片資料，替換靜態 HTML 中的 CARDS 陣列
 *   2. 從 matcher.js 讀取 MERCHANT_MAP / CATEGORY_RATE_KEY / CATEGORY_LABELS，
 *      替換靜態 HTML 中的對應常數（matcher.js 是唯一真實來源）
 *   3. 更新 header 的「資料更新」日期
 */

const fs   = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'card_data.json');
const HTML_FILE = path.join(__dirname, 'docs', 'index.html');

// ── 讀取資料 ──────────────────────────────────────────────
if (!fs.existsSync(DATA_FILE)) { console.error('❌ 找不到 card_data.json'); process.exit(1); }
if (!fs.existsSync(HTML_FILE)) { console.error('❌ 找不到 docs/index.html'); process.exit(1); }

const { cards } = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
if (!Array.isArray(cards) || cards.length === 0) {
  console.error('❌ card_data.json 的 cards 欄位無效'); process.exit(1);
}

const { MERCHANT_MAP, CATEGORY_RATE_KEY, CATEGORY_LABELS } = require('./matcher');
const today = new Date().toISOString().slice(0, 10);

// ── 讀取 HTML，轉成行陣列操作 ────────────────────────────
let lines = fs.readFileSync(HTML_FILE, 'utf8').split('\n');

// ── 步驟 1：替換 CARDS 陣列 ───────────────────────────────
{
  const start = lines.findIndex(l => l.trim().startsWith('const CARDS = ['));
  // 找緊接在 CARDS 後面的 "// ═══" 分隔符
  const end   = lines.findIndex((l, i) => i > start && l.startsWith('// ═══'));
  if (start === -1 || end === -1) {
    console.error('❌ 找不到 CARDS 區段標記'); process.exit(1);
  }
  const newBlock = ('const CARDS = ' + JSON.stringify(cards, null, 2) + ';').split('\n');
  lines.splice(start, end - start, ...newBlock, '');
}

// ── 步驟 2：替換匹配資料常數 ──────────────────────────────
// 替換範圍：const MERCHANT_MAP = { ... 到 function normalize( 之前
{
  const start = lines.findIndex(l => l.startsWith('const MERCHANT_MAP = {'));
  const end   = lines.findIndex((l, i) => i > start && l.startsWith('function normalize('));
  if (start === -1 || end === -1) {
    console.error('❌ 找不到 MERCHANT_MAP 區段標記'); process.exit(1);
  }

  const newBlock = [
    'const MERCHANT_MAP = ' + JSON.stringify(MERCHANT_MAP, null, 2) + ';',
    '',
    'const CATEGORY_RATE_KEY = ' + JSON.stringify(CATEGORY_RATE_KEY, null, 2) + ';',
    '',
    'const CATEGORY_LABELS = ' + JSON.stringify(CATEGORY_LABELS, null, 2) + ';',
    '',
  ];
  lines.splice(start, end - start, ...newBlock);
}

// ── 步驟 3：更新 header 日期 ──────────────────────────────
let html = lines.join('\n')
  .replace(/資料更新：\d{4}-\d{2}-\d{2}/, `資料更新：${today}`);

// ── 寫回 ─────────────────────────────────────────────────
fs.writeFileSync(HTML_FILE, html, 'utf8');
console.log(`✅ docs/index.html 已更新`);
console.log(`   日期：${today}`);
console.log(`   卡片：${cards.length} 張`);
console.log(`   商家關鍵字：${Object.keys(MERCHANT_MAP).length} 個`);
