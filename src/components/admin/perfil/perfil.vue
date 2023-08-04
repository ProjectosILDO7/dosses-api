<template>
    <div class="container mt-4">
        <div class="card shadow animate__animated animate__bounce">
            <div class="card-body">
                <div class="row">
                    <div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <h4 class="text-secondary"><i class="fa-solid fa-circle-user"></i> Meu Perfil</h4>
                    </div>
                    <div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6 d-flex justify-content-end">
                        <span class="text-secondary">
                            <router-link class="text-decoration-none text-success" to="#"><i
                                    class="fa-regular fa-pen-to-square"></i> Actualizar perfil</router-link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <p />
        <div class="card col-6 mt-4 shadow m-auto">
            <div class="card-body">

                <div class="row">
                    <div class="form-group col-12 text-center mt-2 mb-2">
                        <div class="file-upload-section mb-0">
                                <label id="preview" for="file-upload" v-show="editImage">

                                        <img :src="url_no_image" class="rounded-start border border-2 cursor mb-0" />

                                </label>
                            </div>
                    </div>
                    <form action="#" @submit.prevent="updatePerfil">

                        <div class="col-12 m-auto mb-4 has-validation">
                            <span class="small text-danger" v-if="erro.name">{{ erro.name[0] }}</span>
                            <label class="visually-show text-secondary" for="inlineFormInputGroupUsername">NOME
                                PRÓPRIO</label>
                            <div class="input-group">
                                <div class="input-group-text"><svg-icon type="mdi" :path="path"></svg-icon></div>
                                <input type="text" name="name" id="inlineFormInputGroupUsername"
                                    :class="['form-control form-control-sm disabled bg-light', { 'is-invalid': erro.name }]"
                                    v-model="user.name">
                            </div>
                        </div>

                        <div class="col-12 m-auto mb-4">
                            <span class="small text-danger" v-if="erro.email">{{ erro.email[0] }}</span>
                            <label class="visually-show text-secondary" for="inlineFormInputGroupUsername">E-MAIL DE
                                ACESSO</label>
                            <div class="input-group has-validation">
                                <div class="input-group-text"><svg-icon type="mdi" :path="mdiEmailOutline "></svg-icon></div>
                                <input type="email" name="email" id="inlineFormInputGroupUsername"
                                    :class="['form-control form-control-sm disabled bg-light', { 'is-invalid': erro.email }]"
                                    v-model="user.email">
                            </div>
                        </div>

                        <div class="col-12 m-auto mb-4">
                            <span class="small text-danger" v-if="erro.password">{{ erro.password[0] }}</span>
                            <label class="visually-show text-secondary" for="inlineFormInputGroupUsername"> "OPCIONAL"
                                INFORME NOVA SENHA</label>
                            <div class="input-group has-validation">
                                <div class="input-group-text"><svg-icon type="mdi" :path="mdiAccountLockOutline "></svg-icon></div>
                                <input type="password" name="password" id="inlineFormInputGroupUsername"
                                    :class="['form-control form-control-sm disabled bg-light', { 'is-invalid': erro.password }]"
                                    placeholder="Informe uma nova senha" v-model="user.password">
                            </div>
                        </div>

                        <div class="col-12 m-auto mb-4 d-grid gap-2 mt-2">
                            <button type="submit" class="btn btn-sm btn-success">
                                <i class="fa-regular fa-pen-to-square"></i> <span class="" v-if="loading">Actualizando
                                    perfil...</span> <span class="" v-else>Actualizar Perfil</span>
                            </button>
                        </div>
                    </form>


                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { notify } from '@kyvg/vue3-notification'
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccountCircle, mdiAccount, mdiEmailOutline, mdiAccountLockOutline    } from '@mdi/js';

export default {
    name: "Perfil-component",
    data() {
        return {
            path:mdiAccountCircle,mdiAccount,mdiEmailOutline, mdiAccountLockOutline,
            loading: false,
            erro: '',
            imageChange: true,
            editImage: true,
            btnSaveVariavel: false,
            //url: window.url + "storage/image/funcionarios/",
            url_no_image: "/image/no-Image.jpg",

            user: {
                name: '',
                email: '',
                password: ''
            }
        }
    },

    created() {
        this.getMe()
        this.imageChange = true
    },

    methods: {
        getMe() {
            return this.$store.dispatch('meuPerfil')
                .then(response => { this.user = response })
        },
        // Uplodd Image for Save
        onFileChange(e) {
            let file = e.target.files[0];
            this.user.imgPreview = URL.createObjectURL(file);
            let reader = new FileReader();
            reader.onloadend = () => {
                this.user.image = reader.result;
            };
            reader.readAsDataURL(file);
        },
        removeImage() {
            this.user.image = null;
            this.user.imgPreview = null;
        },

        // Upload Image for Update

        onFileChangeEdit(e) {
            this.editImage = false;
            let file = e.target.files[0];
            this.user.imgPreview = URL.createObjectURL(file);

            let reader = new FileReader();
            reader.onloadend = () => {
                this.user.image = reader.result;
            };
            reader.readAsDataURL(file);
        },
        removeImageEdit() {
            this.editImage = false;
            this.user.image = null;
            this.user.imgPreview = this.url_no_image;
        },

        updatePerfil() {
            //window.location.reload(true);
            this.loading = true
            this.$store.dispatch('perfilupadate', this.user)
                .then(() =>this.getMe())
                .catch((error) => { this.erro.value = error.data.errors })
                .finally(() => {
                    notify({
                        title:'Sucesso',
                        text:'Dados de usuário alterado com success',
                        type:'success'
                    })
                    this.$router.push({name:'admin.dashboard'})
                })
        }
    },

    computed: {
        perfil() {
            return this.$store.getters.gettersMe
        }
    },

    components:{
        SvgIcon,
        mdiAccount
    }
}
</script>

<style scoped>
img {
    width: 143px;
    height: 125px;
    object-fit: fill;
}

.cursor {
    cursor: pointer !important;
}

.margTopo {
    margin-top: -20px !important;
}

.invisivel {
    visibility: hidden;
}

.tamanhoUserImage {
    width: 60px !important;
    height: 60px !important;
}
</style>