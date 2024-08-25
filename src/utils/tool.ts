export default class Tool {
  // =======================
  // 清除Cookie
  // =======================
  public clearCookie (cookieName: string): void {
    if (document.cookie.indexOf(cookieName) >= 0) {
      let exp: Date = new Date();
      exp.setTime(exp.getTime() + (-1 * 24 * 60 * 60 * 1000));
      document.cookie = `${cookieName}=;expires=${exp.toUTCString()}`
    }
  }

  // =======================
  // 設置Cookie
  // =======================
  public setCookie (cookieName: string, cookieValue: string | number | Date, second: number): void {
    let date: Date = new Date();
    date.setTime(date.getTime() + (second * 1000));
    document.cookie = `${cookieName}=${cookieValue};expires=${date.toUTCString()};`;
  }

  // =======================
  // 讀取Cookie
  // =======================
  public getCookie (cookieName: string): string {
    const count: number = (cookieName.length + 1);
    return document.cookie
                   .split(';')
                   .map((item: string) => item.trim())
                   .filter((item: string) => item.substring(0, count) === `${cookieName}=`)
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
  public generateDownloadAction (file: BlobPart, name: string, mimeType: string): void {
    // 建立物件，接收檔案
    const blob: Blob = new Blob([file], {
      type: mimeType
    });
    let element: HTMLAnchorElement = document.createElement('a');
    // 判斷瀏覽器相容性
    if ('download' in element) {
      let href: string = window.URL.createObjectURL(blob);
      element.href = href;
      element.download = name;
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      window.URL.revokeObjectURL(href);
    } else {
      const nav: any = navigator;
      nav.msSaveBlob(blob, name);
    }
  }
}
