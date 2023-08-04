<template>
    <div class="container mt-4">
        <div class="card">
            <div class="card-body shadow">
                <span class="text-success h5"> <svg-icon type="mdi" :path="path"></svg-icon> Caixa de mensagem</span>
            </div>
        </div>
        <div class="card mt-4">
            <div class="card-body">
                <div v-if="messages != ''">
                    <div class="border border-info border-5 border-end-0 border-bottom-0 border-top-0 mt-2"
                        v-for="(msm, index) in messages" :key="index">
                        <div class="form-group col-12 bg-color text-secondary py-4">
                            <p class="pl-4"> <svg-icon type="mdi" :path="mdiCommentAccount"></svg-icon> <strong> {{ msm.nome }}</strong></p>
                            <p class="pl-4 topo"> <svg-icon type="mdi" :path="mdiPhoneClassic"></svg-icon> <strong> {{ msm.telemovel }}</strong></p>
                            <p class="pl-4 text-secondary topo"><svg-icon type="mdi" :path="path"></svg-icon> <span class="backgroundSms"> {{ msm.mensagem
                            }}</span>
                            </p>
                            <p class="d-flex justify-content-end">
                                <button class="btn btn-sm btn-outline-success mb-0 mt-0" @click="lida(msm.id)">
                                    <svg-icon type="mdi" :path="mdiCheckAll"></svg-icon> Marcar como lida
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="card" v-else>
                    <div class="card-body text-center text-danger">
                        <span> De momento não tens nenhuma mensagem na sua caixa de entrada</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiEmailVariant, mdiCheckAll, mdiCommentAccount, mdiPhoneClassic  } from '@mdi/js';

export default {
    name: "my-component",
    components: {
        SvgIcon
    },
    data() {
        return {
            path: mdiEmailVariant, mdiCheckAll, mdiCommentAccount, mdiPhoneClassic,
            mensagem: [],
            filter: '',
        }
    },
    created() {
        this.loadingMensagem()
    },

    methods: {
        loadingMensagem() {
            this.$store.dispatch('loadingMensagem')
        },
        lida(id) {
            this.$store.dispatch('marcarLida', id)
        }
    },

    computed: {
        messages() {
            return this.$store.getters.todoMensagem(this.filter)
        }
    },

}
</script>

<style scoped>
.bg-color {
    background-color: rgba(255, 255, 224);
}

.topo {
    margin-top: 2%;
}

.backgroundSms {
    background-color: rgba(164, 255, 164, 1.000);
    font-family: comic, 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif, Helvetica, sans-serif;
    padding: 0% 2% 2% 2%;
    border-radius: 30%;
}
</style>