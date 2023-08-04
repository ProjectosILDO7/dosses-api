export default{
    state:{
        loading: false,
    },
    mutations:{
        PRELOADING(state, status){
            state.loading = status
        }
    }
}