<template>
  <div id="home">
  </div>
</template>

<script>


  import {getHomeMultidata} from "network/home";

  export default {
    name: "Home",
    components: {

    },
    data() {
      return {
        banners: [],
        recommends: []
      }
    },
    created() {

    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
