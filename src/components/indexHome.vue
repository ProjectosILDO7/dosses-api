<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <service></service>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <sobre></sobre>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <contacto></contacto>
            </div>
        </div>
        <div class="col-12 mt-4">
            <localization />
        </div>
    </div>
</template>


<script>
import contacto from "./contacto.vue"
import service from "./servico.vue"
import sobre from "./sobre.vue"
import localization from "./localization.vue"
export default {
    name: 'Inicio-component',
    components: {
        contacto,
        service,
        sobre,
        localization
    }
}

</script>