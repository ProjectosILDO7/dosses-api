import MensagemServices from '../../../service/mensagem/mensagens.service'

const actions = {
    
    loadingMensagem({commit}){
        commit('PRELOADING', true)
        return MensagemServices.getMensagem()
                        .then((response) =>{
                            commit('ADD_ALL_MENSAGEM', response.data)
                        })
                        .catch((error)=>console.log(error))
                        .finally(()=>commit('PRELOADING', false))
    },
    loadingMensagemReed({commit}){
        commit('PRELOADING', true)
        return MensagemServices.getMensagem()
                        .then((response) =>response.data)
                        .catch((error)=>console.log(error))
                        .finally(()=>commit('PRELOADING', false))
    },
    marcarLida({commit}, id){
        commit('PRELOADING', true)
        return MensagemServices.marcarLida(id)
                        .then((response) =>commit('ADD_ALL_MENSAGEM', response.data))
                        .catch((error)=>console.log(error))
                        .finally(()=>commit('PRELOADING', false))
    },

}

export default actions