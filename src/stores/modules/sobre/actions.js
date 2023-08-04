import sobreService from '../../../service/sobre/sobre.service.js'

const actions = {
    
    loadingSobre({commit}){
        commit('PRELOADING', true)
        return sobreService.getSobre()
                        .then(response =>commit('ADD_ALL_SOBRE', response.data))
                        .catch(error=>console.log(error))
                        .finally(()=>commit('PRELOADING', false))
    },

    createSobre(_, params){
        return sobreService.addCategoria(params)
    },

    updateSobreConteudoForm({commit}, params){
        commit('PRELOADING', true)
        return sobreService.updateSobreConteudoForm(params)
                             .finally(()=>commit('PRELOADING', false))
    },

    updateSobreBtnConteudo({commit}, params){
        commit('PRELOADING', true)
        return sobreService.updateSobreBtnConteudo(params)
                             .finally(()=>commit('PRELOADING', false))
    },

}

export default actions