'use strict';

// ═══════════════════════════════════════════════════════════
// 商家關鍵字 → 消費類別
// ═══════════════════════════════════════════════════════════
const MERCHANT_MAP = {

  // ── 超市 / 量販 ─────────────────────────────────────────
  '全聯': 'supermarket', '全聯福利中心': 'supermarket',
  '家樂福': 'supermarket', 'carrefour': 'supermarket',
  '大潤發': 'supermarket', 'rt-mart': 'supermarket',
  '愛買': 'supermarket', 'costco': 'supermarket', '好市多': 'supermarket',
  '頂好': 'supermarket', '惠康': 'supermarket', 'wellcome': 'supermarket',
  '松青': 'supermarket', '美廉社': 'supermarket', '楓康': 'supermarket',
  '興農': 'supermarket', '棉花田': 'supermarket',
  '大賣場': 'supermarket', '量販': 'supermarket', '超市': 'supermarket',

  // ── 便利商店 ────────────────────────────────────────────
  '7-11': 'convenience', '711': 'convenience', '7eleven': 'convenience',
  'seven eleven': 'convenience', '統一超商': 'convenience',
  '全家': 'convenience', 'family mart': 'convenience', 'familymart': 'convenience',
  '萊爾富': 'convenience', 'hilife': 'convenience',
  'ok超商': 'convenience', 'ok mart': 'convenience', 'okmart': 'convenience',
  '超商': 'convenience',

  // ── 餐廳 / 外食 ─────────────────────────────────────────
  // 速食
  '麥當勞': 'dining', 'mcdonald': 'dining', "mcdonald's": 'dining',
  '肯德基': 'dining', 'kfc': 'dining',
  '摩斯漢堡': 'dining', '摩斯': 'dining', 'mos burger': 'dining',
  '漢堡王': 'dining', 'burger king': 'dining',
  '必勝客': 'dining', 'pizza hut': 'dining',
  '達美樂': 'dining', "domino's": 'dining', 'dominos': 'dining',
  '拿坡里': 'dining', 'napoley': 'dining',
  '吉野家': 'dining', 'yoshinoya': 'dining',
  '大戶屋': 'dining', 'ootoya': 'dining',
  '丸亀製麵': 'dining', 'marugame': 'dining',
  'coco壹番屋': 'dining', 'cocoichibanya': 'dining',
  '三商巧福': 'dining',
  // 咖啡 / 飲品
  '星巴克': 'dining', 'starbucks': 'dining',
  '路易莎': 'dining', 'louisa': 'dining', 'louisa coffee': 'dining',
  '丹堤': 'dining', '丹堤咖啡': 'dining',
  'cama': 'dining', 'cama café': 'dining', 'cama cafe': 'dining',
  '西雅圖咖啡': 'dining', 'seattle': 'dining',
  '真鍋咖啡': 'dining', '怡客咖啡': 'dining',
  'is咖啡': 'dining',
  // 王品集團
  '王品': 'dining', '西堤': 'dining', '陶板屋': 'dining', '原燒': 'dining',
  '聚': 'dining', '初瓦': 'dining', '石二鍋': 'dining',
  '品田牧場': 'dining', '夏慕尼': 'dining', '博多一幸舍': 'dining',
  '王品集團': 'dining',
  // 瓦城集團
  '瓦城': 'dining', '非常泰': 'dining', '1010湘': 'dining',
  '打拋豬': 'dining', '瓦城集團': 'dining',
  // 饗賓集團
  '饗食天堂': 'dining', '果然匯': 'dining', '饗賓': 'dining',
  // 漢來集團
  '漢來海港': 'dining', '漢來餐廳': 'dining', '漢來': 'dining',
  // 鼎泰豐 / 欣葉
  '鼎泰豐': 'dining', '欣葉': 'dining',
  // 日式
  '爭鮮': 'dining', '壽司郎': 'dining', 'sushiro': 'dining',
  '藏壽司': 'dining', '迴轉壽司': 'dining', '元氣壽司': 'dining',
  '一蘭': 'dining', '一風堂': 'dining', '山頭火': 'dining',
  '豚骨一筋': 'dining', '麵屋武藏': 'dining', '九州拉麵': 'dining',
  // 火鍋
  '海底撈': 'dining', '呷哺呷哺': 'dining',
  '胡同燒肉': 'dining', '炭佐麻里': 'dining', '赤鬼排骨': 'dining',
  '北海道昆布': 'dining', '小蒙牛': 'dining', '莫宰羊': 'dining',
  // 台式
  '鬍鬚張': 'dining', '池上飯包': 'dining', '自助餐': 'dining',
  '林東芳': 'dining', '永康牛肉麵': 'dining',
  // 手搖飲
  '85度c': 'dining', '85c': 'dining',
  '五十嵐': 'dining', '50嵐': 'dining',
  '可不可': 'dining', '迷客夏': 'dining', '茶湯會': 'dining',
  '貢茶': 'dining', 'gong cha': 'dining',
  '清心': 'dining', '清心福全': 'dining',
  '大苑子': 'dining', '天仁茗茶': 'dining', '春水堂': 'dining',
  'coco': 'dining', 'coco都可': 'dining',
  '翰林茶館': 'dining', '一芳': 'dining', '珍煮丹': 'dining',
  '鶴茶樓': 'dining', '黑糖鹿丸': 'dining',
  '手搖飲': 'dining', '珍珠奶茶': 'dining', '飲料店': 'dining',
  '奶茶': 'dining', '茶飲': 'dining', '手搖': 'dining',
  // 外送平台
  'foodpanda': 'dining', '熊貓外送': 'dining',
  'ubereats': 'dining', 'uber eats': 'dining',
  '戶戶送': 'dining', 'deliveroo': 'dining',
  // 通用
  '外送': 'dining', '外食': 'dining', '餐廳': 'dining', '餐飲': 'dining',
  '火鍋': 'dining', '麻辣鍋': 'dining', '涮涮鍋': 'dining', '薑母鴨': 'dining',
  '燒肉': 'dining', '燒烤': 'dining', '烤肉': 'dining', '烤鴨': 'dining',
  '壽司': 'dining', '拉麵': 'dining', '居酒屋': 'dining', '串燒': 'dining',
  '早餐': 'dining', '早餐店': 'dining', '蛋餅': 'dining',
  '咖啡': 'dining', '咖啡廳': 'dining', '咖啡店': 'dining',
  '便當': 'dining', '小吃': 'dining', '夜市': 'dining',
  '吃到飽': 'dining', '合菜': 'dining', '熱炒': 'dining',
  '日式': 'dining', '泰式': 'dining', '韓式': 'dining',
  '義式': 'dining', '法式': 'dining', '美式餐廳': 'dining',
  '烘焙': 'dining', '麵包': 'dining', '蛋糕': 'dining', '甜點': 'dining',
  '下午茶': 'dining', '冰淇淋': 'dining', '霜淇淋': 'dining',

  // ── 交通 / 叫車 / 停車 ──────────────────────────────────
  'uber': 'transport', 'uber叫車': 'transport', '優步': 'transport',
  '捷運': 'transport', 'mrt': 'transport',
  '台北捷運': 'transport', '高雄捷運': 'transport',
  '桃園捷運': 'transport', '台中捷運': 'transport',
  'youbike': 'transport', 'u-bike': 'transport', 'ubike': 'transport',
  '公共自行車': 'transport', '共享單車': 'transport',
  '台灣大車隊': 'transport', '55688': 'transport', '大車隊': 'transport',
  '格上': 'transport', 'carplus': 'transport', '格上租車': 'transport',
  '和運': 'transport', '和運租車': 'transport',
  'irent': 'transport', 'i-rent': 'transport',
  '統聯': 'transport', '葛瑪蘭': 'transport', '和欣': 'transport',
  '國光客運': 'transport', '國光': 'transport',
  '公車': 'transport', '客運': 'transport', '巴士': 'transport',
  '計程車': 'transport', 'taxi': 'transport', 'cab': 'transport',
  '停車': 'transport', '停車場': 'transport', 'easypark': 'transport',
  '旺旺停車': 'transport', '格上停車': 'transport',
  '交通': 'transport',

  // ── 藥妝 / 藥局 ─────────────────────────────────────────
  '屈臣氏': 'pharmacy', 'watsons': 'pharmacy', "watson's": 'pharmacy',
  '康是美': 'pharmacy', 'cosmed': 'pharmacy',
  '寶雅': 'pharmacy', 'poya': 'pharmacy',
  '丁丁': 'pharmacy', '丁丁藥局': 'pharmacy',
  '大樹藥局': 'pharmacy', '大樹': 'pharmacy',
  '健康人生': 'pharmacy',
  'boots': 'pharmacy',
  '藥局': 'pharmacy', '藥妝': 'pharmacy', '藥妝店': 'pharmacy',
  '藥品': 'pharmacy', '保健': 'pharmacy',

  // ── 服飾 / 時尚 / 精品 ──────────────────────────────────
  // 快時尚
  'uniqlo': 'fashion', '優衣庫': 'fashion',
  'gu': 'fashion', 'g.u.': 'fashion',
  'zara': 'fashion', 'zara home': 'fashion',
  'h&m': 'fashion', 'hm': 'fashion',
  'gap': 'fashion', 'gap kids': 'fashion',
  'forever21': 'fashion', 'forever 21': 'fashion',
  'muji': 'fashion', '無印良品': 'fashion',
  // 運動品牌
  'nike': 'fashion', '耐吉': 'fashion',
  'adidas': 'fashion', '愛迪達': 'fashion',
  'puma': 'fashion',
  'under armour': 'fashion',
  'new balance': 'fashion',
  'converse': 'fashion',
  'vans': 'fashion',
  'fila': 'fashion',
  'champion': 'fashion',
  'asics': 'fashion', '亞瑟士': 'fashion',
  'skechers': 'fashion', '斯凱奇': 'fashion',
  'reebok': 'fashion',
  'jordan': 'fashion',
  // 精品
  'lv': 'fashion', 'louis vuitton': 'fashion',
  'gucci': 'fashion', 'chanel': 'fashion',
  'hermes': 'fashion', '愛馬仕': 'fashion',
  'coach': 'fashion', 'michael kors': 'fashion',
  'kate spade': 'fashion', 'burberry': 'fashion',
  'prada': 'fashion', 'dior': 'fashion',
  // 台灣本地服飾
  '棉麻屋': 'fashion', '地球樹': 'fashion',
  '東區服飾': 'fashion', '五分埔': 'fashion',
  // 通用
  '服飾': 'fashion', '衣服': 'fashion', '服裝': 'fashion',
  '球鞋': 'fashion', '運動鞋': 'fashion', '球鞋店': 'fashion',
  '精品': 'fashion', '名牌': 'fashion', '品牌': 'fashion',
  '鞋店': 'fashion', '眼鏡': 'fashion', '眼鏡行': 'fashion',

  // ── 娛樂 / 電影 / KTV ────────────────────────────────────
  '威秀': 'entertainment', 'vieshow': 'entertainment', '威秀影城': 'entertainment',
  '國賓': 'entertainment', '國賓影城': 'entertainment',
  '秀泰': 'entertainment', '秀泰影城': 'entertainment',
  '喜滿客': 'entertainment', 'cinemark': 'entertainment',
  '好樂迪': 'entertainment',
  '錢櫃': 'entertainment', 'partyworld': 'entertainment',
  '六福村': 'entertainment', 'leofoo': 'entertainment',
  '劍湖山': 'entertainment',
  '麗寶': 'entertainment', '麗寶樂園': 'entertainment',
  '台灣大樂透': 'entertainment',
  'ktv': 'entertainment',
  '電影': 'entertainment', '電影院': 'entertainment', '影城': 'entertainment',
  '遊樂園': 'entertainment', '主題樂園': 'entertainment',
  '娛樂': 'entertainment', '遊戲': 'entertainment',

  // ── 網路購物 / 串流訂閱 ──────────────────────────────────
  // 台灣電商平台
  '蝦皮': 'online', 'shopee': 'online', '蝦皮購物': 'online',
  'pchome': 'online', 'pc home': 'online', '24h購物': 'online',
  'momo': 'online', 'momo購物': 'online', 'momoshop': 'online',
  '博客來': 'online', 'books.com': 'online',
  '露天': 'online', '露天拍賣': 'online',
  'yahoo': 'online', 'yahoo購物': 'online', 'yahoo奇摩': 'online',
  '東森購物': 'online', 'etmall': 'online',
  '生活市集': 'online', '松果購物': 'online',
  'udn買東西': 'online', '讀冊': 'online',
  '蝦皮mall': 'online', 'shopee mall': 'online',
  // 海外電商
  'amazon': 'online', 'rakuten': 'online', '樂天市場': 'online',
  'aliexpress': 'online', '淘寶': 'online', 'taobao': 'online',
  '天貓': 'online', 'tmall': 'online', '京東': 'online', 'jd.com': 'online',
  'ebay': 'online',
  // 串流影音
  'netflix': 'online', 'spotify': 'online', 'youtube premium': 'online',
  'disney plus': 'online', 'disneyplus': 'online', 'disney+': 'online',
  'hbo': 'online', 'hbomax': 'online', 'hbo max': 'online',
  'apple tv': 'online', 'apple tv+': 'online',
  'amazon prime': 'online', 'prime video': 'online',
  'friyday': 'online', 'friday影音': 'online',
  'linetv': 'online', 'line tv': 'online',
  'catchplay': 'online', 'catchplay+': 'online',
  'kktv': 'online', 'vidol': 'online', 'myVideo': 'online',
  'twitch': 'online',
  // 遊戲 / 數位
  'steam': 'online', 'google play': 'online', 'app store': 'online',
  'playstation store': 'online', 'ps store': 'online',
  'nintendo eshop': 'online', 'xbox': 'online',
  // 通用
  '串流': 'online', '訂閱': 'online', '網購': 'online', '電商': 'online',

  // ── 百貨 / 購物中心 / 3C / 家具 / 書店 / 生活 ───────────
  // 百貨公司 / 購物中心
  '新光三越': 'department', '新光': 'department',
  '遠百': 'department', '遠東百貨': 'department',
  '太平洋sogo': 'department', 'sogo': 'department',
  '微風': 'department', '微風廣場': 'department',
  '統一時代': 'department', '漢神': 'department', '漢神巨蛋': 'department',
  '大遠百': 'department', '台茂': 'department', '林口三井': 'department',
  '三井outlet': 'department', '三井': 'department',
  '華泰名品城': 'department',
  '京站': 'department', '環球購物': 'department', '大魯閣': 'department',
  '統一夢時代': 'department', '夢時代': 'department',
  '義大': 'department', '義大世界': 'department',
  'att 4 fun': 'department', 'att4fun': 'department',
  '新板特區': 'department', '板橋大遠百': 'department',
  '台南新天地': 'department',
  // 3C / 電器
  '三創': 'department', 'syntrend': 'department',
  '燦坤': 'department', '全國電子': 'department',
  'apple store': 'department', '蘋果直營店': 'department',
  '倚天': 'department',
  // 書店
  '誠品': 'department', '金石堂': 'department', '三民書局': 'department',
  '墊腳石': 'department',
  // 家具 / 生活
  '特力屋': 'department', 'b&q': 'department',
  '宜得利': 'department', 'nitori': 'department',
  'ikea': 'department', '宜家': 'department', '宜家家居': 'department',
  '台隆': 'department', 'tokyu hands': 'department', '東急': 'department',
  'hola': 'department', '生活工場': 'department',
  '無印良品家居': 'department',
  // 美妝 / 個人護理（大型通路）
  '莎莎': 'department', 'sasa': 'department',
  'lush': 'department',
  '歐舒丹': 'department', "l'occitane": 'department',
  '佐登妮絲': 'department',
  // 嬰幼兒
  '麗嬰房': 'department', '奇哥': 'department',
  // 寵物
  '特寵': 'department', '寵物': 'department', '寵物店': 'department',
  '毛孩': 'department',
  // 通用
  '百貨': 'department', '購物中心': 'department', 'outlet': 'department',

  // ── 加油站 ──────────────────────────────────────────────
  '中油': 'fuel', '台灣中油': 'fuel', 'cpc': 'fuel',
  '台塑加油': 'fuel', '台塑石化': 'fuel', 'fpg': 'fuel',
  '全國加油': 'fuel',
  '加油站': 'fuel', '加油': 'fuel',

  // ── 旅遊 / 航空 ─────────────────────────────────────────
  '中華航空': 'travel', 'china airlines': 'travel', '華航': 'travel',
  '長榮航空': 'travel', 'eva air': 'travel', '長榮': 'travel',
  '星宇航空': 'travel', 'starlux': 'travel',
  '台灣虎航': 'travel', '虎航': 'travel', 'tigerair': 'travel',
  '立榮': 'travel', 'uni air': 'travel',
  'scoot': 'travel', 'airasia': 'travel', '亞洲航空': 'travel',
  'jetstar': 'travel', '捷星': 'travel',
  'booking': 'travel', 'booking.com': 'travel',
  'agoda': 'travel', 'hotels.com': 'travel',
  'airbnb': 'travel', 'klook': 'travel', 'kkday': 'travel',
  'expedia': 'travel', 'trip.com': 'travel', '攜程': 'travel',
  '雄獅': 'travel', '雄獅旅遊': 'travel',
  '東南旅遊': 'travel', '可樂旅遊': 'travel',
  '易遊網': 'travel', 'eztravel': 'travel',
  '易飛網': 'travel', 'ezfly': 'travel',
  '飯店': 'travel', '訂房': 'travel', '民宿': 'travel',
  '旅行社': 'travel', '旅遊': 'travel',
  '高鐵': 'travel', '台鐵': 'travel',

  // ── 保險 ────────────────────────────────────────────────
  '保費': 'insurance', '保險費': 'insurance',
  '國泰保險': 'insurance', '富邦保險': 'insurance',
  '保險': 'insurance',

  // ── LINE Pay ────────────────────────────────────────────
  'line pay': 'linepay', 'linepay': 'linepay', 'line支付': 'linepay',

  // ── 海外 — 日本 ─────────────────────────────────────────
  '日本': 'overseas_japan', '東京': 'overseas_japan', '大阪': 'overseas_japan',
  '京都': 'overseas_japan', '札幌': 'overseas_japan', '福岡': 'overseas_japan',
  '沖繩': 'overseas_japan', '名古屋': 'overseas_japan', '仙台': 'overseas_japan',
  'suica': 'overseas_japan', 'pasmo': 'overseas_japan', 'icoca': 'overseas_japan',
  '西瓜卡': 'overseas_japan',

  // ── 海外 — 泰國 ─────────────────────────────────────────
  '泰國': 'overseas_thailand', '曼谷': 'overseas_thailand',
  '清邁': 'overseas_thailand', '普吉': 'overseas_thailand', '芭達雅': 'overseas_thailand',

  // ── 海外 — 韓國 ─────────────────────────────────────────
  '韓國': 'overseas_korea', '首爾': 'overseas_korea',
  '釜山': 'overseas_korea', '濟州': 'overseas_korea',

  // ── 海外 — 其他 ─────────────────────────────────────────
  '美國': 'overseas', '歐洲': 'overseas', '英國': 'overseas',
  '法國': 'overseas', '德國': 'overseas', '香港': 'overseas',
  '新加坡': 'overseas', '澳洲': 'overseas', '加拿大': 'overseas',
  '澳門': 'overseas', '越南': 'overseas', '馬來西亞': 'overseas',
  '印尼': 'overseas', '菲律賓': 'overseas',
  '海外': 'overseas', '國外': 'overseas',
};

// ═══════════════════════════════════════════════════════════
// 消費類別 → 各張卡使用的 rateKey
// ═══════════════════════════════════════════════════════════
const CATEGORY_RATE_KEY = {
  supermarket: {
    taishin_richart: 'supermarket',
    sinopac_daway:   'supermarket',
    ubot_linepay:    'supermarket',
    fubon_j:         'supermarket',
    hsbc_signature:  'supermarket',
    yuanta_diamond:  'supermarket',
  },
  convenience: {
    taishin_richart: 'convenience',
    sinopac_daway:   'convenience',
    ubot_linepay:    'convenience',
    fubon_j:         'convenience',
    hsbc_signature:  'convenience',
    yuanta_diamond:  'convenience',
  },
  dining: {
    taishin_richart: 'dining',
    sinopac_daway:   'dining',
    ubot_linepay:    'dining_even',
    fubon_j:         'dining',
    hsbc_signature:  'dining',
    yuanta_diamond:  'dining',
  },
  online: {
    taishin_richart: 'online',
    sinopac_daway:   'online',
    ubot_linepay:    'online',
    fubon_j:         'online',
    hsbc_signature:  'online',
    yuanta_diamond:  'online',
  },
  department: {
    taishin_richart: 'department',
    sinopac_daway:   'general',
    ubot_linepay:    'general',
    fubon_j:         'department',
    hsbc_signature:  'department',
    yuanta_diamond:  'department',
  },
  fuel: {
    taishin_richart: 'fuel',
    sinopac_daway:   'fuel',
    ubot_linepay:    'fuel',
    fubon_j:         'fuel',
    hsbc_signature:  'fuel',
    yuanta_diamond:  'fuel',
  },
  travel: {
    taishin_richart: 'travel',
    sinopac_daway:   'overseas',
    ubot_linepay:    'overseas',
    fubon_j:         'travel',
    hsbc_signature:  'travel',
    yuanta_diamond:  'travel',
  },
  insurance: {
    taishin_richart: 'insurance',
    sinopac_daway:   'insurance',
    ubot_linepay:    'insurance',
    fubon_j:         'insurance',
    hsbc_signature:  'insurance',
    yuanta_diamond:  'insurance',
  },
  linepay: {
    taishin_richart: 'linepay',
    sinopac_daway:   'linepay',
    ubot_linepay:    'linepay',
    fubon_j:         'general',
    hsbc_signature:  'general',
    yuanta_diamond:  'general',
  },
  // ── 新類別 ──────────────────────────────────────────────
  transport: {
    // Richart 天天刷方案涵蓋「超商、交通、藥妝」
    taishin_richart: 'convenience',
    sinopac_daway:   'general',
    ubot_linepay:    'general',
    fubon_j:         'general',
    hsbc_signature:  'general',
    yuanta_diamond:  'general',
  },
  pharmacy: {
    // Richart 天天刷方案涵蓋「超商、交通、藥妝」
    taishin_richart: 'convenience',
    sinopac_daway:   'general',
    ubot_linepay:    'general',
    fubon_j:         'general',
    hsbc_signature:  'general',
    yuanta_diamond:  'general',
  },
  entertainment: {
    // Richart 好饗刷方案涵蓋「餐廳、外送、娛樂」
    taishin_richart: 'dining',
    sinopac_daway:   'general',
    ubot_linepay:    'general',
    fubon_j:         'general',
    hsbc_signature:  'general',
    yuanta_diamond:  'general',
  },
  fashion: {
    // 服飾/精品在有百貨方案的卡套用 department 率
    taishin_richart: 'department',
    sinopac_daway:   'general',
    ubot_linepay:    'general',
    fubon_j:         'department',
    hsbc_signature:  'department',
    yuanta_diamond:  'department',
  },
  overseas: {
    taishin_richart: 'overseas',
    sinopac_daway:   'overseas',
    ubot_linepay:    'overseas',
    fubon_j:         'overseas',
    hsbc_signature:  'overseas',
    yuanta_diamond:  'overseas',
  },
  overseas_japan: {
    taishin_richart: 'travel',
    sinopac_daway:   'overseas',
    ubot_linepay:    'overseas',
    fubon_j:         'japan_transit',
    hsbc_signature:  'overseas',
    yuanta_diamond:  'overseas',
  },
  overseas_thailand: {
    taishin_richart: 'travel',
    sinopac_daway:   'overseas',
    ubot_linepay:    'overseas',
    fubon_j:         'overseas_thailand',
    hsbc_signature:  'overseas',
    yuanta_diamond:  'overseas',
  },
  overseas_korea: {
    taishin_richart: 'travel',
    sinopac_daway:   'overseas',
    ubot_linepay:    'overseas',
    fubon_j:         'overseas_korea',
    hsbc_signature:  'overseas',
    yuanta_diamond:  'overseas',
  },
  general: {
    taishin_richart: 'general',
    sinopac_daway:   'general',
    ubot_linepay:    'general',
    fubon_j:         'general',
    hsbc_signature:  'general',
    yuanta_diamond:  'general',
  },
};

// ═══════════════════════════════════════════════════════════
// 類別顯示名稱
// ═══════════════════════════════════════════════════════════
const CATEGORY_LABELS = {
  supermarket:       '超市 / 量販',
  convenience:       '便利商店',
  dining:            '餐廳 / 外食',
  online:            '網路購物',
  department:        '百貨 / 購物',
  fuel:              '加油站',
  travel:            '旅遊 / 航空',
  insurance:         '保費',
  linepay:           'LINE Pay',
  transport:         '交通 / 叫車',
  pharmacy:          '藥妝 / 藥局',
  entertainment:     '娛樂 / 電影',
  fashion:           '服飾 / 精品',
  overseas:          '海外消費',
  overseas_japan:    '海外消費（日本）',
  overseas_thailand: '海外消費（泰國）',
  overseas_korea:    '海外消費（韓國）',
  general:           '一般消費',
};

// ═══════════════════════════════════════════════════════════
// 匹配邏輯
// ═══════════════════════════════════════════════════════════
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

  if (best.score < 30) {
    return { category: 'general', score: 0, matchedKeyword: null };
  }
  return best;
}

/**
 * 依商家名稱查詢各卡回饋排名
 * @param {string} storeName
 * @param {Array} cards  card_data.json 的 cards 陣列
 * @returns {{ matchedCategory, matchScore, matchedKeyword, ranked }}
 */
function queryStore(storeName, cards) {
  const { category, score, matchedKeyword } = detectCategory(storeName);
  const rateKeyMap = CATEGORY_RATE_KEY[category] || CATEGORY_RATE_KEY['general'];

  const ranked = cards.map(card => {
    const rateKey = rateKeyMap[card.id] || 'general';
    const rateObj = card.rates[rateKey] || card.rates['general'] || {
      rate: 0, unit: '%', cap: null, capUnit: null, note: '',
    };

    return {
      id:        card.id,
      name:      card.name,
      issuer:    card.issuer,
      color:     card.color,
      sourceUrl: card.sourceUrl,
      rateKey,
      rate:      rateObj.rate  || 0,
      unit:      rateObj.unit  || '%',
      cap:       rateObj.cap   ?? null,
      capUnit:   rateObj.capUnit ?? null,
      note:      rateObj.note  || '',
      cardNotes: card.notes,
      annualFee: card.annualFee,
    };
  });

  ranked.sort((a, b) => {
    if (b.rate !== a.rate) return b.rate - a.rate;
    return a.id.localeCompare(b.id);
  });

  return { matchedCategory: category, matchScore: score, matchedKeyword, ranked };
}

module.exports = { queryStore, detectCategory, CATEGORY_LABELS, MERCHANT_MAP, CATEGORY_RATE_KEY };
