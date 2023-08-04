<template>
    <div>
            <estatistica/>
        <p>
            <graficos/>
        </p>
    </div>
</template>

<script>
import estatistica from "./estatisticaComponent.vue"
import graficos from "./graficosComponent.vue"

export default {
    name: 'homeAdmin',
    components: {
        estatistica,
        graficos,
    }
}
</script>