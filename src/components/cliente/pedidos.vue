<template>
    <div class="container mt-4">
        <div class="card shadow">
            <div class="card-body py-4 text-center">
                <strong><svg-icon type="mdi" class="text-success" :path="path"></svg-icon> PRODUTOS QUE SOLICITEI</strong>
            </div>
        </div>

        <div class="card mt-4" v-if="pedidos !== null">
            <div class="card-body">
                <div class="table-responsive mt-4">
                    <table class="table table-sm table-bordered">
                        <thead>
                            <tr>
                                <th>Nº</th>
                                <th>PRODUTOS</th>
                                <th class="text-center" width="200px">IMAGEM</th>
                                <th>DATA DO PEDIDO</th>
                                <th>PREÇO</th>
                                <th class="text-center">DESFAZER PEDIDO</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(pedido, index) in pedidos" :key="index">
                                <td>{{ index + 1 }}</td>
                                <td>{{ pedido['produtos'].nome_produto }}</td>
                                <td class="text-center"><img :src="`${url}${pedido['produtos'].image_produto}`" alt="image"
                                        class="tamanhoUserImage" /></td>
                                <td>{{ moment(pedido.created_at).format('LLL') }}</td>
                                <td class="text-success"><strong>{{ vueNumberFormat(pedido['produtos'].preco, {
                                    isInteger: true,
                                    suffix: ' Kz'
                                }) }}</strong></td>
                                <td class="text-center">
                                    <a href="#" @click="apagarPedido(pedido.id)" data-bs-toggle="modal"
                                        data-bs-target="#staticBackdrop">
                                        <svg-icon type="mdi" class="text-danger" :path="mdiDeleteForeverOutline"></svg-icon>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="card">
                <div class="card-body text-center">
                    <span class="text-danger">De momento não efecuaste</span>
                </div>
            </div>
        </div>
        <!-- Modat -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Apagar solicitação do produto</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center">
                        <p class="text-secondary">Tens a certeza que não queres este produto...?</p>
                        <div class="row">
                            <div class="form-group">
                                <img v-for="(img, index) in image_produto_delete" :key="index"
                            :src="`${url}${img['produtos'].image_produto}`" alt="produto" class="tamanhoProdutoImage"/>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal"><svg-icon type="mdi"
                                :path="mdiCloseBoxMultiple"></svg-icon> DESCARTAR</button>
                        <button type="button" class="btn btn-sm btn-primary"
                            @click="desfazerPedido(deletePedidoID)"><svg-icon type="mdi"
                                :path="mdiDeleteForeverOutline"></svg-icon> APAGAR</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import { notify } from "@kyvg/vue3-notification";
import { URL_BASE } from '../../configs/index.js'
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiBellCircle, mdiCloseBoxMultiple, mdiEmailVariant, mdiCartMinus, mdiShopping, mdiDeleteForeverOutline } from '@mdi/js';
export default {
    name: 'cliente-pedido',
    components: {
        SvgIcon
    },
    data() {
        return {
            moment: moment,
            url: URL_BASE + '/storage/image/produtos/',
            path: mdiShopping, mdiCloseBoxMultiple, mdiEmailVariant, mdiBellCircle, mdiCartMinus, mdiDeleteForeverOutline,
            pedidos: [],
            image_produto_delete: [],
            deletePedidoID: '',
        }
    },

    created() {
        this.muscar_meus_pedidos()
    },

    methods: {
        muscar_meus_pedidos() {
            this.$store.dispatch('muscar_meus_pedidos')
                .then((resposta) => {
                    this.pedidos = resposta.data
                })
                .catch((erro) => console.log(erro))
        },

        desfazerPedido(id) {
            this.$store.dispatch('desfazerPedido', id)
                .then((response) => {
                    notify({
                        title: 'Sucesso',
                        text: response,
                        type: 'warn',
                    })
                    this.muscar_meus_pedidos()
                })
                .then((erro) => console.log(erro))
        },
        apagarPedido(id) {
            this.deletePedidoID = id
            this.$store.dispatch('buscar_meu_pedido', id)
                .then((responde) => {
                    console.log(responde.data)
                    this.image_produto_delete = responde.data
                })
                .catch((erro) => console.log(erro))
        }
    }


}
</script>

<style scoped>
.tamanhoUserImage {
    width: 25% !important;
    height: 5% !important;
}
.tamanhoProdutoImage {
    width: 50% !important;
    height: 100% !important;
}
</style>