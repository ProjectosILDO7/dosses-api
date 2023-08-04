<template>
    <section style="background-color: rgba(255, 255, 255, 0.158);" class="mt-2">
        <div class="container py-4">
            
            <div class="row justify-content-center" v-if="produtos!=''">
                <div class="col-md-8 col-lg-6 col-xl-4 mt-2 animate__animated animate__zoomIn" v-for="produto in produtos"
                    :key="produto.id">
                    <div class="card text-black shadow">
                        <p class="text-secondary h6">
                            <span v-show="produto.image_produto">
                                <router-link :to="`${url}${produto.image_produto}`" target="_blank" style="width:100%, height:50%" >
                                    <!-- <img :src="`${url}${produto.image_produto}`" alt="image" class="rounded-circle rounded-3 tamanhoUserImage" /> -->
                                    <img :src="`${url}${produto.image_produto}`" alt="image" class="tamanhoUserImage"/>
                                </router-link>
                            </span>
                            <span v-show="!produto.image_produto"><img :src="url_no_image" alt="Sem_imagem"
                                    class="tamanhoUserImage" /></span>
                        </p>
                        <div class="card-body">
                            <div class="text-center">
                                <h5 class="card-title">{{ produto.nome_produto }}</h5>
                                <p class="text-muted mb-4">Categoria: {{ produto.categorias.nome_categoria }}</p>
                            </div>
                            <div class="d-flex justify-content-between total font-weight-bold mt-4">
                                <span class="text-secondary">
                                    <div class="dropdown">
                                        <router-link class="btn btn-outline-success btn-sm" type="button"
                                            aria-expanded="false" :to="{name:'home.fazer_pedido'}">
                                            <svg-icon type="mdi" :path="path"></svg-icon> Fazer pedido
                                        </router-link>
                                    </div>
                                </span><span class="text-muted text-success">
                                    {{ vueNumberFormat(produto.preco, { isInteger: true, suffix: ' Kz' }) }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card" v-else>
                <div class="card-body">
                    <div class="row">
                        <div class="form-group col-12 text-center text-danger"> De momento não temos produtos registados no sistema</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { URL_BASE } from '../configs/index.js'
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiCart } from '@mdi/js';
import { mdiInformationSlabBox } from '@mdi/js';

export default {
    name: "produtos-component",
    components: {
        SvgIcon
    },
    data() {
        return {
            path: mdiCart, mdiInformationSlabBox,
            filter:'',
            url: URL_BASE + '/storage/image/produtos/',
            url_no_image: "/image/no-image0.jpg",
        }
    },
    created() {
        this.loadingProdutosCliente();
        console.log(this.url);
    },
    computed: {
        produtos() {
            //return this.$store.state.estudantes.items.filter(estudante =>toUpperCase(estudante.nome.includes(toUpperCase(this.filter))))
            return this.$store.getters.todosProdutosCliente(this.filter);
        },

    },

    methods: {
        loadingProdutosCliente() {
            //var store = useStore()
            this.$store.dispatch("loadingProdutosCliente");
        },
    }
}
</script>

<style scoped>

img {
    width:100% !important;
    height: 100% !important;
}

.link-pedido {
    list-style-type: none;
    color: #0f8b03 !important;
    text-decoration: none !important;
}

.link-pedido:hover {
    list-style-type: none;
    color: #7bbb76 !important;
    text-decoration: none !important;
}</style>
