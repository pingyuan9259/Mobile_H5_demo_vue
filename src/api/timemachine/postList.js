import Request from '../../utils/request'
import Cookie from '../../utils/cookie'
import { TM_PREFIX } from '../../config/app'

export default async function (params) {
  try {
    let time = new Date()
    let userId = Cookie.getCookie('_user_id')
    let url = `/oa/issue?page=${params.page}&limit=${params.limit}&t=${time}`
    if (params && +params.self === 1) {
      url = `/oa/issue?user_id=${userId}&page=${params.page}&limit=${params.limit}&t=${time}`
    }
    let data = await Request.get({
      base: TM_PREFIX,
      url: url
    })

    if (data.code && data.code === 1) {
      return Promise.resolve(data.result)
    } else {
      throw new Error(data.message)
    }
  } catch (err) {
    return Promise.reject(err)
  }
}
