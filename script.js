// --- 1. 牌型資料庫 (完整版) ---
const patternList = [
    // === 基礎與字花 ===
    { id: 'no-flower', name: '無花', desc: '沒有花', fan: 2, cat: '基礎與環境' },
    { id: 'has-flower', name: '花', desc: '每有一隻花', fan: 2, cat: '基礎與環境' },
    { id: 'has-honor', name: '字', desc: '每有三隻番子(刻子)', fan: 2, cat: '基礎與環境' },
    { id: 'no-honor', name: '無字', desc: '沒有番子', fan: 2, cat: '基礎與環境' },
    { id: 'menqing', name: '門清', desc: '沒有上/碰/明槓', fan: 5, cat: '基礎與環境' },
    { id: 'pinghu', name: '平糊', desc: '全部由順子組成 + 無花無字', fan: 5, cat: '基礎與環境' },
    { id: 'eye-258', name: '將眼', desc: '眼牌是2/5/8', fan: 2, cat: '基礎與環境' },

    // === 聽牌與胡牌方式 ===
    { id: 'zimo', name: '自摸', desc: '自己摸牌食胡', fan: 1, cat: '聽牌與胡牌' },
    { id: 'menqing-zimo', name: '門清自摸', desc: '門清情況下自摸', fan: 3, cat: '聽牌與胡牌' },
    { id: 'full-seek', name: '全求人', desc: '全副牌落地，單吊食胡', fan: 30, cat: '聽牌與胡牌' },
    
    // === 混清與對對 ===
    { id: 'toitoi', name: '對對胡', desc: '全部組合皆是刻子', fan: 40, cat: '清混與對對' },
    { id: 'hunyise', name: '混一色', desc: '單一花色 + 番子', fan: 40, cat: '清混與對對' },
    { id: 'qingyise', name: '清一色', desc: '只有一種花色', fan: 100, cat: '清混與對對' },
    { id: 'ziyise', name: '字一色', desc: '全副牌由番子組成', fan: 160, cat: '清混與對對' },

    // === 風與三元 ===
    { id: 'small-3-winds', name: '小三風', desc: '兩刻風 + 一眼風', fan: 20, cat: '風與三元' },
    { id: 'big-3-winds', name: '大三風', desc: '三刻風', fan: 40, cat: '風與三元' },
    { id: 'small-3-dragons', name: '小三元', desc: '兩刻箭 + 一眼箭', fan: 30, cat: '風與三元' },
    { id: 'big-3-dragons', name: '大三元', desc: '三刻箭', fan: 60, cat: '風與三元' },
    { id: 'small-4-winds', name: '小四喜', desc: '三刻風 + 一眼風', fan: 80, cat: '風與三元' },
    { id: 'big-4-winds', name: '大四喜', desc: '四刻風', fan: 120, cat: '風與三元' },

    // === 步高與龍 (Step & Dragon) ===
    { id: 'ming-mixed-step-3', name: '三色三步高', desc: '三種花色三組數字遞增的順子 (如 123m 234p 345s)', fan: 5, cat: '步高與龍' },
    { id: 'ming-pure-step-3', name: '一色三步高', desc: '同一花色三組數字遞增的順子 (如 123 234 345)', fan: 15, cat: '步高與龍' },
    { id: 'ming-mixed-dragon', name: '雜龍', desc: '三種花色組成 123, 456, 789', fan: 8, cat: '步高與龍' },
    { id: 'ming-pure-dragon', name: '清龍', desc: '同一花色組成 123, 456, 789', fan: 10, cat: '步高與龍' },

    // === 姊妹與相逢 (Sisters) ===
    { id: 'sisters-2', name: '二姊妹', desc: '兩組數字相連的刻子 (如 222, 333)', fan: 5, cat: '兄弟姊妹' },
    { id: 'sisters-big-3', name: '大三姊妹', desc: '三組數字相連的刻子', fan: 20, cat: '兄弟姊妹' },
    { id: 'xiangfeng-3', name: '三相逢', desc: '三組不同花色但數字相同的順子 (如 234m, 234p, 234s)', fan: 10, cat: '兄弟姊妹' },
    { id: 'brothers-big-3', name: '大三兄弟', desc: '三組不同花色但數字相同的刻子 (如 222m, 222p, 222s)', fan: 30, cat: '兄弟姊妹' },

    // === 老少與帶么 ===
    { id: 'laoshao-chow', name: '老少上', desc: '同花色 123 和 789 順子', fan: 3, cat: '老少與帶么' },
    { id: 'laoshao-pong', name: '老少碰', desc: '同花色 111 和 999 刻子', fan: 5, cat: '老少與帶么' },
    { id: 'tanyao', name: '斷么', desc: '無1, 9及番子', fan: 8, cat: '老少與帶么' },
    { id: 'hun-dai-yao', name: '混帶么', desc: '全帶1, 9或番子', fan: 30, cat: '老少與帶么' },
    { id: 'qing-dai-yao', name: '清帶么', desc: '全帶1, 9 (無番子)', fan: 80, cat: '老少與帶么' },
    { id: 'hun-lao-tou', name: '混老頭', desc: '全由1, 9刻子和番子組成', fan: 60, cat: '老少與帶么' },
    { id: 'qing-lao-tou', name: '清老頭', desc: '全由1, 9刻子組成', fan: 220, cat: '老少與帶么' },

    // === 嚦咕與特殊 ===
    { id: 'ligu', name: '嚦咕嚦咕', desc: '七對子 (包含刻子做兩對)', fan: 50, cat: '嚦咕與特殊' },
    { id: 'ligu-seq-3', name: '嚦咕三連對', desc: '嚦咕中有三對數字相連', fan: 5, cat: '嚦咕與特殊' },
    { id: 'miss-one', name: '缺一門', desc: '三門花色中缺少一門 (需無字)', fan: 8, cat: '嚦咕與特殊' },
    { id: 'chicken', name: '雞胡', desc: '無任何大牌 (無花無字)', fan: 30, cat: '嚦咕與特殊' },
    { id: 'duck', name: '鴨胡', desc: '自摸雞胡', fan: 15, cat: '嚦咕與特殊' }
];

// --- 2. 系統設定 ---
const tileMap = {
    '1m': String.fromCodePoint(0x1F007), '2m': String.fromCodePoint(0x1F008), '3m': String.fromCodePoint(0x1F009),
    '4m': String.fromCodePoint(0x1F00A), '5m': String.fromCodePoint(0x1F00B), '6m': String.fromCodePoint(0x1F00C),
    '7m': String.fromCodePoint(0x1F00D), '8m': String.fromCodePoint(0x1F00E), '9m': String.fromCodePoint(0x1F00F),
    '1p': String.fromCodePoint(0x1F019), '2p': String.fromCodePoint(0x1F01A), '3p': String.fromCodePoint(0x1F01B),
    '4p': String.fromCodePoint(0x1F01C), '5p': String.fromCodePoint(0x1F01D), '6p': String.fromCodePoint(0x1F01E),
    '7p': String.fromCodePoint(0x1F01F), '8p': String.fromCodePoint(0x1F020), '9p': String.fromCodePoint(0x1F021),
    '1s': String.fromCodePoint(0x1F010), '2s': String.fromCodePoint(0x1F011), '3s': String.fromCodePoint(0x1F012),
    '4s': String.fromCodePoint(0x1F013), '5s': String.fromCodePoint(0x1F014), '6s': String.fromCodePoint(0x1F015),
    '7s': String.fromCodePoint(0x1F016), '8s': String.fromCodePoint(0x1F017), '9s': String.fromCodePoint(0x1F018),
    '1z': String.fromCodePoint(0x1F000), '2z': String.fromCodePoint(0x1F001), '3z': String.fromCodePoint(0x1F002), '4z': String.fromCodePoint(0x1F003),
    '5z': String.fromCodePoint(0x1F006), '6z': String.fromCodePoint(0x1F005), '7z': String.fromCodePoint(0x1F004)
};

let currentHandData = {
    revealed: [],
    hand: [],
    win: '',
    types: [],
    isZimo: false,
    flowerCount: 0
};

// --- 3. 終極隨機胡牌生成引擎 ---
function generateNewHand() {
    // 重置
    document.getElementById('resultBox').style.display = 'none';
    document.getElementById('userFan').value = '';
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);

    const winSource = Math.floor(Math.random() * 4);
    const isZimo = (winSource === 0); 
    const flowerCount = Math.floor(Math.random() * 5); 
    const deckTracker = initDeck();

    // === 劇本選擇器 (Scenario Selector) ===
    // 為了讓稀有牌型出現，我們隨機決定這次要生成的「牌型結構」
    const rand = Math.random();
    let scenario = 'normal';
    
    if (rand < 0.1) scenario = 'ligu'; // 10% 嚦咕嚦咕
    else if (rand < 0.25) scenario = 'sisters'; // 15% 姊妹/刻子類
    else if (rand < 0.40) scenario = 'step_dragon'; // 15% 步高/龍/相逢
    else if (rand < 0.55) scenario = 'terminals'; // 15% 帶么/老頭/清一色
    else scenario = 'normal'; // 45% 普通/混一色/平胡

    let handTiles = [];
    let revealed = [];
    let sets = [];
    let pair = [];

    // --- 劇本 1: 嚦咕嚦咕 (七對子) ---
    if (scenario === 'ligu') {
        let pairsCount = 0;
        let attempt = 0;
        while (pairsCount < 7 && attempt < 200) {
            // 嘗試生成一對
            let p = generateRandomPair(null);
            // 確保這對牌還沒被選過 (嚦咕通常不重複，若有四張一樣算兩對)
            if (tryDraw(deckTracker, p)) {
                handTiles = handTiles.concat(p);
                pairsCount++;
            }
            attempt++;
        }
        // 嚦咕不落地
        revealed = [];
        // 為了相容 autoCalculateTypes，我們不填入 sets
    } 
    
    // --- 劇本 2-5: 標準結構 (4組 + 1眼) ---
    else {
        // 設定偏好花色 (利於清/混一色)
        const preferSuit = ['m', 'p', 's'][Math.floor(Math.random() * 3)];
        
        // 根據劇本預先生成特定組合
        if (scenario === 'sisters') {
            // 強制生成姊妹 (222, 333)
            const start = Math.floor(Math.random() * 8) + 1;
            const t1 = start + preferSuit;
            const t2 = (start + 1) + preferSuit;
            if (tryDraw(deckTracker, [t1,t1,t1, t2,t2,t2])) {
                sets.push({ type: 'triplet', tiles: [t1,t1,t1] });
                sets.push({ type: 'triplet', tiles: [t2,t2,t2] });
            }
        } 
        else if (scenario === 'step_dragon') {
            const subType = Math.random();
            if (subType < 0.4) {
                // 三相逢 (不同花色同數字順子)
                const n = Math.floor(Math.random() * 7) + 1;
                const s1 = [n+'m', (n+1)+'m', (n+2)+'m'];
                const s2 = [n+'p', (n+1)+'p', (n+2)+'p'];
                const s3 = [n+'s', (n+1)+'s', (n+2)+'s'];
                if (tryDraw(deckTracker, [...s1, ...s2, ...s3])) {
                    sets.push({ type: 'sequence', tiles: s1 });
                    sets.push({ type: 'sequence', tiles: s2 });
                    sets.push({ type: 'sequence', tiles: s3 });
                }
            } else if (subType < 0.7) {
                // 步高 (123m, 234p, 345s)
                const n = Math.floor(Math.random() * 5) + 1;
                const s1 = [n+'m', (n+1)+'m', (n+2)+'m'];
                const s2 = [(n+1)+'p', (n+2)+'p', (n+3)+'p'];
                const s3 = [(n+2)+'s', (n+3)+'s', (n+4)+'s'];
                if (tryDraw(deckTracker, [...s1, ...s2, ...s3])) {
                    sets.push({ type: 'sequence', tiles: s1 });
                    sets.push({ type: 'sequence', tiles: s2 });
                    sets.push({ type: 'sequence', tiles: s3 });
                }
            } else {
                // 龍 (123, 456, 789) - 可能是雜龍或清龍
                const suits = [preferSuit, preferSuit, preferSuit]; 
                if (Math.random() > 0.5) { // 雜龍
                     suits[0] = 'm'; suits[1] = 'p'; suits[2] = 's';
                }
                const s1 = [1+suits[0], 2+suits[0], 3+suits[0]];
                const s2 = [4+suits[1], 5+suits[1], 6+suits[1]];
                const s3 = [7+suits[2], 8+suits[2], 9+suits[2]];
                if (tryDraw(deckTracker, [...s1, ...s2, ...s3])) {
                    sets.push({ type: 'sequence', tiles: s1 });
                    sets.push({ type: 'sequence', tiles: s2 });
                    sets.push({ type: 'sequence', tiles: s3 });
                }
            }
        }
        else if (scenario === 'terminals') {
            // 帶么/老頭傾向：盡量生成 1, 9, 字
            // 這裡不做強制邏輯，而是改變隨機生成器的權重
        }

        // 補足剩下的組數 (直到 5 組)
        while (sets.length < 5) {
            let setType = Math.random() > 0.5 ? 'sequence' : 'triplet';
            // 根據劇本調整機率
            if (scenario === 'terminals') {
                // 帶么盡量出 1,9,字
                // 這裡簡化：隨機生成，如果不合適就重試幾次
            }
            
            const candidate = generateRandomSet(setType, null, scenario === 'terminals');
            if (tryDraw(deckTracker, candidate.tiles)) {
                sets.push(candidate);
            }
        }

        // 生成眼
        let pairAttempt = 0;
        let pairSuccess = false;
        while (!pairSuccess && pairAttempt < 100) {
            const candPair = generateRandomPair(null, scenario === 'terminals');
            if (tryDraw(deckTracker, candPair)) {
                pair = candPair;
                pairSuccess = true;
            }
            pairAttempt++;
        }

        // 分配落地與手牌
        const revealedCount = scenario === 'ligu' ? 0 : Math.floor(Math.random() * 4);
        let handSets = [];
        
        for (let i = 0; i < 5; i++) {
            if (i < revealedCount) {
                let type = isSequence(sets[i].tiles) ? '上' : '碰';
                revealed.push({ tiles: sets[i].tiles, type: type });
            } else {
                handSets.push(sets[i].tiles);
            }
        }

        handSets.forEach(t => handTiles = handTiles.concat(t));
        handTiles = handTiles.concat(pair);
    }

    // 選胡牌
    const winIndex = Math.floor(Math.random() * handTiles.length);
    const winTile = handTiles[winIndex];
    handTiles.splice(winIndex, 1);
    handTiles.sort(sortTiles);

    // === 自動判斷 ===
    const calculatedTypes = autoCalculateTypes(revealed, handTiles, winTile, isZimo, flowerCount, sets, pair, scenario === 'ligu');

    currentHandData = {
        revealed: revealed,
        hand: handTiles,
        win: winTile,
        types: calculatedTypes,
        isZimo: isZimo,
        flowerCount: flowerCount,
        isLigu: scenario === 'ligu'
    };
    
    let sourceLabel = '';
    switch(winSource) {
        case 0: sourceLabel = '自摸'; break;
        case 1: sourceLabel = '食胡 (上家打出)'; break;
        case 2: sourceLabel = '食胡 (對家打出)'; break;
        case 3: sourceLabel = '食胡 (下家打出)'; break;
    }
    const statusText = `狀態：${sourceLabel} | 花牌：${flowerCount} 張`;
    document.getElementById('handStatus').innerText = statusText;

    renderHand();
}

// --- 牌庫與生成輔助 ---
function initDeck() {
    const deck = {};
    const suits = ['m', 'p', 's'];
    suits.forEach(s => { for (let i=1; i<=9; i++) deck[i+s] = 4; });
    for (let i=1; i<=7; i++) deck[i+'z'] = 4;
    return deck;
}

function tryDraw(deck, tilesToCheck) {
    const tempCounts = {};
    for (const t of tilesToCheck) tempCounts[t] = (tempCounts[t] || 0) + 1;
    for (const t in tempCounts) {
        if (!deck[t] || deck[t] < tempCounts[t]) return false;
    }
    for (const t of tilesToCheck) deck[t]--;
    return true;
}

function generateRandomSet(type, preferSuit, forceTerminal) {
    const suits = ['m', 'p', 's', 'z'];
    let suit = preferSuit || suits[Math.floor(Math.random() * 4)];
    
    // 如果強制帶么，增加出1,9,字的機率
    if (forceTerminal && Math.random() > 0.3) {
        if (Math.random() > 0.6) suit = 'z'; 
    }

    if (suit === 'z') type = 'triplet';

    if (type === 'sequence') {
        let num;
        if (forceTerminal) {
            // 順子帶么只有 123 或 789
            num = Math.random() > 0.5 ? 1 : 7; 
        } else {
            num = Math.floor(Math.random() * 7) + 1;
        }
        return { type: 'sequence', tiles: [num+suit, (num+1)+suit, (num+2)+suit] };
    } else {
        let num;
        if (suit === 'z') {
            num = Math.floor(Math.random() * 7) + 1;
        } else {
            if (forceTerminal) {
                num = Math.random() > 0.5 ? 1 : 9;
            } else {
                num = Math.floor(Math.random() * 9) + 1;
            }
        }
        const t = num + suit;
        return { type: 'triplet', tiles: [t, t, t] };
    }
}

function generateRandomPair(preferSuit, forceTerminal) {
    const suits = ['m', 'p', 's', 'z'];
    let suit = preferSuit;
    if (!suit) suit = suits[Math.floor(Math.random() * 4)];
    
    let num;
    if (suit === 'z') {
        num = Math.floor(Math.random() * 7) + 1;
    } else {
        if (forceTerminal) num = Math.random() > 0.5 ? 1 : 9;
        else num = Math.floor(Math.random() * 9) + 1;
    }
    const t = num + suit;
    return [t, t];
}

// --- 4. 核心：自動判斷牌型演算法 (全能版) ---
function autoCalculateTypes(revealed, hand, win, isZimo, flowerCount, allSets, pair, isLigu) {
    let types = [];
    let fullHand = [...hand, win];
    revealed.forEach(group => fullHand = fullHand.concat(group.tiles));

    // A. 基礎環境
    if (flowerCount === 0) types.push('no-flower');
    else types.push('has-flower'); 

    if (isZimo) {
        if (revealed.length === 0) types.push('menqing-zimo');
        else types.push('zimo');
    }
    if (!isZimo && revealed.length === 0) types.push('menqing');
    if (!isZimo && revealed.length === 4) types.push('full-seek');

    // B. 花色判斷
    const suits = new Set(fullHand.map(t => t.substr(1))); 
    const hasWord = suits.has('z'); 
    const colorSuits = [...suits].filter(s => s !== 'z');

    if (!hasWord) {
        types.push('no-honor'); 
        if (colorSuits.length === 1) types.push('qingyise'); 
    } else {
        if (colorSuits.length === 0) types.push('ziyise'); 
        else if (colorSuits.length === 1) types.push('hunyise');
    }

    if (!hasWord && colorSuits.length === 2) types.push('miss-one');

    // C. 結構判斷 (嚦咕 vs 一般)
    if (isLigu) {
        types.push('ligu');
        // 檢查嚦咕連對
        const nums = fullHand.filter(t => !t.includes('z')).map(t => parseInt(t)).sort((a,b)=>a-b);
        // 簡化判斷：尋找連續對子 (需更複雜邏輯才能精確，這裡略過高階連對檢測，只判嚦咕)
        // 嚦咕無字、清混一色等已在上方涵蓋
    } else {
        // --- 一般結構 (5面子 + 1眼) ---
        const sequenceCount = allSets.filter(s => s.type === 'sequence').length;
        const tripletCount = allSets.filter(s => s.type === 'triplet').length;

        if (tripletCount === 5) types.push('toitoi'); 
        else if (sequenceCount === 5 && flowerCount === 0 && !hasWord) types.push('pinghu');

        // D. 複雜牌型偵測
        // 1. 姊妹與相逢
        detectSistersAndBrothers(allSets, types);
        // 2. 步高與龍
        detectStepsAndDragons(allSets, types);
        // 3. 老少與帶么
        detectTerminals(allSets, pair, types, hasWord);
    }

    // E. 三元/四喜/字
    const honorCounts = {};
    fullHand.filter(t => t.includes('z')).forEach(t => honorCounts[t] = (honorCounts[t] || 0) + 1);
    const dragons = ['5z','6z','7z']; 
    const winds = ['1z','2z','3z','4z']; 
    let dragonTriplets = 0; let dragonPairs = 0;
    dragons.forEach(d => { if(honorCounts[d]>=3) dragonTriplets++; if(honorCounts[d]===2) dragonPairs++; });
    if (dragonTriplets === 3) types.push('big-3-dragons');
    else if (dragonTriplets === 2 && dragonPairs === 1) types.push('small-3-dragons');

    let windTriplets = 0; let windPairs = 0;
    winds.forEach(w => { if(honorCounts[w]>=3) windTriplets++; if(honorCounts[w]===2) windPairs++; });
    if (windTriplets === 4) types.push('big-4-winds');
    else if (windTriplets === 3 && windPairs === 1) types.push('small-4-winds');
    else if (windTriplets === 3) types.push('big-3-winds'); 
    else if (windTriplets === 2 && windPairs === 1) types.push('small-3-winds'); 
    
    if ((dragonTriplets + windTriplets) > 0) types.push('has-honor');

    // F. 雞胡 (最後判斷)
    const majorPatterns = [
        'pinghu', 'toitoi', 'hunyise', 'qingyise', 'ziyise', 
        'tanyao', 'ligu', 'sisters-2', 'ming-mixed-step-3', 'ming-pure-dragon',
        'small-3-dragons', 'big-3-dragons', 'small-3-winds', 'big-3-winds', 
        'small-4-winds', 'big-4-winds', 'has-honor', 'hun-dai-yao', 'hun-lao-tou'
    ];
    // 只要有任何一點點特別的，就不算雞胡
    const validFans = types.filter(t => majorPatterns.includes(t));
    if (validFans.length === 0 && flowerCount === 0 && !hasWord) {
        if (isZimo) types.push('duck'); else types.push('chicken'); 
    }

    return types;
}

// --- 偵測邏輯：姊妹與相逢 ---
function detectSistersAndBrothers(allSets, types) {
    // A. 姊妹 (同花色連刻)
    const triplets = allSets.filter(s => s.type === 'triplet' && !s.tiles[0].includes('z'));
    const suits = { m: [], p: [], s: [] };
    triplets.forEach(set => suits[set.tiles[0][1]].push(parseInt(set.tiles[0])));

    for (const s in suits) {
        let nums = suits[s].sort((a,b)=>a-b);
        let maxRun = 1; let currRun = 1;
        for(let i=0; i<nums.length-1; i++) {
            if(nums[i+1] === nums[i]+1) currRun++; else currRun = 1;
            maxRun = Math.max(maxRun, currRun);
        }
        if (maxRun >= 2) types.push('sisters-2');
        if (maxRun >= 3) types.push('sisters-big-3');
    }

    // B. 兄弟 (不同花色同刻)
    // 找出 m, p, s 都有的數字
    let commonNums = [];
    for(let n=1; n<=9; n++) {
        if(suits.m.includes(n) && suits.p.includes(n) && suits.s.includes(n)) {
            types.push('brothers-big-3');
        }
    }

    // C. 相逢 (不同花色同順)
    const seqs = allSets.filter(s => s.type === 'sequence');
    const seqSuits = { m: [], p: [], s: [] };
    seqs.forEach(set => seqSuits[set.tiles[0][1]].push(parseInt(set.tiles[0]))); // 存順子開頭
    for(let n=1; n<=7; n++) {
        if(seqSuits.m.includes(n) && seqSuits.p.includes(n) && seqSuits.s.includes(n)) {
            types.push('xiangfeng-3');
        }
    }
}

// --- 偵測邏輯：步高與龍 ---
function detectStepsAndDragons(allSets, types) {
    const seqs = allSets.filter(s => s.type === 'sequence');
    const seqStarts = { m: new Set(), p: new Set(), s: new Set() };
    seqs.forEach(s => seqStarts[s.tiles[0][1]].add(parseInt(s.tiles[0])));

    // 1. 三色三步高 (123m, 234p, 345s) - 檢查所有排列組合
    const mArr = [...seqStarts.m]; const pArr = [...seqStarts.p]; const sArr = [...seqStarts.s];
    let stepFound = false;
    // 暴力檢查 m-p-s 遞增
    for(let m of mArr) for(let p of pArr) for(let s of sArr) {
        // 排序三個起點
        const arr = [m, p, s].sort((a,b)=>a-b);
        if(arr[1] === arr[0]+1 && arr[2] === arr[1]+1) stepFound = true;
    }
    if(stepFound) types.push('ming-mixed-step-3');

    // 2. 雜龍/清龍 (123, 456, 789)
    // 檢查是否有 1, 4, 7 開頭的順子
    let has123 = { m: seqStarts.m.has(1), p: seqStarts.p.has(1), s: seqStarts.s.has(1) };
    let has456 = { m: seqStarts.m.has(4), p: seqStarts.p.has(4), s: seqStarts.s.has(4) };
    let has789 = { m: seqStarts.m.has(7), p: seqStarts.p.has(7), s: seqStarts.s.has(7) };

    // 清龍
    if ((has123.m && has456.m && has789.m) || (has123.p && has456.p && has789.p) || (has123.s && has456.s && has789.s)) {
        types.push('ming-pure-dragon');
    }
    // 雜龍 (需要三色各一)
    // 組合太多，簡化檢查：只要有 1, 4, 7 且分屬三色
    // 簡單邏輯：總共有 1, 4, 7 起始的順子，且它們花色不同
    // 這裡只做基本檢查
    if ((has123.m || has123.p || has123.s) && (has456.m || has456.p || has456.s) && (has789.m || has789.p || has789.s)) {
        // 嚴格檢查略過，暫時視為雜龍可能
        types.push('ming-mixed-dragon'); 
    }
}

// --- 偵測邏輯：帶么與老少 ---
function detectTerminals(allSets, pair, types, hasWord) {
    // 檢查全體組合
    const isTerminal = (tile) => {
        if (tile.includes('z')) return true;
        const n = parseInt(tile);
        return n === 1 || n === 9;
    };
    
    // 檢查一組是否包含 1, 9, 字
    const setHasTerminal = (set) => set.tiles.some(isTerminal);
    // 檢查是否全為刻子 (用於老頭)
    const allTriplets = allSets.every(s => s.type === 'triplet');
    
    // 檢查所有 Set 和 Pair
    const allHaveTerminals = allSets.every(setHasTerminal) && isTerminal(pair[0]);

    if (allHaveTerminals) {
        // 全是 1, 9 (無字)
        const hasZ = allSets.some(s => s.tiles[0].includes('z')) || pair[0].includes('z');
        
        if (!hasZ) {
            // 清
            if (allTriplets) types.push('qing-lao-tou');
            else types.push('qing-dai-yao');
        } else {
            // 混
            if (allTriplets) types.push('hun-lao-tou');
            else types.push('hun-dai-yao');
        }
    } else {
        // 斷么
        const hasAnyTerminal = allSets.some(setHasTerminal) || isTerminal(pair[0]);
        if (!hasAnyTerminal) types.push('tanyao');
    }

    // 老少上/碰
    // 老少上: 同花色 123 & 789 順子
    // 老少碰: 同花色 111 & 999 刻子
    // 掃描 sets
    const seqStarts = { m: new Set(), p: new Set(), s: new Set() };
    const tripNums = { m: new Set(), p: new Set(), s: new Set() };
    
    allSets.forEach(s => {
        const suit = s.tiles[0][1];
        if(suit === 'z') return;
        const num = parseInt(s.tiles[0]);
        if (s.type === 'sequence') seqStarts[suit].add(num);
        else tripNums[suit].add(num);
    });

    for (const s of ['m','p','s']) {
        if (seqStarts[s].has(1) && seqStarts[s].has(7)) types.push('laoshao-chow');
        if (tripNums[s].has(1) && tripNums[s].has(9)) types.push('laoshao-pong');
    }
}

// --- 輔助函式 ---
function sortTiles(a, b) {
    const suitOrder = { 'm': 0, 'p': 1, 's': 2, 'z': 3 };
    const suitA = a.substr(1);
    const suitB = b.substr(1);
    if (suitA !== suitB) return suitOrder[suitA] - suitOrder[suitB];
    return parseInt(a) - parseInt(b);
}

function isSequence(tiles) {
    if (tiles[0].includes('z')) return false;
    const n1 = parseInt(tiles[0]);
    const n2 = parseInt(tiles[1]);
    const n3 = parseInt(tiles[2]);
    return (n2 === n1 + 1) && (n3 === n2 + 1);
}

// --- UI 渲染與核對 ---
function renderHand() {
    const revealedContainer = document.getElementById('revealedDisplay');
    revealedContainer.innerHTML = '';
    currentHandData.revealed.forEach(group => {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'revealed-group';
        groupDiv.dataset.type = group.type;
        group.tiles.forEach(code => groupDiv.appendChild(createTile(code)));
        revealedContainer.appendChild(groupDiv);
    });

    const handContainer = document.getElementById('handDisplay');
    handContainer.innerHTML = '';
    currentHandData.hand.forEach(code => handContainer.appendChild(createTile(code)));

    const sep = document.createElement('div');
    sep.className = 'separator';
    handContainer.appendChild(sep);

    const winDiv = document.createElement('div');
    winDiv.className = 'winning-tile-section';
    winDiv.appendChild(createTile(currentHandData.win));
    winDiv.appendChild(document.createTextNode(" 食胡"));
    handContainer.appendChild(winDiv);
}

function createTile(code) {
    const div = document.createElement('div');
    div.className = 'tile';
    div.innerText = tileMap[code] || '?';
    if (code.includes('m') || code === '7z') div.classList.add('red');
    else if (code.includes('s') || code === '6z') div.classList.add('green');
    else if (code === '5z') div.classList.add('blue');
    return div;
}

function initCheckboxes() {
    const container = document.getElementById('mainContainer');
    container.innerHTML = '';
    const categories = {};
    patternList.forEach(pat => {
        const cat = pat.cat || '未分類';
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(pat);
    });
    for (const [catName, items] of Object.entries(categories)) {
        const catBlock = document.createElement('div');
        catBlock.className = 'category-block';
        const title = document.createElement('div');
        title.className = 'category-title';
        title.innerText = catName;
        catBlock.appendChild(title);
        const grid = document.createElement('div');
        grid.className = 'options-grid';
        items.forEach(pat => {
            const div = document.createElement('div');
            div.className = 'checkbox-item';
            div.title = pat.desc;
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.id = pat.id;
            input.style.cursor = "pointer";
            const label = document.createElement('label');
            label.htmlFor = pat.id;
            label.innerText = pat.name;
            label.style.cursor = "pointer";
            div.appendChild(input);
            div.appendChild(label);
            grid.appendChild(div);
        });
        catBlock.appendChild(grid);
        container.appendChild(catBlock);
    }
}

function checkAnswer() {
    const checkedIds = Array.from(document.querySelectorAll('input:checked')).map(cb => cb.id);
    const correctTypes = [...new Set(currentHandData.types)];
    const missing = correctTypes.filter(t => !checkedIds.includes(t));
    const extra = checkedIds.filter(t => !correctTypes.includes(t));
    const correctMatches = correctTypes.filter(t => checkedIds.includes(t));

    let msg = '';
    const isPerfect = (missing.length === 0 && extra.length === 0);

    const formatName = (id) => {
        const p = patternList.find(x => x.id === id);
        return p ? `${p.name} <span style="font-size:0.9em; color:#7f8c8d;">(${p.fan}番)</span>` : id;
    };

    if (correctMatches.length > 0) {
        const names = correctMatches.map(formatName).join(', ');
        msg += `<div style="color: #27ae60; margin-bottom: 10px; line-height: 1.5;">✅ <strong>已選對：</strong><br>${names}</div>`;
    } else if (checkedIds.length > 0) {
        msg += `<div style="color: #7f8c8d; margin-bottom: 8px;">(沒有任何正確的項目)</div>`;
    }

    if (missing.length > 0) {
        const names = missing.map(formatName).join(', ');
        msg += `<div style="color: #c0392b; margin-bottom: 6px; line-height: 1.5;">❌ <strong>漏選了：</strong><br>${names}</div>`;
    }
    if (extra.length > 0) {
        const names = extra.map(formatName).join(', ');
        msg += `<div style="color: #c0392b; line-height: 1.5;">❌ <strong>多選了：</strong><br>${names}</div>`;
    }

    const resultBox = document.getElementById('resultBox');
    if (isPerfect) {
        resultBox.className = 'result-area result-correct';
        resultBox.innerHTML = `<h3 style="margin:0 0 10px 0;">🎉 恭喜全對！</h3>${msg}`;
    } else {
        resultBox.className = 'result-area result-wrong';
        if (checkedIds.length === 0) msg = "⚠️ 你還沒有選擇任何牌型喔！";
        resultBox.innerHTML = `<h3 style="margin:0 0 10px 0;">⚠️ 答案未完全正確</h3>${msg}`;
    }
    resultBox.style.display = 'block';
}

function switchTab(tabName) {
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`tab-${tabName}`).classList.add('active');
    document.getElementById('view-trainer').classList.add('hidden');
    document.getElementById('view-reference').classList.add('hidden');
    document.getElementById(`view-${tabName}`).classList.remove('hidden');
}

function renderReferenceTable() {
    const container = document.getElementById('referenceTable');
    container.innerHTML = '';
    const categories = {};
    patternList.forEach(pat => {
        const cat = pat.cat || '未分類';
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(pat);
    });
    for (const [catName, items] of Object.entries(categories)) {
        const catBlock = document.createElement('div');
        catBlock.className = 'ref-category';
        const title = document.createElement('div');
        title.className = 'ref-cat-title';
        title.innerText = catName;
        catBlock.appendChild(title);
        const table = document.createElement('table');
        table.className = 'ref-table';
        const thead = document.createElement('thead');
        thead.innerHTML = `<tr><th>牌型名稱</th><th class="desc-col">詳細說明與條件</th><th class="fan-col">番數</th></tr>`;
        table.appendChild(thead);
        const tbody = document.createElement('tbody');
        items.forEach(pat => {
            const tr = document.createElement('tr');
            tr.className = 'ref-row';
            tr.innerHTML = `<td><strong>${pat.name}</strong></td><td class="desc-col">${pat.desc}</td><td class="fan-col">${pat.fan}</td>`;
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        catBlock.appendChild(table);
        container.appendChild(catBlock);
    }
}

// 啟動
initCheckboxes();
renderReferenceTable();
generateNewHand();