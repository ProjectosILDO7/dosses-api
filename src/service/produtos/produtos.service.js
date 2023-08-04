import BaseService from "../auth/base.service"

export default class produtosService extends BaseService{

    static async getProdutos(){
        return new Promise((resolve, reject)=>{
            this.request({auth:true})
                .get('/produtos')
                .then((resp)=>resolve(resp))
                .catch((erro)=>reject(erro))
        })
    }

    static async getProdutosCliente(){
        return new Promise((resolve, reject)=>{
            this.request({auth:true})
                .get('/produtosClientes')
                .then((resp)=>resolve(resp))
                .catch((erro)=>reject(erro))
        })
    }

    static async filter(params){
        return new Promise((resolve, reject)=>{
            this.request({auth:true})
                .post('/filter', {params})
                .then((resp)=>resolve(resp))
                .catch((erro)=>reject(erro.response))
        })
    }

    static async updateFormProduto(id){
        return new Promise((resolve, reject)=>{
            this.request({auth:true})
                .get(`/getProduto/${id}`)
                .then((resp)=>resolve(resp))
                .catch((erro)=>reject(erro))
        })
    }

    static async updateProduto(params){
        return new Promise((resolve, reject)=>{
            this.request({auth:true})
                .put(`/updateProduto/${params.id}`, params)
                .then((resp)=>resolve(resp))
                .catch((erro)=>reject(erro))
        })
    }

    static async apagarProduto(params){
        return new Promise((resolve, reject)=>{
            this.request({auth:true})
                .get(`/apagarProduto/${params}`)
                .then((resp)=>resolve(resp))
                .catch((erro)=>reject(erro))
        })
    }

    static async addProduto(params){
        return new Promise((resolve, reject)=>{
            this.request({auth:true})
                .post('/registerProduto', params)
                .then((resp)=>resolve(resp))
                .catch((erro)=>reject(erro.response.data.errors))
        })
    }

    static async detalhes(params){
        return new Promise((resolve, reject)=>{
            this.request({auth:true})
                .get(`/detalhesProdutoRF/${params}`)
                .then((resp)=>resolve(resp))
                .catch((erro)=>reject(erro.response.data.errors))
        })
    }

    static async pedirProduto(id){
        return new Promise((resolve, reject)=>{
            this.request({auth:true})
                .get(`/pedirProduto/${id}`)
                .then((resp)=>resolve(resp))
                .catch((erro)=>reject(erro.response.data.errors))
        })
    }

    static async muscar_meus_pedidos(){
        return new Promise((resolve, reject)=>{
            this.request({auth:true})
                .get(`/meus_pedidos`)
                .then((resp)=>resolve(resp))
                .catch((erro)=>reject(erro.response.data.errors))
        })
    }

    static async buscar_meu_pedido(id){
        return new Promise((resolve, reject)=>{
            this.request({auth:true})
                .get(`/buscar_meu_pedido/${id}`)
                .then((resp)=>resolve(resp))
                .catch((erro)=>reject(erro.response.data.errors))
        })
    }

    static async desfazerPedido(id){
        return new Promise((resolve, reject)=>{
            this.request({auth:true})
                .get(`/desfazerPedido/${id}`)
                .then((resp)=>resolve(resp))
                .catch((erro)=>reject(erro.response.data.errors))
        })
    }

}