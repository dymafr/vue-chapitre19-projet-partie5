import { createRouter, createWebHistory } from 'vue-router'
import { ADMIN_ROUTES } from './features/admin/admin.routes'
import AppNotFound from './views/AppNotFound.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/boutique',
    },
    {
      path: '/boutique',
      component: () => import('@/features/boutique/AppBoutique.vue'),
    },
    {
      path: '/admin',
      component: () => import('@/features/admin/AppAdmin.vue'),
      children: ADMIN_ROUTES,
    },
    {
      path: '/:notfound(.*)*',
      component: AppNotFound,
    },
  ],
})
