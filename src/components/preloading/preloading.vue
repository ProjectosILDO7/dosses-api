<template>
    <div class="Preloading" v-show="carregar">
        <img src="/image/Pre-loading-simples.gif" alt="Preloading...">
    </div>
</template>

<script>

export default{

    computed:{
        carregar(){
            return this.$store.state.carregar.loading
        }
    }

}

</script>

<style scoped>
    .Preloading{
        background:#000;
        position:absolute;
        z-index:9999;
        opacity:.2;
        width:100vw;
        height: 100vh;
        margin:0;
        text-align: center;
        padding:10% 0
    };
    .Preloading img{
        max-width: 50%;
    }
</style>