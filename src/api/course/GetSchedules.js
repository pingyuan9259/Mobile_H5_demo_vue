import Request from '../../utils/request'
import { COURSE_PREFIX } from '../../config/app'
import moment from 'moment'

export default async function (params) {
  try {
    let data = await Request.get({
      base: COURSE_PREFIX,
      url: `v3/course/course-schedules` + '?product_id=' + params.courseId + '&page=' + params.page + '&limit=' + params.limit
    })

    if (data.code && data.code === 1) {
      let now = new Date().getTime()
      let len = data.result.rows.length
      let sortObj = {
        id: '',
        minTime: now
      }
      for (let i = 0; i < len; i++) {
        data.result.rows[i].Begin =
          moment(data.result.rows[i].showBegin).format('MM月DD日 HH:mm ')
        data.result.rows[i].End =
          moment(data.result.rows[i].showEnd).format(' HH:mm')

        if (data.result.rows[i].showBegin < now && now < data.result.rows[i].showEnd) {
          sortObj.id = data.result.rows[i].id
        }
        // if (Math.abs(now - data.result.rows[i].showBegin) < sortObj.minTime) {
        //   sortObj.minTime = Math.abs(now - data.result.rows[i].showBegin)
        //   sortObj.id = data.result.rows[i].id
        // }
      }
      data.result.closest = sortObj.id
      return Promise.resolve(data.result)
    } else {
      throw new Error(data.message)
    }
  } catch (err) {
    return Promise.reject(err)
  }
}
