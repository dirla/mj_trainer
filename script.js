// --- 1. 牌型資料庫 (真正完整版：合併明暗 + 獨獨對碰 + 修正雜連刻判定) ---
const patternList = [
    // === 基礎與字花 ===
    { id: 'no-flower', name: '無花', desc: '沒有花', fan: 2, cat: '基礎與環境', example: [] },
    { id: 'has-flower', name: '花', desc: '每有一隻花', fan: 2, cat: '基礎與環境', example: [] },
    { id: 'has-honor', name: '字', desc: '每有三隻番子(刻子)', fan: 2, cat: '基礎與環境', example: ['1z','1z','1z'] },
    { id: 'no-honor', name: '無字', desc: '沒有番子', fan: 2, cat: '基礎與環境', example: ['1m','2m','3m', '5s','6s','7s'] },
    { id: 'menqing', name: '門清', desc: '沒有從玩家手中上牌/碰牌/明槓', fan: 5, cat: '基礎與環境', example: [] },
    { id: 'pinghu', name: '平糊', desc: '全部由順子組成 + 無花無字', fan: 5, cat: '基礎與環境', example: ['1m','2m','3m', '4s','5s','6s'] },
    { id: 'eye-258', name: '將眼', desc: '眼牌是為二/五/八的數字', fan: 2, cat: '基礎與環境', example: ['2m','2m'] },

    // === 聽牌與胡牌方式 ===
    { id: 'dugu', name: '獨獨', desc: '只叫一隻牌 (單吊/邊張/嵌張)', fan: 2, cat: '聽牌與胡牌', example: ['1m','2m','+3m', '或', '5m','+5m'] },
    { id: 'duipeng', name: '對碰', desc: '當有足夠順子或刻子時, 手持兩對眼叫胡', fan: 1, cat: '聽牌與胡牌', example: ['1m','1m','9s','+9s'] },
    { id: 'ready', name: '聽牌', desc: '宣告聽牌,不得更換手牌', fan: 5, cat: '聽牌與胡牌', example: [] },
    { id: 'menqing-ready', name: '門清+聽牌', desc: '在門清的情況下宣告聽牌', fan: 15, cat: '聽牌與胡牌', example: [] },
    { id: 'ippatsu', name: '一發', desc: '宣告聽牌在該玩家未打出第二隻牌時食胡', fan: 5, cat: '聽牌與胡牌', example: [] },
    { id: 'zimo', name: '自摸', desc: '自己摸的牌是食胡的一隻', fan: 1, cat: '聽牌與胡牌', example: [] },
    { id: 'menqing-zimo', name: '門清自摸', desc: '門清情況下自摸', fan: 3, cat: '聽牌與胡牌', example: [] },
    { id: 'flower-zimo', name: '花摸', desc: '拿到花後補牌食胡', fan: 2, cat: '聽牌與胡牌', example: [] },
    { id: 'kong-zimo', name: '槓摸', desc: '槓牌後補牌食胡', fan: 5, cat: '聽牌與胡牌', example: [] },
    { id: 'rob-kong', name: '搶槓', desc: '其他玩家明槓自己可以食胡的牌', fan: 5, cat: '聽牌與胡牌', example: [] },
    { id: 'full-seek', name: '全求人', desc: '所有牌都是上和碰組成時,食別人打出牌', fan: 30, cat: '聽牌與胡牌', example: [] },
    { id: 'half-seek', name: '半求人', desc: '所有牌都是上和碰組成時,自摸', fan: 15, cat: '聽牌與胡牌', example: [] },
    { id: 'dark-last', name: '暗絕', desc: '加上所有棄牌,食胡牌是最後一隻', fan: 8, cat: '聽牌與胡牌', example: [] },
    { id: 'bright-last', name: '明絕', desc: '只計算所有棄牌,食胡牌是最後一隻', fan: 15, cat: '聽牌與胡牌', example: [] },

    // === 步高與龍 ===
    { id: 'mixed-step-3', name: '三色三步高', desc: '以三種花色的三組連順', fan: 5, fanClosed: 10, cat: '步高與龍', example: ['1m','2m','3m', '2p','3p','4p', '3s','4s','5s'] },
    { id: 'mixed-step-4', name: '三色四步高', desc: '以三種花色的四組連順', fan: 20, fanClosed: 40, cat: '步高與龍', example: ['1m','2m','3m', '2p','3p','4p', '3s','4s','5s', '4m','5m','6m'] },
    { id: 'mixed-step-5', name: '三色五步高', desc: '以三種花色的五組連順', fan: 50, fanClosed: 80, cat: '步高與龍', example: ['1m','2m','3m', '2p','3p','4p', '3s','4s','5s', '4m','5m','6m', '5p','6p','7p'] },

    { id: 'pure-step-3', name: '一色三步高', desc: '以同一種花色的三組連順 (遞增1或2)', fan: 15, fanClosed: 25, cat: '步高與龍', example: ['1m','2m','3m', '2m','3m','4m', '3m','4m','5m'] },
    { id: 'pure-step-4', name: '一色四步高', desc: '以同一種花色的四組連順 (遞增1或2)', fan: 50, fanClosed: 80, cat: '步高與龍', example: ['1m','2m','3m', '2m','3m','4m', '3m','4m','5m', '4m','5m','6m'] },
    { id: 'pure-step-5', name: '一色五步高', desc: '以同一種花色的五組連順 (遞增1或2)', fan: 120, fanClosed: 180, cat: '步高與龍', example: ['1m','2m','3m', '2m','3m','4m', '3m','4m','5m', '4m','5m','6m', '5m','6m','7m'] },

    { id: 'mixed-dragon', name: '雜龍', desc: '以三個組合內包含三種花色組成的完整1-9順子', fan: 8, fanClosed: 15, cat: '步高與龍', example: ['1m','2m','3m', '4p','5p','6p', '7s','8s','9s'] },
    { id: 'pure-dragon', name: '清龍', desc: '以三個組合內包含同一種花色組成的完整1-9順子', fan: 10, fanClosed: 20, cat: '步高與龍', example: ['1m','2m','3m', '4m','5m','6m', '7m','8m','9m'] },

    // === 清混與對對 ===
    { id: 'toitoi', name: '對對胡', desc: '全部組合皆是刻子', fan: 40, cat: '清混與對對', example: ['1m','1m','1m', '3p','3p','3p', '5s','5s','5s', '9p','9p','9p'] },
    { id: 'hunyise', name: '混一色', desc: '全副牌以一種花色和番子組成', fan: 40, cat: '清混與對對', example: ['1m','2m','3m', '5m','5m','5m', '1z','1z','1z'] },
    { id: 'qingyise', name: '清一色', desc: '全副牌只有一種花色', fan: 100, cat: '清混與對對', example: ['1m','2m','3m', '4m','5m','6m', '9m','9m','9m'] },
    { id: 'ziyise', name: '字一色', desc: '全副牌以番子組成', fan: 160, cat: '清混與對對', example: ['1z','1z','1z', '2z','2z','2z', '3z','3z','3z', '5z','5z','5z'] },

    // === 風與三元 ===
    { id: 'small-3-winds', name: '小三風', desc: '有兩組風牌的刻子和一組風牌的眼', fan: 20, cat: '風與三元', example: ['1z','1z','1z', '2z','2z','2z', '3z','3z'] },
    { id: 'big-3-winds', name: '大三風', desc: '有三組風牌的刻子', fan: 40, cat: '風與三元', example: ['1z','1z','1z', '2z','2z','2z', '3z','3z','3z'] },
    { id: 'small-3-dragons', name: '小三元', desc: '有紅中發財白板其中兩組的刻子以及餘下的一種作為眼', fan: 30, cat: '風與三元', example: ['5z','5z','5z', '6z','6z','6z', '7z','7z'] },
    { id: 'big-3-dragons', name: '大三元', desc: '有紅中發財白板三組刻子', fan: 60, cat: '風與三元', example: ['5z','5z','5z', '6z','6z','6z', '7z','7z','7z'] },
    { id: 'small-4-winds', name: '小四喜', desc: '有三組風牌的刻子和一組風牌的眼', fan: 80, cat: '風與三元', example: ['1z','1z','1z', '2z','2z','2z', '3z','3z','3z', '4z','4z'] },
    { id: 'big-4-winds', name: '大四喜', desc: '有四組風牌的刻子', fan: 120, cat: '風與三元', example: ['1z','1z','1z', '2z','2z','2z', '3z','3z','3z', '4z','4z','4z'] },

    // === 特殊與雜項 ===
    { id: 'tanyao', name: '斷么', desc: '沒有數字1/9和番子', fan: 8, cat: '特殊與雜項', example: ['2m','3m','4m', '5p','6p','7p'] },
    { id: 'miss-one', name: '缺一門', desc: '缺少筒/索/萬任意一種 (需無番子)', fan: 8, cat: '特殊與雜項', example: ['1m','2m','3m', '1p','2p','3p'] },
    { id: 'miss-five', name: '缺五', desc: '沒有數字五的牌', fan: 8, cat: '特殊與雜項', example: ['1m','2m','3m', '6p','7p','8p'] },
    { id: 'less-5', name: '小於五', desc: '全副牌只由數字1-4的順子或刻子組成', fan: 50, cat: '特殊與雜項', example: ['1m','2m','3m', '4p','4p','4p'] },
    { id: 'more-5', name: '大於五', desc: '全副牌只由數字6-9的順子或刻子組成', fan: 50, cat: '特殊與雜項', example: ['6m','7m','8m', '9s','9s','9s'] },
    { id: 'chicken', name: '雞胡', desc: '食胡時只有一番', fan: 30, cat: '特殊與雜項', example: [] },
    { id: 'duck', name: '鴨胡', desc: '自摸時,撇除自摸的番數,只有一番', fan: 15, cat: '特殊與雜項', example: [] },

    // === 老少/帶么/老頭 ===
    { id: 'laoshao-chow', name: '老少上', desc: '有一組數字123和數字789的組合', fan: 3, cat: '老少與帶么', example: ['1m','2m','3m', '7m','8m','9m'] },
    { id: 'double-laoshao', name: '雙老少上', desc: '有兩組數字123和數字789的順子', fan: 10, fanClosed: 15, cat: '老少與帶么', example: ['1m','2m','3m', '7m','8m','9m', '1p','2p','3p', '7p','8p','9p'] },
    { id: 'laoshao-pong', name: '老少碰', desc: '有一組從其他玩家手中碰的刻子數字111和數字999組合', fan: 5, cat: '老少與帶么', example: ['1m','1m','1m', '9m','9m','9m'] },
    { id: 'double-shao-pong', name: '雙少碰', desc: '有兩組從其他玩家手中碰的刻子數字111和數字999組合', fan: 20, cat: '老少與帶么', example: ['1m','1m','1m', '9m','9m','9m', '1p','1p','1p', '9p','9p','9p'] },
    { id: 'hun-dai-yao', name: '混帶么', desc: '全副牌的每組順子/刻子/眼都包含數字1、9或番子', fan: 30, cat: '老少與帶么', example: ['1m','2m','3m', '9p','9p','9p', '1z','1z','1z'] },
    { id: 'qing-dai-yao', name: '清帶么', desc: '只用帶有數字1和9的順子和1/9的眼組成的手牌', fan: 80, cat: '老少與帶么', example: ['1m','2m','3m', '7p','8p','9p', '1s','1s'] },
    { id: 'hun-lao-tou', name: '混老頭', desc: '全副牌由數字1、9的刻子和番子組成 (不計對對胡)', fan: 60, cat: '老少與帶么', example: ['1m','1m','1m', '9p','9p','9p', '1z','1z','1z'] },
    { id: 'qing-lao-tou', name: '清老頭', desc: '全副牌只由數字1、9的刻子/眼組成 (不計對對胡)', fan: 220, cat: '老少與帶么', example: ['1m','1m','1m', '9p','9p','9p', '1s','1s','1s'] },
    { id: 'hun-dai-x', name: '混帶X', desc: '撇除番子,全副手牌的全部組合都有其中一個數字', fan: 30, cat: '老少與帶么', example: ['2m','3m','4m', '4p','5p','6p', '4s','4s','4s'] },
    { id: 'quan-dai-x', name: '全帶X', desc: '沒有番子,全副手牌的全部組合都有其中一個數字', fan: 100, cat: '老少與帶么', example: ['3m','4m','5m', '4p','5p','6p', '4s','4s','4s'] },

    // === 槓與暗刻 ===
    { id: 'ming-gang', name: '明槓', desc: '用三隻相同牌碰牌或碰牌後再摸到最後一隻用作槓牌', fan: 1, cat: '槓與暗刻', example: ['1m','1m','1m','1m'] },
    { id: 'an-gang', name: '暗槓', desc: '手持四隻相同牌時槓牌', fan: 2, cat: '槓與暗刻', example: ['1m','1m','1m','1m'] },
    { id: 'gang-3', name: '三槓', desc: '有三組槓的組合', fan: 30, cat: '槓與暗刻', example: [] },
    { id: 'gang-4', name: '四槓', desc: '有四組槓的組合', fan: 60, cat: '槓與暗刻', example: [] },
    { id: 'gang-5', name: '五槓', desc: '有五組槓的組合', fan: 120, cat: '槓與暗刻', example: [] },
    { id: 'anke-2', name: '二暗刻', desc: '手牌內有兩組刻子', fan: 5, cat: '槓與暗刻', example: ['2m','2m','2m', '5p','5p','5p'] },
    { id: 'anke-3', name: '三暗刻', desc: '手牌內有三組刻子', fan: 15, cat: '槓與暗刻', example: ['2m','2m','2m', '5p','5p','5p', '8s','8s','8s'] },
    { id: 'anke-4', name: '四暗刻', desc: '手牌內有四組刻子', fan: 30, cat: '槓與暗刻', example: ['2m','2m','2m', '5p','5p','5p', '8s','8s','8s', '1z','1z','1z'] },
    { id: 'anke-5', name: '五暗刻', desc: '手牌內有五組刻子', fan: 80, cat: '槓與暗刻', example: [] },
    { id: 'kankanhhu', name: '坎坎胡', desc: '門清對對胡 (包對對)', fan: 160, cat: '槓與暗刻', example: [] },

    // === 兄弟姊妹 ===
    { id: 'brothers-2', name: '二兄弟', desc: '兩組不同花色但數字相同的刻子', fan: 5, cat: '兄弟姊妹', example: ['2m','2m','2m', '2p','2p','2p'] },
    { id: 'brothers-small-3', name: '小三兄弟', desc: '兩組數字相同的刻子和相同數字的眼', fan: 15, cat: '兄弟姊妹', example: ['2m','2m','2m', '2p','2p','2p', '2s','2s'] },
    { id: 'brothers-big-3', name: '大三兄弟', desc: '三組不同花色但數字相同的刻子', fan: 30, cat: '兄弟姊妹', example: ['2m','2m','2m', '2p','2p','2p', '2s','2s','2s'] },
    { id: 'sisters-2', name: '二姊妹', desc: '兩組數字相連的刻子', fan: 5, cat: '兄弟姊妹', example: ['2m','2m','2m', '3m','3m','3m'] },
    { id: 'sisters-small-3', name: '小三姊妹', desc: '兩組數字相連的刻子加上數字相連的眼', fan: 10, cat: '兄弟姊妹', example: ['2m','2m','2m', '3m','3m','3m', '4m','4m'] },
    { id: 'sisters-big-3', name: '大三姊妹', desc: '三組數字相連的刻子', fan: 20, cat: '兄弟姊妹', example: ['2m','2m','2m', '3m','3m','3m', '4m','4m','4m'] },
    { id: 'sisters-small-4', name: '小四姊妹', desc: '三組數字相連的刻子加上數字相連的眼', fan: 35, cat: '兄弟姊妹', example: ['2m','2m','2m', '3m','3m','3m', '4m','4m','4m', '5m','5m'] },
    { id: 'sisters-big-4', name: '大四姊妹', desc: '四組數字相連的刻子', fan: 50, cat: '兄弟姊妹', example: ['2m','2m','2m', '3m','3m','3m', '4m','4m','4m', '5m','5m','5m'] },
    { id: 'sisters-small-5', name: '小五姊妹', desc: '四組數字相連的刻子加上數字相連的眼', fan: 70, cat: '兄弟姊妹', example: [] },
    { id: 'sisters-big-5', name: '大五姊妹', desc: '五組數字相連的刻子', fan: 90, cat: '兄弟姊妹', example: [] },
    { id: 'sisters-small-6', name: '小六姊妹', desc: '五組數字相連的刻子加上數字相連的眼', fan: 120, cat: '兄弟姊妹', example: [] },

    // === 雜連刻 (Mixed Sisters) ===
    { id: 'mixed-sisters-small-3', name: '小三雜連刻', desc: '兩組由不同花色但數字相連的刻子和數字相連的眼', fan: 8, cat: '兄弟姊妹', example: ['2m','2m','2m', '3p','3p','3p', '4s','4s'] },
    { id: 'mixed-sisters-big-3', name: '大三雜連刻', desc: '三組由不同花色但數字相連的刻子', fan: 15, cat: '兄弟姊妹', example: ['2m','2m','2m', '3p','3p','3p', '4s','4s','4s'] },
    { id: 'mixed-sisters-small-4', name: '小四雜連刻', desc: '三組由不同花色但數字相連的刻子和數字相連的眼', fan: 25, cat: '兄弟姊妹', example: [] },
    { id: 'mixed-sisters-big-4', name: '大四雜連刻', desc: '四組由不同花色但數字相連的刻子', fan: 35, cat: '兄弟姊妹', example: [] },
    { id: 'mixed-sisters-small-5', name: '小五雜連刻', desc: '四組由不同花色但數字相連的刻子和數字相連的眼', fan: 50, cat: '兄弟姊妹', example: [] },
    { id: 'mixed-sisters-big-5', name: '大五雜連刻', desc: '五組由不同花色但數字相連的刻子', fan: 65, cat: '兄弟姊妹', example: [] },
    { id: 'mixed-sisters-small-6', name: '小六雜連刻', desc: '五組由不同花色但數字相連的刻子和數字相連的眼', fan: 90, cat: '兄弟姊妹', example: [] },

    // === 相逢與般高 ===
    { id: 'xiangfeng-2', name: '二相逢', desc: '兩組不同花色但數字相同的順子', fan: 3, cat: '相逢與般高', example: ['1m','2m','3m', '1p','2p','3p'] },
    { id: 'double-sisters', name: '雙姊妹', desc: '兩個二相逢', fan: 10, fanClosed: 15, cat: '相逢與般高', example: ['1m','2m','3m', '1p','2p','3p', '7m','8m','9m', '7p','8p','9p'] },
    { id: 'xiangfeng-3', name: '三相逢', desc: '三組不同花色但數字相同的順子', fan: 10, cat: '相逢與般高', example: ['1m','2m','3m', '1p','2p','3p', '1s','2s','3s'] },

    // 般高
    { id: 'bangao', name: '一般高', desc: '兩組完全相同的順子', fan: 5, fanClosed: 8, cat: '相逢與般高', example: ['1m','2m','3m', '1m','2m','3m'] },
    { id: 'double-bangao', name: '雙般高', desc: '兩組一般高', fan: 20, fanClosed: 30, cat: '相逢與般高', example: ['1m','2m','3m', '1m','2m','3m', '7p','8p','9p', '7p','8p','9p'] },
    { id: 'bangao-3', name: '三般高', desc: '三組完全相同的順子', fan: 30, fanClosed: 50, cat: '相逢與般高', example: ['1m','2m','3m', '1m','2m','3m', '1m','2m','3m'] },
    { id: 'bangao-4', name: '四般高', desc: '四組完全相同的順子', fan: 200, fanClosed: 300, cat: '相逢與般高', example: [] },
    { id: 'full-bangao', name: '全般高', desc: '一個三般高+一個一般高', fan: 80, fanClosed: 120, cat: '相逢與般高', example: [] },

    // === 嚦咕 (Lik Gu) 系列 ===
    { id: 'ligu', name: '嚦咕嚦咕', desc: '一組刻子加七對眼', fan: 50, cat: '嚦咕與特殊', example: ['1m','1m', '3m','3m', '5p','5p', '8s','8s', '1z','1z', '2z','2z', '5z','5z'] },
    { id: 'ligu-seq-3', name: '嚦咕三連對', desc: '在嚦咕嚦咕中數字相連的三對眼', fan: 5, cat: '嚦咕與特殊', example: ['2m','2m', '3m','3m', '4m','4m'] },
    { id: 'ligu-seq-4', name: '嚦咕四連對', desc: '在嚦咕嚦咕中數字相連的四對眼', fan: 10, cat: '嚦咕與特殊', example: ['2m','2m', '3m','3m', '4m','4m', '5m','5m'] },
    { id: 'ligu-seq-5', name: '嚦咕五連對', desc: '在嚦咕嚦咕中數字相連的五對眼', fan: 20, cat: '嚦咕與特殊', example: ['2m','2m', '3m','3m', '4m','4m', '5m','5m', '6m','6m'] },
    { id: 'ligu-seq-6', name: '嚦咕六連對', desc: '在嚦咕嚦咕中數字相連的六對眼', fan: 40, cat: '嚦咕與特殊', example: [] },
    { id: 'ligu-seq-7', name: '嚦咕七連對', desc: '在嚦咕嚦咕中數字相連的七對眼', fan: 80, cat: '嚦咕與特殊', example: [] },
    { id: 'ligu-seq-8', name: '嚦咕八連對', desc: '在嚦咕嚦咕中數字相連的八對眼', fan: 160, cat: '嚦咕與特殊', example: [] },
    { id: 'ligu-3-winds', name: '嚦咕三風', desc: '一組風牌的刻子加兩對不重複風牌的眼', fan: 15, cat: '嚦咕與特殊', example: ['1z','1z','1z', '2z','2z', '3z','3z'] },
    { id: 'ligu-3-dragons', name: '嚦咕三元', desc: '中發白任意一組的刻子加各一對另外兩種的眼', fan: 20, cat: '嚦咕與特殊', example: ['5z','5z','5z', '6z','6z', '7z','7z'] },
    { id: 'ligu-4-winds', name: '嚦咕四喜', desc: '一組風牌的刻子加三對不重複風牌的眼', fan: 30, cat: '嚦咕與特殊', example: ['1z','1z','1z', '2z','2z', '3z','3z', '4z','4z'] },
    { id: 'ligu-3-num', name: '嚦咕三數', desc: '所有對眼只包含三個數字', fan: 50, cat: '嚦咕與特殊', example: [] },
    { id: 'ligu-2-num', name: '嚦咕二數', desc: '所有對眼只包含兩個數字', fan: 100, cat: '嚦咕與特殊', example: [] },

    // === 特殊牌型 (13/16) ===
    { id: '13-orphans', name: '十三么', desc: '集齊東南西北中發白和三種花色1至9...', fan: 120, cat: '特殊牌型', example: ['1m','9m','1p','9p','1s','9s','1z','2z','3z','4z','5z','6z','7z'] },
    { id: '13-orphans-13-wait', name: '十三么十三面聽', desc: '食胡條件與十三么相同,聽十三隻牌', fan: 140, cat: '特殊牌型', example: [] },
    { id: '16-unmatched', name: '十六不搭', desc: '東南西北中發白加上每種花色的三個數字...', fan: 50, cat: '特殊牌型', example: ['1z','2z','3z','4z','5z','6z','7z', '1m','4m','7m', '2p','5p','8p', '3s','6s','9s'] },
    { id: '16-unmatched-16-wait', name: '十六不搭十六面聽', desc: '十六不搭聽十六張牌', fan: 60, cat: '特殊牌型', example: [] },
    { id: 'unmatched-3-meet', name: '不搭三相逢', desc: '十六不搭的三種花色的數字都一樣', fan: 15, cat: '特殊牌型', example: ['2m', '2p', '2s'] },
    { id: 'unmatched-mixed-dragon', name: '不搭雜龍', desc: '十六不搭三種花色的數字混合組成完整1-9順子', fan: 25, cat: '特殊牌型', example: ['1m','4m','7m', '2p','5p','8p', '3s','6s','9s'] },
    { id: 'heaven', name: '天胡', desc: '莊家在第一次摸牌時自摸', fan: 160, cat: '特殊與雜項', example: [] },
    { id: 'earth', name: '地胡', desc: '閒家在莊家打出第一隻時食胡', fan: 160, cat: '特殊與雜項', example: [] },
    { id: 'human', name: '人胡', desc: '閒家在第一輪時自摸', fan: 130, cat: '特殊與雜項', example: [] },
    { id: 'small-5-gate', name: '小五門齊', desc: '有齊萬/筒/索/風/三元其一做眼', fan: 10, cat: '特殊與雜項', example: ['1m','2m','3m', '1p','2p','3p', '1s','2s','3s', '1z','1z','1z', '5z','5z'] },
    { id: 'big-5-gate', name: '大五門齊', desc: '五組有齊萬/筒/索/風/三元', fan: 15, cat: '特殊與雜項', example: ['1m','2m','3m', '1p','2p','3p', '1s','2s','3s', '1z','1z','1z', '5z','5z','5z'] },
    { id: 'small-7-gate', name: '小七門齊', desc: '小五門齊 + 兩種顏色的花', fan: 15, cat: '特殊與雜項', example: [] },
    { id: 'big-7-gate', name: '大七門齊', desc: '大五門齊 + 兩種顏色的花', fan: 20, cat: '特殊與雜項', example: [] },
    { id: 'double-ron', name: '雙響', desc: '同一隻牌有兩家表明食胡', fan: 5, cat: '特殊與雜項', example: [] },
    { id: 'triple-ron', name: '三響', desc: '同一隻牌有三家表明食胡', fan: 10, cat: '特殊與雜項', example: [] },
    { id: 'double-ron-rev', name: '雙響反摸', desc: '上一場被雙響後自模', fan: 5, cat: '特殊與雜項', example: [] },
    { id: 'triple-ron-rev', name: '三響反摸', desc: '上一場被三響後自模', fan: 10, cat: '特殊與雜項', example: [] },
    { id: 'haidi', name: '海底摸月', desc: '牌山最後一隻自摸', fan: 20, cat: '特殊與雜項', example: [] },
    { id: 'hedi', name: '河底撈魚', desc: '食出其他玩家打出的本局最後一張牌', fan: 10, cat: '特殊與雜項', example: [] },
    { id: 'discard-4', name: '四子內', desc: '在棄牌數只有四或更少時食胡', fan: 50, cat: '特殊與雜項', example: [] },
    { id: 'discard-7', name: '七子內', desc: '在棄牌數只有七或更少時食胡', fan: 30, cat: '特殊與雜項', example: [] },
    { id: 'discard-10', name: '十子內', desc: '在棄牌數只有十或更少時食胡', fan: 15, cat: '特殊與雜項', example: [] },
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

let currentHandData = { revealed: [], hand: [], win: '', types: [], isZimo: false, flowerCount: 0 };

// --- 3. 終極隨機胡牌生成引擎 ---
function generateNewHand() {
    document.getElementById('resultBox').style.display = 'none';
    document.getElementById('userFan').value = '';
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);

    const winSource = Math.floor(Math.random() * 4);
    const isZimo = (winSource === 0);
    const flowerCount = Math.floor(Math.random() * 5);
    const deckTracker = initDeck();

    const rand = Math.random();
    let scenario = 'normal';
    if (rand < 0.1) scenario = 'ligu';
    else if (rand < 0.25) scenario = 'sisters';
    else if (rand < 0.40) scenario = 'step_dragon';
    else if (rand < 0.55) scenario = 'terminals';
    else scenario = 'normal';

    let handTiles = [];
    let revealed = [];
    let sets = [];
    let pair = [];

    if (scenario === 'ligu') {
        let pairsCount = 0;
        let attempt = 0;
        while (pairsCount < 7 && attempt < 200) {
            let p = generateRandomPair(null);
            if (tryDraw(deckTracker, p)) {
                handTiles = handTiles.concat(p);
                pairsCount++;
            }
            attempt++;
        }
    }
    else {
        const preferSuit = ['m', 'p', 's'][Math.floor(Math.random() * 3)];

        if (scenario === 'sisters') {
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
            if (subType < 0.4) { // 三相逢
                const n = Math.floor(Math.random() * 7) + 1;
                const s1 = [n+'m', (n+1)+'m', (n+2)+'m'];
                const s2 = [n+'p', (n+1)+'p', (n+2)+'p'];
                const s3 = [n+'s', (n+1)+'s', (n+2)+'s'];
                if (tryDraw(deckTracker, [...s1, ...s2, ...s3])) {
                    sets.push({ type: 'sequence', tiles: s1 });
                    sets.push({ type: 'sequence', tiles: s2 });
                    sets.push({ type: 'sequence', tiles: s3 });
                }
            } else if (subType < 0.7) { // 步高
                const n = Math.floor(Math.random() * 5) + 1;
                const s1 = [n+'m', (n+1)+'m', (n+2)+'m'];
                const s2 = [(n+1)+'p', (n+2)+'p', (n+3)+'p'];
                const s3 = [(n+2)+'s', (n+3)+'s', (n+4)+'s'];
                if (tryDraw(deckTracker, [...s1, ...s2, ...s3])) {
                    sets.push({ type: 'sequence', tiles: s1 });
                    sets.push({ type: 'sequence', tiles: s2 });
                    sets.push({ type: 'sequence', tiles: s3 });
                }
            } else { // 龍
                const suits = [preferSuit, preferSuit, preferSuit];
                if (Math.random() > 0.5) { suits[0] = 'm'; suits[1] = 'p'; suits[2] = 's'; }
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

        while (sets.length < 5) {
            let setType = Math.random() > 0.5 ? 'sequence' : 'triplet';
            const candidate = generateRandomSet(setType, null, scenario === 'terminals');
            if (tryDraw(deckTracker, candidate.tiles)) {
                sets.push(candidate);
            }
        }

        let pairSuccess = false;
        let pairAttempt = 0;
        while (!pairSuccess && pairAttempt < 100) {
            const candPair = generateRandomPair(null, scenario === 'terminals');
            if (tryDraw(deckTracker, candPair)) {
                pair = candPair;
                pairSuccess = true;
            }
            pairAttempt++;
        }

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

    const winIndex = Math.floor(Math.random() * handTiles.length);
    const winTile = handTiles[winIndex];
    handTiles.splice(winIndex, 1);
    handTiles.sort(sortTiles);

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
    if (forceTerminal && Math.random() > 0.3) {
        if (Math.random() > 0.6) suit = 'z';
    }
    if (suit === 'z') type = 'triplet';

    if (type === 'sequence') {
        let num;
        if (forceTerminal) num = Math.random() > 0.5 ? 1 : 7;
        else num = Math.floor(Math.random() * 7) + 1;
        return { type: 'sequence', tiles: [num+suit, (num+1)+suit, (num+2)+suit] };
    } else {
        let num;
        if (suit === 'z') num = Math.floor(Math.random() * 7) + 1;
        else {
            if (forceTerminal) num = Math.random() > 0.5 ? 1 : 9;
            else num = Math.floor(Math.random() * 9) + 1;
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
    if (suit === 'z') num = Math.floor(Math.random() * 7) + 1;
    else {
        if (forceTerminal) num = Math.random() > 0.5 ? 1 : 9;
        else num = Math.floor(Math.random() * 9) + 1;
    }
    const t = num + suit;
    return [t, t];
}

// --- 4. 核心：自動判斷牌型演算法 ---
function autoCalculateTypes(revealed, hand, win, isZimo, flowerCount, allSets, pair, isLigu) {
    let types = [];
    let fullHand = [...hand, win];
    revealed.forEach(group => fullHand = fullHand.concat(group.tiles));

    if (flowerCount === 0) types.push('no-flower'); else types.push('has-flower');

    if (isZimo) {
        if (revealed.length === 0) types.push('menqing-zimo'); else types.push('zimo');
    }
    if (!isZimo && revealed.length === 0) types.push('menqing');
    if (!isZimo && revealed.length === 4) types.push('full-seek');

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

    if (isLigu) {
        types.push('ligu');
    } else {
        const sequenceCount = allSets.filter(s => s.type === 'sequence').length;
        const tripletCount = allSets.filter(s => s.type === 'triplet').length;

        if (tripletCount === 5) types.push('toitoi');
        else if (sequenceCount === 5 && flowerCount === 0 && !hasWord) types.push('pinghu');

        detectSistersAndBrothers(allSets, types, pair);
        detectStepsAndDragons(allSets, types);
        detectTerminals(allSets, pair, types, hasWord);
        detectWaitTypes(types, allSets, pair, win);
        detectBanGao(allSets, types);
        detectXiangFeng(allSets, types);
    }

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

    const majorPatterns = [
        'pinghu', 'toitoi', 'hunyise', 'qingyise', 'ziyise',
        'tanyao', 'ligu', 'sisters-2', 'mixed-step-3', 'pure-dragon',
        'small-3-dragons', 'big-3-dragons', 'small-3-winds', 'big-3-winds',
        'small-4-winds', 'big-4-winds', 'has-honor', 'hun-dai-yao', 'hun-lao-tou'
    ];
    const validFans = types.filter(t => majorPatterns.includes(t));
    if (validFans.length === 0 && flowerCount === 0 && !hasWord) {
        if (isZimo) types.push('duck'); else types.push('chicken');
    }

    return types;
}

function detectWaitTypes(types, allSets, pair, winTile) {
    let isDugu = false;
    let isDuipeng = false;

    if (pair.includes(winTile)) {
        isDugu = true;
    } else {
        for (let set of allSets) {
            if (set.tiles.includes(winTile)) {
                if (set.type === 'triplet') {
                    isDuipeng = true;
                } else if (set.type === 'sequence') {
                    const nums = set.tiles.map(t => parseInt(t)).sort((a,b)=>a-b);
                    const winNum = parseInt(winTile);
                    if (nums[1] === winNum) isDugu = true;
                    else if (nums[0] === winNum) {
                        if (nums[0] === 7 && nums[1] === 8 && nums[2] === 9) isDugu = true;
                    } else if (nums[2] === winNum) {
                        if (nums[0] === 1 && nums[1] === 2 && nums[2] === 3) isDugu = true;
                    }
                }
                break;
            }
        }
    }
    if (isDugu) types.push('dugu');
    if (isDuipeng) types.push('duipeng');
}

function detectBanGao(allSets, types) {
    const seqs = allSets.filter(s => s.type === 'sequence');
    const counts = {};
    seqs.forEach(s => {
        const key = s.tiles[0];
        counts[key] = (counts[key] || 0) + 1;
    });
    let pairs = 0; let triplets = 0; let quads = 0;
    Object.values(counts).forEach(c => {
        if (c === 2) pairs++;
        if (c === 3) triplets++;
        if (c === 4) quads++;
    });
    if (quads >= 1) types.push('bangao-4');
    else if (triplets >= 1 && pairs >= 1) types.push('full-bangao');
    else if (triplets >= 1) types.push('bangao-3');
    else if (pairs === 2) types.push('double-bangao');
    else if (pairs === 1) types.push('bangao');
}

function detectXiangFeng(allSets, types) {
    const seqs = allSets.filter(s => s.type === 'sequence');
    const numCounts = {};
    seqs.forEach(s => {
        const num = parseInt(s.tiles[0]);
        const suit = s.tiles[0][1];
        if (!numCounts[num]) numCounts[num] = new Set();
        numCounts[num].add(suit);
    });
    let has3 = false; let has2 = false;
    Object.values(numCounts).forEach(suitSet => {
        if (suitSet.size === 3) has3 = true;
        if (suitSet.size === 2) has2 = true;
    });
    if (has3) types.push('xiangfeng-3');
    else if (has2) types.push('xiangfeng-2');
}

function detectSistersAndBrothers(allSets, types, pair) {
    // 1. 姊妹 (Sisters): 同花色 連續刻子
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
        if (maxRun >= 6) types.push('sisters-small-6');
        else if (maxRun >= 5) types.push('sisters-big-5');
        else if (maxRun >= 4) types.push('sisters-big-4');
        else if (maxRun >= 3) types.push('sisters-big-3');
        else if (maxRun >= 2) types.push('sisters-2');
    }

    // 兄弟 (Brothers): 不同花色 相同數字
    const tripNums = {};
    triplets.forEach(t => {
        const n = parseInt(t.tiles[0]);
        tripNums[n] = (tripNums[n] || 0) + 1;
    });
    let hasBig3Bro = false;
    let has2Bro = false;
    Object.values(tripNums).forEach(c => {
        if (c === 3) hasBig3Bro = true;
        if (c === 2) has2Bro = true;
    });
    if (hasBig3Bro) types.push('brothers-big-3');
    else if (has2Bro) types.push('brothers-2');

    // 2. 雜連刻 (Mixed Sisters): 不同花色 (且不全同花色) 數字相連
    // 輔助函數: 找出最長的數字相連鏈，且花色不完全相同
    function getMaxMixedRun(items) {
        let byNum = {};
        items.forEach(i => {
            if(!byNum[i.num]) byNum[i.num] = [];
            byNum[i.num].push(i.suit);
        });

        let nums = Object.keys(byNum).map(Number).sort((a,b)=>a-b);
        let maxLen = 0;

        function dfs(currNum, currentChainLength, currentSuits) {
            if (currentChainLength > 1) {
                const uniqueSuits = new Set(currentSuits);
                // 關鍵修正: 必須包含多種花色，否則視為純姊妹
                if (uniqueSuits.size > 1) {
                    maxLen = Math.max(maxLen, currentChainLength);
                }
            }

            let nextNum = currNum + 1;
            if (byNum[nextNum]) {
                for (let suit of byNum[nextNum]) {
                    dfs(nextNum, currentChainLength + 1, [...currentSuits, suit]);
                }
            }
        }

        nums.forEach(n => {
            for (let suit of byNum[n]) {
                dfs(n, 1, [suit]);
            }
        });
        return maxLen;
    }

    // 準備資料
    let tripItems = triplets.map(t => ({num: parseInt(t.tiles[0]), suit: t.tiles[0][1]}));

    // 大雜連刻 (僅刻子)
    let bigRun = getMaxMixedRun(tripItems);
    if (bigRun >= 6) types.push('mixed-sisters-big-6'); // 暫無
    else if (bigRun >= 5) types.push('mixed-sisters-big-5');
    else if (bigRun >= 4) types.push('mixed-sisters-big-4');
    else if (bigRun >= 3) types.push('mixed-sisters-big-3');

    // 小雜連刻 (刻子 + 眼)
    if (pair && !pair[0].includes('z')) {
         let pairItem = {num: parseInt(pair[0]), suit: pair[0][1]};
         let combinedItems = [...tripItems, pairItem];
         let totalRun = getMaxMixedRun(combinedItems);

         if (totalRun >= 6) types.push('mixed-sisters-small-6');
         else if (totalRun >= 5) types.push('mixed-sisters-small-5');
         else if (totalRun >= 4) types.push('mixed-sisters-small-4');
         else if (totalRun >= 3) {
             // 若已有大三，通常也滿足小三定義，根據規則可並存或只算大
             // 這裡兩者都推，讓checkAnswer處理顯示
             types.push('mixed-sisters-small-3');
         }
    }
}

function detectStepsAndDragons(allSets, types) {
    const seqs = allSets.filter(s => s.type === 'sequence');
    const seqStarts = { m: [], p: [], s: [] };
    seqs.forEach(s => seqStarts[s.tiles[0][1]].push(parseInt(s.tiles[0])));

    seqStarts.m.sort((a,b)=>a-b);
    seqStarts.p.sort((a,b)=>a-b);
    seqStarts.s.sort((a,b)=>a-b);

    ['m','p','s'].forEach(suit => {
        const arr = seqStarts[suit];
        if (arr.length >= 3) {
            let maxStep1 = 1; let currStep1 = 1;
            for(let i=0; i<arr.length-1; i++) { if(arr[i+1] === arr[i]+1) currStep1++; else if(arr[i+1]!==arr[i]) currStep1=1; maxStep1 = Math.max(maxStep1, currStep1); }

            let maxStep2 = 1;
            for(let i=0; i<arr.length-2; i++) {
                if (arr[i+1]===arr[i]+2 && arr[i+2]===arr[i]+4) maxStep2 = 3;
                if (arr[i+1]===arr[i]+1 && arr[i+2]===arr[i]+2) maxStep1 = 3;
            }
            if (arr.length >=4 && maxStep1 >= 4) types.push('pure-step-4');

            if (maxStep1 >= 3 || maxStep2 >= 3) types.push('pure-step-3');
        }
    });

    let mixedStepFound = false;
    const m = seqStarts.m; const p = seqStarts.p; const s = seqStarts.s;

    for (let i of m) {
        for (let j of p) {
            for (let k of s) {
                const arr = [i, j, k].sort((a,b)=>a-b);
                if (arr[1] === arr[0]+1 && arr[2] === arr[1]+1) {
                    mixedStepFound = true;
                }
            }
        }
    }
    if (mixedStepFound) types.push('mixed-step-3');

    let has123 = { m: seqStarts.m.includes(1), p: seqStarts.p.includes(1), s: seqStarts.s.includes(1) };
    let has456 = { m: seqStarts.m.includes(4), p: seqStarts.p.includes(4), s: seqStarts.s.includes(4) };
    let has789 = { m: seqStarts.m.includes(7), p: seqStarts.p.includes(7), s: seqStarts.s.includes(7) };

    if ((has123.m && has456.m && has789.m) || (has123.p && has456.p && has789.p) || (has123.s && has456.s && has789.s)) {
        types.push('pure-dragon');
    }
    if ((has123.m || has123.p || has123.s) && (has456.m || has456.p || has456.s) && (has789.m || has789.p || has789.s)) {
        types.push('mixed-dragon');
    }
}

function detectTerminals(allSets, pair, types, hasWord) {
    const isTerminal = (tile) => {
        if (tile.includes('z')) return true;
        const n = parseInt(tile);
        return n === 1 || n === 9;
    };
    const setHasTerminal = (set) => set.tiles.some(isTerminal);
    const allTriplets = allSets.every(s => s.type === 'triplet');
    const allHaveTerminals = allSets.every(setHasTerminal) && isTerminal(pair[0]);

    if (allHaveTerminals) {
        const hasZ = allSets.some(s => s.tiles[0].includes('z')) || pair[0].includes('z');
        if (!hasZ) {
            if (allTriplets) types.push('qing-lao-tou');
            else types.push('qing-dai-yao');
        } else {
            if (allTriplets) types.push('hun-lao-tou');
            else types.push('hun-dai-yao');
        }
    } else {
        const hasAnyTerminal = allSets.some(setHasTerminal) || isTerminal(pair[0]);
        if (!hasAnyTerminal) types.push('tanyao');
    }

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

// 縮小版麻將牌 (用於說明書)
function createMiniTile(code) {
    const div = document.createElement('div');
    div.className = 'mini-tile'; // CSS 中已定義此 class
    div.innerText = tileMap[code] || '?';

    // 顏色判定
    if (code.includes('m') || code === '7z') div.classList.add('red');
    else if (code.includes('s') || code === '6z') div.classList.add('green');
    else if (code === '5z') div.classList.add('blue');

    return div;
}

// 標準麻將牌
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
        if (!p) return id;
        // 如果有分明/暗，顯示 (X / Y番)
        const fanText = p.fanClosed ? `${p.fan}/${p.fanClosed}` : p.fan;
        return `${p.name} <span style="font-size:0.9em; color:#7f8c8d;">(${fanText}番)</span>`;
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

// --- 渲染番數說明書 (含範例圖片與明暗番數) ---
function renderReferenceTable() {
    const container = document.getElementById('referenceTable');
    container.innerHTML = '';

    // 1. 分類
    const categories = {};
    patternList.forEach(pat => {
        const cat = pat.cat || '未分類';
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(pat);
    });

    // 2. 畫表
    for (const [catName, items] of Object.entries(categories)) {
        const catBlock = document.createElement('div');
        catBlock.className = 'ref-category';

        const title = document.createElement('div');
        title.className = 'ref-cat-title';
        title.innerText = catName;
        catBlock.appendChild(title);

        const table = document.createElement('table');
        table.className = 'ref-table';

        // 表頭
        const thead = document.createElement('thead');
        thead.innerHTML = `<tr><th>牌型名稱</th><th class="desc-col">詳細說明與條件</th><th>範例</th><th class="fan-col">番數(明/暗)</th></tr>`;
        table.appendChild(thead);

        // 表身
        const tbody = document.createElement('tbody');
        items.forEach(pat => {
            const tr = document.createElement('tr');
            tr.className = 'ref-row';

            // 名稱
            const tdName = document.createElement('td');
            tdName.innerHTML = `<strong>${pat.name}</strong>`;

            // 說明
            const tdDesc = document.createElement('td');
            tdDesc.className = 'desc-col';
            tdDesc.innerText = pat.desc;

            // 範例 (視覺化)
            const tdExample = document.createElement('td');
            tdExample.className = 'example-cell';

            if (pat.example && pat.example.length > 0) {
                pat.example.forEach((code, index) => {
                    // 遇到 '+', '或' 這些特殊標記跳過產生圖片
                    if (code === '或' || code.startsWith('+')) {
                        const txt = document.createElement('span');
                        txt.style.margin = "0 4px";
                        txt.style.color = "#888";
                        txt.innerText = code.replace('+', '');
                        tdExample.appendChild(txt);
                    } else {
                        if (index > 0 && index % 3 === 0 && !pat.example[index-1].startsWith('+')) {
                            const spacer = document.createElement('div');
                            spacer.className = 'example-spacer';
                            tdExample.appendChild(spacer);
                        }
                        tdExample.appendChild(createMiniTile(code));
                    }
                });
            } else {
                tdExample.innerHTML = '<span style="color:#ccc; font-size:0.8rem;">(無特定手牌)</span>';
            }

            // 番數 (支援雙番數顯示)
            const tdFan = document.createElement('td');
            tdFan.className = 'fan-col';
            if (pat.fanClosed) {
                tdFan.innerText = `${pat.fan} / ${pat.fanClosed}`;
            } else {
                tdFan.innerText = pat.fan;
            }

            tr.appendChild(tdName);
            tr.appendChild(tdDesc);
            tr.appendChild(tdExample);
            tr.appendChild(tdFan);
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
