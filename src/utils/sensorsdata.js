import cookie from './cookie.js'
import { APP_ENV } from '../config/app.js'

export default {
  track: function () {
    if (APP_ENV === 'pro') {
      window.sa.login(cookie.getCookie('_user_id'))
      // 自动追踪
      window.sa.quick('autoTrack')
    }
  },
  saEvent: function (title, name = 'AppViewScreen') {
    if (APP_ENV === 'pro') {
      window.sa.track(name, {
        screen_title_level_1: title
      })
    }
  }
}
