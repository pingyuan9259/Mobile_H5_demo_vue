<template>
  <div class="wallet-con">
    <div class="born-group">
      <img data-ignore="1" class="newborn-icon" :src="icon"></img>
      <p class="comment">我的余额</p>
      <h4 class="wallet">{{money}}</h4>
    </div>
    <div class="born-box">
      <div class="center born-item"
      v-for="(item, index) in priceList"
      @click="onSelectedPriceItem(index)"
      :class="{selected: index === selectedItemIndex}">
        <div class="newborn-con"><i class="newborn"></i>{{ parseInt(item.newbornNum/100) }}</div>
        <span class="rmb">￥{{ isIOS ? item.iosPrice : item.price }}元</span>
      </div>
    </div>
    <button class="plus-money" @click="onPay">充 值</button>
    <!-- <p class="wath-born" @click="learnBorn">什么是新生币</p> -->

    <!-- 选择价格和充值出问题 弹窗 -->
    <div class="select-dialog" v-show="selectDialog">
      <div class="dialog-box">
        <img data-ignore="1" src="//o4a7cbihz.qnssl.com/picture/1af223bd-fa2a-469d-b452-69a59e20d481">
        <h4>提示</h4>
        <p>{{ hintDes }}</p>
        <div class="footer-button">
          <p @click="selectPrice">取消</p>
          <button @click="selectPrice">确定</button>
        </div>
      </div>
      <div class="born-close" @click="selectPrice">
        <img data-ignore="1" src="//o4a7cbihz.qnssl.com/cover/1ab91cb4-f87c-491e-924d-31ec5cb7486c">
      </div>
    </div>

    <!-- 支付完成 弹窗 -->
    <div class="born-dialog" v-show="bornDialog">
      <div class="dialog-box">
        <img data-ignore="1" src="//o4a7cbihz.qnssl.com/cover/f922aff2-4551-4053-b13e-32a7684eed91">
        <h4 @click="payStatus">操作完成</h4>
        <p>{{ dialogDes }}</p>
        <div class="footer-button">
          <p @click="payStatus">{{ escDes }}</p>
          <button @click="goOtherPage">{{ buttonDes }}</button>
        </div>
      </div>
      <div class="born-close" @click="payStatus">
        <img data-ignore="1" src="//o4a7cbihz.qnssl.com/cover/1ab91cb4-f87c-491e-924d-31ec5cb7486c">
      </div>
    </div>

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

  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import { Button, Actionsheet, Indicator } from 'mint-ui'
import Title from '../../utils/setTitle'
import PayInfo from '../../config/PayInfo'
import Order from '../../utils/order'
import Buyer from '../../utils/Buyer'
import Device from '../../utils/device'
import CreateNewbornOrder from '../../api/CreateNewbornOrder'
import CreateAppleOrder from '../../api/CreateAppleOrder'
import JSBridge from '../../utils/JSBridge'
import sensorsdata from '../../utils/sensorsdata.js'
import TWEEN from '@tweenjs/tween.js'

Vue.component(Actionsheet.name, Actionsheet)
Vue.component(Button.name, Button)

export default {
  name: 'my_account',
  data () {
    return {
      icon: '//o4a7cbihz.qnssl.com/cover/f922aff2-4551-4053-b13e-32a7684eed91',
      isNative: Device.isNativeApp() || Device.isNativeWeb(),
      isIOS: Device.isIOS(),
      selectedItemIndex: -1,
      bornDialog: false,
      showRecharge: false,
      payMethodDialog: false,
      money: null,
      dialogDes: '购买完成关闭弹窗查看结果吧',
      escDes: '查看余额',
      buttonDes: '继续充值',
      selectDialog: false,       // 选择价格提示
      hintDes: '请选择充值价格'   // 提示文案
    }
  },
  created: async function () {
    this.$store.dispatch('getPriceList')
    this.$store.dispatch('getAccountInfo')
    // 神策数据上报
    sensorsdata.track()
    let saTitle = '余额'
    sensorsdata.saEvent(saTitle)
  },
  mounted () {
    Title.set('余额')
    // 轮询jsBridge是否加载完成
    let Interval = window.setInterval(() => {
      if (window.tinfiniteBridge) {
        // 禁止页面漏黑底
        JSBridge.hideMoreButton(1)
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
    priceList: state => state.priceList,
    accountInfo: state => state.accountInfo,
    isPaying: state => state.isPaying
  }),
  watch: {
    accountInfo (data) {
      this.moneyUpTween(100, this.money, data.money)
    }
  },
  methods: {
    // 钱的特效
    moneyUpTween (time, oldValue, newValue) {
      let _this = this
      let animationFrame
      function animate (time) {
        TWEEN.update(time)
        animationFrame = requestAnimationFrame(animate)
      }
      new TWEEN.Tween({ tweeningNumber: oldValue })
        .easing(TWEEN.Easing.Quadratic.Out)
        .to({ tweeningNumber: newValue }, 1500)
        .onUpdate(function () {
          _this.money = this.tweeningNumber.toFixed(0)
        })
        .onComplete(function () {
          cancelAnimationFrame(animationFrame)
        })
        .start()
      animationFrame = requestAnimationFrame(animate)
    },
    learnBorn () {
      this.$router.replace({path: '/newborn'})
    },
    onSelectedPriceItem: function (index) {
      this.selectedItemIndex = index
    },

    onPay: function () {
      if (this.selectedItemIndex < 0) {
        this.hintDes = '请选择充值价格'
        this.selectDialog = true
        return
      }
      if (Device.isIOS()) {
        this.payByApple()
      } else {
        this.payMethodDialog = true
      }
    },

    payByWeixin: async function () {
      if (this.isPaying) return
      if (this.priceList.length < 1 || this.priceList.length < this.selectedItemIndex) return

      try {
        Indicator.open('创建微信订单...')
        this.setPayingStatus(true)
        let info = Order.buildRechargeOrder(this.priceList[this.selectedItemIndex].id, PayInfo.type.weixin)
        let order = await CreateNewbornOrder(info)
        await Buyer.rechargeByWeixinPay(order)
        this.setPayingStatus(false)
        Indicator.close()
        this.payMethodDialog = false
        // 计时函数，弹出弹框
        this.setTime()
      } catch (err) {
        this.payMethodDialog = false
        this.hintDes = err.message
        this.selectDialog = true
        console.log(err.message)

        this.setPayingStatus(false)
        Indicator.close()
      }
    },
    payByAlipay: async function () {
      if (this.isPaying) return
      if (this.priceList.length < 1 || this.priceList.length < this.selectedItemIndex) return

      try {
        Indicator.open('创建支付宝订单...')
        this.setPayingStatus(true)
        let info = Order.buildRechargeOrder(this.priceList[this.selectedItemIndex].id, PayInfo.type.alipay)
        let order = await CreateNewbornOrder(info)
        await Buyer.rechargeByAliPay(order)
        this.setPayingStatus(false)
        Indicator.close()
        this.payMethodDialog = false
        // 计时函数，弹出弹框
        this.setTime()
      } catch (err) {
        this.payMethodDialog = false
        this.hintDes = err.message
        this.selectDialog = true

        this.setPayingStatus(false)
        Indicator.close()
      }
    },
    payByApple: async function () {
      if (this.isPaying) return
      if (this.priceList.length < 1 || this.priceList.length < this.selectedItemIndex) return

      try {
        Indicator.open('创建苹果订单...')
        this.setPayingStatus(true)
        let order = Order.buildRechargeOrderForApple(
          this.priceList[this.selectedItemIndex].id)

        let iosObj = await CreateAppleOrder(order)
        iosObj.iosProductId = this.priceList[this.selectedItemIndex].iosProductId
        iosObj.type = 0    // 0是新生币， 1是购买会员，2是续费会员
        await Buyer.rechargeByApplePay(iosObj)
        this.setPayingStatus(false)
        Indicator.close()

        // 计时函数，弹出弹框
        this.setTime()
      } catch (err) {
        this.hintDes = err.message
        this.selectDialog = true
        this.setPayingStatus(false)
        Indicator.close()
      }
    },
    setPayingStatus: function (flag) {
      this.$store.dispatch('setPayingStatus', flag)
    },

    // 关闭弹窗
    closeMethodDialog () {
      this.payMethodDialog = false
    },

    // 关闭选择价格弹窗
    selectPrice () {
      this.selectDialog = false
    },

    // 如果是从会员页或者是课程详情页来到充值页，还可以回到之前的页面
    goOtherPage () {
      if (this.buttonDes === '继续充值') {
        this.bornDialog = false
        this.payStatus()
        return
      }
      if (this.$route.query && this.$route.query.from === 'courseDetail') {
        this.$router.replace({path: '/courseDetail', query: {courseId: this.$route.query.courseId}})
      }
      if (this.$route.query && this.$route.query.from === 'buyMember') {
        this.$router.replace({path: '/buyMemberPage'})
      }
    },

    // 获取充值后的新生币数量变化
    async payStatus () {
      this.bornDialog = false
      this.dialogDes = '购买完成关闭弹窗查看结果吧'
      this.buttonDes = '继续充值'
      this.escDes = '查看余额'
      Indicator.open({
        spinnerType: 'fading-circle'
      })
      await this.$store.dispatch('getAccountInfo')
      Indicator.close()
    },

    setTime () {
      setTimeout(() => {
        if (this.$route.query && this.$route.query.from === 'courseDetail') {
          this.dialogDes = '好棒，赶紧去购买课程吧！'
          this.buttonDes = '去选课'
          this.escDes = '我偏不'
        }
        if (this.$route.query && this.$route.query.from === 'buyMember') {
          this.dialogDes = '好棒，赶紧去购买会员吧！'
          this.buttonDes = '回到会员页'
          this.escDes = '我偏不'
        }
        this.bornDialog = true
      }, 5000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../../styles/base-750.less';

.wallet-con {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 0;
  overflow: hidden;
  text-align: center;

  .wath-born {
    text-align: center;
    margin: 0;
    position: absolute;
    left: 50%;
    .margin-left(-90);
    .bottom(40);
    .font-size(26);
    color: #6A7D8D;
    .width(180);
  }
}

.born-box {
  .padding(15, 30, 15, 30);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.plus-money {
  .margin-top(12);
  .width(618);
  .height(84);
  outline: 0;

  .border-radius(42);
  background-color: #FFFFFF;
  border: 1px solid #00D377;
  color: #00D377;
  .font-size(32);
}

.born-item {
  .width(290);
  .height(160);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .margin(20, 25, 20, 30);
  border: 1px solid #E8EEF4;
  .border-radius(8);

  .newborn-con {
    .font-size(40);
    color: #28313B;
    .margin-bottom(8);

    .newborn {
      display: inline-block;
      .width(32);
      .height(32);
      .margin-right(10);
      background-image: url('https://o4a7cbihz.qnssl.com/cover/1f7b0c39-9d7b-47cd-a1ea-837f8d0d3467');
      background-size: cover;
    }
  }
  .rmb {
    color: #a9a9a9;
  }
}

.selected {
  // background-color: #eee;
  border: 1px solid #00D377;
}

.born-group {
  width: 100%;
  text-align: center;
  .padding-top(36);
  img {
    .width(200);
    .height(116);
  }
  .comment {
    color: #97A4B1;
    .font-size(26);
    margin: 0;
    .margin-top(26);
    .margin-bottom(6);
  }

  .wallet {
    margin: 0;
    .height(56);
    color: #474F58;
    .font-size(48);
  }

}

.select-dialog {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100vh;
  .born-close {
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
      .width(120);
      .height(120);
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

.born-dialog {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100vh;
  .born-close {
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
