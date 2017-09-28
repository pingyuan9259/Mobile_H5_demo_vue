import axios from 'axios'
import { TOKEN, PREFIX, APP_ID, APP_ENV, USER_ID } from '../config/app'

export default {
  checkParams (params) {
    if (!params.url) {
      throw new Error('无效的请求地址')
    }
  },
  checkBase (params) {
    if (params.base) {
      axios.defaults.baseURL = params.base
    }
  },
  init () {
    axios.defaults.baseURL = PREFIX
    axios.defaults.headers.common['x-app-id'] = APP_ID
    axios.defaults.headers.common['x-user-id'] = USER_ID
    axios.defaults.headers.common['x-access-token'] = TOKEN
  },
  async get (params) {
    this.checkParams(params)
    this.init()
    this.checkBase(params)

    let url = params.url
    delete params.url
    delete params.base

    try {
      let res = await axios({
        method: 'get',
        url: url,
        ...params
      })

      if (APP_ENV !== 'pro') {
        console.log('-------get begin--------')
        console.log(PREFIX)
        console.log(url)
        console.log({...params})
        console.log(res.data)
        console.log('-------get end--------')
      }

      return Promise.resolve(res.data ? res.data : {})
    } catch (err) {
      return Promise.reject(err)
    }
  },
  async post (params) {
    this.checkParams(params)
    this.init()

    try {
      let res = await axios({
        method: 'post',
        url: params.url,
        data: params.data
      })

      if (APP_ENV !== 'pro') {
        console.log('-------get begin--------')
        console.log(PREFIX)
        console.log(params.url)
        console.log(res.data)
        console.log('-------get end--------')
      }

      return Promise.resolve(res.data ? res.data : {})
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
