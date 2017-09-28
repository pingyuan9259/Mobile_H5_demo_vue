export default {
  ANDROID: 'android',
  IOS: 'iOS',
  WEB: 'web',
  isAndroid: function () {
    let u = navigator.userAgent
    return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
  },
  isIOS: function () {
    let u = navigator.userAgent
    return u.indexOf('iPhone') > -1 || u.indexOf('iPad') > -1
  },
  isNativeApp: function () {
    let u = navigator.userAgent
    return u.indexOf('native_app_tinfinite') > -1
  },
  isNativeWeb: function () {
    let u = navigator.userAgent
    return u.indexOf('native_web_tinfinite') > -1
  }
}
