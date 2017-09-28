import * as types from './mutation-types.js'

export default {
  [types.SAME_COURSE_COUNT] (state, data) {
    state.sameCourseCount = data
  },

  [types.HOME_WORK] (state, data) {
    state.homework = data
  },

  [types.ERROR_MSG] (state, data) {
    state.errorInfo.msg = data
  },
  [types.USER_INFO] (state, data) {
    state.userInfo = data
  },
  [types.MEMBER_INFO] (state, data) {
    state.memberInfo = data
  },
  [types.MEMBER_STATUS] (state, data) {
    state.memberStatus = data
  },
  [types.PRICE_LIST] (state, data) {
    state.priceList = data
  },
  [types.PAY_LOG] (state, data) {
    state.payLog = data
  },
  [types.ACCOUNT_INFO] (state, data) {
    state.accountInfo = data.accountInfo
  },
  [types.PAY_STATUS] (state, status) {
    state.isPaying = status
  },
  [types.MEMBER_COURSE] (state, data) {
    state.memberCourse = data
  },
  [types.BUY_MEMBER_LOG] (state, data) {
    state.buyMemberLog = data
  },
  [types.COURSE_INFO] (state, data) {
    state.course.info = data
  },
  [types.COURSE_BANNERS] (state, data) {
    state.course.banners = data
  },
  [types.COURSE_FEATURES] (state, data) {
    state.course.features = data
  },
  [types.COURSE_TEACHER_INTROS] (state, data) {
    state.course.teacherIntros = data
  },
  [types.COURSE_FAQS] (state, data) {
    state.course.faqs = data
  },
  [types.COURSE_SCHEDULES] (state, data) {
    state.course.schedules = data
  },
  [types.COURSE_OUTLINES] (state, data) {
    state.course.outlines = data
  },
  [types.COURSE_BUYINFO] (state, data) {
    state.course.buyInfo = data
  }
}
