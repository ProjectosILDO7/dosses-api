<template>
  <div class="container mt-4">
    <topo-page-component :namePage="namePage" :nameButton="nameButto" :pageTopoIcon="pageTopoIcon"
      @buscar-curso-id="buscaProdutoID" v-if="me.acesso == 'RF' || me.acesso == 'super_admin'"/>

    <br />

    <!-- Área de impressão -->
    <div class="row">
      <div class="form-group col-6 text-start mb-2" v-if="todosProdutosCount != 0">
        <!-- Export Excel file -->
        <download-excel class="btn btn-sm btn-success" :data="produtos" :fields="fields" :json_meta="json_meta" type="xls"
          worksheet="Meus Produtos" name="Lista de produtos.xls" v-if="me.acesso == 'RF' || me.acesso == 'super_admin'">
          <svg-icon type="mdi" :path="mdiFileExcel"></svg-icon> Exportar lista de produtos
        </download-excel>

        <!-- <a class="btn btn-sm btn-primary ml-2" :href="`${urlExport}${meID}`">
          <i class="fa-solid fa-bag-shopping text-warning"></i>
          Folha de pagamento
        </a> -->

        <!-- Exportar no plugin xlsx -->
        <!-- <button class="btn btn-sm btn-outline-success" @click="exportExcel">
          <i class="fa-solid fa-file-excel"></i> Exportar para Excel
        </button> -->

      </div>

      <div class="form-group col-6 text-end mb-2" v-if="todosProdutosCount != 0">
        <span class="rext-secondary">Total de Produtos:</span>
        <span class="rext-secondary fw-bold"> ( {{ todosProdutosCount }} )</span>
      </div>

      <div class="form-group col-12 text-end mb-2" v-else>
        <span class="rext-secondary">Total de produtos:</span>
        <span class="rext-secondary fw-bold"> ( {{ todosProdutosCount }} )</span>
      </div>
    </div>
    <!-- Înput search -->
    <form class="d-flex" role="search" v-if="todosProdutosCount >= 10">
      <div class="input-group flex-nowrap">
        <span class="input-group-text" id="addon-wrapping"><i class="fa-solid fa-magnifying-glass"></i></span>
        <input class="form-control form-control-sm" v-model="filter" type="search" placeholder="Pesquisar"
          aria-label="Search" />
      </div>
    </form>
    <!-- End input search -->

    <div class="row" v-if="produtos == ''">
      <div class="form-group col-12 text-danger text-center fw-bold">
        Nenhum registo econtrado...
      </div>
    </div>


    <!-- ^Lista de produtos -->
    <div class="card">
      <div class="card-header" v-if="me.acesso == 'RF' || me.acesso == 'super_admin'"><svg-icon type="mdi" class="text-success" :path="mdiShopping"></svg-icon> <strong>Meus produtos</strong></div>
      <div class="card-header" v-else><svg-icon class="text-success" type="mdi" :path="mdiCartMinus"></svg-icon> <strong>Produtos desponivel</strong></div>
      <div class="card-body">
        <section style="background-color: #f1f1f1;" class="mt-2">
          <div class="container py-4">
            <div class="row justify-content-center">
              <div class="col-md-8 col-lg-6 col-xl-4 mt-2 animate__animated animate__zoomIn" v-for="produto in produtos"
                :key="produto.id">
                <div class="card text-black shadow">
                  <p class="text-secondary h6">
                    <span v-show="produto.image_produto">
                      <router-link to="#">
                        <!-- <img :src="`${url}${produto.image_produto}`" alt="image" class="rounded-circle rounded-3 tamanhoUserImage" /> -->
                        <img :src="`${url}${produto.image_produto}`" alt="image" class="tamanhoUserImage" />
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
                          <button class="btn btn-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg-icon type="mdi" :path="path"></svg-icon>
                          </button>
                          <ul class="dropdown-menu">
                            <li v-if="me.acesso == 'RF' || me.acesso == 'super_admin'">
                              <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                @click="updateProdutoForm(produto.id)"><svg-icon class="text-success" type="mdi"
                                  :path="mdiFileEditOutline"></svg-icon>
                                Alterar</a>
                            </li>
                            <li v-if="me.acesso == 'RF' || me.acesso == 'super_admin'">
                              <a class="dropdown-item" href="#" data-bs-toggle="modal"
                                data-bs-target="#modalDeleteConfirm" @click="deleteProduto(produto.id)"><svg-icon
                                  type="mdi" class=text-danger :path="mdiDeleteForever"></svg-icon> Apagar</a>
                            </li>

                            <li v-if="me.acesso=='RC'">
                              <a class="dropdown-item" href="#" @click="pedirProduto(produto.id)">
                                <svg-icon class="text-success" type="mdi" :path="mdiCartMinus"></svg-icon> Fazer pedido
                              </a>
                            </li>

                            <li>
                              <a class="dropdown-item" href="#" data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"
                                @click="detalhes(produto.id)">
                                <svg-icon class="text-primary" type="mdi"
                                  :path="mdiInformationVariantCircleOutline"></svg-icon> Vêr Detalhes
                              </a>
                            </li>
                            <!-- <li>
                    <router-link class="dropdown-item" :to="{ name:'admin.pagamentos', params:{id:Produto.id} }">
                      <i class="fa-solid fa-credit-card"></i>
                      Efectuar pagamentos
                    </router-link>
                  </li> -->
                          </ul>
                        </div>
                      </span><span class="text-muted text-success">
                        {{ vueNumberFormat(produto.preco, { isInteger: true, suffix: ' Kz' }) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <br />


    <!-- Modal cadastrar e editar-->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-md modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              <i class="fa-solid fa-user-tie"></i>
              <span v-if="btnSaveVariavel">Cadastre novo produto</span>
              <span v-else>Alterar dados do produto</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <form action="">
                <!-- Componente de upload de imagem -->
                <div class="form-group col-12 text-start">
                  <label for="file-upload" class="text-secondary col-12 cursor">Selecione uma foto do
                    produto</label>
                  <span class="text-danger small col-12" v-if="erros.image_produto">{{
                    erros.image_produto[0]
                  }}</span>

                  <div class="file-upload-section mb-0" v-if="btnSaveVariavel">

                    <label id="preview" for="file-upload">
                      <img v-if="items.imgPreview" :src="items.imgPreview == null ? url_no_image : items.imgPreview"
                        class="rounded-start border border-2 cursor mb-0" />
                      <img v-else :src="url_no_image" class="rounded-start border border-2 cursor mb-0" />
                    </label>

                    <div class="file-upload">
                      <input type="file" id="file-upload" class="form-control form-control-sm invisivel"
                        @change="onFileChange" enctype="multpart/form-data" />
                    </div>

                    <div v-if="items.imgPreview" class="col-12 d-grid gap-2">
                      <span class="cursor" @click.prevent="removeImage()">
                        <i class="fa-solid fa-trash-can h3 text-danger"></i>
                      </span>
                    </div>

                  </div>

                  <div class="file-upload-section mb-0" v-else>
                    <label id="preview" for="file-upload" v-show="editImage">
                      <img v-if="`${url}${items.image_produto}`" :src="`${url}${items.image_produto}`"
                        class="rounded-start border border-2 cursor mb-0" />
                    </label>

                    <label id="preview" for="file-upload">
                      <img v-if="items.imgPreview" :src="items.imgPreview"
                        class="rounded-start border border-2 cursor mb-0" />
                    </label>
                    <!-- `${url}${items.image}`===null ? url_no_image:`${url}${items.image}` -->
                    <div class="file-upload">
                      <input type="file" id="file-upload" class="form-control form-control-sm invisivel"
                        @change="onFileChangeEdit" enctype="multipart/form-data" />
                    </div>
                    <div v-if="`${url}${items.image_produto}`" class="col-12 text-center" v-show="editImage">
                      <span class="cursor" @click.prevent="removeImageEdit()">
                        <i class="fa-solid fa-trash-can h3 text-danger"></i>

                      </span>
                    </div>

                    <div v-else class="col-12 mt-2 text-center">
                      <span class="cursor" @click.prevent="removeImage()">
                        <i class="fa-solid fa-trash-can h3 text-danger"></i>

                      </span>
                    </div>
                  </div>
                </div>


                <div class="form-group col-12 mb-2">
                  <span class="text-danger small col-12" v-if="erros.categoria_id">{{ erros.categoria_id[0]
                  }}</span>
                  <label for="" class="text-secodary col-12">Selecione uma categoria:</label>
                  <select class="form-control form-control-sm fw-bold" v-model="items.categoria_id">
                    <option disabled class="selected" value="">
                      Selessione uma categoria
                    </option>
                    <option :value="categoria.id" v-for="categoria in getCategoriaID" :key="categoria.id">
                      {{ categoria.nome_categoria }}
                    </option>
                  </select>
                </div>

                <div class="form-group col-12 mb-2">
                  <span class="text-danger small col-12" v-if="erros.nome_produto">{{
                    erros.nome_produto[0]
                  }}</span>
                  <label for="" class="text-secodary col-12">Produto</label>
                  <input type="text" class="form-control form-control-sm fw-bold" placeholder="Informe nome do produto"
                    v-model="items.nome_produto" />
                </div>

                <div class="form-group col-12 mb-2 mb-2">
                  <span class="text-danger small col-12" v-if="erros.preco">{{
                    erros.preco[0]
                  }}</span>
                  <label for="" class="text-secodary">Preço de venda</label>
                  <VueNumberFormat class="form-control form-control-sm" v-model:value="items.preco"
                    :options="{ precision: 2, prefix: '', suffix: ' ', isInteger: true, acceptNegative: false, masked: false }">
                  </VueNumberFormat>
                </div>

                <div class="form-group col-12 mb-2">
                  <span class="text-danger small col-12" v-if="erros.receita">{{
                    erros.receita[0]
                  }}</span>
                  <label for="" class="text-secodary col-12">Receita</label>
                  <textarea class="form-control" v-model="items.receita" placeholder="Informe a receita" rows="4"
                    cols="12"></textarea>
                </div>

                <div class="form-group col-12 mb-2">
                  <span class="text-danger small col-12" v-if="erros.descricao">{{
                    erros.descricao[0]
                  }}</span>
                  <label for="" class="text-secodary col-12">Descrição</label>
                  <textarea class="form-control" v-model="items.descricao" placeholder="Mais detalhes" rows="4"
                    cols="12"></textarea>
                </div>
              </form>
            </div>
          </div>

          <div class="modal-footer" v-if="btnSaveVariavel">
            <button type="submit" @click="cleanForm" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">
              <span> <i class="fa-solid fa-circle-xmark"></i> Fechar </span>
            </button>
            <button @click.prevent="registerProduto" type="button" class="btn btn-sm btn-success">
              <span v-if="loading">
                <i class="fa-regular fa-floppy-disk"></i>
                Tentando salvar...
              </span>
              <span v-else>
                <i class="fa-regular fa-floppy-disk"></i>
                Cadastrar
              </span>
            </button>
          </div>

          <div class="modal-footer" v-else>
            <button type="submit" @click="cleanForm" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">
              <span> <i class="fa-solid fa-circle-xmark"></i> Fechar </span>
            </button>
            <button @click.prevent="updateProduto" type="button" class="btn btn-sm btn-success">
              <span v-if="loading">
                <i class="fa-regular fa-floppy-disk"></i>
                salvando a alteração...
              </span>
              <span v-else>
                <i class="fa-regular fa-floppy-disk"></i> Salvar
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- End Modal cadastrar e editar-->

    <!-- Modal Confirm Delete -->
    <div class="modal fade" id="modalDeleteConfirm" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              <i class="fa-solid fa-trash text-danger"></i> Apagar Produto
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="form-group col-12 text-center">
                <span class="text-primary">
                  <h6>Tens a certeza que desejas apagar este produto...?</h6>
                </span>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">
              <span> <i class="fa-solid fa-circle-xmark"></i> Fechar </span>
            </button>
            <button @click.prevent="apagarProduto(deleteProdutoId)" type="button" class="btn btn-sm btn-danger">
              <span v-if="loading">
                <i class="fa-regular fa-floppy-disk"></i>
                Apagando o estudante...
              </span>
              <span v-else>
                <i class="fa-regular fa-floppy-disk"></i> Apagar
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- End Modal Confirm Delete -->

    <!-- Înfo Canvas - informações a direita -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div class="offcanvas-header">
        <div class="form-group col-9 text-end text-info">
          <h5 id="offcanvasRightLabel text-center">DETALHES DO PRODUTOS</h5>
        </div>
        <div class="form-group col-3 text-end">
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
      </div>
      <div class="offcanvas-body">
        <div class="row">
          <div class="form-group col-12 text-center">
            <span v-show="info.image_produto">
              <router-link :to="`${url}${info.image_produto}`" target="_blank">
                <img :src="`${url}${info.image_produto}`" alt="image" class=""
                  style="width: 100% !important; height: 100% !important" />
              </router-link>
            </span>
            <span v-show="!info.image_produto"><img :src="url_no_image" alt="Sem_imagem" class=""
                style="width: 100% !important; height: 100% !important" /></span>
          </div>
        </div>

        <hr />

        <div class="row">
          <div class="form-group col-12 text-center">
            <div class="card shadow">
              <h4>
                <span class="text-danger">{{ info.nome_produto }}</span>
              </h4>
            </div>
          </div>

          <div class="form-group col-12 mt-4">
            <div class="card mt-2">
              <div class="card-body">
                <p class="text-success">Pertense a categoria:</p>
                <p class="text-secondary mt-0 fw-bold topoMargin">
                  {{ info.categorias.nome_categoria }}
                </p>
              </div>
            </div>

            <div class="card mt-2">
              <div class="card-body">
                <p class="text-success">Preço:</p>
                <p class="text-secondary mt-0 fw-bold topoMargin">
                  {{ info.preco }}
                </p>
                <p class="text-success topoMargin">Receita:</p>
                <p class="text-secondary mt-0 fw-bold topoMargin"><span class="p-3 bg-info bg-opacity-10 border border-info border-start-0 rounded-end"> {{ info.receita }}</span></p>

              </div>
            </div>
            <div class="card mt-2">
              <div class="card-body">
                <p class="text-success">Descrição do produto:</p>
                <p class="text-primary mt-0 fw-bold topoMargin"><span class="p-3 bg-info bg-opacity-10 border border-info border-start-0 rounded-end">{{ info.descricao }}</span></p>

              </div>
            </div>
            <div class="card mt-2">
              <div class="card-body">
                <p class="text-success">Data de registo:</p>
                <p class="text-secondary topoMargin">
                  <span> {{ formatoDeDadta }} </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { notify } from "@kyvg/vue3-notification";
import moment from 'moment';
//import dateFormat from "@vue-formily/date-format";
import topoPageComponent from "../partials/topoPageComponent.vue";
//import Datepicker from "vue3-datepicker"
//import { pt } from 'date-fns/locale'
import { URL_API, URL_BASE } from '../../../../configs/index.js'
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiMenu, mdiFileEditOutline, mdiDeleteForever, mdiCartMinus, mdiInformationVariantCircleOutline, mdiEyeOutline, mdiEyeOff, mdiFileExcel } from '@mdi/js';

export default {
  name: "Produto-component",
  emits: ["cleanForm", "buscaProdutoID"],
  data() {
    return {
      urlExport: URL_API + '/ExportToExcelListaPagamento/',
      url: URL_BASE + '/storage/image/produtos/',

      url_no_image: "/image/no-image0.jpg",
      editImage: false,
      meID: '',
      //locale: pt,
      btnSaveVariavel: false,
      path: mdiMenu, mdiFileEditOutline, mdiDeleteForever,mdiCartMinus, mdiInformationVariantCircleOutline, mdiFileExcel, mdiEyeOutline, mdiEyeOff,
      items: {
        categoria_id: "",
        nome_produto: "",
        image_produto: '',
        descricao: "",
        preco: '',
        imgPreview: null,
        receita: "",
      },
      data: [
        {
          nome_produto: "",
          categorias: {
            nome_categoria: "",
          },
          preco: "",
          receita: "",
          descricao: "",
        },
      ],
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
      fields: {
        "Nome do produto": "nome_produto",
        "Categoria": "categorias.nome_categoria",
        "preço": "preco",
        "receita": "receita",
        "descricao": "descricao",
      },
      erros: {
        categoria_id: "",
        nome_produto: "",
        image_produto: '',
        descricao: "",
        preco: '',
        imgPreview: null,
        receita: "",
        form: '',
      },
      deleteProdutoId: "",
      filter: "",
      info: {
        categorias: {
          nome_categoria: "",
        },
        nome_produto: "",
        image_produto: '',
        descricao: "",
        preco: '',
        imgPreview: null,
        receita: "",
      },

      categoriaInfo: "",
      remoneracaoInfo: "",
      emailInfo: "",
      adminInfo: "",
      senhaReservaInfo: "",
      inputFormat: "dd-MM-yyyy",

      fomatoData: "",
      namePage: "Produto",
      nameButto: "Novo produto",
      loading: false,

    };
  },

  created() {
    this.loadingProdutos();
    this.loadingCategorias();
  },

  computed: {
    formatoDeDadta() {
      moment.locale('pt-br');
      return moment(this.info.created_at).format('LLLL');
    },
    produtos() {
      //return this.$store.state.estudantes.items.filter(estudante =>toUpperCase(estudante.nome.includes(toUpperCase(this.filter))))
      return this.$store.getters.todosProdutos(this.filter);
    },

    todosProdutosCount() {
      return this.$store.getters.todosProdutosCount;
    },

    getCategoriaID() {
      return this.$store.getters.todasCategorias(this.filter);
    },

    me() {
      return this.$store.state.auth.user
    },
  },

  methods: {
    // exportExcel() {
    //   import('../../../../plugins/Export2Excel').then(excel => {
    //     this.$store.dispatch('loadingProdutosExcel')
    //       .then((response) => {
    //         console.log(response.data)
    //         const OBJ = response.data;

    //         const Header = ["Nome completo", "Nº do Bilhete", "categorias", "Area de acesso", "E-mail"];

    //         const field = ["name", "numBI", "categorias.categoria", "users.admin", "users.email"];

    //         const Data = this.formatJSON(field, OBJ);
    //         excel.export_json_to_excel({
    //           header: Header,
    //           data: Data,
    //           sheetName: "produtos",
    //           filename: "Lista de produtos",
    //           autoWidth: true,
    //           bookType: "xlsx"
    //         })
    //       })
    //   })
    // },

    formatJSON(FilterData, JsonData) {
      return JsonData.map((v) => FilterData.map((j) => {
        return v[j];
      }))
    },
    // Uplodd Image for Save
    onFileChange(e) {
      this.file = e.target.files[0];
      this.items.imgPreview = URL.createObjectURL(this.file);
      // let reader = new FileReader();
      let reader = new FileReader();
      reader.onloadend = () => {
        this.items.image_produto = reader.result;
      };
      reader.readAsDataURL(this.file);
      // reader.onloadend = () => {
      //   this.items.image_produto = reader.result;
      // };
      // reader.readAsDataURL(this.file);
    },

    removeImage() {
      this.items.image_produto = null;
      this.items.imgPreview = null;
    },

    // Upload Image for Update

    onFileChangeEdit(e) {
      this.editImage = false;
      this.file = e.target.files[0];
      this.items.imgPreview = URL.createObjectURL(this.file);

      let reader = new FileReader();
      reader.onloadend = () => {
        this.items.image_produto = reader.result;
      };
      reader.readAsDataURL(this.file);
    },
    removeImageEdit() {
      this.editImage = false;
      this.items.image_produto = null;
      this.items.imgPreview = this.url_no_image;
    },

    getProdutoFind(pesquisa) {
      this.wordFind = this.$store.getters.getProdutoFind(pesquisa);
    },

    buscaProdutoID() {
      this.cleanForm();
      this.btnSaveVariavel = true;
    },
    detalhes(id) {
      this.info = [];
      this.$store
        .dispatch("detalhesProduto", id)
        .then((response) => {
          console.log(response)
          this.info = response.data;
        })
        .catch((error) => {
          notify({
            title: "Erro de localização",
            text: error,
            type: "warn",
          });
        });
    },

    cleanForm() {
      this.items = {
        categoria_id: "",
        nome_produto: "",
        image_produto: '',
        descricao: "",
        preco: '',
        imgPreview: null,
        receita: "",
      },
        this.erros = [];
      this.btnSaveVariavel = false
    },

    loadingCategorias() {
      //var store = useStore()
      this.$store.dispatch("loadingCategorias");
    },

    loadingProdutos() {
      //var store = useStore()
      this.$store.dispatch("loadingProdutos");
    },

    registerProduto() {

      this.$store.dispatch("createProduto", this.items, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((response) => {
          notify({
            title: "Sucesso",
            text: "Registado com sucesso",
            type: "success",
          });
          console.log(response);
          this.loadingProdutos();

          this.cleanForm();
          this.erros = [];
        })
        .catch((error) => {
          this.erros = error;
          notify({
            title: "Erro",
            text: "Ocorreu um erro durante o processo de cadastro!",
            type: "warn",
          });
        });
    },
    updateProdutoForm(id) {
      this.btnSaveVariavel = false;
      this.editImage = true;
      this.cleanForm();
      this.$store
        .dispatch("updateFormProduto", id)
        .then((response) => { console.log(response.data), (this.items = response.data) })
        .catch(() => {
          notify({
            title: "Não encotrado",
            text: "O produto que pretendes localizar não existe",
            type: "warn",
          });
        });
    },

    updateProduto() {
      this.$store
        .dispatch("updateProduto", this.items)
        .then((response) => {
          notify({
            title: "Sucesso",
            text: response.data.message,
            type: "success",
          });
          this.loadingProdutos();
          this.cleanForm();
          this.erros = [];
        })
        .catch((error) => {
          this.erros = error.response.data.errors;
          console.log(this.erros)
          notify({
            title: "Erro",
            text: "Erro durante a actualização",
            type: "warn",
          });
        });
    },

    deleteProduto(id) {
      this.deleteProdutoId = id;
    },

    inativo(id) {
      this.$store.dispatch('inativo', id)
    },

    activo(id) {
      this.$store.dispatch('activo', id)
    },

    apagarProduto(id) {
      this.$store
        .dispatch("apagarProduto", id)
        .then((response) => {
          notify({
            title: "Sucesso",
            text: response.data.message,
            type: "success",
          });
          this.loadingProdutos();
        })
        .catch((error) => {
          notify({
            title: "Erro",
            text: error.data.erro,
            type: "warn",
          });
        });
    },

    pedirProduto(id){
      this.$store.dispatch('pedirProduto', id)
                  .then((resposta)=> {
                    this.$swal.fire({
                        title: 'Sucesso',
                        text: resposta.data,
                        icon: 'info',
                        timer: 15000
                    })
                  })
                  .catch((erro)=>console.log(erro))
    }

  },

  components: {
    topoPageComponent,
    SvgIcon
    //Datepicker,
  },
};
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

.cursor {
  cursor: pointer !important;
}

.invisivel {
  visibility: hidden;
}

.tamanhoUserImage {
  width: 100% !important;
  height: 50% !important;
}
</style>
