const getters = {
    todasCategorias:(state)=>(filter)=>{
 
        return state.items.filter(category => category.nome_categoria.toUpperCase().includes(filter.toUpperCase()))
    },

    todosNomesCategoria(state){
        return state.items.filter(category =>category.nome_categoria)
    },

    todasCategoriasCount(state, getters){
        var total= getters.todosNomesCategoria.length
        return total
    },

}

export default getters