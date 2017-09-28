import Request from '../../utils/request'
import { COURSE_PREFIX } from '../../config/app'

export default async function (productId) {
  try {
    let data = await Request.get({
      base: COURSE_PREFIX,
      url: `v3/course/banners` + '?product_id=' + productId
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
