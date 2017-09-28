import Request from '../../utils/request'
import { APP_ENV } from '../../config/app'
import qs from 'qs'

const env = APP_ENV === 'pro' ? '' : '-' + APP_ENV

export default async function (ids) {
  try {
    let data = await Request.post({
      url: `//u${env}.tinfinite.com/user/findByIds`,
      data: qs.stringify({'ids': ids}, { arrayFormat: 'brackets' })
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
