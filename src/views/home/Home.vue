<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1" class="tab-control" v-show="isFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                    ref="tabControl2"/>
      <good-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="currentCoor"/>
  </div>
</template>
<script>
    import NavBar from "components/common/navbar/NavBar.vue";
    import HomeSwiper from "./childComps/HomeSwiper.vue";
    import RecommendView from "./childComps/RecommendView.vue";
    import FeatureView from "./childComps/FeatureView.vue";
    import TabControl from "components/content/tabControl/TabControl.vue";
    import GoodList from "components/content/goods/GoodsList.vue";
    import Scroll from "components/common/scroll/Scroll.vue"
    import BackTop from "components/content/backTop/BackTop.vue";
    //面向js开发，将所有的有关home的网络请求都封装在home.js中
    import {
        getHomeMultidata,
        getHomeGoods
    } from "network/home.js";
    import {debounce} from "common/utils.js";

    export default {
        name: "Home",
        components: {
            NavBar,
            HomeSwiper,
            RecommendView,
            FeatureView,
            TabControl,
            GoodList,
            Scroll,
            BackTop
        },
        data() {
            return {
                banners: [],
                recommends: [],
                goods: {
                    'pop': {page: 0, list: []},
                    'new': {page: 0, list: []},
                    'sell': {page: 0, list: []},
                },
                currentType: 'pop',
                currentCoor: false,
                tabOffsetTop:0,
                isFixed:false,
                //保持坐标
                saveY:0
            }
        },
        computed: {
            showGoods() {
                return this.goods[this.currentType].list
            }
        },
        created() {
            // 1.请求多个数据
            this.getHomeMultidata();
            // 2.请求商品信息
            this.getHomeGoods('pop');
            this.getHomeGoods('new');
            this.getHomeGoods('sell');

        },
        mounted() {
            //外层套一层防抖动函数
              const refresh = debounce(this.$refs.scroll.refresh, 200)
              // 监听图片加载完成
              this.$bus.$on('itemImageLoad', () => {
                  // console.log("load");
                  refresh()
              })

        },
        activated(){
            this.$refs.scroll.scrollTo(0,this.saveY,0)
            this.$refs.scroll.refresh();
        },
        deactivated(){
          this.saveY = this.$refs.scroll.getScrollY();
        },
        destroyed(){

        },
        methods: {
            /**
             * 网络请求相关
             */
            getHomeMultidata() {
                getHomeMultidata().then(res => {
                    this.banners = res.data.banner.list;
                    this.recommends = res.data.recommend.list;
                })
            },
            getHomeGoods(type) {
                const page = this.goods[type].page + 1;
                //发送网络请求
                getHomeGoods(type, page).then(res => {
                    this.goods[type].list.push(...res.data.list);
                    this.goods[type].page += 1;
                    // 重置上拉加载
                    this.$refs.scroll.finishPullUp()
                })
            },
            /**
             * 事件监听相关方法
             */
            //防抖动函数
            //函数本身，等待事件
            tabClick(index) {
                //获取当前选中的tabControl
                this.currentType = Object.keys(this.goods)[index]
                //设置并同步该组件的index
                this.$refs.tabControl1.currentIndex = index;
                this.$refs.tabControl2.currentIndex = index;
            },
            backClick() {
                this.$refs.scroll.scrollTo(0, 0, 300)
            },
            contentScroll(position) {
                this.currentCoor = (-position.y) > 1000;
                //判断是否吸顶
               this.isFixed = (-position.y) > this.tabOffsetTop

            },
            loadMore() {
                this.getHomeGoods(this.currentType)
                // //监听图片加载完就调用刷新
                debounce()
            },
            //监听轮播图加载完成，返回坐标
            //监听tabControl的位置
            //所有的组件都有一个属性 $el ：用于获取组件中的元素
            swiperImgLoad(){
                this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
            }
        },

    }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }

  /*.content{*/
  /* height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /*悬浮定位*/
    /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动采用fixed布局*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
</style>
