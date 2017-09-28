import _ from 'lodash'
import Request from '../../utils/request'
import { COURSE_PREFIX } from '../../config/app'

export default async function (productId) {
  try {
    let data = await Request.get({
      base: COURSE_PREFIX,
      url: `v3/course/faqs` + '?product_id=' + productId
    })

    if (data.code && data.code === 1) {
      let result = data.result
      let contentTagList = []

      // 整理数据
      result.forEach(item => {
        if (item.contentTag === 1) {
          item.title = item.content
        } else if (item.contentTag === 2) {
          item.des = item.content
        } else {
          throw new Error('do not contentTag')
        }

        contentTagList.push(item.flag)
      })

      // 过滤重复的contentTag
      contentTagList = _.union(contentTagList, contentTagList)

      let finnalResult = []
      contentTagList.forEach(index => {
        let tmp = {}
        result.forEach(item => {
          if (item.flag === index) {
            tmp = _.assign(tmp, item)
          }
        })

        finnalResult.push(tmp)
      })

      // 处理换行符
      for (let i = 0, len = finnalResult.length; i < len; i++) {
        finnalResult[i].des = finnalResult[i].des.replace(/\n/ig, '<br>')
      }

      // 排序
      return Promise.resolve(finnalResult)
    } else {
      throw new Error(data.message)
    }
  } catch (err) {
    return Promise.reject(err)
  }
}
