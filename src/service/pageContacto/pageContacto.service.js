import BaseService from "../auth/base.service"

export default class pageContactoService extends BaseService{

    static async getPageContacto(){
        return new Promise((resolve, reject)=>{
            this.request({auth:true})
                .get('/pageContacto')
                .then((resp)=>resolve(resp))
                .catch((erro)=>reject(erro))
        })
    }
    static async getContactoEmpresa(){
        return new Promise((resolve, reject)=>{
            this.request({auth:true})
                .get('/getContactoEmpresa')
                .then((resp)=>resolve(resp))
                .catch((erro)=>reject(erro))
        })
    }

    static async updatePageContacto(params){
        return new Promise((resolve, reject)=>{
            this.request({auth:true})
                .get(`/updatePageContacto/${params}`)
                .then((resp)=>resolve(resp))
                .catch((erro)=>reject(erro))
        })
    }

    static async updatePageContactoBtn(params){
        return new Promise((resolve, reject)=>{
            this.request({auth:true})
                .put(`/updatePageContactoForm/${params.id}`, params)
                .then((resp)=>resolve(resp))
                .catch((erro)=>reject(erro))
        })
    }

    static async addContacto(params){
        return new Promise((resolve, reject)=>{
            this.request({auth:true})
                .post(`/createContacto`, params)
                .then((resp)=>resolve(resp))
                .catch((erro)=>reject(erro))
        })
    }

    static async savePageSobre(params){
        return new Promise((resolve, reject)=>{
            this.request({auth:true})
                .post(`/savePageSobre`, params)
                .then((resp)=>resolve(resp))
                .catch((erro)=>reject(erro))
        })
    }

}