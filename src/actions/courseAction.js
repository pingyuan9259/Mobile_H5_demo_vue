// 分发actions，页面的action同意dispatch到此进行逻辑处理

import * as types from '../store/mutation-types.js'
import handleError from '../utils/HandleError'
import GetBanners from '../api/course/GetBanners'
import GetInfo from '../api/course/GetInfo'
import GetFeatures from '../api/course/GetFeatures'
import GetTeacherintros from '../api/course/GetTeacherIntros'
import GetFaqs from '../api/course/GetFaqs'
import GetSchedules from '../api/course/GetSchedules'
import GetOutlines from '../api/course/GetOutlines'
import GetBuyInfo from '../api/course/GetBuyInfo'
import GetSameCourseCount from '../api/course/GetSameCourseCount'
import GetHomework from '../api/course/GetHomework'

export const getHomework = async ({commit}, params) => {
  try {
    let data = await GetHomework(params)
    commit(types.HOME_WORK, data)
    return Promise.resolve(data)
  } catch (err) {
    handleError(err, commit)
  }
}

// 每一个课程有多少作业数
export const getSameCourseCount = async ({commit}, courseId) => {
  try {
    let data = await GetSameCourseCount(courseId)
    commit(types.SAME_COURSE_COUNT, data)
    return Promise.resolve(data)
  } catch (err) {
    handleError(err, commit)
  }
}

export const getCourseInfo = async ({commit}, courseId) => {
  try {
    let data = await GetInfo(courseId)
    commit(types.COURSE_INFO, data)
    return Promise.resolve(data)
  } catch (err) {
    handleError(err, commit)
  }
}

export const getCourseBanners = async ({commit}, courseId) => {
  try {
    let data = await GetBanners(courseId)
    commit(types.COURSE_BANNERS, data)
  } catch (err) {
    handleError(err, commit)
  }
}

export const getCourseFeatures = async ({commit}, courseId) => {
  try {
    let data = await GetFeatures(courseId)
    commit(types.COURSE_FEATURES, data)
  } catch (err) {
    handleError(err, commit)
  }
}

export const getCourseTeacherIntros = async ({commit}, courseId) => {
  try {
    let data = await GetTeacherintros(courseId)
    commit(types.COURSE_TEACHER_INTROS, data)
  } catch (err) {
    handleError(err, commit)
  }
}

export const getCourseFaqs = async ({commit}, courseId) => {
  try {
    let data = await GetFaqs(courseId)
    commit(types.COURSE_FAQS, data)
  } catch (err) {
    handleError(err, commit)
  }
}

export const getCourseSchedules = async ({commit}, params) => {
  try {
    let data = await GetSchedules(params)
    commit(types.COURSE_SCHEDULES, data)
  } catch (err) {
    handleError(err, commit)
  }
}

export const getCourseOutlines = async ({commit}, courseId) => {
  try {
    let data = await GetOutlines(courseId)
    commit(types.COURSE_OUTLINES, data)
  } catch (err) {
    handleError(err, commit)
  }
}

export const getCourseBuyInfo = async ({commit}, courseId) => {
  try {
    let data = await GetBuyInfo(courseId)
    commit(types.COURSE_BUYINFO, data)
  } catch (err) {
    handleError(err, commit)
  }
}

