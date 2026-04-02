'use strict';

// 商家關鍵字 → 消費類別
const MERCHANT_MAP = {
  // 超市 / 量販
  '全聯': 'supermarket', '全聯福利中心': 'supermarket',
  '家樂福': 'supermarket', 'carrefour': 'supermarket',
  '大潤發': 'supermarket', 'rt-mart': 'supermarket',
  '愛買': 'supermarket', 'costco': 'supermarket', '好市多': 'supermarket',
  '頂好': 'supermarket', '惠康': 'supermarket', 'wellcome': 'supermarket',
  '大賣場': 'supermarket', '量販': 'supermarket', '超市': 'supermarket',

  // 便利商店
  '7-11': 'convenience', '711': 'convenience', '7eleven': 'convenience',
  'seven eleven': 'convenience', '統一超商': 'convenience',
  '全家': 'convenience', 'family mart': 'convenience', 'familymart': 'convenience',
  '萊爾富': 'convenience', 'hilife': 'convenience',
  'ok超商': 'convenience', 'ok mart': 'convenience',
  '超商': 'convenience',

  // 餐廳 / 外食
  '麥當勞': 'dining', 'mcdonald': 'dining', "mcdonald's": 'dining',
  '肯德基': 'dining', 'kfc': 'dining',
  '星巴克': 'dining', 'starbucks': 'dining',
  '摩斯漢堡': 'dining', '摩斯': 'dining', 'mos burger': 'dining',
  '漢堡王': 'dining', 'burger king': 'dining',
  '必勝客': 'dining', 'pizza hut': 'dining',
  '達美樂': 'dining', "domino's": 'dining',
  '王品': 'dining', '西堤': 'dining', '陶板屋': 'dining',
  '鼎泰豐': 'dining', '欣葉': 'dining',
  'foodpanda': 'dining', '熊貓外送': 'dining',
  'ubereats': 'dining', 'uber eats': 'dining',
  '戶戶送': 'dining', 'deliveroo': 'dining',
  '外送': 'dining', '外食': 'dining', '餐廳': 'dining', '餐飲': 'dining',
  '火鍋': 'dining', '燒肉': 'dining', '壽司': 'dining', '拉麵': 'dining',
  '早餐': 'dining', '咖啡': 'dining',

  // 網路購物
  '蝦皮': 'online', 'shopee': 'online',
  'pchome': 'online', 'pc home': 'online',
  'momo': 'online', 'momo購物': 'online', 'momoshop': 'online',
  '博客來': 'online', 'books': 'online',
  '露天': 'online', '露天拍賣': 'online',
  'yahoo': 'online', 'yahoo購物': 'online', 'yahoo奇摩': 'online',
  '東森購物': 'online', '東森': 'online',
  '蝦皮購物': 'online', '網購': 'online', '電商': 'online',
  'amazon': 'online', 'rakuten': 'online', '樂天': 'online',
  'netflix': 'online', 'spotify': 'online', 'youtube premium': 'online',
  '串流': 'online', '訂閱': 'online',

  // 百貨 / 購物中心 / 3C
  '新光三越': 'department', '新光': 'department',
  '遠百': 'department', '遠東百貨': 'department',
  '太平洋sogo': 'department', 'sogo': 'department',
  '微風': 'department', '微風廣場': 'department',
  '統一時代': 'department', '漢神': 'department',
  '大遠百': 'department', '台茂': 'department', '林口三井': 'department',
  '燦坤': 'department', '全國電子': 'department',
  '誠品': 'department', '特力屋': 'department',
  '宜得利': 'department', 'nitori': 'department',
  '百貨': 'department', '購物中心': 'department',

  // 加油站
  '中油': 'fuel', '台灣中油': 'fuel', 'cpc': 'fuel',
  '台塑加油': 'fuel', '台塑石化': 'fuel', 'fpg': 'fuel',
  '全國加油': 'fuel',
  '加油站': 'fuel', '加油': 'fuel',

  // 旅遊 / 航空（國內預訂）
  '中華航空': 'travel', 'china airlines': 'travel', '華航': 'travel',
  '長榮航空': 'travel', 'eva air': 'travel', '長榮': 'travel',
  '虎航': 'travel', 'tigerair': 'travel',
  'booking': 'travel', 'booking.com': 'travel',
  'agoda': 'travel', 'hotels.com': 'travel',
  'airbnb': 'travel', 'klook': 'travel', 'kkday': 'travel',
  '飯店': 'travel', '訂房': 'travel', '民宿': 'travel',
  '旅行社': 'travel', '旅遊': 'travel',
  '高鐵': 'travel', '台鐵': 'travel',

  // 保險
  '保費': 'insurance', '保險費': 'insurance',
  '國泰保險': 'insurance', '富邦保險': 'insurance',
  '保險': 'insurance',

  // LINE Pay（直接輸入 LINE Pay 通路）
  'line pay': 'linepay', 'linepay': 'linepay', 'line支付': 'linepay',

  // 海外 — 日本
  '日本': 'overseas_japan', '東京': 'overseas_japan', '大阪': 'overseas_japan',
  '京都': 'overseas_japan', '札幌': 'overseas_japan', '福岡': 'overseas_japan',
  'suica': 'overseas_japan', 'pasmo': 'overseas_japan', 'icoca': 'overseas_japan',
  '西瓜卡': 'overseas_japan',

  // 海外 — 泰國
  '泰國': 'overseas_thailand', '曼谷': 'overseas_thailand', '清邁': 'overseas_thailand',
  '普吉': 'overseas_thailand',

  // 海外 — 韓國
  '韓國': 'overseas_korea', '首爾': 'overseas_korea', '釜山': 'overseas_korea',

  // 海外 — 其他
  '美國': 'overseas', '歐洲': 'overseas', '英國': 'overseas',
  '法國': 'overseas', '德國': 'overseas', '香港': 'overseas',
  '新加坡': 'overseas', '澳洲': 'overseas', '加拿大': 'overseas',
  '海外': 'overseas', '國外': 'overseas',
};

// 消費類別 → 各張卡應使用的 rateKey
const CATEGORY_RATE_KEY = {
  supermarket: {
    taishin_richart: 'supermarket',
    sinopac_daway: 'supermarket',
    ubot_linepay: 'supermarket',
    fubon_j: 'supermarket',
    hsbc_signature: 'supermarket',
    yuanta_diamond: 'supermarket',
  },
  convenience: {
    taishin_richart: 'convenience',
    sinopac_daway: 'convenience',
    ubot_linepay: 'convenience',
    fubon_j: 'convenience',
    hsbc_signature: 'convenience',
    yuanta_diamond: 'convenience',
  },
  dining: {
    taishin_richart: 'dining',
    sinopac_daway: 'dining',
    ubot_linepay: 'dining_even',
    fubon_j: 'dining',
    hsbc_signature: 'dining',
    yuanta_diamond: 'dining',
  },
  online: {
    taishin_richart: 'online',
    sinopac_daway: 'online',
    ubot_linepay: 'online',
    fubon_j: 'online',
    hsbc_signature: 'online',
    yuanta_diamond: 'online',
  },
  department: {
    taishin_richart: 'department',
    sinopac_daway: 'general',
    ubot_linepay: 'general',
    fubon_j: 'department',
    hsbc_signature: 'department',
    yuanta_diamond: 'department',
  },
  fuel: {
    taishin_richart: 'fuel',
    sinopac_daway: 'fuel',
    ubot_linepay: 'fuel',
    fubon_j: 'fuel',
    hsbc_signature: 'fuel',
    yuanta_diamond: 'fuel',
  },
  travel: {
    taishin_richart: 'travel',
    sinopac_daway: 'overseas',
    ubot_linepay: 'overseas',
    fubon_j: 'travel',
    hsbc_signature: 'travel',
    yuanta_diamond: 'travel',
  },
  insurance: {
    taishin_richart: 'insurance',
    sinopac_daway: 'insurance',
    ubot_linepay: 'insurance',
    fubon_j: 'insurance',
    hsbc_signature: 'insurance',
    yuanta_diamond: 'insurance',
  },
  linepay: {
    taishin_richart: 'linepay',
    sinopac_daway: 'linepay',
    ubot_linepay: 'linepay',
    fubon_j: 'general',
    hsbc_signature: 'general',
    yuanta_diamond: 'general',
  },
  overseas: {
    taishin_richart: 'overseas',
    sinopac_daway: 'overseas',
    ubot_linepay: 'overseas',
    fubon_j: 'overseas',
    hsbc_signature: 'overseas',
    yuanta_diamond: 'overseas',
  },
  overseas_japan: {
    taishin_richart: 'travel',
    sinopac_daway: 'overseas',
    ubot_linepay: 'overseas',
    fubon_j: 'japan_transit',
    hsbc_signature: 'overseas',
    yuanta_diamond: 'overseas',
  },
  overseas_thailand: {
    taishin_richart: 'travel',
    sinopac_daway: 'overseas',
    ubot_linepay: 'overseas',
    fubon_j: 'overseas_thailand',
    hsbc_signature: 'overseas',
    yuanta_diamond: 'overseas',
  },
  overseas_korea: {
    taishin_richart: 'travel',
    sinopac_daway: 'overseas',
    ubot_linepay: 'overseas',
    fubon_j: 'overseas_korea',
    hsbc_signature: 'overseas',
    yuanta_diamond: 'overseas',
  },
  general: {
    taishin_richart: 'general',
    sinopac_daway: 'general',
    ubot_linepay: 'general',
    fubon_j: 'general',
    hsbc_signature: 'general',
    yuanta_diamond: 'general',
  },
};

function normalize(str) {
  return str.toLowerCase().replace(/[\s\-_\.\,、。，]/g, '');
}

/**
 * 偵測商家名稱對應的消費類別
 * @returns {{ category: string, score: number, matchedKeyword: string|null }}
 */
function detectCategory(input) {
  const norm = normalize(input);
  let best = { category: 'general', score: 0, matchedKeyword: null };

  for (const [keyword, category] of Object.entries(MERCHANT_MAP)) {
    const normKey = normalize(keyword);
    let score = 0;

    if (norm === normKey) {
      score = 100;
    } else if (norm.includes(normKey)) {
      score = 80;
    } else if (normKey.includes(norm)) {
      score = 60;
    } else {
      // 計算共同字元比例（中文字元逐字比對）
      const inputChars = new Set([...norm]);
      const keyChars = [...normKey];
      const common = keyChars.filter(c => inputChars.has(c)).length;
      if (keyChars.length > 0) {
        score = Math.floor((common / keyChars.length) * 35);
      }
    }

    if (score > best.score) {
      best = { category, score, matchedKeyword: keyword };
    }
  }

  // 分數低於 30 視為無法匹配，退回一般消費
  if (best.score < 30) {
    return { category: 'general', score: 0, matchedKeyword: null };
  }
  return best;
}

/**
 * 依商家名稱查詢各卡回饋排名
 * @param {string} storeName
 * @param {Array} cards  card_data.json 的 cards 陣列
 * @returns {{ matchedCategory: string, matchScore: number, matchedKeyword: string|null, ranked: Array }}
 */
function queryStore(storeName, cards) {
  const { category, score, matchedKeyword } = detectCategory(storeName);
  const rateKeyMap = CATEGORY_RATE_KEY[category] || CATEGORY_RATE_KEY['general'];

  const ranked = cards.map(card => {
    const rateKey = rateKeyMap[card.id] || 'general';
    const rateObj = card.rates[rateKey] || card.rates['general'] || { rate: 0, unit: '%', cap: null, capUnit: null, note: '' };

    return {
      id: card.id,
      name: card.name,
      issuer: card.issuer,
      color: card.color,
      sourceUrl: card.sourceUrl,
      rateKey,
      rate: rateObj.rate || 0,
      unit: rateObj.unit || '%',
      cap: rateObj.cap ?? null,
      capUnit: rateObj.capUnit ?? null,
      note: rateObj.note || '',
      cardNotes: card.notes,
      annualFee: card.annualFee,
    };
  });

  // 依回饋率降序排列，相同時以卡片 id 字典序穩定排列
  ranked.sort((a, b) => {
    if (b.rate !== a.rate) return b.rate - a.rate;
    return a.id.localeCompare(b.id);
  });

  return {
    matchedCategory: category,
    matchScore: score,
    matchedKeyword,
    ranked,
  };
}

const CATEGORY_LABELS = {
  supermarket: '超市 / 量販',
  convenience: '便利商店',
  dining: '餐廳 / 外食',
  online: '網路購物',
  department: '百貨 / 購物',
  fuel: '加油站',
  travel: '旅遊 / 航空',
  insurance: '保費',
  linepay: 'LINE Pay',
  overseas: '海外消費',
  overseas_japan: '海外消費（日本）',
  overseas_thailand: '海外消費（泰國）',
  overseas_korea: '海外消費（韓國）',
  general: '一般消費',
};

module.exports = { queryStore, detectCategory, CATEGORY_LABELS };
