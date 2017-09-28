import Request from '../../utils/request'
import Cookie from '../../utils/cookie'
import { TM_PREFIX } from '../../config/app'

export default async function () {
  try {
    let userId = Cookie.getCookie('_user_id')
    let data = await Request.get({
      base: TM_PREFIX,
      url: '/moments/userinfo' + '?user_id=' + userId
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
