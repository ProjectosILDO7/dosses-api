<template>
    <div class="container mt-4">
        <div class="card shadow">
            <div class="card-header text-center text-primary">Pagina de configuração</div>
            <div class="card-body">
                <div class="row">
                    <div
                        class="form-group border border-top-0 text-center border-bottom-0 border-start-0 border-5 border-end border-dark col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-2">
                        <label class="font-weight-bold"><strong>Mostre ao público imagens mais atraientes</strong></label>
                        <div class="file-upload-section mb-0">
                            <span class="text-danger small" v-if="erros.imagens">{{ erros.imagens[0] }}</span>
                            <label id="preview" for="file-upload">
                                <img v-if="items.imgPreview"
                                    :src="items.imgPreview == null ? url_no_image : items.imgPreview"
                                    class="rounded-start border border-2 cursor mb-0" />
                                <img v-else :src="url_no_image" class="rounded-start border border-2 cursor mb-0" />
                            </label>

                            <div class="file-upload">
                                <input type="file" id="file-upload" class="form-control form-control-sm invisivel"
                                    @change="onFileChange" enctype="multpart/form-data" />
                            </div>
                            <input type="text" class="form-control form-control-sm mb-2" v-model="items.titulo" placeholder="Titulo"/>
                            <input type="text" class="form-control form-control-sm mb-2" v-model="items.conteudo" placeholder="Conteudo"/>
                            <div v-if="items.imgPreview" class="col-12 mt-0 mb-2">
                                <span class="cursor" @click.prevent="removeImage()">
                                    <svg-icon type="mdi" class="text-danger" :path="mdiDeleteForever"></svg-icon>
                                </span>
                            </div>
                        </div>
                        <div class="form-group d-grid gab">
                            <button class="btn btn-sm btn-outline-success" v-if="loading">
                                <svg-icon type="mdi" :path="path"></svg-icon> Salvando imagem ...
                            </button>
                            <button class="btn btn-sm btn-outline-success" @click="saveImage" v-else>
                                <svg-icon type="mdi" :path="path"></svg-icon> Salvar
                            </button>
                        </div>

                    </div>

                    <div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-2">
                        <label class="font-weight-bold"><strong>Mostre os seus contactos aos clientes</strong></label>
                        <form>
                            <div class="row">
                                <div class="form-group col-6">
                                    <span class="text-danger small" v-if="erros.facebook">{{ erros.facebook[0] }}</span>
                                    <label class="text-secondary col-12">Página do facebook</label>
                                    <input type="text" class="form-control form-control-sm col-12 bg-light font-weight-bold"
                                        placeholder="facebook" v-model="items.facebook" />
                                </div>
                                <div class="form-group col-6">
                                    <span class="text-danger small" v-if="erros.link_facebook">{{ erros.link_facebook[0]
                                    }}</span>
                                    <label class="text-secondary col-12">Cole o link aqui</label>
                                    <input type="text" class="form-control form-control-sm col-12 bg-light font-weight-bold"
                                        placeholder="link-facebook" v-model="items.link_facebook" />
                                </div>
                                <div class="form-group col-6">
                                    <span class="text-danger small" v-if="erros.youtube">{{ erros.youtube[0] }}</span>
                                    <label class="text-secondary">Canal Youtube</label>
                                    <input type="text" class="form-control form-control-sm bg-light font-weight-bold"
                                        placeholder="youtube" v-model="items.youtube" />
                                </div>
                                <div class="form-group col-6">
                                    <span class="text-danger small" v-if="erros.link_youtube">{{ erros.link_youtube[0]
                                    }}</span>
                                    <label class="text-secondary">Link do seu canal</label>
                                    <input type="text" class="form-control form-control-sm bg-light font-weight-bold"
                                        placeholder="link-youtube" v-model="items.link_youtube" />
                                </div>
                            </div>
                            <span class="text-danger small" v-if="erros.whatsapp">{{ erros.whatsapp[0] }}</span>
                            <label class="text-secondary">Informe seu contacto do Whatsapp</label>
                            <input type="text" class="form-control form-control-sm bg-light font-weight-bold"
                                placeholder="Whatsapp" v-model="items.whatsapp" />
                        </form>
                        <div class=row>
                            <div class="form-group col-6 mt-3">
                                <button class="btn btn-sm btn-outline-success" @click="saveContacto" v-if="saveEditeBtn">
                                    <span v-if="loadingContactoBtn"><svg-icon type="mdi" :path="mdiContentSave"></svg-icon>
                                        Salvando conteudo ...</span>
                                    <span v-else><svg-icon type="mdi" :path="mdiContentSave"></svg-icon> Salvar
                                        contacto</span>
                                </button>
                                <button class="btn btn-sm btn-outline-success" @click="updateContactoBtn" v-else>
                                    <span v-if="loadingContactoBtn"><svg-icon type="mdi" :path="mdiUpdate"></svg-icon>
                                        Salvando conteudo ...</span>
                                    <span v-else><svg-icon type="mdi" :path="mdiContentSave"></svg-icon> Salvar
                                        contacto</span>
                                </button>
                            </div>
                            <div class="form-group col-6 mt-3 d-flex justify-content-end" v-if="todosContactoCount != 0">
                                <button class="btn btn-sm btn-outline-success" @click="updateContacto(pageContacto[0].id)">

                                    <span v-if="loadingEditeBtn"><svg-icon type="mdi" :path="mdiUpdate"></svg-icon>Buscando
                                        contacto...</span>
                                    <span v-else><svg-icon type="mdi" :path="mdiNoteEditOutline"></svg-icon> Editar
                                        contacto</span>

                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="form-group text-center col-xs-12 col-sm-12 col-md-12 col-lg-12 mt-2">

                        <label class="font-weight-bold"><strong>Fale sobre seus serviços aos clientes</strong></label>
                        <textarea class="form-control form-control-sm bg-light" rows="7" cols="12"
                            v-model='items.sobre'></textarea>

                        <span class="text-danger small mt-0" v-if="erros.sobre">{{ erros.sobre[0] }}</span>

                        <div class="row">
                            <div class="form-group col-6 mt-2 d-flex justify-content-start">
                                <!-- <button class="btn btn-sm btn-outline-success" @click="saveSobre"><span v-if="loadingSobreBtn"><svg-icon type="mdi" :path="mdiContentSave"></svg-icon> Salvando conteudo ...</span>
                                    <span v-else><svg-icon type="mdi" :path="mdiContentSave"></svg-icon> Salvar</span>
                                </button> -->
                                <button class="btn btn-sm btn-outline-success" @click="saveSobre" v-if="loadingConteudoBtn">
                                    <span v-if="loadingSobreBtn"><svg-icon type="mdi" :path="mdiContentSave"></svg-icon>
                                        Salvando conteudo ...</span>
                                    <span v-else><svg-icon type="mdi" :path="mdiContentSave"></svg-icon> Salvar
                                        Conteudo</span>
                                </button>
                                <button class="btn btn-sm btn-outline-success" @click="updateSobreBtnConteudo" v-else>
                                    <span v-if="loadingSobreBtn"><svg-icon type="mdi" :path="mdiUpdate"></svg-icon>
                                        Salvando conteudo ...</span>
                                    <span v-else><svg-icon type="mdi" :path="mdiContentSave"></svg-icon> Salvar
                                        conteudo</span>
                                </button>
                            </div>

                            <div class="form-group col-6 mt-2 d-flex justify-content-end" v-if="todosSobreCount != 0">
                                <button class="btn btn-sm btn-outline-success" @click="updateSobre(pageSobre[0].id)">
                                    <span v-if="loadingEditeBtnSobre"><svg-icon type="mdi"
                                            :path="mdiUpdate"></svg-icon>Buscando
                                        conteudo...</span>
                                    <span v-else><svg-icon type="mdi" :path="mdiNoteEditOutline"></svg-icon> Editar
                                        conteudo</span>
                                </button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>

        <!-- listas de registos -->
        <div class="card mt-2">
            <div class="card-header">Lista de imagens do carrossel</div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered border-success">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome imagem</th>
                                <th>Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(img, index ) in imagensDoCaroossel" :key="index">
                                <td>{{ index + 1 }}</td>
                                <td><img :src="`${url}${img.imagens}`" alt="Imagem-produto" class="imageStyle" /> </td>
                                <td>
                                    <button class="btn btn-sm btn-danger" data-bs-toggle="modal"
                                        data-bs-target="#modalDeleteConfirm" @click="apagarImagem(img.id)">
                                        <svg-icon type="mdi" :path="mdiDeleteForever" class="text-light"></svg-icon>
                                        Apagar Imagem</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Modal Confirm Delete -->
        <div class="modal fade" id="modalDeleteConfirm" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">
                            <i class="fa-solid fa-trash text-danger"></i> <svg-icon type="mdi" :path="mdiDeleteForever"
                                class="text-danger"></svg-icon> Apagar Imagem
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="form-group col-12 text-center">
                                <span class="text-primary">
                                    <h6>Tens a certeza que desejas apagar esta imagem...?</h6>
                                    <p class="text-secondary">Obs: Esta imagem desaparecerá do Carrossel...!</p>
                                    <img :src="`${url}${items.imagens}`" alt="">
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-sm btn-secondary" data-bs-dismiss="modal" @click="limparForm">
                            <span> <svg-icon type="mdi" :path="mdiClose" class="text-light"></svg-icon> Fechar</span>
                        </button>
                        <button @click.prevent="apagarImagemCarrossel(deleteProdutoId)" type="button"
                            class="btn btn-sm btn-danger">
                            <span v-if="loading">
                                <svg-icon type="mdi" :path="mdiDeleteForever" class="text-light"></svg-icon>
                                Apagando a imagem...
                            </span>
                            <span v-else>
                                <svg-icon type="mdi" :path="mdiDeleteForever" class="text-light"></svg-icon> Apagar
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Modal Confirm Delete -->
    </div>
</template>

<script>
import { URL_BASE } from '@/configs/index.js'
import SvgIcon from '@jamescoyle/vue-icon';
import { notify } from "@kyvg/vue3-notification";
import { mdiImageArea, mdiContentSave, mdiDeleteForever, mdiClose, mdiNoteEditOutline, mdiUpdate } from '@mdi/js';


export default {
    name: 'pagina-config',
    components: {
        SvgIcon,
    },
    data() {
        return {
            path: mdiImageArea, mdiContentSave, mdiDeleteForever, mdiClose, mdiNoteEditOutline, mdiUpdate,
            url: URL_BASE + '/storage/image/produtos/',
            url_no_image: "/image/no-image0.jpg",
            loading:false,
            loadingImage: false,
            loadingContactoBtn: false,
            loadingEditeBtnSobre: false,
            loadingSobreBtn: false,
            loadingEditeBtn: false,
            saveEditeBtn: true,
            loadingConteudoBtn:true,
            filter: '',
            deleteProdutoId: '',
            items: {
                imagens: '',
                imgPreview: null,
                sobre: '',
                facebook: '',
                link_facebook: '',
                titulo:'',
                conteudo:'',
                youtube: '',
                link_youtube: '',
                whatsapp: '',
            },
            erros: [],

        }
    },
    created() {
        this.loadingImagens()
        this.loadingSobre()
        this.loadingContacto()
    },

    computed: {
        imagensDoCaroossel() {
            return this.$store.getters.todasImagens(this.filter)
        },

        pageSobre() {
            return this.$store.getters.pageSobre(this.filter)
        },
        pageContacto() {
            return this.$store.getters.pageContacto(this.filter)
        },

        todosContactoCount() {
            return this.$store.getters.todosContactoCount
        },

        todosSobreCount() {
            return this.$store.getters.todosSobreCount
        }


    },

    methods: {
        saveSobre() {
            this.loadingSobreBtn = true
            this.$store.dispatch('savePageSobre', this.items)
                .then((resposta) => console.log(resposta))
                .catch((erro) => this.erros = erro.response.data.errors)
                .finally(() => this.loadingSobreBtn = false)
        },

        updateContactoBtn() {
            this.loadingContactoBtn = true
            this.$store.dispatch('updateContactoBtn', this.items)
                .then(() => {
                    notify({
                        title: "Sucesso",
                        text: 'Contacto actualizado com sucesso',
                        type: "success"
                    })
                })
                .catch((erro) => console.log(erro))
                .finally(() => this.loadingContactoBtn = false)
        },

        updateSobreBtnConteudo() {
            this.loadingSobreBtn = false
            this.$store.dispatch('updateSobreBtnConteudo', this.items)
                .then(() => {
                    notify({
                        title: "Sucesso",
                        text: 'Conteudo actualizado com sucesso',
                        type: "success"
                    })
                })
                .catch((erro) => console.log(erro))
                //.finally(() => this.loadingSobreBtn = true)
        },

        updateContacto(id) {
            this.loadingEditeBtn = true
            this.$store.dispatch('updateContacto', id)
                .then((resposta) => this.items = resposta.data)
                .catch((erro) => console.log(erro))
                .finally(() => {
                    this.loadingEditeBtn = false
                    this.saveEditeBtn = false
                })
        },

        updateSobre(id) {
            this.$store.dispatch('updateSobreConteudoForm', id)
                .then((resposta) => {
                    this.items = resposta.data
                })
                .catch((erro) => console.log(erro))
                .finally(() => {
                    this.loadingConteudoBtn = false
                })
        },

        saveContacto() {
            this.loadingContactoBtn = true
            this.$store.dispatch('createContacto', this.items)
                .then((resp) => {
                    console.log(resp)
                    notify({
                        title: "Sucesso",
                        text: 'Contacto adicionado com sucesso',
                        type: "success"
                    })
                })
                .catch((erro) => {
                    this.erros = erro.response.data.errors,
                        notify({
                            title: "Erro",
                            text: erro.response.data,
                            type: "warn"
                        })
                })
                .finally(() => {
                    this.loadingContactoBtn = false,
                        this.loadingContacto(),
                        this.limparForm()
                })
        },
        loadingSobre() {
            this.$store.dispatch('loadingSobre')
        },

        loadingContacto() {
            this.$store.dispatch('loadingContacto')
        },

        limparForm() {
            this.items = {
                imagens: '',
                imgPreview: null,
                facebook: '',
                titulo:'',
                conteudo:'',
                link_facebook: '',
                youtube: '',
                link_youtube: '',
                sobre: ''
            }
        },
        apagarImagem(id) {
            this.deleteProdutoId = id
            this.$store.dispatch('detalhesImage', id)
                .then((resposta) => this.items.imagens = resposta.data.imagens)
                .catch(() => {
                    notify({
                        title: "Erro",
                        text: 'Erro ao bnuscar a imagem',
                        type: "warn"
                    })
                })
        },

        apagarImagemCarrossel(id) {
            this.loadingImage = true
            this.$store.dispatch('apagarImage', id)
                .then(() => {
                    notify({
                        title: "Sucesso",
                        text: 'A imagem foi apagada com sucesso',
                        type: "success"
                    })
                })
                .catch((erro) => console.log(erro))
                .finally(() => {
                    this.loadingImage = false
                    this.loadingImagens()
                })
        },
        loadingImagens() {
            this.$store.dispatch('loadingImagens')
        },
        // Uplodd Image for Save
        onFileChange(e) {
            this.file = e.target.files[0];
            this.items.imgPreview = URL.createObjectURL(this.file);
            // let reader = new FileReader();
            let reader = new FileReader();
            reader.onloadend = () => {
                this.items.imagens = reader.result;
            };
            reader.readAsDataURL(this.file);
            reader.onloadend = () => {
                this.items.imagens = reader.result;
            };
            reader.readAsDataURL(this.file);
        },

        removeImage() {
            this.items.imagens = null;
            this.items.imgPreview = null;
        },

        // Upload Image for Update

        onFileChangeEdit(e) {
            this.editImage = false;
            this.file = e.target.files[0];
            this.items.imgPreview = URL.createObjectURL(this.file);

            let reader = new FileReader();
            reader.onloadend = () => {
                this.items.imagens = reader.result;
            };
            reader.readAsDataURL(this.file);
        },
        removeImageEdit() {
            this.editImage = false;
            this.items.imagens = null;
            this.items.imgPreview = this.url_no_image;
        },

        saveImage() {
            this.loading = true
            this.$store.dispatch("createImage", this.items)
                .then(() => {
                    notify({
                        title: "Sucesso",
                        text: 'Imagem salva com sucesso',
                        type: "success",
                    });

                    this.items = {
                        imagens: '',
                        imgPreview: null,
                    }
                    this.loadingImagens();
                })
                .catch((erro) => {
                    console.log(erro)
                    this.erros = erro
                })
                .finally(() => this.loading = false)
        },

    }
}
</script>

<style scoped>
.topoMargin {
    margin-top: -5% !important;
}

.cursor {
    cursor: pointer;
}

img {
    width: 150px;
    height: 150px;
    object-fit: fill;
}

.imageStyle {
    max-width: 12% !important;
    height: 12% !important;
}

.cursor {
    cursor: pointer !important;
}

.invisivel {
    visibility: hidden;
}

.tamanhoUserImage {
    width: 100% !important;
    height: 20% !important;
}
</style>
    
