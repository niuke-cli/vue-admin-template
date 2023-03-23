import { RouteRecordRaw } from 'vue-router'

const demo: Array<RouteRecordRaw> = [
	{
		path: '/demo',
		name: 'demo',
		component: () => import('@/views/demo/index.vue'),
		meta: {
			title: '测试主页',
			icon: ''
		}
	}
]

export default demo
