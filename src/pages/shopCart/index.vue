<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cartItem, i) in cartInfoList" :key="i">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cartItem.isChecked === 1"
              @change="updateChecked(cartItem, $event)">
          </li>
          <li class="cart-list-con2">
            <img :src="cartItem.imgUrl">
            <div class="item-msg">{{ cartItem.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartItem.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handleNum('minus', -1, cartItem)">-</a>
            <input autocomplete="off" type="text" :value="cartItem.skuNum" minnum="1" class="itxt"
              @change="handleNum('change', $event.target.value * 1, cartItem)">
            <a href="javascript:void(0)" class="plus" @click="handleNum('add', 1, cartItem)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartItem.skuNum * cartItem.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:void(0)" class="sindelet" @click="deleteCart(cartItem)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllCheck" @change="updateAllCartChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:void(0)" @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="javascript:void(0)">移到我的关注</a>
        <a href="javascript:void(0)">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { handleError } from 'vue';
import { mapGetters } from 'vuex';
import throttle from 'lodash/throttle'
export default {
  name: 'ShopCart',
  computed: {
    ...mapGetters(['cartList']),
    cartInfoList() {
      return this.cartList.cartInfoList || []
    },
    // 计算总价格
    totalPrice() {
      let sum = 0
      this.cartInfoList.forEach(element => {
        sum += element.skuNum * element.skuPrice
      });
      return sum
    },
    // 判断底部全选框是否勾选
    isAllCheck() {
      // 只要有一个不是1就返回false
      return this.cartInfoList.every(item => item.isChecked == 1)
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    console.log(this.cartList);
  },
  methods: {
    // 获取购物车数据
    getData() {
      this.$store.dispatch('getCartList')
    },
    // 修改产品数量
    handleNum: throttle(async function (type, disNum, cartItem) {
      //type区分加减还是改变
      switch (type) {
        case 'add':
          // 直接给服务器传变化量
          disNum = 1
          break;
        case 'minus':
          // 商品数量大于1才能减少1
          disNum = cartItem.skuNum > 1 ? -1 : 0
          break;
        case 'change':
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0  //输入的量非法，改变量为0
          } else {
            disNum = parseInt(disNum) - cartItem.skuNum
          }
          break;
      }
      // 派发action
      try {
        await this.$store.dispatch('AddShopCart', { skuId: cartItem.skuId, skuNum: disNum })
        this.getData()
      } catch (error) {

      }
    }, 700),
    // 删除商品的方法
    async deleteCart(cartItem) {
      try {
        await this.$store.dispatch('deleteCartListById', cartItem.skuId)
        this.getData()
      } catch (error) {
        console.log(error);
      }
    },
    // 修改商品选中状态
    async updateChecked(cartItem, e) {
      console.log(e);
      const checked = e.target.checked ? '1' : '0'
      try {
        await this.$store.dispatch('UpdateCheckedById', { id: cartItem.skuId, isChecked: checked })
        this.getData()
      } catch (error) {
        console.log(error);
      }
    },
    // 删除全部的商品
    async deleteAllCheckedCart() {
      try {
        await this.$store.dispatch('deleteAllCheckedCart')
        this.getData()
      } catch (error) {
        console.log('有商品删除出错啦');
      }
    },
    // 全选控制
    async updateAllCartChecked(event) {
      console.log();
      const checked = event.target.checked ? '1' : '0'
      // 派发action 修改仓库数据
      try {
        await this.$store.dispatch('updateAllCartIsChecked',checked)
        this.getData()
      } catch (error) {
        console.log(error);
      }

    }
  },

}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        &>li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }



        .cart-list-con4 {
          width: 10%;

        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 31px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>