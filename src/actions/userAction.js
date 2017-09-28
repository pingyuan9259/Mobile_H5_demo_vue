// 分发actions，页面的action同意dispatch到此进行逻辑处理

import * as types from '../store/mutation-types.js'
import handleError from '../utils/HandleError'
import Cookie from '../utils/cookie'
import { TOKEN, TOP_LEVEL_HOST } from '../config/app'
import GetUserInfo from '../api/user/GetUserInfo'
import GetMemberInfo from '../api/user/GetMemberInfo'
import GetMemberStatus from '../api/user/getMemberStatus'

export const getUserInfo = async ({commit}) => {
  try {
    let data = await GetUserInfo()
    commit(types.USER_INFO, data)
    Cookie.setCookie('current_user_id', data.id, TOP_LEVEL_HOST, 1)
  } catch (err) {
    Cookie.delCookie(TOKEN, '/', TOP_LEVEL_HOST)
    handleError(err, commit)
  }
}

export const getMemberStatus = async ({commit}) => {
  try {
    let data = await GetMemberStatus()
    commit(types.MEMBER_STATUS, data)
  } catch (err) {
    handleError(err, commit)
  }
}

export const getMemberInfo = async ({commit}) => {
  try {
    let data = await GetMemberInfo()
    commit(types.MEMBER_INFO, data)
  } catch (err) {
    handleError(err, commit)
  }
}

export const setUserInfo = async ({commit}, info) => {
  if (info) {
    commit(types.USER_INFO, info)
  }
}
