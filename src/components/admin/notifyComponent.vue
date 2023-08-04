<template>
    <div class="container mt-4">
        <div class="card">
            <div class="card-body shadow">
                <span class="text-success h5"> <svg-icon type="mdi" :path="path"></svg-icon> Caixa de notificações</span>
            </div>
        </div>
        <div class="card mt-4">
            <div class="card-body">
                <div v-if="notifys != ''">
                    <div class="border border-info border-5 border-end-0 border-bottom-0 border-top-0 mt-2"
                        v-for="(msm, index) in notifys" :key="index">
                        <div class="form-group col-12 bg-color text-secondary py-4">
                            <table class="table table-sm table-striped table-bordered">
                                <thead class="bg-dark">
                                    <tr class="text-dark">
                                        <th style="width:10%" class="text-center"><strong>Nº</strong></th>
                                        <th style="width:20%"><strong>O Cliente</strong></th>
                                        <th style="width:20%"><strong>Nome do produto</strong></th>
                                        <th class="text-center"><strong>imagem do produto</strong></th>
                                        <th class="text-center"><strong>Opção</strong></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td class="text-center">{{ index + 1 }}</td>
                                        <td style="width:20%">
                                            <a class=" text-secondary" href="#" data-bs-toggle="offcanvas"
                                                data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"
                                                @click="detalhes(msm.id)">
                                                {{ msm['clientes'].name }}
                                            </a>
                                        </td>
                                        <td style="width:30%">{{ msm['produtos'].nome_produto }}</td>
                                        <td style="width:20%" class="text-center">
                                            <img :src="`${url}${msm['produtos'].image_produto}`" alt="image-produto"
                                                class="tamanho" />
                                        </td>
                                        <td class="text-center">
                                            <button class="btn btn-sm" @click="lida(msm.id)">
                                                <svg-icon type="mdi" :path="mdiCheckAll"></svg-icon>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="card" v-else>
                    <div class="card-body text-center text-danger">
                        <span> De momento não tens nenhuma notificação na sua caixa de entrada</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Înfo Canvas - informações a direita -->
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header">
                <div class="form-group col-9 text-end text-info">
                    <h5 id="offcanvasRightLabel text-center">DETALHES DO PEDIDO</h5>
                </div>
                <div class="form-group col-3 text-end">
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"
                        aria-label="Close"></button>
                </div>
            </div>
            <div class="offcanvas-body">
                <div class="row">
                </div>

                <hr />

                <div class="row">
                    <div class="form-group col-12 text-center">
                        <div class="card shadow">
                            <h4>
                                <span class="text-danger">
                                    {{ nome_cliente }}
                                </span>
                            </h4>
                        </div>
                    </div>

                    <div class="form-group col-12 mt-4">
                        <div class="card mt-2">
                            <div class="card-body">
                                <p class="text-success">Nº de contacto:</p>
                                <p class="text-secondary mt-0 fw-bold topoMargin">
                                    {{ contacto_cliente }}
                                </p>
                            </div>
                        </div>

                        <div class="card mt-2">
                            <div class="card-body">
                                <p class="text-success">E-mail:</p>
                                <p class="text-secondary mt-0 fw-bold topoMargin">
                                    {{ email_cliente }}
                                </p>
                            </div>
                        </div>

                        <div class="card mt-2">
                            <div class="card-body">
                                <p class="text-success">Data de registo:</p>
                                <p class="text-secondary topoMargin">
                                    <span> {{ moment(data_registo).format('LLL') }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment"
import { URL_BASE } from '../../configs/index.js'
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiEmailVariant, mdiCheckAll, mdiCommentAccount, mdiPhoneClassic } from '@mdi/js';

export default {
    name: "notify-component",
    components: {
        SvgIcon
    },
    data() {
        return {
            moment:moment,
            path: mdiEmailVariant, mdiCheckAll, mdiCommentAccount, mdiPhoneClassic,
            url: URL_BASE + '/storage/image/produtos/',
            Notify: [],
            filter: '',
            detalhe_pedido: {},
            nome_cliente: '',
            contacto_cliente: '',
            email_cliente: '',
            data_registo:''
        }
    },
    created() {
        this.loadingNotify()
    },

    methods: {
        loadingNotify() {
            this.$store.dispatch('loadingPedidos')
        },
        lida(id) {
            this.$store.dispatch('marcarLidaNotify', id)
        },
        detalhes(id) {
            this.$store.dispatch('detalhes_pedido', id)
                .then((response) => {
                    console.log(response.data.clientes)
                    this.nome_cliente=response.data.clientes.name
                    this.contacto_cliente=response.data.clientes.telemovel
                    this.email_cliente=response.data.clientes.email
                    this.data_registo=response.data.clientes.created_at
                })
                .catch((erro) => console.log(erro))
        }
    },

    computed: {
        notifys() {
            return this.$store.getters.contarPedidos
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

.tamanho {
    width: 25%;
    height: 25%
}
</style>