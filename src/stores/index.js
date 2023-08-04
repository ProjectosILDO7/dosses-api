import { createStore } from "vuex";
import carregar from "./modules/carregar_pagina/preloading"
import categoria from "./modules/categoria"
import produtos from "./modules/produtos"
import auth from "./modules/user/index"
import perfil from "./modules/perfil"
import clientes from "./modules/clientes"
import pageConfig from "./modules/config_page"
import pageContacto from "./modules/pageContacto"
import pageSobre from "./modules/sobre"
import pedidos from "./modules/pedidos"
import mensagem from "./modules/mensagens"
//import notify from "./modules/notify"


export default createStore({
    modules:{
        auth,
        carregar,
        categoria,
        produtos,
        perfil,
        clientes,
        mensagem,
        pedidos,
        pageConfig,
        pageContacto,
        pageSobre

    }
})