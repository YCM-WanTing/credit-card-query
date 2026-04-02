'use strict';
/**
 * update.js — 爬取最新優惠資料並重建靜態頁面
 *
 * 用法：node update.js
 *
 * 流程：
 *   1. 執行各銀行爬蟲，取得最新回饋率
 *   2. 將爬取結果 merge 進 card_data.json
 *   3. 執行 build.js 重新產生 docs/index.html
 */

const fs           = require('fs');
const path         = require('path');
const { execSync } = require('child_process');
const { scrapeAll } = require('./scraper');

const CACHE_PATH = path.join(__dirname, 'card_data.json');

async function main() {
  console.log('📡 開始爬取最新優惠資料…');

  const scrapedMap = await scrapeAll();
  const updatedCards = Object.keys(scrapedMap);

  if (updatedCards.length === 0) {
    console.log('⚠️  所有爬蟲均失敗，card_data.json 維持不變');
  } else {
    const cache = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'));

    cache.cards = cache.cards.map(card => {
      const scraped = scrapedMap[card.id];
      if (scraped) {
        card.rates = { ...card.rates, ...scraped };
        console.log(`  ✓ 更新：${card.name}`);
      }
      return card;
    });

    cache.lastUpdated = new Date().toISOString();
    fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2), 'utf8');
    console.log(`\n💾 card_data.json 已儲存（${updatedCards.length} 張卡更新）`);
  }

  console.log('\n🔨 重新產生 docs/index.html…');
  execSync('node build.js', { stdio: 'inherit' });
}

main().catch(e => {
  console.error('❌ 更新失敗:', e.message);
  process.exit(1);
});
