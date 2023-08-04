<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow">
        <div class="container">
            <router-link class="navbar-brand" :to="{name:'admin.home'}"><img :src="urlImg" alt="" width="30" height="24"
                    class="d-inline-block align-text-top" />D&S</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                <ul class="navbar-nav" v-if="me.acesso == 'RF' || me.acesso == 'super_admin'">
                    <li class="nav-item">
                        <router-link class="nav-link active" aria-current="page" :to="{name:'admin.categoria'}">
                            <svg-icon type="mdi" :path="mdiShapePlus"></svg-icon> Categorias
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name:'admin.produto'}">
                            <svg-icon type="mdi" :path="mdiCake"></svg-icon> Produtos
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name:'admin.home'}">
                            <svg-icon type="mdi" :path="mdiChartBar"></svg-icon> Estatística
                        </router-link>
                    </li>
                </ul>

                <ul class="navbar-nav" v-else>
                    <li class="nav-item">
                        <router-link class="nav-link active" :to="{name:'admin.produto'}">
                            <svg-icon type="mdi" class="text-success" :path="mdiShopping"></svg-icon> Produtos
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name:'cliente.pedidos'}">
                            <svg-icon type="mdi" class="text-success" :path="mdiCartMinus"></svg-icon> Meus pedidos 
                        </router-link>
                    </li>

                </ul>
            </div>
            <div class="collapse navbar-collapse justify-content-end">
                <ul class="navbar-nav mb-2 mb-lg-0">
                    <li class="nav-item" v-if="me.acesso == 'RF' || me.acesso == 'super_admin'">
                        <router-link :to="{name:'admin.mensagem'}" class="nav-link text-white" title="Caixa de mensagem">
                            <svg-icon type="mdi" :path="mdiEmailVariant " class="text-dark"></svg-icon>
                            <sup>
                                <span class="rounded-pill py-1 px-1 bg-success text-white small">{{ mensagem }}</span>
                            </sup>
                        </router-link>
                    </li>

                    <!-- Notificações Clientes -->
                    <li class="nav-item" v-else>
                        <router-link to="#" class="nav-link text-white" title="Caixa de mensagem">
                            <svg-icon type="mdi" :path="mdiEmailVariant" class="text-dark"></svg-icon>
                            <sup>
                                <span class="rounded-pill py-1 px-1 bg-success text-white small">{{ mensagem }}</span>
                            </sup>
                        </router-link>
                    </li>


                    <li class="nav-item" v-if="me.acesso == 'RF' || me.acesso == 'super_admin'">
                        <router-link class="nav-link text-white" :to="{name:'admin.notify'}" title="Caixa de notificações">
                            <svg-icon type="mdi" :path="mdiBellOutline" class="text-dark"></svg-icon>
                            <sup>
                                <span class="rounded-pill py-1 px-1 bg-success text-white small"> {{ notificacao }} </span>
                            </sup>
                        </router-link>
                    </li>
                </ul>

                <!-- Example single danger button -->
                <div class="btn-group">
                    <button type="button" class="btn btn-light btn-sm dropdown-toggle" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        Ola! {{ me.name }}
                    </button>
                    <ul class="dropdown-menu">
                        <li><router-link class="dropdown-item" :to="{ name: 'admin.perfil' }"><svg-icon type="mdi" :path="mdiAccountCircle" class="text-dark"></svg-icon> Perfil</router-link></li>
                        <li v-if="me.acesso == 'RF' || me.acesso == 'super_admin'"><router-link class="dropdown-item" :to="{ name: 'admin.meus_clientes' }"><svg-icon type="mdi" :path="mdiAccountHeart" class="text-dark"></svg-icon> Meus Clientes</router-link></li>
                        <li v-if="me.acesso == 'RF' || me.acesso == 'super_admin'"><router-link class="dropdown-item" :to="{name:'admin.config_page'}"><svg-icon type="mdi" :path="mdiWrenchCog" class="text-dark"></svg-icon> Configuração</router-link></li>
                        <li v-else><router-link class="dropdown-item" :to="{name:'cliente.pedidos'}"><svg-icon type="mdi" :path="mdiCartMinus" class="text-dark"></svg-icon> Meus pedidos</router-link></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li>
                            <a class="dropdown-item" href="#" @click.prevent="logout">
                                <span v-if="loading == false"> <svg-icon type="mdi" :path="mdiLogoutVariant" class="text-dark"></svg-icon> Terminar sessão</span>
                                <span v-else> <svg-icon type="mdi" :path="mdiLogoutVariant" class="text-dark"></svg-icon> Terminando ...</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
    <br>
    <br>
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
    name: "navBa-admin",
    components: {
        SvgIcon
    },
    data() {
        return {
            urlImg: '/image/sandes.png',
            path: mdiHomeAccount, mdiEmailBox, mdiBellOutline, mdiEmailVariant, mdiShopping,  mdiWrenchCog, mdiLogoutVariant, mdiShapePlus, mdiCake, mdiAccountHeart, mdiChartBar,  mdiBellCircle, mdiMessage, mdiPhone, mdiInformation, mdiSitemap, mdiAccountCircle, mdiLogin,mdiCartMinus,
            loading: false,
        }
    },

    created(){
        this.loadingPedidos();
        this.loadingMensagem();
    },

    methods: {
        logout() {
            this.loading = true
            this.$store.dispatch('logout')
                .then(() => this.$router.push({ name: 'home.login' }))
                .catch((error) => console.log(error))
                .finally(() => this.loading = false)
        },

        loadingPedidos(){
            this.$store.dispatch('loadingPedidos')
        },

        loadingMensagem(){
            this.$store.dispatch('loadingMensagem')
        }
    },

    computed: {
        me() {
            return this.$store.state.auth.user
        },

        notificacao(){
            const pedido = this.$store.getters.todosPedidosCount
            return pedido
        },

        mensagem(){
            const sms = this.$store.getters.todasMensagemCount
            return sms
        }
    },


}

</script>