import Pingpp from 'pingpp-js'

export default {
  createPayment: function (order) {
    return new Promise(function (resolve, reject) {
      Pingpp.createPayment(order.pay_order, function (result, err) {
        if (result === 'success') {
          resolve(result)
        } else if (result === 'fail') {
          reject(err)
        } else if (result === 'cancel') {
          resolve()
        }
      })
    })
  }
}
