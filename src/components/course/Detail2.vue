<template>
  <div class="detail2">
    <div class="detail2-box">

      <div class="detail2-avatar" id="class-avator-parent">
        <img id="class-avator" data-ignore="1" v-if="info.avatar" v-lazy="info.avatar">
      </div>
      <div class="detail2-title">
        <h4>{{ info.name }}</h4>
      </div>

      <div class="detail2-teacher" v-if="teacherIntros.length > 0">
        <img data-ignore="1" :src="teacherIntros[0].content">
        <div class="detail-teacher-info">
          <h5>授课老师： {{ teacherIntros[0].teacherName }}</h5>
          <p>{{info.timeLong}}</p>
        </div>
      </div>

      <div class="detail2-navbar">
        <p class="couser-list" :class="{'active': !isItem}" @click="onSelected(1)">课表</p>
        <p class="home-work" :class="{'active': isItem}" @click="onSelected(2)">作业</p>
      </div>
      <div class="couser-list-line">

      </div>

      <div v-show="!isItem" class="course-tabel">
        <h4>课程大纲</h4>

        <div class="detail2-in-live goToLive" @click="onGoToLive()"><p>直播间</p></div>


        <template v-if="courseList && courseList.length > 0">
          <div class="course-item" v-for="(item, index) in courseList">
            <div
            v-if="item.id === closest"
            class="course-line-green">
              <div>
                <img class="goToLive" @click="onGoToLive()" data-ignore="1" src="https://o4a7cbihz.qnssl.com/cover/e831632a-bb79-41ed-982a-b501195931b2">
              </div>
            </div>
            <div
            v-if="item.showEnd < nowTime && item.playbackUrl"
            class="course-line-look">
              <div>
                <img class="agoLive" @click="onAgoLive(item.playbackUrl)" data-ignore="1" src="https://o4a7cbihz.qnssl.com/picture/54b52a77-f479-4ea5-9a47-f63daa165445">
              </div>
            </div>
            <div v-if="item.id !== closest && !item.playbackUrl" class="course-line-white">
              <p>{{ index + 1 }}</p>
            </div>
            <div class="list-item">
              <h4>{{ item.title }}</h4>
              <p v-if="!item.playbackUrl">{{ item.Begin + '-' +item.End }}</p>
              <p v-if="item.playbackUrl" class="live-back-des"> {{ item.playbackDes ? item.playbackDes : '直播回放' }}</p>
            </div>
          </div>
        </template>

        <div class="course-discuss">
          <img data-ignore="1" class="goToClub" @click="onGoToClub" src="https://o4a7cbihz.qnssl.com/cover/f9a1e563-682d-4a79-bdf6-00cf3c0b9fc6">
        </div>
      </div>

      <!-- 作业 -->
      <div v-show="isItem" class="home-work" v-if="homeworkList.length > 0">
        <template v-for="item in homeworkList">
           <div class="homework-item goToHomeworkDetail" @click="goToHomeworkDetail(item.id, item.title)">
            <p class="homework-date">{{ item.createdAt }}</p>
            <p class="homework-title">{{ item.title }}</p>
            <div class="student">
              <template v-if="item.replyVoList.length > 0">
                <div class="student-item" v-for="people in item.replyVoList">
                  <img data-ignore="1" v-lazy="people.avatar || 'https://o4a7cbihz.qnssl.com/picture/6d03b12f-7bef-48bd-8249-60875b47af66'">
                </div>
              </template>
              <p class="student-num" v-if="item.replyNum > 0">{{ item.replyNum }}人交作业</p>
              <p class="student-num-no" v-if="item.replyNum <= 0">还没有人交作业</p>
            </div>
          </div>
        </template>
        <loading v-show="!loadbOk"></loading>
      </div>

      <div class="no-homework" v-if="isItem && haveWork === 0">
        老师还没有布置作业呢
      </div>

    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import { Navbar, TabItem } from 'mint-ui'
import Device from '../../utils/device'
import Title from '../../utils/setTitle'
import JSBridge from '../../utils/JSBridge'
import moment from 'moment'
import findIds from '../../api/user/FindByIds'
import $ from 'npm-zepto'
import Loading from '../../commons/loading/'
import sensorsdata from '../../utils/sensorsdata.js'

Vue.component(Navbar.name, Navbar)
Vue.component(TabItem.name, TabItem)

export default {
  name: 'Person',
  data () {
    return {
      goRoom: true,
      goChannel: true,
      goHomework: true,
      selected: '1',
      courseList: [],
      isItem: false,
      jobId: null,
      noInApp: !Device.isNativeApp() && !Device.isNativeWeb(),
      closest: '',  // 开始时间距离现在最近的课程
      // 为分页准备的数据
      limit: 10,
      page: 1,
      total: 0,
      // 作业分页
      bbs_limit: 10,
      home_limit: 10,
      bbs_page: 1,
      bbs_total: 0,
      // 作业 数据
      homeworkObj: {},
      homeworkList: [],
      student_info: [],
      student_id: [],
      loadbOk: true,
      navtitle: '课程',
      haveWork: 2,
      nowTime: (new Date()).getTime()
    }
  },
  components: {
    Loading
  },
  async created () {
    this.courseId = this.$route.query.courseId

    this.$store.dispatch('getCourseTeacherIntros', this.courseId)
    this.$store.dispatch('getCourseBanners', this.courseId)

    this.$store.dispatch('getSameCourseCount', this.courseId).then((res) => {
      let data = {
        courseId: this.courseId,
        limit: res || 10,
        page: this.page
      }
      this.$store.dispatch('getCourseSchedules', data)
    })

    // 神策数据上报
    sensorsdata.track()

    let data = await this.$store.dispatch('getCourseInfo', this.courseId)

    let homeworkData = {
      bbsId: data.jobId,
      limit: this.bbs_limit,
      page: this.bbs_page
    }

    this.homeworkObj = await this.$store.dispatch('getHomework', homeworkData)
    this.makeHomeworkData()
  },
  mounted () {
    // 轮询jsBridge是否加载完成
    let Interval = window.setInterval(() => {
      if (window.tinfiniteBridge) {
        Title.set(this.navtitle)
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
      if (!this.isItem) {
        return
      }
      let sh = $(window).scrollTop()
      let wh = $(window).height()
      let dh = $(document).height()
      if ((dh === sh + wh) && this.loadbOk && (this.bbs_total > this.home_limit)) {
        this.loadbOk = false
        this.handlePage()
      }
    })
  },
  computed: mapState({
    info: state => state.course.info,
    teacherIntros: state => state.course.teacherIntros,
    banners: state => state.course.banners,
    title: state => state.course.title,
    schedules: state => state.course.schedules,
    count: state => state.course.sameCourseCount,
    homework: state => state.course.homework
  }),
  watch: {
    info (data) {
      document.title = data.name
      this.navtitle = data.name
      this.jobId = data.jobId
      let saTitle = `${data.name}课程详情`
      sensorsdata.saEvent(saTitle)
    },
    count (data) {
      this.limit = data
    },
    schedules (data) {
      this.closest = data.closest
      this.total = data.total
      this.courseList = this.courseList.concat(data.rows)
    },
    homework (data) {
      if (data.rows.length === 0) {
        this.loadbOk = true
      }
    }
  },
  methods: {
    async goToHomeworkDetail (id, title) {
      try {
        if (!this.goHomework) {
          return
        }
        this.goHomework = false
        await JSBridge.goToHomeworkDetail(id, title)
        this.goHomework = true
      } catch (err) {
        this.goHomework = true
      }
    },
    onSelected: function (num) {
      if (num === 1) {
        this.isItem = false
      } else if (num === 2) {
        this.isItem = true
      }
    },
    onGoToClub: async function () {
      try {
        if (!this.goChannel) {
          return
        }
        this.goChannel = false
        await JSBridge.goToClub(this.courseId)
        this.goChannel = true
      } catch (err) {
        this.goChannel = true
      }
    },
    onGoToLive: async function () {
      try {
        if (!this.goRoom) {
          return
        }
        this.goRoom = false
        await JSBridge.goToLive(this.courseId)
        this.goRoom = true
      } catch (err) {
        this.goRoom = true
      }
    },

    async makeHomeworkData () {
      let list = this.homeworkObj.rows
      this.bbs_total = this.homeworkObj.total
      let len = this.homeworkObj.rows.length
      let listId = []

      list.length === 0 ? this.haveWork = 0 : this.haveWork = 2
      // 格式化课程日期
      for (let i = 0; i < len; i++) {
        list[i].createdAt = moment(list[i].createdAt).format('MM月DD日')
        if (list[i].replyVoList.length > 0) {
          let l = list[i].replyVoList.length

          // 处理提交作业的学生 获取交作业的信息 以便获取头像
          for (let j = 0; j < l; j++) {
            this.student_info.push(list[i].replyVoList[j])
            this.student_id.push(list[i].replyVoList[j].fromUserId)
          }
        }
      }

      // 记录上一次数组的长度
      let prevSize = this.homeworkList.length

      this.homeworkList = this.homeworkList.concat(list)

      listId = [...new Set(this.student_id)]

      if (listId.length === 0) {
        return
      }

      let result = await findIds(listId)
      let lenResult = result.length

      for (let i = 0; i < len; i++) {
        if (list[i].replyVoList.length > 0) {
          let l = list[i].replyVoList.length
          for (let j = 0; j < l; j++) {
            for (let k = 0; k < lenResult; k++) {
              if (result[k].id === list[i].replyVoList[j].fromUserId) {
                list[i].replyVoList[j].avatar = result[k].avatar
              }
            }
          }
        }
      }
      // 现在数组的长度
      let size = this.homeworkList.length

      // 获取到头像替换上面的部分数组
      this.homeworkList.splice(prevSize, size)
      this.homeworkList = [].concat(this.homeworkList.concat(list))
    },

    // 分页
    async handlePage () {
      if (this.bbs_total > this.bbs_limit) {
        this.bbs_page += 1
        this.home_limit += 10
        let homeworkData = {
          bbsId: this.jobId,
          limit: this.bbs_limit,
          page: this.bbs_page
        }
        this.homeworkObj = await this.$store.dispatch('getHomework', homeworkData)
        this.makeHomeworkData()

        this.loadbOk = true
      }
    },
    onAgoLive (url) {
      window.localStorage.setItem('pburl', url)
      this.$router.push({path: '/liveback', query: {name: this.info.name}})
    }
  }
}
</script>

<style lang="less" scoped>
  @import './Detail2';
</style>
