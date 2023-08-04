<template>
  <preloading/>
  <notifications position="center right" width="50%" />
  <RouterView />
</template>

<script>
import { RouterView } from 'vue-router'

import preloading from "./components/preloading/preloading.vue"
  export default{
    components:{
     preloading,
     RouterView
  }
  }
</script>


<style scoped>

</style>
