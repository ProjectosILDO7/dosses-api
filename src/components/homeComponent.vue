<template>
    <div>
        <nav-bar-vue/>
        <carrossel/>
            <div class="container">
                <router-view></router-view>
            </div>
        <footer-component/>
    </div>
</template>

<script>

import navBarVue from "./navBar.vue";
import footerComponent from "./footerComponent.vue";
import carrossel from "./carrousselComponent.vue"

export default {
    components: {
        navBarVue,
        footerComponent,
        carrossel
    }
}
</script>