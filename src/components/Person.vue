<template>
  <mt-index-list>
    <mt-index-section index="A" v-if="userInfo" >
      <mt-cell title="头像"><img v-lazy="userInfo.avatar"></mt-cell>
      <mt-cell title="姓名">{{ userInfo.fullname }}</mt-cell>
      <mt-cell title="电话">{{ userInfo.phone }}</mt-cell>
      <mt-cell title="会员">{{ userInfo && userInfo.verify && userInfo.verify.status ? '是' : '否' }}</mt-cell>
      <mt-cell title="城市">{{ userInfo.city }}</mt-cell>
    </mt-index-section>
  </mt-index-list>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import { IndexList, Lazyload } from 'mint-ui'

Vue.component(IndexList.name, IndexList)
Vue.use(Lazyload)

export default {
  name: 'Person',
  created () {
    this.$store.dispatch('getUserInfo')
  },
  computed: mapState({
    userInfo: state => state.userInfo
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  width: 36px;
  height: 36px;
  margin: auto;
}
</style>
