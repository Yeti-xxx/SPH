<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "Zoom",
  props: ['skuImageList'],
  data() {
    return {
      currentIndex: 0
    }
  },
  watch: {
    imgIndex(newV, oldV) {
      this.currentIndex = newV
    }
  },
  computed: {
    imgObj() {
      return this.skuImageList[this.currentIndex] || {}
    },
    ...mapState({
      imgIndex: state => state.detail.imgIndex,
    })
  },
  methods: {
    // 鼠标移动 放大镜
    handler(e) {
      const mask = this.$refs.mask
      let big = this.$refs.big
      let left = e.offsetX - mask.offsetWidth / 2 //鼠标距离容器左边距离减去二分之一遮罩层宽度，得出遮罩层远距离容器左边距
      let top = e.offsetY - mask.offsetHeight / 2 //上边距同理
      if (left <= 0) {
        left = 0
      }
      if (left >= mask.offsetWidth) {
        left = mask.offsetWidth
      }
      if (top <= 0) {
        top = 0
      }
      if (top >= mask.offsetHeight) {
        top = mask.offsetHeight
      }
      // 修改元素left top值
      mask.style.left = left + 'px'
      mask.style.top = top + 'px'
      big.style.left = -2 * left + 'px'
      big.style.top = -2 * top + 'px'
    }
  }
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover~.mask,
  .event:hover~.big {
    display: block;
  }
}
</style>