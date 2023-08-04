import BaseService from "../auth/base.service"

export default class SobreService extends BaseService{

    static async getSobre(){
        return new Promise((resolve, reject)=>{
            this.request({auth:true})
                .get('/getConteudoSobre')
                .then((resp)=>resolve(resp))
                .catch((erro)=>reject(erro))
        })
    }

    static async updateSobreConteudoForm(params){
        return new Promise((resolve, reject)=>{
            this.request({auth:true})
                .put(`/updateSobreConteudoForm/${params}`)
                .then((resp)=>resolve(resp))
                .catch((erro)=>reject(erro))
        })
    }

    static async updateSobreBtnConteudo(params){
        return new Promise((resolve, reject)=>{
            this.request({auth:true})
                .put(`/updateSobreConteudo/${params.id}`, params)
                .then((resp)=>resolve(resp))
                .catch((erro)=>reject(erro))
        })
    }

}