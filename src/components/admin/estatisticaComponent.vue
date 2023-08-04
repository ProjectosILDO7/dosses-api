<template>
    <div class="mb-2 mt-4">
            <div class="row">
                <div class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    <div class="card shadow text-center mt-2 mb-2">
                        <div class="card-header"><strong>Total de clientes</strong></div>
                        <div class="card-body">
                            <p class="text-secondary h4">{{ total_clientes }}</p>
                            <p class="text-light"><svg-icon type="mdi" :path="mdiAccountHeart" class="text-success"></svg-icon></p>
                        </div>
                    </div>
                </div>
                <div class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    <div class="card shadow text-center mt-2 mb-2">
                        <div class="card-header"><strong>Total de produtos</strong></div>
                        <div class="card-body">
                            <p class="text-secondary h4">{{ toatal_produtos }}</p>
                            <p class="text-light"><svg-icon type="mdi" :path="mdiCake" class="text-success"></svg-icon></p>
                        </div>
                    </div>
                </div>
                <div class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    <div class="card shadow text-center mt-2 mb-2">
                        <div class="card-header"><strong>Total de pedidos</strong></div>
                        <div class="card-body">
                            <p class="text-secondary h4">{{ notificacao }}</p>
                            <p class="text-light"><svg-icon type="mdi" :path="mdiShopping" class="text-success"></svg-icon></p>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiMessage } from '@mdi/js';
import { mdiHomeAccount } from '@mdi/js';
import { mdiPhone } from '@mdi/js';
import { mdiInformation } from '@mdi/js';
import { mdiSitemap } from '@mdi/js';
import { mdiAccountCircle } from '@mdi/js';
import { mdiLogin } from '@mdi/js';
import { mdiBellCircle, mdiEmailVariant, mdiCartMinus, mdiShopping   } from '@mdi/js';
import { mdiEmailBox, mdiAccountHeart, mdiBellOutline, mdiWrenchCog, mdiLogoutVariant, mdiShapePlus, mdiCake, mdiChartBar   } from '@mdi/js';

export default {
    name:'estatistica-component',

    components: {
        SvgIcon
    },
    data() {
        return{
            path: mdiHomeAccount, mdiEmailBox, mdiBellOutline, mdiEmailVariant, mdiShopping,  mdiWrenchCog, mdiLogoutVariant, mdiShapePlus, mdiCake, mdiAccountHeart, mdiChartBar,  mdiBellCircle, mdiMessage, mdiPhone, mdiInformation, mdiSitemap, mdiAccountCircle, mdiLogin,mdiCartMinus,
        }
    },

    created(){
        this.loadingPedidos();
        this.loadingProdutos();
        this.loadingClientes();
    },

    methods:{
        loadingPedidos(){
            this.$store.dispatch('loadingPedidos')
        },
        loadingProdutos(){
            this.$store.dispatch('loadingProdutos')
        },
        loadingClientes(){
            this.$store.dispatch('loadingClientes')
        },
    },

    computed:{
        notificacao(){
            const pedido = this.$store.getters.todosPedidosCount
            return pedido
        },
        
        toatal_produtos(){
            const pedido = this.$store.getters.todosProdutosCount
            return pedido
        },
        total_clientes(){
            const pedido = this.$store.getters.todosClientesCount
            return pedido
        },
        
    }
}
</script>