// 构建向服务器请求订单的数据

import { DEVICE_ID, USER_ID } from '../config/app'
import Device from './device'
import PayInfo from '../config/PayInfo'

export default {
  // 构建数据（选择weixin和alipay时，使用该函数）
  // 返回值info最终会送给服务端
  // 大坑：
  // ping++要求，挑用weixin web和支付宝 web时，需要传不同的返回跳转链接，否则会调不起支付
  buildRechargeOrder: function (productId, payType) {
    if (productId === '') {
      return {}
    }

    let info = {
      user_id: USER_ID,
      product_id: productId,
      amount: 1,
      device_id: DEVICE_ID
    }

    let fromChannel = 'web'

    if (Device.isIOS()) {
      fromChannel = Device.IOS
    } else if (Device.isAndroid()) {
      fromChannel = Device.ANDROID
    }

    info.from_channel = fromChannel

    let payChannel = 'unknown'
    if (Device.isNativeApp()) {
      if (payType === PayInfo.type.weixin) {
        payChannel = PayInfo.weixin.num
      } else if (payType === PayInfo.type.alipay) {
        payChannel = PayInfo.alipay.num
      }
    } else if (Device.isNativeWeb()) {
      if (payType === PayInfo.type.weixin) {
        payChannel = PayInfo.weixin_web.num
        info.result_url = 'www.tmall.com'
      } else if (payType === PayInfo.type.alipay) {
        payChannel = PayInfo.alipay_web.num
        info.success_url = 'www.qq.com'
        info.cancel_url = 'www.baidu.com'
      }
    }

    info.pay_channel = payChannel

    return info
  },

  // 创建购买会员订单 --- 微信
  buildBuyMemberOrder: function (productId, payType) {
    if (productId === '') {
      return {}
    }

    let info = {
      user_id: USER_ID,
      product_id: productId,
      pay_channel: 2,               // 1是支付宝 ， 2是微信
      amount: 1,
      client_ip: '127.0.0.1',
      device_id: DEVICE_ID
    }

    let fromChannel = 'web'

    if (Device.isIOS()) {
      fromChannel = Device.IOS
    } else if (Device.isAndroid()) {
      fromChannel = Device.ANDROID
    }

    info.from_channel = fromChannel

    let payChannel = 'unknown'
    if (Device.isNativeApp()) {
      if (payType === PayInfo.type.weixin) {
        payChannel = PayInfo.weixin.num
      } else if (payType === PayInfo.type.alipay) {
        payChannel = PayInfo.alipay.num
      }
    } else if (Device.isNativeWeb()) {
      if (payType === PayInfo.type.weixin) {
        payChannel = PayInfo.weixin_web.num
        info.result_url = 'www.tmall.com'
      } else if (payType === PayInfo.type.alipay) {
        payChannel = PayInfo.alipay_web.num
        info.success_url = 'www.qq.com'
        info.cancel_url = 'www.baidu.com'
      }
    }

    info.pay_channel = payChannel

    return info
  },

  // 创建购买会员订单 --- 支付宝
  buildAlipayBuyMemberOrder: function (productId, payType) {
    if (productId === '') {
      return {}
    }

    let info = {
      user_id: USER_ID,
      product_id: productId,
      pay_channel: 1,               // 1是支付宝 ， 2是微信
      amount: 1,
      client_ip: '127.0.0.1',
      device_id: DEVICE_ID
    }

    let fromChannel = 'web'

    if (Device.isIOS()) {
      fromChannel = Device.IOS
    } else if (Device.isAndroid()) {
      fromChannel = Device.ANDROID
    }

    info.from_channel = fromChannel

    info.success_url = 'www.qq.com'
    info.cancel_url = 'www.baidu.com'

    return info
  },

  // 构建数据（选择苹果支付时，使用该函数）
  // 返回值info最终会通过jsbridge送给IOS app
  buildRechargeOrderForApple: function (productId) {
    if (productId === '') {
      return {}
    }

    let data = {
      user_id: USER_ID,
      product_id: productId,
      amount: 1,
      from_channel: 'ios',
      pay_channel: PayInfo.apple.num,
      device_id: DEVICE_ID
    }
    // iosProductId: iosProductId,
    // let info = {
    //   pay_order: JSON.stringify(data),
    //   pay_channel: PayInfo.apple.num
    // }

    return data
  },

  // 构建购买商品的订单结构，所有的商品都是用这个接口来构建订单的。
  // 该订单的pay_channel默认就是用钱包的
  // 返回值info最终会送给服务端
  buildBuyCommodityOrder: function (productId) {
    if (productId === '') {
      return {}
    }

    let info = {
      user_id: USER_ID,
      product_id: productId,
      pay_channel: PayInfo.wallet.num,
      amount: 1,
      device_id: DEVICE_ID
    }

    let fromChannel = 'unknown'

    if (Device.isIOS()) {
      fromChannel = Device.IOS
    } else if (Device.isAndroid()) {
      fromChannel = Device.ANDROID
    } else {
      fromChannel = Device.WEB
    }

    info.from_channel = fromChannel

    return info
  }
}
