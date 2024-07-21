import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'

interface Info {
  ID: string,
  nickName: string,
  email: string,
  auth: number,
  access: string[],
  login: boolean
}

export const useInfoStore = defineStore('info', {
  state: () => {
    return {
      info: <Info> {
        ID: '',
        nickName: '',
        email: '',
        auth: 0,
        access: [],
        login: false
      }

    }
  },
  actions: {
    setInfo (token: string) {
      const decoded = jwtDecode(token)
      console.log(decoded)
      // this.setSubToInfo(decoded.sub)
      this.info.login = true
    },
    setSubToInfo (sub : any) {
      // this.info.ID = 
      this.info.email = sub[0]
      this.info.nickName = sub[1]
      this.info.access = sub[2]
    },
    searchAccess (functionID:any) {
      return this.info.access.includes(functionID)
    },
    setAccess (val: []) {
      this.info.access = val;
    },
    logout () {
      this.info.ID = ''
      this.info.nickName = ''
      this.info.email = ''
      this.info.auth = 0
    }
  }
})
