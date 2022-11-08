<script>
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'
export default {
  components: {
    Header,
    Footer
  }
}
</script>

<template>
  <div>
    <!-- 配置路由的meta字段 控制Header和Footer显示隐藏 -->
    <Header v-show="$route.meta.show"></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<style scoped>

</style>
