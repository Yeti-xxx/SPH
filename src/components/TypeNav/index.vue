<template>
    <div class="type-nav">
        <!-- <h1>{{ categoryList }}</h1> -->
        <div class="container">
            <div @mouseenter="enterShow" @mouseleave="leaveShow">
                <h2 class="all">全部商品分类</h2>
                <transition name="sort">
                    <div class="sort" v-show="show">
                        <div class="all-sort-list2" @click="goSearch">
                            <div class="item" v-for="(c1, index) in categoryList" :key="index"
                                :class="{ cur: currentIndex === index }">
                                <h3 @mouseenter="changeIndex(index)" @mouseleave="currentIndex = -1">
                                    <a href="javaScript:void(0)" :data-categoryName="c1.categoryName"
                                        :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                                </h3>
                                <!-- 二三级分类 -->
                                <div class="item-list clearfix">
                                    <div class="subitem" v-for="(c2, index) in c1.categoryChild" :key="index">
                                        <dl class="fore">
                                            <dt>
                                                <a href="javaScript:void(0)" :data-categoryName="c2.categoryName"
                                                    :data-category2Id="c2.categoryId">{{
                                                            c2.categoryName
                                                    }}</a>
                                            </dt>
                                            <dd>
                                                <em v-for="(c3, index) in c2.categoryChild" :key="index">
                                                    <a href="javaScript:void(0)" :data-categoryName="c3.categoryName"
                                                        :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
// 引入lodash
import throttle from 'lodash/throttle'
export default {
    name: 'TypeNav',
    data() {
        return {
            // 存储用户移动到的一级分类
            currentIndex: -1,
            show: true
        }
    },
    // 组件挂载完毕，发起请求
    computed: {
        ...mapState({
            categoryList: state => state.home.categoryList
        })
    },
    mounted() {
        // 如果是Home路由 则分类展开
        if (this.$route.path != '/home') {
            this.show = false
            console.log(this.show);
        }
    },
    methods: {
        // 鼠标进入一级分类
        // 使用lodash节流，防止用户操作过快 导致卡顿
        changeIndex: throttle(function (Index) {
            this.currentIndex = Index
        }, 50),
        // 为了性能优化，通过事件委派进行路由跳转的绑定
        goSearch(e) {
            this.$router.push('/search')
            const element = e.target
            const { categoryname, category1id, category2id, category3id } = element.dataset    //有此属性则一定是a标签
            if (categoryname) {
                console.log(category1id);
                let location = { name: 'Search' }
                let query = { categoryName: categoryname }
                // 区分点击的一 二 三级分类标签
                if (category1id) {
                    query.category1Id = category1id
                } else if (category2id) {
                    query.category2Id = category2id
                } else if (category3id) {
                    query.category3Id = category3id
                }
                // 如果路由带有param参数需要携带过去
                if (this.$route.params) {
                    location.query = query
                    location.params = this.$route.params
                }
                // 整理参数
                this.$router.push(location)
            }

        },
        // 鼠标移入时，商品分类展示
        enterShow() {
            this.show = true
        },
        // 移开时隐藏
        leaveShow() {
            if (this.$route.path != '/home') {
                this.show = false
            }

        }

    }
}

</script>

<style lang='less' scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .cur {
                background-color: skyblue;
            }

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    &:hover {
                        .item-list {
                            display: block;
                        }
                    }
                }
            }
        }

        // .sort-enter-from{
        //     height: 0 !important;
        // }
        // .sort-enter-to{
        //     height: 461px !important;

        // }
        // .sort-enter-activer{
        //     // transition: all .5s linear !important;
        //     transition: opacity 0.5s ease;
        // }
        .sort-enter-active,
        .sort-leave-active {
            transition: opacity 0.3s ease;
        }

        .sort-enter-from,
        .sort-leave-to {
            opacity: 0;
        }
    }
}
</style>
