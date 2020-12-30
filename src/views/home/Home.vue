<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
<scroll class="content"
        ref="scroll"
        :probe-type="3"
        @scroll="contentScroll"
        :pull-up-load="true"
        @pullingUp="loadMore">
  <home-swiper :banners="banners"></home-swiper>
  <recommend-view :recommends="recommends"/>
  <feature-view/>
  <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"/>
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
                currentType:'pop',
                currentCoor:false
            }
        },
        computed:{
          showGoods(){
              return this.goods[this.currentType].list
          }
        },
        created() {
            //请求多个数据
            this.getHomeMultidata();
            //请求商品信息
            this.getHomeGoods('pop');
            this.getHomeGoods('new');
            this.getHomeGoods('sell');
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
                const page=this.goods[type].page+1;
                //发送网络请求
                getHomeGoods(type, page).then(res => {
                  this.goods[type].list.push(...res.data.list);
                  this.goods[type].page +=1;
                  //重置上拉加载
                    this.$refs.scroll.finishPullUp()
                })
            },
            /**
             * 事件监听相关方法
             */
            tabClick(index){
                //获取当前选中的tabControl
                this.currentType = Object.keys(this.goods)[index]
            },
            backClick(){
                this.$refs.scroll.scrollTo(0,0)
            },
            contentScroll(position){
              this.currentCoor= (-position.y) > 1000
            },
            loadMore(){
                this.getHomeGoods(this.currentType)
                //监听图片加载完就调用刷新
                this.$refs.scroll.scroll.refresh()
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
  .content{
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
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }
</style>
