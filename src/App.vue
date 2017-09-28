<style lang="less">
  #app {
    width: 100%;
    min-height: 100vh;
  }
  body {
    -webkit-user-select: none;
    user-select: none;
    -webkit-font-smoothing: antialiased;
  }
  .alert-danger {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
  }
</style>
<template>
  <div id="app">
    <div class="alert alert-danger" role="alert" v-if="errorInfo && errorInfo.msg">
      {{ errorInfo.msg }}
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Cookie from './utils/cookie'
export default {
  name: 'app',
  created () {
    if (Cookie.getCookie('_user_id')) {
      this.$store.dispatch('setUserInfo', Cookie.getCookie('_user_id'))
    }
  },
  computed: mapState({
    errorInfo: state => state.errorInfo
  })
}
</script>
