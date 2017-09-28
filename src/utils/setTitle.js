// import $ from 'npm-zepto'

let title = {
  set (title) {
    let bridge = window.tinfiniteBridge

    if (bridge && bridge.updateTitle) {
      bridge.updateTitle(JSON.stringify({
        title: title
      }))
    }

    // var $body = $('body')
    document.title = title

    // var $iframe = $('<iframe src="/favicon.ico" style="display: none;"></iframe>')
    // $iframe.on('load', () => {
    //   setTimeout(() => {
    //     $iframe.off('load').remove()
    //   }, 0)
    // }).appendTo($body)
  }
}

export default title
