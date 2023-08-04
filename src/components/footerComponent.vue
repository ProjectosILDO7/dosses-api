<template>
    <footer class="py-5 bg-dark text-light mt-4">
        <div class="row">
            <div class="col-6 col-md-2 mb-3">
                <h5>1ª Sessão</h5>
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-lin text-light" href="/">
                            <img :src="urlImg" alt="" width="30" height="24" class="d-inline-block" /> D&S
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-light" aria-current="page" href="/">
                            <svg-icon type="mdi" :path="mdiHomeAccount"></svg-icon> Home
                        </a>
                    </li>
                </ul>
            </div>

            <div class="col-6 col-md-2">
                <h5>2ª Sessão</h5>
                <ul class="nav flex-column">
                    <li class="nav-item"><router-link @click="contacto" class="nav-link text-light"
                            :to="{ name: 'home.contacto' }">
                            <svg-icon type="mdi" :path="mdiPhone"></svg-icon> contacto
                        </router-link></li>
                    <li class="nav-item"><router-link @click="sobre" class="nav-link text-light"
                            :to="{ name: 'home.sobre' }">
                            <svg-icon type="mdi" :path="mdiInformation"></svg-icon> Sobre
                        </router-link></li>
                </ul>
            </div>

            <div class="col-6 col-md-2">
                <h5>3ª Sessão</h5>
                <ul class="nav flex-column">
                    <li class="nav-item mb-2"><router-link @click="service" class="nav-link text-light"
                            :to="{ name: 'home.service' }">
                            <svg-icon type="mdi" :path="mdiCake"></svg-icon> Produtos</router-link></li>
                </ul>
            </div>

            <div class="col-md-5 offset-md-1 mb-3">
                <form>
                    <h5>Assine a nossa newsletter</h5>
                    <p>
                        Resumo mensal do que há de novo e empolgante de nós.</p>
                    <div class="d-flex flex-column flex-sm-row w-100 gap-2">
                        <label for="newsletter1" class="visually-hidden">Endereço de E-mail</label>
                        <input type="text" class="form-control form-control-sm" placeholder="Envie seu e-mail">
                        <button class="btn btn-sm btn-primary">Enviar</button>
                    </div>
                </form>
            </div>
        </div>

        <div class="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
            <p>© {{ ano }} Empresa D&S, Inc. Todos os direitos reservados.</p>
            <ul class="list-unstyled d-flex">
                <li class="ms-3"><a class="link-dark text-light" href="#"><svg-icon type="mdi" :path="path"></svg-icon></a>
                </li>
                <li class="ms-3"><a class="link-dark text-light" href="#"><svg-icon type="mdi"
                            :path="mdiWhatsapp"></svg-icon></a></li>
                <li class="ms-3"><a class="link-dark text-light" href="#"><svg-icon type="mdi"
                            :path="mdiInstagram"></svg-icon></a></li>
            </ul>
        </div>
    </footer>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiFacebook } from '@mdi/js';
import { mdiWhatsapp } from '@mdi/js';
import { mdiInstagram } from '@mdi/js';
import { mdiHomeAccount } from '@mdi/js';
import { mdiPhone } from '@mdi/js';
import { mdiInformation } from '@mdi/js';
import { mdiSitemap } from '@mdi/js';
import { mdiAccountCircle } from '@mdi/js';
import { mdiLogin } from '@mdi/js';
import { mdiAccountStar } from '@mdi/js';
import { mdiCake } from '@mdi/js';
import { mdiCakeLayered } from '@mdi/js';

export default {
    name: "my-component",
    components: {
        SvgIcon
    },
    data() {
        return {
            urlImg: '/image/sandes.png',
            path: mdiFacebook, mdiWhatsapp, mdiInstagram, mdiHomeAccount, mdiPhone, mdiCake, mdiAccountStar, mdiInformation, mdiSitemap, mdiAccountCircle, mdiLogin,mdiCakeLayered
        }
    },

    computed:{
        ano(){
            const year = new Date()
            return year.getFullYear()
        }
    }
}
</script>
