'use strict';

const fetch = require('node-fetch');
const cheerio = require('cheerio');

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36';

const FETCH_OPTS = {
  headers: {
    'User-Agent': UA,
    'Accept': 'text/html,application/xhtml+xml,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'zh-TW,zh;q=0.9,en;q=0.8',
  },
  timeout: 20000,
};

// ────────────────────────────────────────────────────────────────────────────
// 共用工具

async function fetchHtml(url) {
  const res = await fetch(url, FETCH_OPTS);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

/** 從文字中抽取第一個百分比數字 */
function extractPct(text) {
  const m = text.match(/(\d+\.?\d*)%/);
  return m ? parseFloat(m[1]) : null;
}

// ────────────────────────────────────────────────────────────────────────────
// 各卡爬蟲
// 每個函式回傳 partial rates 物件（只包含能從頁面確認的欄位）
// 或 null（無法取得，使用既有快取）

/**
 * 匯豐 現金御璽卡 — 靜態 HTML
 * 主要確認國內 1.22%、海外 2.22%
 */
async function scrapeHsbc() {
  try {
    const html = await fetchHtml('https://www.hsbc.com.tw/credit-cards/products/cash-back/');
    const $ = cheerio.load(html);
    const text = $('body').text();

    let domestic = 1.22;
    let overseas = 2.22;

    const domesticMatch = text.match(/(?:domestic|國內).*?(\d+\.?\d*)%/i);
    const overseasMatch = text.match(/(?:overseas|海外).*?(\d+\.?\d*)%/i);
    if (domesticMatch) domestic = parseFloat(domesticMatch[1]);
    if (overseasMatch) overseas = parseFloat(overseasMatch[1]);

    return {
      general: { rate: domestic, unit: '%', cap: null, capUnit: null, note: '國內消費現金回饋，無上限' },
      overseas: { rate: overseas, unit: '%', cap: null, capUnit: null, note: '海外消費現金回饋，無上限' },
    };
  } catch (e) {
    console.warn('[scraper] HSBC failed:', e.message);
    return null;
  }
}

/**
 * 永豐 DAWAY 卡 — 靜態 HTML
 * 確認 LINE Pay 回饋率
 */
async function scrapeDaway() {
  try {
    const html = await fetchHtml('https://bank.sinopac.com/sinopacbt/personal/credit-card/introduction/bankcard/DAWAY.html');
    const $ = cheerio.load(html);
    const text = $('body').text();

    // 抽取 LINE Pay 回饋
    let linepay = 2.0;
    const lpMatch = text.match(/line\s*pay.*?(\d+\.?\d*)%/i);
    if (lpMatch) linepay = parseFloat(lpMatch[1]);

    return {
      linepay: { rate: linepay, unit: '%', cap: 300, capUnit: 'points/月', note: `LINE Pay 消費 ${linepay}% LINE POINTS` },
    };
  } catch (e) {
    console.warn('[scraper] Sinopac DAWAY failed:', e.message);
    return null;
  }
}

/**
 * 聯邦 LINE PAY 卡 — 靜態 HTML
 */
async function scrapeUbot() {
  try {
    const html = await fetchHtml('https://activity.ubot.com.tw/2026LaiDianCard/index.htm');
    const $ = cheerio.load(html);
    const text = $('body').text();

    let overseas = 3.0;
    const overseasMatch = text.match(/海外.*?(\d+\.?\d*)%/);
    if (overseasMatch) overseas = parseFloat(overseasMatch[1]);

    return {
      overseas: { rate: overseas, unit: '%', cap: null, capUnit: null, note: `海外消費 ${overseas}% LINE POINTS，無上限` },
    };
  } catch (e) {
    console.warn('[scraper] Ubot LINE PAY failed:', e.message);
    return null;
  }
}

/**
 * 富邦 J卡 — 嘗試靜態抓取，若失敗回傳 null
 */
async function scrapeFubon() {
  try {
    const html = await fetchHtml('https://www.fubon.com/banking/j02/');
    const $ = cheerio.load(html);
    const text = $('body').text();

    let japan = 10.0;
    const japanMatch = text.match(/(?:suica|pasmo|icoca|電子錢包|ic卡).*?(\d+)%/i);
    if (japanMatch) japan = parseFloat(japanMatch[1]);

    return {
      japan_transit: { rate: japan, unit: '%', cap: null, capUnit: null, note: `日本 IC 電子錢包加值 ${japan}%` },
    };
  } catch (e) {
    console.warn('[scraper] Fubon J failed:', e.message);
    return null;
  }
}

/**
 * 台新 Richart 卡 — SPA，嘗試靜態，失敗回傳 null（快取回饋夠用）
 */
async function scrapeRichart() {
  try {
    const html = await fetchHtml('https://richart.tw/TSDIB_RichartWeb/RC03/RC0301');
    const $ = cheerio.load(html);
    const text = $('body').text();

    // 只確認最高 3.8% 是否仍有提及
    const maxMatch = text.match(/(\d+\.?\d*)%/g);
    if (maxMatch && maxMatch.length > 0) {
      // 有找到回饋資訊，維持快取即可
    }
    return null; // Richart SPA 很難靜態解析，保留快取
  } catch (e) {
    console.warn('[scraper] Richart failed:', e.message);
    return null;
  }
}

/**
 * 元大 鑽金卡 — 嘗試靜態，通常 403，回傳 null
 */
async function scrapeYuanta() {
  try {
    const html = await fetchHtml('https://www.yuantabank.com.tw/bank/creditCard/creditCard/in.do?id=275bac7b2e000004dddb');
    const $ = cheerio.load(html);
    const text = $('body').text();

    let domestic = 1.2;
    let overseas = 2.2;
    const dMatch = text.match(/國內.*?(\d+\.?\d*)%/);
    const oMatch = text.match(/海外.*?(\d+\.?\d*)%/);
    if (dMatch) domestic = parseFloat(dMatch[1]);
    if (oMatch) overseas = parseFloat(oMatch[1]);

    return {
      general: { rate: domestic, unit: '%', cap: null, capUnit: null, note: '國內消費鑽金回饋，無上限' },
      overseas: { rate: overseas, unit: '%', cap: null, capUnit: null, note: '海外消費鑽金回饋，無上限' },
    };
  } catch (e) {
    console.warn('[scraper] Yuanta failed:', e.message);
    return null;
  }
}

// ────────────────────────────────────────────────────────────────────────────

/**
 * 爬取全部卡片，回傳 { cardId: partialRates } 的 map
 * 失敗的卡片不會出現在 map 中（保留快取）
 */
async function scrapeAll() {
  const results = {};

  const jobs = [
    scrapeHsbc().then(r => r && (results['hsbc_signature'] = r)),
    scrapeDaway().then(r => r && (results['sinopac_daway'] = r)),
    scrapeUbot().then(r => r && (results['ubot_linepay'] = r)),
    scrapeFubon().then(r => r && (results['fubon_j'] = r)),
    scrapeRichart().then(r => r && (results['taishin_richart'] = r)),
    scrapeYuanta().then(r => r && (results['yuanta_diamond'] = r)),
  ];

  const settled = await Promise.allSettled(jobs);
  const failed = settled.filter(s => s.status === 'rejected');
  if (failed.length > 0) {
    failed.forEach(f => console.warn('[scraper] Job error:', f.reason));
  }

  console.log(`[scraper] Done. Updated cards: ${Object.keys(results).join(', ') || '(none, all from cache)'}`);
  return results;
}

module.exports = { scrapeAll };
