// 分发actions，页面的action同意dispatch到此进行逻辑处理

import * as types from '../store/mutation-types.js'
import handleError from '../utils/HandleError'
import GetPayLog from '../api/account/GetPayLog'
import GetPriceList from '../api/account/GetPriceList'
import GetMyAccountInfo from '../api/account/GetMyAccountInfo'
import GetMemberPrice from '../api/account/GetMemberPrice'
import GetBuyMemberLog from '../api/account/GetBuyMemberLog'

export const setPayingStatus = ({commit}, flag) => {
  commit(types.PAY_STATUS, flag)
}

export const getPriceList = async ({commit}) => {
  try {
    let data = await GetPriceList()
    commit(types.PRICE_LIST, data)
  } catch (err) {
    handleError(err, commit)
  }
}

export const getPayLog = async ({commit}, params) => {
  try {
    let data = await GetPayLog(params)
    commit(types.PAY_LOG, data)
  } catch (err) {
    handleError(err, commit)
  }
}

export const getAccountInfo = async ({commit}) => {
  try {
    let data = await GetMyAccountInfo()
    commit(types.ACCOUNT_INFO, {accountInfo: {money: data.newbornBalance}})
  } catch (err) {
    handleError(err, commit)
  }
}

export const getMemberPrice = async ({commit}) => {
  try {
    let data = await GetMemberPrice()
    commit(types.MEMBER_COURSE, data)
  } catch (err) {
    handleError(err, commit)
  }
}

export const getBuyMemberLog = async ({commit}) => {
  try {
    let data = await GetBuyMemberLog()
    commit(types.BUY_MEMBER_LOG, data)
  } catch (err) {
    handleError(err, commit)
  }
}
