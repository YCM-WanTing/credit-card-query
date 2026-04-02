'use strict';
/**
 * build.js — 從 card_data.json 重新產生 docs/index.html
 *
 * 用法：node build.js
 *
 * 會做什麼：
 *   1. 讀取 card_data.json 的最新卡片資料
 *   2. 將 docs/index.html 裡的 CARDS 陣列替換成最新資料
 *   3. 更新 header 的「資料更新」日期
 */

const fs   = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'card_data.json');
const HTML_FILE = path.join(__dirname, 'docs', 'index.html');

// ── 1. 讀取資料 ───────────────────────────────────────────────
if (!fs.existsSync(DATA_FILE)) {
  console.error('❌ 找不到 card_data.json');
  process.exit(1);
}
if (!fs.existsSync(HTML_FILE)) {
  console.error('❌ 找不到 docs/index.html');
  process.exit(1);
}

const data  = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
const cards = data.cards;
if (!Array.isArray(cards) || cards.length === 0) {
  console.error('❌ card_data.json 的 cards 欄位無效');
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

// ── 2. 找到 docs/index.html 中 CARDS 資料區段 ─────────────────
let html  = fs.readFileSync(HTML_FILE, 'utf8');
const lines = html.split('\n');

// 找 "const CARDS = [" 的行號
const cardsStartIdx = lines.findIndex(l => l.trim().startsWith('const CARDS = ['));
if (cardsStartIdx === -1) {
  console.error('❌ 找不到 "const CARDS = [" — docs/index.html 格式可能被修改過');
  process.exit(1);
}

// 找緊接在 CARDS 之後的 "// ═══" 分隔符（商家匹配邏輯的開頭）
const separatorIdx = lines.findIndex(
  (l, i) => i > cardsStartIdx && l.startsWith('// ═══')
);
if (separatorIdx === -1) {
  console.error('❌ 找不到 CARDS 結尾的分隔符 — docs/index.html 格式可能被修改過');
  process.exit(1);
}

// ── 3. 組合新的 CARDS 字串 ────────────────────────────────────
// 轉成可讀的 JSON，但保留原有的縮排風格（2 格）
const cardsJson = JSON.stringify(cards, null, 2);
const newCardsBlock = `const CARDS = ${cardsJson};`.split('\n');

// 替換舊的 CARDS 行（cardsStartIdx 到 separatorIdx 之間的行），保留空白行
lines.splice(cardsStartIdx, separatorIdx - cardsStartIdx, ...newCardsBlock, '');

// ── 4. 更新 header 日期 ───────────────────────────────────────
const updatedHtml = lines
  .join('\n')
  .replace(/資料更新：\d{4}-\d{2}-\d{2}/, `資料更新：${today}`);

// ── 5. 寫回檔案 ───────────────────────────────────────────────
fs.writeFileSync(HTML_FILE, updatedHtml, 'utf8');
console.log(`✅ docs/index.html 已更新`);
console.log(`   日期：${today}`);
console.log(`   卡片數量：${cards.length} 張`);
