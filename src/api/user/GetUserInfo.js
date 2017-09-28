import Request from '../../utils/request'
import { USER_ID } from '../../config/app'

export default async function () {
  try {
    let data = await Request.get({
      url: 'v3/user/detail/new' + '?id=' + USER_ID
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
