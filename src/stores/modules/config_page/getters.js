const getters = {
    todasImagens:(state)=>(filter)=>{
 
        return state.items.filter(image => image.imagens.toUpperCase().includes(filter.toUpperCase()))
    },

    todosNomesImagens(state){
        return state.items.filter(image =>image.imagens)
    },

    loadingImagensCliente(state){
        return state.items.filter(image =>image.imagens)
    },

    todasImagensCount(state, getters){
        var total= getters.todosNomesImagens.length
        return total
    },

}

export default getters