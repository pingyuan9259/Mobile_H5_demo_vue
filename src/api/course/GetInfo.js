import moment from 'moment'
import Request from '../../utils/request'
import { COURSE_PREFIX } from '../../config/app'

export default async function (productId) {
  try {
    let data = await Request.get({
      base: COURSE_PREFIX,
      url: `v3/course/course-info` + '?product_id=' + productId
    })

    if (data.code && data.code === 1) {
      let info = data.result

      // 报名截止 不能购买
      let now = new Date().getTime()
      if (info.signupDeadline <= now) {
        info.joinStop = true
      } else {
        info.joinStop = false
      }

      info.signupDeadline = moment(info.signupDeadline).format('YYYY.MM.DD')
      info.startTime = moment(info.beginAt).format('YYYY年MM月DD日')
      info.timeLong = moment(info.beginAt).format('MM月DD日') + '-' + moment(info.endAt).format('MM月DD日')
      return Promise.resolve(info)
    } else {
      throw new Error(data.message)
    }
  } catch (err) {
    return Promise.reject(err)
  }
}
