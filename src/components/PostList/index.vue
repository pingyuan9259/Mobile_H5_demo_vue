<style lang="less" scoped>
  @import './index';
</style>

<template>
  <div class="time-post-body">
    <template v-for="item in list">
      <div class="post-item" key="index" @click="lookPostDetail(item._id)">
        <div class="post-content">
          <div class="post-title">
            {{ item.title }}
            <!-- {{ item.cover.substring(35) }} -->
          </div>
          <div class="post-des">
            <div class="post-auth">
              <img data-ignore="1" :src="item.auth_img | changeHttp">
              <span>{{ item.author }}</span>
            </div>
            <div class="post-act">
              <div class="post-look">
                <img data-ignore="1" src="//o4a7cbihz.qnssl.com/unknown/9b565bcc-37f9-4a44-a4ea-903711c88505" alt="浏览数">
                <span>{{ item.pv_count ? item.pv_count : 0}}</span>
              </div>
              <div class="post-like">
                <img data-ignore="1" src="//o4a7cbihz.qnssl.com/unknown/3834180c-99c7-4c8f-95b5-d090c7ef472e" alt="赞数">
                <span>{{ item.vote_count ? item.vote_count : 0 }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="post-cover">
          <img data-ignore="1" :src="item.cover | changeHttp" alt="文章封面">
        </div>
      </div>
      <div class="line-item"></div>
    </template>
    <loading class="post-loading" v-show="loading && (list && list.length > 0)"></loading>
    <div class="no-data" v-if="list && list.length === 0 && first === 2">
      3.0之前你没有发表文章哦！
    </div>
    <div class="no-data" v-if="noMore && (list && list.length > 0)">
      没有更多文章啦！
    </div>
  </div>
</template>

<script>
import Title from '../../utils/setTitle'
import JSBridge from '../../utils/JSBridge'
import { Indicator } from 'mint-ui'
import Cookie from '../../utils/cookie'
import '../../utils/AllJSBridge'
import $ from 'npm-zepto'
import Loading from '../../commons/loading/'
import sensorsdata from '../../utils/sensorsdata.js'
import PostList from '../../api/timemachine/postList.js'
import FindByIds from '../../api/user/FindByIds.js'
import { APP_ENV } from '../../config/app.js'

export default {
  name: 'Person',
  data () {
    return {
      list: [],
      loading: true,
      page: 1,
      limit: 9,
      loadbOk: true,
      noMore: false,
      first: 0
    }
  },
  components: {
    Loading
  },
  async created () {
    if (!Cookie.getCookie('_user_id')) {
      window.location.href = '//m.xinshengdaxue.com/app_download.html'
    }

    Indicator.open({
      spinnerType: 'fading-circle'
    })
    let params = {
      page: this.page,
      limit: this.limit,
      self: this.$route.query.self || 0
    }
    let data = await PostList(params)

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
        let img = new Image()
        img.src = data[i].cover
        img.onload = () => {
          if (img.width > img.height) {
            data[i].cover = data[i].cover + `?imageView2/5/w/${img.height}/h/${img.height}`
          } else {
            data[i].cover = data[i].cover + `?imageView2/5/w/${img.width}/h/${img.width}`
          }
        }
        for (let j = 0; j < lenList; j++) {
          if (userData[i].id === data[j].user_id) {
            data[j].auth_img = userData[i].avatar ? userData[i].avatar : '//o4a7cbihz.qnssl.com/picture/8cc7b21c-cf91-4f33-88f0-3e93cf56f338'
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
    },
    async handlePage () {
      this.page += 1
      let params = {
        page: this.page,
        limit: this.limit,
        self: this.$route.query.self || 0
      }
      let data = await PostList(params)

      this.makeData(data)
    },
    lookPostDetail (id) {
      let env = APP_ENV === 'pro' ? '' : '-' + APP_ENV
      window.location.href = `//h5${env}.xinshengdaxue.com/post_detail.html?id=${id}`
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
