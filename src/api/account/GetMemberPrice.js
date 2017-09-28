import Request from '../../utils/request'
import { APP_ENV } from '../../config/app'

const env = APP_ENV === 'pro' ? '' : '-' + APP_ENV

export default async function () {
  try {
    let data = await Request.get({
      url: `//course-api${env}.tinfinite.com/v3/course/get-member-course`
    })

    if (data.code && data.code === 1) {
      let result = data.result
      return Promise.resolve(result)
    } else {
      throw new Error(data.message)
    }
  } catch (err) {
    return Promise.reject(err)
  }
}
