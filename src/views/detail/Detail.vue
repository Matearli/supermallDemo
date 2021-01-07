<template>
  <div id="detail">
    <detail-child/>
    <detail-item :top-images="topImages"></detail-item>
  </div>
</template>

<script>
  import detailChild from "./detailChild/detailChild.vue";
  import {getDetail,Goods} from "network/detail.js";
  import DetailItem from "./DetailItem.vue";
  export default {
        name: "Detail",
        components:{
            detailChild,
            DetailItem
        },
        data(){
            return {
                iid:null,
                topImages:[],
                goods:{}
            }
        },
        created() {
            //保存传入的iid
            this.iid = this.$route.params.iid
        //    请求数据
            getDetail(this.iid).then((res)=>{
                console.log(res);
                const data = res.result;
            //   数据分离
                this.topImages=data.itemInfo.topImages
            //    封装对象
                console.log(data);
                this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
            }).catch((e)=>{
                console.log(e);
            })
        }

    }
</script>

<style scoped>

</style>
