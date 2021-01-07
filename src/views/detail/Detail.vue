<template>
  <div id="detail">

  </div>
</template>

<script>
    export default {
        name: "Detail",
        data(){
            return {
                iid:null
            }
        },
        created() {
            this.iid = this.$route.params.iid
            console.log(this.iid);
        }
    }
</script>

<style scoped>

</style>
