import Request from '../../utils/request'
import { BBS_PREFIX } from '../../config/app'

export default async function (params) {
  try {
    let data = await Request.get({
      base: BBS_PREFIX,
      url: `v3/bbs/homework-post` + '?bbs_id=' + params.bbsId + '&page=' + params.page + '&limit=' + params.limit
    })
    if (data.code && +data.code === 1) {
      return Promise.resolve(data.result)
    } else {
      throw new Error(data.message)
    }
  } catch (err) {
    return Promise.reject(err)
  }
}
