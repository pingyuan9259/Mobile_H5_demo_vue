// 定义初始状态
const state = {
  errorInfo: {
    msg: ''
  },
  userInfo: {}, // 存用户信息
  memberInfo: {}, // 存会员起止时间
  memberStatus: {}, // 存会员会员状态
  priceList: [], // 存充值的价格列表
  payLog: [], // 存支付的历史记录
  accountInfo: {}, // 存我的账户信息
  isPaying: false, // 用户标记当前是否正在处理支付，防止用户误操作产生两个订单
  memberCourse: {},
  buyMemberLog: [],
  course: {
    info: {},
    banners: [],
    features: [],
    teacherIntros: [],
    faqs: [],
    schedules: [],
    outlines: [],
    buyInfo: {},
    sameCourseCount: 0,
    homework: {}
  }
}

export default state
