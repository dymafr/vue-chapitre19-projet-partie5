import type { RouteRecordRaw } from 'vue-router'

export const ADMIN_ROUTES: RouteRecordRaw[] = [
  {
    path: '',
    redirect: '/admin/addproduct',
  },
  {
    path: 'addproduct',
    component: () => import('@/features/admin/views/AppProductForm.vue'),
  },
  {
    path: 'productlist',
    component: () => import('@/features/admin/views/AppProductList.vue'),
  },
  {
    path: 'edit/:productId',
    name: 'edit',
    component: () => import('@/features/admin/views/AppProductForm.vue'),
  },
]
