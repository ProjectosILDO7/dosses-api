const getters = {
    todoMensagem:(state)=>(filter)=>{
        return state.items.filter(todos => 
            todos.nome.toUpperCase().includes(filter.toUpperCase()))
    },

    todMensagemCliente:(state)=>(filter)=>{
        return state.items.filter(todos => 
            todos.nome.toUpperCase().includes(filter.toUpperCase()))
    },

    mensagem(state){
        return state.items.filter(todos =>todos.nome)
    },

    todasMensagemCount(state, getters){
        var total= getters.mensagem.length
        return total
    },

}

export default getters