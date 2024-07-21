import axios, { AxiosPromise } from 'axios'
import * as define from '../utils/define'
import { LocationQueryValue } from 'vue-router'

export default class LoginService {
  public googleAuthorize(): AxiosPromise<any> {
    return axios({
      method: 'get',
      url: `${define.API_URL}/Authentication/authorize`
    })
  }

  public callback(code: string | LocationQueryValue[], state: string | LocationQueryValue[]): AxiosPromise<any> {
    return axios({
      method: 'post',
      url: `${define.API_URL}/Authentication/callback`,
      data: {
        code: code,
        state: state
      }
    })
  }
}