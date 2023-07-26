import { createRouter, createWebHistory } from 'vue-router';
import PaginaPrincipal from '@/views/paginaPrincipal.vue';
import PaginaDetalhes from '@/views/paginaDetalhes.vue';

// Criação do router
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PaginaPrincipal, // Utilizamos o componente importado, com o nome correto
    },
    {
      path: '/pokemon/:id',
      name: 'detalhes',
      component: PaginaDetalhes, // Utilizamos o componente importado, com o nome correto
    },
    // Adicione outras rotas aqui, se necessário
  ],
});

export default router;
