<style lang="less" scoped>
  @import './index';
</style>

<template>
  <div class="time-study-body">
    <div class="study-header">
      <div class="query-cover">
        <img data-ignore="1" src="//o4a7cbihz.qnssl.com/picture/0b9fcb53-9d10-4448-aa16-2d42983abe59">
      </div>
      <div class="user-header">
        <h4>{{ userFullname }}</h4>
        <div class="head-img">
          <img data-ignore="1" :src="userAvatar">
        </div>
      </div>
    </div>
    <template v-if="list && list.length > 0">
      <div class="query-item" v-for="(item, index) in list" key="index">
        <img class="people-head" data-ignore="1" :src="item.auth_img">
        <div class="query-content">
          <h5>{{ item.fullname }}</h5>
          <p v-show="item.text" class="say-word">
            {{ item.text }}
          </p>
          <template v-if="item.photo && item.photo.length > 0">
            <div v-if="item.photo.length === 3" class="look-world">
              <template v-for="item in item.photo">
                <img data-status="0" :src="item.url | changeHttp">
              </template>

            </div>
            <!-- 1张图的情况 -->
            <div v-if="item.photo.length === 1" class="look-world-1">
              <template v-for="item in item.photo">
                <img data-status="0" :src="item.url | changeHttp">
              </template>
            </div>
            <!-- 4张图的情况 -->
            <div v-if="item.photo.length === 2" class="look-world-2">
              <template v-for="item in item.photo">
                <img data-status="0" :src="item.url | changeHttp">
              </template>
            </div>
          </template>


          <div v-if="item.extend" class="share-world" @click="shareUrl(item.extend.url)">
            <img data-ignore="1" :src="item.extend.icon" alt="封面">
            <p>{{ item.extend.title }}</p>
          </div>
        </div>
      </div>
    </template>

    <loading class="query-loading" v-show="loading && list && list.length > 0"></loading>
    <div class="no-data" v-if="list && list.length === 0 && first === 2">
      3.0之前你没有学习圈动态！
    </div>
    <div class="no-data" v-if="noMore && (list && list.length > 0)">
      没有更多学习圈动态啦！
    </div>
  </div>
</template>

<script>
import Title from '../../utils/setTitle'
import JSBridge from '../../utils/JSBridge'
import '../../utils/AllJSBridge'
import Cookie from '../../utils/cookie'
import { Indicator } from 'mint-ui'
import Device from '../../utils/device'
import $ from 'npm-zepto'
import Loading from '../../commons/loading/'
import sensorsdata from '../../utils/sensorsdata.js'
import MomentsList from '../../api/timemachine/momentsList.js'
import FindByIds from '../../api/user/FindByIds.js'

export default {
  name: 'Person',
  data () {
    return {
      userFullname: '',
      userAvatar: '',
      list: [],
      loading: true,
      page: 1,
      limit: 6,
      noMore: false,
      first: 0,
      android: Device.isAndroid()
    }
  },
  components: {
    Loading
  },
  async created () {
    if (!Cookie.getCookie('_user_id')) {
      window.location.href = '//m.xinshengdaxue.com/app_download.html'
    }
    let ids = [Cookie.getCookie('_user_id')]
    if (ids.length === 1) {
      let userInfo = await FindByIds(ids)
      this.userFullname = userInfo[0].fullname
      this.userAvatar = userInfo[0].avatar
    }
    if (!this.userAvatar) {
      this.userAvatar = '//o4a7cbihz.qnssl.com/picture/8cc7b21c-cf91-4f33-88f0-3e93cf56f338'
    }
    Indicator.open({
      spinnerType: 'fading-circle'
    })
    let params = {
      self: this.$route.query.self || 0,
      page: this.page,
      limit: this.limit
    }
    let data = await MomentsList(params)
    if (data.length > 0) {
      this.first = 1
    } else {
      this.first = 2
    }
    this.makeData(data)
    Indicator.close()

    // 神策数据上报
    sensorsdata.track()
  },
  mounted () {
    document.title = '新生大学时光机'
    // 轮询jsBridge是否加载完成
    let Interval = window.setInterval(() => {
      if (window.tinfiniteBridge) {
        Title.set('新生大学时光机')
        // 禁止页面漏黑底
        JSBridge.shouldBounces(0)
        JSBridge.hideMoreButton(1)
        clearInterval(Interval)
      }
      if (this.noInApp) {
        clearInterval(Interval)
      }
    }, 200)

    // 滚动事件
    $(window).scroll(() => {
      if (this.list.length === 0) {
        return
      }
      let sh = $(window).scrollTop()
      let wh = $(window).height()
      let dh = $(document).height()
      if ((dh === sh + wh) && this.loadbOk) {
        this.loadbOk = false
        this.loading = true
        this.handlePage()
      }
    })
  },
  methods: {
    async makeData (data) {
      if (data.length === 0) {
        this.loadbOk = false
        this.loading = false
        this.noMore = true
        return
      }
      let ids = []
      ids = data.map(item => item.user_id)
      ids = [...new Set(ids)]
      if (ids.length === 0) {
        return
      }
      let userData = await FindByIds(ids)
      let len = userData.length
      let lenList = data.length
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < lenList; j++) {
          if (userData[i].id === data[j].user_id) {
            data[j].auth_img = userData[i].avatar ? userData[i].avatar : '//o4a7cbihz.qnssl.com/picture/8cc7b21c-cf91-4f33-88f0-3e93cf56f338'
            data[j].fullname = userData[i].fullname
          }
        }
      }
      if (this.list.length > 0) {
        this.list = this.list.concat(data)
      } else {
        this.list = [].concat(data)
      }
      this.loadbOk = true
      this.loading = false
      if (this.android) {
        setTimeout(() => {
          this.imgSingleTap()
        }, 100)
      }
    },
    async handlePage () {
      this.page += 1
      let params = {
        page: this.page,
        limit: this.limit,
        self: this.$route.query.self || 0
      }
      let data = await MomentsList(params)

      this.makeData(data)
    },
    shareUrl (url) {
      url ? window.location.href = url : ''
    },
    // 在安卓上给图片添加click事件
    imgSingleTap () {
      let imgs = document.getElementsByTagName('img')
      for (let i of imgs) {
        if (i.parentNode.nodeName === 'a' || i.parentNode.nodeName === 'A' || i.getAttribute('data-ignore') === '1' || i.getAttribute('data-status') === '1') {
          continue
        }
        i.onclick = () => {
          let bridge = window.tinfiniteBridge
          if (bridge && bridge.imgSingleTap) {
            i.setAttribute('data-status', '1')
            bridge.imgSingleTap('http:' + i.getAttribute('src'))
          }
        }
      }
    }
  },
  filters: {
    changeHttp (value) {
      if (!value) {
        return value
      }
      let res = value.match(/^(?:[^/]*)\/\/(.+)/)
      res = res ? ('//' + res[1]) : ''
      return res
    }
  }
}
</script>
