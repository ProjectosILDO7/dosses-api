import ProdutosServices from '../../../service/produtos/produtos.service'

const actions = {
    
    loadingProdutos({commit}){
        commit('PRELOADING', true)
        return ProdutosServices.getProdutos()
                        .then((response) =>{
                            commit('ADD_ALL_PRODUTOS', response.data)
                        })
                        .catch((error)=>console.log(error))
                        .finally(()=>commit('PRELOADING', false))
    },

    loadingProdutosCliente({commit}){
        commit('PRELOADING', true)
        return ProdutosServices.getProdutosCliente()
                        .then((response) =>{
                            commit('ADD_ALL_PRODUTOS', response.data)
                        })
                        .catch((error)=>console.log(error))
                        .finally(()=>commit('PRELOADING', false))
    },
    
    loadingProdutosExcel({commit}){
        commit('PRELOADING', true)
        return ProdutosServices.getProdutos()
                        .catch((error)=>console.log(error))
                        .finally(()=>commit('PRELOADING', false))
    },
    inativo({commit}, params){
        commit('PRELOADING', true)
        return ProdutosServices.inativo(params)
                                    .then((response) =>commit('ADD_ALL_PRODUTOS', response.data))
                                    .catch((erro) => console.log(erro))
                                    .finally(()=>commit('PRELOADING', false))
    },
    activo({commit}, params){
        commit('PRELOADING', true)
        return ProdutosServices.activo(params)
                                    .then((response) =>commit('ADD_ALL_PRODUTOS', response.data))
                                    .catch((erro) => console.log(erro))
                                    .finally(()=>commit('PRELOADING', false))
    },

    createProduto(_, params){
        return ProdutosServices.addProduto(params)
    },

    all_Produtos(){
        return ProdutosServices.getProdutos()
                                
    },

    updateFormProduto({commit}, id){
        commit('PRELOADING', true)
        return ProdutosServices.updateFormProduto(id)
                             .finally(()=>commit('PRELOADING', false))
    },

    updateProduto({commit}, params){
        commit('PRELOADING', true)
        return ProdutosServices.updateProduto(params)
                             .finally(()=>commit('PRELOADING', false))
    },

    apagarProduto({commit}, params){
        commit('PRELOADING', true)
        return ProdutosServices.apagarProduto(params)
                             .finally(()=>commit('PRELOADING', false))
    },

    detalhesProduto({commit}, params){
        commit('PRELOADING', true)
        return ProdutosServices.detalhes(params)
                             .finally(()=>commit('PRELOADING', false))
    },

    pedirProduto({commit}, id){
        commit('PRELOADING', true)
        return ProdutosServices.pedirProduto(id)
                             .finally(()=>commit('PRELOADING', false))
    },
    muscar_meus_pedidos({commit}){
        commit('PRELOADING', true)
        return ProdutosServices.muscar_meus_pedidos()
                             .finally(()=>commit('PRELOADING', false))
    },
    
    buscar_meu_pedido({commit}, id){
        commit('PRELOADING', true)
        return ProdutosServices.buscar_meu_pedido(id)
                             .finally(()=>commit('PRELOADING', false))
    },

    desfazerPedido({commit}, id){
        commit('PRELOADING', true)
        return ProdutosServices.desfazerPedido(id)
                             .finally(()=>commit('PRELOADING', false))
    }
}

export default actions