const getters = {
    todosPedidos:(state)=>(filter)=>{
        return state.items.filter(todos => 
            todos.produto_id.toUpperCase().includes(filter.toUpperCase()))
    },

    todosPedidosCliente:(state)=>(filter)=>{
        console.log(state.items)
        return state.items.filter(todos=>todos.produto_id.toUpperCase().includes(filter.toUpperCase()))
    },

    contarPedidos(state){
        return state.items.filter(todos =>todos.produto_id)
    },

    todosPedidosCount(state, getters){
        var total= getters.contarPedidos.length
        return total
    },

}

export default getters