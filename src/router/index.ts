import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import routerList from './router'

const routes: Array<RouteRecordRaw> = [...routerList]

const router = createRouter({
	history: createWebHistory(),
	routes
})

router.beforeEach((to) => {
	NProgress.start()
	document.title = to.meta.title || '默认标题'
})

router.afterEach(() => {
	NProgress.done()
})

export default router
