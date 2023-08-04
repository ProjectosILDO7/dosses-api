import { createRouter, createWebHistory } from "vue-router";
import routes from "./configRouter.js"
import store from "../stores/index.js"
import { TOKEN_NAME } from "../configs/index.js";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _, next)=>{
const authorization = store.state.authorization
if(to.name !='home.recuperaSenha' && to.name !='home.fazer_pedido' && to.name !='home.create_count' && to.name !='home.pageHome' && to.name !='auth.resetPassword' && to.name !='home.service' && to.name!='home.contacto' && to.name !='home.sobre' && !authorization){
  const token = await localStorage.getItem(TOKEN_NAME)
  if(!token && to.name !='home.login' && to.name !='forget-password'){
      return router.push({name:'home.pageHome'})
  }

  await store.dispatch('getMe')
              .catch(()=>{
                if(to.name !='home.login') 
                    return router.push({name:'admin.home'})
              })
      
}
next()

})  

export default router;
