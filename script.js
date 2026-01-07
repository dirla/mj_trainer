// --- 1. 牌型資料庫 (完整版) ---
const patternList = [
    // === 基礎與字花 ===
    { id: 'no-flower', name: '無花', desc: '沒有花', fan: 2, cat: '基礎與環境' },
    { id: 'has-flower', name: '花', desc: '每有一隻花', fan: 2, cat: '基礎與環境' },
    { id: 'has-honor', name: '字', desc: '每有三隻東/南/西/北/中/發/白 (刻子)', fan: 2, cat: '基礎與環境' },
    { id: 'no-honor', name: '無字', desc: '沒有東/南/西/北/中/發/白', fan: 2, cat: '基礎與環境' },
    { id: 'menqing', name: '門清', desc: '沒有從玩家手中上牌/碰牌', fan: 5, cat: '基礎與環境' },
    { id: 'pinghu', name: '平糊', desc: '全部由順子組成 + 一對眼 (無花無字)', fan: 5, cat: '基礎與環境' },
    { id: 'eye-258', name: '將眼', desc: '眼牌是為二/五/八的數字', fan: 2, cat: '基礎與環境' },

    // === 聽牌與胡牌方式 ===
    { id: 'ready', name: '聽牌', desc: '宣告聽牌,不得更換手牌', fan: 5, cat: '聽牌與胡牌' },
    { id: 'menqing-ready', name: '門清+聽牌', desc: '在門清的情況下宣告聽牌', fan: 15, cat: '聽牌與胡牌' },
    { id: 'ippatsu', name: '一發', desc: '宣告聽牌在該玩家未打出第二隻牌時食胡', fan: 5, cat: '聽牌與胡牌' },
    { id: 'zimo', name: '自摸', desc: '自己摸的牌是食胡的一隻', fan: 1, cat: '聽牌與胡牌' },
    { id: 'menqing-zimo', name: '門清自摸', desc: '門清情況下自摸', fan: 3, cat: '聽牌與胡牌' },
    { id: 'flower-zimo', name: '花摸', desc: '拿到花後補牌食胡', fan: 2, cat: '聽牌與胡牌' },
    { id: 'kong-zimo', name: '槓摸', desc: '槓牌後補牌食胡', fan: 5, cat: '聽牌與胡牌' },
    { id: 'rob-kong', name: '搶槓', desc: '其他玩家明槓自己可以食胡的牌', fan: 5, cat: '聽牌與胡牌' },
    { id: 'full-seek', name: '全求人', desc: '所有牌都是上和碰組成時,食別人打出牌', fan: 30, cat: '聽牌與胡牌' },
    { id: 'half-seek', name: '半求人', desc: '所有牌都是上和碰組成時,自摸', fan: 15, cat: '聽牌與胡牌' },
    { id: 'dark-last', name: '暗絕', desc: '加上所有棄牌,食胡牌是最後一隻', fan: 8, cat: '聽牌與胡牌' },
    { id: 'bright-last', name: '明絕', desc: '只計算所有棄牌,食胡牌是最後一隻', fan: 15, cat: '聽牌與胡牌' },

    // === 步高 (Step High) ===
    { id: 'ming-mixed-step-3', name: '明三色三步高', desc: '以三種花色的三組連順,明牌', fan: 5, cat: '步高與龍' },
    { id: 'an-mixed-step-3', name: '暗三色三步高', desc: '手牌內有以三種花色的三組連順', fan: 10, cat: '步高與龍' },
    { id: 'ming-mixed-step-4', name: '明三色四步高', desc: '以三種花色的四組連順,明牌', fan: 20, cat: '步高與龍' },
    { id: 'an-mixed-step-4', name: '暗三色四步高', desc: '手牌內有以三種花色的四組連順', fan: 30, cat: '步高與龍' },
    { id: 'ming-mixed-step-5', name: '明三色五步高', desc: '以三種花色的五組連順,明牌', fan: 50, cat: '步高與龍' },
    { id: 'an-mixed-step-5', name: '暗三色五步高', desc: '手牌內有以三種花色的五組連順', fan: 80, cat: '步高與龍' },
    
    { id: 'ming-pure-step-3', name: '明一色三步高', desc: '以同一種花色的三組連順,明牌', fan: 15, cat: '步高與龍' },
    { id: 'an-pure-step-3', name: '暗一色三步高', desc: '手牌內有以同一種花色的三組連順', fan: 25, cat: '步高與龍' },
    { id: 'ming-pure-step-4', name: '明一色四步高', desc: '以同一種花色的三組連順,明牌', fan: 50, cat: '步高與龍' },
    { id: 'an-pure-step-4', name: '暗一色四步高', desc: '手牌內有以同一種花色的三組連順', fan: 80, cat: '步高與龍' },
    { id: 'ming-pure-step-5', name: '明一色五步高', desc: '以同一種花色的三組連順,明牌', fan: 120, cat: '步高與龍' },
    { id: 'an-pure-step-5', name: '暗一色五步高', desc: '手牌內有以同一種花色的三組連順', fan: 180, cat: '步高與龍' },

    // === 龍 (Dragons) ===
    { id: 'ming-mixed-dragon', name: '明雜龍', desc: '以三個組合內包含三種花色組成的完整1-9順子,明牌', fan: 8, cat: '步高與龍' },
    { id: 'an-mixed-dragon', name: '暗雜龍', desc: '手牌中有以三個組合內包含三種花色組成的完整1-9順子', fan: 15, cat: '步高與龍' },
    { id: 'ming-pure-dragon', name: '明清龍', desc: '以三個組合內包含同一種花色組成的完整1-9順子,明牌', fan: 10, cat: '步高與龍' },
    { id: 'an-pure-dragon', name: '暗清龍', desc: '手牌中有以三個組合內包含同一種花色組成的完整1-9順子', fan: 20, cat: '步高與龍' },

    // === 混清與對對 ===
    { id: 'toitoi', name: '對對胡', desc: '全部組合皆是刻子', fan: 40, cat: '清混與對對' },
    { id: 'hunyise', name: '混一色', desc: '全副牌以一種花色和番子組成', fan: 40, cat: '清混與對對' },
    { id: 'qingyise', name: '清一色', desc: '全副牌只有一種花色', fan: 100, cat: '清混與對對' },
    { id: 'ziyise', name: '字一色', desc: '全副牌以番子組成', fan: 160, cat: '清混與對對' },

    // === 風與三元 ===
    { id: 'small-3-winds', name: '小三風', desc: '有兩組風牌的刻子和一組風牌的眼', fan: 20, cat: '風與三元' },
    { id: 'big-3-winds', name: '大三風', desc: '有三組風牌的刻子', fan: 40, cat: '風與三元' },
    { id: 'small-3-dragons', name: '小三元', desc: '有紅中發財白板其中兩組的刻子以及餘下的一種作為眼', fan: 30, cat: '風與三元' },
    { id: 'big-3-dragons', name: '大三元', desc: '有紅中發財白板三組刻子', fan: 60, cat: '風與三元' },
    { id: 'small-4-winds', name: '小四喜', desc: '有三組風牌的刻子和一組風牌的眼', fan: 80, cat: '風與三元' },
    { id: 'big-4-winds', name: '大四喜', desc: '有四組風牌的刻子', fan: 120, cat: '風與三元' },

    // === 特殊與雜項 ===
    { id: 'tanyao', name: '斷么', desc: '沒有數字1/9和番子', fan: 8, cat: '特殊與雜項' },
    { id: 'miss-one', name: '缺一門', desc: '缺少筒/索/萬任意一種 (需無番子)', fan: 8, cat: '特殊與雜項' },
    { id: 'miss-five', name: '缺五', desc: '沒有數字五的牌', fan: 8, cat: '特殊與雜項' },
    { id: 'less-5', name: '小於五', desc: '全副牌只由數字1-4的順子或刻子組成', fan: 50, cat: '特殊與雜項' },
    { id: 'more-5', name: '大於五', desc: '全副牌只由數字6-9的順子或刻子組成', fan: 50, cat: '特殊與雜項' },
    { id: 'chicken', name: '雞胡', desc: '食胡時只有一番', fan: 30, cat: '特殊與雜項' },
    { id: 'duck', name: '鴨胡', desc: '自摸時,撇除自摸的番數,只有一番', fan: 15, cat: '特殊與雜項' },
    
    // === 老少/帶么/老頭 ===
    { id: 'laoshao-chow', name: '老少上', desc: '有一組數字123和數字789的組合', fan: 3, cat: '老少與帶么' },
    { id: 'ming-double-laoshao', name: '明雙老少上', desc: '有兩組數字123和數字789的明牌順子', fan: 10, cat: '老少與帶么' },
    { id: 'an-double-laoshao', name: '暗雙老少上', desc: '有兩組在手牌中數字123和數字789的順子', fan: 15, cat: '老少與帶么' },
    { id: 'laoshao-pong', name: '老少碰', desc: '有一組從其他玩家手中碰的刻子數字111和數字999組合', fan: 5, cat: '老少與帶么' },
    { id: 'double-shao-pong', name: '雙少碰', desc: '有兩組從其他玩家手中碰的刻子數字111和數字999組合', fan: 20, cat: '老少與帶么' },
    { id: 'hun-dai-yao', name: '混帶么', desc: '全副牌的每組順子/刻子/眼都包含數字1、9或番子', fan: 30, cat: '老少與帶么' },
    { id: 'qing-dai-yao', name: '清帶么', desc: '只用帶有數字1和9的順子和1/9的眼組成的手牌', fan: 80, cat: '老少與帶么' },
    { id: 'hun-lao-tou', name: '混老頭', desc: '全副牌由數字1、9的刻子和番子組成 (不計對對胡)', fan: 60, cat: '老少與帶么' },
    { id: 'qing-lao-tou', name: '清老頭', desc: '全副牌只由數字1、9的刻子/眼組成 (不計對對胡)', fan: 220, cat: '老少與帶么' },
    { id: 'hun-dai-x', name: '混帶X', desc: '撇除番子,全副手牌的全部組合都有其中一個數字', fan: 30, cat: '老少與帶么' },
    { id: 'quan-dai-x', name: '全帶X', desc: '沒有番子,全副手牌的全部組合都有其中一個數字', fan: 100, cat: '老少與帶么' },

    // === 槓與暗刻 ===
    { id: 'ming-gang', name: '明槓', desc: '用三隻相同牌碰牌或碰牌後再摸到最後一隻用作槓牌', fan: 1, cat: '槓與暗刻' },
    { id: 'an-gang', name: '暗槓', desc: '手持四隻相同牌時槓牌', fan: 2, cat: '槓與暗刻' },
    { id: 'gang-3', name: '三槓', desc: '有三組槓的組合', fan: 30, cat: '槓與暗刻' },
    { id: 'gang-4', name: '四槓', desc: '有四組槓的組合', fan: 60, cat: '槓與暗刻' },
    { id: 'gang-5', name: '五槓', desc: '有五組槓的組合', fan: 120, cat: '槓與暗刻' },
    { id: 'anke-2', name: '二暗刻', desc: '手牌內有兩組刻子', fan: 5, cat: '槓與暗刻' },
    { id: 'anke-3', name: '三暗刻', desc: '手牌內有三組刻子', fan: 15, cat: '槓與暗刻' },
    { id: 'anke-4', name: '四暗刻', desc: '手牌內有四組刻子', fan: 30, cat: '槓與暗刻' },
    { id: 'anke-5', name: '五暗刻', desc: '手牌內有五組刻子', fan: 80, cat: '槓與暗刻' },
    { id: 'kankanhhu', name: '坎坎胡', desc: '門清對對胡 (包對對)', fan: 160, cat: '槓與暗刻' },

    // === 兄弟姊妹 ===
    { id: 'brothers-2', name: '二兄弟', desc: '兩組不同花色但數字相同的刻子', fan: 5, cat: '兄弟姊妹' },
    { id: 'brothers-small-3', name: '小三兄弟', desc: '兩組數字相同的刻子和相同數字的眼', fan: 15, cat: '兄弟姊妹' },
    { id: 'brothers-big-3', name: '大三兄弟', desc: '三組不同花色但數字相同的刻子', fan: 30, cat: '兄弟姊妹' },
    { id: 'sisters-2', name: '二姊妹', desc: '兩組數字相連的刻子', fan: 5, cat: '兄弟姊妹' },
    { id: 'sisters-small-3', name: '小三姊妹', desc: '兩組數字相連的刻子加上數字相連的眼', fan: 10, cat: '兄弟姊妹' },
    { id: 'sisters-big-3', name: '大三姊妹', desc: '三組數字相連的刻子', fan: 20, cat: '兄弟姊妹' },
    { id: 'sisters-small-4', name: '小四姊妹', desc: '三組數字相連的刻子加上數字相連的眼', fan: 35, cat: '兄弟姊妹' },
    { id: 'sisters-big-4', name: '大四姊妹', desc: '四組數字相連的刻子', fan: 50, cat: '兄弟姊妹' },
    { id: 'sisters-small-5', name: '小五姊妹', desc: '四組數字相連的刻子加上數字相連的眼', fan: 70, cat: '兄弟姊妹' },
    { id: 'sisters-big-5', name: '大五姊妹', desc: '五組數字相連的刻子', fan: 90, cat: '兄弟姊妹' },
    { id: 'sisters-small-6', name: '小六姊妹', desc: '五組數字相連的刻子加上數字相連的眼', fan: 120, cat: '兄弟姊妹' },
    
    // === 雜連刻 (Mixed Sisters) ===
    { id: 'mixed-sisters-small-3', name: '小三雜連刻', desc: '兩組由不同花色但數字相連的刻子和數字相連的眼', fan: 8, cat: '兄弟姊妹' },
    { id: 'mixed-sisters-big-3', name: '大三雜連刻', desc: '三組由不同花色但數字相連的刻子', fan: 15, cat: '兄弟姊妹' },
    { id: 'mixed-sisters-small-4', name: '小四雜連刻', desc: '三組由不同花色但數字相連的刻子和數字相連的眼', fan: 25, cat: '兄弟姊妹' },
    { id: 'mixed-sisters-big-4', name: '大四雜連刻', desc: '四組由不同花色但數字相連的刻子', fan: 35, cat: '兄弟姊妹' },
    { id: 'mixed-sisters-small-5', name: '小五雜連刻', desc: '四組由不同花色但數字相連的刻子和數字相連的眼', fan: 50, cat: '兄弟姊妹' },
    { id: 'mixed-sisters-big-5', name: '大五雜連刻', desc: '五組由不同花色但數字相連的刻子', fan: 65, cat: '兄弟姊妹' },
    { id: 'mixed-sisters-small-6', name: '小六雜連刻', desc: '五組由不同花色但數字相連的刻子和數字相連的眼', fan: 90, cat: '兄弟姊妹' },
    
    // === 相逢與般高 ===
    { id: 'xiangfeng-2', name: '二相逢', desc: '兩組不同花色但數字相同的順子', fan: 3, cat: '相逢與般高' },
    { id: 'ming-double-sisters', name: '明雙姊妹', desc: '至少有一個組合是明牌的兩個二相逢', fan: 10, cat: '相逢與般高' },
    { id: 'an-double-sisters', name: '暗雙姊妹', desc: '手牌內的兩個二相逢', fan: 15, cat: '相逢與般高' },
    { id: 'xiangfeng-3', name: '三相逢', desc: '三組不同花色但數字相同的順子', fan: 10, cat: '相逢與般高' },
    { id: 'ming-same-seq-4', name: '明四同順', desc: '四組不同花色但數字相同的順子,明牌', fan: 30, cat: '相逢與般高' },
    { id: 'an-same-seq-4', name: '暗四同順', desc: '手牌內有四組不同花色但數字相同的順子', fan: 50, cat: '相逢與般高' },
    { id: 'ming-same-seq-5', name: '明五同順', desc: '五組不同花色但數字相同的順子,明牌', fan: 80, cat: '相逢與般高' },
    { id: 'an-same-seq-5', name: '暗五同順', desc: '手牌內有五組不同花色但數字相同的順子', fan: 120, cat: '相逢與般高' },
    { id: 'full-sisters', name: '全姊妹', desc: '三相逢和與前面組合不一樣的二相逢 (另+20番)', fan: 20, cat: '相逢與般高' },
    { id: 'ming-pure-full-sisters', name: '明純正全姊妹', desc: '每種花色組合不出現超過兩次的全姊妹,明牌', fan: 40, cat: '相逢與般高' },
    { id: 'an-pure-full-sisters', name: '暗純正全姊妹', desc: '手牌內每種花色組合不出現超過兩次的全姊妹', fan: 60, cat: '相逢與般高' },

    { id: 'ming-bangao', name: '明一般高', desc: '至少有一組明牌,兩組完全相同的順子', fan: 5, cat: '相逢與般高' },
    { id: 'an-bangao', name: '暗一般高', desc: '手牌內的兩組完全相同的順子', fan: 8, cat: '相逢與般高' },
    { id: 'ming-double-bangao', name: '明雙般高', desc: '至少有一個組合明牌的兩個一般高', fan: 20, cat: '相逢與般高' },
    { id: 'an-double-bangao', name: '暗雙般高', desc: '手牌內有兩組一般高', fan: 30, cat: '相逢與般高' },
    { id: 'ming-bangao-3', name: '明三般高', desc: '至少有一組明牌,三組完全相同的順子', fan: 30, cat: '相逢與般高' },
    { id: 'an-bangao-3', name: '暗三般高', desc: '三組完全相同的順子', fan: 50, cat: '相逢與般高' },
    { id: 'ming-bangao-4', name: '明四般高', desc: '至少有一組明牌,四組完全相同的順子', fan: 200, cat: '相逢與般高' },
    { id: 'an-bangao-4', name: '暗四般高', desc: '四組完全相同的順子', fan: 300, cat: '相逢與般高' },
    { id: 'ming-full-bangao', name: '明全般高', desc: '至少有一組明牌,一個三般高+一個一般高', fan: 80, cat: '相逢與般高' },
    { id: 'an-full-bangao', name: '暗全般高', desc: '手牌內有一個三般高+一個一般高', fan: 120, cat: '相逢與般高' },

    // === 嚦咕 (Lik Gu) 系列 ===
    { id: 'ligu', name: '嚦咕嚦咕', desc: '一組刻子加七對眼', fan: 50, cat: '嚦咕系列' },
    { id: 'ligu-seq-3', name: '嚦咕三連對', desc: '在嚦咕嚦咕中數字相連的三對眼', fan: 5, cat: '嚦咕系列' },
    { id: 'ligu-seq-4', name: '嚦咕四連對', desc: '在嚦咕嚦咕中數字相連的四對眼', fan: 10, cat: '嚦咕系列' },
    { id: 'ligu-seq-5', name: '嚦咕五連對', desc: '在嚦咕嚦咕中數字相連的五對眼', fan: 20, cat: '嚦咕系列' },
    { id: 'ligu-seq-6', name: '嚦咕六連對', desc: '在嚦咕嚦咕中數字相連的六對眼', fan: 40, cat: '嚦咕系列' },
    { id: 'ligu-seq-7', name: '嚦咕七連對', desc: '在嚦咕嚦咕中數字相連的七對眼', fan: 80, cat: '嚦咕系列' },
    { id: 'ligu-seq-8', name: '嚦咕八連對', desc: '在嚦咕嚦咕中數字相連的八對眼', fan: 160, cat: '嚦咕系列' },
    { id: 'ligu-3-winds', name: '嚦咕三風', desc: '一組風牌的刻子加兩對不重複風牌的眼', fan: 15, cat: '嚦咕系列' },
    { id: 'ligu-3-dragons', name: '嚦咕三元', desc: '中發白任意一組的刻子加各一對另外兩種的眼', fan: 20, cat: '嚦咕系列' },
    { id: 'ligu-4-winds', name: '嚦咕四喜', desc: '一組風牌的刻子加三對不重複風牌的眼', fan: 30, cat: '嚦咕系列' },
    { id: 'ligu-3-num', name: '嚦咕三數', desc: '所有對眼只包含三個數字', fan: 50, cat: '嚦咕系列' },
    { id: 'ligu-2-num', name: '嚦咕二數', desc: '所有對眼只包含兩個數字', fan: 100, cat: '嚦咕系列' },

    // === 特殊牌型 (13/16) ===
    { id: '13-orphans', name: '十三么', desc: '集齊東南西北中發白和三種花色1至9...', fan: 120, cat: '特殊牌型' },
    { id: '13-orphans-13-wait', name: '十三么十三面聽', desc: '食胡條件與十三么相同,聽十三隻牌', fan: 140, cat: '特殊牌型' },
    { id: '16-unmatched', name: '十六不搭', desc: '東南西北中發白加上每種花色的三個數字...', fan: 50, cat: '特殊牌型' },
    { id: '16-unmatched-16-wait', name: '十六不搭十六面聽', desc: '十六不搭聽十六張牌', fan: 60, cat: '特殊牌型' },
    { id: 'unmatched-3-meet', name: '不搭三相逢', desc: '十六不搭的三種花色的數字都一樣', fan: 15, cat: '特殊牌型' },
    { id: 'unmatched-mixed-dragon', name: '不搭雜龍', desc: '十六不搭三種花色的數字混合組成完整1-9順子', fan: 25, cat: '特殊牌型' },
    { id: 'heaven', name: '天胡', desc: '莊家在第一次摸牌時自摸', fan: 160, cat: '特殊與雜項' },
    { id: 'earth', name: '地胡', desc: '閒家在莊家打出第一隻時食胡', fan: 160, cat: '特殊與雜項' },
    { id: 'human', name: '人胡', desc: '閒家在第一輪時自摸', fan: 130, cat: '特殊與雜項' },
    { id: 'small-5-gate', name: '小五門齊', desc: '有齊萬/筒/索/風/三元其一做眼', fan: 10, cat: '特殊與雜項' },
    { id: 'big-5-gate', name: '大五門齊', desc: '五組有齊萬/筒/索/風/三元', fan: 15, cat: '特殊與雜項' },
    { id: 'small-7-gate', name: '小七門齊', desc: '小五門齊 + 兩種顏色的花', fan: 15, cat: '特殊與雜項' },
    { id: 'big-7-gate', name: '大七門齊', desc: '大五門齊 + 兩種顏色的花', fan: 20, cat: '特殊與雜項' },
    { id: 'double-ron', name: '雙響', desc: '同一隻牌有兩家表明食胡', fan: 5, cat: '特殊與雜項' },
    { id: 'triple-ron', name: '三響', desc: '同一隻牌有三家表明食胡', fan: 10, cat: '特殊與雜項' },
    { id: 'double-ron-rev', name: '雙響反摸', desc: '上一場被雙響後自模', fan: 5, cat: '特殊與雜項' },
    { id: 'triple-ron-rev', name: '三響反摸', desc: '上一場被三響後自模', fan: 10, cat: '特殊與雜項' },
    { id: 'haidi', name: '海底摸月', desc: '牌山最後一隻自摸', fan: 20, cat: '特殊與雜項' },
    { id: 'hedi', name: '河底撈魚', desc: '食出其他玩家打出的本局最後一張牌', fan: 10, cat: '特殊與雜項' },
    { id: 'discard-4', name: '四子內', desc: '在棄牌數只有四或更少時食胡', fan: 50, cat: '特殊與雜項' },
    { id: 'discard-7', name: '七子內', desc: '在棄牌數只有七或更少時食胡', fan: 30, cat: '特殊與雜項' },
    { id: 'discard-10', name: '十子內', desc: '在棄牌數只有十或更少時食胡', fan: 15, cat: '特殊與雜項' },
];

// --- 2. 系統設定 (Unicode) ---
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

// --- 3. 隨機胡牌生成引擎 (升級版：支援姊妹牌生成) ---
function generateNewHand() {
    document.getElementById('resultBox').style.display = 'none';
    document.getElementById('userFan').value = '';
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);

    const winSource = Math.floor(Math.random() * 4);
    const isZimo = (winSource === 0); 
    const flowerCount = Math.floor(Math.random() * 5); 
    const deckTracker = initDeck();

    // === 決定是否強制生成特殊牌型 (姊妹) ===
    const forceSister = Math.random() < 0.25; // 25% 機率嘗試生成姊妹牌
    let preferSuit = ['m', 'p', 's'][Math.floor(Math.random() * 3)];
    
    const sets = [];
    let generatedCount = 0;

    // 如果觸發姊妹模式，先預生成 2-3 組連刻
    if (forceSister) {
        const sisterLen = Math.random() > 0.7 ? 3 : 2; // 2連刻或3連刻
        const startNum = Math.floor(Math.random() * (9 - sisterLen)) + 1; // 確保不越界
        
        // 嘗試生成連刻 (例如 333, 444)
        for (let k = 0; k < sisterLen; k++) {
            const num = startNum + k;
            const t = num + preferSuit;
            if (tryDraw(deckTracker, [t, t, t])) {
                sets.push({ type: 'triplet', tiles: [t, t, t] });
                generatedCount++;
            }
        }
    }

    // 補足剩下的面子 (總共要5組)
    for (let i = generatedCount; i < 5; i++) {
        let success = false;
        let attempt = 0;
        
        while (!success && attempt < 100) { 
            let setType = Math.random() > 0.5 ? 'sequence' : 'triplet';
            // 如果沒強制姊妹，偶爾也偏好刻子以增加自然姊妹機率
            if (!forceSister && Math.random() > 0.7) setType = 'triplet';

            const candidateSet = generateRandomSet(setType, null); // 隨機花色
            
            if (tryDraw(deckTracker, candidateSet.tiles)) {
                sets.push(candidateSet);
                success = true;
            }
            attempt++;
        }
    }

    // 產生 1 組眼
    let pair = [];
    let pairSuccess = false;
    let pairAttempt = 0;
    while (!pairSuccess && pairAttempt < 100) {
        // 如果是姊妹模式，嘗試生成鄰近眼 (做小三姊妹)
        let candidatePair;
        if (forceSister && Math.random() > 0.5) {
            // 嘗試從sets裡找一個數字做鄰居
            // 這裡簡化，直接隨機生成同花色
            candidatePair = generateRandomPair([preferSuit]);
        } else {
            candidatePair = generateRandomPair(null);
        }

        if (tryDraw(deckTracker, candidatePair)) {
            pair = candidatePair;
            pairSuccess = true;
        }
        pairAttempt++;
    }

    // --- 以下為組合並顯示 (保持不變) ---
    const revealedCount = Math.floor(Math.random() * 4); 
    let revealed = [];
    let handSets = [];

    for (let i = 0; i < 5; i++) {
        if (i < revealedCount) {
            let type = isSequence(sets[i].tiles) ? '上' : '碰';
            revealed.push({ tiles: sets[i].tiles, type: type });
        } else {
            handSets.push(sets[i].tiles);
        }
    }

    let handTiles = [];
    handSets.forEach(t => handTiles = handTiles.concat(t));
    handTiles = handTiles.concat(pair);

    const winIndex = Math.floor(Math.random() * handTiles.length);
    const winTile = handTiles[winIndex];
    handTiles.splice(winIndex, 1); 

    handTiles.sort(sortTiles);

    const calculatedTypes = autoCalculateTypes(revealed, handTiles, winTile, isZimo, flowerCount, sets, pair);

    currentHandData = {
        revealed: revealed,
        hand: handTiles,
        win: winTile,
        types: calculatedTypes,
        isZimo: isZimo,
        flowerCount: flowerCount
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
    suits.forEach(s => {
        for (let i = 1; i <= 9; i++) deck[i + s] = 4;
    });
    for (let i = 1; i <= 7; i++) deck[i + 'z'] = 4;
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

function generateRandomSet(type, preferSuit) {
    const suits = ['m', 'p', 's', 'z'];
    let suit = preferSuit || suits[Math.floor(Math.random() * 4)];
    if (suit === 'z') type = 'triplet';

    if (type === 'sequence') {
        const num = Math.floor(Math.random() * 7) + 1;
        return { type: 'sequence', tiles: [num + suit, (num + 1) + suit, (num + 2) + suit] };
    } else {
        let num;
        if (suit === 'z') num = Math.floor(Math.random() * 7) + 1;
        else num = Math.floor(Math.random() * 9) + 1;
        const t = num + suit;
        return { type: 'triplet', tiles: [t, t, t] };
    }
}

function generateRandomPair(preferSuit) {
    const suits = ['m', 'p', 's', 'z'];
    let suit = preferSuit || suits[Math.floor(Math.random() * 4)];
    let num;
    if (suit === 'z') num = Math.floor(Math.random() * 7) + 1;
    else num = Math.floor(Math.random() * 9) + 1;
    const t = num + suit;
    return [t, t];
}

// --- 核心：自動判斷牌型演算法 ---
function autoCalculateTypes(revealed, hand, win, isZimo, flowerCount, allSets, pair) {
    let types = [];
    let fullHand = [...hand, win];
    revealed.forEach(group => fullHand = fullHand.concat(group.tiles));

    // 1. 基礎
    if (flowerCount === 0) types.push('no-flower');
    else types.push('has-flower'); 

    if (isZimo) {
        if (revealed.length === 0) types.push('menqing-zimo');
        else types.push('zimo');
    }
    
    if (!isZimo && revealed.length === 0) types.push('menqing');
    
    if (!isZimo && revealed.length === 4) types.push('full-seek');

    // 2. 花色
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

    const hasOneNine = fullHand.some(t => {
        const n = parseInt(t);
        return t.includes('z') || n === 1 || n === 9;
    });
    if (!hasOneNine) types.push('tanyao');

    // 3. 結構
    const sequenceCount = allSets.filter(s => s.type === 'sequence').length;
    const tripletCount = allSets.filter(s => s.type === 'triplet').length;

    if (tripletCount === 5) types.push('toitoi'); 
    else if (sequenceCount === 5) {
        if (flowerCount === 0 && !hasWord) types.push('pinghu');
    }

    // 4. 三元/四喜/字
    const honorCounts = {};
    fullHand.filter(t => t.includes('z')).forEach(t => honorCounts[t] = (honorCounts[t] || 0) + 1);

    const dragons = ['5z','6z','7z']; 
    const winds = ['1z','2z','3z','4z']; 

    let dragonTriplets = 0; let dragonPairs = 0;
    dragons.forEach(d => {
        if (honorCounts[d] >= 3) dragonTriplets++;
        if (honorCounts[d] === 2) dragonPairs++;
    });

    if (dragonTriplets === 3) types.push('big-3-dragons');
    else if (dragonTriplets === 2 && dragonPairs === 1) types.push('small-3-dragons');

    let windTriplets = 0; let windPairs = 0;
    winds.forEach(w => {
        if (honorCounts[w] >= 3) windTriplets++;
        if (honorCounts[w] === 2) windPairs++;
    });

    if (windTriplets === 4) types.push('big-4-winds');
    else if (windTriplets === 3 && windPairs === 1) types.push('small-4-winds');
    else if (windTriplets === 3) types.push('big-3-winds'); 
    else if (windTriplets === 2 && windPairs === 1) types.push('small-3-winds'); 

    const totalHonorTriplets = dragonTriplets + windTriplets;
    if (totalHonorTriplets > 0) types.push('has-honor');

    // 5. 雞胡/鴨胡
    const majorPatterns = [
        'pinghu', 'toitoi', 'hunyise', 'qingyise', 'ziyise', 
        'tanyao', 'small-3-dragons', 'big-3-dragons', 
        'small-3-winds', 'big-3-winds', 'small-4-winds', 'big-4-winds',
        'has-honor'
    ];
    
    const validFans = types.filter(t => majorPatterns.includes(t));
    if (validFans.length === 0 && flowerCount === 0 && !hasWord) {
        if (isZimo) types.push('duck'); 
        else types.push('chicken'); 
    }
	
	// 6. 姊妹 (連刻) 判斷
    const sisterPatterns = detectSisters(allSets, pair);
    sisterPatterns.forEach(p => types.push(p));

    return types;
}

// --- 輔助函式 ---
function sortTiles(a, b) {
    const suitOrder = { 'm': 0, 'p': 1, 's': 2, 'z': 3 };
    const suitA = a.substr(1);
    const suitB = b.substr(1);
    if (suitA !== suitB) return suitOrder[suitA] - suitOrder[suitB];
    return parseInt(a) - parseInt(b);
}

// --- 輔助：偵測姊妹 (同花色連刻) ---
function detectSisters(allSets, pair) {
    const sisterTypes = [];
    
    // 1. 篩選出刻子 (不含番子，因為姊妹通常指數牌)
    const triplets = allSets.filter(s => s.type === 'triplet' && !s.tiles[0].includes('z'));
    
    // 2. 按花色分組
    const suits = { m: [], p: [], s: [] };
    triplets.forEach(set => {
        const suit = set.tiles[0][1];
        const num = parseInt(set.tiles[0]);
        suits[suit].push(num);
    });

    // 3. 檢查每一門花色
    for (const suit in suits) {
        let nums = suits[suit].sort((a, b) => a - b);
        if (nums.length < 2) continue;

        // 找出最長連續數列
        let maxRun = 1;
        let currentRun = 1;
        // 紀錄連續數列的頭尾，用來判斷「小姊妹」(眼牌是否相連)
        let runStart = nums[0];
        let runEnd = nums[0];

        // 簡單算法：尋找連續組合
        // 注意：這裡假設一副牌同花色刻子不重複(受限於4張牌限制)，所以直接比對即可
        // 但為了嚴謹，我們檢查每相鄰兩個數
        for (let i = 0; i < nums.length - 1; i++) {
            if (nums[i+1] === nums[i] + 1) {
                currentRun++;
            } else {
                currentRun = 1; // 斷掉了，重算
            }
            if (currentRun > maxRun) {
                maxRun = currentRun;
                runEnd = nums[i+1];
                runStart = nums[i+1] - currentRun + 1;
            }
        }

        // 4. 判斷眼牌是否相連 (用於判斷 "小X姊妹")
        let isSmall = false;
        if (pair.length > 0 && pair[0].includes(suit)) { // 眼也是同花色
            const pairNum = parseInt(pair[0]);
            // 眼牌必須接在連續刻子的頭或尾 (例如 222,333 + 眼11 或 眼44)
            if (pairNum === runStart - 1 || pairNum === runEnd + 1) {
                isSmall = true;
            }
        }

        // 5. 推送對應牌型
        if (maxRun === 2) {
            sisterTypes.push('sisters-2'); // 二姊妹
            if (isSmall) sisterTypes.push('sisters-small-3'); // 小三姊妹
        }
        else if (maxRun === 3) {
            sisterTypes.push('sisters-big-3'); // 大三姊妹
            if (isSmall) sisterTypes.push('sisters-small-4'); // 小四姊妹
        }
        else if (maxRun === 4) {
            sisterTypes.push('sisters-big-4'); // 大四姊妹
            if (isSmall) sisterTypes.push('sisters-small-5'); // 小五姊妹
        }
        else if (maxRun === 5) {
            sisterTypes.push('sisters-big-5'); // 大五姊妹
            if (isSmall) sisterTypes.push('sisters-small-6'); // 小六姊妹
        }
    }
    
    return sisterTypes;
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

// --- 新功能 1: 切換分頁 (Tabs) ---
function switchTab(tabName) {
    // 1. 切換按鈕狀態
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`tab-${tabName}`).classList.add('active');

    // 2. 切換顯示內容
    document.getElementById('view-trainer').classList.add('hidden');
    document.getElementById('view-reference').classList.add('hidden');
    
    document.getElementById(`view-${tabName}`).classList.remove('hidden');
}

// --- 新功能 2: 自動生成番數說明書 ---
function renderReferenceTable() {
    const container = document.getElementById('referenceTable');
    container.innerHTML = '';

    // 1. 先將牌型按分類分組 (跟 Checkbox 一樣邏輯)
    const categories = {};
    patternList.forEach(pat => {
        const cat = pat.cat || '未分類';
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(pat);
    });

    // 2. 遍歷分類，建立表格
    for (const [catName, items] of Object.entries(categories)) {
        const catBlock = document.createElement('div');
        catBlock.className = 'ref-category';

        // 標題
        const title = document.createElement('div');
        title.className = 'ref-cat-title';
        title.innerText = catName;
        catBlock.appendChild(title);

        // 表格
        const table = document.createElement('table');
        table.className = 'ref-table';
        
        // 表頭
        const thead = document.createElement('thead');
        thead.innerHTML = `<tr><th>牌型名稱</th><th class="desc-col">詳細說明與條件</th><th class="fan-col">番數</th></tr>`;
        table.appendChild(thead);

        // 內容
        const tbody = document.createElement('tbody');
        items.forEach(pat => {
            const tr = document.createElement('tr');
            tr.className = 'ref-row';
            tr.innerHTML = `
                <td><strong>${pat.name}</strong></td>
                <td class="desc-col">${pat.desc}</td>
                <td class="fan-col">${pat.fan}</td>
            `;
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