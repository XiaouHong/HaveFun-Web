export default class Tool {
  // =======================
  // 清除Cookie
  // Param : _cookieName = cookie名稱
  // =======================
  public clearCookie (_cookieName: string): void {
    if (document.cookie.indexOf(_cookieName) >= 0) {
      let exp: Date = new Date();
      exp.setTime(exp.getTime() + (-1 * 24 * 60 * 60 * 1000));
      document.cookie = `${_cookieName}=;expires=${exp.toUTCString()}`
    }
  }

  // =======================
  // 設置Cookie
  // Param : _cookieName = cookie名稱
  // Param : _cookieValue = cookie值
  // Param : _second = 秒數
  // =======================
  public setCookie (_cookieName: string, _cookieValue: string | number | Date, _second: number): void {
    let date: Date = new Date();
    date.setTime(date.getTime() + (_second * 1000));
    document.cookie = `${_cookieName}=${_cookieValue};expires=${date.toUTCString()};`;
  }

  // =======================
  // 讀取Cookie
  // Param : _cookieName = cookie名稱
  // =======================
  public getCookie (_cookieName: string): string {
    const count: number = (_cookieName.length + 1);
    return document.cookie
      .split(';')
      .map((item: string) => item.trim())
      .filter((item: string) => item.substring(0, count) === `${_cookieName}=`)
      .map((item: string) => decodeURIComponent(item.substring(count)))[0] || '';
  }

  // =======================
  // 檢查Cookie
  // Param : _cookieName = cookie名稱
  // =======================
  public checkCookie (_cookieName: string): boolean {
    let ret = false
    if (document.cookie.indexOf(_cookieName) >= 0) {
      ret = true
    }
    return ret
  }

  // ====================================
  // 產生下載動作
  // ====================================
  // _data=檔案
  // _name=名稱
  // _type=MIME類型
  public generateDownloadAction (_data: BlobPart, _name: string, _type: string): void {
    // 建立物件，接收檔案
    const blob: Blob = new Blob([_data], {
      type: _type
    });

    // 建立節點及連結
    let element: HTMLAnchorElement = document.createElement('a');

    // 判斷瀏覽器相容性
    if ('download' in element) {
      // Chrome, FireFox, Safari
      let href: string = window.URL.createObjectURL(blob);
      element.href = href;
      element.download = _name;
      element.style.display = 'none';

      // 附加節點
      document.body.appendChild(element);

      // 觸發連結
      element.click();

      // 釋放資源
      document.body.removeChild(element);
      window.URL.revokeObjectURL(href);
    } else {
      let _navigator: any = navigator;
      // IE 10+
      _navigator.msSaveBlob(blob, _name);
    }
  }

  // =======================
  // 檢查瀏覽器
  // =======================
//   public checkBroswer = () => {
//     let str: string = navigator.userAgent;
//     let browser = Enum.BROWSER.CHROME
//     if (str.indexOf('Trident') !== -1) browser = Enum.BROWSER.IE
//     if (str.indexOf('Chrome') !== -1) browser = Enum.BROWSER.CHROME
//     if (str.indexOf('Edge') !== -1) browser = Enum.BROWSER.EDGE
//     return browser
//   }
}
