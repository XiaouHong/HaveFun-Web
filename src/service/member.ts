import axios, { AxiosPromise } from 'axios'
import * as define from '../utils/define'
import * as Interface from '../utils/interface'

export default class MemberService {
  public register(model: Interface.Register): AxiosPromise<any> {
    return axios({
      method: 'post',
      url: `${define.API_URL}/Member/insert`,
      data: {
        mail: model.mail,
        password: model.password,
        name: model.name,
        nickName: model.nickName,
        note: model.note,
      }
    })
  }

  public login(model: Interface.Login): AxiosPromise<any> {
    return axios({
      method: 'post',
      url: `${define.API_URL}/Member/login`,
      data: {
        mail: model.mail,
        password: model.password
      }
    })
  }
}