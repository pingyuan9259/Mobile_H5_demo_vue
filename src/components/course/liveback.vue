<template>
  <div class="live-back">
    <div class="live-back-box">
      <video class="video-box" :src="urlBack" controls="true"></video>
    </div>
  </div>
</template>

<script>
import sensorsdata from '../../utils/sensorsdata.js'
import Title from '../../utils/setTitle'
import Device from '../../utils/device'
import JSBridge from '../../utils/JSBridge'
import DES from '../../utils/DES'
import { AES_KEY } from '../../config/app'

export default {
  name: 'Person',
  data () {
    return {
      urlBack: '',
      name: '直播回放',
      noInApp: !Device.isNativeApp() && !Device.isNativeWeb()
    }
  },
  async created () {
    this.urlBack = DES.outAes(window.localStorage.getItem('pburl'), AES_KEY)
    this.name = this.$route.query.name
    // 神策数据上报
    sensorsdata.track()
  },
  mounted () {
    // 轮询jsBridge是否加载完成
    let Interval = window.setInterval(() => {
      if (window.tinfiniteBridge) {
        Title.set(this.name)
        // 禁止页面漏黑底
        JSBridge.hideMoreButton(1)
        JSBridge.shouldBounces(0)
        clearInterval(Interval)
      }
      if (this.noInApp) {
        clearInterval(Interval)
      }
    }, 200)
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../styles/base-750.less';
  @import '../../styles/reset.less';

  .live-back {
    background-color: #fff;
    height: 100vh;
    .width(750);

    .live-back-box {
      .video-box {
        .width(750);
      }
    }
  }
</style>
