import Imageservice from '../../../service/config_page/config_page.service.js'

const actions = {
    
    loadingImagens({commit}){
        commit('PRELOADING', true)
        return Imageservice.getImages()
                        .then(response =>commit('ADD_ALL_IMAGES', response.data))
                        .catch(error=>console.log(error))
                        .finally(()=>commit('PRELOADING', false))
    },
    loadingImagensCliente({commit}){
        commit('PRELOADING', true)
        return Imageservice.loadingImagensCliente()
                        .then(response =>commit('ADD_ALL_IMAGES', response.data))
                        .catch(error=>console.log(error))
                        .finally(()=>commit('PRELOADING', false))
    },

    createImage(_, params){
        return Imageservice.addImage(params)
    },

    updateFormImage({commit}, id){
        commit('PRELOADING', true)
        return Imageservice.updateFormImage(id)
                             .finally(()=>commit('PRELOADING', false))
    },

    updateImage({commit}, params){
        commit('PRELOADING', true)
        return Imageservice.updateImage(params)
                             .finally(()=>commit('PRELOADING', false))
    },

    apagarImage({commit}, params){
        commit('PRELOADING', true)
        return Imageservice.apagarImage(params)
                             .finally(()=>commit('PRELOADING', false))
    },

    detalhesImage({commit}, params){
        commit('PRELOADING', true)
        return Imageservice.detalhes(params)
                             .finally(()=>commit('PRELOADING', false))
    }
}

export default actions