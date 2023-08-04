const getters = {
    pageSobre:(state)=>(filter)=>{
        return state.items.filter(sobre => sobre.sobre.toUpperCase().includes(filter.toUpperCase()))
    },

    contarConteudosSobre(state){
        return state.items.filter(sobre =>sobre.sobre)
    },

    todosSobreCount(state, getters){
        var total= getters.contarConteudosSobre.length
        return total
    },

}

export default getters