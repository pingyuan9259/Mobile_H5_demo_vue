import Request from '../../utils/request'
import { COURSE_PREFIX } from '../../config/app'

export default async function (productId) {
  try {
    let data = await Request.get({
      base: COURSE_PREFIX,
      url: `v3/course/teacher-intros` + '?product_id=' + productId
    })

    if (data.code && data.code === 1) {
      let result = data.result

      if (result.length > 0) {
        for (let k = 0, len = result.length; k < len; k++) {
          result[k].obj = getStrLenght(result[k].text, 180)
        }
        // 处理老师说明换行
        for (let i = 0, len = result.length; i < len; i++) {
          result[i].text = result[i].text.replace(/\n/ig, '<br>')
          result[i].obj.textCopy = result[i].obj.textCopy.replace(/\n/ig, '<br>')
        }
      }

      return Promise.resolve(result)
    } else {
      throw new Error(data.message)
    }
  } catch (err) {
    return Promise.reject(err)
  }
}

function getStrLenght (message, MaxLenght) {
  let strlenght = 0             // 初始定义长度为0
  let textCopy = []
  message = message.split('')
  for (let i = 0; i < message.length; i++) {
    if (isCN(message[i]) === true) {
      strlenght = strlenght + 2  // 中文为2个字符

      if (strlenght < MaxLenght) {
        textCopy.push(message[i])
      }
    } else {
      strlenght = strlenght + 1  // 英文一个字符

      if (strlenght < MaxLenght) {
        textCopy.push(message[i])
      }
    }
  }
  let obj = {
    textCopy: textCopy.join(''),
    overflow: strlenght > MaxLenght
  }
  return obj
}

function isCN (str) {
  // 判断是不是中文
  let regexCh = /[u00-uff]/
  return !regexCh.test(str)
}
