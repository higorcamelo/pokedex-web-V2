import { createRouter, createWebHistory } from 'vue-router'
import paginaPrincipal from '../views/paginaPrincipal.vue'
//import paginaDetalhes from '@/views/paginaDetalhes.vue

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: paginaPrincipal
    },
    //{
    //  path:'/pokemon/:id',
    //  component: paginaDetalhes
    //}
   
  ]
})

export default router
