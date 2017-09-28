<style lang="less" scoped>
  @import './index';
</style>

<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide draw-1">
        <img data-ignore="1" class="xsdx-img" src="//o4a7cbihz.qnssl.com/picture/26651e38-7115-414c-b8fd-db1cc5b678d3">
        <img data-ignore="1" class="time-movie" src="//o4a7cbihz.qnssl.com/unknown/1df64ac9-b732-47b4-b427-f6f7707d0f2e">
        <img data-ignore="1" class="begin-review" src="//o4a7cbihz.qnssl.com/picture/c472b0b4-1782-4d09-9c4f-3f19d1a327e9">
      </div>

      <div class="swiper-slide draw-2">
        <div class="draw-study">
          <img data-ignore="1" src="//o4a7cbihz.qnssl.com/picture/843a7135-eef6-4b9f-b1d6-53452feb065d">
          <h4>学习圈</h4>
        </div>
        <div class="study-content">
          <div class="yellow-block"></div>
          <div class="yellow-content">
            <h2>亲爱的 {{ momentsData.user_name}}</h2>
            <p>这里是新生大学时光机，和世界交流想法，带你重温3.0发布之前的学习圈。</p>
          </div>
        </div>

        <!-- 学习圈 -->
        <div class="study-model-outside">
          <div class="study-model-in">
            <div class="content-left">
              <p>
                共发布<br>
                <span>{{ momentsData.post_num }}</span><br>
                条学习圈状态
              </p>
            </div>
            <div class="content-right">
              <img class="query-status" data-ignore="1" src="//o4a7cbihz.qnssl.com/picture/02dfb50b-cba1-4d79-a628-910156401560">
              <p v-if="momentsData.post_num === 0">其实大家对你很好奇哦</p>
              <p v-else class="null-content"></p>
            </div>
          </div>
        </div>

        <!-- 点赞 -->
        <div class="study-model-outside">
          <div class="study-model-in">
            <div class="content-left">
              <p>
                收获<br>
                <span>{{ momentsData.like_num }}</span><br>
                个赞同
              </p>
            </div>
            <div class="content-right">
              <img class="like-status" data-ignore="1" src="//o4a7cbihz.qnssl.com/picture/e8c68485-985f-464c-b38e-460b82fee727">
              <p v-if="momentsData.like_num === 0">沉默是金 赞是钻石</p>
              <p v-else class="null-content"></p>
            </div>
          </div>
        </div>

        <!-- 评论 -->
        <div class="study-model-outside">
          <div class="study-model-in">
            <div class="content-left">
              <p>
                收获<br>
                <span>{{ momentsData.comment_num }}</span><br>
                个评论
              </p>
            </div>
            <div class="content-right">
              <img class="comment-status" data-ignore="1" src="//o4a7cbihz.qnssl.com/picture/cc218b89-81da-41bf-b533-b69febb88c1c">
              <p v-if="momentsData.comment_num === 0">你就是不一样的烟火</p>
              <p v-else class="null-content"></p>
            </div>
          </div>
        </div>

        <div class="study-btn">
          <button @click="goStudy(1)">回顾我的学习圈</button>
          <button @click="goStudy(0)">回顾所有学习圈</button>
        </div>
      </div>

      <div class="swiper-slide draw-3">
        <div class="draw-study">
          <img data-ignore="1" src="//o4a7cbihz.qnssl.com/picture/843a7135-eef6-4b9f-b1d6-53452feb065d">
          <h4>文章</h4>
        </div>
        <div class="study-content">
          <div class="yellow-block"></div>
          <div class="yellow-content">
            <h2>亲爱的 {{ postData.user_name }}</h2>
            <p>这里是新生大学时光机，与自己久别重逢，共同相遇3.0发布之前的文章。</p>
          </div>
        </div>

        <!-- 学习圈 -->
        <div class="study-model-outside">
          <div class="study-model-in">
            <div class="content-left">
              <p>
                共发布<br>
                <span>{{ postData.post_num }}</span><br>
                篇文章
              </p>
            </div>
            <div class="content-right">
              <img class="query-status" data-ignore="1" src="//o4a7cbihz.qnssl.com/picture/4c3d6b2c-c786-4a3d-9160-9ed7df950667">
              <p v-if="postData.post_num === 0">其实大家对你很好奇哦</p>
              <p v-else class="null-content"></p>
            </div>
          </div>
        </div>

        <!-- 点赞 -->
        <div class="study-model-outside">
          <div class="study-model-in">
            <div class="content-left">
              <p>
                收获<br>
                <span>{{ postData.like_num }}</span><br>
                个赞同
              </p>
            </div>
            <div class="content-right">
              <img class="like-status" data-ignore="1" src="//o4a7cbihz.qnssl.com/picture/e8c68485-985f-464c-b38e-460b82fee727">
              <p v-if="postData.like_num === 0">沉默是金 赞是钻石</p>
              <p v-else class="null-content"></p>
            </div>
          </div>
        </div>

        <!-- 评论 -->
        <div class="study-model-outside">
          <div class="study-model-in">
            <div class="content-left">
              <p>
                收获<br>
                <span>{{ postData.comment_num }}</span><br>
                个评论
              </p>
            </div>
            <div class="content-right">
              <img class="comment-status" data-ignore="1" src="//o4a7cbihz.qnssl.com/picture/cc218b89-81da-41bf-b533-b69febb88c1c">
              <p v-if="postData.comment_num === 0">你就是不一样的烟火</p>
              <p v-else class="null-content"></p>
            </div>
          </div>
        </div>

        <div class="study-btn">
          <button @click="goPost(1)">回顾我的文章</button>
          <button @click="goPost(0)">回顾所有文章</button>
        </div>
      </div>

      <div class="swiper-slide draw-4">
        <div v-if="bronTime" class="draw-bron">
          <div class="draw-box">
            <h4>新生大学时光机</h4>
            <p>
              也许清晨坐享和英语朗读<br>
              已经成为了你的习惯；<br>
              也许你开发的第一个编程项目<br>
              已经开始上线运营；<br>
              也许你的文章变为稳定的一日一更；<br>
              也许你读原版书已经告别了字典……<br>
              <br>
              新生大学时光机<br>
              重温在2.0留下的足迹<br>
              与自己久别重逢<br>
              故事还将未完待续.....
            </p>
            <button @click="makePage">生成我的时光机</button>
          </div>
        </div>
        <div v-show="!bronTime && !drawImageEnd" class="draw-end" id="readyCanvas">
          <div class="draw-content">
            <h4>新生大学时光机</h4>
            <div class="time-name-box">
               <button>我是:{{ momentsData.user_name }}</button>
               <span class="name-line"></span>
            </div>
            <p>共发布 <span>{{ momentsData.post_num }}</span> 条学习圈状态</p>
            <p>收获 <span>{{ momentsData.like_num }}</span> 个赞同</p>
            <p>收获 <span>{{ momentsData.comment_num }}</span> 个评价</p>
            <p><br></p>
            <p>共发布 <span>{{ postData.post_num }}</span> 篇文章</p>
            <p>收获 <span>{{ postData.like_num }}</span> 个赞同</p>
            <p>收获 <span>{{ postData.comment_num }}</span> 个评价</p>
            <p><br></p>
            <button>来自新生大学App</button>
          </div>
        </div>
        <div  v-show="drawImageEnd" class="canvasImage">
          <div class="canvasImage-box">
            <img :src="url">
            <p>点击图片后，长按图片保存到相册</p>
          </div>
        </div>
      </div>

    </div>
    <!-- Add Pagination -->
    <!-- <div class="swiper-pagination"></div> -->
  </div>
</template>

<script>
// import { Indicator } from 'mint-ui'
import Title from '../../utils/setTitle'
import JSBridge from '../../utils/JSBridge'
import $ from 'jquery'
import Device from '../../utils/device'
import Cookie from '../../utils/cookie'
import '../../utils/AllJSBridge'
import '../../styles/swiper-3.4.2.min.css'
import '../../utils/swiper-3.4.2.jquery.min.js'
import sensorsdata from '../../utils/sensorsdata.js'
import MomentsBase from '../../api/timemachine/momentsBase.js'
import PostBase from '../../api/timemachine/postBase.js'
import '../../utils/html3canvas.js'

export default {
  name: 'Person',
  data () {
    return {
      url: '',
      bronTime: true,
      name: '',
      noUse: null,
      postData: {},
      momentsData: {},
      drawImageEnd: false,
      android: Device.isAndroid()
    }
  },
  async created () {
    document.title = '新生大学时光机'
    if (!Cookie.getCookie('_user_id')) {
      window.location.href = '//m.xinshengdaxue.com/app_download.html'
    }
    let userInfo = JSON.parse(decodeURIComponent(Cookie.getCookie('_user_info')))
    this.name = userInfo ? userInfo.fullname : ''

    let dataPost = await PostBase()
    let dataStudy = await MomentsBase()

    if (!dataPost) {
      this.postData = {
        user_name: this.name,       // 姓名
        post_num: 0,                // 发布数量
        like_num: 0,                // 点赞数
        comment_num: 0              // 评论数
      }
    } else {
      this.postData = dataPost
    }

    if (!dataStudy) {
      this.momentsData = {
        user_name: this.name,       // 姓名
        post_num: 0,                // 发布数量
        like_num: 0,                // 点赞数
        comment_num: 0              // 评论数
      }
    } else {
      this.momentsData = dataStudy
    }

    // 神策数据上报
    sensorsdata.track()
  },
  // watch: {
  //   postData
  // },
  mounted () {
    document.title = '新生大学时光机'
    let swiper = new window.Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      direction: 'vertical',
      longSwipesRatio: 0.3,
      touchRatio: 1,
      observer: true, // 修改swiper自己或子元素时，自动初始化swiper
      observeParents: true // 修改swiper的父元素时，自动初始化swiper
    })
    this.noUse = swiper ? '' : ''
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
  },
  methods: {
    makePage () {
      if (this.android) {
        this.bronTime = false
        this.drawImageEnd = false
        return
      }
      this.bronTime = false
      let self = this
      setTimeout(() => {
        window.html2canvas($('#readyCanvas'), {
          // dpi: 288,
          scale: 4,
          onrendered: function (canvas) {
            self.url = canvas.toDataURL()
            self.drawImageEnd = true
          },
          proxy: 'https://o4a7cbihz.qnssl.com/picture/1ee8c33b-66ec-49a7-a642-1b3b7be213df',
          useCORS: true
        })
      }, 1000)
    },
    goStudy (self) {
      if (self === 1) {
        this.$router.push({path: '/studyquery', query: {self: 1}})
      } else {
        this.$router.push({path: '/studyquery', query: {self: 0}})
      }
    },
    goPost (self) {
      if (self === 1) {
        this.$router.push({path: '/postlist', query: {self: 1}})
      } else {
        this.$router.push({path: '/postlist', query: {self: 0}})
      }
    }
  }
}
</script>
