const defaultRouter = [
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/index.vue')
	},
	{
		path: '/404',
		name: '404',
		component: () => import('@/views/404/index.vue'),
	},
	{
		path: '/:pathMatch(.*)',
		redirect: '/404',
	},
	{
		path: '/EchartsDemo',
		name:'EchartsDemo',
		component: () => import('@/views/EchartsDemo/index.vue'),
	},
]

export default defaultRouter
