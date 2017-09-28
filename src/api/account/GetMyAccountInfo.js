import Request from '../../utils/request'

export default async function (productId) {
  try {
    let data = await Request.get({
      url: 'v3/wallet/wallet-info'
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
