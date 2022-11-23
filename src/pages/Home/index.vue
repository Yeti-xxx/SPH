<template>
  <div>
    <!-- 三级分类导航栏 -->
    <TypeNav></TypeNav>
    <ListConainer></ListConainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="(floor, i) in floorList" :key="i" :list="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListConainer from './ListContainer/index.vue'
import Recommend from './Recommend/index.vue'
import Rank from './Rank/index.vue'
import Like from './Like/index.vue'
import Floor from './Floor/index.vue'
import Brand from './Brand/index.vue'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    ListConainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  computed: {
    ...mapState({
      floorList: state => state.home.floorList
    })
  },
  mounted() {
    this.$store.dispatch('getFloorList')
    // token获取用户信息
    this.$store.dispatch('getUserInfo')
  }
}

</script>

<style lang='less' scoped>

</style>
