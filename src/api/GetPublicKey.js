import Request from '../utils/request'
import { DEVICE_ID, APP_ID, USER_ID } from '../config/app'

export default async function () {
  try {
    let result = await Request.post({
      url: '/v3/wallet/get-key',
      data: {
        app_id: APP_ID,
        user_id: USER_ID,
        device_id: DEVICE_ID
      }
    })

    if (result.code && result.code === 1) {
      return Promise.resolve(result.result)
    } else {
      throw new Error(result.message)
    }
  } catch (err) {
    return Promise.reject(err)
  }
}
