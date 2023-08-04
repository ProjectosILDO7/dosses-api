<template>
    <div class="card col-xs-12 col-sm-12 col-md-6 col-lg-4 mt-4 m-auto">
        <div class="card-header text-center">
            <span class="text-secondary">Connecte-se</span>
        </div>
        <div class="card-body">
            <form @submit.prevent="auth">
                <div class="form-group">
                    <label for="exampleInputEmail1" class="col-12">E-mail</label>
                    <span class="text-danger small col-12" v-if="erros.email">{{ erros.email[0] }}</span>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        placeholder="Entre com e-mail" v-model="email">
                    <small id="emailHelp" class="form-text text-muted">ildomar@gmail.com</small>
                </div>
                <div class="form-group mt-2">
                    <label for="exampleInputPassword1" class="col-12">Senha</label>
                    <span class="text-danger small col-12" v-if="erros.password">{{ erros.password[0] }}</span>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Palavra chave"
                        v-model="password">
                </div>

                <div class="d-grid gab mt-4">
                    <button type="submit" class="btn btn-primary btn-sm">
                        <div v-if="loading">
                            <svg-icon type="mdi" :path="path"></svg-icon> Verificar autenticação...
                        </div>
                        <div v-else>
                            <svg-icon type="mdi" :path="path"></svg-icon> Entrar
                        </div>
                    </button>
                </div>

                <div class="text-center mt-4 mb-4">
                    <span class="text-secondary">
                        <router-link class="text-secondary" :to="{ name: 'home.recuperaSenha' }">
                            Esqueci minha senha
                        </router-link>
                    </span>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiLocationEnter } from '@mdi/js';
import { useStore } from 'vuex'
import { ref, watch } from 'vue'
import { notify } from "@kyvg/vue3-notification";
import router from "../router/index.js"
export default {
    name: "auth-component",
    components: {
        SvgIcon
    },
    setup() {
        const store = useStore()
        const path = ref(mdiLocationEnter)
        const email = ref("")
        const erros = ref({ email: '', password: '' })
        const password = ref("")
        const device_name = ref("")
        const loading = ref(false)

        //const loadingStore = computed(() => store.state.loading)

        watch(
            () => store.state.auth.authorization,
            (authorization) => {
                if (authorization) {
                    router.push({ name: 'admin.dashboard' })
                }
            }
        )

        const auth = () => {
            loading.value = true
            store.dispatch('auth', {
                email: email.value,
                password: password.value,
                device_name: 'dosses-api'
            })
                .then(() => {
                    router.push({ name: 'admin.dashboard' })
                })
                .catch((erro) => {
                    console.log(erro.response)
                    if (erro.response.status == 401) {
                        notify({
                            title: 'Erro',
                            text: erro.response.data.error,
                            type: 'warn'
                        })
                        erros.value = erro.response.data.errors
                    } else if (erro.response.status == 422) {
                        notify({
                            title: 'Erro',
                            text: erro.response.data.message,
                            type: 'warn'
                        })
                        erros.value = erro.response.data.errors
                    } else {
                        erros.value = erro.response.data.errors
                        notify({
                            title: 'Erro',
                            text: erro.response.data.message+', tente outra vez mais tarde',
                            type: 'warn'
                        })
                    }

                })
                .finally(() => loading.value = false)

        }

        return {
            auth,
            email,
            path,
            erros,
            password,
            device_name,
            loading,
        }
    },

}
</script>