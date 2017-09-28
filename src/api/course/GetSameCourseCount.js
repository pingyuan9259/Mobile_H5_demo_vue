import Request from '../../utils/request'
import { COURSE_PREFIX } from '../../config/app'

export default async function (courseId) {
  try {
    let data = await Request.get({
      base: COURSE_PREFIX,
      url: `v3/course/course-class-count` + '?product_id=' + courseId
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
