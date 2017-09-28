import Cookie from '../utils/cookie'
import Device from '../utils/device'

const IN_WEB = !Device.isNativeApp() && !Device.isNativeWeb()

// 全局常量
const win = window
const loc = win.location
const host = loc.host
const port = loc.port

let APP_ID_KEY = '_app_id'
let APP_TOKEN_KEY = '_app_token'
let APP_DEVICE_KEY = '_device_id'

// 初始变量
let APP_ID = ''
let APP_HOST = ''
let TOKEN = ''
let DEVICE_ID = ''
let APP_IS_LOCAL = false
let USER_ID = ''

// for host
APP_HOST = host

const APP_ENV = host.split('.')[0].split('-')[1] ? host.split('.')[0].split('-')[1] : 'pro'

// top level hostname
let topHostMatch = loc.hostname.match(/\.([^.]+\.com)$/)
let TOP_LEVEL_HOST = topHostMatch && topHostMatch[1]

// for host
APP_HOST = TOP_LEVEL_HOST

// 判断有没有 env 有的话就是客户端 使用约定的token
let suffix = APP_ENV === 'pro' ? '' : '-' + APP_ENV
let PREFIX = '//api-saas' + suffix + '.tinfinite.com'
let COURSE_PREFIX = '//course-api' + suffix + '.tinfinite.com'
let BBS_PREFIX = '//exercise-api' + suffix + '.tinfinite.com'

// 时光机服务端域名
let TM_PREFIX = '//time-machine' + suffix + '.xinshengdaxue.com'

// for appId & appLogo
if (!TOP_LEVEL_HOST) {
  throw new Error('url is wrong!')
} else {
  APP_ID = Cookie.getCookie(APP_ID_KEY)
  if (IN_WEB) {
    let env = APP_ENV === 'pro' ? '' : '_' + APP_ENV
    TOKEN = Cookie.getCookie(`_app_token${env}`)
  } else {
    TOKEN = Cookie.getCookie(APP_TOKEN_KEY)
  }
  DEVICE_ID = Cookie.getCookie(APP_DEVICE_KEY)

  let userInfo = Cookie.getCookie('_user_info') && JSON.parse(decodeURIComponent(Cookie.getCookie('_user_info')))
  USER_ID = userInfo.id || Cookie.getCookie(APP_ENV === 'pro' ? '_user_id' : '_user_id_' + APP_ENV)
}

// for env
if (port) {
  APP_IS_LOCAL = true
}

// AES KEY
let AES_KEY = 'playBack'

export { APP_HOST, APP_IS_LOCAL, APP_ID, TOP_LEVEL_HOST, APP_ENV, DEVICE_ID, TOKEN, PREFIX, COURSE_PREFIX, BBS_PREFIX, USER_ID, TM_PREFIX, AES_KEY }
