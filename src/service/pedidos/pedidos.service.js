import BaseService from "../auth/base.service"

export default class pedidosService extends BaseService{

    static async getPedidos(){
        return new Promise((resolve, reject)=>{
            this.request({auth:true})
                .get('/pedidos')
                .then((resp)=>resolve(resp))
                .catch((erro)=>reject(erro))
        })
    }
    static async detalhes_pedido(id){
        return new Promise((resolve, reject)=>{
            this.request({auth:true})
                .get(`/detalhes_pedido/${id}`)
                .then((resp)=>resolve(resp))
                .catch((erro)=>reject(erro))
        })
    }
    static async marcarLidaNotify(id){
        return new Promise((resolve, reject)=>{
            this.request({auth:true})
                .get(`/marcarLidaNotify/${id}`)
                .then((resp)=>resolve(resp))
                .catch((erro)=>reject(erro))
        })
    }

}