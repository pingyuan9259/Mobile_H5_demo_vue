<template>
  <div class="buy-container">
    <div>
      <div class="panel-body center header">
        <img data-ignore="1" class="member-icon" v-if="isMember === 1" src="https://o4a7cbihz.qnssl.com/cover/67cb1494-8421-46f2-ab39-98f9bb4beb1b"></img>
        <img data-ignore="1" class="member-icon" v-if="isMember === 0" src="https://o4a7cbihz.qnssl.com/cover/027d9052-8325-461a-a583-214e83d1ab36"></img>
        <!-- <img data-ignore="1" class="member-icon" v-if="isMember === 1" src="https://o4a7cbihz.qnssl.com/cover/3db09b22-77aa-46a9-88f8-7fb830e8221e"></img>
        <img data-ignore="1" class="member-icon" v-if="isMember === 0" src="https://o4a7cbihz.qnssl.com/cover/edffe35d-f16d-4d8d-817c-872e76db21a5"></img> -->
        <span class="sub-tip">VIP年会员</span>
        <p class="pass-time" v-if="isMember === 1">已开通（截至{{ memberInfo.memberTo | time }}）</p>
        <p class="will-pass-time" v-if="isMember === 0"></p>
        <button v-if="isMember === 1" class="on-renew" v-on:click="onPay(2)">
          续费
        </button>
        <button v-if="isMember === 0" class="buy-member" v-on:click="onPay(1)">
          开通会员
        </button>
      </div>
    </div>

    <div class="notification-box">
      <div class="notification">
        <img class="classFree" src="https://o4a7cbihz.qnssl.com/picture/1ca1eb86-242b-470c-8335-72e66529c7f9">
        <div class="notification-item">
          <h5>课程免费</h5>
          <p>新生大学不定期为您提供免费精品课程</p>
        </div>

      </div>
      <div class="notification">
        <img class="discount" src="https://o4a7cbihz.qnssl.com/picture/a9b1d791-5f75-4235-ba13-cbe8ff05b00f">
        <div class="notification-item">
          <h5>独享优惠</h5>
          <p>收费课程价格减免、主题演讲门票优惠</p>
        </div>
      </div>
      <div class="notification">
        <img class="activite" src="https://o4a7cbihz.qnssl.com/picture/16f58426-3135-4776-9424-8a09100602c7">
        <div class="notification-item">
          <h5>专属活动</h5>
          <p>免费参加新生大学在各大城市举办的同学会</p>
        </div>
      </div>
      <div class="notification">
        <img class="power" src="https://o4a7cbihz.qnssl.com/picture/5b705bc0-30e1-4ae9-ad22-70b68bcdc8b2">
        <div class="notification-item">
          <h5>优先权利</h5>
          <p>优先参加合作课程</p>
        </div>
      </div>
    </div>

    <!-- 选择支付方式 -->
    <div class="method-dialog" v-show="payMethodDialog" @click.self="closeMethodDialog">
      <div class="dialog-box">
        <h5>选择付款方式</h5>
        <div class="pay-medthod">
          <div class="pay-wechat" @click="payByWeixin">
            <img data-ignore="1" src="//o4a7cbihz.qnssl.com/cover/afa35cb6-d75a-46c0-8ec6-3e7eac8eff65">
            <h4>微信支付</h4>
          </div>
          <div class="pay-alipay" @click="payByAlipay">
            <img data-ignore="1" src="//o4a7cbihz.qnssl.com/cover/3d0197d1-85fe-4549-aaef-930c3744e21f">
            <h4>支付宝</h4>
          </div>
        </div>
      </div>
    </div>

    <!-- 支付完成 弹窗 -->
    <div class="member-dialog" v-show="memberDialog">
      <div class="dialog-box">
        <img data-ignore="1" src="//o4a7cbihz.qnssl.com/cover/f922aff2-4551-4053-b13e-32a7684eed91">
        <h4 @click="payStatus">操作完成</h4>
        <p>请您关闭弹窗确认会员身份</p>
        <div class="footer-button">
          <p @click="payStatus">取消</p>
          <button @click="payStatus">完成</button>
        </div>
      </div>
      <div class="member-close" @click="payStatus">
        <img data-ignore="1" src="//o4a7cbihz.qnssl.com/cover/1ab91cb4-f87c-491e-924d-31ec5cb7486c">
      </div>
    </div>

    <!-- 支付过程中 弹窗 -->
    <div class="member-dialog" v-show="oldMemberDialog">
      <div class="dialog-box">
        <img data-ignore="1" src="//o4a7cbihz.qnssl.com/cover/f922aff2-4551-4053-b13e-32a7684eed91">
        <h4 @click="payStatus">{{ title }}</h4>
        <p>{{ oldDes }}</p>
        <div class="footer-button">
          <p @click="oldClose">取消</p>
          <button @click="goNext">确定</button>
        </div>
      </div>
      <div class="member-close" @click="oldClose">
        <img data-ignore="1" src="//o4a7cbihz.qnssl.com/cover/1ab91cb4-f87c-491e-924d-31ec5cb7486c">
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Indicator } from 'mint-ui'
import Title from '../../utils/setTitle'
import PayInfo from '../../config/PayInfo'
import Order from '../../utils/order'
import Buyer from '../../utils/Buyer'
import Device from '../../utils/device'
import CreateAppleOrder from '../../api/CreateAppleOrder'
import JSBridge from '../../utils/JSBridge'
import sensorsdata from '../../utils/sensorsdata.js'
import WechatBuyMember from '../../api/account/WeChatBuyMember'
import WechatRenewMember from '../../api/account/WechatRenewMember'
import AlipayBuyMember from '../../api/account/AlipayBuyMember'
import AlipayRenewMember from '../../api/account/AlipayRenewMember'
import Cookie from '../../utils/cookie'
import BuyMember from '../../api/account/BuyMember'
import moment from 'moment'

export default {
  name: 'BuyMemberPage',
  data () {
    return {
      oldMemberDialog: false,
      oldDes: '',
      title: '提示',
      memberDialog: false,
      hintDes: '',
      buyOrRenew: 1,                  // 1是开通会员，2是续费会员
      payMethodDialog: false,
      isMember: 2,
      isBuyMember: 2,
      isNative: Device.isNativeApp() || Device.isNativeWeb(),
      isIOS: Device.isIOS()
    }
  },
  async created () {
    await this.$store.dispatch('getUserInfo')
    this.$store.dispatch('getMemberStatus')
    this.$store.dispatch('getMemberInfo')
    this.$store.dispatch('getAccountInfo')
    this.$store.dispatch('getMemberPrice')
    // 神策数据上报
    sensorsdata.track()
    let saTitle = '会员'
    sensorsdata.saEvent(saTitle)
  },
  mounted () {
    Title.set('会员')
    // 轮询jsBridge是否加载完成
    let Interval = window.setInterval(() => {
      if (window.tinfiniteBridge) {
        // 禁止页面漏黑底
        JSBridge.shouldBounces(0)
        clearInterval(Interval)
      }
      if (this.noInApp) {
        clearInterval(Interval)
      }
    }, 200)
  },
  computed: mapState({
    userInfo: state => state.userInfo,
    memberInfo: state => state.memberInfo,
    memberStatus: state => state.memberStatus,
    accountInfo: state => state.accountInfo,
    memberCourse: state => state.memberCourse,
    isPaying: state => state.isPaying
  }),
  filters: {
    time (val) {
      if (!val) return val
      return moment(val).subtract(1, 'days').format('YYYY.MM.DD')
    }
  },
  watch: {
    userInfo (val) {
      if (val.is_member === 1) {
        this.isMember = 1
      } else if (val.is_member === 0) {
        this.isMember = 0
      }
    },
    memberStatus (val) {
      if (val.onceMember === 0) {
        this.isBuyMember = 0
      } else if (val.onceMember === 1) {
        this.isBuyMember = 1
      }
    }
  },
  methods: {
    onRecharge: function () {
      this.$router.push('/myAccount')
    },

    // 关闭弹窗
    closeMethodDialog () {
      this.payMethodDialog = false
    },

    oldClose () {
      this.oldMemberDialog = false
    },

    payByWeixin: async function () {
      if (this.isPaying) return
      try {
        this.isPaying = true
        Indicator.open('创建微信订单...')
        this.setPayingStatus(true)
        let info = Order.buildBuyMemberOrder(this.memberCourse.id, PayInfo.type.weixin)
        let order = null
        if (this.buyOrRenew === 1) {
          order = await WechatBuyMember(info)
        } else if (this.buyOrRenew === 2) {
          order = await WechatRenewMember(info)
        }

        await Buyer.rechargeByWeixinPay(order)
        this.setPayingStatus(false)
        Indicator.close()
        this.payMethodDialog = false
        this.isPaying = false
        // 计时函数，弹出弹框
        this.setTime()
      } catch (err) {
        this.payMethodDialog = false
        this.hintDes = err.message
        this.selectDialog = true
        console.log(err.message)

        this._setPayingStatus(false)
        Indicator.close()
        this.isPaying = false
      }
    },
    payByAlipay: async function () {
      if (this.isPaying) return
      try {
        this.isPaying = true
        Indicator.open('创建支付宝订单...')
        this.setPayingStatus(true)
        let info = Order.buildAlipayBuyMemberOrder(this.memberCourse.id, PayInfo.type.alipay)
        let order = null
        if (this.buyOrRenew === 1) {
          order = await AlipayBuyMember(info)
        } else if (this.buyOrRenew === 2) {
          order = await AlipayRenewMember(info)
        }

        await Buyer.rechargeByApplePay(order)
        this.setPayingStatus(false)
        Indicator.close()
        this.payMethodDialog = false
        this.isPaying = false
        // 计时函数，弹出弹框
        this.setTime()
      } catch (err) {
        this.payMethodDialog = false
        this.hintDes = err.message
        this.selectDialog = true
        console.log(err.message)

        this._setPayingStatus(false)
        Indicator.close()
        this.isPaying = false
      }
    },
    payByApple: async function () {
      if (this.isPaying) return
      try {
        this.isPaying = true
        Indicator.open('创建苹果订单...')
        this.setPayingStatus(true)
        let order = Order.buildRechargeOrderForApple(
          this.memberCourse.id)

        let iosObj = await CreateAppleOrder(order)
        iosObj.iosProductId = this.memberCourse.id
        // 0是新生币， 1是购买会员，2是续费会员
        this.buyOrRenew === 1 ? iosObj.type = 1 : iosObj.type = 2
        await Buyer.rechargeByApplePay(iosObj)
        this.setPayingStatus(false)
        Indicator.close()
        this.isPaying = false

        // 计时函数，弹出弹框
        this.setTime()
      } catch (err) {
        this.hintDes = err.message
        this.selectDialog = true
        this.setPayingStatus(false)
        Indicator.close()
        this.isPaying = false
      }
    },
    _setPayingStatus: function (flag) {
      this.$store.dispatch('setPayingStatus', flag)
    },

    onPay: function (num) {
      let version = Number(Cookie.getCookie('_version').split('.').join(''))
      if (version < 302) {
        num === 1 ? this.onOldPay() : this.onRenew()
        return
      }
      this.buyOrRenew = num
      if (this.isIOS) {
        this.payByApple()
      } else {
        this.payMethodDialog = true
      }
    },
    onOldPay: function () {
      this.title = '提示'
      if (this.accountInfo.money < this.memberCourse.price) {
        this.oldDes = '余额还差' + (this.memberCourse.price - this.accountInfo.money) + '，请先充值'
        this.oldMemberDialog = true
        return
      }
      this.oldDes = '确认以' + this.memberCourse.price + ' 的价格购买会员吗？'
      this.oldMemberDialog = true
    },

    goNext () {
      if (this.accountInfo.money < this.memberCourse.price) {
        this.oldMemberDialog = false
        this.$router.replace({path: '/myAccount', query: {from: 'buyMember'}})
      } else if (this.accountInfo.money > this.memberCourse.price) {
        let info = Order.buildBuyCommodityOrder(this.memberCourse.id)
        let self = this
        this.oldMemberDialog = false
        Indicator.open('正在支付...')
        // 直接掉支付的api，不走action，因为数据不需要存储
        BuyMember(info).then(result => {
          Indicator.close()
          if (result === true) {
            JSBridge.purchasedVIP()
            self.isMember = 1

            self.oldDes = '恭喜你已成为新生大学会员，奖励你4588新生币，去报名课程吧！'
            self.title = '支付成功'
            self.oldMemberDialog = true
            self.$store.dispatch('getMemberInfo')
            self.$store.dispatch('getMemberStatus')
          } else {
            self.oldDes = '别灰心，稍后重新尝试！'
            self.title = '支付失败'
            self.oldMemberDialog = true
          }
        }).catch(err => {
          Indicator.close()
          console.log(err)
          self.oldDes = '别灰心，稍后重新尝试！'
          self.title = '支付失败'
          self.oldMemberDialog = true
        })
      }
    },

    onRenew: function () {
      this.oldDes = '续费功能预计8月开放，敬请期待。'
      this.title = '提示'
      this.oldMemberDialog = true
    },
    setPayingStatus: function (flag) {
      this.$store.dispatch('setPayingStatus', flag)
    },
    async payStatus () {
      this.memberDialog = false
      Indicator.open({
        spinnerType: 'fading-circle'
      })
      await this.$store.dispatch('getMemberInfo')
      await this.$store.dispatch('getMemberStatus')
      Indicator.close()
    },

    setTime () {
      setTimeout(() => {
        this.memberDialog = true
      }, 5000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import '../../styles/base-750.less';

  .center {
    text-align: center;
  }

  .header {
    background-color: #f7f7f7;
    border-bottom: 1px solid #eff3f6;
    .padding(50);
    position: relative;

    .member-icon {
      .width(192);
      .height(156);
    }

    .sub-tip {
      margin: 0;
      display: block;
      .font-size(56);
      .margin-top(12);
      color: #030303;
    }

    .moment {
      width: 100%;
      .font-size(28);
      color: #6A7D8D;
      position: absolute;
      .top(220);
      .left(0);
    }

    .pay-btn {
      .height(72);
      .margin-top(114);
      .line-height(68);
      background-color: #00D377;
      border-radius: 30px;
    }
    .member {
      .line-height(62);
      color: #00D377;
      background-color: #fff;
      border: 2px solid #00D377;
    }
  }
  .notification-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    overflow: hidden;
    .padding-top(40);

    .notification {
      .margin(0, 0, 40, 0);
      .padding(20);
      display: flex;
      flex-direction: row;
      align-items: center;

      .width(600);

      text-align: left;

      .classFree {
        .width(120);
        .height(120);
        .margin-right(24);
      }

      .discount {
        .width(120);
        .height(98);
        .margin-right(24);
      }

      .activite {
        .width(110);
        .height(120);
        .margin-right(34);
      }

      .power {
        .width(110);
        .height(100);
        .margin-bottom(20);
        .margin-right(34);
      }


      .notification-item {
        h5 {
          margin: 0;
          .font-size(30);
          color: #18344B;
          font-weight: 400;
          .margin-bottom(10);
        }
        p {
          margin: 0;
          font-weight: 400;
          .font-size(26);
          color: #A7B8C3;
        }

      }
    }
  }
  .pass-time {
    .font-size(32);
    .margin-top(22);
    .margin-bottom(40);
    color: #6A7D8D;
  }
  .buy-member {
    outline: 0;
    .width(520);
    .height(84);
    background-color: #00D377;
    color: #FFFFFF;
    .border-radius(42);
    .font-size(32);

    border: 0;
  }
  .will-pass-time {
    .height(80);
    width: 100%;
    margin: 0;
  }
  .on-renew {
    .width(520);
    color: #00D377;
    // .margin-top(12);
    .height(84);
    outline: 0;
    .border-radius(42);
    background-color: #FFFFFF;
    border: 1px solid #00D377;
    color: #00D377;
    .font-size(32);
  }

  .member-dialog {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    .member-close {
      position: absolute;
      bottom: 17px;
      left: 50%;
      .margin-left(-44);
      img {
        .width(88);
        .height(88);
        .border-radius(44);
      }
    }
    .dialog-box {
      .width(530);
      overflow: hidden;
      // .height(422);
      .border-radius(16);
      background-color: #FFFFFF;
      position: absolute;
      top: 40%;
      left: 50%;
      .margin-left(-265);
      .margin-top(-236);
      text-align: center;
      img {
        .margin-top(54);
        .margin-bottom(60);
        .width(200);
        .height(116);
      }
      h4 {
        margin: 0;
        .font-size(40);
        color: #040404;
      }
      p {
        margin: 0;
        .margin-top(22);
        .margin-bottom(64);
        .font-size(26);
        color: #868686;
      }
      .footer-button {
        width: 100%;
        border-top: 1px solid #e9eef3;
        display: flex;
        justify-content: center;
        p {
          margin: 0;
          width: 49%;
          .height(84);
          .line-height(84);
          border-right: 1px solid #e9eef3;
          border-bottom-left-radius: 8px;
        }
        button {
          color: #26a2ff;
          outline: 0;
          background-color: #fff;
          border: 0;
          margin: 0;
          width: 49%;
          .height(84);
          .border-radius(16);
        }
      }
    }
  }

  .method-dialog {
    position: fixed;
    z-index: 11;
    top: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;

    .dialog-box {
      width: 100%;
      .height(400);
      background-color: #FFFFFF;
      position: absolute;
      bottom: 0;
      left: 0;
      text-align: center;
      h5 {
        margin: 0;
        .margin-top(36);
        .margin-bottom(48);
        .font-size(34);
        color: #030303;
      }
      .pay-medthod {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        text-align: center;

        .pay-wechat {
          .margin-left(30);
          .margin-right(25);
          text-align: center;
          .padding-top(42);
          .padding-bottom(48);
          .width(290);
          border: 1px solid #E8EEF4;
          .border-radius(10);

          img {
            .width(64);
            .height(56);
          }
          h4 {
            margin: 0;
            .margin-top(12);
            .font-size(36);
            font-weight: 300;
            color: #030303;

          }
        }

        .pay-alipay {
          .margin-left(30);
          .margin-right(25);
          text-align: center;
          .padding-top(42);
          .padding-bottom(48);
          .width(290);
          border: 1px solid #E8EEF4;
          .border-radius(10);

          img {
            .width(70);
            .height(56);
          }
          h4 {
            margin: 0;
            .margin-top(12);
            .font-size(36);
            font-weight: 300;
            color: #030303;
          }

        }
      }
    }
  }

</style>
