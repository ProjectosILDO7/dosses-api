<template>
  <div class="container mt-4">
    <topo-page-component :namePage="namePage" :nameButton="nameButto" :pageTopoIcon="pageTopoIcon"
      @buscar-curso-id="buscaClienteID" />

    <br />

    <!-- Área de impressão -->
    <div class="row">
      <div class="form-group col-6 text-start mb-2" v-if="todosClientesCount != 0">
        <!-- Export Excel file -->
        <download-excel class="btn btn-sm btn-outline-success" :data="Clientes" :fields="fields" :json_meta="json_meta"
          type="xls" worksheet="Meus Clientes" name="Lista de Clientes.xls">
          <i class="fa-solid fa-file-excel"></i> Exportar Excel
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

      <div class="form-group col-6 text-end mb-2" v-if="todosClientesCount != 0">
        <span class="rext-secondary">Total de Clientes:</span>
        <span class="rext-secondary fw-bold"> ( {{ todosClientesCount }} )</span>
      </div>

      <div class="form-group col-12 text-end mb-2" v-else>
        <span class="rext-secondary">Total de clientes:</span>
        <span class="rext-secondary fw-bold"> ( {{ todosClientesCount }} )</span>
      </div>
    </div>
    <!-- Înput search -->
    <form class="d-flex" role="search" v-if="todosClientesCount >= 5">
      <div class="input-group flex-nowrap">
        <span class="input-group-text" id="addon-wrapping"><svg-icon type="mdi" :path="mdiTabSearch"></svg-icon></span>
        <input class="form-control form-control-sm" v-model="filter" type="search" placeholder="Pesquisar"
          aria-label="Search" />
      </div>
    </form>
    <!-- End input search -->

    <div class="row" v-if="Clientes == ''">
      <div class="form-group col-12 text-danger text-center fw-bold">
        Nenhum registo econtrado...
      </div>
    </div>

    <div class="card bg-info text-light mt-2 shadow" v-for="Cliente in Clientes" :key="Cliente.id">
      <div class="card-body">
        <div class="row">
          <div class="form-group col-xs-4 col-sm-4 col-md-4 col-lg-4 d-flex justify-content-start">
            <span class="text-secondary">
              <div class="dropdown">
                <button class="btn btn-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <svg-icon type="mdi" :path="path"></svg-icon>
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item text-secondary" href="#" data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop" @click="updateClienteForm(Cliente.id)"><svg-icon type="mdi"
                        :path="mdiFileEditOutline"></svg-icon>
                      Alterar</a>
                  </li>
                  <li>
                    <a class="dropdown-item text-secondary" href="#" data-bs-toggle="modal"
                      data-bs-target="#modalDeleteConfirm" @click="deleteCliente(Cliente.id)"><svg-icon type="mdi"
                        :path="mdiDeleteForever"></svg-icon> Apagar</a>
                  </li>
                  <li>
                    <a class="dropdown-item text-secondary" href="#" data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" @click="detalhes(Cliente.id)">
                      <svg-icon type="mdi" :path="mdiEyeOutline"></svg-icon> Vêr Detalhes
                    </a>
                  </li>
                  <!-- <li v-if="Cliente.status == 'Inativo'">
                    <a class="dropdown-item cursor" @click="activo(Cliente.id)">
                      <i class="fa-solid fa-lock-open text-primary"></i> Activar
                    </a>
                  </li>
                  <li v-else>
                    <a class="dropdown-item cursor" @click="inativo(Cliente.id)">
                      <i class="fa-solid fa-user-lock text-warning"></i> Inativar
                    </a>
                  </li> -->
                  <!-- <li>
                    <router-link class="dropdown-item" :to="{ name:'admin.pagamentos', params:{id:Cliente.id} }">
                      <i class="fa-solid fa-credit-card"></i>
                      Efectuar pagamentos
                    </router-link>
                  </li> -->
                </ul>
              </div>
            </span>
          </div>

          <div class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <label class="text-dark"><strong>Nome do cliente</strong></label>
            <p class="text-light h6">
              <span>{{ Cliente.name }}</span>
            </p>
          </div>

          <!-- <div class="form-group col-xs-2 col-sm-2 col-md-3 col-lg-3">
            <label class="text-success">Pertence ao Departamento de:</label>
            <p class="text-secondary h6">
              <i class="fa-solid fa-book"></i>
              {{ Cliente.departamentos.departamento }}
            </p>
          </div> -->

          <div class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <label class="text-dark"><strong>Nº do telefone</strong></label>
            <p class="text-light h6">
              <i class="fa-regular fa-address-book"></i>
              {{ Cliente.telemovel }}
            </p>
          </div>

          <!-- <div class="form-group col-xs-12 col-sm-12 col-md-2 col-lg-2">
            <label class="text-success">Status</label>
            <p class="text-secondary h6" v-if="Cliente.status == 'Activo'">
              <i class="fa-sharp fa-solid fa-circle text-success"></i>
              {{ Cliente.status }}
            </p>
            <p class="text-secondary h6" v-else>
              <i class="fa-sharp fa-solid fa-circle text-warning"></i>
              {{ Cliente.status }}
            </p>
          </div> -->

        </div>
      </div>

      <!-- Listagem em tabela
                 <div class="card-body">

                <div class="row">

                    <div class="form-group col-12">
                        <div class="table-responsive">

                            <table class="table table-sm table-striped">
                                <thead>
                                    <tr>
                                        <th>Cod.</th>
                                        <th>graduacaos</th>
                                        <th>Cobrança</th>
                                        <th>Opções</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr v-for="graduacao in graduacoes.data" :key="graduacao.id">
                                        <td>{{ graduacao.id }}</td>
                                        <td>{{ graduacao.graduacaos }}</td>
                                        <td>{{ vueNumberFormat(graduacao.cobranca, { isInteger: true }) }}</td>
                                        <td>
                                            <button @click="updategraduacaoForm(graduacao.id)"
                                                class="btn btn-sm btn-outline-success mr-2" type="button"
                                                data-bs-toggle="modal" data-bs-target="#modalEdit" to="#">
                                                <i class="fa-regular fa-pen-to-square"></i>
                                            </button>
                                            <button class="btn btn-sm btn-outline-danger mr-2" data-bs-toggle="modal"
                                                data-bs-target="#modalDeleteConfirm" @click="deleteGraduac(graduacao.id)">
                                                <i class="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table> 

                           

                            <nav aria-label="paginate">
                                <ul class="pagination pagination-sm" v-if="graduacoes.last_page > 1">
                                    <li class="page-item" v-if="graduacoes.current_page != 1">
                                        <a class="page-link" href="#"
                                            @click.prevent="loadingGraduac(graduacoes.current_page - 1)">{{ '<<' }}</a>
                                    </li>

                                    <li :class="['page-item', { 'active': graduacoes.current_page == page }]" aria-current="page"
                                        v-for="page in graduacoes.last_page" :key="page.id">
                                        <a class="page-link" href="#" @click.prevent="loadingGraduac(page)">{{ page }}</a>
                                    </li>

                                    <li class="page-item" v-if="graduacoes.current_page < graduacoes.last_page">
                                        <a class="page-link" href="#"
                                            @click.prevent="loadingGraduac(graduacoes.current_page + 1)">{{ '>>' }}</a>
                                    </li>
                                </ul>
                            </nav>


                        </div>
                    </div>
                </div>
            </div> -->
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
              <span v-if="btnSaveVariavel">Cadastre novo cliente</span>
              <span v-else>Alterar dados do cliente</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <form action="">


                <div class="form-group col-12 mb-2">
                  <span class="text-danger small col-12" v-if="erros.name">{{
                    erros.name[0]
                  }}</span>
                  <label for="" class="text-secodary col-12">Nome completo</label>
                  <input type="text" class="form-control form-control-sm fw-bold" placeholder="Informe nome completo"
                    v-model="items.name" />
                </div>

                <div class="form-group col-12 mb-2" v-if="btnSaveVariavel">
                  <span class="text-danger small col-12" v-if="erros.email">{{
                    erros.email[0]
                  }}</span>
                  <label for="" class="text-secodary col-12">E-mail</label>
                  <input type="email" class="form-control form-control-sm fw-bold" placeholder="Informe o e-amil"
                    v-model="items.email" />
                </div>

                <div class="row">
                  <div class="form-group col-xs-6 col-sm-6 col-md-6 col-lg-6 mb-2">
                    <span class="text-danger small" v-if="erros.telemovel">{{
                      erros.telemovel[0]
                    }}</span>
                    <label for="" class="text-secodary">Telemóvel</label>
                    <input type="text" class="form-control form-control-sm fw-bold" placeholder="Informe nº do telemóvel"
                      v-model="items.telemovel" />
                  </div>
                  <div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-2">
                    <span class="text-danger small" v-if="erros.endereco">{{ erros.endereco[0] }}</span>
                    <label for="" class="text-secodary">Endereço</label>
                    <textarea cols="12" rows="4" class="form-control form-control-sm" v-model="items.endereco"></textarea>
                  </div>
                </div>

                <!-- <div class="form-group col-12 mb-2">
                  <span class="text-danger small col-12" v-if="erros.departamento_id">{{ erros.departamento_id[0]
                  }}</span>
                  <label for="" class="text-secodary col-12">Associa-lo(a) a um departamento:</label>
                  <select class="form-control form-control-sm fw-bold" v-model="items.departamento_id">
                    <option disabled class="selected" value="">
                      Selessione um departamento
                    </option>
                    <option :value="departamento.id" v-for="departamento in getDepartamentoID" :key="departamento.id">
                      {{ departamento.departamento }}
                    </option>
                  </select>
                </div> -->

                <input type="password" name="password" class="d-none" required
                  onkeyup="this.setAttribute('value', this.value);" v-model="items.password">

                <input type="password" name="password_confirme" class="d-none" required
                  onkeyup="this.setAttribute('value', this.value);" v-model="items.password_confirmation">
              </form>
            </div>
          </div>

          <div class="modal-footer" v-if="btnSaveVariavel">
            <button type="submit" @click="cleanForm" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">
              <span> <i class="fa-solid fa-circle-xmark"></i> Fechar </span>
            </button>
            <button @click.prevent="registerCliente" type="button" class="btn btn-sm btn-success">
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
            <button @click.prevent="updateCliente" type="button" class="btn btn-sm btn-success">
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
              <i class="fa-solid fa-trash text-danger"></i> Apagar Cliente
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="form-group col-12 text-center">
                <span class="text-primary">
                  <h6>Tens a certeza que desejas apagar este funcionário...?</h6>
                </span>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">
              <span> <i class="fa-solid fa-circle-xmark"></i> Fechar </span>
            </button>
            <button @click.prevent="apagarCliente(deleteClienteId)" type="button" class="btn btn-sm btn-danger">
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
          <h5 id="offcanvasRightLabel text-center">DETALHES DO CLIENTE</h5>
        </div>
        <div class="form-group col-3 text-end">
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
      </div>
      <div class="offcanvas-body">
        <div class="row">
        </div>

        <hr />

        <div class="row">
          <div class="form-group col-12 text-center">
            <div class="card shadow">
              <h4>
                <span class="text-danger">{{ info.name }}</span>
              </h4>
            </div>
          </div>

          <div class="form-group col-12 mt-4">
            <div class="card mt-2">
              <div class="card-body">
                <p class="text-success">Nº de contacto:</p>
                <p class="text-secondary mt-0 fw-bold topoMargin">
                  {{ info.telemovel }}
                </p>
              </div>
            </div>

            <div class="card mt-2">
              <div class="card-body">
                <p class="text-success">E-mail:</p>
                <p class="text-secondary mt-0 fw-bold topoMargin">
                  {{ info.email }}
                </p>
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

    <!-- Canvas lateral esquerda -->
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasWithBackdrop"
      aria-labelledby="offcanvasWithBackdropLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasWithBackdropLabel">Offcanvas with backdrop</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <p>.....</p>
      </div>
    </div>

  </div>
</template>

<script>
import { notify } from "@kyvg/vue3-notification";
//import dateFormat from "@vue-formily/date-format";
import topoPageComponent from "../../../components/admin/services/partials/topoPageComponent.vue";
//import Datepicker from "vue3-datepicker"
import { pt } from 'date-fns/locale'
import { URL_API } from '../../../configs/index'
import axios from "axios"
import moment from 'moment';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiMenu, mdiFileEditOutline, mdiGiftOpenOutline, mdiTabSearch, mdiDeleteForever, mdiInformationVariantCircleOutline, mdiEyeOutline, mdiEyeOff, mdiFileExcel } from '@mdi/js';


export default {
  name: "Cliente-component",
  emits: ["cleanForm", "buscaClienteID"],
  data() {
    return {
      urlExport: URL_API + '/ExportToExcelListaPagamento/',
      url: window.url + "storage/image/clientes/",
      url_no_image: window.url + "image/no-Image.jpg",
      editImage: false,
      meID: '',
      password: '',
      password_confirmation: '',
      locale: pt,
      btnSaveVariavel: false,
      path: mdiMenu, mdiFileEditOutline, mdiGiftOpenOutline, mdiTabSearch, mdiDeleteForever, mdiInformationVariantCircleOutline, mdiFileExcel, mdiEyeOutline, mdiEyeOff,
      items: {
        name: "",
        email: "",
        telemovel: "",
        endereco: "",
      },
      reserva: {},
      data: [
        {
          name: "",
          telemovel: "",
          endereco: {
            endereco: "",
          },
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
        "Nome completo": "name",
        "Nº do telemovel": "telemovel",
        "Endereço": "endereco.endereco",
        "E-mail": "email",
      },
      erros: {
        name: "",
        email: "",
        telemovel: "",
        endereco: "",
      },

      deleteClienteId: "",
      filter: "",
      info: {
        name: "",
        email: "",
        telemovel: "",
        endereco: "",
      },
      departamentoInfo: "",
      categoriaInfo: "",
      remoneracaoInfo: "",
      emailInfo: "",
      adminInfo: "",
      senhaReservaInfo: "",
      inputFormat: "dd-MM-yyyy",

      fomatoData: "",
      namePage: "Meus clientes",
      nameButto: "Novo cliente",
      pageTopoIcon: "fa-solid fa-users-line",
      loading: false,

    };
  },

  created() {
    this.loadingClientes();
    //this.loadingDepartamentos();
    //this.loadingReservasSenhas();
    //this.geradorDeChave()
    this.me()
  },

  computed: {
    formatoDeDadta() {
      moment.locale('pt-br');
      return moment(this.info.created_at).format('LLLL');
    },
    Clientes() {
      //return this.$store.state.estudantes.items.filter(estudante =>toUpperCase(estudante.nome.includes(toUpperCase(this.filter))))
      return this.$store.getters.todosClientes(this.filter);
    },

    todosClientesCount() {
      return this.$store.getters.todosClientesCount;
    },

    getDepartamentoID() {
      return this.$store.getters.todosDepartamentos(this.filter);
    },

    getReservaSenha() {
      return this.$store.state.senha_reserva.items;
    },
    params() {
      return {
        page: this.Clientes.current_page,
      };
    },

  },

  methods: {

    me() {
      this.$store.dispatch('getMeSemLoading')
        .then((resp) => this.meID = resp.id)
    },

    // exportExcel() {
    //   import('../../../../plugins/Export2Excel').then(excel => {
    //     this.$store.dispatch('loadingClientesExcel')
    //       .then((response) => {
    //         console.log(response.data)
    //         const OBJ = response.data;

    //         const Header = ["Nome completo", "Nº do Bilhete", "Departamentos", "Area de acesso", "E-mail"];

    //         const field = ["name", "numBI", "departamentos.departamento", "users.admin", "users.email"];

    //         const Data = this.formatJSON(field, OBJ);
    //         excel.export_json_to_excel({
    //           header: Header,
    //           data: Data,
    //           sheetName: "Funcionários",
    //           filename: "Lista de funcionários",
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
      let file = e.target.files[0];
      this.items.imgPreview = URL.createObjectURL(file);
      let reader = new FileReader();
      reader.onloadend = () => {
        this.items.image = reader.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage() {
      this.items.image = null;
      this.items.imgPreview = null;
    },

    // Upload Image for Update

    onFileChangeEdit(e) {
      this.editImage = false;
      let file = e.target.files[0];
      this.items.imgPreview = URL.createObjectURL(file);

      let reader = new FileReader();
      reader.onloadend = () => {
        this.items.image = reader.result;
      };
      reader.readAsDataURL(file);
    },
    removeImageEdit() {
      this.editImage = false;
      this.items.image = null;
      this.items.imgPreview = this.url_no_image;
    },

    getClienteFind(pesquisa) {
      this.wordFind = this.$store.getters.getClienteFind(pesquisa);
    },

    buscaClienteID() {
      this.cleanForm();
      this.btnSaveVariavel = true;
      this.items.password = Math.random().toString(36).slice(2)
      this.items.password_confirmation = this.items.password
    },
    detalhes(id) {
      this.info = [];
      this.$store
        .dispatch("detalhesCliente", id)
        .then((response) => {
          console.log(response)
          this.info = response.data;
          this.info.endereco = response.data.endereco.endereco;
        })
    },

    cleanForm() {
      this.items = {
        name: "",
        email: "",
        telemovel: "",
        endereco: "",
      },
        this.erros = {
          name: "",
          email: "",
          telemovel: "",
          endereco: "",
        },

        this.btnSaveVariavel = false
    },

    loadingClientes() {
      //var store = useStore()
      this.$store.dispatch("loadingClientes");
    },
    // loadingDepartamentos() {
    //   //var store = useStore()
    //   this.$store.dispatch("loadingDepartamentos");
    // },

    // loadingReservasSenhas() {
    //   this.$store.dispatch("loadingReservaSenhaCliente");
    // },

    registerCliente() {
      this.loading = true,
        axios.post(`${URL_API}/registerUser`, this.items)
          .then(() => {
            notify({
              title: "Sucesso",
              text: "Registado com sucesso",
              type: "success",
            });
            this.loadingClientes();

            this.cleanForm();
            this.erros = [];
          })
          .catch((error) => {
            console.log(error.response)
            this.erros = error.response.data.errors;
            notify({
              title: "Erro",
              text: "Ocorreu um erro durante o processo de cadastro!",
              type: "warn",
            });
          })
          .finally(() => this.loading = false);
    },

    updateClienteForm(id) {
      this.btnSaveVariavel = false;
      this.cleanForm();
      this.$store
        .dispatch("updateFormCliente", id)
        .then((response) => {
          console.log(response),
            (this.items = response.data.getFuncionario)
          this.items.endereco = response.data.getFuncionario.endereco.endereco
        })
    },


    updateCliente() {
      this.loading = true
      this.$store
        .dispatch("updateCliente2", this.items)
        .then((response) => {
          console.log(response)
          notify({
            title: "Sucesso",
            text: 'Cliente actualizado com sucesso',
            type: "success",
          });
          this.loadingClientes();
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
        })
        .finally(() => this.loading = false);
    },

    deleteCliente(id) {
      this.deleteClienteId = id;
    },

    inativo(id) {
      this.$store.dispatch('inativo', id)
        .then((response) => {
          notify({
            title: 'Sucesso',
            text: response.data.message,
            type: 'success'
          })
          this.loadingClientes();
        })
        .catch(() => notify({
          title: 'Erro',
          text: 'Erro ao Inactivar o Funcionário',
          type: 'warn'
        }))
    },

    activo(id) {
      this.$store.dispatch('activo', id)
        .then((response) => {
          notify({
            title: 'Sucesso',
            text: response.data.message,
            type: 'success'
          })
          this.loadingClientes();
        })
        .catch(() => notify({
          title: 'Erro',
          text: 'Erro ao Activar o Funcionário',
          type: 'warn'
        }))
    },

    apagarCliente(id) {
      this.loading = true
      this.$store
        .dispatch("apagarCliente", id)
        .then((response) => {
          notify({
            title: "Sucesso",
            text: response.data.message,
            type: "success",
          });
          this.loadingClientes();
        })
        .catch((error) => {
          console.log(error)
          notify({
            title: "Erro",
            text: error.data.erro,
            type: "warn",
          });
        })
        .finally(() => this.loading = false);
    },

  },

  components: {
    topoPageComponent,
    SvgIcon
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
  width: 60px !important;
  height: 60px !important;
}</style>
