import BaseService from "../auth/base.service"

export default class config_pageService extends BaseService{

    static async getImages(){
        return new Promise((resolve, reject)=>{
            this.request({auth:true})
                .get('/Images')
                .then((resp)=>resolve(resp))
                .catch((erro)=>reject(erro))
        })
    }

    static async loadingImagensCliente(){
        return new Promise((resolve, reject)=>{
            this.request({auth:true})
                .get('/loadingImagensCliente')
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

    static async updateFormImage(id){
        return new Promise((resolve, reject)=>{
            this.request({auth:true})
                .get(`/getImage/${id}`)
                .then((resp)=>resolve(resp))
                .catch((erro)=>reject(erro))
        })
    }

    static async updateImage(params){
        return new Promise((resolve, reject)=>{
            this.request({auth:true})
                .put(`/updateImage/${params.id}`, params)
                .then((resp)=>resolve(resp))
                .catch((erro)=>reject(erro))
        })
    }

    static async apagarImage(params){
        return new Promise((resolve, reject)=>{
            this.request({auth:true})
                .get(`/apagarImage/${params}`)
                .then((resp)=>resolve(resp))
                .catch((erro)=>reject(erro))
        })
    }

    static async addImage(params){
        return new Promise((resolve, reject)=>{
            this.request({auth:true})
                .post('/registerImage', params)
                .then((resp)=>resolve(resp))
                .catch((erro)=>reject(erro.response.data.errors))
        })
    }

    static async detalhes(params){
        return new Promise((resolve, reject)=>{
            this.request({auth:true})
                .get(`/detalhesImage/${params}`)
                .then((resp)=>{
                    //console.log(resp.data)
                    resolve(resp)
                })
                .catch((erro)=>reject(erro.response.data.errors))
        })
    }

}