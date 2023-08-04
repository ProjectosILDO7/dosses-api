<template>
    <div>
        <nav-bar-vue/>
            <div class="container">
                <router-view></router-view>
            </div>
    </div>
</template>

<script>

import navBarVue from "./navBar.vue";

export default {
    components: {
        navBarVue,
    }
}
</script>