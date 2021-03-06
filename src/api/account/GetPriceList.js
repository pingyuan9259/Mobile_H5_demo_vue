import Request from '../../utils/request'

export default async function (productId) {
  try {
    let data = await Request.get({
      url: 'v3/wallet/list-newborn-product'
    })

    if (data.code && data.code === 1) {
      let priceList = data.result
      priceList.forEach(function (item) {
        item.price = item.price / 100
        item.iosPrice = item.iosPrice / 100
        return item
      })

      return Promise.resolve(priceList)
    } else {
      throw new Error(data.message)
    }
  } catch (err) {
    return Promise.reject(err)
  }
}
