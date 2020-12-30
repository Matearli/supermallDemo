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

                click:true
            })
            //监听滚动位置
            this.scroll.on("scroll",(position)=>{
                this.$emit("scroll",position)
            });
            //监听上拉事件
            this.scroll.on("pullingUp",()=>{
              this.$emit("pullingUp")
                // this.scroll.finishPullUp()
            })
        },
        methods:{
            scrollTo(x,y,time=300){
                this.scroll.scrollTo(x,y,time)
            },
            finishPullUp(){
                this.scroll.finishPullUp()
            }
        }
    }
</script>

<style scoped>

</style>
