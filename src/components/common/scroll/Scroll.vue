<template>
<!--  ref 一般绑定给子组件-->
<div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
</div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
        name: "Scroll",
        props:{
            probeType:{
                type:Number,
                default:0
            },
            pullUpLoad:{
                type: Boolean,
                default: false
            }
  },
        data(){
          return {
              scroll:null
          }
        },
        mounted() {
            //创建scroll对象
            this.scroll = new BScroll(this.$refs.wrapper,{
                //时时侦听坐标
                probeType:this.probeType,
                //上拉刷新
                pullUpLoad:this.pullUpLoad,

                observeDOM:true,

                click:true
            })
            //监听滚动位置
            if (this.probeType ===2 || this.probeType ===3) {
                this.scroll.on("scroll", (position) => {
                    this.$emit("scroll", position)
                });
            }
            // 监听上拉事件
            // 监听scroll滚动到底部
            if (this.pullUpLoad){
                this.scroll.on("pullingUp",()=>{
                   this.$emit("pullingUp")
                })
            }
        },
        methods:{
            //调用其
            scrollTo(x,y,time){
               this.scroll && this.scroll.scrollTo(x,y,time)
            },
            refresh(){
                this.scroll.refresh()
            },
            finishPullUp(){
                this.scroll && this.scroll.finishPullUp()
            },
            getScrollY(){
                return this.scroll ? this.scroll.y : 0  ;
            }
        }
    }
</script>

<style scoped>

</style>
