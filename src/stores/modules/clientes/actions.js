import clientes from '../../../service/clientes/clientes.service'

const actions = {
    
    loadingClientes({commit}){
        commit('PRELOADING', true)
        return clientes.getClientes()
                        .then((response) =>{
                            commit('ADD_ALL_CLIENTES', response.data)
                        })
                        .catch((error)=>console.log(error))
                        .finally(()=>commit('PRELOADING', false))
    },

    
    criar_reserva(_, params){
        return clientes.addReserva(params)
    },
    
    loadingClientesExcel({commit}){
        commit('PRELOADING', true)
        return clientes.getFuncionarios()
                        .catch((error)=>console.log(error))
                        .finally(()=>commit('PRELOADING', false))
    },
    inativo({commit}, params){
        commit('PRELOADING', true)
        return clientes.inativo(params)
                                    .finally(()=>commit('PRELOADING', false))
    },
    activo({commit}, params){
        commit('PRELOADING', true)
        return clientes.activo(params)
                                    .finally(()=>commit('PRELOADING', false))
    },

    createClientes(_, params){
        return clientes.addFuncionario(params)
    },

    all_Clientes(){
        return clientes.getFuncionarios()
                                
    },

    updateFormCliente({commit}, id){
        commit('PRELOADING', true)
        return clientes.updateFormFuncionario(id)
                             .finally(()=>commit('PRELOADING', false))
    },

    updateCliente2({commit}, params){
        commit('PRELOADING', true)
        return clientes.updateCliente2(params)
                             .finally(()=>commit('PRELOADING', false))
    },

    updateCliente({commit}, params){
        commit('PRELOADING', true)
        return clientes.updateFuncionario(params)
                             .finally(()=>commit('PRELOADING', false))
    },

    apagarCliente({commit}, params){
        commit('PRELOADING', true)
        return clientes.apagarCliente(params)
                             .finally(()=>commit('PRELOADING', false))
    },

    detalhesCliente({commit}, params){
        commit('PRELOADING', true)
        return clientes.detalhes(params)
                             .finally(()=>commit('PRELOADING', false))
    }
}

export default actions