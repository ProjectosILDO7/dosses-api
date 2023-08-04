<template>
    <div class="row mt-4">
        <div class="col-12 text-secondary text-center">
            <strong><svg-icon type="mdi" :path="path"></svg-icon> ENTRE EM CONTACTO CONNOSCO </strong>
        </div>
        <div class="card mb-2">
            <!-- <div class="card-body" v-if="getMyContacto">
                <div class="row">
                    <div
                        class="form-group col-6 border border-top-0 border-bottom-0 border-start-0 border-5 border-end border-dark text-center py-4">
                        <p><span class="text-primary py-4 h4 animate__animated animate__flip">NOSSO CONTACTO {{ getMyContacto[0].facebook }}</span></p>
                    </div>
                    <div class="form-group col-6 bordered-right bordered-primary">
                        <p><span><svg-icon type="mdi" :path="mdiFacebook" class="text-primary"></svg-icon> </span><a
                                :href="getMyContacto.link_facebook">{{ getMyContacto.facebook }}</a></p>
                        <p><span><svg-icon type="mdi" :path="mdiWhatsapp" class="text-success"></svg-icon> </span> +244 {{ getMyContacto.whatsapp}}</p>
                        <p><span><svg-icon type="mdi" :path="mdiYoutubeTv" class="text-danger"></svg-icon> </span><a
                                :href="getMyContacto.link_youtube">{{ getMyContacto.youtube }}</a></p>
                    </div>
                </div>
            </div> -->
            <div class="card-body">
                <div class="row">

                    <div
                        class="form-group col-6 border border-top-0 border-bottom-0 border-start-0 border-5 border-end border-dark text-center py-4">
                        <p><span class="text-primary py-4 h4 animate__animated animate__flip">NOSSO CONTACTO</span></p>
                    </div>
                    <div class="form-group col-6 bordered-right bordered-primary">
                        <p><span><svg-icon type="mdi" :path="mdiFacebook" class="text-primary"></svg-icon> </span><a
                                href="https://web.facebook.com/ildomarques">ildomarques.dev</a></p>
                        <p><span><svg-icon type="mdi" :path="mdiWhatsapp" class="text-success"></svg-icon> </span> +244 921
                            923 232</p>
                        <p><span><svg-icon type="mdi" :path="mdiYoutubeTv" class="text-danger"></svg-icon> </span><a
                                href="https://www.youtube.com/channel/UC0C8RwA6kNFHGaOEsiVhz4g">@ildocuema9396</a></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="card col-12 text-secondary shadow">
            <div class="card-body">
                <div class="col-12">
                    <label class="text-secondary"><strong>Nome Próprio</strong></label>
                    <input type="text" class="form-control" placeholder="Informe-nos seu nome" v-model="items.nome">
                    <span class="text-danger small col-12 styleMargem" v-if="erros.nome">{{ erros.nome[0] }}</span>
                </div>
                <div class="col-12">
                    <label class="text-secondary"><strong>Telemovel</strong></label>
                    <input type="text" class="form-control" placeholder="Tel." v-model="items.telemovel">
                    <span class="text-danger small col-12 styleMargem" v-if="erros.telemovel">{{ erros.telemovel[0]
                    }}</span>
                </div>
                <div class="col-12">
                    <label class="text-secondary"><strong>E-mail</strong></label>
                    <input type="email" class="form-control" placeholder="Informe-nos seu email" v-model="items.email">
                    <span class="text-danger small col-12 styleMargem" v-if="erros.email">{{ erros.email[0] }}</span>
                </div>

                <div class="col-12">
                    <label class="text-secondary"><strong>Deixe sua mensagem</strong></label>
                    <textarea class="form-control" rows="4" cols="12" placeholder="Mensagem"
                        v-model="items.mensagem"></textarea>
                    <span class="text-danger col-12 small styleMargem" v-if="erros.mensagem">{{ erros.mensagem[0] }}</span>
                </div>
                <p/>
                <span class="mt-4">
                <div class="col-12 d-flex justify-content-end">
                    <button class="btn btn-success btn-sm" @click="sendMessage">
                        <span v-if="loading">
                            <svg-icon type="mdi" :path="path"></svg-icon> Enviando sua mensagem...
                        </span>
                        <span v-else>
                            <svg-icon type="mdi" :path="path"></svg-icon> Enviar
                        </span>
                    </button>
                </div></span>
            </div>
        </div>
    </div>
</template>

<script>
import { notify } from '@kyvg/vue3-notification'
import SvgIcon from '@jamescoyle/vue-icon';
import { URL_API } from '../configs/index.js'
//import { mdiMessageReplyText } from '@mdi/js';
import { mdiSendCircleOutline, mdiFacebook, mdiWhatsapp, mdiYoutubeTv } from '@mdi/js';
import axios from "axios"


export default {
    name: "navBar-component",
    components: {
        SvgIcon
    },
    data() {
        return {
            contacto:[],
            erros: [],
            items: {
                nome: '',
                telemovel: '',
                email: '',
                mensagem: '',
            },
            loading: false,
            path: mdiSendCircleOutline, mdiFacebook, mdiWhatsapp, mdiYoutubeTv
        }
    },

    created(){
        this.getContacto();
    },
    methods: {
        sendMessage() {
            this.loading = true
            axios.post(`${URL_API}/sendMessage`, this.items)
                .then(() => {
                    notify({
                        title: 'Success',
                        text: 'A sua mensagem foi enviada com sucesso. Aguarde pela sua resposta',
                        type: 'success'
                    }),
                        this.items = {
                            nome: '',
                            telemovel: '',
                            email: '',
                            mensagem: '',
                        }
                })
                .catch((erro) => this.erros = erro.response.data.errors)
                .finally(() => this.loading = false)
        },

        getContacto(){
            this.$store.dispatch('getContacto')
                        // .then((response)=>this.contacto=response.data)
                        // .catch((erro)=>console.log(erro))
        }
    },
    computed:{
        getMyContacto(){
            return  this.$store.getters.contarContacto

        }
    }
}
</script>

<style scoped></style>