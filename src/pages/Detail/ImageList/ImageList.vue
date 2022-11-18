<template>
  <div class="swiper-container" ref="swiperContainer">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(img, i) in skuImageList" :key="i">
        <img :src="img.imgUrl" :class="{ active: currentIndex == i }" @click="changeCurrentIndex(i)">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>

import Swiper from 'swiper'
import { mapMutations } from 'vuex'
export default {
  name: "ImageList",
  props: ['skuImageList'],
  data() {
    return {
      currentIndex: 0 //默认第一张图片被选中
    }
  },
  watch: {
    skuImageList: {
      handler(newV, oldV) {
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.swiperContainer, {
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            slidesPerView: 3, //定义容器显示多少元素
            slidesPerGroup: 3 //定义多少数量为一组
          })
        })
      }
    }
  },
  methods: {
    ...mapMutations(['CHANGEIMGINDEX']),
    changeCurrentIndex(i) {
      this.currentIndex = i
      this.CHANGEIMGINDEX(this.currentIndex)
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;

    &::after {
      font-size: 12px;
    }
  }
}
</style>