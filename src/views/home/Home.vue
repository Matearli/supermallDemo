<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"/>
    <feature-view/>
    <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"/>
    <good-list :goods="showGoods"/>
    <ul>
      <li>good1</li>
      <li>good2</li>
      <li>good3</li>
      <li>good4</li>
      <li>good5</li>
      <li>good6</li>
      <li>good7</li>
      <li>good8</li>
      <li>good9</li>
      <li>good10</li>
      <li>good11</li>
      <li>good12</li>
      <li>good13</li>
      <li>good14</li>
      <li>good15</li>
      <li>good16</li>
      <li>good17</li>
      <li>good18</li>
      <li>good19</li>
      <li>good20</li>
      <li>good21</li>
      <li>good22</li>
      <li>good23</li>
      <li>good24</li>
      <li>good25</li>
      <li>good26</li>
      <li>good27</li>
      <li>good28</li>
      <li>good29</li>
      <li>good30</li>
      <li>good31</li>
      <li>good32</li>
      <li>good33</li>
      <li>good34</li>
      <li>good35</li>
      <li>good36</li>
      <li>good37</li>
      <li>good38</li>
      <li>good39</li>
      <li>good40</li>
      <li>good41</li>
      <li>good42</li>
      <li>good43</li>
      <li>good44</li>
      <li>good45</li>
      <li>good46</li>
      <li>good47</li>
      <li>good48</li>
      <li>good49</li>
      <li>good50</li>
      <li>good51</li>
      <li>good52</li>
      <li>good53</li>
      <li>good54</li>
      <li>good55</li>
      <li>good56</li>
      <li>good57</li>
      <li>good58</li>
      <li>good59</li>
      <li>good60</li>
      <li>good61</li>
      <li>good62</li>
      <li>good63</li>
      <li>good64</li>
      <li>good65</li>
      <li>good66</li>
      <li>good67</li>
      <li>good68</li>
      <li>good69</li>
      <li>good70</li>
      <li>good71</li>
      <li>good72</li>
      <li>good73</li>
      <li>good74</li>
      <li>good75</li>
      <li>good76</li>
      <li>good77</li>
      <li>good78</li>
      <li>good79</li>
      <li>good80</li>
      <li>good81</li>
      <li>good82</li>
      <li>good83</li>
      <li>good84</li>
      <li>good85</li>
      <li>good86</li>
      <li>good87</li>
      <li>good88</li>
      <li>good89</li>
      <li>good90</li>
      <li>good91</li>
      <li>good92</li>
      <li>good93</li>
      <li>good94</li>
      <li>good95</li>
      <li>good96</li>
      <li>good97</li>
      <li>good98</li>
      <li>good99</li>
      <li>good100</li>
    </ul>
  </div>
</template>
<script>
    import NavBar from "components/common/navbar/NavBar.vue";
    import HomeSwiper from "./childComps/HomeSwiper.vue";
    import RecommendView from "./childComps/RecommendView.vue";
    import FeatureView from "./childComps/FeatureView.vue";
    import TabControl from "components/content/tabControl/TabControl.vue";
    import GoodList from "components/content/goods/GoodsList.vue";
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
            GoodList
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
                currentType:'pop'
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
                })
            },
            /**
             * 事件监听相关方法
             */
            tabClick(index){
                //获取当前选中的tabControl
                this.currentType = Object.keys(this.goods)[index]
            }

        }
    }
</script>

<style scoped>
  #home {
    padding-top: 44px;
  }

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
