<template>
  <div class="log-container">
    <div class="body">
      <template v-if="list && list.length > 0">
        <div v-for="item in list" class="pay-log-item">
          <div class="left-content">
            <h4>{{ item.orderType | orderType }}</h4>
            <p>{{ item.payCompleteAt | time }}</p>
          </div>
          <p class="log-consumption" v-if="+item.orderType !== 1 && +item.orderType !== 5">
          <span v-if="parseInt(item.newbornNum) > 0">-</span> {{ item.newbornNum | float }}</p>
          <p class="log-recharge" v-if="+item.orderType === 1 || +item.orderType === 5">{{ item.newbornNum | float }}</p>
        </div>
      </template>

      <loading v-show="loading"></loading>
      <div class="no-log" v-if="total === 0">
        <img data-ignore="1" src="https://o4a7cbihz.qnssl.com/cover/d3c6b4ad-c5da-47fb-9f1b-b69a7626a96b">
        <p>还没有订单记录</p>
        <button @click="goCharge">去充值</button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import { IndexList, Lazyload } from 'mint-ui'
import Title from '../../utils/setTitle'
import moment from 'moment'
import Loading from '../../commons/loading/'
import $ from 'npm-zepto'
import JSBridge from '../../utils/JSBridge'
import sensorsdata from '../../utils/sensorsdata.js'

Vue.component(IndexList.name, IndexList)
Vue.use(Lazyload)

export default {
  name: 'Person',
  data () {
    return {
      total: null,
      list: [],
      params: {
        offset: 0,
        limit: 15
      },
      loading: false
    }
  },
  created: async function () {
    await this.$store.dispatch('getPayLog', this.params)
    // 神策数据上报
    sensorsdata.track()
    let saTitle = '订单'
    sensorsdata.saEvent(saTitle)
  },
  computed: mapState({
    payLog: state => state.payLog
  }),
  components: {
    Loading
  },
  watch: {
    payLog (data) {
      if (data.rows.length === 0) {
        this.loading = false
      }
      this.list = [].concat(this.list.concat(data.rows))
      this.total = data.total
    }
  },
  mounted () {
    Title.set('订单')
    $(window).scroll(() => {
      let sh = $(window).scrollTop()
      let wh = $(window).height()
      let dh = $(document).height()
      if ((dh === sh + wh) && !this.loading && (this.total > this.params.offset)) {
        this.loading = true
        this.handlePage()
      }
    })
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
  },
  methods: {
    async handlePage () {
      if (this.total > this.params.offset) {
        this.params.offset += 15
        await this.$store.dispatch('getPayLog', this.params)
        this.loading = false
      }
    },
    // 去充值
    goCharge () {
      this.$router.replace({path: '/myAccount'})
    }
  },
  filters: {
    time (val) {
      if (!val) return val
      return moment(val).format('YYYY/MM/DD HH:mm')
    },
    orderType (val) {
      if (!val) return
      switch (val) {
        case 1:
          return '充值'
        case 2:
          return '购买课程'
        case 3:
          return '购买会员'
        case 4:
          return '会员续费'
        case 5:
          return '赠送'
      }
    },
    float (val) {
      if (!val) return
      val = val.replace(/,/g, '')
      return parseFloat(val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import '../../styles/base-750.less';

  .body {
    // .padding(36);

    // .media {
    //   .padding-bottom(26);
    //   border-bottom: 1px solid #F4F8F9;

    //   .media-header {

    //     .title {
    //       display: inline-block;
    //       .font-size(28);
    //       color: #28313B;
    //     }
    //     .pay {
    //       display: inline-block;
    //       .font-size(28);
    //       color: #EB5858;
    //       text-align: right;
    //     }
    //     .recharge {
    //       display: inline-block;
    //       .font-size(28);
    //       color: #00D377;
    //       text-align: right;
    //     }
    //   }
    //   .time {
    //     font-weight: 300;
    //     .font-size(24);
    //     color: #97A4B1;
    //   }
    //   .unit {
    //     text-align: right;
    //     font-weight: 300;
    //     .font-size(24);
    //     color: #97A4B1;
    //   }
    // }

    .pay-log-item {
      border-bottom: 1px solid #F4F8F9;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .padding-left(46);
      .padding-right(60);
      .padding-bottom(27);
      .padding-top(27);

      .left-content {
        h4 {
          margin: 0;
          color: #28313B;
          .font-size(32);
        }
        p {
          margin: 0;
          .margin-top(14);
          color: #97A4B1;
          .font-size(26);
        }
      }
      .log-consumption {
        color: #EB5858;
        .font-size(32);
        margin: 0;
      }
      .log-recharge {
        color: #00D377;
        .font-size(32);
        margin: 0;
      }
    }

    .no-log {
      .padding-top(50);
      text-align: center;
      p {
        .font-size(28);
        color: #97A4B1;
        .margin(0);
      }
      img {
        .width(128);
        .height(124);
        .margin-bottom(38);
      }
      button {
        outline: 0;
        .width(164);
        .padding-top(12);
        .padding-bottom(12);
        .margin-top(50);
        .font-size(28);
        color: #00D377;
        .border-radius(36);
        background-color: #FFFFFF;
        border: 1px solid #00D377;
      }
    }
  }
</style>
