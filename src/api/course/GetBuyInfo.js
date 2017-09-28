import Request from '../../utils/request'
import Cookie from '../../utils/cookie'
import { COURSE_PREFIX } from '../../config/app'

// 获取用户是否购买了课程
export default async function (productId) {
  try {
    let userInfo = JSON.parse(decodeURIComponent(Cookie.getCookie('_user_info')))
    if (userInfo.id === '') {
      return
    }
    let data = await Request.get({
      base: COURSE_PREFIX,
      url: `v3/course/check-user-course` + '?product_id=' + productId +
        '&user_id=' + userInfo.id
    })

    if (data.code && data.code === 1) {
      return Promise.resolve(data.result)
    } else {
      return Promise.resolve({private: true})
    }
  } catch (err) {
    return Promise.reject(err)
  }
}
