// 只有網域或IP
const host: string = document.location.host;
// 完整網址 包含站台與頁面名稱
// const href: string = document.location.href;

let base = '';
let sitename = ''

// 判斷是否為正式環境
if (process.env.NODE_ENV === 'production') {
   if (host.indexOf('192.168.0.153') !== -1) {
    base = 'http://192.168.0.153/'
    sitename = 'HaveFun-API'
  } else {
    base = `http://${host}/`;
    sitename = 'HaveFun-API'
  }
} else {
  base = 'http://192.168.0.153'
  sitename = 'HaveFun-API'
  if (host.indexOf('localhost') !== -1) {
    base = 'https://localhost:7121'
    sitename = ''
  } else {
    base = 'http://192.168.0.153'
    sitename = 'HaveFun-API'
  }
}

export const API_URL = `${base}${sitename}`
export const URL = `${base}`