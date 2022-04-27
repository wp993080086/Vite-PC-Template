import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import base from './routers/base'

const routes: Array<RouteRecordRaw> = [
  ...base
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
