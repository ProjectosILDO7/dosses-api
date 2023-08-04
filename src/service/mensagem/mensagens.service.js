import BaseService from "../auth/base.service"

export default class mensagensService extends BaseService{

    static async getMensagem(){
        return new Promise((resolve, reject)=>{
            this.request({auth:true})
                .get('/mensagens')
                .then((resp)=>resolve(resp))
                .catch((erro)=>reject(erro))
        })
    }

    static async marcarLida(id){
        return new Promise((resolve, reject)=>{
            this.request({auth:true})
                .get(`/marcarLida/${id}`)
                .then((resp)=>resolve(resp))
                .catch((erro)=>reject(erro))
        })
    }

}