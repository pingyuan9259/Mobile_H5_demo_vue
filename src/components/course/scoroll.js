import $ from 'npm-zepto'

var move = function (obj, start, target, duration) {
  let time = duration || 800
  clearInterval(obj.timer)
  var count = Math.floor(time / 40)
  var n = 0

  obj.timer = setInterval(function () {
    n++
    var a = n / count
    var cur = start + (target - start) * (Math.pow(a, 3))
    $(obj).scrollTop(cur)
    if (n === count) {
      clearInterval(obj.timer)
    }
  }, 40)
}

const scrollTop = (el, duration) => {
  move(el, $(el).scrollTop(), 0, duration)
  return
}

const scrollBottom = (el, duration) => {
  let height = parseInt($(el).css('height'), 10)
  let borderTopSize = parseInt($(el).css('border-top'), 10)
  let borderBottomSize = parseInt($(el).css('border-bottom'), 10)
  let scrollBtm = el.scrollHeight - (height - borderTopSize - borderBottomSize)
  // $(el).scrollTop(el.scrollHeight)
  move(el, $(el).scrollTop(), el.scrollHeight, duration)
  return scrollBtm
}

export { scrollTop, scrollBottom }