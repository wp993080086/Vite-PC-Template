export default [
	{
		path: '/',
		redirect: '/login'
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: () => import('@/views/not-found.vue'),
		meta: {
			title: 'NotFound',
			showHeader: false
		}
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/login/index.vue'),
		meta: {
			title: '登录',
			showHeader: false
		}
	},
	{
		path: '/home',
		name: 'Home',
		component: () => import('@/views/home/index.vue'),
		meta: {
			title: '首页',
			showHeader: true
		}
	}
]
