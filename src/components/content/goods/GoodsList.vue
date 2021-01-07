<template>
  <div class="goods">
    <good-list-item v-for="(item,index) in goods" :goods-item="item" :key="index">{{item}}</good-list-item>
  </div>
</template>

<script>
    import GoodListItem from "./GoodsListItem.vue";

    export default {
        name: "GoodList",
        props: {
            goods: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        components: {
            GoodListItem
        }
    }
</script>

<style scoped>
.goods{
  display:flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

</style>
