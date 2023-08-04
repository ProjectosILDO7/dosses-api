<template>
    <div class="card col-xs-12 col-sm-12 col-md-6 col-lg-4 mt-4 m-auto">
        <div class="card-header text-center">
            <span class="text-secondary">Crie sua conta</span>
        </div>
        <div class="card-body">
            <form @submit.prevent="salvarUsuario">
                <div class="form-group">
                    <label for="exampleInputName" class="col-xs-12 col-sm-12 col-md-12 col-lg-12">Nome Próprio</label>
                    <span class="text-danger small" v-if="erros.name">{{ erros.name[0] }}</span>
                    <input type="text" class="form-control" name="text" 
                        onkeyup="this.setAttribute('value', this.value);" v-model="name">
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1" class="col-xs-12 col-sm-12 col-md-12 col-lg-12">E-mail</label>
                    <span class="text-danger small" v-if="erros.email">{{ erros.email[0] }}</span>
                    <input type="email" class="form-control" name="email"
                        onkeyup="this.setAttribute('value', this.value);" v-model="email">
                </div>

                <div class="form-group">
                    <label for="exampleInputTelemovel" class="col-xs-12 col-sm-12 col-md-12 col-lg-12">Telemovel</label>
                    <span class="text-danger small" v-if="erros.telemovel">{{ erros.telemovel[0] }}</span>
                    <input type="text" class="form-control" name="email"
                        onkeyup="this.setAttribute('value', this.value);" v-model="telemovel">
                </div>

                <div class="form-group">
                    <span class="text-danger small" v-if="erros.endereco">{{ erros.endereco[0] }}</span>
                    <label for="" class="text-secodary">Endereço</label>
                    <textarea cols="12" rows="4" class="form-control form-control-sm" v-model="endereco"></textarea>
                  </div>

                <div class="form-group mt-2">
                    <label for="exampleInputPassword1" class="col-xs-12 col-sm-12 col-md-12 col-lg-12">Senha</label>
                    <span class="text-danger small" v-if="erros.password">{{ erros.password[0] }}</span>
                    <input type="password" class="form-control" name="password"
                        onkeyup="this.setAttribute('value', this.value);" v-model="password">
                </div>

                <div class="form-group mt-2">
                    <label for="exampleInputPassword1" class="col-xs-12 col-sm-12 col-md-12 col-lg-12">Confirmar senha</label>
                    <span class="text-danger small col-xs-12 col-sm-12 col-md-12 col-lg-12" v-if="erros.password_confirmation">{{ erros.password_confirmation[0] }}</span>
                    <input type="password" class="form-control" name="password_confirme"
                        onkeyup="this.setAttribute('value', this.value);" v-model="password_confirmation">
                </div>

                <div class="d-grid gab mt-4">
                    <button type="submit" class="btn btn-primary btn-sm">
                        <div v-if="loading">
                            <svg-icon type="mdi" :path="path"></svg-icon> Carregando ...
                        </div>
                        <div v-else>
                            <svg-icon type="mdi" :path="path"></svg-icon> Criar conta
                        </div>
                    </button>
                </div>

                <div class="text-center mt-4 mb-4">
                    <p>
                        <span class="text-secondary">
                            <router-link class="text-secondary" :to="{ name: 'home.login' }">
                                Já tenho uma conta
                            </router-link>
                        </span>
                    </p>

                    <p>
                        <span class="text-secondary">
                            <router-link class="text-secondary" :to="{ name: 'home.recuperaSenha' }">
                                Esqueci minha senha
                            </router-link>
                        </span>
                    </p>

                </div>
            </form>
        </div>
    </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
//import { mdiLocationEnter } from '@mdi/js';
import { mdiLoginVariant } from '@mdi/js';
//import { useStore } from 'vuex';
import { ref } from 'vue';
import { notify } from "@kyvg/vue3-notification";
import router from "../router/index.js";
import registreruser from "../service/auth/register.user.service.js"

export default {
    name: 'RegisterUser',
    components: {
        SvgIcon
    },
    setup() {
        const name = ref("")
        const email = ref("")
        const password = ref("")
        const telemovel = ref("")
        const endereco = ref("")
        const path = ref( mdiLoginVariant)
        const password_confirmation = ref("")
        const loading = ref(false)
        const erros = ref('')

        const salvarUsuario = () => {
            loading.value = true
            registreruser.register({
                name: name.value,
                email: email.value,
                endereco:endereco.value,
                telemovel:telemovel.value,
                password: password.value,
                password_confirmation: password_confirmation.value
            }).then(() => {
                notify({
                    title: 'Sucesso',
                    text: 'Conta criada com sucesso',
                    type: 'success'
                })
                router.push({ name: 'admin.home' })
            }).catch((error) => {
                erros.value = error.data.errors
            }).finally(() => loading.value = false)
        }
        return {
            erros,
            salvarUsuario,
            name,
            email,
            telemovel,
            path,
            endereco,
            password,
            password_confirmation,
            loading
        }
    },
}
</script>