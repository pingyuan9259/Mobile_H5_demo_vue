// 提示： num字段很重要，不能乱改。
// 服务器是根据数据来判断支付渠道的，如果要修改请联系服务端同学配套修改

export default {
  type: {
    alipay: 'alipay',
    weixin: 'weixin',
    wallet: 'wallet',
    apple: 'apple'
  },
  alipay: {
    name: '支付宝',
    type: 'alipay',
    num: 1
  },
  weixin: {
    name: '微信',
    type: 'wcpay',
    num: 2
  },
  apple: {
    name: '苹果',
    type: 'apple',
    num: 5
  },
  wallet: {
    name: '钱包',
    type: 'wallet',
    num: 6
  },
  weixin_web: {
    name: 'web微信',
    type: 'wcpay_web',
    num: 8
  },
  alipay_web: {
    name: 'web支付宝',
    type: 'alipay_web',
    num: 7
  }
}
