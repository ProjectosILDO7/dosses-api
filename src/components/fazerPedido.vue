<template>
    <div class="container mt-4">
        <div class="card text-center">
            <div class="card-header"> Faça seu pedido</div>
            <div class="card-body">
                <div class="row">
                    <div class="form-group col-6">
                        <router-link class="btn btn-sm btn-outline-success" :to="{name:'home.login'}">
                            <svg-icon type="mdi" :path="path"></svg-icon> SE JÁ CRIOU SUA CONTA FAÇA LOGIN
                    </router-link>
                    </div>

                    <div class="form-group col-6">
                        <router-link class="btn btn-sm btn-outline-secondary" :to="{name:'home.create_count'}">
                            <svg-icon type="mdi" :path="mdiAccountBox"></svg-icon>  SE AINDA AINDA NÃO TENS UMA CONTA CRIE A SUA!
                    </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiGiftOpenOutline, mdiAccountBox  } from '@mdi/js';

export default {
  name: "my-component",
  components: {
    SvgIcon
  },
  data() {
    return {
       path: mdiGiftOpenOutline, mdiAccountBox 
    }
  }
}
</script>