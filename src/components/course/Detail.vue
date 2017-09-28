<template>
  <div>
    <div class="container container-x">
      <div class="col-lg-6 col-lg-offset-3 detail-container">
        <div class="detail detail-banner" id="class-avator-parent">
          <img id="class-avator" data-ignore="1" v-if="info.avatar" v-lazy="info.avatar">
        </div>
        <div class="detail-body detail-title">
          <h4>{{ info.name }}</h4>
        </div>
        <div class="detail-body detail-price">
          <p class="price" v-if="+info.price > 0">
            <img data-ignore="1" src="https://o4a7cbihz.qnssl.com/cover/1f7b0c39-9d7b-47cd-a1ea-837f8d0d3467">
            {{ info.price }}
            <span class="member-price"
            v-if="(info.price - info.memberPrice) > 0 && (+info.memberPrice > 0)">
            会员减{{ info.price - info.memberPrice }}</span>
            <span class="member-price"
            v-if="(+info.memberPrice === 0)">
            会员免费</span>
          </p>
          <p class="price" v-if="+info.price === 0">
            免费
          </p>
        </div>
        <div class="diliver"></div>
        <div class="detail-stop-date">
          <h5>报名截止&nbsp;{{ info.signupDeadline }}</h5>
        </div>
        <div class="detail-body detail-feature" v-if="features && features.length > 0">
          <h4>我们能学到什么</h4>
          <div class="feature-box" v-for="item in features">
            <div class="feature-icon">
              <img data-ignore="1" class="media-object media-object-x" src="https://o4a7cbihz.qnssl.com/cover/edcf90d4-3db9-4ece-a7fb-96a34ac5caca">
               <h4>{{ item.title }}</h4>
            </div>
            <div class="feature-content">
              <p v-html="item.des"></p>
            </div>
          </div>

        </div>
        <div class="detail-course">
          <template v-if="outlines && outlines.length">
            <h4>课程内容</h4>
            <div class="detail-course-content"
            v-for="item in outlines">
              <div class="content-img">
                <img data-ignore="1" class="media-object media-object-x" :src="item.url">
              </div>
              <div class="content-font">
                <h4>{{ item.title }}</h4>
                <p v-html="item.des"></p>
              </div>
            </div>
          </template>
        </div>
        <div class="detail-teacher">
          <template v-if="teacherIntros && teacherIntros.length > 0" >
            <h4>授课老师</h4>
            <div class="teacher-info" v-for="item in teacherIntros">
              <img data-ignore="1" v-lazy="item.content">
              <h5>{{ item.teacherName }}</h5>

              <p v-show="!item.obj.overflow" v-html="item.text">
              </p>

              <p id="openMore" v-show="item.obj.overflow && !textMore">
                <span v-html="item.obj.textCopy"></span>
                <span>...</span>
                <span class="open-more-text" @click="openMore(2)">展开更多</span>
              </p>

              <p id="closeMore" v-show="item.obj.overflow && textMore">
                <span v-html="item.text"></span>
                <span class="open-more-text" @click="openMore(1)">收起</span>
              </p>
            </div>
          </template>

        </div>
        <div class="detail-problem">
          <template v-if="faqs && faqs.length > 0">
            <h4>常见问题</h4>
            <div class="problem-box" v-for="item in faqs">
              <h4>{{ item.title }}</h4>
              <p v-html="item.des"></p>
            </div>
          </template>
          <div v-if="faqs && faqs.length > 0" class="detail-problem-bottom">
          </div>
        </div>
      </div>
      <template v-if="info.status === 2 && xhrEnd">
        <button  class="detail-footer-btn-stop"
          v-if="info.joinStop && (!buy_info && userPower === 0)
          || (info.joinStop && noInApp) ">
          报名已截止
        </button>

        <button class="detail-footer-btn"
          v-if="(buy_info || userPower ===1)"
          @click="goToDetail2">
          进入课程</button>

        <button class="detail-footer-btn"
          v-if="!info.joinStop && ((!buy_info && userPower === 0) || (noInApp))"
          @click="showBuyDialog">
          报名课程</button>
      </template>

      <template v-if="info.status !== 2 && xhrEnd">
        <button  class="detail-footer-btn-stop">
          课程已下架
        </button>
      </template>

    </div>

    <!-- 购买课程完成时的弹窗 成功 -->
    <div class="buy-success-dialog" v-show="buySuccess" @click="hideDialog">
      <div class="success-box">
        <img src="//o4a7cbihz.qnssl.com/picture/2f22acf1-3a4b-4d74-b9d0-9442627dc73e">
        <h4>报名成功</h4>
        <p>好棒！你已成功报名{{ info.name }}课！</p>
      </div>

      <div class="buy-close" @click="hideDialog">
        <img data-ignore="1" src="//o4a7cbihz.qnssl.com/cover/5869d699-fc31-4860-9727-1d60f5ab5fb7">
      </div>
    </div>
    <!-- 购买课程完成时的弹窗 失败 -->
    <div class="buy-fail-dialog" v-show="buyFail" @click="hideDialog">
      <div class="fail-box">
        <img src="//o4a7cbihz.qnssl.com/picture/16dd75ce-6144-45ef-ae99-77399c57926e">
        <h4>报名失败</h4>
        <p>有点糟糕！你报名{{ info.name }}课失败了。</p>
      </div>

      <div class="buy-close" @click="hideDialog">
        <img data-ignore="1" src="//o4a7cbihz.qnssl.com/cover/5869d699-fc31-4860-9727-1d60f5ab5fb7">
      </div>
    </div>
    <!-- 购买课程时的弹窗 -->
    <div class="buy-dialog" v-show="clickBuyDialog">
      <div class="buy-box">
        <div class="buy-head">
          <div class="buy-header">
             <img data-ignore="1" src="https://o4a7cbihz.qnssl.com/cover/1f7b0c39-9d7b-47cd-a1ea-837f8d0d3467">
            <h2 v-if="+isMember === 0">{{ info.price }}</h2>
            <h2 v-if="+isMember === 1">{{ info.memberPrice }}</h2>
          </div>

          <p class="money-much"
          v-if="(+isMember === 0 && my_money >= +info.price) || (+isMember === 1 && my_money >= +info.memberPrice)">
          当前余额&nbsp;{{ my_money }}</p>
          <p class="money-little"
          v-if="(+isMember === 0 && my_money < +info.price) || (+isMember === 1 && my_money < +info.memberPrice)">
          当前余额&nbsp;{{ my_money }}</p>
        </div>
        <div class="buy-body">
          <div class="buy-course-name">
            <p class="name-icon">课程</p>
            <p class="course-name-box">{{ info.name }}</p>
          </div>
          <div class="buy-course-time">
            <p class="time-icon">时间</p>
            <p class="course-time-box">{{ info.startTime }}</p>
          </div>
        </div>
        <button class="buy-btn"
        v-if="(+isMember === 0 && my_money >= +info.price) || (+isMember === 1 && my_money >= +info.memberPrice)"
        @click="buyCourse">
        确认购买</button>

        <button class="buy-btn"
        v-if="(isMember === 0 && my_money < +info.price) || (+isMember === 1 && my_money < +info.memberPrice)"
        @click="Recharge">
        充值</button>
      </div>
      <div class="buy-close" @click="hideBuyDialog">
        <img data-ignore="1" src="//o4a7cbihz.qnssl.com/cover/5869d699-fc31-4860-9727-1d60f5ab5fb7">
      </div>
    </div>
  </div>
</template>

<script>
import cookie from '../../utils/cookie.js'
import sensorsdata from '../../utils/sensorsdata.js'
import Title from '../../utils/setTitle'
import { mapState } from 'vuex'
import { MessageBox } from 'mint-ui'
import Order from '../../utils/order'
import Device from '../../utils/device'
import '../../css/bootstrap.css'
import { APP_ID } from '../../config/app'
import BuyCourse from '../../api/course/BuyCourse'
import $ from 'npm-zepto'
import JSBridge from '../../utils/JSBridge'
import queryUserPower from '../../api/user/QueryUserPower'

export default {
  name: 'Person',
  data () {
    return {
      clickBuyDialog: false,        // 购买成功后的弹窗
      buySuccess: false,             // 购买成功后的弹窗
      buyFail: false,                // 购买失败后的弹窗
      buying: false,                // 表示用户正在购买中
      noInApp: !Device.isNativeApp() && !Device.isNativeWeb(),
      selfAPP: APP_ID !== '',
      userInfo: {},
      textMore: false,
      isMember: 2,
      my_money: 0,
      user_id: '',
      buy_info: false,
      xhrEnd: false,                // 课程详情接口是否请求完毕
      userPower: 2,
      showMemberPrice: false,
      navtitle: '课程'
    }
  },
  async created () {
    this.courseId = this.$route.query.courseId

    if (Device.isNativeApp() || Device.isNativeWeb()) {
      // 获取用户信息
      this.userInfo = JSON.parse(decodeURIComponent(cookie.getCookie('_user_info')))

      if (this.userInfo) {
        this.user_id = this.userInfo.id
        this.isMember = this.userInfo.is_member
      }

      let params = {
        courseId: this.courseId,
        userId: this.user_id
      }

      this.$store.dispatch('getCourseBuyInfo', this.courseId)

      this.userPower = await queryUserPower(params)
    }

    this.$store.dispatch('getCourseInfo', this.courseId)
    this.$store.dispatch('getCourseBanners', this.courseId)
    this.$store.dispatch('getCourseOutlines', this.courseId)
    this.$store.dispatch('getCourseFeatures', this.courseId)
    this.$store.dispatch('getCourseTeacherIntros', this.courseId)
    this.$store.dispatch('getCourseFaqs', this.courseId)

    // 神策数据上报
    sensorsdata.track()
  },
  mounted () {
    // 轮询jsBridge是否加载完成
    let Interval = window.setInterval(() => {
      if (window.tinfiniteBridge) {
        Title.set(this.navtitle)
        // 禁止页面漏黑底
        JSBridge.hideMoreButton(0)
        JSBridge.shouldBounces(0)
        clearInterval(Interval)
      }
      if (this.noInApp) {
        clearInterval(Interval)
      }
    }, 200)

    // // 获取图片高度
    // let heightParent = $('#class-avator-parent').height()
    // let width = $('#class-avator').width()
    // let img = new Image()
    // let heightChild = 0
    // img.src = this.info.avatar
    // // 是否有缓存
    // if (img.complete) {
    //   // 计算图片宽高比，求出高度
    //   heightChild = img.height * (width / img.width)
    // } else {
    //   img.onload = function () {
    //     // 计算图片宽高比，求出高度
    //     heightChild = img.height * (width / img.width)
    //   }
    // }
    // // 如果图片高度大于父级元素，图片高度居中显示
    // if (heightParent < heightChild) {
    //   let marginTop = -(heightChild - heightParent) / 2
    //   $('#class-avator').css('margin-top', marginTop)
    // }
  },
  computed: mapState({
    accountInfo: state => state.accountInfo,
    info: state => state.course.info,
    banners: state => state.course.banners,
    title: state => state.course.title,
    price: state => state.course.price,
    features: state => state.course.features,
    teacherIntros: state => state.course.teacherIntros,
    faqs: state => state.course.faqs,
    outlines: state => state.course.outlines,
    buyInfo: state => state.course.buyInfo
  }),
  watch: {
    info (data) {
      document.title = data.name
      this.navtitle = data.name
      if ((data.price - data.memberPrice) > 0) {
        this.showMemberPrice = true
      }
      this.xhrEnd = true
      let saTitle = `${data.name}课程介绍`
      sensorsdata.saEvent(saTitle)
    },
    accountInfo (data) {
      this.my_money = +data.money
    },
    buyInfo (data) {
      this.buy_info = data
    }
  },
  methods: {
    openMore (num) {
      num === 2 ? (this.textMore = true) : (this.textMore = false)
    },
    // 买完课程通知app
    async purchasedCourse () {
      try {
        await JSBridge.purchasedCourse(this.courseId)
      } catch (err) {
        MessageBox.alert(err.message)
      }
    },
    // 如果钱不够，点击充值去充值页
    Recharge () {
      if (this.noInApp) {
        this.goToDownLoad()
        return
      }
      this.clickBuyDialog = false
      $(document).off('touchmove')
      $('body').css('overflow', 'auto')
      this.$router.replace({path: '/myAccount', query: {from: 'courseDetail', courseId: this.info.id}})
    },
    goToDetail2 () {
      // 如果不是自己的app或者web站跳过来的，就跳到下载页面
      if (this.noInApp) {
        this.goToDownLoad()
        return
      }

      // 购买了课程直接进入课程详情页面，否则提示购买
      if (this.buyInfo || this.userPower === 1 || this.buy_info) {
        this.$router.replace({path: '/courseDetail2', query: {courseId: this.courseId}})
      } else {
        MessageBox.alert('需要购买课程哟~~购买还没开发哟').then(action => {
          console.log('需要购买')
        })
      }
    },
    goToDownLoad () {
      window.location.href = '//m.xinshengdaxue.com/app_download.html'
    },

    _touchmove () {
      $(document).on('touchmove', (e) => {
        e.preventDefault()
      })
      $('body').css('overflow', 'hidden')
    },
    showBuyDialog () {
      if (!Device.isNativeApp() && !Device.isNativeWeb()) {
        this.goToDownLoad()
        return
      }

      let data = {
        app_id: APP_ID,
        user_id: this.user_id
      }
      this.$store.dispatch('getAccountInfo', data)

      this.clickBuyDialog = true
      this._touchmove()
    },
    hideBuyDialog () {
      this.clickBuyDialog = false
      $(document).off('touchmove')
      $('body').css('overflow', 'auto')
    },
    hideDialog () {
      this.buySuccess = false
      this.buyFail = false
      $(document).off('touchmove')
      $('body').css('overflow', 'auto')
    },
    buyCourse () {
      if (this.buying) {
        return
      }
      this.buying = true // 表示用户正在购买中
      let info = Order.buildBuyCommodityOrder(this.info.id)
      try {
        // 直接掉支付的api，不走action，因为数据不需要存储
        BuyCourse(info).then(result => {
          this.hideBuyDialog()
          if (result === true) {
            this.buy_info = true
            this.buySuccess = true
            this.purchasedCourse()
            this.buying = false  // 表示用户已经购买完成

            this._touchmove()
          } else {
            this.buying = false
            this.buyFail = true
            this._touchmove()
          }
        }).catch(err => {
          console.log(err)
          this.buying = false
          this.buyFail = true
        })
      } catch (err) {
        this.buying = false
        this.buyFail = true
        this._touchmove()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import './Detail';
</style>
