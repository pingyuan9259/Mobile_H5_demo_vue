import Device from './device'
import JSBridge from './JSBridge'
import pingpp from './pingpp'

// 封装所有购买的行为
export default {
  recharge (order) {
    if (Device.isNativeApp()) {
      // 调用android app时，需要把order转换成string，这是android系统的大坑
      if (Device.isAndroid()) {
        order.pay_order = JSON.stringify(order.pay_order)
        return JSBridge.pay(order)
      }
      if (Device.isIOS()) {
        return JSBridge.payforbyNative(order)
      }
    } else {
      return pingpp.createPayment(order)
    }
  },

  rechargeByWeixinPay (order) {
    return this.recharge(order)
  },

  rechargeByAliPay (order) {
    return this.recharge(order)
  },

  rechargeByApplePay (order) {
    return this.recharge(order)
  }
}
