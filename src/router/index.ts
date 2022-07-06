import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import base from './routers/base'

const routes: Array<RouteRecordRaw> = [...base]

const Router = createRouter({
  history: createWebHistory(),
  routes
})

Router.beforeEach(() => {
  NProgress.start()
})

Router.afterEach(() => {
  NProgress.done()
})

export default Router
