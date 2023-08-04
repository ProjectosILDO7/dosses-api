const getters = {
    todosProdutos:(state)=>(filter)=>{
        return state.items.filter(todos => 
            todos.nome_produto.toUpperCase().includes(filter.toUpperCase()))
    },

    todosProdutosCliente:(state)=>(filter)=>{
        return state.items.filter(todos => 
            todos.nome_produto.toUpperCase().includes(filter.toUpperCase()))
    },

    contarProdutos(state){
        return state.items.filter(todos =>todos.nome_produto)
    },

    todosProdutosCount(state, getters){
        var total= getters.contarProdutos.length
        return total
    },

}

export default getters