import { constantRouterIcon } from '@/utils/icon'; 

const consoleRoutes = [
	{
		path: '/console',
		key: '/console',
		label: '控制台',
		name: 'console',
		icon: constantRouterIcon['AppstoreFilled'],
		component: () => import('@/views/console/index.vue'),
	},
 ]

export default consoleRoutes