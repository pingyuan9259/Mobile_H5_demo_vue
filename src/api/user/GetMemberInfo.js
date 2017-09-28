import Request from '../../utils/request'
import { APP_ENV, USER_ID } from '../../config/app'

const env = APP_ENV === 'pro' ? '' : '-' + APP_ENV

export default async function () {
  try {
    let data = await Request.get({
      url: `//course-api${env}.tinfinite.com/v3/course/user-member-from-to?user_id=${USER_ID}`
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
