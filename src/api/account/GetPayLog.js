import Request from '../../utils/request'
import { USER_ID } from '../../config/app'

export default async function (params) {
  try {
    let data = await Request.get({
      url: 'v3/wallet/order-list?user_id=' + USER_ID + '&offset=' + params.offset + '&limit=' + params.limit
    })

    if (data.code && data.code === 1) {
      let result = {rows: data.result.rows, total: data.result.total}
      return Promise.resolve(result)
    } else {
      throw new Error(data.message)
    }
  } catch (err) {
    return Promise.reject(err)
  }
}
