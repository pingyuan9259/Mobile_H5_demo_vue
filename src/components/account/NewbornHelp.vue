<template>
	<div class="new-born-help">
		<h3>什么是新生币?</h3>
    <p>新生大学所有的服务都通过新生币购买；</p>
    <p>新生币可通过充值获得；</p>
    <p>新生币无法提现或交易，只能用于购买新生大学的服务；</p>
	</div>
</template>
<script>
import JSBridge from '../../utils/JSBridge'

export default {
  data () {
    return {
    }
  },
  mounted () {
    let Interval = window.setInterval(() => {
      if (window.tinfiniteBridge) {
        // 禁止页面漏黑底
        JSBridge.shouldBounces(0)
        clearInterval(Interval)
      }
      if (this.noInApp) {
        clearInterval(Interval)
      }
    }, 200)
  }
}
</script>
<style scoped lang="less">
  @import '../../styles/base-750.less';

  .new-born-help {
    .padding(40);

    h3 {
      .margin-bottom(60);
      .font-size(38);
      color: #333;
    }

    p {
      .font-size(26);
      color: #666;
    }
  }
</style>
