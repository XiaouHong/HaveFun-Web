import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'

interface Info {
  ID: string,
  nickName: string,
  email: string,
  auth: number,
  access: string,
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
        access: 'A01,P01,C01',
        login: false
      }

    }
  },
  actions: {
    setInfo (token: string) {
      const decoded = jwtDecode(token)
      console.log(decoded)
      this.setSubToInfo(decoded)
    },
    setSubToInfo (decoded : any) {
      this.info.email = decoded.email
      this.info.ID = decoded.nameid
      this.info.access = decoded.sub
      this.info.nickName = decoded.unique_name
      this.info.login = true
    },
    searchAccess (functionID:any) {
      return this.info.access.includes(functionID)
    },
    logout () {
      this.info.ID = ''
      this.info.nickName = ''
      this.info.email = ''
      this.info.auth = 0
      this.info.login = false
    }
  }
})
