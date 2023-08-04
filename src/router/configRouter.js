import homePage from '../components/homeComponent.vue'

const router = [
  {
    path: '',
    name: 'home',
    component: homePage,
    children: [
      {
        path: 'contacto',
        name: 'home.contacto',
        component: () => import('../components/contacto.vue')
      },
      {
        path: 'inicio',
        name: 'home.pageHome',
        component: () => import('../components/indexHome.vue')
      },
      {
        path: 'sobre',
        name: 'home.sobre',
        component: () => import('../components/sobre.vue')
      },
      {
        path: 'service',
        name: 'home.service',
        component: () => import('../components/servico.vue')
      },
      {
        path: 'login',
        name: 'home.login',
        component: () => import('../components/login.vue')
      },
      {
        path: 'login',
        name: 'home.create_count',
        component: () => import('../components/createCounte.vue')
      },
      {
        path: 'recuperarSenha',
        name: 'home.recuperaSenha',
        component: () => import('../components/esqueciPassword.vue')
      },
      {
        path: 'fazer-pedido',
        name: 'home.fazer_pedido',
        component: () => import('../components/fazerPedido.vue')
      }
    ]
  },

  {
    path: '/admin',
    name: 'admin.dashboard',
    component: () => import('../components/admin/dashboardComponent.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'admin.home',
        component: () => import('../components/admin/homeAdmin.vue')
      },
      {
        path: '/categoria',
        name: 'admin.categoria',
        component: () => import('../components/admin/categoriaComponent.vue')
      },
      {
        path: '/produtos',
        name: 'admin.produto',
        component: () => import('../components/admin/services/produtos/produtosComponent.vue')
      },
      {
        path: 'perfil',
        name: 'admin.perfil',
        component: () => import('../components/admin/perfil/perfil.vue')
      },
      {
        path: 'clientes',
        name: 'admin.meus_clientes',
        component: () => import('../components/admin/meus_clientes/clientesComponent.vue')
      },
      {
        path: 'PageConfig',
        name: 'admin.config_page',
        component: () => import('../components/admin/configPage.vue')
      },

      {
        path:'/sou_cliente',
        name:'cliente.pedidos',
        component:() => import('../components/cliente/pedidos.vue')
      },

      {
        path:'/mensagem',
        name:'admin.mensagem',
        component:() => import('../components/admin/mensagemComponent.vue')
      },
      {
        path:'/notificacoes',
        name:'admin.notify',
        component:() => import('../components/admin/notifyComponent.vue')
      },
    ]
  },

  
]

export default router
