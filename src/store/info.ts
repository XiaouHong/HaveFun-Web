import { defineStore } from 'pinia'
import * as Enum from '../utils/enum'
import { jwtDecode } from 'jwt-decode'

interface Info {
  ID: string,
  name: string,
  account: string,
  auth: number,
  notifyCode: string,
  browser: Enum.browser,
  access: string[],
  login: boolean
}

export const useInfoStore = defineStore('info', {
  state: () => {
    return {
      info: <Info> {
        ID: '',
        name: '',
        account: '',
        auth: 0,
        notifyCode: '',
        access: [],
        browser: Enum.browser.chrome,
        login: false
      }

    }
  },
  actions: {
    setInfo (token: string) {
      const decoded = jwtDecode(token)
      this.setSubToInfo(decoded.sub)
      this.info.login = true
    },
    setSubToInfo (sub : any) {
      console.log(sub)
    //   this.info.name = sub[0]
    //   this.info.ID = sub[1]
    //   this.info.auth = sub[2]
    //   this.info.access = sub[3]
    },
    setBrowser (val: any) {
      this.info.browser = val
    },
    searchAccess (functionID:any) {
      return this.info.access.includes(functionID)
    },
    setAccess (val: []) {
      this.info.access = val;
    },
    logout () {
      this.info.ID = ''
      this.info.name = ''
      this.info.account = ''
      this.info.auth = 0
      this.info.notifyCode = ''
    }
  }
})
