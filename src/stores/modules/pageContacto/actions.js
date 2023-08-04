import pageContactoService from '../../../service/pageContacto/pageContacto.service.js'

const actions = {
    
    loadingContacto({commit}){
        commit('PRELOADING', true)
        return pageContactoService.getPageContacto()
                        .then(response =>commit('ADD_ALL_PAGECONTACTO', response.data))
                        .catch(error=>console.log(error))
                        .finally(()=>commit('PRELOADING', false))
    },
    getContacto({commit}){
        commit('PRELOADING', true)
        return pageContactoService.getContactoEmpresa()
                        .catch(error=>console.log(error))
                        .finally(()=>commit('PRELOADING', false))
    },

    createContacto({commit}, params){
        commit('PRELOADING', true)
        return pageContactoService.addContacto(params)
                            .finally(()=>commit('PRELOADING', false))
    },

    savePageSobre({commit}, params){
        commit('PRELOADING', true)
        return pageContactoService.savePageSobre(params)
                            .finally(()=>commit('PRELOADING', false))
    },

    updateContacto({commit}, params){
        commit('PRELOADING', true)
        return pageContactoService.updatePageContacto(params)
                             .finally(()=>commit('PRELOADING', false))
    },

    updateContactoBtn({commit}, params){
        commit('PRELOADING', true)
        return pageContactoService.updatePageContactoBtn(params)
                             .finally(()=>commit('PRELOADING', false))
    },

}

export default actions