const getters = {
    pageContacto:(state)=>(filter)=>{
 
        return state.items.filter(contacto => contacto.facebook.toUpperCase().includes(filter.toUpperCase()))
    },

    contarContacto(state){
        return state.items.filter(contacto =>contacto.facebook)
    },

    todosContactoCount(state, getters){
        var total= getters.contarContacto.length
        return total
    },

}

export default getters