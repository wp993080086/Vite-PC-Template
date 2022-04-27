import { baseRouter } from '@/config'

export default [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/base/not-found.vue'),
    meta: {
      title: 'NotFound',
      showHeader: false
    }
  },
  {
    path: baseRouter.LOGIN,
    name: 'Login',
    component: () => import('@/pages/base/login/index.vue'),
    meta: {
      title: '登录',
      showHeader: false
    }
  }
]

