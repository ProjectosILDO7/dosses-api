<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark text-light shadow fixed-top">
        <div class="container">
            <a class="navbar-brand text-light" href="/">
                <img :src="urlImg" alt="" width="30" height="24" class="d-inline-block align-text-top" /> D&S
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link active text-light" aria-current="page" href="/">
                            <svg-icon type="mdi" :path="path"></svg-icon> Home
                        </a>
                    </li>
                    <li class="nav-item">
                        <router-link @click="contacto" class="nav-link text-light" :to="{ name: 'home.contacto' }">
                            <svg-icon type="mdi" :path="mdiPhone"></svg-icon> contacto
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link @click="sobre" class="nav-link text-light" :to="{ name: 'home.sobre' }">
                            <svg-icon type="mdi" :path="mdiInformation"></svg-icon> Sobre
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link @click="service" class="nav-link text-light" :to="{ name: 'home.service' }">
                            <svg-icon type="mdi" :path="mdiCake"></svg-icon> Produtos</router-link>
                    </li>
                </ul>
            </div>
            <div class="d-flex">
                <ul class="navbar-nav">
                    <li class="nav-item text-light"><router-link @click="login" class="nav-link text-light" :to="{ name: 'home.login' }">
                            <svg-icon type="mdi" :path="mdiLogin"></svg-icon> Entrar</router-link></li>
                    <li class="nav-item dropdown">
                    </li>
                </ul>

                <ul class="navbar-nav">
                    <li class="nav-item text-light"><router-link @click="criar_conta" class="nav-link text-light" :to="{ name: 'home.create_count' }">
                            <svg-icon type="mdi" :path="mdiAccountStar"></svg-icon> Criar conta</router-link></li>
                    <li class="nav-item dropdown">
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>

import SvgIcon from '@jamescoyle/vue-icon';
import { mdiHomeAccount } from '@mdi/js';
import { mdiPhone } from '@mdi/js';
import { mdiInformation } from '@mdi/js';
import { mdiSitemap } from '@mdi/js';
import { mdiAccountCircle } from '@mdi/js';
import { mdiLogin } from '@mdi/js';
import { mdiAccountStar } from '@mdi/js';
import { mdiCake } from '@mdi/js';

export default {
    name: "navBar-component",
    components: {
        SvgIcon
    },
    data() {
        return {
            urlImg: '/image/sandes.png',
            path: mdiHomeAccount, mdiPhone, mdiCake, mdiAccountStar, mdiInformation, mdiSitemap, mdiAccountCircle, mdiLogin,
            loading: false,
        }
    },

    methods: {
        contacto() {
            window.scrollTo(0, 780);
        },
        sobre() {
            window.scrollTo(0, 500);
        },
        service() {
            window.scrollTo(0, 780);
        },
        login() {
            window.scrollTo(0, 850);
        },
        criar_conta() {
            window.scrollTo(0, 850);
        },
    }
}

</script>

<style scoped></style>