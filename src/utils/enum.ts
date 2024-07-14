// =======================
// API 回應狀態
// =======================
export const enum api_result_code {
    // 未知
    unknow = 0,
    // 成功
    success = 1,
    // 參數錯誤
    errorParameter = 2,
    // 憑證過期
    Invalid = 3,
    // 失敗
    fail = 4
}

// =======================
// 瀏覽器
// =======================
export const enum browser {
    ie = 1,
    edge = 2,
    chrome = 3,
    firefox = 4,
}

// =======================
// Cookie
// =======================
export const enum COOKIE {
    TOKEN = 'Token',
}