
export default {
  pay: function (order) {
    return new Promise(function (resolve, reject) {
      if (order.pay_order && order.pay_channel) {
        let bridge = window.tinfiniteBridge
        if (bridge && bridge.payforbyNative) {
          bridge.payforbyNative(JSON.stringify({
            platform: order.pay_channel,
            orderInfo: order.pay_order
          }))

          resolve('call bridge success.')
        } else {
          reject(new Error('no js bridge.'))
        }
      } else {
        reject(new Error('order error.'))
      }
    })
  },
  goToLive: function (courseId) {
    return new Promise(function (resolve, reject) {
      let bridge = window.tinfiniteBridge
      if (bridge && bridge.jumptoNativePage) {
        bridge.jumptoNativePage(JSON.stringify({
          pname: 'live_page',
          options: {
            course_id: courseId
          }
        }))

        resolve('call bridge success.')
      } else {
        reject(new Error('no js bridge.'))
      }
    })
  },
  goToClub: function (courseId) {
    return new Promise(function (resolve, reject) {
      let bridge = window.tinfiniteBridge
      if (bridge && bridge.jumptoNativePage) {
        bridge.jumptoNativePage(JSON.stringify({
          pname: 'bbs_page',
          options: {
            course_id: courseId
          }
        }))

        resolve('call bridge success.')
      } else {
        reject(new Error('no js bridge.'))
      }
    })
  },
  goToHomeworkDetail: function (homeworkId, title) {
    return new Promise(function (resolve, reject) {
      let bridge = window.tinfiniteBridge
      if (bridge && bridge.jumptoNativePage) {
        bridge.jumptoNativePage(JSON.stringify({
          pname: 'homework_page',
          options: {
            homework_id: homeworkId,
            title: title
          }
        }))

        resolve('call bridge success.')
      } else {
        reject(new Error('no js bridge.'))
      }
    })
  },
  purchasedCourse: function (courseId) {
    return new Promise(function (resolve, reject) {
      let bridge = window.tinfiniteBridge
      if (bridge && bridge.purchasedCourse) {
        bridge.purchasedCourse(JSON.stringify({
          course_id: +courseId
        }))

        resolve('call bridge success.')
      } else {
        reject(new Error('no js bridge.'))
      }
    })
  },
  hideMoreButton: function (num) {
    return new Promise(function (resolve, reject) {
      let bridge = window.tinfiniteBridge
      if (bridge && bridge.hideMoreButton) {
        bridge.hideMoreButton(JSON.stringify({
          hidden: num
        }))

        resolve('call bridge success.')
      } else {
        reject(new Error('no js bridge.'))
      }
    })
  },
  shouldBounces: function (num) {
    return new Promise(function (resolve, reject) {
      let bridge = window.tinfiniteBridge
      if (bridge && bridge.shouldBounces) {
        bridge.shouldBounces(JSON.stringify({
          enable: num
        }))

        resolve('call bridge success.')
      } else {
        reject(new Error('no js bridge.'))
      }
    })
  },
  payforbyNative: function (data) {
    return new Promise(function (resolve, reject) {
      let bridge = window.tinfiniteBridge
      if (bridge && bridge.payforbyNative) {
        bridge.payforbyNative(JSON.stringify({
          platform: 5,
          orderInfo: {
            iosProductId: data.iosProductId,
            quantity: 1,
            param: data.params,
            signature: data.signature,
            wallet_key: data.wallet_key,
            member_type: data.type
          }
        }))

        resolve('call bridge success.')
      } else {
        reject(new Error('no js bridge.'))
      }
    })
  },
  purchasedVIP: function () {
    return new Promise(function (resolve, reject) {
      let bridge = window.tinfiniteBridge
      if (bridge && bridge.purchasedVIP) {
        bridge.purchasedVIP()
        resolve('call bridge success.')
      } else {
        reject(new Error('no js bridge.'))
      }
    })
  }
}
