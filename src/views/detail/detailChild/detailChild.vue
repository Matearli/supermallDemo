<template>
    <div>
      <nav-bar>
        <div slot="left" class="left" @click="back">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
        <div slot="center" class="title" >
          <div class="title-item" v-for="(item,index) in titles" @click="titleItemClick(index)" :class="{active:currentIndex==index}">
            {{item}}
          </div>
        </div>
      </nav-bar>
    </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar.vue";
    export default {
        name: "detailChild",
        components:{
            NavBar
        },
        data(){
            return{
                titles:['商品','参数','评论','推荐'],
                currentIndex:0
            }
        },
        methods:{
            titleItemClick(index){
                this.currentIndex = index
            },
            back(){
                this.$router.back()
            }
        }
    }
</script>

<style scoped>
  .title{
    display: flex;
  }
  .title-item{
    flex: 1;
    font-size: 13px;
  }
  .left img{
    margin-top: 12px;
  }

  .active{
   color: var(--color-high-text);
  }
</style>
