import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import base from './routers/base'

const routes: Array<RouteRecordRaw> = [...base]

const Router = createRouter({
  history: createWebHashHistory(),
  routes
})

Router.beforeEach(() => {
  NProgress.start()
})

Router.afterEach(() => {
  NProgress.done()
})

export default Router
